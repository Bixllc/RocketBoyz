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

## File Structure Notes
- Header: sections/header-05.liquid (active header, controlled by settings.header_layout: "05")
- Announcement bar: sections/announcement-bar.liquid
- CSS: assets/component-header-05.css, assets/base.css
- Sections: sections/*.liquid
- Snippets: snippets/*.liquid
- Theme entry: layout/theme.liquid

## Theme IDs
- Dev theme (work here): 161208828162
- Backup/staging: 161208336642
- Live theme (DO NOT TOUCH): rocket 2023 — #136885895426

## Dev Commands
- Start dev server: shopify theme dev --store snacks-by-rocket.myshopify.com
- Push to dev: shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208828162
- Push single file: shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208828162 --only <file>
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
