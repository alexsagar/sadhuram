# Project Roadmap & Task System

## Phase 1: Foundation (reduced-motion lifecycle corrected)
- [x] Environment inspection & Git initialization
- [x] Next.js 16 (App Router) initialization in root directory
- [x] Install core frontend dependencies (`three`, `@types/three`, `gsap`, `@react-three/fiber`, `@react-three/drei`)
- [x] Install Lenis (`lenis@^1.3.x`) smooth scrolling foundation
- [x] Create centralized Lenis architecture (`components/providers/smooth-scroll-provider.tsx`)
- [x] Integrate Lenis with GSAP ticker & sync with ScrollTrigger
- [x] Verify reduced-motion behavior & anchor link interception
- [x] Complete documentation suite (`docs/00` to `docs/12`)
- [x] Comprehensive `AGENTS.md` instructions and prohibited patterns rules
- [x] Theme system & semantic design tokens in `globals.css`
- [x] Typography setup via `next/font` (Geist & Geist Mono)
- [x] Base SEO metadata structure & root layout
- [x] Minimal foundational index page validating typography, palette, and layout
- [x] Zero-error verification: `npm run lint` and `npm run build`

---

## Phase 2: Hero Art Direction (DOCUMENTATION COMPLETE — AWAITING REVIEW)
- [x] Research real DEM source characteristics and compare real versus controlled synthetic elevation
- [x] Recommend terrain composition, mesh budgets and contour hierarchy
- [x] Specify palette relationships, lighting and editorial handoff
- [x] Document camera framing/projection strategy and scroll state ranges
- [x] Specify hero copy alternatives, typography, navigation and CTA hierarchy
- [x] Define desktop, tablet, mobile and reduced-motion compositions
- [x] Evaluate analytical layers, provenance constraints and rendering methods
- [x] Complete docs/04-HERO-DIRECTION.md and docs/13-HERO-ART-DIRECTION.md
- [x] Record design-skill critique and separate recommendations from approved decisions
- [x] Record approved palette, prototype copy, spatial-layer and mobile corrections
- [ ] Obtain separate Phase 3 authorization

Source crop preview selection, actual visual testing and runtime performance measurement remain future validation; no DEM downloaded or prototype implemented.

Phase 1 follow-up identified during read-only review:
- [x] Correct and browser-verify live reduced-motion Lenis lifecycle before hero integration (see doc 13 §17)

---
## Phase 3: Hero Prototype & Spatial Choreography

### Archived Experiment: Synthetic 3D DEM Mesh (Rejected per D-024)
- [x] Implement isolated client-side R3F Canvas with progressive fallback (`/hero-lab`)
- [x] Build terrain mesh component (Copernicus DEM GLO-30 decimetre heights)
- [x] Implement topographic height-contour shader
- [x] Visual review completed: rejected as primary homepage hero (read as 3D rock object rather than convincing geography)
- [x] Archived in `artifacts/archive/hero-terrain-r3f/` (preserved for potential future non-hero GIS interactions)

### Active Hero: Real Geographic Photography & Restrained Parallax (Approved per D-025, D-026, D-027)
- [x] Implement isolated photographic parallax prototype in `/hero-lab` (CC0 Kavre middle hills)
- [x] Remove unverified pseudo-GIS elements (haze isolines and arbitrary crosshair marks per D-026)
- [x] Calibrate typography to Cartographic Neutral / Engineering Editorial standards (title case, 56–76px)
- [x] Implement responsive asset partitioning (<picture> media queries prevent mobile from downloading desktop plates)
- [x] Implement stable layout geometry (zero CLS across SSR/hydration without height switching)
- [x] Implement normal document flow and WCAG AA contrast for mobile (< 768px) and tablet
- [x] Build clean architectural handoff slot for verified GIS layer (D-027)
- [x] **Phase 3B: Verified GIS / Cartographic Handoff (ARCHIVED / CANCELLED per D-032 / D-033)**:
  - [x] Extract verified Copernicus DEM GLO-30 Public 10 km crop over Kavre middle hills (D-028)
  - [x] Precompute analytical Lambertian shaded relief and SVG contours (D-029)
  - [x] Establish `REGIONAL` handoff classification (D-030)
  - [x] Archived in `artifacts/archive/gis-handoff-experiment/` (preserved for project case studies)
  - [x] Documented in `docs/15-GIS-DATA-PROVENANCE.md` (marked ARCHIVED EXPERIMENT)
