/**
 * RocketBoyz — Tapcart design tokens
 *
 * Single source of truth for the app's visual layer. Every custom block should
 * import from here rather than hardcoding values — this is what stops the app
 * drifting the way the Shopify theme did (26 orphaned `Clash Display` rules,
 * a `--rb-gradient` that isn't a gradient, etc).
 *
 * Ported from the audited web Brand Kit in CLAUDE.md, whose source of truth is
 * the `:root` block at assets/rb-design.css:17-32.
 *
 * PORTABLE: plain data, no imports, no framework assumptions. Works whether the
 * block renders in a webview (React DOM + CSS) or as a native-backed component.
 */

export const color = {
  /* ── Brand green (primary) ───────────────────────────────── */
  brand: '#2D6A2F',        // primary CTA fill, active/selected, links
  brandHover: '#245526',   // pressed / hover on light surfaces
  brandBright: '#4CC46A',  // hover text ON DARK surfaces — dark green is
                           // unreadable on near-black, use this instead
  success: '#1F7A3A',      // status / confirmation only

  /* ── Ink ─────────────────────────────────────────────────── */
  ink: '#1B1A16',          // primary text, dark buttons
  inkDeep: '#030213',      // product + PDP surfaces, borders
  textMuted: '#54514A',    // body copy
  textTertiary: '#52525B',
  textFaint: '#71717A',
  textDisabled: '#A1A1AA',

  /* ── Surface ─────────────────────────────────────────────── */
  white: '#FFFFFF',        // page background — the app stays white, like the web
  cream: '#F3F1EC',        // light text on dark backgrounds
  creamAlt: '#F3F0E9',
  cardBg: '#FBFAF7',
  wellBg: '#F0EFED',       // icon-button backgrounds, image wells

  /* ── Borders ─────────────────────────────────────────────── */
  border: 'rgba(27,26,22,0.12)',
  borderStrong: 'rgba(27,26,22,0.2)',
  borderOutline: 'rgba(27,26,22,0.22)',  // outline-button border
  borderProduct: '#E4E4E7',              // product / PDP surfaces

  /* ── Accents — legacy, use sparingly ─────────────────────── */
  wishlist: '#DC2626',     // heart hover only
  red: '#E63946',          // retained from pre-green palette
  orange: '#FF9F1C',       // retained; NOT the theme's #ff8b21 link-hover
} as const;

/**
 * NOTE: there is no gradient. The web `--rb-gradient` token holds a FLAT green
 * and `.rb-gradient-text` is just `color: #2D6A2F`. The old red→yellow gradient
 * is retired — do not reintroduce it in the app.
 */

export const font = {
  /**
   * Headings. Uppercase, tight leading.
   * CAVEAT: the web loads weight 800 ONLY, so `.rb-heading`'s declared 400
   * actually renders at 800. Match the *rendered* result — use 800 here.
   */
  heading: "'Big Shoulders Display', sans-serif",
  /** Body, nav, buttons, labels. */
  body: "'Manrope', sans-serif",

  /**
   * Webview blocks can load these from the Google Fonts CDN. Native app chrome
   * (tab bar, native PDP) generally requires uploading the font files in the
   * Tapcart dashboard — grab the .ttf/.otf for both families before building
   * anything native, or the app silently falls back to a system face.
   */
  cdn: 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&family=Manrope:wght@500;600;700&display=swap',

  weight: { medium: 500, semibold: 600, bold: 700, heading: 800 },
} as const;

export const radius = {
  pill: 999,   // ALL buttons/CTAs — the dominant shape
  circle: '50%',
  card: 20,    // product cards
  panel: 16,
  well: 14,
  sm: 12,
  xs: 8,
} as const;

export const shadow = {
  cardHover: '0 16px 32px -16px rgba(20,22,18,0.18)',
  panel: '0 8px 24px rgba(0,0,0,0.08)',
  stickyBar: '0 -4px 24px -8px rgba(3,2,19,0.12)',  // upward, for bottom bars
} as const;

export const space = {
  maxWidth: 1280,      // web container; app screens are viewport-width
  gutter: 32,          // web horizontal padding
  gutterMobile: 16,    // sensible app default
  section: 64,         // vertical rhythm (web uses ~64–80)
  cardPad: 16,
} as const;

export const motion = {
  standard: '0.2s',
  fast: '0.15s',       // small UI
} as const;

/**
 * Button presets — mirrors the web button system so the app reads as the same
 * brand. All pill-shaped. `onDark` variants exist because #2D6A2F disappears
 * against near-black; that pairing is what caused the App Store badge bug.
 */
export const button = {
  primary: {
    bg: color.brand,
    fg: color.white,
    font: font.body,
    weight: font.weight.bold,
    radius: radius.pill,
    // web hover is opacity 0.88 + 1px lift; on touch, prefer a pressed state
    pressedOpacity: 0.88,
  },
  outline: {
    bg: 'transparent',
    fg: color.ink,
    border: `1.5px solid ${color.borderOutline}`,
    radius: radius.pill,
    weight: font.weight.bold,
    pressedBg: color.ink,
    pressedFg: color.brandBright,
  },
  dark: {
    bg: color.ink,
    fg: color.creamAlt,
    radius: radius.pill,
    weight: font.weight.bold,
    pressedFg: color.brandBright,
  },
  soldOut: {
    bg: 'transparent',
    fg: color.inkDeep,
    border: `1.5px solid ${color.inkDeep}`,
    radius: radius.pill,
    disabled: true,
  },
} as const;

export const tokens = { color, font, radius, shadow, space, motion, button } as const;
export default tokens;
