import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Edits only metadata; the static HTML remains the published source of truth.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://www.healora.org";
const descriptions = {
  "deep-tech-r-and-d": "Explore AI research, feasibility studies and proof-of-concept development with HealOra. Define your technical question and plan a focused R&D project.",
  "websites-and-apps": "Website and app development in Bolton, Greater Manchester. HealOra builds business websites, custom applications and integrations around your users' needs.",
  "ai-agents-and-bots": "Develop AI agents, chatbots and business automation with HealOra. Connect approved company knowledge and workflows with evaluation and human oversight.",
  "blockchain-and-web3": "Explore blockchain and Web3 development with HealOra, from decentralised applications to shared records. Start with a clear use case and technical scope.",
  "quantum-computing": "Quantum computing research and simulation with HealOra. Explore algorithms, compare approaches and document assumptions through a focused technical project.",
  "vr-ar-solutions": "VR and AR development for training, demonstrations and product exploration. HealOra scopes immersive experiences around your users and target devices.",
  "cybersecurity": "Application security assessments with HealOra. Define an authorised scope, understand exposure and prioritise a practical remediation plan for your systems.",
  "bioinformatics-genomics": "Bioinformatics and genomics analysis with HealOra. Develop reproducible biological data workflows around your research question and data quality needs.",
  "ai-drug-discovery": "AI drug discovery research support from HealOra. Scope computational analysis and AI-assisted workflows for early research and further validation.",
};
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
for (const url of urls) {
  if (url.origin !== origin || !url.pathname.endsWith("/") || url.pathname.includes("..")) throw new Error("Unexpected sitemap URL");
  const file = resolve(root, `.${url.pathname}index.html`);
  let html = await readFile(file, "utf8");
  const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
  const description = descriptions[url.pathname.split("/")[2]] ?? decode(html.match(/name="description" content="([^"]*)"/)[1]);
  html = html.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(">)/g, `$1${escape(description)}$2`);
  html = html.replace(/name="robots" content="[^"]*"/, 'name="robots" content="index, follow, max-image-preview:large"');
  // Remove our existing social tags first so repeated runs are idempotent.
  html = html.replace(/<meta (?:property="og:image(?::[^"]+)?"|name="twitter:[^"]+") content="[^"]*">/g, "");
  const social = [
    ["property", "og:image", `${origin}/assets/social-preview.jpg`],
    ["property", "og:image:width", "1200"], ["property", "og:image:height", "630"],
    ["property", "og:image:type", "image/jpeg"],
    ["property", "og:image:alt", "HealOra — AI, software development and advanced research in Bolton, UK"],
    ["name", "twitter:card", "summary_large_image"], ["name", "twitter:title", title],
    ["name", "twitter:description", description], ["name", "twitter:image", `${origin}/assets/social-preview.jpg`],
    ["name", "twitter:image:alt", "HealOra — AI, software development and advanced research in Bolton, UK"],
  ].map(([attribute, name, content]) => `<meta ${attribute}="${name}" content="${escape(content)}">`).join("");
  html = html.replace("</head>", `${social}</head>`);
  const oldGraph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1])["@graph"];
  const organization = {
    "@type": "Organization", "@id": `${origin}/#organization`, name: "HealOra", url: `${origin}/`,
    email: "healora98@gmail.com", telephone: "+447445750757",
    description: "Software development, AI solutions and advanced research services from Bolton, Greater Manchester.",
    location: { "@type": "Place", name: "Bolton, Greater Manchester, United Kingdom" },
    sameAs: ["https://www.linkedin.com/company/healoratech/"],
  };
  const website = {
    "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: "HealOra",
    alternateName: "HealOra Technology & Research", inLanguage: "en-GB", publisher: { "@id": organization["@id"] },
  };
  const breadcrumb = oldGraph.find((item) => item["@type"] === "BreadcrumbList");
  if (breadcrumb) breadcrumb["@id"] = `${url.href}#breadcrumb`;
  const service = oldGraph.find((item) => item["@type"] === "Service");
  if (service) {
    delete service["@context"];
    Object.assign(service, { "@id": `${url.href}#service`, description, provider: { "@id": organization["@id"] }, mainEntityOfPage: { "@id": `${url.href}#webpage` } });
  }
  const page = {
    "@type": url.pathname === "/about/" ? "AboutPage" : url.pathname === "/contact/" ? "ContactPage" : url.pathname === "/services/" ? "CollectionPage" : "WebPage",
    "@id": `${url.href}#webpage`, url: url.href, name: title, description, inLanguage: "en-GB",
    isPartOf: { "@id": website["@id"] }, about: { "@id": organization["@id"] },
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
    ...(service ? { mainEntity: { "@id": service["@id"] } } : {}),
  };
  const graph = { "@context": "https://schema.org", "@graph": [organization, website, page, ...(service ? [service] : []), ...(breadcrumb ? [breadcrumb] : [])] };
  html = html.replace(/<script type="application\/ld\+json">.*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(graph).replaceAll("<", "\\u003c")}</script>`);
  await writeFile(file, html);
}
console.log(`Updated metadata and linked structured data for ${urls.length} pages.`);
