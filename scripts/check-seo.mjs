import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

// Zero dependencies: validate the actual publish directory, not the old Next app.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", ".static-dist");
const origin = "https://www.healora.org";
const read = (path) => readFile(resolve(root, `.${path}`), "utf8");
const sitemap = await read("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
assert.equal(urls.length, 17, "Unexpected public page count: review sitemap coverage");
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map((m) => [m[1], m[2] ?? m[3] ?? m[4]]));
const meta = (html, name) => [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0])).filter((m) => m.name === name || m.property === name);
const oneMeta = (html, name) => {
  const entries = meta(html, name);
  assert.equal(entries.length, 1, `Expected one ${name}`);
  return entries[0].content;
};
for (const absolute of urls) {
  const url = new URL(absolute);
  assert.equal(url.origin, origin);
  assert(url.pathname.endsWith("/"));
  assert(!url.search && !url.hash);
  const html = await read(`${url.pathname}index.html`);
  pages.set(url.pathname, html);
  const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(title.length, 1, `${url.pathname}: title count`);
  assert(!titles.has(title[0][1]), `${url.pathname}: duplicate title`);
  titles.add(title[0][1]);
  const description = oneMeta(html, "description");
  assert(description.length >= 70 && description.length <= 180, `${url.pathname}: review description length`);
  assert(!descriptions.has(description), `${url.pathname}: duplicate description`);
  descriptions.add(description);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).filter((m) => m.rel === "canonical");
  assert.equal(canonicals.length, 1);
  assert.equal(canonicals[0].href, absolute);
  assert.equal(oneMeta(html, "og:url"), absolute);
  assert.equal(oneMeta(html, "og:title"), title[0][1]);
  assert.equal(oneMeta(html, "og:description"), description);
  assert.equal(oneMeta(html, "twitter:description"), description);
  assert.equal(oneMeta(html, "twitter:card"), "summary_large_image");
  assert.equal(oneMeta(html, "twitter:image"), oneMeta(html, "og:image"));
  assert(await stat(resolve(root, `.${new URL(oneMeta(html, "og:image")).pathname}`)));
  assert(!oneMeta(html, "robots").includes("noindex"));
  assert(html.includes('<html lang="en-GB">'));
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${url.pathname}: H1 count`);
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const data = JSON.parse(scripts[0][1]);
  assert.equal(data["@context"], "https://schema.org");
  const graph = data["@graph"];
  const ids = new Set(graph.map((node) => node["@id"]));
  assert.equal(ids.size, graph.length, `${url.pathname}: duplicate or missing schema IDs`);
  const page = graph.find((node) => node["@id"] === `${absolute}#webpage`);
  assert.equal(page.url, absolute);
  assert.equal(page.description.replaceAll("&", "&amp;"), description);
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (Object.keys(value).length === 1 && value["@id"]) assert(ids.has(value["@id"]), `Unresolved schema reference ${value["@id"]}`);
    Object.values(value).forEach(visit);
  };
  visit(data);
  if (url.pathname.startsWith("/services/") && url.pathname !== "/services/") {
    assert(graph.some((node) => node["@type"] === "Service"));
    assert(html.includes('<details>'), `${url.pathname}: missing service FAQ content`);
    assert(html.includes(`/contact/?service=${url.pathname.split("/")[2]}`));
  }
}
for (const path of ["/404.html", "/404/index.html"]) {
  const html = await read(path);
  assert(oneMeta(html, "robots").includes("noindex"));
  assert(!urls.includes(`${origin}/404/`));
  pages.set(path, html);
}
let links = 0;
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<(?:a|img|script|link|source)\b[^>]*>/g)) {
    const tag = attrs(match[0]);
    if (match[0].startsWith("<img")) {
      assert("alt" in tag && tag.width && tag.height, `${path}: image accessibility/dimensions`);
    }
    const refs = [tag.href, tag.src, ...(tag.srcset?.split(",").map((part) => part.trim().split(/\s+/)[0]) ?? [])].filter(Boolean);
    for (const ref of refs) {
      if (/^(mailto:|tel:)/.test(ref)) continue;
      const target = new URL(ref, `${origin}${path}`);
      if (target.origin !== origin) continue;
      assert(!["#", "javascript:"].includes(ref), `${path}: placeholder link`);
      const file = extname(target.pathname) ? target.pathname : `${target.pathname}index.html`;
      assert((await stat(resolve(root, `.${file}`))).isFile(), `${path}: missing ${ref}`);
      if (target.hash) {
        const targetHtml = pages.get(target.pathname) ?? await read(file);
        assert(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${path}: missing fragment ${ref}`);
      }
      links++;
    }
  }
}
const seen = new Set(["/"]);
for (const path of seen) {
  for (const match of pages.get(path).matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(match[0]).href;
    if (!href) continue;
    const url = new URL(href, `${origin}${path}`);
    if (url.origin === origin && pages.has(url.pathname)) seen.add(url.pathname);
  }
}
assert(urls.every((url) => seen.has(new URL(url).pathname)), "Orphaned sitemap page");
for (const file of await readdir(root, { recursive: true })) {
  if (file.endsWith("index.html") && !file.startsWith("404")) {
    const path = `/${file.replaceAll("\\", "/").replace(/index\.html$/, "")}`;
    assert(pages.has(path), `Page absent from sitemap: ${path}`);
  }
}
const robots = await read("/robots.txt");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!/^Disallow:\s*\/\s*$/m.test(robots));
const css = await read("/style.css");
for (const match of css.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g)) await stat(resolve(root, `.${match[1]}`));
assert((await stat(resolve(root, "assets/discovery-1536.webp"))).size < 200_000);
assert((await stat(resolve(root, "assets/discovery-768.webp"))).size < 80_000);
console.log(`SEO checks passed: ${urls.length} indexable pages, 2 noindex error pages, ${links} internal links/assets, complete crawl paths, metadata and schema.`);
