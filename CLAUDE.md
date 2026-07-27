# RocketBoyz Shopify Theme — Claude Code Rules

## Project Overview
This is a Shopify theme redesign for RocketBoyz (snacks-by-rocket.myshopify.com).
We are redesigning the existing "rocket 2023" theme to match new Figma designs.
The live site must never be touched — all work is on the duplicate theme only.

## Workflow
- All design decisions come from Figma screenshots provided by the developer
- All styling must follow the Brand Kit below exactly
- When given HTML/CSS code, integrate it into the correct Liquid/CSS files
- Do not guess at design — ask if unclear
- Do not remove existing Shopify Liquid logic (cart, product, collection functionality)
- Only change the visual layer unless explicitly told otherwise

## Brand Kit (ACTIVE — audited against assets/rb-design.css, 2026-07-25)

This section reflects the tokens **actually in the CSS today**. The source of truth is the
`:root` block at `assets/rb-design.css:17-32`. If you change a token, change it there first.

### Fonts
Loaded in `layout/theme.liquid:68` (Google Fonts — the ONLY global font load):
```
Big+Shoulders+Display:wght@800  +  Manrope:wght@500;600;700
```
- `--rb-font-head: 'Big Shoulders Display', sans-serif` — headings. Uppercase, weight 400 in
  `.rb-heading`, line-height 0.95. **Note:** only weight 800 is loaded, so 400 renders as 800.
- `--rb-font-body: 'Manrope', sans-serif` — body, nav, buttons, labels. Weights 500/600/700.
- `--rb-font-mono: 'Manrope', sans-serif` — aliased to Manrope; there is no true mono face.
- Use `.rb-heading` and `.rb-mono` helpers rather than hardcoding font-family.

### Colors — brand
- Brand Green (primary): `#2D6A2F` — `--rb-gradient` and `--rb-teal` both hold this value.
  Primary CTA fill, active/selected states, links on account pages, gradient-text replacement.
- Green hover/pressed: `#245526`
- Green (bright, on-dark hover text): `#4CC46A`
- Green (success/status): `#1f7a3a` — `--rb-green`

### Colors — ink & surface
- `--rb-black: #1b1a16` — primary text, dark buttons
- Deep Black `#030213` — borders/text on product + PDP surfaces
- `--rb-text-muted: #54514a` — body copy
- Tertiary text `#52525B`, muted UI `#71717A`, faint `#A1A1AA`
- `--rb-cream: #f3f1ec` / `#f3f0e9` — light text on dark backgrounds
- `--rb-card-bg: #fbfaf7` — card surfaces
- White `#FFFFFF` — page background
- Border: `--rb-border: rgba(27,26,22,0.12)`; also `#E4E4E7` on product/PDP surfaces.
  Stronger variants: `rgba(27,26,22,0.2)` and `0.22` on outline buttons.

### Colors — legacy accents (still present, use sparingly)
- `--rb-red: #E63946`, `--rb-orange: #FF9F1C` — retained in `:root`, largely superseded by green
- `#DC2626` — wishlist/heart hover stroke only

### Buttons (all pill-shaped: `border-radius: 999px`)
- **Primary / Add to Cart** (`.rb-btn-atc`): bg `#2D6A2F`, white text, Manrope 700, 13px,
  padding `10px 16px`. Hover: `opacity 0.88` + `translateY(-1px)`.
- **Sold out** (`.rb-btn-atc.is-soldout`): transparent bg, `#030213` text, `1.5px solid #030213`.
- **Outline** (`.rb-btn-outline`): transparent, `--rb-black` text, `1.5px solid rgba(27,26,22,0.22)`,
  15px/700, padding `16px 28px`. Hover: fills `--rb-black`, text `#4CC46A`, `translateY(-2px)`.
- **Dark** (`.rb-btn-dark`): bg `--rb-black`, text `#f3f0e9`, 13px/700, padding `9px 16px 9px 14px`.
  Hover: bg `#000`, text `#4CC46A`.
- **Small outline** (`.rb-btn-sm-outline`): 13px/700, padding `9px 15px`, `1.5px solid rgba(27,26,22,0.2)`.
- **Wishlist** (`.rb-btn-wish`): 34px circle, white, `1px solid rgba(27,26,22,0.1)`,
  stroke `#71717A` → `#DC2626` on hover.

