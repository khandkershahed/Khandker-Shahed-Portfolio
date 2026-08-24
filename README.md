# Khandker Shahed Portfolio — Phase 5

Next.js 16.3 + React 19 + TypeScript rebuild of `khandkershahed.com`, designed for static export/shared hosting with bilingual English/Italian content.

## Current behavior

- Dark mode is the default for every first visit; a visitor's manual theme choice is saved locally.
- `/` acts as a language gateway. A saved language choice wins; otherwise visitors detected in Italy are sent to `/it/`, while other visitors go to `/en/`, with browser/time-zone fallback.
- Every public content page has a stable localized URL, canonical metadata and EN/IT `hreflang` alternates.
- Content currently comes from `src/content/en/site.json` and `src/content/it/site.json` through the provider layer.
- The site uses `output: "export"`, so the production bundle is generated in `out/` for shared hosting.

## Routes

```text
/
/en/                  /it/
/en/about/            /it/about/
/en/resume/           /it/resume/
/en/portfolio/        /it/portfolio/
/en/blog/             /it/blog/
/en/blog/[slug]/      /it/blog/[slug]/
/en/contact/          /it/contact/
/robots.txt
/sitemap.xml
```

## Run locally

```powershell
Copy-Item .env.example .env.local -ErrorAction SilentlyContinue
npm ci
npm run typecheck
npm run lint
npm run dev
```

Open `http://localhost:3000/` to test regional language selection, or go directly to `/en/` or `/it/`.

## Production check

```powershell
npm ci
npm run typecheck
npm run lint
npm run build
```

The static export is generated in `out/`. On Apache/shared hosting, confirm that `public/.htaccess` is present as `out/.htaccess` before upload because it contains legacy PHP redirects, security headers, caching and compression rules.

## Content provider

Local JSON remains the active source:

```env
DATA_SOURCE=local
```

The existing `apiProvider` is intentionally kept for the future Laravel/Node API migration. **Important:** because this project is currently a static export, switching `DATA_SOURCE=api` makes Next.js fetch that API during the build; it does not make content update live in the browser without rebuilding the site. For truly dynamic content on basic shared hosting, use either:

1. a client-side API fetch for the sections that must update immediately, or
2. keep static rendering and trigger a new build/deploy whenever the Laravel/Node CMS data changes.

## Phase 5 documentation

- `docs/PHASE_5.md` — implemented changes and behavior.
- `docs/PORTFOLIO_AUDIT_2026-08-23.md` — file-by-file audit and remaining recommendations.
- `docs/STRUCTURE.md` — current source tree.
- `docs/ALL_CUSTOM_CODE.md` — maintained custom-code snapshot.
- `docs/SHA256_MANIFEST.tsv` — checksums for the delivered source files.