- [x] **Simplified Hero Direction (ACTIVE per D-032, D-033, D-034)**:
  - [x] Remove standalone GIS analytical handoff component from active hero (D-032)
  - [x] Remove `data-analytical-slot`, dead styles, and dead handoff DOM nodes
  - [x] Establish contextual GIS evidence principle: GIS belongs in project content, not hero (D-033)
  - [x] Implement direct, smooth hero-to-editorial portfolio transition (#F2F1EC) (D-034)
  - [x] Re-tune desktop travel length from 180svh to 150svh (135svh tablet) (D-034)
  - [x] Validate natural mobile document flow without height locks
  - [x] Validate runtime reduced-motion stability
- [x] **Topographic Contour Overlay Motif (ACTIVE per D-035, D-036)**:
  - [x] Extract pure vector contour linework (`contours-overlay.svg`) from verified Copernicus DEM GLO-30 data (D-035)
  - [x] Remove all text, numeric elevation labels, coordinates, and scale bars from the vector overlay
  - [x] Apply vertical gradient masking in CSS to drape lines across middle-hill terrain relief while protecting upper sky and title contrast
  - [x] Implement 4-phase scroll-responsive lifecycle in GSAP: 0-20% invisible, 20-55% fade in, 55-80% peak at 0.35 opacity, 80-98% fade out (D-036)
  - [x] Synchronize contour vertical parallax travel with terrain plate (-4.2% travel)
  - [x] Implement lightweight static mobile watermark overlay (opacity 0.16) and reduced-motion fallback (opacity 0.22)
  - [x] Add automated structure and lifecycle regression tests in `tests/hero-lab-structure.test.mjs`
- [x] Obtain authorization for homepage (`/`) production integration

---

## Phase 4: Production Hero Promotion & Section 02 (Professional Introduction) — COMPLETE (superseded by Phase 4B)
- [x] Promote approved photographic parallax hero to production homepage (`app/page.tsx`)
- [x] Create dedicated production Hero component (`components/hero/hero.tsx`, `components/hero/hero.module.css`)
- [x] Wire robust, unbroken CTA routing: `Explore Projects` $\to$ `#selected-projects`, `Professional Profile` $\to$ `#profile`
- [x] Retain `/hero-lab` as an unlinked, noindex verification route
- [x] Extract and optimize authentic portrait of Er. Sadhuram Lamichhane from `Details.docx` (Canon EOS 250D DSLR at CSIS The University of Tokyo GNSS Workshop, Jan 2022) to `public/images/profile/sadhuram-gnss-workshop.webp`
- [x] Design and implement Section 02: Professional Introduction (`components/sections/professional-introduction.tsx`, `professional-introduction.module.css`)
- [x] Asymmetrical 12-column editorial grid on `#F2F1EC` paper background with sticky visual column
- [x] Authoritative copy answering *Who is Sadhuram? What kind of professional is he? What problems does he solve?*, strictly sourced from `Details.docx`
- [x] Curate 5 core practice disciplines with numbered monospace indices (`01`–`05`) and zero generic icons
- [x] Implement discrete verified credentials strip (NEC Reg. 221 Geomatics 'A', UNIGIS M.Sc. Salzburg with Distinction, UESC Head of Department)
- [x] Build automated test suite `tests/homepage-section-02.test.mjs` (7/7 tests passing)
- [x] Verify responsive behavior across desktop, tablet, and mobile (1440px down to 320px) with screenshots in `artifacts/homepage-review/section-02/`
- [x] Create comprehensive documentation `docs/16-PROFESSIONAL-INTRODUCTION.md`
- [x] Record decisions `D-038` and `D-039` in `docs/10-DECISIONS.md`
- [x] Implement true sticky section curtain reveal architecture (`D-040`)
- [ ] **STOP ENFORCED**: Do NOT begin Section 03 (Selected Projects) until explicitly instructed.

### Experimental: Video Hero Prototype (Geography in Motion, D-041)
- [x] Acquire and prepare authentic Nepal middle hills video assets (CC0 1.0 Universal)
- [x] Optimize video encoding with short keyframe interval (`gop=6`) for instant seek response (`nepal-landscape.mp4`, `nepal-landscape-mobile.mp4`, `nepal-landscape.webm`)
- [x] Generate pixel-aligned foreground landscape cutout (`foreground.webp`, `foreground-mobile.webp`)
- [x] Generate desktop and mobile poster images (`poster.webp`, `poster-mobile.webp`)
- [x] Implement isolated prototype route `/hero-video-lab` (`app/hero-video-lab/page.tsx`) with `noindex`
- [x] Implement `components/hero-video/video-hero.tsx` and `video-hero.module.css` with native scroll + ScrollTrigger
- [x] Verify zero scroll hijacking (no `position: fixed` on body, no `wheel`/`touchmove` `preventDefault()`)
- [x] Verify zero duplicate Lenis instances (integrates with centralized `SmoothScrollProvider`)
- [x] Implement initial typographic statement and quiet scroll cue
- [x] Implement subtle Copernicus DEM contour emergence draped over terrain ($p = 0.35 \to 0.72$)
- [x] Implement large architectural name reveal `SADHURAM LAMICHHANE` ($p = 0.68 \to 0.90$) occluded by foreground cutout ($z: 7$)
- [x] Implement seamless paper release into `#F2F1EC` test editorial practice section ($p = 0.88 \to 1.00$)
- [x] Implement mobile fallback (natural document flow, static composition, < 150 KB payload)
- [x] Implement reduced-motion fallback (static poster, zero scroll scrubbing, full semantic accessibility)
- [x] Build automated test suite `tests/hero-video-lab.test.mjs` (10/10 tests passing)
- [x] Capture visual review screenshots across 1440px, 1024px, 820px, 768px, 390px, 320px in `artifacts/hero-video-lab-review/`
- [x] Write evaluation documentation `docs/17-VIDEO-HERO-PROTOTYPE.md`
- [x] Perform structured comparative analysis against current approved photographic hero

---

## Phase 4B: Video Hero Promotion & Section 02 Rebuild (Profile + Engineering Practice) — COMPLETE

### Video hero
- [x] Approved (`D-042`)
- [x] Production promotion — prototype test stub removed, lab badge removed, navigation bound to real anchors only
- [x] Root integration — `/` renders `components/hero-video/video-hero.tsx`; `/hero-video-lab` renders the same component, no forked copy
- [x] Hero direction frozen — production bug fixes only
- [x] `/hero-lab` retained, noindex, unlinked, relabelled as the previous photographic hero reference (`D-043`)
- [x] Homepage metadata set to "Sadhuram Lamichhane | Geomatics Engineer & GIS Expert" (absolute title, no template duplication)

### Section 02 — Profile / Engineering Practice
- [x] Content verification against `Details.docx` (tables + 34-row experience log)
- [x] Practice taxonomy fixed at four areas, terminology checked against the source (`docs/18-ENGINEERING-PRACTICE.md` §3)
- [x] Image inventory of all 17 embedded `Details.docx` images with context mapping and provenance table
- [x] Part A: quiet Profile introduction (`#profile`) — kicker, title, statement, 78-word verified introduction, one verified portrait
- [x] Part B: finite desktop practice sequence (`#engineering-practice`) — CSS sticky stage + single ScrollTrigger, no hijacking
- [x] Tablet: vertical editorial flow (no forced pinning under 1024px)
- [x] Mobile: natural vertical stacking, 320px clean
- [x] Reduced motion: plain stack, all four images and descriptions visible, no ScrollTrigger created
- [x] Accessibility: heading hierarchy, semantic list, alt text, provenance captions, resolving anchors
- [x] Performance: WebP `srcset` 1600w/820w, lazy loading for practices 02–04, transform-only motion
- [x] Screenshot review at 1920/1440/1280/1024/820/768/430/390/375/320 plus full-page rhythm capture (`artifacts/homepage-review/engineering-practice/`)
- [x] Tests extended (`tests/homepage-section-02.test.mjs`, 16/16 across the suite)
- [x] Documentation `docs/18-ENGINEERING-PRACTICE.md`; decisions `D-042`–`D-047`
- [ ] **Content request to Er. Lamichhane**: a genuine land use zoning map sheet for practice 02
- [ ] **Content request to Er. Lamichhane**: a genuine UAV orthomosaic / DSM output for practice 04
- [ ] **STOP ENFORCED**: Do NOT begin Section 03 (Selected Projects) until explicitly instructed.

---

## Phase 5: Homepage Section 03 (Selected Projects) — AWAITING AUTHORIZATION
- [ ] Full-viewport section prototype (`100svh` spatial frame)
- [ ] Depth / dive transition prototype (coordinated camera and layer expansion)
- [ ] Pin/release prototype (smooth entry and release without spacer voids)
- [ ] Horizontal project sequence prototype (vertical scroll driving horizontal track)
- [ ] Mobile vertical fallback prototype (converting horizontal track to vertical stack)
- [ ] Sticky footer reveal prototype (`100svh` contact conclusion)
- [ ] Route-change scrolling test (verifying instantaneous top reset)
- [ ] Anchor navigation test (smooth scroll to target with offset)

---

## Phase 5: Design System & Layout Primitives
- [ ] Build reusable layout primitives (`Container`, `Section`, `Grid`, `Header`, `Footer`)
- [ ] Implement editorial typography components (`Eyebrow`, `DisplayHeading`, `BodyText`, `MetadataLabel`)
- [ ] Build cartographic UI elements (coordinate tags, scale bar indicator, project badges)
- [ ] Create accessible button primitives (solid primary CTA, subtle border secondary CTA)

---

## Phase 6: Content Extraction & Editorial Sections
- [ ] Extract and verify structured career data from `Details.docx`
- [ ] Section 02: Professional Positioning Statement & Core Philosophy
- [ ] Section 03: Core Pillars of Expertise (Interactive GIS / Geomatics domain explorer)
- [ ] Section 04: Curated Selected Projects (In-depth case studies with maps and technical specs)
- [ ] Section 05: Geographic Footprint (Interactive map of work across Nepal)
- [ ] Section 06: Leadership & Experience Timeline
- [ ] Section 07: Research, Publications & Technical Papers
- [ ] Section 08: Teaching, Field Trainings & Capacity Building
- [ ] Section 09: Contact & Advisory Engagement Form
- [ ] Section 10: Technical Colophon & Geospatial Footer

---

## Phase 7: Polish, Performance & Production Launch
- [ ] Mobile & tablet layout verification across all viewports (320px to 1440px)
- [ ] Lighthouse audit (Target 95+ across Performance, Accessibility, Best Practices, SEO)
- [ ] WebGL resource audit (draw calls, vertex count, memory disposal)
- [ ] Full accessibility audit (screen reader flow, keyboard navigation, contrast)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge, mobile browsers)

## Section 02 compact revision (current; supersedes Phase 4B sequence)
- [x] Replace rejected four-image scroller with compact practice index.
- [x] Remove portrait, per-practice descriptions, client animation logic and obsolete CSS modules.
- [x] Align heading, introduction and practice index to one responsive container.
- [x] Preserve approved hero and shared scroll architecture.
- [x] Production build and 10 Node tests pass.
- [ ] User visual approval of compact Section 02.
- [ ] Formal Impeccable final critique.
- [ ] Later homepage sections remain unauthorized.
- [x] Compact screenshot QA at all ten widths, plus full-page and reduced-motion captures.