### Icons
- Library: Lucide (inline SVG in Liquid)
- Size: 20px for nav icons
- Default `#030213`; green `#2D6A2F` for active, `#DC2626` for wishlist hover

### Cards
- `.rb-product-card`: `border-radius: 20px`, `1.5px` transparent border over a
  `rgba(27,26,22,0.12)` border-box gradient, white fill
- Hover: `translateY(-4px)` + `box-shadow: 0 16px 32px -16px rgba(20,22,18,0.18)`
- Info padding: `14px 16px 16px`

### Radii
`999px` (buttons/pills — dominant) · `50%` (icon buttons) · `20px` (product cards) ·
`14px` / `16px` (image wells, panels) · `12px` / `10px` / `8px` (small UI)

### Shadows
- Card hover: `0 16px 32px -16px rgba(20,22,18,0.18)`
- Soft panel: `0 8px 24px rgba(0,0,0,0.08)`
- Sticky bar (upward): `0 -4px 24px -8px rgba(3,2,19,0.12)`

### Spacing
- Container: `.rb-container` — max-width `1280px` (`--rb-max-w`), padding `32px` left/right
- Section padding: ~64–80px vertical

### Animations
- Standard: `transition: ... 0.2s` (0.15s for small UI)
- Keyframes in `rb-design.css:35-38`: `rb-marquee`, `rb-fadeUp`, `rb-popIn`, `rb-bob`
- Dropdowns: fade in + slide down (opacity 0→1, y 8→0, 150ms)

### Known token drift (fix before porting to app)
- **`'Clash Display'` is never loaded anywhere** — 26 declarations in `rb-design.css`
  (PDP/`.productView`, lines ~597-860) and 26 more across `sections/` silently fall back to
  system sans. Either load it or replace with `--rb-font-head`/`--rb-font-body`.
- `'Anton'`, `'Hanken Grotesk'`, `'DM Mono'` load **only** via `snippets/cart-drawer.liquid:1`.
  Sections using them outside the cart drawer are unreliable.
- `--rb-gradient` is a **flat green**, not a gradient. `.rb-gradient-text` sets `color: #2D6A2F`.
  The old red→yellow gradient is retired; do not reintroduce it.

## Design Tokens v2 (SUPERSEDED — historical reference only)
This was an alternate token set under consideration. The site has since moved to the green-based
Brand Kit above, which is the audited source of truth. Parts of v2 leaked into the codebase
(Anton / Hanken Grotesk / DM Mono in `snippets/cart-drawer.liquid` and some sections) — treat
those as drift to clean up, not as intent. Do NOT apply anything from this section to new work.

