# MERIDIAN

A complete, independently created MERIDIAN website. Built from scratch in this directory with React, TypeScript, and Vite. It does not use or import another MERIDIAN project.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open **http://localhost:5173**.

## Production

```sh
npm run build
npm run preview
```

The deployable output is **`dist/`**. Preview runs at **http://localhost:4173**.

- **Vercel:** import this directory; the included `vercel.json` specifies the build and internal-route fallback.
- **Netlify:** use `npm run build` as the build command and `dist` as the publish directory. The included `public/_redirects` is copied into the build.
- **Other static hosts:** upload `dist` and configure a history fallback to `/index.html` for application paths, preserving actual asset requests. This is an internal rewrite, not a redirect to an external website.
- No domain, API key, database, or backend service is required. When a domain is selected, its absolute social-preview/canonical metadata can be added to `index.html` and a domain-specific sitemap can be generated.

## Public pages

| Route | Experience |
| --- | --- |
| `/` | Original animated hero, vision, keyboard-operable exploration tabs, selectable roadmap, journal, community and FAQs |
| `/journal/a-shared-horizon` | Original perspective article with section links |
| `/journal/built-around-people` | Original community article |
| `/journal/room-for-whats-next` | Original forward-looking article |
| `/guide` | Searchable and filterable FAQs, getting-started links |
| `/brand` | Downloadable SVG assets and click-to-copy color palette |
| `/privacy` | Application-specific privacy explanation |
| Any unknown path | Branded recovery page |

## Content and design

- The silver orbital artwork, logo symbols, path-based wordmark, illustration system, and CSS graphics are newly authored for this project. The supplied image informed the silver-and-blue art direction; the site does not rely on a remote image.
- Fonts are bundled locally through Fontsource. No external font or image requests are needed.
- The only external public-facing links are `https://t.me/meridianfii` and `https://x.com/meridianfii?s=11`, defined in `src/components.tsx`.
- Articles, questions, and roadmap copy live in `src/content.ts`; page structure lives in `src/App.tsx` and `src/pages.tsx`; styling lives in `src/styles.css`.
- Copy introduces an identity, perspective, and community. It does not invent a token, wallet service, investment offering, statistics, testimonials, launch date, or confirmed product roadmap. The roadmap explicitly describes directional themes.
- There are no forms pretending to submit information. Search, filters, tabs, accordions, navigation, clipboard actions, and downloads work in the browser. Community calls to action use the supplied official profiles.
- Built-in accessibility includes a skip link, semantic landmarks, keyboard tab controls, a native modal mobile menu, focus indicators, native disclosure controls, search-result announcements, and reduced-motion styling.
- Brand files in `public/assets` are SVGs and remain editable. Fonts and package licenses remain with their respective authors.

## Verification

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

The end-to-end suite tests the production build on desktop and mobile. It checks page rendering and assets, approved social destinations, tab and roadmap controls, accordions, navigation and deep-link refresh, search/filter recovery, real SVG downloads, clipboard actions, modal keyboard behavior, and overflow across 320–1440px widths. Homepage screenshots are saved to `test-results/`.

## Hosting notes

This is a client-rendered public website. Configure the included route fallback so direct article URLs work after deployment. The application does not add analytics, cookies, account storage, or user-data submission. Hosting-provider access logs depend on the chosen host, as explained on the Privacy page.
