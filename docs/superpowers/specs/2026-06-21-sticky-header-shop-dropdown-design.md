# Sticky Header — Shop Dropdown & Spacing Pass

## Context
`sections/header.liquid` already implements the rb-design v2 sticky frosted header (logo, linklist-driven nav, search/account icons, Contact Us pill, Cart pill wired to `cart.item_count`, mobile hamburger drawer). This spec covers the remaining delta to match the full design brief.

## Changes

1. **Shop dropdown panel** — new `dropdown_item` block type (`title`, `subtitle`, `url`) on the header section, defaulting to three preset blocks: Dollar Menu / Single snacks under $2, Snack Box / Curated monthly island box, Wholesale / Stock your shop by the case. Rendered as a 280px white card (18px radius, `1px solid rgba(27,26,22,0.12)` border, `0 26px 50px -24px rgba(20,22,18,0.45)` shadow, fade-up-on-open animation) anchored under the first nav item (Shop). Shown on hover/focus via CSS, chevron rotates 180° via `aria-expanded`.
2. **Active nav link style** — switch from the current red color treatment to `background: #f1ede4` per spec.
3. **Spacing literals** — inner container `padding: 14px 32px` (drop fixed `72px` height), zone `gap: 26px`; nav-item gap `6px`; actions cluster `gap: 16px` with `margin-left: auto`.
4. **Mobile breakpoint** — move from `768px` to `900px`.
5. **Font import cleanup** — remove the redundant in-section `@import` for Google Fonts (already loaded once in `layout/theme.liquid` `<head>`).

## Unchanged (kept as-is)
- Top-level nav stays linklist-driven (`linklists['header-nav']`) — already editable via Shopify's Navigation admin and already handles active state; not converted to blocks.
- Logo: existing `image_picker` + `logo_height` range setting.
- Cart pill: existing `cart.item_count` wiring.
- All icons: existing inline SVGs already match Lucide's exact path data (`search`, `user`, `shopping-bag`, `menu`, `chevron-down`) — no new icon assets needed.

## Out of scope
- No changes to `header-nav` linklist content itself (admin-managed).
- No changes to other header variants (`header-02` … `header-12`).
