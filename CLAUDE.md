# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Mente Financiera is a static personal-finance blog (Spanish, Latin American audience) built to qualify for and run Google AdSense. It is plain HTML/CSS/JS with **no build step, no package manager, no framework, and no test suite** — there is nothing to install, compile, lint, or run. To preview changes, open the HTML files directly in a browser (or serve the folder with any static file server); there is no dev server command.

Deployment is via git: this repo is connected to Netlify for continuous deployment. Pushing to `main` on GitHub (`piedrasdiego1-wq/Mente-Financiera-`) automatically triggers a Netlify rebuild/redeploy of the live site at `https://mentefinancieras.netlify.app` — there is no separate manual deploy command.

## Architecture

**Two page depths, different relative paths.** Root-level pages (`index.html`, `sobre-nosotros.html`, `contacto.html`, `privacidad.html`, `terminos.html`, `cookies.html`) reference assets as `css/style.css`, `js/main.js`, `favicon.svg`. Every article under `articulos/*.html` references the same assets one level up: `../css/style.css`, `../js/main.js`, `../favicon.svg`, `../index.html`, etc. When copying markup between a root page and an article, the relative paths must be adjusted accordingly.

**No templating — every page is a fully duplicated HTML file.** There is no shared header/footer include mechanism. The site nav, footer, and cookie-consent banner markup are copy-pasted identically into all ~21 pages. Any change to navigation links, footer content, or the cookie banner must be manually repeated across every HTML file (root pages and every file in `articulos/`), or pages will drift out of sync.

**AdSense verification script.** Every real content page has this exact tag inserted immediately after `<meta charset="UTF-8">` in `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9464301171955928" crossorigin="anonymous"></script>
```
It must appear exactly once per page. `ads.txt` at the repo root contains the matching publisher ID (`pub-9464301171955928`) — if the AdSense client ID ever changes, both places need to be updated together.

**Google Search Console verification file.** `google2b1f4e76edaeaf74.html` at the repo root is a Google-issued ownership-verification file. Its content must remain exactly `google-site-verification: google2b1f4e76edaeaf74.html` — do not edit, rename, or delete it.

**SEO files reference the live Netlify URL.** `robots.txt` and `sitemap.xml` hardcode `https://mentefinancieras.netlify.app`. Every article and top-level page must have a corresponding `<url>` entry in `sitemap.xml`. If the site ever moves to a custom domain, both files (plus the sitemap URL in `robots.txt`) need to be updated to the new domain.

**Article page structure.** Each file in `articulos/` follows the same layout: breadcrumb → `<h1>` title → author/read-time meta line → `<article class="article-body">` content → `.ad-slot` placeholder div (where a real ad unit will go post-approval) → `.related-articles` block linking to ~3 other relevant articles. Cross-linking between related articles is intentional (internal SEO) — when adding a new article, add reciprocal links from at least one or two existing related articles' "Sigue leyendo" lists, and add the new article as a card on `index.html` plus an entry in `sitemap.xml`.

**Cookie consent.** Implemented client-side in `js/main.js`: the banner (`#cookie-banner` / `#cookie-accept`, present on every page) is shown unless `localStorage['mf_cookie_consent']` is already set to `"true"`.

**`images/` is currently empty/unused** — the site has no images yet; all visual styling is done in `css/style.css` (CSS-only design, no image assets).
