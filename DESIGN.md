---
name: Miroooo
description: A precise and quietly premium UK oral-care storefront.
colors:
  instrument-black: "#080909"
  graphite-surface: "#141515"
  soft-silver: "#d9dad8"
  porcelain: "#f4f4f1"
  mineral-grey: "#a6a8a4"
  signal-green: "#22c55e"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 7rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 4.5rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  control: "999px"
  surface: "18px"
  media: "28px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
  section: "clamp(72px, 10vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.instrument-black}"
    rounded: "{rounded.control}"
    padding: "16px 28px"
  button-dark:
    backgroundColor: "{colors.instrument-black}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.control}"
    padding: "16px 28px"
---

# Design System: Miroooo

## 1. Overview

**Creative North Star: "The Quiet Instrument"**

Miroooo should feel like a precision object placed on a calm bathroom counter: dark anodised metal, soft daylight, clean edges and just enough reflection to reveal the form. The interface is predominantly dark, but not theatrical. Product photography, measured typography and tactile controls carry the identity.

The system rejects dental-clinic teal, copied Shopify residue and generic luxury decoration. Sections can be cinematic when the product media deserves it, while navigation, comparison and policy content remain direct and easy to scan.

**Key Characteristics:**

- Near-black surfaces with porcelain text and soft-silver dividers.
- Large, tight display type balanced by compact utility labels.
- Rounded controls, but disciplined media and layout geometry.
- Subtle exponential motion that supports product handling.
- Real product imagery as the dominant visual material.

## 2. Colors

The palette comes from aluminium, charcoal packaging, clean ceramic surfaces and a restrained operational green.

### Primary

- **Instrument Black:** The main page and navigation surface. It keeps attention on the silver product.
- **Porcelain:** Primary text, pale sections and high-contrast buying controls.

### Secondary

- **Soft Silver:** Dividers, secondary labels and reflective details inspired by the toothbrush body.
- **Signal Green:** Reserved for availability, check marks and confirmed states. It is never decorative.

### Neutral

- **Graphite Surface:** Raised drawers, comparison rows and secondary dark sections.
- **Mineral Grey:** Supporting copy and muted metadata.

### Named Rules

**The Metal, Not Gold Rule.** Premium means aluminium, contrast and proportion. Gold gradients and jewellery styling are prohibited.

**The Signal Rule.** Green communicates a real state only. Never flood a section with it.

## 3. Typography

**Display Font:** Inter (with Arial fallback)
**Body Font:** Inter (with Arial fallback)

**Character:** The existing product pages use a compact sans-serif system. Identity is created with extreme scale contrast, tight display tracking and the unusually spaced Miroooo wordmark rather than adding a competing editorial font.

### Hierarchy

- **Display** (700, fluid 2.8rem to 7rem, 0.92): Homepage statements and model names.
- **Headline** (650, fluid 2rem to 4.5rem, 1): Section headings and range comparisons.
- **Title** (600, fluid 1.25rem to 2rem, 1.15): Cards, policy groups and product summaries.
- **Body** (400, fluid 1rem to 1.125rem, 1.55): Explanations with a maximum line length of 68ch.
- **Label** (700, 0.75rem, 0.14em tracking): Short navigation, model and utility labels.

### Named Rules

**The One Breath Rule.** Headings should state one useful idea in one breath. Avoid stacked marketing slogans.

## 4. Elevation

The system is flat by default. Depth comes from tonal surface changes, media overlap and thin pale borders. Shadows appear only on floating navigation, drawers and active controls, with broad blur and very low opacity.

### Shadow Vocabulary

- **Floating Control** (`0 18px 60px rgba(0, 0, 0, 0.22)`): Mobile navigation and sticky purchase controls only.
- **Pale Surface** (`0 24px 80px rgba(8, 9, 9, 0.10)`): Product imagery placed on porcelain sections.

### Named Rules

**The Flat-at-Rest Rule.** Static content does not float. Elevation must communicate interaction or overlap.

## 5. Components

Components feel engineered, generous and immediate.

### Buttons

- **Shape:** Full pill for primary actions (999px radius).
- **Primary:** Porcelain background with instrument-black text and 16px by 28px padding.
- **Hover / Focus:** Short colour inversion or 2px translate, with a visible 2px offset focus ring.
- **Secondary:** Transparent with a soft-silver one-pixel border.

### Cards / Containers

- **Corner Style:** 18px for information surfaces, 28px for dominant product media.
- **Background:** Instrument black, graphite or porcelain depending on narrative rhythm.
- **Shadow Strategy:** Flat unless interactive or overlapping.
- **Border:** One-pixel low-contrast border, never a coloured side stripe.
- **Internal Padding:** Fluid 20px to 40px.

### Inputs / Fields

- **Style:** Dark or porcelain filled fields with a one-pixel border and 12px radius.
- **Focus:** Clear two-pixel outline with four-pixel offset.
- **Error / Disabled:** Text and icon accompany colour; never colour alone.

### Navigation

- Compact dark header with the spaced Miroooo wordmark centred on desktop and left-aligned on mobile.
- Links use short UK-English nouns, 44px minimum targets and a visible current state.
- Mobile navigation opens as a full-height graphite panel with immediate close, Escape and restored scrolling.

### Model Selector

- X and X2 are presented as two physical objects, not identical feature cards.
- Each model has a direct product link and a concise reason to choose it.

## 6. Do's and Don'ts

### Do:

- **Do** use authentic X and X2 product imagery at its natural ratio.
- **Do** keep the buying path and policy links visible and functional on mobile.
- **Do** use UK English, GBP and `miroooo.co` canonicals throughout.
- **Do** honour reduced-motion preferences and keyboard operation.
- **Do** distinguish model differences with factual product information.

### Don't:

- **Don't** include any inherited source-store identity, routes, metadata, analytics or customer-facing references.
- **Don't** use a generic white-and-teal dental-clinic aesthetic.
- **Don't** retain copied-store residue, Dutch language, placeholder contact details or broken Shopify routes.
- **Don't** fabricate reviews, medical claims, dentist endorsements, testing, scarcity or urgency.
- **Don't** use generic AI landing-page card grids, purple gradients, glass effects or decorative clutter.
- **Don't** use gradient text, coloured side stripes or nested cards.
