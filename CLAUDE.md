# RocketBoyz — Project Context for Claude

## Project
Shopify theme for **snacks-by-rocket.myshopify.com** (RocketBoyz Caribbean snack brand).

- Active header: `sections/header-05.liquid` (controlled by `settings.header_layout: "05"`)
- Dev theme ID: `161208828162`
- Backup/staging theme ID: `161208336642`
- Local dev server: `shopify theme dev --store snacks-by-rocket.myshopify.com` → `http://127.0.0.1:9292`
- Push to dev: `shopify theme push --store snacks-by-rocket.myshopify.com --theme 161208828162`

---

# RocketBoyz Brand Kit

## Brand Overview
RocketBoyz is a premium Caribbean snack brand featuring a vibrant, modern aesthetic with bold gradients and high-contrast design elements.

---

## Color Palette

### Primary Colors
```css
#FFD400  /* Brand Yellow — Primary CTA, buttons */
#FFFFFF  /* Pure White — Backgrounds */
#030213  /* Deep Black — Primary text */
#27272A  /* Zinc 800 — Secondary text */
#52525B  /* Zinc 600 — Tertiary text */
```

### Gradients
```css
/* Primary — Headings & Accents */
background: linear-gradient(to right, #DC2626, #FACC15);

/* Extended variation */
background: linear-gradient(to right, #DC2626, #FACC15, #EF4444);
```

### Semantic Colors
```css
#DC2626  /* Red — Hover states, badges */
#EAB308  /* Yellow hover state */
#E4E4E7  /* Border (zinc-200) */
#FEFCE8  /* Background accent (yellow-50) */
```

---

## Typography

**Font**: Clash Display (Fontshare)
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
font-family: 'Clash Display', sans-serif;
```

**Weights**: 400 Regular · 500 Medium · 600 Semi-Bold · 700 Bold

### Gradient Heading Pattern
```css
background: linear-gradient(to right, #DC2626, #FACC15);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
font-weight: 700;
letter-spacing: -0.025em;
```

---

## Buttons

**Primary CTA (Yellow)**
```css
background: #FFD400;
color: #030213;
font-weight: 700;
padding: 12px 32px;
border-radius: 9999px; /* rounded-full */
```
Hover: `background: #EAB308`

**Secondary (Outline)**
```css
border: 2px solid #27272A;
color: #27272A;
border-radius: 9999px;
```
Hover: `background: #27272A; color: #fff`

---

## Icons
**Lucide React** v0.487.0 — use exclusively.
```
ShoppingCart, ShoppingBag, Heart, User, Search, Menu,
ChevronDown, Mail, Plus, Minus, X, Trash2, Check,
ArrowLeft, Star
```
Sizes: 16px (inline), 20px (nav/UI), 24px (mobile/prominent), 32px (feature)

---

## Border Radius
```
rounded-lg    → 8px   (small)
rounded-xl    → 12px  (medium)
rounded-2xl   → 16px  (cards)
rounded-full        (buttons, pills)
```

---

## Product Cards
- White background, `rounded-2xl`, `border border-zinc-200`
- Center-aligned content
- Brand tag: zinc-100 bg pill
- Product name: black, bold
- Price: gradient text (red→yellow)
- "Add to Cart": yellow fill, shows on hover

---

## Layout
- Container: `max-w-7xl` (1280px)
- Section spacing: `py-16 md:py-24`
- Product grid: 2col mobile → 3col tablet → 4col desktop

---

## Do's & Don'ts
✅ White backgrounds · Yellow CTAs · Gradient headings · Clash Display font · Lucide icons · Center-aligned cards · Smooth transitions

❌ Colored backgrounds · Mixed button styles · Left-aligned cards · Custom fonts · No gradient on headings · Small mobile padding
