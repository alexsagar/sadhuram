# Accessibility & Performance Standards

## 1. Accessibility (a11y) Foundation
Our goal is strict adherence to **WCAG 2.1 Level AA** standards:

### Semantic Structure
- Proper landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Unbroken heading hierarchy (`<h1>` through `<h4>`). Only one `<h1>` per view.
- Buttons for actions, anchor tags (`<a>`) for navigation. No `div` click handlers without full ARIA role and keyboard bindings.

### Color Contrast
- Body text meets minimum contrast ratio of **4.5:1** against the editorial background (`#F5F5F0`).
- Large headings and primary brand text meet minimum **7:1** contrast.
- Interface borders and secondary data tags meet minimum **3:1** contrast against backgrounds.

### Keyboard & Focus
- All interactive controls (navigation links, CV download button, project cards) are keyboard-focusable via `Tab` key.
- Visible, high-contrast focus rings (`outline: 2px solid var(--accent)` with offset).
- No keyboard traps in any overlay, modal, or WebGL container.

### Reduced Motion
- Respects `prefers-reduced-motion: reduce`.
- Animation timelines gracefully deactivate; content is positioned at its terminal state immediately.

### Spatial/3D Content Independence
- WebGL canvas is marked with `aria-hidden="true"` as visual enhancement.
- All substantive information presented visually in 3D (e.g. professional titles, project domains, credentials) exists as semantic, accessible HTML in the DOM.

---

## 2. Performance Engineering

### Core Web Vitals (CWV) Targets
- **Largest Contentful Paint (LCP)**: < 1.8s (DOM content renders fast; WebGL enhances progressively).
- **Cumulative Layout Shift (CLS)**: 0.00 (Reserved aspect-ratio boxes for all images and canvases).
- **Interaction to Next Paint (INP)**: < 100ms.

### WebGL & Three.js Optimization
- Clamped Device Pixel Ratio (`dpr={[1, 2]}`) to prevent 3x/4x mobile screen rendering bottlenecks.
- Automatic loop pausing: When canvas is out of the viewport, the render loop is suspended.
- Asset budgeting: 3D geometry and elevation textures must be compressed and budgeted under strict memory limits.
- Context loss recovery: Graceful handling of `webglcontextlost` events.

### Next.js & Asset Optimization
- Modern `next/font` for local font subsetting with zero layout shift.
- Static generation (`output: 'export'` compatible where needed).
- Zero extraneous UI libraries or icon bloat.