### Colors — Brand / accent
- --brand-red: #E63946 — Gradient start, accents
- --brand-orange: #FF9F1C — Gradient end, accents
- --brand-gradient: linear-gradient(90deg, #E63946 0%, #FF9F1C 100%) — Headlines, borders, CTAs
- --accent-green: #27402F — Prop default accent / avatars

### Colors — Ink & surface (warm neutrals)
- --ink: #1b1a16 — Primary text, dark buttons
- --ink-hero: #17150f / #16150f — Hero/video dark backgrounds
- --text-muted: #54514a — Body copy
- --text-soft: #6e6a60 — Footer/secondary
- --text-faint: #8a857a / #7a7567 — Captions, meta labels
- --cream: #f3f0e9 / #f6f2e8 — Light text on dark
- --bg-white: #ffffff — Page background
- --bg-card: #fbfaf7 — Product/review cards
- --bg-section: #f3f1ec — Alt section (Spice Bun)
- --bg-image-well: #efece6 / #f1ede4 — Image placeholders, inputs

### Colors — Semantic / status
- --success: #1f7a3a / #1f8a3a (trend up, checks)
- --star: #c8a24b (review stars)
- Border / hairline: rgba(27,26,22,0.1) default; 0.12 / 0.16 / 0.2 / 0.22 for stronger; rgba(243,240,233,0.4) on dark

### Typography
- --font-display: 'Anton', sans-serif — uppercase, weight 400, line-height ~0.9, tracking −0.005 to −0.01em
- --font-body: 'Hanken Grotesk', system-ui, sans-serif — 400–800
- --font-mono: 'DM Mono', monospace — labels, price meta, eyebrows (often uppercase, tracking 0.06–0.2em)
- Type scale (fluid): H1 clamp(48px,5.6vw,90px) · H2 display clamp(40px,4.6vw,72px) → section clamp(32px,3.6vw,52px) · body 16.5–18px · small 13.5–15px · eyebrow/meta 11–12px

### Radii
14px (image wells) · 18–20px (cards) · 26px (large panels) · 30px (CTA blocks) · 999px (pills/buttons/avatars)

### Spacing
Section padding ~64–80px vertical, 32px horizontal. Container max-width 1280px. Grid gaps 14–18px (cards), 30–54px (layout columns).

### Shadows
- Card hover: 0 20px 36px -22px rgba(20,22,18,0.4)
- Carousel panel: 0 24px 50px -34px rgba(20,22,18,0.4)
- CTA block: 0 30px 70px -40px rgba(20,40,28,0.22)
- Product drop-shadow: drop-shadow(0 14px 16px rgba(0,0,0,0.2))

## File Structure Notes
- Header: sections/header.liquid (active header, controlled by settings.header_layout: "01" — see snippets/wrapper-header.liquid for the layout switch)
- Announcement bar: rendered via {% section 'announcement-bar' %} in snippets/wrapper-header.liquid (added — it wasn't being rendered anywhere before)
- Announcement bar: sections/announcement-bar.liquid
- CSS: assets/component-header-05.css, assets/base.css
- Sections: sections/*.liquid
- Snippets: snippets/*.liquid
- Theme entry: layout/theme.liquid

## Theme IDs
- Working theme (work here): "LIVE BACKUP - do not delete" — 161208336642
- Old dev theme (no longer the default, theme editor settings panel had a stuck-cache bug for new sections): 161685602562
- Live theme (DO NOT TOUCH): rocket 2023 — #136885895426

## Dev Commands
- Start dev server: shopify theme dev --store snacks-by-rocket.myshopify.com
- Push single file: shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208336642 --only <file>
- Local preview: http://127.0.0.1:9292

## Theme sync safety (IMPORTANT)
**Never run a bare `shopify theme push`.** The repo and the working theme are in genuine two-way
drift: template JSONs are edited in the theme editor and exist only on the remote, while `sections/`
and `assets/` are edited locally. A full push silently overwrites the editor-only work.

- Always push with explicit `--only <file>` flags, one per file you actually changed.
- Before pushing, verify local vs remote by pulling into a scratchpad dir and diffing:
  `shopify theme pull --store snacks-by-rocket.myshopify.com --theme 161208336642 --path <scratch> --only <file>`
- `config/settings_data.json` is whole-theme settings — pushing it overwrites every setting.
  Diff it against remote first and confirm the delta is only your intended keys.
- Templates known to carry remote-only editor work (pull before editing locally):
  `templates/index.json`, `page.about.json`, `page.recipes.json`, `blog.recipes.json`,
  `product.snack-box.json`, `page.customer-service.json`

## Navigation
- Active header nav menu handle: header-nav (Shop w/ dropdown, About, Recipes, Customer Service)
- Do not touch main-menu handle — used by other parts of the theme

## Do's
- Use Big Shoulders Display (via `.rb-heading`) for headings, Manrope for everything else
- Use #2D6A2F for primary CTAs and active states
- Use pill buttons (`border-radius: 999px`) for all CTAs
- Keep white backgrounds throughout
- Maintain all existing Shopify Liquid tags and functionality
- Use inline Lucide SVGs for all icons in Liquid files
- Reference the `:root` vars in `assets/rb-design.css` rather than hardcoding hex values

## Don'ts
- Do not use Clash Display — it is not loaded and renders as system sans
- Do not reintroduce the red→yellow gradient or #FFD400 yellow CTAs
- Do not use colored backgrounds (white only)
- Do not break existing cart/product/collection Liquid logic
- Do not touch the main-menu navigation handle
- Do not publish or push to the live theme (#136885895426)
