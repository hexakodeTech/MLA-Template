// measure_performance.mjs
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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function measureRoute(cdp, route) {
  const url = `http://localhost:3000${route}`;
  await cdp.send("Page.navigate", { url });
  
  // Wait up to 3.5s for page to settle and preloader to exit
  await new Promise((r) => setTimeout(r, 3200));

  const metrics = await cdp.eval(`
    const nav = performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType("paint");
    const fcpEntry = paint.find(p => p.name === "first-contentful-paint");
    
    // Check if progress bar is still active in DOM
    const preloaderActive = Boolean(document.querySelector('[role="progressbar"]'));
    const mainEl = document.querySelector("#main-content") || document.querySelector("main");
    const mainVisible = Boolean(mainEl && window.getComputedStyle(mainEl).display !== "none");
    
    return {
      ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : null,
      domInteractive: nav ? Math.round(nav.domInteractive) : null,
      loadEventEnd: nav ? Math.round(nav.loadEventEnd) : null,
      fcp: fcpEntry ? Math.round(fcpEntry.startTime) : null,
      preloaderActive,
      mainVisible
    };
  `);

  return metrics;
}

async function run() {
  console.log("=== MEASURING PERFORMANCE METRICS ===");
  const newTab = await cdpRequest("/json/new", "PUT");
  const cdp = new CDPClient(newTab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");

  const routes = ["/", "/news", "/activities", "/gallery", "/constituency", "/contact"];
  const results = {};

  for (const route of routes) {
    const data = await measureRoute(cdp, route);
    results[route] = data;
    console.log(`Route ${route.padEnd(15)}: TTFB=${data.ttfb}ms | DomInteractive=${data.domInteractive}ms | LoadEvent=${data.loadEventEnd}ms | FCP=${data.fcp}ms | PreloaderActive=${data.preloaderActive}`);
  }

  cdp.close();
  await fetch(`${CDP_HTTP}/json/close/${newTab.id}`);
  console.log("\nSummary Table:");
  console.table(results);
}

run();
