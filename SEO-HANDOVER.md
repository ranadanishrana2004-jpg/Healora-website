# HealOra SEO handover

## Implemented in the active static website

- Reviewed the 15 indexable pages, sitemap, robots policy, contact flow, navigation and the existing production configuration.
- Kept the canonical origin `https://www.healora.org` and existing trailing-slash URLs. All public pages have self-referencing canonicals; enquiry query parameters canonicalise to `/contact/`.
- Rewrote the nine long service meta descriptions as concise, service-specific summaries; synchronised social descriptions and schema.
- Added Open Graph images, image dimensions/alternative text, Twitter large-image cards and a branded 1200 × 630 JPEG preview to every indexable page.
- Connected Organization, WebSite, WebPage, AboutPage, ContactPage, CollectionPage, Service and BreadcrumbList entities through stable IDs, using the existing business name, contact information and location. No invented ratings, addresses, certifications or search actions.
- Added accessible breadcrumb navigation and current-section navigation semantics. Existing H1 headings, server-delivered content, native FAQ details and related-service links are retained.
- Optimised the homepage artwork: 2,187,833-byte PNG to 148,926-byte desktop WebP / 54,846-byte smaller WebP, retaining the PNG fallback. Layout dimensions and high fetch priority are retained.
- Added a dependency-free build gate checking metadata uniqueness, canonical consistency, schema references, 404 noindex, sitemap coverage, crawl reachability, internal links/fragments and local assets.

## Local verification

Run `node scripts/build-static.mjs`. It checks the actual `.static-dist` output, including 15 indexable pages, two noindex error documents and internal links/assets. `node scripts/check-seo.mjs` reruns the audit without rebuilding. The old Next.js app in `src/` is not the production website and is outside these changes.

Browser checks passed in local headless Chrome for all 15 pages at 390px and 1440px, with no horizontal overflow, broken images or runtime/network errors. Mobile navigation and Escape, FAQ opening, enquiry service preselection and required-field validation passed. Main service/FAQ content remained present with JavaScript disabled. The contact form was not submitted. Homepage screenshots and the social card were visually inspected.

To repeat browser checks, serve `.static-dist` on port 4173 and run `node scripts/check-browser.mjs`. Set `CHROME_PATH` or `SEO_PREVIEW_URL` when needed. Screenshots go into the ignored `.seo-qa/` directory. The script uses an isolated, temporary headless browser profile and does not use your signed-in browser.

These SEO changes have not been deployed by this task. During the Search Console setup follow-up on 15 September 2026, live checks confirmed HTTP 200 for the homepage, sitemap and robots.txt, with all 15 sitemap URLs and the correct robots sitemap declaration. Other production status codes, redirect behaviour, Search Console ownership and indexing remain unverified. Follow [the GoDaddy setup guide](SEARCH-CONSOLE-SETUP.md) to verify ownership and submit the sitemap.

## After deploying

1. Verify all 15 sitemap URLs return HTTP 200 and an unknown URL returns HTTP 404; confirm `/404/` has `noindex`.
2. Check HTTPS and the preferred `www` hostname redirects on the hosting provider. Confirm canonical, social-image and robots URLs reference the production domain, with no production `X-Robots-Tag: noindex` header.
3. In the owner's Google Search Console property for `healora.org`, submit `https://www.healora.org/sitemap.xml`. Inspect the homepage and priority service URLs, then request indexing. Ownership verification needs access to the owner's account/DNS; no verification token has been invented or inserted.
4. Use Google's Rich Results Test and Schema Markup Validator to inspect the deployed markup. Service/Organization markup describes entities; it does not guarantee a rich result. This commercial site does not need FAQ rich-result markup.
5. Run PageSpeed Insights on the homepage and main service/contact pages. The image saving is measured from local files; no field Core Web Vitals or Lighthouse score is claimed.
6. Review Search Console indexing, queries, impressions and clicks after deployment. Search ranking and indexing are Google's decisions; deployment alone does not guarantee either.

## Ongoing content work requiring business evidence

Prioritise website/app development in Bolton and AI agent/business automation searches, with the existing research-service pages covering their own specialties. Use Search Console query data to refine this focus rather than claiming unmeasured search volumes. Publish genuine, permission-approved case studies showing a problem, delivery and measured result. Expand service content in response to real enquiries. Confirm any Google Business Profile eligibility and business details with the owner before creating or changing a listing. Avoid repetitive location pages, bought links and invented testimonials.

## References

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
