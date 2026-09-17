# Cancer Care Trust

Landing page for **Cancer Care Trust** — practical and financial support for people affected by cancer, and funding for organisations improving cancer care, support and research across the UK.

Built with Vite, TypeScript, Handlebars, and SCSS.

## Stack

- **Vite 4** — bundler and dev server (`base: './'`, GitHub Pages friendly)
- **TypeScript** — app logic in `src/ts`
- **Handlebars** — templates and page sections as partials
- **SCSS** — styles with include-media breakpoints (desktop-first)
- **Swiper** — mobile sliders (Help, Support)
- **sharp** — automatic WebP conversion for images

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

```sh
npm install
npm run dev
```

Dev server uses `src` as the root, opens the browser, and reloads on changes to templates, sections, styles, and scripts.

### Production

```sh
npm run build    # output → dist/
npm run preview  # local preview of the build
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm run webp` | One-off PNG/JPG → WebP conversion |
| `npm run webp:watch` | Watch mode for image conversion |

Disable WebP conversion (e.g. on CI):

```sh
VITE_WEBP_CONVERT=false
```

## Project structure

```text
.
├─ public/                 # Static assets (copied as-is)
│  ├─ favicon/
│  ├─ fonts/
│  ├─ icons/
│  ├─ images/
│  └─ video/
├─ scripts/
│  ├─ convertToWebp.ts     # Image → WebP
│  ├─ pictureHelper.ts     # Handlebars {{picture}} helper
│  └─ iconHelper.ts        # Handlebars {{icon}} helper (SVG sprite)
├─ src/
│  ├─ index.html           # Main page
│  ├─ sections/            # Page sections (Handlebars partials)
│  ├─ templates/           # Shared partials (header, footer, sprite)
│  ├─ styles/              # SCSS (base, layout, vendors)
│  └─ ts/
│     ├─ main.ts           # Entry
│     └─ modules/          # Header burger, tabs, sliders, year
├─ vite.config.ts
├─ tsconfig.json
└─ package.json
```

### Page sections

Hero → Diagnosis → Help → Support → Numbers → Finding → Contribution → Partners → Start (CTA).

## Handlebars helpers

Configured in `vite.config.ts` via `vite-plugin-handlebars`.

### `picture`

Builds a `<picture>` with WebP source and fallback `<img>`.

```hbs
{{{picture "/images/hero-img.png" alt="Hero" class="hero__image" loading="eager"}}}
```

Useful options: `alt`, `class`, `loading`, `fetchpriority`, `width`, `height`, `sources`.

### `icon`

Renders an SVG from the sprite (`icons-sprite` partial) via `<use>`.

```hbs
{{icon "plus" class="site-header__donate-button-icon"}}
```

### `array` / `object`

Helpers for passing structured data into partials from templates.

## TypeScript modules

| Module | Role |
| --- | --- |
| `header.ts` | Burger menu, scroll lock, Escape / link close |
| `help-tabs.ts` | Accessible Help tabs (keyboard support) |
| `help-slider.ts` | Help Swiper below desktop breakpoint |
| `support-slider.ts` | Support logos Swiper |
| `year.ts` | Current year in the footer |

## Styles

- Entry: `src/styles/main.scss`
- Breakpoints (include-media): `tablet` 768px, `desktop` 1024px, etc.
- Media queries are written **desktop-first** (`@include media('<desktop')`, …)
- Prefer SCSS only; avoid inline styles in JS unless necessary

## Deploy (GitHub Pages)

`base: './'` keeps asset paths relative, so the site works under any repo subpath.

1. `npm run build`
2. Publish the contents of `dist/` (e.g. `gh-pages` branch or GitHub Actions)

## License

MIT
