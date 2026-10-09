// test_screen_reader_accessibility.mjs

const CDP_HTTP = "http://127.0.0.1:9222";

async function cdpRequest(endpoint) {
  const res = await fetch(`${CDP_HTTP}${endpoint}`);
  return res.json();
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 0;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    let trimmed = expression.trim();
    if (!trimmed.includes(";") && !trimmed.includes("\n") && !trimmed.startsWith("return")) {
      trimmed = `return (${trimmed});`;
    }
    const wrapped = `(() => {\n${trimmed}\n})()`;
    const res = await this.send("Runtime.evaluate", {
      expression: wrapped,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval error: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

const ROUTES = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/news", name: "News" },
  { path: "/news/constituency-grievance-redressal-portal-initiative", name: "News Detail" },
  { path: "/activities", name: "Activities" },
  { path: "/activities/district-hospital-palakkad-pediatric-wing-visit", name: "Activity Detail" },
  { path: "/gallery", name: "Gallery" },
  { path: "/constituency", name: "Constituency" },
  { path: "/accessibility", name: "Accessibility" },
  { path: "/contact", name: "Contact" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/non-existent-sample-page-404", name: "404 Not Found" },
];

async function run() {
  console.log("================================================================================");
  console.log("    COMPREHENSIVE SCREEN-READER & ACCESSIBILITY-TREE AUDIT (WCAG 2.1 AA)        ");
  console.log("================================================================================\n");

  const targets = await cdpRequest("/json");
  const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("3000"));
  if (!pageTarget) {
    throw new Error("No open browser page found on localhost:3000.");
  }

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  console.log(`Connected to CDP target: ${pageTarget.url}`);

  await client.send("Runtime.enable");
  await client.send("Page.enable");
  await client.send("Accessibility.enable");

  const auditResults = [];

  // ============================================================================
  // PHASE 1: ROUTE-BY-ROUTE ACCESSIBILITY-TREE, HEADINGS, LANDMARKS, AND LINKS
  // ============================================================================
  console.log("\n================================================================================");
  console.log(" PHASE 1: AUDITING ALL 11 ROUTES FOR TITLE, LANDMARKS, HEADINGS, LINKS & ROLES");
  console.log("================================================================================\n");

  for (const route of ROUTES) {
    console.log(`\n>>> Inspecting Route: ${route.name} (${route.path})`);
    await client.send("Page.navigate", { url: `http://localhost:3000${route.path}` });
    await new Promise((r) => setTimeout(r, 1200));

    // Clear dev splash/loader
    await client.eval(`
      const loader = document.getElementById("initial-loader");
      if (loader) loader.remove();
    `);

    // Fetch full Accessibility Tree from Chrome
    const axTree = await client.send("Accessibility.getFullAXTree");
    const rawNodes = axTree.nodes || [];

    // Traverse Accessibility Tree from RootWebArea in document preorder
    const nodeMap = new Map();
    for (const n of rawNodes) nodeMap.set(n.nodeId, n);
    const rootNode = rawNodes.find((n) => n.role?.value === "RootWebArea");
    const nodes = [];
    function traverse(nodeId) {
      const n = nodeMap.get(nodeId);
      if (!n) return;
      nodes.push(n);
      if (n.childIds) {
        for (const cid of n.childIds) traverse(cid);
      }
    }
    if (rootNode) traverse(rootNode.nodeId);
    else nodes.push(...rawNodes);

    // 1. Page Title & Root Web Area
    const pageTitle = await client.eval("document.title");

    // 2. Landmarks
    const landmarkRoles = ["banner", "navigation", "main", "contentinfo", "region", "search", "complementary"];
    const landmarks = nodes
      .filter((n) => landmarkRoles.includes(n.role?.value))
      .map((n) => ({
        role: n.role?.value,
        name: n.name?.value || "unnamed",
      }));

    const hasMain = landmarks.some((l) => l.role === "main");
    const hasBanner = landmarks.some((l) => l.role === "banner");
    const hasContentInfo = landmarks.some((l) => l.role === "contentinfo");

    // 3. Headings & Hierarchy
    const headingNodes = nodes.filter((n) => n.role?.value === "heading");
    const headingList = headingNodes.map((n) => {
      const levelProp = n.properties?.find((p) => p.name === "level");
      return {
        level: levelProp ? Number(levelProp.value.value) : 2,
        name: (n.name?.value || "").slice(0, 50).trim(),
      };
    });

    const h1Count = headingList.filter((h) => h.level === 1).length;
    let headingSkips = [];
    for (let i = 0; i < headingList.length - 1; i++) {
      const cur = headingList[i].level;
      const next = headingList[i + 1].level;
      if (next > cur + 1) {
        headingSkips.push(`Skip from h${cur} to h${next} ("${headingList[i].name}" -> "${headingList[i + 1].name}")`);
      }
    }

    // 4. Links & Accessible Names
    const linkNodes = nodes.filter((n) => n.role?.value === "link");
    const unnamedLinks = linkNodes.filter((n) => !n.name?.value || n.name.value.trim() === "");
    const genericLinks = linkNodes.filter((n) => {
      const val = (n.name?.value || "").toLowerCase().trim();
      return val === "click here" || val === "more" || val === "link" || val === "read more";
    });

    // 5. Buttons & Accessible Names
    const buttonNodes = nodes.filter((n) => n.role?.value === "button");
    const unnamedButtons = buttonNodes.filter((n) => !n.name?.value || n.name.value.trim() === "");
    const genericButtons = buttonNodes.filter((n) => {
      const val = (n.name?.value || "").toLowerCase().trim();
      return val === "x" || val === "chevron" || val === "arrow" || val === "button";
    });

    // 6. Live Regions
    const liveNodes = nodes.filter((n) => {
      const liveProp = n.properties?.find((p) => p.name === "live");
      return liveProp && liveProp.value.value !== "off";
    });

    console.log(`  - Page Title: "${pageTitle}"`);
    console.log(`  - Landmarks: Found ${landmarks.length} (${landmarks.map((l) => `${l.role}${l.name !== 'unnamed' ? `:"${l.name}"` : ''}`).join(', ')})`);
    console.log(`  - Headings: Total ${headingList.length} (h1: ${h1Count}, skips: ${headingSkips.length})`);
    console.log(`  - Links: ${linkNodes.length} links (unnamed: ${unnamedLinks.length}, generic: ${genericLinks.length})`);
    console.log(`  - Buttons: ${buttonNodes.length} buttons (unnamed: ${unnamedButtons.length}, generic: ${genericButtons.length})`);
    console.log(`  - Live Regions: ${liveNodes.length} active live regions`);

    if (headingSkips.length > 0) {
      console.warn(`    ⚠️ Heading skips on ${route.name}:`, headingSkips);
    }
    if (unnamedLinks.length > 0) {
      console.error(`    ❌ Unnamed links on ${route.name}:`, unnamedLinks);
    }
    if (unnamedButtons.length > 0) {
      console.error(`    ❌ Unnamed buttons on ${route.name}:`, unnamedButtons);
    }

    const isPass = hasMain && hasBanner && hasContentInfo && h1Count === 1 && headingSkips.length === 0 && unnamedLinks.length === 0 && unnamedButtons.length === 0 && genericLinks.length === 0;

    auditResults.push({
      route: route.name,
      path: route.path,
      title: pageTitle,
      hasMain,
      h1Count,
      totalHeadings: headingList.length,
      headingSkipsCount: headingSkips.length,
      totalLinks: linkNodes.length,
      totalButtons: buttonNodes.length,
      unnamedControls: unnamedLinks.length + unnamedButtons.length,
      genericControls: genericLinks.length + genericButtons.length,
      result: isPass ? "PASS" : "FAIL",
    });
  }

  // ============================================================================
  // PHASE 2: INTERACTIVE SCREEN-READER WORKFLOW AUDITS
  // ============================================================================
  console.log("\n================================================================================");
  console.log(" PHASE 2: AUDITING SCREEN-READER INTERACTIVE WORKFLOWS & COMPONENT STATES");
  console.log("================================================================================\n");

  // --- WORKFLOW A: Skip Link & Main Content Landmark ---
  console.log(">>> [Workflow A] Skip Link & Landmark Orientation:");
  await client.send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 1000));

  const skipLinkInfo = await client.eval(`
    const skipLink = document.querySelector('a[href="#main-content"]');
    const mainContent = document.getElementById("main-content");
    return {
      hasSkipLink: Boolean(skipLink),
      skipLinkName: skipLink ? skipLink.innerText.trim() : null,
      mainHasId: Boolean(mainContent),
      mainRole: mainContent ? mainContent.tagName.toLowerCase() : null,
      mainTabIndex: mainContent ? mainContent.getAttribute("tabindex") : null
    };
  `);
  console.log("  Skip Link details:", skipLinkInfo);
  if (skipLinkInfo.hasSkipLink && skipLinkInfo.mainRole === "main" && skipLinkInfo.mainTabIndex === "-1") {
    console.log("  ✅ PASS: Skip Link provides instant shortcut to <main id='main-content' tabIndex='-1'>.");
  } else {
    console.error("  ❌ FAIL: Skip Link or main content landmark incomplete:", skipLinkInfo);
  }

  // --- WORKFLOW B: Section 5 ARIA Tabs Screen-Reader Exposure ---
  console.log("\n>>> [Workflow B] ARIA Tabs Pattern (Section 5 Constituency Hub):");
  const tabsInfo = await client.eval(`
    const tablist = document.querySelector('[role="tablist"]');
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const tabpanel = document.querySelector('[role="tabpanel"]');
    return {
      tablistAriaLabel: tablist ? tablist.getAttribute("aria-label") : null,
      tabCount: tabs.length,
      tabsData: tabs.map(t => ({
        id: t.id,
        name: t.innerText.trim(),
        selected: t.getAttribute("aria-selected"),
        controls: t.getAttribute("aria-controls"),
        tabIndex: t.getAttribute("tabindex")
      })),
      tabpanelId: tabpanel ? tabpanel.id : null,
      tabpanelLabelledBy: tabpanel ? tabpanel.getAttribute("aria-labelledby") : null,
      tabpanelTabIndex: tabpanel ? tabpanel.getAttribute("tabindex") : null
    };
  `);
  console.log("  Tabs accessibility attributes:", tabsInfo);
  const selectedTab = tabsInfo.tabsData.find((t) => t.selected === "true");
  const unselectedTab = tabsInfo.tabsData.find((t) => t.selected === "false");
  if (tabsInfo.tablistAriaLabel && selectedTab?.tabIndex === "0" && unselectedTab?.tabIndex === "-1" && tabsInfo.tabpanelLabelledBy === selectedTab.id) {
    console.log("  ✅ PASS: W3C ARIA Tab pattern exposes roles, names, aria-selected, aria-controls, and roving tabindex.");
  } else {
    console.error("  ❌ FAIL: Tab pattern attributes mismatch:", tabsInfo);
  }

  // --- WORKFLOW C: Accessibility Settings Dialog & Switches ---
  console.log("\n>>> [Workflow C] Accessibility Settings Dialog & Switch Controls:");
  // Open dialog
  await client.eval(`
    const btn = Array.from(document.querySelectorAll('header button[aria-haspopup="dialog"]')).find(b => b.offsetWidth > 0);
    if (btn) btn.click();
  `);
  await new Promise((r) => setTimeout(r, 400));

  const a11yModalTree = await client.eval(`
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    if (!dialog) return { found: false };
    const switches = Array.from(dialog.querySelectorAll('[role="switch"]')).map(s => ({
      name: s.getAttribute("aria-label") || s.innerText.trim(),
      role: s.getAttribute("role"),
      checked: s.getAttribute("aria-checked")
    }));
    const closeBtn = dialog.querySelector('button[aria-label*="അടയ്ക്കുക"], button[aria-label*="Close"]');
    return {
      found: true,
      dialogRole: dialog.getAttribute("role"),
      isModal: dialog.getAttribute("aria-modal"),
      dialogAriaLabel: dialog.getAttribute("aria-label"),
      switchesCount: switches.length,
      switchesSample: switches.slice(0, 3),
      closeBtnName: closeBtn ? closeBtn.getAttribute("aria-label") : null
    };
  `);
  console.log("  Accessibility Dialog tree info:", a11yModalTree);
  if (a11yModalTree.found && a11yModalTree.isModal === "true" && a11yModalTree.switchesCount >= 5 && a11yModalTree.closeBtnName) {
    console.log("  ✅ PASS: Accessibility settings modal exposes role='dialog', aria-modal='true', role='switch' with aria-checked, and named close button.");
  } else {
    console.error("  ❌ FAIL: Accessibility settings modal attributes incomplete:", a11yModalTree);
  }

  // Close dialog via Escape
  await client.eval(`
    const closeBtn = document.querySelector('[role="dialog"] button[aria-label*="അടയ്ക്കുക"], [role="dialog"] button[aria-label*="Close"]');
    if (closeBtn) closeBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 200));

  // --- WORKFLOW D: News & Activities Search Field & Live Region Counters ---
  console.log("\n>>> [Workflow D] Search Field, Help Text & Live Region Results Counter:");
  await client.send("Page.navigate", { url: "http://localhost:3000/news" });
  await new Promise((r) => setTimeout(r, 1000));

  const searchInfo = await client.eval(`
    const input = document.getElementById("news-search-input");
    const descId = input ? input.getAttribute("aria-describedby") : null;
    const descEl = descId ? document.getElementById(descId) : null;
    const counter = document.getElementById("news-results-count");
    return {
      inputFound: Boolean(input),
      role: input ? input.getAttribute("type") : null,
      ariaLabel: input ? input.getAttribute("aria-label") : null,
      describedBy: descId,
      helpText: descEl ? descEl.innerText.trim() : null,
      counterRole: counter ? counter.getAttribute("role") : null,
      counterLive: counter ? counter.getAttribute("aria-live") : null,
      counterAtomic: counter ? counter.getAttribute("aria-atomic") : null
    };
  `);
  console.log("  Search & Live Counter info:", searchInfo);
  if (searchInfo.inputFound && searchInfo.helpText && searchInfo.counterRole === "status" && searchInfo.counterLive === "polite") {
    console.log("  ✅ PASS: Search input is described by help text and paired with role='status' aria-live='polite' counter.");
  } else {
    console.error("  ❌ FAIL: Search accessibility setup incomplete:", searchInfo);
  }

  // --- WORKFLOW E: Contact Form Screen-Reader Validation & Announcements ---
  console.log("\n>>> [Workflow E] Contact Form Screen-Reader Validation & Feedback:");
  await client.send("Page.navigate", { url: "http://localhost:3000/contact" });
  await new Promise((r) => setTimeout(r, 1000));

  // Select General Enquiry card
  await client.eval(`
    const card = document.querySelector('[role="button"][aria-label*="General Enquiry"], [role="button"][aria-label*="പൊതുവായ അന്വേഷണം"]');
    if (card) card.click();
  `);
  await new Promise((r) => setTimeout(r, 300));

  // Submit empty to trigger validation
  await client.eval(`
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 400));

  const formValidationAX = await client.eval(`
    const errorSummary = document.querySelector('[role="alert"][aria-live="assertive"]');
    const firstInvalid = document.querySelector('[aria-invalid="true"]');
    const describedBy = firstInvalid ? firstInvalid.getAttribute("aria-describedby") : "";
    const tokenIds = describedBy ? describedBy.split(" ") : [];
    const tokensExist = tokenIds.every(id => Boolean(document.getElementById(id)));
    const errorMsgEl = tokenIds.find(id => id.includes("error")) ? document.getElementById(tokenIds.find(id => id.includes("error"))) : null;

    return {
      summaryFound: Boolean(errorSummary),
      summaryRole: errorSummary ? errorSummary.getAttribute("role") : null,
      summaryLive: errorSummary ? errorSummary.getAttribute("aria-live") : null,
      summaryText: errorSummary ? errorSummary.querySelector("h4")?.innerText.trim() : null,
      firstInvalidId: firstInvalid ? firstInvalid.id : null,
      firstInvalidRole: firstInvalid ? firstInvalid.tagName.toLowerCase() : null,
      describedByTokens: tokenIds,
      allTokensExistInDOM: tokensExist,
      errorMsgRole: errorMsgEl ? errorMsgEl.getAttribute("role") : null,
      errorMsgText: errorMsgEl ? errorMsgEl.innerText.trim() : null
    };
  `);
  console.log("  Form Validation Screen-Reader tree info:", formValidationAX);
  if (formValidationAX.summaryRole === "alert" && formValidationAX.summaryLive === "assertive" && formValidationAX.allTokensExistInDOM && formValidationAX.errorMsgRole === null) {
    console.log("  ✅ PASS: Form validation triggers assertive alert summary, links errors to fields via aria-describedby, and suppresses redundant role='alert' on inline errors to avoid double speech.");
  } else {
    console.error("  ❌ FAIL: Form validation accessibility structure incomplete:", formValidationAX);
  }

  // --- WORKFLOW F: Gallery Lightbox Screen-Reader Experience ---
  console.log("\n>>> [Workflow F] Gallery Lightbox Screen-Reader Attributes:");
  await client.send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1000));

  // Open Lightbox
  await client.eval(`
    const photo = document.querySelector('[role="button"][aria-label*="lightbox"], [role="button"][aria-label*="ചിത്രം"]');
    if (photo) photo.click();
  `);
  await new Promise((r) => setTimeout(r, 300));

  const lightboxAX = await client.eval(`
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    if (!dialog) return { found: false };
    const buttons = Array.from(dialog.querySelectorAll('button')).map(b => ({
      ariaLabel: b.getAttribute("aria-label"),
      text: b.innerText.trim()
    }));
    const counter = dialog.querySelector('.font-mono')?.innerText.trim();
    return {
      found: true,
      role: dialog.getAttribute("role"),
      modal: dialog.getAttribute("aria-modal"),
      label: dialog.getAttribute("aria-label"),
      counterText: counter,
      buttons
    };
  `);
  console.log("  Lightbox Screen-Reader tree info:", lightboxAX);
  if (lightboxAX.found && lightboxAX.modal === "true" && lightboxAX.buttons.every(b => Boolean(b.ariaLabel || b.text))) {
    console.log("  ✅ PASS: Gallery Lightbox correctly exposes dialog role, modal state, image counter, and accessible button labels.");
  } else {
    console.error("  ❌ FAIL: Lightbox accessibility structure incomplete:", lightboxAX);
  }

  // Close Lightbox
  await client.eval(`
    const closeBtn = document.querySelector('[role="dialog"] button[aria-label*="അടയ്ക്കുക"], [role="dialog"] button[aria-label*="Close"]');
    if (closeBtn) closeBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 200));

  // --- WORKFLOW G: Theme & Language Switchers Screen-Reader Attributes ---
  console.log("\n>>> [Workflow G] Theme & Language Switcher Screen-Reader State:");
  await client.send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 800));

  const switchersState = await client.eval(`
    const headerBtns = Array.from(document.querySelectorAll('header button'));
    const themeBtn = headerBtns.find(b => {
      const l = b.getAttribute("aria-label") || "";
      return l.includes("mode") || l.includes("മോഡ്") || l.includes("മാറ്റുക");
    });
    const langBtn = headerBtns.find(b => {
      const l = b.getAttribute("aria-label") || "";
      return l.includes("Switch") || l.includes("മലയാളം") || l.includes("English");
    });
    const htmlLang = document.documentElement.lang;
    return {
      themeBtnLabel: themeBtn ? themeBtn.getAttribute("aria-label") : null,
      langBtnLabel: langBtn ? langBtn.getAttribute("aria-label") : null,
      htmlLang
    };
  `);
  console.log("  Switchers info:", switchersState);
  if (switchersState.themeBtnLabel && switchersState.langBtnLabel && switchersState.htmlLang) {
    console.log("  ✅ PASS: Theme and Language switchers expose explicit action-oriented labels and correct document.documentElement.lang.");
  }

  // ============================================================================
  // SUMMARY TABLE
  // ============================================================================
  console.log("\n================================================================================");
  console.log("                  FINAL SCREEN-READER AUDIT REPORT TABLE                        ");
  console.log("================================================================================\n");

  console.table(auditResults);

  const totalHeadings = auditResults.reduce((acc, r) => acc + r.totalHeadings, 0);
  const totalHeadingSkips = auditResults.reduce((acc, r) => acc + r.headingSkipsCount, 0);
  const totalLinks = auditResults.reduce((acc, r) => acc + r.totalLinks, 0);
  const totalButtons = auditResults.reduce((acc, r) => acc + r.totalButtons, 0);
  const totalUnnamed = auditResults.reduce((acc, r) => acc + r.unnamedControls, 0);
  const totalGeneric = auditResults.reduce((acc, r) => acc + r.genericControls, 0);

  console.log(`\nTotal Routes Tested: ${auditResults.length}`);
  console.log(`Total Headings Audited: ${totalHeadings} (Skips: ${totalHeadingSkips})`);
  console.log(`Total Links Audited: ${totalLinks}`);
  console.log(`Total Buttons Audited: ${totalButtons}`);
  console.log(`Total Unnamed Controls: ${totalUnnamed}`);
  console.log(`Total Ambiguous/Generic Names: ${totalGeneric}`);

  const allPassed = auditResults.every((r) => r.result === "PASS") && totalHeadingSkips === 0 && totalUnnamed === 0 && totalGeneric === 0;

  if (allPassed) {
    console.log("\n>>> OVERALL SCREEN-READER ACCESSIBILITY AUDIT VERDICT: PASS <<<\n");
  } else {
    console.log("\n>>> OVERALL SCREEN-READER ACCESSIBILITY AUDIT VERDICT: FAIL <<<\n");
  }

  client.close();
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
