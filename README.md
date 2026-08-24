# Khandker Shahed — Portfolio Website

This is my personal portfolio website, rebuilt with **Next.js 16.3, React 19 and TypeScript**.

I started this project because my previous portfolio was built with PHP and I wanted a cleaner, faster and more maintainable version that also shows the way I work now. I did not want to make the structure unnecessarily complex, so I kept the code simple enough that a junior developer can understand and update it.

Live website: **https://khandkershahed.com**

## Why I rebuilt it

My old website was working, but I wanted to improve a few important things:

- make the codebase easier to maintain
- improve SEO properly instead of only adding basic meta tags
- support both English and Italian
- keep dark and light themes
- make the site fully responsive
- prepare it for static deployment on shared hosting
- keep security settings inside the project
- make future migration to an API or CMS possible without rebuilding the whole structure

I also wanted the new website to still feel like my old portfolio, so I kept some of the original visual identity, background style and assets instead of replacing everything with a completely different design.

## Tech stack

- Next.js 16.3
- React 19
- TypeScript
- CSS
- Local JSON content
- Apache `.htaccess`
- Git and GitHub
- Static export for shared hosting

## What I built

The website currently includes:

- English and Italian versions
- Home page
- About page
- Resume page
- Portfolio page
- Blog listing and blog detail pages
- Contact page
- Dark and light mode
- Language detection and manual language switching
- Technology and client marquees
- Testimonials
- Responsive navigation
- Custom background effects and pointer effects
- Static `robots.txt`
- XML sitemap
- Structured data / JSON-LD
- Canonical URLs and `hreflang`
- Apache security headers and caching rules

## How I approached the project

I built the project step by step instead of trying to change everything at once.

### 1. Rebuilt the old portfolio in Next.js

The first step was moving the website from the previous PHP-based structure to Next.js.

I kept the project structure simple and separated the main parts into:

- pages
- reusable components
- content
- data providers
- small utility files

I avoided adding extra layers or libraries when they were not necessary.

### 2. Added bilingual content

I wanted the portfolio to work properly for both international visitors and people in Italy.

The content is stored in:

```text
src/content/en/site.json
src/content/it/site.json
```

The site uses stable localized routes such as:

```text
/en/about/
/it/about/
/en/portfolio/
/it/portfolio/
```

The root page works as a language gateway. It respects a saved language choice first and otherwise uses location/browser information to choose English or Italian.

### 3. Improved SEO

SEO was one of the parts I did not want to treat as optional.

I added:

- page-specific metadata
- canonical URLs
- English/Italian `hreflang`
- Open Graph metadata
- Twitter metadata
- sitemap generation
- `robots.txt`
- Person and WebSite structured data
- BlogPosting structured data for blog articles

I also kept the old PHP URLs in mind and added redirects in `.htaccess` so old links can point to the new pages.

### 4. Prepared it for shared hosting

One important limitation was that I wanted to host the website on Namecheap shared hosting.

Because of that, I configured Next.js with static export:

```ts
output: "export"
```

The final production website is generated inside:

```text
out/
```

This means the shared server does not need to run a permanent Node.js process. It only serves the generated HTML, CSS, JavaScript and assets.

### 5. Added security at the hosting level

I kept the Apache configuration inside:

```text
public/.htaccess
```

It includes security and delivery settings such as:

- Content Security Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Opener-Policy
- compression
- browser caching
- old URL redirects

During the build, this file is copied to the exported site so the same rules can be deployed with the website.

### 6. Worked on the UI without losing the old identity

I did not want the redesign to look like a random template.

I kept the dark background style and some visual ideas from my previous website, then improved:

- buttons
- social icons
- technology logos
- light mode
- cards
- spacing
- responsive navigation
- background lingo
- top scroll progress
- custom pointer interaction

The light theme was a little challenging because I wanted only the main content wrapper to become light while keeping the outer background and background effects unchanged.

### 7. Added a simple content provider structure

Right now the website uses local JSON files.

I still kept a small provider layer so I can move to a Laravel or Node API later without changing every page.

For now:

```env
DATA_SOURCE=local
```

There is also an API provider prepared for future use.

Because the project is statically exported, API content would currently be fetched during build time. If I later need content to update instantly without rebuilding, I will either use client-side fetching for those sections or connect the deployment pipeline to a CMS update.

## Problems I solved while building it

This project also gave me some useful real problems to solve.

### Missing local dependencies

At one point ESLint was not available and TypeScript showed a very large number of errors, including missing React and Next.js types.

The actual problem was not hundreds of broken source files. The local `node_modules` installation was incomplete.

I cleaned the generated folders and installed the project exactly from the lock file:

```bash
npm ci
```

After that:

```bash
npm run typecheck
npm run lint
```

both passed successfully.

That was a good reminder not to start changing application code before checking whether the development environment itself is healthy.

### Static export error for `robots.txt`

The production build later failed while generating `robots.txt`.

Since the project uses:

```ts
output: "export"
```

Next.js needed the metadata routes to be explicitly static.

I fixed the issue by configuring `robots.ts` and `sitemap.ts` with:

```ts
export const dynamic = "force-static";
```

After that the production build completed successfully and generated all localized pages, the sitemap and robots file.

## Production checks

Before deployment I currently run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

The latest local production check passes successfully.

I also verify that these files exist inside the final export:

```text
out/index.html
out/robots.txt
out/sitemap.xml
out/.htaccess
out/en/
out/it/
```

## Current deployment work

I am currently using this project to learn and set up a proper CI/CD workflow for Namecheap shared hosting.

The goal is:

```text
Code change
    ↓
Git push
    ↓
GitHub
    ↓
TypeScript check
    ↓
ESLint
    ↓
Production build
    ↓
Deploy the generated out/ folder
    ↓
Namecheap shared hosting
```

I want the deployment to stop automatically if type checking, linting or the production build fails.

This part is still in progress, and I am building it step by step so I understand the complete workflow instead of only copying a deployment file.

## Project structure

The main folders are intentionally straightforward:

```text
src/
├── app/            # pages and routes
├── components/     # reusable UI components
├── content/        # English and Italian content
├── data/           # content providers and types
└── lib/            # SEO, locale and site helpers

public/
├── images/
├── legacy/
├── styles/
└── .htaccess
```

## Run the project locally

```bash
npm ci
npm run dev
```

Then open:

```text
http://localhost:3000
```

For validation:

```bash
npm run typecheck
npm run lint
```

For a production build:

```bash
npm run build
```

The static website will be generated inside:

```text
out/
```

## What I learned from this project

This project was more than only redesigning my portfolio.

It helped me understand better how:

- Next.js static generation works
- routing and localization should be structured
- SEO needs to be handled across the whole site
- Apache security rules can be kept with the project
- build errors can come from the environment, not only the source code
- a static site can still be prepared for a future API
- Git can be used to keep clean versions of a real project
- CI/CD can protect production by checking the project before deployment

I am still improving this website as I learn more, but I prefer to make each change only after I understand why it is needed.
