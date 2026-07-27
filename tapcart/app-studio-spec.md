# RocketBoyz — Tapcart App Studio configuration spec

**Plan:** Growth ($99/mo) — unlimited custom screens + unlimited blocks, no CLI.
All work happens in the Tapcart dashboard. Values below come from the audited
Brand Kit (`tapcart/design-tokens.ts`, sourced from `assets/rb-design.css:17-32`).

Work top to bottom. Step 1 rebrands every screen at once — do it before touching
individual screens.

---

## STEP 1 — Global theme (do this first, biggest win)

### Colors

| Purpose | Value | Notes |
|---|---|---|
| Primary / brand | `#2D6A2F` | buttons, active states, links, badges |
| Primary pressed | `#245526` | hover/pressed on light backgrounds |
| Accent on dark | `#4CC46A` | **only** on dark surfaces — `#2D6A2F` is unreadable on near-black |
| Background | `#FFFFFF` | app stays white, matching the site |
| Primary text | `#1B1A16` | |
| Secondary text | `#54514A` | body copy |
| Tertiary text | `#52525B` | |
| Muted / disabled | `#A1A1AA` | |
| Border | `#E4E4E7` | product surfaces |
| Card surface | `#FBFAF7` | |
| Sale / urgency | `#DC2626` | use sparingly — wishlist, clearance only |

> **No gradients.** The old red→yellow gradient is retired. If a field asks for a
> gradient, use flat `#2D6A2F`.

### Typography

| Role | Font | Weight |
|---|---|---|
| Headings | **Big Shoulders Display** | 800 (uppercase, tight leading) |
| Body / UI / buttons | **Manrope** | 500 / 600 / 700 |

Both are Google Fonts. If Tapcart requires uploads rather than a picker, get the
files here — **do not substitute a system font**, it breaks brand consistency:
- https://fonts.google.com/specimen/Big+Shoulders+Display (weight 800)
- https://fonts.google.com/specimen/Manrope (weights 500, 600, 700)

⚠️ Do **not** use Clash Display. It's referenced in the old theme CSS but was never
actually loaded — those rules render as system sans. It is not the brand font.

### Buttons

- **Shape:** fully rounded / pill (`999px` radius) — applies to every CTA
- **Primary:** `#2D6A2F` background, `#FFFFFF` text, Manrope 700
- **Secondary/outline:** transparent background, `#1B1A16` text, 1.5px border `rgba(27,26,22,0.22)`
- **On dark backgrounds:** text/icon `#4CC46A`

### Corner radii

| Element | Radius |
|---|---|
| Buttons / pills | fully rounded |
| Product cards | 20px |
| Panels / sheets | 16px |
| Image wells | 14px |
| Small UI | 8–12px |

---

## STEP 2 — Tab bar / navigation

Mirror the site's `header-nav`: **Shop · About · Recipes · Customer Service**,
plus standard app tabs (Home, Search, Cart, Account) as the layout allows.

- Active icon/label: `#2D6A2F`
- Inactive: `#52525B`
- Icons: Lucide equivalents, matching the web

---

## STEP 3 — Screens (from Figma, highest-traffic first)

Order by revenue impact, not by ease:

1. **Home** — first impression, highest traffic
2. **PDP** — where conversion happens
3. **Collection / category listing**
4. **Cart**
5. **Search**
6. **Account / order history**
7. Secondary: About, Recipes, Customer Service

For each screen: match the Figma layout using stock blocks, then apply Step 1
values wherever a block exposes its own color/font override.

---

## STEP 4 — Publishing (IMPORTANT)

Growth has **no sandbox** (Enterprise-plus) and **no A/B testing** (Scale). The app
is the primary revenue channel, so:

- Use **Release Manager** for every publish — understand its rollback behavior *before* the first release
- Publish in small increments; never batch many screen changes into one release
- Publish during low-traffic hours
- Verify on a real device immediately after each release

---

## Open questions — confirm in the dashboard

- [ ] Does the theme editor expose all the color roles above, or a smaller fixed set?
- [ ] Are custom font uploads supported on Growth, or picker-only?
- [ ] Does Release Manager support rollback to a previous version?
- [ ] Can radii be set globally, or only per-block?
- [ ] What does "AI Agent App Studio" allow — can it build screens from a description or a design reference?
