# Responsive Strategy & Adaptive Motion

## 1. Responsive Philosophy
Mobile is not a squeezed desktop composition. Each breakpoint category receives an intentional, art-directed layout and an appropriately adapted motion strategy that preserves typographic dignity, performance, and spatial clarity.

---

## 2. Supported Breakpoints

| Device Category | Target Viewports | Layout & Scroll Characteristics |
| :--- | :--- | :--- |
| **Large Desktop** | `1440px+` | Full wide margins, multi-column editorial spreads, full 3D spatial fidelity, pinned horizontal storytelling track. |
| **Standard Desktop** | `1280px` | Primary design baseline, balanced grid systems, full interactive parallax, coordinated scroll narrative. |
| **Small Desktop / Laptop** | `1024px` | Consolidated columns, adjusted typographic scale via fluid tokens, optimized horizontal project travel. |
| **Tablet** | `768px - 834px` | Simplified 2-column or stacked grid, touch-friendly tap targets, reduced 3D density, touch-tuned smooth scroll. |
| **Large Mobile** | `430px - 390px` | Single-column linear flow, horizontal tracks convert to vertical stacks, optimized 3D geometry or static relief fallback. |
| **Standard / Small Mobile** | `375px - 320px` | Tight gutters (16–20px), linear narrative, minimal UI chrome, maximum readability, native vertical flow. |

---

## 3. Scroll Experience Tiers Across Devices

### Desktop (`>= 1024px`): Richest Spatial Scroll
- Full Lenis smooth scrolling interpolation.
- Pinned horizontal project storytelling track driven by vertical scroll.
- Coordinated 3D camera travel and multi-depth layer parallax.
- Full-viewport sticky footer reveal.

### Tablet (`768px - 1023px`): Reduced Spatial Experience
- Touch-tuned Lenis smooth scrolling (`touchMultiplier: 1.5`).
- Pinned moments shortened to respect screen real estate.
- Parallax driven strictly by vertical scroll progress rather than pointer tracking.
- WebGL geometry decimated to ensure steady 60 FPS on mobile GPUs.

### Mobile (`< 768px`): Prioritizes Natural Vertical Flow
- **Horizontal to Vertical Transformation**: Pinned horizontal tracks (e.g. Selected Projects) automatically convert into clean, sequential vertical editorial stacks. Users are never forced to horizontally scrub multi-screen tracks on touchscreens.
- **Simplified Choreography**: Complex 3D camera trajectories simplify into calm opacity fades and slight vertical translates (`y: 16px` to `0`).
- **Zero Scroll Traps**: Pinning is either disabled or strictly limited to brief headline sticks. Natural vertical document flow is protected.

---

## 4. WebGL Adaptive Scaling
- **Desktop**: Full terrain mesh resolution, multi-layer contour lines, coordinate graticules, and subtle cursor parallax.
- **Tablet**: Moderate mesh geometry density, reduced contour line count, scroll-only parallax.
- **Mobile**: Single-layer elevation relief or high-resolution pre-rendered vector/raster hillshade fallback; lowered draw-call complexity and disabled heavy post-processing.

---

## 5. Spacing & Fluid Sizing
- Gutters: Desktop `48px - 64px`, Tablet `32px`, Mobile `20px - 24px`.
- Max content width: `1320px`.
- Text reading column: `680px - 720px` (maximum 65–75 characters per line).
- Fluid typography utilizing CSS `clamp()` ensures seamless text scaling without awkward breakpoint jumpiness.
