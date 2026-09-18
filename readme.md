# Cancer Care Trust

Multipage website for **Cancer Care Trust** — a UK charity providing practical and financial support to people affected by cancer, and funding organisations that improve cancer care, support and research.

Built with **Vite**, **TypeScript**, **Handlebars**, and **SCSS**.

## Stack

| Technology | Role |
| --- | --- |
| Vite 4 | Dev server and production bundler (`base: './'`, relative asset paths) |
| TypeScript | Client logic in `src/ts` |
| Handlebars | HTML pages, shared templates, and section partials |
| SCSS | Styles with include-media breakpoints (desktop-first) |
| Swiper | Carousels (Help, Support / contribution sliders) |
| sharp | Automatic PNG/JPEG → WebP conversion |

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

```sh
npm install
npm run dev
```

The Vite root is `src/`. The browser opens automatically; changes to pages, sections, templates, styles, and scripts trigger reload.

### Production

```sh
npm run build    # output → dist/
npm run preview  # preview the production build locally
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm run webp` | One-off PNG/JPG → WebP conversion |
| `npm run webp:watch` | Watch mode for image conversion |

Disable WebP conversion during build (for example on CI):

```sh
VITE_WEBP_CONVERT=false npm run build
```

## Pages

HTML entry points live in `src/`. Vite picks them up automatically via `getHTMLFileNames.ts` (every `*.html` file except the special handling of `index.html`).

| Page | Path | Description |
| --- | --- | --- |
| Home | `/index.html` | Main landing page |
| About | `/about.html` | About the charity |
| How We Help | `/how-we-help.html` | Support for people affected by cancer |
| Support | `/support.html` | Ways to support the Trust |
| News | `/news.html` | News listing |
| News article | `/news-single.html` | Single news article |
| Contact | `/contact.html` | Contact details and enquiry form |
| Privacy Policy | `/privacy-policy.html` | Privacy policy |
| Terms & Conditions | `/terms-and-conditions.html` | Website terms |

Donation and “get involved” CTAs generally link to `/contact.html#contact-block` (the contact form).

## Project structure

```text
.
├─ public/                 # Static assets (copied as-is)
│  ├─ favicon/
│  ├─ fonts/
│  ├─ icons/
│  └─ images/
├─ scripts/
│  ├─ convertToWebp.ts     # Image → WebP
│  ├─ pictureHelper.ts     # Handlebars {{picture}} helper
│  └─ iconHelper.ts        # Handlebars {{icon}} helper (SVG sprite)
├─ src/
│  ├─ *.html               # Site pages
│  ├─ sections/            # Page sections (Handlebars partials)
│  ├─ templates/           # Shared layout (header, footer, icons sprite)
│  ├─ styles/              # SCSS (base, layout, vendors)
│  └─ ts/
│     ├─ main.ts           # Entry
│     └─ modules/          # Header, tabs, sliders, footer year
├─ getHTMLFileNames.ts     # Discovers multipage HTML inputs for Vite
├─ vite.config.ts
├─ tsconfig.json
└─ package.json
```

### Home page sections

Hero → Diagnosis → Help → Support → Numbers → Finding → Contribution → Partners → Start (CTA).

Other pages compose reusable sections (hero / start / contribution / beliefs / news / legal, and so on) from `src/sections/`.

## Handlebars helpers

Configured in `vite.config.ts` via `vite-plugin-handlebars`.

### `picture`

Builds a `<picture>` with a WebP source and PNG/JPEG fallback.

```hbs
{{{picture "/images/hero-img.png" alt="Hero" class="hero__image" loading="eager"}}}
```

Useful options: `alt`, `class`, `loading`, `fetchpriority`, `width`, `height`, `sources`.

### `icon`

Renders an SVG symbol from the sprite (`icons-sprite` partial) via `<use>`.

```hbs
{{icon "plus" class="site-header__donate-button-icon"}}
```

### `array` / `object`

Helpers for passing structured data into partials from page templates.

```hbs
{{> section-start
  paragraphs=(array "First paragraph." "Second paragraph.")
}}
```

## TypeScript modules

| Module | Role |
| --- | --- |
| `header.ts` | Burger menu, scroll lock, Escape / link close |
| `help-tabs.ts` | Accessible Help tabs (keyboard support) |
| `help-slider.ts` | Help Swiper below the desktop breakpoint |
| `support-slider.ts` | Support / contribution Swiper instances |
| `year.ts` | Current year in the footer |

## Styles

- Entry: `src/styles/main.scss`
- Breakpoints (include-media): `tablet` 768px, `desktop` 1024px, and others
- Media queries are written **desktop-first** (`@include media('<desktop')`, …)
- Prefer SCSS only; avoid inline styles in JavaScript unless necessary

## Adding a new page

1. Create `src/your-page.html` (same head / header / footer pattern as existing pages).
2. Compose content from `src/sections/` partials, or add a new section under `src/sections/`.
3. Add layout styles under `src/styles/layout/` and import them in `main.scss`.
4. Link the page from `src/templates/header.html` and/or `footer.html` if needed.

Vite will include the new HTML file in the build automatically.

## Deploy

`base: './'` keeps asset paths relative, so the site works from a repository subpath (for example GitHub Pages).

1. `npm run build`
2. Publish the contents of `dist/`

## License

MIT
