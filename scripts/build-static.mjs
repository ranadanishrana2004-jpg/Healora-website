import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, ".static-dist");
// Publish only the developer package's public files, never source or config.
const entries = [
  "index.html", "404.html", "404", "about", "contact", "programmes",
  "services", "work", "assets", "favicon.svg", "robots.txt",
  "sitemap.xml", "site.js", "style.css",
];

// The resolved deletion target is a fixed generated directory inside this repo.
if (dirname(output) !== root || output === root) {
  throw new Error("Unsafe static output directory");
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) {
  await cp(join(root, entry), join(output, entry), { recursive: true });
}
const files = await readdir(output, { recursive: true, withFileTypes: true });
console.log(`Static website ready: ${files.filter((file) => file.isFile()).length} public files in .static-dist`);
