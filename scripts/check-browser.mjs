// Optional local browser regression check. Set CHROME_PATH on non-Windows hosts.
import { spawn } from "node:child_process";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";

const browserPath = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const base = process.env.SEO_PREVIEW_URL ?? "http://127.0.0.1:4173";
const profile = await mkdtemp(join(tmpdir(), "healora-seo-"));
const child = spawn(browserPath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true });
const endpoint = await new Promise((resolveEndpoint, reject) => {
  const timer = setTimeout(() => reject(new Error("Browser launch timed out")), 15000);
  child.once("error", reject);
  let log = "";
  child.stderr.on("data", (data) => {
    log += data;
    const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) { clearTimeout(timer); resolveEndpoint(match[1]); }
  });
});
const socket = new WebSocket(endpoint);
await new Promise((done) => socket.addEventListener("open", done, { once: true }));
let sequence = 0;
const pending = new Map();
const listeners = new Map();
const errors = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const entry = pending.get(message.id);
    if (!entry) return;
    clearTimeout(entry.timer);
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
  } else {
    listeners.get(message.method)?.(message.params);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
    if (message.method === "Network.responseReceived" && message.params.response.status >= 400) errors.push(`${message.params.response.status} ${message.params.response.url}`);
  }
});
function send(method, params = {}, sessionId) {
  const id = ++sequence;
  return new Promise((resolveCommand, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, 15000);
    pending.set(id, { resolve: resolveCommand, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
try {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const command = (method, params) => send(method, params, sessionId);
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Network.enable");
  const evaluate = async (expression) => {
    const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const navigate = async (path) => {
    const loaded = new Promise((done, reject) => {
      const timer = setTimeout(() => reject(new Error(`Loading ${path} timed out`)), 15000);
      listeners.set("Page.loadEventFired", () => { clearTimeout(timer); listeners.delete("Page.loadEventFired"); done(); });
    });
    await command("Page.navigate", { url: base + path });
    await loaded;
  };
  const xml = await (await fetch(base + "/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  await mkdir(resolve(".seo-qa"), { recursive: true });
  for (const width of [390, 1440]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
    for (const path of paths) {
      await navigate(path);
      const result = await evaluate(`({ overflow: document.documentElement.scrollWidth > innerWidth, h1: document.querySelectorAll('h1').length, brokenImages: [...document.images].some(i => !i.complete || !i.naturalWidth) })`);
      assert(!result.overflow, `${width}px ${path}: horizontal overflow`);
      assert.equal(result.h1, 1);
      assert(!result.brokenImages, `${width}px ${path}: broken image`);
      if (path === "/") {
        const image = await evaluate(`document.querySelector('.hero-art').currentSrc`);
        assert(image.includes(".webp"), "Responsive image was not selected");
        const screenshot = await command("Page.captureScreenshot", { format: "png" });
        await writeFile(resolve(`.seo-qa/home-${width}.png`), Buffer.from(screenshot.data, "base64"));
      }
    }
  }
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await navigate("/");
  assert(await evaluate(`document.querySelector('#mobile-nav').hidden`));
  assert(await evaluate(`document.querySelector('.menu-toggle').click(); document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true' && !document.querySelector('#mobile-nav').hidden`));
  assert(await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})); document.querySelector('#mobile-nav').hidden && document.activeElement === document.querySelector('.menu-toggle')`));
  await navigate("/services/websites-and-apps/");
  assert(await evaluate(`document.querySelector('summary').click(); document.querySelector('details').open`));
  await navigate("/contact/?service=websites-and-apps");
  assert.equal(await evaluate(`document.querySelector('[name=service]').value`), "websites-and-apps");
  assert.equal(await evaluate(`document.querySelector('form').checkValidity()`), false);
  await evaluate(`document.querySelector('[name=name]').value='Test visitor'; document.querySelector('[name=email]').value='test@example.com'; document.querySelector('[name=message]').value='Local validation only';`);
  assert.equal(await evaluate(`document.querySelector('form').checkValidity()`), true);
  // Do not submit: this form opens the visitor's email app.
  await command("Emulation.setScriptExecutionDisabled", { value: true });
  await navigate("/services/websites-and-apps/");
  const document = await command("DOM.getDocument", { depth: 0 });
  const { outerHTML } = await command("DOM.getOuterHTML", { nodeId: document.root.nodeId });
  assert(outerHTML.includes("What is included in a website development project?"));
  assert.deepEqual(errors, [], "Browser runtime/network errors");
  console.log(`Browser checks passed: ${paths.length} pages at 390px and 1440px; responsive images, menu/Escape, FAQ, enquiry preselection/validation and content without JavaScript. No form submitted.`);
} finally {
  await send("Browser.close").catch(() => {});
  socket.close();
  child.kill();
}
