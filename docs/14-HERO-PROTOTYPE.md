# Phase 3 Hero Prototype: Geographic Photography & Restrained Parallax

Status: Isolated `/hero-lab` prototype, updated 2026-09-14 under approved decisions D-024 through D-027. It remains strictly isolated, marked `noindex`, and excluded from `/`, sitemap, and production navigation.

---

## 1. Photographic Source, Provenance & License

The active physical-geography hero uses authentic photography of Nepal's middle hills:
- **Title**: “Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across hilltops.”
- **Creator**: Eagle Vision IT
- **Source Repository**: WordPress Photo Directory ([Landing Page](https://wordpress.org/photos/photo/805643550b/))
- **License**: [CC0 1.0 Universal (Public Domain Dedication)](https://creativecommons.org/publicdomain/zero/1.0/)
- **Geographic Location**: Middle hills near Kavre, Bagmati Province, Nepal (central mid-hill topography).
- **Attribution**: While CC0 requires no attribution, provenance is fully disclosed in the prototype's source disclosure section for professional transparency.

---

## 2. Desktop Layer Preparation

The high-resolution source photograph (2048 × 1073) was prepared offline using `scripts/hero/prepare_layers.py`:
- The foreground out-of-focus branch on the left was cropped away to create an unobstructed negative-space reading zone for typography.
- Sized to an authoring canvas of 1760 × 1467 with a calibrated sky extension that prevents top clipping during vertical parallax.
- Graded to the project's **Cartographic Neutral** palette (D-020): desaturated natural greens, graphite shadow anchors (`#1B211E`), cooled midtones, and paper-soft highlights.
- Separated into four soft-feathered depth plates:
  1. `backdrop.webp` (29.9 KB, 1760 × 1467): Distant sky and atmospheric ridge silhouettes.
  2. `ridge.webp` (67.0 KB, 1760 × 683): Mid-distance ridgelines.
  3. `terrain.webp` (164.4 KB, 1760 × 928): Primary rolling valley and agricultural terraces.
  4. `foreground.webp` (200.7 KB, 1760 × 834): Immediate forested slopes.
- Exported as losslessly compressed WebP images with absolute positioning coordinates recorded in `public/images/hero/source.json`.

---

## 3. Mobile Asset

- Mobile viewports use a dedicated vertical crop: `public/images/hero/hero-mobile.webp` (88.5 KB, 780 × 1015).
- Framed specifically for portrait aspect ratios, prioritizing the calm sky and distant mountain silhouettes behind typography, with agricultural settlements anchored below.

---

## 4. Parallax Architecture & Scroll Choreography

- The desktop wrapper uses a travel distance of `180svh` with a sticky inner viewport (`height: 100svh; position: sticky; top: 0;`).
- Scroll distance is scrubbed via **GSAP ScrollTrigger** (`id: "hero-parallax"`):
  - `backdrop`: `-1.0%` vertical travel
  - `ridge`: `-2.4%` vertical travel
  - `terrain`: `-4.8%` vertical travel
  - `foreground`: `-7.6%` vertical travel
- Motion rates are intentionally subtle and restrained—experienced as subtle physical depth rather than a visual novelty or aggressive 3D effect.

---

## 5. Lenis Integration & Motion Lifecycle

- Smooth scrolling remains exclusively owned by the root `<SmoothScrollProvider>`. `HeroLab` never instantiates or configures its own Lenis instance.
- GSAP ScrollTrigger updates are bound to Lenis via the centralized ticker.
- All GSAP animations are scoped within `gsap.context(..., root)` and reverted cleanly upon unmount.
- When dynamic media preference toggles occur (e.g. toggling `prefers-reduced-motion`), the cleanup handler measures the relative bounding rect of the following section and invokes `lenis.scrollTo(...)` to ensure zero scroll position jumping.

---

## 6. Typography & Editorial Hierarchy

Calibrated to **Engineering Editorial** standards (D-021, D-025):
- **Identity**:
  - Name: `Sadhuram Lamichhane` (16–20px, 500 weight, normal tracking)
  - Role: `Geomatics Engineer & GIS Expert` (13–15px, muted ink `#B6BDB8`)
- **Headline**:
  - `Geospatial analysis for land, infrastructure and planning.`
  - Set in **Title case** (giant all-caps display removed).
  - Target desktop size at 1440 × 900: `clamp(38px, 4.4vw, 68px)` (~63px at 1440px), within the 56–76px specification.
  - Optical measure: 14–18 characters per line across two balanced lines.
- **Actions**:
  - Primary CTA: `Explore Projects` (44px tap target, subtle graphite backing `rgba(18, 23, 21, 0.72)` with 1px border, meeting WCAG AA contrast).
  - Secondary CTA: `Download CV` (clean text link with offset underline).
  - Both link to `#practice-test`, maintaining full keyboard accessibility and tab order without dead disabled buttons.
  - Prototype status note removed from the primary visual reading zone.

---

## 7. Responsive Layout & Mobile Document Flow

- **Desktop (>= 1024px)**: Full multi-plane parallax stage with typography positioned in the upper-left negative space (contrast > 9:1 against overcast sky).
- **Tablet (768px – 1023px)**: Pinned travel shortened to `160svh`. Typography positioned at `top: 11vh`, safely above the dense foreground foliage.
- **Mobile (< 768px)**:
  - **Normal document flow first** (D-022): The rigid `height: 88svh; overflow: hidden;` lock was removed.
  - `.travel` and `.frame` flow naturally with `min-height: 100svh; height: auto;`.
  - Content never collides or wraps awkwardly on short viewports (including 320 × 568 iPhone SE).
  - A restrained editorial gradient backing (`.mobileStage::after`) ensures all text and buttons exceed the WCAG AA 4.5:1 / 7:1 contrast threshold over the photograph.

---

## 8. Stable Layout Geometry & Zero CLS

- Previous implementations dynamically swapped `.travel` height between `auto` and `185svh` via client-side JavaScript state (`data-animated`), inducing Cumulative Layout Shift.
- In the corrected implementation, layout geometry is strictly defined through **CSS media queries**:
  - `@media (min-width: 768px)` enforces `height: 180svh;` identically on server render and client hydration.
  - `@media (max-width: 767px)` and `@media (prefers-reduced-motion: reduce)` enforce `height: auto; min-height: 100svh;`.
- JavaScript `animated` state is used solely to initialize GSAP ScrollTrigger, resulting in **CLS = 0.00**.

---

## 9. Responsive Image Loading Strategy

Standard browser preloaders request HTML `<img>` elements regardless of CSS `display: none` on parent containers. To prevent mobile devices from downloading desktop parallax plates, the markup uses responsive `<picture>` elements with media queries:
- **Mobile Crop**: `<source media="(max-width: 767px)" srcSet="/images/hero/hero-mobile.webp" />`
- **Desktop Plates**: `<source media="(min-width: 768px)" srcSet="/images/hero/..." />`
- **Fallback `src`**: A 1×1 transparent SVG data URI.
- **Result**:
  - Mobile devices (< 768px) download **only** `hero-mobile.webp` (88.5 KB). Desktop plates are completely ignored by the preloader.
  - Desktop devices (>= 768px) download **only** the 4 plates (462 KB total). The mobile crop is never requested.

---

## 10. Performance Measurements

- **Desktop Image Payload**:
  - `backdrop.webp`: 29.9 KB
  - `ridge.webp`: 67.0 KB
  - `terrain.webp`: 164.4 KB
  - `foreground.webp`: 200.7 KB
  - **Total Desktop**: **462.0 KB** (within the ≤500 KB budget).
- **Mobile Image Payload**:
  - `hero-mobile.webp`: **88.5 KB** (well within the ≤200 KB budget; zero desktop plates fetched).
- **DOM / Rendering**:
  - Zero Three.js WebGL canvas overhead in the primary physical hero.
  - 60 FPS GPU-composited transforms (`translate3d`, `opacity`).
  - Zero layout thrashing during scroll scrub.

---

## 11. Reduced Motion (`prefers-reduced-motion: reduce`)

- Automatically detected via CSS and JS `matchMedia`.
- CSS deactivates sticky pinning, setting `.travel` to `height: auto; min-height: 100svh;`.
- GSAP ScrollTrigger is completely bypassed; all plates and text remain in their terminal legible rest state.
- Dynamic runtime toggles between normal and reduced motion preserve exact scroll position without page reload.

---

## 12. Rejected Pseudo-GIS Elements (D-026)

The following synthetic/pseudo-GIS elements from early iterations were audited and permanently removed:
- **Pseudo-contours (`isolines.svg`)**: Traced via marching squares from photographic haze and tone. They possessed no elevation datum or georeferencing, violating Rule 3 of `AGENTS.md`.
- **Arbitrary Crosshair Marks (`MARKS`)**: Non-georeferenced screen-percentage markers that visually simulated survey benchmarks without authentic data.
- **Uppercase Display Typography**: Giant 106px uppercase styling that distracted from the engineering-editorial tone.

---

## 13. Simplified Hero Architecture (Approved per D-032, D-033, D-034)

The hero architecture has been simplified to focus on its primary purpose:
- **Core Principle**: Real geographic landscape photography + restrained GSAP scroll parallax + calm editorial typography + direct release into `#practice-test` on `#F2F1EC` paper ground.
- **Archival of Standalone GIS Handoff (D-032)**: The Phase 3B analytical cartographic specimen sheet, DEM contour assets, and shaded relief were removed from the hero and safely archived in `artifacts/archive/gis-handoff-experiment/`.
- **Contextual GIS Evidence (D-033)**: Technical GIS visual evidence (project maps, UAV surveys, land-use plans, risk modeling) belongs contextually in project case studies and regional sections, not in a decorative hero demo.
- **Concise Desktop Travel (D-034)**: Desktop travel was shortened from 180svh to 150svh (135svh tablet), delivering a refined spatial depth feel without unnecessary scroll duration.
- **Transition**:
  - `0.00 – 0.45`: Landscape and identity in clear contemplative state.
  - `0.45 – 0.72`: Title and identity clear smoothly as parallax progresses.
  - `0.68 – 0.98`: Landscape recedes and paper veil (`#F2F1EC`) arrives.
  - `0.98 – 1.00`: Hero releases cleanly into the editorial introduction.

---

## 14. Archived Phase 3B Cartographic Handoff Experiment

Preserved in `artifacts/archive/gis-handoff-experiment/`:
- **Files**: `components/analytical-handoff.tsx`, `components/analytical-handoff.module.css`, `public-gis-hero/*`, `scripts/terrain/preprocess_contours.py`.
- **Status**: **ARCHIVED · NOT ACTIVE · NOT PUBLIC PORTFOLIO CONTENT (D-032)**.
- **Reference**: Geodetic provenance documented in `docs/15-GIS-DATA-PROVENANCE.md`.

---

## 15. Archived Three.js / DEM Experiment (D-024)

The earlier Three.js / React Three Fiber prototype developed under D-023 is preserved in `artifacts/archive/hero-terrain-r3f/`:
- **Files**: `hero-canvas.tsx`, `scene.tsx`, `terrain-shader.ts`, `terrain.ts`, `hero-lab.tsx`.
- **Status**: **ARCHIVED · NOT ACTIVE · REJECTED AS HOMEPAGE HERO (D-024)**.
- **Reason for Rejection**: The 3D rendered Copernicus DEM mesh read visually as an isolated 3D "rock" or floating object rather than authentic Himalayan geography or professional GIS work.
- **Reusability**: The Copernicus DEM GLO-30 preprocessing pipeline (`scripts/terrain/preprocess.py`) remains intact in the repository for potential future secondary interactive GIS demonstrations (e.g. within dedicated project case studies).

---

## 16. Topographic Contour Overlay Motif (D-035 / D-036)

To reintroduce authentic geospatial domain identity into the hero experience without pausing the visitor with a standalone technical report or map specimen panel, subtle topographic contour lines have been integrated directly as a scroll-driven atmospheric visual motif.

### 16.1 Asset Provenance & Geometry
- **Source**: Verified Copernicus DEM GLO-30 regional elevation data for Kavrepalanchok, Nepal (`artifacts/archive/gis-handoff-experiment/public-gis-hero/contours.svg`).
- **Processing**: Extracted via `scripts/hero/create_contour_overlay.py` into `public/images/hero/contours-overlay.svg`.
- **Modifications**: Completely stripped of `<text>` annotations, elevation numerals (`1400m`, `1600m`, etc.), coordinates, and neatline frames.
- **Linework Specification**:
  - Intermediate contours: stroke `var(--hero-contour, rgba(220, 226, 222, 0.55))`, width 0.9px.
  - Index contours: stroke `var(--hero-contour-index, rgba(245, 248, 245, 0.85))`, width 1.5px.

### 16.2 Atmospheric Masking & Contrast Protection
- Located in `components/hero/hero-lab.module.css` under `.contourOverlay`.
- Positioned inside the `.stage` behind `.heroHeader` (z-index 7 vs z-index 5 on `.frame`).
- Vertical gradient mask (`180deg, transparent 0% to 26%, rgba(0,0,0,0.35) at 36%, rgba(0,0,0,0.9) at 52%, transparent at 100%`) ensures contours appear solely across the mountain relief, keeping the upper sky and title typography 100% clean and legible (> 9:1 contrast).

### 16.3 Scroll-Responsive Lifecycle Curve
- **0.00 – 0.20**: Opacity 0.00. Real landscape photograph dominant.
- **0.20 – 0.55**: Smooth fade-in (`smoothRange(0.20, 0.55, p)`).
- **0.55 – 0.80**: Peak subtle presence (opacity 0.35, synchronized with terrain parallax travel at `-4.2% * p`).
- **0.80 – 0.98**: Smooth fade-out (`1 - smoothRange(0.80, 0.98, p)`).
- **0.98 – 1.00**: Completely invisible as the editorial paper transition completes.
- **Mobile (< 768px)**: Static subtle watermark (`opacity: 0.16`) in natural document flow.
- **Reduced Motion**: Static subtle presence (`opacity: 0.22`) with zero animation.
