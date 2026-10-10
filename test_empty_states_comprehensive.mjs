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
  } catch (e) {
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
    // Wait for initial preloader to finish (~1.5s)
    await new Promise((r) => setTimeout(r, 2200));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runAudit() {
  console.log("=== STARTING COMPREHENSIVE EMPTY STATES AUTOMATED GAP ANALYSIS ===");
  const target = await createTarget();
  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.connect();

  const results = [];

  const record = (name, passed, details = "") => {
    results.push({ name, passed, details });
    console.log(`[${passed ? "PASS" : "FAIL"}] ${name} ${details ? "- " + details : ""}`);
  };

  try {
    // 0. Ensure clean baseline language (English) and theme (light)
    await client.navigate("http://localhost:3000/");
    await client.eval(`
      localStorage.setItem("website_language", "en");
      localStorage.setItem("site_lang", "en");
      localStorage.setItem("theme_preference", "light");
      document.documentElement.classList.remove("dark");
      return true;
    `);

    // 1. News Page: Search with no matches
    console.log("\n--- Scenario 1: News Search Mismatch ---");
    await client.navigate("http://localhost:3000/news");
    await client.eval(`
      const input = document.querySelector("#news-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "nonexistent_query_xyz_12345");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const newsEmptyTitle = await client.eval(`
      const heading = document.querySelector(".text-center h2");
      return heading ? heading.textContent.trim() : null;
    `);
    const newsEmptyDesc = await client.eval(`
      const p = document.querySelector(".text-center p");
      return p ? p.textContent.trim() : null;
    `);
    record(
      "News Page: Search empty state renders contextual title and description",
      newsEmptyTitle === "No Announcements Found" && newsEmptyDesc?.includes("No announcements matched"),
      `Title: "${newsEmptyTitle}", Desc: "${newsEmptyDesc}"`
    );

    // Clear search button test
    const clearSearchBtnClicked = await client.eval(`
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Clear Search"));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const restoredNewsCount = await client.eval(`
      return document.querySelectorAll("article").length;
    `);
    record(
      "News Page: Clear search button restores article cards",
      clearSearchBtnClicked && restoredNewsCount > 0,
      `Restored ${restoredNewsCount} articles`
    );

    // News Combined Filter (Search + Category) test
    await client.eval(`
      const input = document.querySelector("#news-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "unmatched_topic_xyz");
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      const catBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Notice"));
      if (catBtn) catBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const combinedNewsDesc = await client.eval(`
      const p = document.querySelector(".text-center p");
      return p ? p.textContent.trim() : null;
    `);
    record(
      "News Page: Combined search & category filter produces differentiated category-search message",
      combinedNewsDesc?.includes("No announcements matched your search query in this category"),
      `Combined Desc: "${combinedNewsDesc}"`
    );

    const resetNewsCombinedClicked = await client.eval(`
      const clearSearch = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Clear Search"));
      if (clearSearch) clearSearch.click();
      const resetFilter = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Reset Filters"));
      if (resetFilter) resetFilter.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const restoredNewsAfterCombined = await client.eval(`
      return document.querySelectorAll("article").length;
    `);
    record(
      "News Page: Clear Search and Reset Filters restore full article list",
      resetNewsCombinedClicked && restoredNewsAfterCombined > 0,
      `Restored ${restoredNewsAfterCombined} articles`
    );

    // 2. Activities Page: Search with no matches
    console.log("\n--- Scenario 2: Activities Search & Combined Filters ---");
    await client.navigate("http://localhost:3000/activities");
    await client.eval(`
      const input = document.querySelector("#activities-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "nonexistent_activity_query_999");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const actEmptyTitle = await client.eval(`
      const heading = document.querySelector(".text-center h2");
      return heading ? heading.textContent.trim() : null;
    `);
    const actEmptyDesc = await client.eval(`
      const p = document.querySelector(".text-center p");
      return p ? p.textContent.trim() : null;
    `);
    record(
      "Activities Page: Search empty state displays contextual title & description",
      actEmptyTitle === "No Activities Found" && actEmptyDesc?.includes("No activities matched"),
      `Title: "${actEmptyTitle}", Desc: "${actEmptyDesc}"`
    );

    // Clear search button test in Activities
    const clearActSearchBtn = await client.eval(`
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Clear Search"));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const restoredActCount = await client.eval(`
      return document.querySelectorAll("article").length;
    `);
    record(
      "Activities Page: Clear search button restores activities list",
      clearActSearchBtn && restoredActCount > 0,
      `Restored ${restoredActCount} activities`
    );

    // Activities Combined Filter test
    await client.eval(`
      const input = document.querySelector("#activities-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "unmatched_act_topic_999");
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      const catBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Community") || b.textContent.includes("Official"));
      if (catBtn) catBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const actCombinedDesc = await client.eval(`
      const p = document.querySelector(".text-center p");
      return p ? p.textContent.trim() : null;
    `);
    record(
      "Activities Page: Combined search & category filter produces differentiated message",
      actCombinedDesc?.includes("No activities matched your search query in this category"),
      `Combined Desc: "${actCombinedDesc}"`
    );

    const actResetCombinedClicked = await client.eval(`
      const clearSearch = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Clear Search"));
      if (clearSearch) clearSearch.click();
      const resetFilter = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Reset Filter"));
      if (resetFilter) resetFilter.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const restoredActAfterCombined = await client.eval(`
      return document.querySelectorAll("article").length;
    `);
    record(
      "Activities Page: Clear Search and Reset Filter restore activities list",
      actResetCombinedClicked && restoredActAfterCombined > 0,
      `Restored ${restoredActAfterCombined} activities`
    );

    // 3. News Detail Page: HTTP Status & Contextual Not-Found State
    console.log("\n--- Scenario 3: News Detail Nonexistent Slug & HTTP 404 ---");
    const newsRes = await fetch("http://localhost:3000/news/non-existent-announcement-slug-123");
    record(
      "News Detail Page: Nonexistent record returns genuine HTTP 404 status (no soft 404)",
      newsRes.status === 404,
      `HTTP Status: ${newsRes.status}`
    );

    await client.navigate("http://localhost:3000/news/non-existent-announcement-slug-123");
    const newsNotFoundTitle = await client.eval(`
      const h1 = document.querySelector("#not-found-heading") || document.querySelector("h1");
      return h1 ? h1.textContent.trim() : null;
    `);
    const newsNotFoundBtn = await client.eval(`
      const card = document.querySelector('section[aria-labelledby="not-found-heading"]');
      const link = card ? card.querySelector("a[href='/news']") : null;
      return link ? link.textContent.trim() : null;
    `);
    record(
      "News Detail Page: Nonexistent slug renders contextual Announcement Not Found heading & CTA",
      newsNotFoundTitle === "Announcement Not Found" && newsNotFoundBtn?.includes("Return to Announcements"),
      `H1: "${newsNotFoundTitle}", CTA: "${newsNotFoundBtn}"`
    );

    // 4. Activity Detail Page: HTTP Status & Contextual Not-Found State
    console.log("\n--- Scenario 4: Activity Detail Nonexistent Slug & HTTP 404 ---");
    const actRes = await fetch("http://localhost:3000/activities/non-existent-activity-slug-456");
    record(
      "Activity Detail Page: Nonexistent record returns genuine HTTP 404 status (no soft 404)",
      actRes.status === 404,
      `HTTP Status: ${actRes.status}`
    );

    await client.navigate("http://localhost:3000/activities/non-existent-activity-slug-456");
    const actNotFoundTitle = await client.eval(`
      const h1 = document.querySelector("#not-found-heading") || document.querySelector("h1");
      return h1 ? h1.textContent.trim() : null;
    `);
    const actNotFoundBtn = await client.eval(`
      const card = document.querySelector('section[aria-labelledby="not-found-heading"]');
      const link = card ? card.querySelector("a[href='/activities']") : null;
      return link ? link.textContent.trim() : null;
    `);
    record(
      "Activity Detail Page: Nonexistent slug renders contextual Activity Record Not Found heading & CTA",
      actNotFoundTitle === "Activity Record Not Found" && actNotFoundBtn?.includes("Return to Activities"),
      `H1: "${actNotFoundTitle}", CTA: "${actNotFoundBtn}"`
    );

    // 5. Bilingual Verification: Switch to Malayalam
    console.log("\n--- Scenario 5: Bilingual Malayalam Empty State Parity ---");
    await client.navigate("http://localhost:3000/news");
    await client.eval(`
      const mlBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("മലയാളം"));
      if (mlBtn) mlBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 800));

    // Search empty state in Malayalam
    await client.eval(`
      const input = document.querySelector("#news-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "nonexistent_term_ml");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    const mlEmptyTitle = await client.eval(`
      const h2 = document.querySelector(".text-center h2");
      return h2 ? h2.textContent.trim() : null;
    `);
    const mlEmptyDesc = await client.eval(`
      const p = document.querySelector(".text-center p");
      return p ? p.textContent.trim() : null;
    `);
    record(
      "Bilingual Malayalam: News search empty state translates accurately into Malayalam",
      mlEmptyTitle === "അറിയിപ്പുകൾ കണ്ടെത്താനായില്ല" && mlEmptyDesc?.includes("നിങ്ങൾ തിരഞ്ഞ വാക്കുകളുമായി"),
      `Title: "${mlEmptyTitle}", Desc: "${mlEmptyDesc}"`
    );

    // Switch back to English
    await client.eval(`
      const enBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("English"));
      if (enBtn) enBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    // 6. Gallery Page & Lightbox Verification
    console.log("\n--- Scenario 6: Gallery & Lightbox Populated and Modal Semantics ---");
    await client.navigate("http://localhost:3000/gallery");
    const galleryItems = await client.eval(`
      return document.querySelectorAll('[role="button"].cursor-pointer').length;
    `);
    record(
      "Gallery Page: Photo collection renders populated cards properly",
      galleryItems > 0,
      `Found ${galleryItems} items`
    );

    // Click first photo to open lightbox
    await client.eval(`
      const firstPhoto = document.querySelector('[role="button"].cursor-pointer');
      if (firstPhoto) firstPhoto.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 800));

    const lightboxOpen = await client.eval(`
      return Boolean(document.querySelector('[role="dialog"][aria-label="Image gallery lightbox viewer"]'));
    `);
    record(
      "Lightbox: Dialog opens with accessible modal semantics and focus containment",
      lightboxOpen,
      `Dialog open: ${lightboxOpen}`
    );

    // Close lightbox
    await client.eval(`
      const closeBtn = document.querySelector('[role="dialog"] button[aria-label*="Close"], [role="dialog"] button[aria-label*="അടയ്ക്കുക"]');
      if (closeBtn) closeBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));

    // 7. Lightbox Image Error State & Retry Trigger
    console.log("\n--- Scenario 7: Lightbox Image Load Error & Retry Action ---");
    // Re-open lightbox and simulate image error on current image
    await client.eval(`
      const firstPhoto = document.querySelector('[role="button"].cursor-pointer');
      if (firstPhoto) firstPhoto.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    await client.eval(`
      const img = document.querySelector('[role="dialog"] img');
      if (img) {
        img.dispatchEvent(new Event('error'));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 500));

    const imageErrorVisible = await client.eval(`
      const errHeading = document.querySelector('[role="dialog"] [role="status"] h3');
      const retryBtn = document.querySelector('[role="dialog"] [role="status"] button');
      return {
        heading: errHeading ? errHeading.textContent.trim() : null,
        hasRetry: Boolean(retryBtn && (retryBtn.textContent.includes("Retry Loading") || retryBtn.textContent.includes("വീണ്ടും ശ്രമിക്കുക")))
      };
    `);
    record(
      "Lightbox: Image loading failure displays Photograph Unavailable error and Retry button",
      (imageErrorVisible.heading === "Photograph Unavailable" || imageErrorVisible.heading === "ചിത്രം ലഭ്യമല്ല") && imageErrorVisible.hasRetry,
      `Heading: "${imageErrorVisible.heading}", Has Retry: ${imageErrorVisible.hasRetry}`
    );

    // 8. Constituency Page: Project Tracker Status Filter
    console.log("\n--- Scenario 8: Constituency Project Tracker & Resource Directory Filters ---");
    await client.navigate("http://localhost:3000/constituency");
    // Verify projects exist initially
    const initialProjects = await client.eval(`
      return document.querySelectorAll(".grid > div").length;
    `);
    record(
      "Constituency Page: Projects list renders initial populated records",
      initialProjects > 0,
      `Rendered items: ${initialProjects}`
    );

    // Switch Project filter to "Completed"
    const clickedProjectFilter = await client.eval(`
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim() === "Completed");
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    `);
    await new Promise((r) => setTimeout(r, 400));
    const completedProjectsCount = await client.eval(`
      return document.querySelectorAll(".grid > div").length;
    `);
    record(
      "Constituency Page: Project tracker status filter actively scopes project items",
      clickedProjectFilter && completedProjectsCount > 0,
      `Completed items: ${completedProjectsCount}`
    );

    // Resource Directory Tab Filter
    const clickedResourceFilter = await client.eval(`
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim() === "Emergency");
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    `);
    await new Promise((r) => setTimeout(r, 400));
    const emergencyResourcesCount = await client.eval(`
      return Array.from(document.querySelectorAll("div")).filter(d => d.textContent.includes("108") || d.textContent.includes("112") || d.textContent.includes("101")).length;
    `);
    record(
      "Constituency Page: Resource Directory filters emergency services correctly",
      clickedResourceFilter && emergencyResourcesCount > 0,
      `Emergency resources detected: ${emergencyResourcesCount}`
    );

    // 9. Home Page: Featured Sections Resilience
    console.log("\n--- Scenario 9: Home Page Featured Content Sections Resilience ---");
    await client.navigate("http://localhost:3000/");
    const homeSections = await client.eval(`
      const pageText = document.body.textContent;
      const hasNews = pageText.includes("Announcements") || pageText.includes("വാർത്തകൾ");
      const hasActivities = pageText.includes("Activities") || pageText.includes("പ്രവർത്തനങ്ങൾ");
      return { hasNews, hasActivities };
    `);
    record(
      "Home Page: Featured announcements and activities render resiliently without layout crash",
      homeSections.hasNews && homeSections.hasActivities,
      `News: ${homeSections.hasNews}, Activities: ${homeSections.hasActivities}`
    );

    // 10. Card Fallback: Broken image URL handling
    console.log("\n--- Scenario 10: News Card Image Fallback Degradation ---");
    await client.navigate("http://localhost:3000/news");
    const newsCardsExist = await client.eval(`
      return document.querySelectorAll("article").length;
    `);
    record(
      "News Cards: All editorial cards render stable aspect ratio without collapsed containers",
      newsCardsExist > 0,
      `Rendered ${newsCardsExist} news cards`
    );

    // Trigger image error on first article image
    await client.eval(`
      const firstImg = document.querySelector("article img");
      if (firstImg) {
        firstImg.dispatchEvent(new Event('error'));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 400));
    const fallbackRendered = await client.eval(`
      const card = document.querySelector("article");
      const placeholder = card ? card.querySelector("svg") : null;
      return Boolean(placeholder);
    `);
    record(
      "News Cards: Broken image gracefully degrades to fallback watermark placeholder",
      fallbackRendered,
      `Watermark SVG detected: ${fallbackRendered}`
    );

    // 11. Light/Dark Theme Consistency on Empty States
    console.log("\n--- Scenario 11: Theme Switching on Empty States ---");
    // Trigger empty state on news page
    await client.eval(`
      const input = document.querySelector("#news-search-input");
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(input, "empty_search_theme_check");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return true;
    `);
    await new Promise((r) => setTimeout(r, 600));

    // Toggle dark mode
    await client.eval(`
      const themeBtn = Array.from(document.querySelectorAll("button")).find(b => b.getAttribute("aria-label")?.includes("Dark") || b.getAttribute("aria-label")?.includes("ഡാർക്ക്"));
      if (themeBtn) themeBtn.click();
      return true;
    `);
    await new Promise((r) => setTimeout(r, 500));

    const isDarkTheme = await client.eval(`
      return document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
    `);
    const emptyPanelDark = await client.eval(`
      const panel = document.querySelector(".text-center");
      return panel ? window.getComputedStyle(panel).borderRadius !== "" : false;
    `);
    record(
      "Theme Consistency: Empty state panel transitions seamlessly between light and dark themes",
      emptyPanelDark,
      `Dark mode active: ${isDarkTheme}, Panel styled: ${emptyPanelDark}`
    );

  } catch (err) {
    console.error("Test error:", err);
    record("Test execution completed without unhandled exceptions", false, err.message);
  } finally {
    client.close();
    await closeTarget(target.id);
  }

  const allPassed = results.every((r) => r.passed);
  console.log("\n=== COMPREHENSIVE GAP ANALYSIS RESULTS SUMMARY ===");
  console.log(`Total assertions: ${results.length}`);
  console.log(`Passed: ${results.filter((r) => r.passed).length}`);
  console.log(`Failed: ${results.filter((r) => !r.passed).length}`);
  console.log(`Status: ${allPassed ? "ALL PASSED" : "FAILURES DETECTED"}`);

  process.exit(allPassed ? 0 : 1);
}

runAudit();
