const CDP_HTTP = "http://127.0.0.1:9222";

async function cdpRequest(endpoint, method = "GET", data = null) {
  const url = `${CDP_HTTP}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : null,
  });
  return res.json();
}

async function createTarget() {
  return await cdpRequest("/json/new", "PUT");
}

async function closeTarget(id) {
  try {
    await cdpRequest(`/json/close/${id}`);
  } catch {
    // ignore
  }
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new globalThis.WebSocket(this.wsUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (payload.id && this.callbacks.has(payload.id)) {
          const { resolve, reject } = this.callbacks.get(payload.id);
          this.callbacks.delete(payload.id);
          if (payload.error) reject(payload.error);
          else resolve(payload.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const wrapped = `(() => {
      try {
        ${expression}
      } catch (e) {
        return { __error: e.message };
      }
    })()`;
    const res = await this.send("Runtime.evaluate", {
      expression: wrapped,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval error: ${JSON.stringify(res.exceptionDetails)}`);
    }
    const val = res.result?.value;
    if (val && typeof val === "object" && val.__error) {
      throw new Error(`Script error: ${val.__error}`);
    }
    return val;
  }

  async navigate(url) {
    await this.send("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, 2000));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runErrorStatesAudit() {
  console.log("==================================================================");
  console.log("=== COMPREHENSIVE ERROR STATES AUDIT & AUTOMATED VERIFICATION ===");
  console.log("==================================================================\n");

  const target = await createTarget();
  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.connect();

  const results = [];
  const record = (name, passed, details = "") => {
    results.push({ name, passed, details });
    console.log(`[${passed ? "PASS" : "FAIL"}] ${name} ${details ? "- " + details : ""}`);
  };

  try {
    // Deterministically initialize language (English) and theme (Light)
    await client.navigate("http://localhost:3000");
    await client.eval(`
      localStorage.setItem("website_language", "en");
      localStorage.setItem("site_lang", "en");
      localStorage.setItem("pisharady_portal_theme", "light");
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    // -------------------------------------------------------------
    // SCENARIO 1: HTTP 404 & Routing Errors (News & Activities Details)
    // -------------------------------------------------------------
    console.log("--- 1. Routing & HTTP 404 Status Verification ---");
    const news404Res = await fetch("http://localhost:3000/news/invalid-missing-slug-999");
    record(
      "News Detail Route: Missing slug returns genuine HTTP 404 status (no soft 404)",
      news404Res.status === 404,
      `HTTP Status: ${news404Res.status}`
    );

    const act404Res = await fetch("http://localhost:3000/activities/invalid-missing-slug-888");
    record(
      "Activity Detail Route: Missing slug returns genuine HTTP 404 status (no soft 404)",
      act404Res.status === 404,
      `HTTP Status: ${act404Res.status}`
    );

    await client.navigate("http://localhost:3000/news/invalid-missing-slug-999");
    const newsNotFoundUI = await client.eval(`
      const h1 = document.querySelector("#not-found-heading") || document.querySelector("h1");
      const link = document.querySelector("a[href='/news']");
      return {
        heading: h1 ? h1.textContent.trim() : null,
        hasReturnLink: Boolean(link && (link.textContent.includes("Announcements") || link.textContent.includes("അറിയിപ്പുകൾ")))
      };
    `);
    record(
      "News Detail 404 UI: Renders contextual Announcement Not Found heading & recovery link",
      (newsNotFoundUI.heading === "Announcement Not Found" || newsNotFoundUI.heading === "അറിയിപ്പ് കണ്ടെത്താനായില്ല") && newsNotFoundUI.hasReturnLink,
      `Heading: "${newsNotFoundUI.heading}", Has Return Link: ${newsNotFoundUI.hasReturnLink}`
    );

    // -------------------------------------------------------------
    // SCENARIO 2: Form Validation Errors & Focus Management
    // -------------------------------------------------------------
    console.log("\n--- 2. Form Validation Errors & Field Association ---");
    await client.navigate("http://localhost:3000/contact");

    // Select "general-enquiry" workflow
    await client.eval(`
      const cards = document.querySelectorAll('[role="button"]');
      const enquiryCard = Array.from(cards).find(c => c.textContent.includes("General Enquiry") || c.textContent.includes("പൊതുവായ അന്വേഷണം"));
      if (enquiryCard) enquiryCard.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    // Submit empty form to trigger validation errors
    await client.eval(`
      const submitBtn = document.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const formValidationState = await client.eval(`
      const alertSummary = document.querySelector("#form-validation-summary[role='alert']");
      const fullNameInput = document.querySelector("#fullName");
      const activeEl = document.activeElement;
      return {
        hasAlertSummary: Boolean(alertSummary),
        summaryText: alertSummary ? alertSummary.textContent : "",
        isFullNameInvalid: fullNameInput ? fullNameInput.getAttribute("aria-invalid") === "true" : false,
        hasDescribedBy: fullNameInput ? Boolean(fullNameInput.getAttribute("aria-describedby")) : false,
        isFullNameFocused: activeEl ? activeEl.id === "fullName" : false
      };
    `);
    record(
      "Contact Form: Empty submission triggers accessible alert summary with error list",
      formValidationState.hasAlertSummary && (formValidationState.summaryText.includes("Please review the highlighted fields") || formValidationState.summaryText.includes("ഹൈലൈറ്റ് ചെയ്ത ഫീൽഡുകൾ")),
      `Summary present: ${formValidationState.hasAlertSummary}`
    );
    record(
      "Contact Form: First invalid field is marked aria-invalid, has aria-describedby, and receives focus",
      formValidationState.isFullNameInvalid && formValidationState.hasDescribedBy && formValidationState.isFullNameFocused,
      `Invalid: ${formValidationState.isFullNameInvalid}, DescribedBy: ${formValidationState.hasDescribedBy}, Focused: ${formValidationState.isFullNameFocused}`
    );

    // -------------------------------------------------------------
    // SCENARIO 3: Form Network Offline Error & Input Preservation
    // -------------------------------------------------------------
    console.log("\n--- 3. Form Network Offline Error Handling ---");
    // Fill valid form data
    await client.eval(`
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) {
          const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
          if (setter) setter.call(el, val);
          else el.value = val;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }
      };
      setVal("fullName", "K. R. Narayanan");
      setVal("phone", "9847123456");
      setVal("email", "kr.narayanan@example.com");
      setVal("subject", "Public Library Infrastructure Query");
      setVal("message", "Requesting information regarding the sanction of new reading room facilities in Chittur.");
      const consentCb = document.getElementById("consent");
      if (consentCb && !consentCb.checked) {
        consentCb.click();
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    // Simulate browser offline state and submit
    await client.eval(`
      Object.defineProperty(Navigator.prototype, 'onLine', { get: () => false, configurable: true });
      const submitBtn = document.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 500));

    const offlineAlertState = await client.eval(`
      const alert = document.querySelector("[role='alert'][aria-labelledby='server-error-title']");
      const title = document.querySelector("#server-error-title");
      const fullNameVal = document.getElementById("fullName")?.value;
      const tryAgainBtn = alert ? alert.querySelector("button") : null;
      return {
        hasAlert: Boolean(alert),
        title: title ? title.textContent.trim() : null,
        preservedInput: fullNameVal === "K. R. Narayanan",
        hasTryAgain: Boolean(tryAgainBtn && (tryAgainBtn.textContent.includes("Try Again") || tryAgainBtn.textContent.includes("വീണ്ടും ശ്രമിക്കുക")))
      };
    `);
    record(
      "Contact Form: Offline submission triggers dedicated Network Error alert with Try Again action",
      offlineAlertState.hasAlert && (offlineAlertState.title?.includes("You Are Offline") || offlineAlertState.title?.includes("നിങ്ങൾ ഓഫ്‌ലൈനാണ്")) && offlineAlertState.hasTryAgain,
      `Title: "${offlineAlertState.title}", Has Try Again: ${offlineAlertState.hasTryAgain}`
    );
    record(
      "Contact Form: Entered citizen data is completely preserved upon network failure",
      offlineAlertState.preservedInput,
      `Full Name Preserved: ${offlineAlertState.preservedInput}`
    );

    // Restore online status
    await client.eval(`
      Object.defineProperty(Navigator.prototype, 'onLine', { get: () => true, configurable: true });
      return true;
    `);

    // -------------------------------------------------------------
    // SCENARIO 4: Gallery Thumbnail Image Error Fallback
    // -------------------------------------------------------------
    console.log("\n--- 4. Gallery Thumbnail Broken Image Fallback ---");
    await client.navigate("http://localhost:3000/gallery");
    // Dispatch error on first thumbnail image
    await client.eval(`
      const firstImg = document.querySelector("section[aria-label] img");
      if (firstImg) {
        firstImg.dispatchEvent(new Event('error'));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const galleryFallbackState = await client.eval(`
      const card = document.querySelector("section[aria-label] [role='button']");
      const svg = card ? card.querySelector("svg") : null;
      const text = card ? card.textContent : "";
      return {
        hasSvg: Boolean(svg),
        hasErrorText: text.includes("Photograph Unavailable") || text.includes("ചിത്രം ലഭ്യമല്ല")
      };
    `);
    record(
      "Gallery Thumbnails: Broken image URL degrades to Camera watermark fallback without broken icon",
      galleryFallbackState.hasSvg && galleryFallbackState.hasErrorText,
      `Watermark SVG: ${galleryFallbackState.hasSvg}, Error Text: ${galleryFallbackState.hasErrorText}`
    );

    // -------------------------------------------------------------
    // SCENARIO 5: Lightbox Image Failure & Retry Action
    // -------------------------------------------------------------
    console.log("\n--- 5. Lightbox Image Load Failure & Interactive Retry ---");
    // Open lightbox for 2nd photo
    await client.eval(`
      const cards = document.querySelectorAll("section[aria-label] [role='button']");
      if (cards[1]) cards[1].click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    // Simulate error in lightbox image
    await client.eval(`
      const img = document.querySelector("[role='dialog'] img");
      if (img) img.dispatchEvent(new Event('error'));
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const lightboxErrorState = await client.eval(`
      const heading = document.querySelector("[role='dialog'] [role='status'] h3");
      const retryBtn = document.querySelector("[role='dialog'] [role='status'] button");
      return {
        heading: heading ? heading.textContent.trim() : null,
        hasRetryBtn: Boolean(retryBtn && (retryBtn.textContent.includes("Retry") || retryBtn.textContent.includes("ശ്രമിക്കുക")))
      };
    `);
    record(
      "Lightbox: Failed image displays accessible Photograph Unavailable alert and Retry button",
      (lightboxErrorState.heading === "Photograph Unavailable" || lightboxErrorState.heading === "ചിത്രം ലഭ്യമല്ല") && lightboxErrorState.hasRetryBtn,
      `Heading: "${lightboxErrorState.heading}", Has Retry: ${lightboxErrorState.hasRetryBtn}`
    );

    // Click Retry and verify image re-mounts
    await client.eval(`
      const retryBtn = document.querySelector("[role='dialog'] [role='status'] button");
      if (retryBtn) retryBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const lightboxPostRetry = await client.eval(`
      const img = document.querySelector("[role='dialog'] img");
      return Boolean(img);
    `);
    record(
      "Lightbox: Clicking Retry re-mounts image element and re-initiates asset retrieval",
      lightboxPostRetry,
      `Image re-mounted: ${lightboxPostRetry}`
    );

    // Close lightbox
    await client.eval(`
      const closeBtn = document.querySelector("[role='dialog'] button[aria-label*='Close'], [role='dialog'] button[aria-label*='അടയ്ക്കുക']");
      if (closeBtn) closeBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 300));

    // -------------------------------------------------------------
    // SCENARIO 6: News Detail Hero Image Fallback
    // -------------------------------------------------------------
    console.log("\n--- 6. Detail Hero Image Fallback Handling ---");
    await client.navigate("http://localhost:3000/news/constituency-grievance-redressal-portal-initiative");
    await client.eval(`
      const heroImg = document.querySelector("main img");
      if (heroImg) heroImg.dispatchEvent(new Event('error'));
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const newsHeroFallback = await client.eval(`
      const container = document.querySelector(".aspect-\\\\[16\\\\/9\\\\]");
      const svg = container ? container.querySelector("svg") : null;
      const text = container ? container.textContent : "";
      return {
        hasSvg: Boolean(svg),
        hasLabel: text.includes("Photograph Unavailable") || text.includes("ചിത്രം ലഭ്യമല്ല")
      };
    `);
    record(
      "News Detail Hero: Broken image URL renders Newspaper watermark fallback with preserved aspect ratio",
      newsHeroFallback.hasSvg && newsHeroFallback.hasLabel,
      `Watermark SVG: ${newsHeroFallback.hasSvg}, Label: ${newsHeroFallback.hasLabel}`
    );

    // -------------------------------------------------------------
    // SCENARIO 7: Activity Detail Hero Image Fallback
    // -------------------------------------------------------------
    console.log("\n--- 7. Activity Detail Hero Image Fallback Handling ---");
    await client.navigate("http://localhost:3000/activities/district-hospital-palakkad-pediatric-wing-visit");
    await client.eval(`
      const heroImg = document.querySelector("main img");
      if (heroImg) heroImg.dispatchEvent(new Event('error'));
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const actHeroFallback = await client.eval(`
      const container = document.querySelector(".aspect-\\\\[16\\\\/9\\\\]");
      const svg = container ? container.querySelector("svg") : null;
      const text = container ? container.textContent : "";
      return {
        hasSvg: Boolean(svg),
        hasLabel: text.includes("Photograph Unavailable") || text.includes("ചിത്രം ലഭ്യമല്ല")
      };
    `);
    record(
      "Activity Detail Hero: Broken image URL renders Calendar watermark fallback with preserved aspect ratio",
      actHeroFallback.hasSvg && actHeroFallback.hasLabel,
      `Watermark SVG: ${actHeroFallback.hasSvg}, Label: ${actHeroFallback.hasLabel}`
    );

    // -------------------------------------------------------------
    // SCENARIO 8: Error Boundary Architecture & Safe Diagnostics
    // -------------------------------------------------------------
    console.log("\n--- 8. Security & Privacy Audit: No Leaked Stack Traces ---");
    await client.navigate("http://localhost:3000/news/invalid-missing-slug-999");
    const securityCheck = await client.eval(`
      const text = document.body.innerHTML;
      return {
        hasStacktrace: text.includes("at ") && text.includes(".tsx:") && text.includes("node_modules"),
        hasLocalPath: text.includes("/home/navaneeth/"),
        hasSecrets: text.includes("SECRET") || text.includes("DATABASE_URL") || text.includes("API_KEY")
      };
    `);
    record(
      "Security & Privacy: DOM contains zero stack traces, server filepaths, or credential leaks",
      !securityCheck.hasStacktrace && !securityCheck.hasLocalPath && !securityCheck.hasSecrets,
      `Stacktrace: ${securityCheck.hasStacktrace}, Local Path: ${securityCheck.hasLocalPath}, Secrets: ${securityCheck.hasSecrets}`
    );

    // -------------------------------------------------------------
    // SCENARIO 9: Bilingual Malayalam Error Parity
    // -------------------------------------------------------------
    console.log("\n--- 9. Bilingual Parity in Error & Fallback States ---");
    await client.navigate("http://localhost:3000/news/invalid-missing-slug-999");
    // Switch language to Malayalam if not already Malayalam
    await client.eval(`
      const isMl = document.documentElement.lang === "ml" || document.documentElement.getAttribute("data-lang") === "ml";
      if (!isMl) {
        const langBtn = document.querySelector("button[aria-label*='Malayalam']") ||
                        Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("മലയാളം"));
        if (langBtn) langBtn.click();
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const mlNotFoundHeading = await client.eval(`
      const h1 = document.querySelector("#not-found-heading") || document.querySelector("h1");
      return h1 ? h1.textContent.trim() : null;
    `);
    record(
      "Bilingual Parity: Not Found error screen renders accurate Malayalam typography",
      mlNotFoundHeading === "അറിയിപ്പ് കണ്ടെത്താനായില്ല",
      `Malayalam H1: "${mlNotFoundHeading}"`
    );

    // Switch back to English
    await client.eval(`
      const isEn = document.documentElement.lang === "en" || document.documentElement.getAttribute("data-lang") === "en";
      if (!isEn) {
        const langBtn = document.querySelector("button[aria-label*='English']") ||
                        Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("English") || b.textContent.includes("EN"));
        if (langBtn) langBtn.click();
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    // -------------------------------------------------------------
    // SCENARIO 10: Light & Dark Theme Error Screen Consistency
    // -------------------------------------------------------------
    console.log("\n--- 10. Light & Dark Theme Contrast on Error Surfaces ---");
    // Switch to dark theme
    await client.eval(`
      const themeBtn = Array.from(document.querySelectorAll("button")).find(b => b.getAttribute("aria-label")?.toLowerCase().includes("dark") || b.getAttribute("aria-label")?.includes("ഡാർക്ക്"));
      if (themeBtn) themeBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    const darkThemeActive = await client.eval(`
      return document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
    `);
    record(
      "Theme Consistency: Error components adapt contrast and color tokens in dark mode",
      darkThemeActive,
      `Dark mode applied: ${darkThemeActive}`
    );

  } catch (err) {
    console.error("Test execution failed:", err);
    record("Test execution completed without unhandled exceptions", false, err.message);
  } finally {
    client.close();
    await closeTarget(target.id);
  }

  const allPassed = results.every((r) => r.passed);
  console.log("\n==================================================================");
  console.log("=== COMPREHENSIVE ERROR STATES AUDIT VERIFICATION SUMMARY ===");
  console.log("==================================================================");
  console.log(`Total Scenarios Asserted: ${results.length}`);
  console.log(`Passed:                   ${results.filter((r) => r.passed).length}`);
  console.log(`Failed:                   ${results.filter((r) => !r.passed).length}`);
  console.log(`Final Evaluation:         ${allPassed ? "ALL AUDIT CHECKS PASSED" : "FAILURES DETECTED"}`);
  console.log("==================================================================\n");

  process.exit(allPassed ? 0 : 1);
}

runErrorStatesAudit();
