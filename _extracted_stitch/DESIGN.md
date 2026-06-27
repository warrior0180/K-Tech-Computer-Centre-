---
name: Aurum Tech Noir
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#1f1f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e4e2e4'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#e4e2e4'
  inverse-on-surface: '#303032'
  outline: '#999077'
  outline-variant: '#4d4732'
  surface-tint: '#e9c400'
  primary: '#fff6df'
  on-primary: '#3a3000'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#705d00'
  secondary: '#c8c6c7'
  on-secondary: '#313031'
  secondary-container: '#4a494a'
  on-secondary-container: '#bab8b9'
  tertiary: '#fff5e8'
  on-tertiary: '#412d00'
  tertiary-container: '#fdd487'
  on-tertiary-container: '#785a1a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#e5e2e3'
  secondary-fixed-dim: '#c8c6c7'
  on-secondary-fixed: '#1c1b1c'
  on-secondary-fixed-variant: '#474647'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#131315'
  on-background: '#e4e2e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system translates the prestige of the "kTech" visual identity into a high-performance digital environment. It is engineered for a premium, elite audience that values both cutting-edge innovation and timeless luxury. The brand personality is authoritative, sophisticated, and technologically advanced.

The visual style is **Glassmorphic Tech-Noir**. It blends the deep, atmospheric obsidian of high-end hardware with the radiant brilliance of metallic gold. We employ translucent "smoked glass" layers, subtle gold-tinted glow effects, and precision-engineered typography to create an interface that feels like a futuristic command center for an exclusive enterprise. The emotional response is one of trust, exclusivity, and technological mastery.

## Colors

The palette is anchored by **Imperial Gold** and **Obsidian Black**, creating a high-contrast environment that exudes premium quality.

*   **Primary (Imperial Gold):** #FFD700. Used for calls to action, active states, and critical branding elements. It represents the "kTech" gold seal.
*   **Secondary (Obsidian):** #0A0A0B. The foundation of the UI. It provides a deep, infinite backdrop that allows gold and glass elements to pop.
*   **Tertiary (Muted Brass):** #C5A059. A lower-saturation metallic used for borders, secondary icons, and decorative accents to prevent the UI from becoming overly garish.
*   **Neutral (Slate Gray):** #1C1C1E. Used for surface containers and elevated layers to provide depth against the obsidian background.
*   **Functional Colors:** Success is a deep forest green (#1DB954) and Error is a sharp ruby red (#FF2D55), both adjusted with high saturation to remain visible against dark themes.

## Typography

The typography system utilizes **Sora** for its technical yet approachable geometric structure. It feels modern and "engineered." We complement this with **JetBrains Mono** for functional labels and data points to reinforce the "High-Tech" narrative.

**Hierarchy Rules:**
- **Display & Headlines:** Bold and tightly tracked to create a sense of strength. Use gold color for primary headlines sparingly to maintain impact.
- **Body:** Open line-height for readability against dark backgrounds. Use "Off-White" (#E4E4E7) to reduce eye strain.
- **Labels:** Monospaced and often uppercase. These are used for categories, metadata, and status indicators.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a base-8 rhythm. The layout should feel spacious and organized, mirroring the precision of high-end engineering.

**Grid Specs:**
- **Desktop:** 12-column grid with 24px gutters and 64px side margins. Max-width container of 1440px.
- **Tablet:** 8-column grid with 20px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

**Rhythm:** Vertical rhythm is strictly enforced in 8px increments. Large sections are separated by `xl` spacing to create a distinct, editorial feel.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layering**. We do not use traditional drop shadows; instead, we use light and blur to simulate depth.

1.  **Base Layer:** Solid Obsidian (#0A0A0B).
2.  **Surface Layer:** Neutral Slate (#1C1C1E) with a subtle 1px border (#FFFFFF10).
3.  **Floating Glass:** Backdrop-filter: blur(20px). Background: rgba(28, 28, 30, 0.7). These elements use a "Gold Rim" (a 1px semi-transparent gold gradient border) to denote maximum elevation.
4.  **Glow:** High-priority elements (like active gold buttons) emit a soft #FFD700 outer glow with 15% opacity to simulate light emission.

## Shapes

The shape language is **Technical & Precise**. We avoid overly bubbly or rounded corners to maintain a professional, high-performance aesthetic.

- **Standard Elements:** 4px (Soft) radius for buttons, inputs, and tags. This provides just enough softening to feel modern without losing the "industrial" edge.
- **Large Containers:** 8px radius for cards and modal windows.
- **Interactive States:** On hover, borders may transition from 1px to 1.5px to indicate focus, maintaining the geometric integrity.

## Components

### Buttons
- **Primary:** Solid Gold (#FFD700) background with Obsidian text. High-gloss finish. On hover, add a subtle gold outer glow.
- **Secondary:** Transparent background with a 1px Gold border. Gold text.
- **Ghost:** Monospaced text with a 0.5px muted brass underline on hover.

### Input Fields
- Dark grey background (#141415) with a 1px bottom border in Muted Brass. When focused, the border turns Solid Gold and the label (Sora, Sm) shifts upwards.

### Cards
- Smoked glass effect. 1px semi-transparent border (#FFFFFF15). Content should be padded with `md` (24px) spacing. Headers within cards should use the JetBrains Mono label style.

### Chips & Tags
- Rectangular with 2px radius. Dark backgrounds with Gold or White monospaced text. Used for status indicators (e.g., "STABLE", "ENCRYPTED").

### Data Visualization
- Line charts should use Gold gradients for the primary data line. Use a faint grid of 1px dotted lines in the background to emphasize the technical nature of the product.