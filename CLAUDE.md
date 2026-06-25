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

## Brand Kit

### Fonts
- Primary: Clash Display (Fontshare)
- Import: @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
- Use Clash Display for ALL text — headings, nav, buttons, body

### Colors
- Brand Yellow: #FFD400
- White: #FFFFFF
- Deep Black: #030213
- Secondary Text: #27272A
- Tertiary Text: #52525B
- Red Accent: #DC2626
- Primary Gradient: linear-gradient(to right, #DC2626, #FACC15)
- Border: #E4E4E7

### Buttons
- Primary CTA: background #FFD400, text zinc-900, font-weight bold, border-radius rounded-full
- Secondary: border-2 zinc-800, text zinc-800, rounded-full
- Hover: yellow shifts to #EAB308

### Icons
- Library: Lucide (use SVG equivalents in Liquid)
- Size: w-5 h-5 (20px) for nav icons
- Color: #030213 default, #DC2626 on hover

### Cards
- Border radius: rounded-2xl
- Border: 1px solid #E4E4E7
- Shadow on hover: shadow-lg
- Product price: gradient text (red to yellow)
- Add to Cart button: hidden by default, visible on hover

### Spacing
- Container max-width: 1280px
- Section padding: py-16 md:py-24
- Mobile padding: px-4, tablet: px-6, desktop: px-8

### Animations
- Standard: transition-colors duration-200
- Dropdowns: fade in + slide down (opacity 0→1, y 8→0, 150ms)

## Design Tokens v2 (reference only — not active, do not apply without explicit instruction)
This is an alternate design token set under consideration. It conflicts with the active Brand Kit above
(different fonts/colors) and must NOT be used in any file until the user explicitly says to switch to it.

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
- Push to working theme: shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208336642
- Push single file: shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208336642 --only <file>
- Local preview: http://127.0.0.1:9292

## Navigation
- Active header nav menu handle: header-nav (Shop w/ dropdown, About, Recipes, Customer Service)
- Do not touch main-menu handle — used by other parts of the theme

## Do's
- Always use Clash Display font
- Always use #FFD400 for primary CTAs
- Apply gradient to all major headings
- Keep white backgrounds throughout
- Maintain all existing Shopify Liquid tags and functionality
- Use inline Lucide SVGs for all icons in Liquid files

## Don'ts
- Do not use any font other than Clash Display
- Do not use colored backgrounds (white only)
- Do not break existing cart/product/collection Liquid logic
- Do not touch the main-menu navigation handle
- Do not publish or push to the live theme (#136885895426)
