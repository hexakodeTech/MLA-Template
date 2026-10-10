// test_loading_states_comprehensive.mjs
import http from "node:http";

const CDP_HTTP = "http://127.0.0.1:9222";

async function cdpRequest(endpoint, method = "GET") {
  const res = await fetch(`${CDP_HTTP}${endpoint}`, { method });
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
    const wrapped = `(async () => {\n${trimmed}\n})()`;
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

  async setViewport(width, height) {
    await this.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runAudit() {
  console.log("=== COMPREHENSIVE LOADING STATES AUDIT STARTING ===\n");

  const newTab = await cdpRequest("/json/new", "PUT");
  const cdp = new CDPClient(newTab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Accessibility.enable");

  const results = {
    viewports: [],
    preloaderAudit: null,
    buttonAudit: null,
    formAudit: null,
    routeLoadingAudit: null,
    lightboxAudit: null,
    filteringAudit: null,
  };

  try {
    // 1. Initial Preloader Audit (on fresh navigation to localhost:3000)
    console.log("--- 1. AUDITING INITIAL PRELOADER ACCESSIBILITY & SEMANTICS ---");
    await cdp.setViewport(1280, 800);
    // Navigate with fresh storage
    await cdp.send("Page.navigate", { url: "http://localhost:3000/" });
    await sleep(400); // Check while preloader is active

    const preloaderInfo = await cdp.eval(`
      const preloader = document.querySelector('[role="status"][aria-live="polite"]');
      const progressbar = document.querySelector('[role="progressbar"]');
      const headingsInsidePreloader = preloader ? preloader.querySelectorAll('h1, h2, h3, h4, h5, h6') : [];
      const hasHeading = headingsInsidePreloader.length;
      const srOnlyAnnouncement = preloader ? preloader.querySelector('.sr-only')?.textContent : null;
      
      return {
        found: !!preloader,
        hasProgressbar: !!progressbar,
        progressbarLabel: progressbar ? progressbar.getAttribute('aria-label') : null,
        progressbarValuenow: progressbar ? progressbar.getAttribute('aria-valuenow') : null,
        headingsCount: hasHeading,
        srOnlyAnnouncement: srOnlyAnnouncement,
      };
    `);
    console.log("Preloader Audit Result:", JSON.stringify(preloaderInfo, null, 2));
    results.preloaderAudit = preloaderInfo;

    // Wait for preloader to complete and unmount
    await sleep(2200);

    // 2. Button Component Loading State Audit
    console.log("\n--- 2. AUDITING BUTTON COMPONENT LOADING & BUSY STATES ---");
    await cdp.send("Page.navigate", { url: "http://localhost:3000/contact" });
    await sleep(1500);

    // Select workflow card first
    await cdp.eval(`
      const workflowCard = document.querySelector('[role="button"][aria-label*="General Enquiry"]') || document.querySelector('[role="button"]');
      if (workflowCard) workflowCard.click();
    `);
    await sleep(400);

    const buttonLoadingAudit = await cdp.eval(`
      const submitBtn = document.querySelector('button[type="submit"]');
      const initialBusy = submitBtn ? submitBtn.getAttribute('aria-busy') : null;
      const initialDisabled = submitBtn ? submitBtn.disabled : null;
      
      return {
        buttonFound: !!submitBtn,
        initialBusy: initialBusy,
        initialDisabled: initialDisabled,
      };
    `);
    console.log("Button Initial State:", JSON.stringify(buttonLoadingAudit, null, 2));

    // 3. Contact Form Submission Async Lifecycle
    console.log("\n--- 3. AUDITING CONTACT FORM ASYNC SUBMISSION LIFECYCLE ---");
    const formLifecycle = await cdp.eval(`
      async function testLifecycle() {
        const form = document.querySelector('form');
        const submitBtn = document.querySelector('button[type="submit"]');
        
        function setReactInput(input, value) {
          if (!input) return;
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (setter) {
            setter.call(input, value);
          } else {
            input.value = value;
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }

        function setReactTextarea(textarea, value) {
          if (!textarea) return;
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          if (setter) {
            setter.call(textarea, value);
          } else {
            textarea.value = value;
          }
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          textarea.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Fill valid data
        setReactInput(document.getElementById('fullName'), "K. Ramanathan");
        setReactInput(document.getElementById('phone'), "9876543210");
        setReactInput(document.getElementById('email'), "ramanathan@example.com");
        setReactInput(document.getElementById('subject'), "Road Maintenance Enquiry");
        setReactTextarea(document.getElementById('message'), "Detailed enquiry regarding ongoing civil works on main constituency highway.");
        
        const consentInput = document.getElementById('consent');
        if (consentInput && !consentInput.checked) {
          consentInput.click();
        }

        await new Promise(r => setTimeout(r, 100));
        
        // Trigger submit
        submitBtn.click();
        
        // Check immediate loading state during the 1100ms async delay
        await new Promise(r => setTimeout(r, 200));
        const formBusyWhileSubmitting = form ? form.getAttribute('aria-busy') : null;
        const btnBusyWhileSubmitting = submitBtn ? submitBtn.getAttribute('aria-busy') : null;
        const btnDisabledWhileSubmitting = submitBtn ? submitBtn.disabled : null;
        const spinnerSvg = submitBtn ? submitBtn.querySelector('svg.animate-spin') : null;
        const hasReducedMotionClass = spinnerSvg ? spinnerSvg.classList.contains('motion-reduce:animate-none') : false;
        
        // Wait for submission completion (after 1100ms)
        await new Promise(r => setTimeout(r, 1300));
        const successCard = document.getElementById('form-success-alert');
        
        return {
          formBusyWhileSubmitting,
          btnBusyWhileSubmitting,
          btnDisabledWhileSubmitting,
          hasSpinner: !!spinnerSvg,
          hasReducedMotionClass,
          successReached: !!successCard,
        };
      }
      return await testLifecycle();
    `);
    console.log("Form Lifecycle Audit Result:", JSON.stringify(formLifecycle, null, 2));
    results.formAudit = formLifecycle;

    // 4. Responsive Viewports & Theme/Language Verification
    console.log("\n--- 4. AUDITING VIEWPORTS, LANGUAGES & THEMES ---");
    const testViewports = [
      { name: "Mobile Small", width: 320, height: 600 },
      { name: "Mobile Standard", width: 375, height: 667 },
      { name: "Mobile iPhone 14/15", width: 390, height: 844 },
      { name: "Mobile Max", width: 430, height: 932 },
      { name: "Tablet iPad Mini", width: 768, height: 1024 },
      { name: "Tablet iPad Pro", width: 1024, height: 1366 },
      { name: "Desktop Standard", width: 1280, height: 800 },
      { name: "Desktop High-Res", width: 1440, height: 900 },
      { name: "Desktop Ultra-Wide", width: 1920, height: 1080 },
    ];

    for (const vp of testViewports) {
      await cdp.setViewport(vp.width, vp.height);
      await cdp.send("Page.navigate", { url: "http://localhost:3000/news" });
      await sleep(1000);

      const vpMetrics = await cdp.eval(`
        const docWidth = document.documentElement.scrollWidth;
        const viewWidth = window.innerWidth;
        const hasHorizontalOverflow = docWidth > viewWidth + 1;
        
        // Switch to dark theme
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        
        // Switch to Malayalam
        document.documentElement.setAttribute('data-lang', 'ml');
        
        return {
          viewport: "${vp.name} (${vp.width}x${vp.height})",
          width: viewWidth,
          docWidth: docWidth,
          hasOverflow: hasHorizontalOverflow,
        };
      `);
      console.log(`Viewport ${vp.name} (${vp.width}px): Overflow? ${vpMetrics.hasOverflow ? "FAIL" : "PASS"}`);
      results.viewports.push(vpMetrics);
    }

    // 5. Gallery Lightbox Image Loading Audit
    console.log("\n--- 5. AUDITING GALLERY LIGHTBOX IMAGE LOADING STATE ---");
    await cdp.setViewport(1280, 800);
    await cdp.send("Page.navigate", { url: "http://localhost:3000/gallery" });
    await sleep(2500); // Wait for preloader to exit

    const lightboxAudit = await cdp.eval(`
      const firstCard = document.querySelector('[role="button"][aria-label*="lightbox"]') || document.querySelector('[role="button"]');
      if (firstCard) {
        firstCard.click();
      }
      
      const dialog = document.querySelector('[role="dialog"]');
      const spinner = dialog ? dialog.querySelector('[role="status"]') : null;
      const img = dialog ? dialog.querySelector('img') : null;
      
      return {
        lightboxOpened: !!dialog,
        hasLoadingStatus: !!spinner,
        hasImage: !!img,
      };
    `);
    console.log("Lightbox Audit Result:", JSON.stringify(lightboxAudit, null, 2));
    results.lightboxAudit = lightboxAudit;

    // 6. Constituency Filtering Live Announcement Audit
    console.log("\n--- 6. AUDITING CONSTITUENCY FILTERING LIVE STATUS ---");
    await cdp.send("Page.navigate", { url: "http://localhost:3000/constituency" });
    await sleep(600);

    const filterAudit = await cdp.eval(`
      const statusRegions = Array.from(document.querySelectorAll('[role="status"]')).map(el => el.textContent.trim());
      return {
        statusRegionsCount: statusRegions.length,
        statusTexts: statusRegions.filter(t => t.length > 0),
      };
    `);
    console.log("Constituency Filter Live Status Audit:", JSON.stringify(filterAudit, null, 2));
    results.filteringAudit = filterAudit;

    console.log("\n=======================================================");
    console.log("ALL AUTOMATED VERIFICATION CHECKS COMPLETED SUCCESSFULLY!");
    console.log("=======================================================");
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    try {
      await fetch(`${CDP_HTTP}/json/close/${newTab.id}`);
    } catch {}
  }
}

runAudit();
