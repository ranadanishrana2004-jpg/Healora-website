# HealOra website

Production publishes the static redesign from the developer package. The HTML pages, `style.css`, `site.js`, and `assets/` at the repository root are the active website. The earlier Next.js application remains in `src/` for reference; it is not the Vercel production build.

## Build and preview

```sh
node scripts/build-static.mjs
python -m http.server 4173 --bind 127.0.0.1 --directory .static-dist
```

Open http://localhost:4173. The build uses Node's standard library and copies only the 24 public website files into `.static-dist/`; it requires no npm install.

## Vercel deployment

`vercel.json` overrides the previous Next.js preset with `framework: null`, skips dependency installation, runs the static build, and publishes `.static-dist/`. Keep the Vercel project root at the repository root. The connected project is `healora-website-live` under `ranadanishrana2004-jpgs-projects`.

Directory pages use trailing slashes, and `404.html` supplies the missing-page response. There is no catch-all SPA rewrite. Security headers are retained; unversioned files revalidate so new releases do not leave stale CSS or images. The build output excludes source code, dependency manifests, and configuration.

The canonical site is https://www.healora.org. Deployment does not require DNS or email-record changes. Verify the homepage, all 15 sitemap URLs, navigation, contact form, assets, slash redirects, and an unknown URL after release.

The contact form prepares a draft to `healora98@gmail.com` in the visitor's email app. It does not send or store enquiries; the page explains this behavior.

## Rollback

The production deployment before this change was `896stnzCvS9gy5MBAUxP7zYfGXvX` (Git commit `7eddb4f90a9cdf03722eca1df5f66b6f4cad9eef`). Use Vercel's rollback to that ready deployment if needed, then revert the static-deployment configuration commit in Git before another production push.
