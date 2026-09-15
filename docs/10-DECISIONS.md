# Architecture & Design Decisions Log

This document records formal architectural, engineering, and visual decisions made for the Er. Sadhuram Lamichhane portfolio.

---

### D-001: Full-Width Immersive Hero
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: The hero section will occupy the full viewport (`min-height: 100svh`) as an edge-to-edge spatial environment rather than being placed in a card, container, or right-side column.
- **Rationale**: Immediate immersion in a spatial environment establishes authoritative professional identity as a GIS & Geomatics leader.

### D-002: Hero Concept — "Spatial Layers in Motion"
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: The 3D scene visualizes terrain elevation (DEM/DTM), topographic contour lines, parcel boundaries, survey benchmarks, and geodetic grids resolving systematically from data into landscape.
- **Rationale**: Connects directly to the subject matter of Geomatics and Remote Sensing rather than relying on abstract decoration.

### D-003: 3D Engine — React Three Fiber (Three.js)
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Use Three.js via `@react-three/fiber` and selective `@react-three/drei` utilities.
- **Rationale**: Standard React-compatible declarative WebGL rendering, mature ecosystem, predictable lifecycle management.

### D-004: Motion Engine — GSAP & ScrollTrigger
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: GSAP is the primary timeline and scroll animation system.
- **Rationale**: Unmatched timeline control, sub-pixel precision, reliable scroll synchronization, and robust reduced-motion support.

### D-005: Visual Direction — Geospatial Editorial
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: The aesthetic balances engineering precision, Swiss editorial composition, cartographic conventions, and scientific authority.
- **Rationale**: Positions the professional as a senior technical authority rather than a web developer or commercial SaaS product.

### D-006: Prohibition of Generic AI/SaaS Patterns
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Prohibit glowing AI orbs, particle vortexes, spinning globes, crypto cyberpunk themes, bento grids with arbitrary icons, and generic landing page tropes.
- **Rationale**: Generic patterns erode professional credibility with government, municipal, and institutional clients.

### D-007: Native Browser Scrolling Exclusivity
- **Date**: 2026-09-13
- **Status**: CANCELLED / SUPERSEDED by D-009
- **Decision**: The previous restriction deferring Lenis has been cancelled. Smooth scrolling is approved as part of core motion architecture.

### D-008: Single Art-Directed Theme
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: The website uses a unified, intentional light/editorial visual system (with a deeper spatial hero transitioning naturally into editorial light) rather than a user-selectable dark/light toggle.
- **Rationale**: Portfolios of this nature benefit from an authoritative, curated identity without dual-palette compromises.

### D-009: Lenis Smooth Scrolling Foundation
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Lenis (`lenis@^1.3.x`) will provide the site's smooth scrolling foundation, synchronized centrally with GSAP ScrollTrigger and the GSAP ticker.
- **Rationale**: The portfolio contains carefully controlled immersive spatial transitions and layer revelations that benefit from consistent scroll interpolation.

### D-010: Full-Viewport Pinned Storytelling for Major Sections
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Selected major storytelling sections (e.g. Hero, key spatial case studies) may occupy `100svh` and use controlled pinning to drive multi-layer spatial revelations.
- **Rationale**: Allows the user to experience moving *through* geographic data without breaking natural document flow between sections.

### D-011: Vertical-Scroll-Driven Horizontal Storytelling
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: At least one appropriate content sequence will use vertical-scroll-driven horizontal storytelling on desktop. The primary candidate is the **Selected Projects** showcase.
- **Rationale**: Horizontal frame sequences provide panoramic scale and editorial breathing room suited for cartographic maps, orthomosaics, and terrain profiles.

### D-012: Horizontal-to-Vertical Transformation on Mobile
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Horizontal pinned storytelling tracks will automatically convert to clean, natural vertical editorial stacks on mobile screens (`< 768px`).
- **Rationale**: Mobile screens should not force awkward horizontal scrubbing; usability and natural touch ergonomics supersede desktop choreography.

### D-013: Closing Contact/Footer Full-Viewport Sticky Reveal
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: The closing contact and footer section will occupy `min-height: 100svh` and utilize a sticky/reveal transition where preceding editorial content unmasks the deep spatial footer layer beneath it.
- **Rationale**: Creates an authoritative, architectural conclusion to the portfolio narrative.

### D-014: Native CSS Sticky Precedence Over JavaScript
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Native CSS `position: sticky` is preferred over JavaScript/ScrollTrigger pinning wherever the layout requirement can be reliably fulfilled by the browser engine.
- **Rationale**: Preserves maximum compositor performance, zero script overhead, and native accessibility.

### D-015: Typography Selection — Geist & Geist Mono
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Use `next/font/google` with Geist for primary UI/editorial text and Geist Mono for coordinates, scale metrics, and technical metadata.
- **Rationale**: Exceptional engineering legibility, neutral Swiss aesthetic, optical sizing, and zero cumulative layout shift (CLS).

### D-016: Semantic Token Architecture
- **Date**: 2026-09-13
- **Status**: Approved
- **Decision**: Colors, spacing, and typography are defined as semantic CSS custom properties in `globals.css` (`--background`, `--surface`, `--foreground`, `--accent`, `--border`, etc.). Raw hex values are prohibited in component code.
- **Rationale**: Enforces visual coherence and allows systematic refinements.

### D-017: Phase 2 Scope and Terrain-to-Analysis Narrative
- **Date**: 2026-09-13
- **Status**: Approved by the Phase 2 user brief
- **Decision**: Art-direct the full-viewport hero before production implementation. Its scroll narrative proceeds from oblique physical terrain toward analytical cartography and a calm, unpinned editorial introduction. No Phase 3 implementation without separate approval.
- **Rationale**: Preserve spatial continuity and make motion explain geospatial practice.

### D-018: Hero Identity and Content Integrity
- **Date**: 2026-09-13
- **Status**: Approved by the Phase 2 user brief
- **Decision**: Present Sadhuram Lamichhane as Geomatics Engineer & GIS Expert, engineering first. Primary action is Explore Projects; secondary is Download CV when a verified public asset exists. Do not invent project analysis, parcels or survey observations.
- **Rationale**: The scene must support an accurate professional identity.

### D-019: Responsive and Reduced-Motion Hero Integrity
- **Date**: 2026-09-13
- **Status**: Approved by the Phase 2 user brief
- **Decision**: Design mobile independently and reduced motion as a finished readable static composition. Keep essential content in HTML. Continuous scroll animation updates refs, camera/object properties and uniforms, never a React setState loop.
- **Rationale**: Preserve accessibility, performance and spatial clarity across capabilities.

### D-020: Cartographic Neutral / Engineering Editorial
- **Status**: Approved by user correction before Phase 3
- **Decision**: Refines D-005 and replaces the former broad green palette with neutral cartographic paper and ink, graphite hero surfaces and grey-green terrain only inside GIS visualization. Gold is removed. No luxury green/gold, eco-tech, gradient-heavy, neon or rainbow treatment.
- **Tokens**: Paper #F2F1EC; secondary paper #E8E7E1; ink #171B19; secondary ink #5F6561; graphite #121715 / #1B211E; terrain #323C36 / #66746C; contours #B6BDB8 / #6E7771; technical accent #5C7480; optional meaningful earth/boundary #9A7658. Values remain adjustable after testing, not immutable.

### D-021: Preferred Prototype Copy and Spatial Scope
- **Status**: Approved by user correction before Phase 3
- **Decision**: Sadhuram Lamichhane; Geomatics Engineer & GIS Expert. Preferred Phase 3 headline: "Geospatial analysis for land, infrastructure and planning." This is prototype copy, not final locked marketing copy.
- **Layers**: Real Nepal-derived terrain strategy, terrain plus contours, gradual planimetric transition, conditional cadastral/parcel layer and sparse survey/reference points are approved. Provenance requirements remain. Drainage-divide/hydrology is not approved by default and needs later composition/project justification and approval.

### D-022: Mobile and Motion Lifecycle Correction
- **Status**: Approved by user correction before Phase 3
- **Decision**: Static/simplified mobile-first scene; never reproduce full desktop camera choreography on mobile. Correct live reduced-motion changes in both directions, preserve scroll position and avoid duplicate instances/callbacks/listeners before hero integration.
- **Scope**: Correction pass only. No hero prototype or Phase 3 start.

### Remaining prototype validation
- Exact crop/source terms, supporting copy/public CV verification, numeric camera/contour/scroll calibration, rendered contrast and performance remain open. D-020 supersedes prior broad-green styling; D-021 replaces the earlier headline and drainage-overlay recommendation. Other approved architecture remains intact.

### D-023: Isolated Hero Lab Prototype
- **Status**: Validated as an isolated Phase 3 prototype (superseded by D-024/D-025)
- **Decision**: Prototype `/hero-lab` may use the Copernicus GLO-30 derived 10 km crop, terrain height bands, one PerspectiveCamera and a simple paper handoff. It remains noindex and is excluded from `/`, navigation and production flows.
- **Rationale**: Enables composition and technical validation without prematurely coupling the experimental scene to the production homepage.

### D-024: Rejection of Synthetic 3D Rock Mesh as Primary Hero
- **Status**: Approved / Superseded direction
- **Decision**: The synthetic / rendered DEM hero was rejected as the primary hero visual after review because it read as a large 3D rock/object rather than convincing geography, GIS, or professional spatial analysis.
- **Disposition**: Archived in `artifacts/archive/hero-terrain-r3f/` for potential future non-hero GIS interactions. Not imported or compiled in production flows.

### D-025: Real Geographic Photography with Restrained Parallax
- **Status**: Approved
- **Decision**: Real geographic photography with restrained GSAP parallax is the primary physical-geography state of the homepage hero. The photographic base depicts the middle hills near Kavre, Nepal (CC0 1.0 Universal by Eagle Vision IT), pre-composited into depth planes.
- **Rationale**: Preserves authentic Himalayan landscape morphology, emotional connection, and visual dignity without synthetic 3D artifacts.

### D-026: Prohibition of Pseudo-GIS Graphics and Authenticity Mandate
- **Status**: Approved
- **Decision**: Any public-facing visual that presents itself as GIS/cartographic/survey information must come from verified spatial data or be explicitly non-data composition. Pseudo-contours derived from image tone/haze, arbitrary crosshairs/marks, fake survey points, and fake coordinate values are strictly prohibited.
- **Rationale**: Er. Sadhuram Lamichhane is a professional Geomatics Engineer; decorative simulation of spatial data undermines domain credibility and violates core design principles.

### D-027: Separation of Physical Geography and Analytical GIS Transitions
- **Status**: Approved
- **Decision**: The hero transition will separate physical geography from analytical geography: real photography first, verified GIS/cartographic information later. Contours will not be forced directly onto photography unless derived from verified geospatial data for the identical location. The hero prototype provides a clean architectural slot for future verified GIS data handoff.

### D-028: Copernicus DEM GLO-30 Public as Verified Regional Elevation Dataset
- **Status**: Approved (Phase 3B)
- **Decision**: Selected the Copernicus DEM GLO-30 Public (AWS 2021 release) tile `Copernicus_DSM_COG_10_N27_00_E085_00_DEM` for the analytical handoff. Extracted a 10 km × 10 km bounding box centered at 27.68°N, 85.49°E (Kavrepalanchok District middle hills, Bagmati Province, Nepal), projected in EPSG:32645 (UTM Zone 45N) with vertical datum EGM2008. Elevation ranges from 1,254.6 m to 2,155.0 m (relief: 900.4 m).
- **Rationale**: High-quality, public-domain scientific elevation dataset with authentic Nepalese middle hill topography, directly accessible and verifiable under European Union / ESA Copernicus WorldDEM-30 terms.

### D-029: SVG Vector Contours with WebP Analytical Shaded Relief for Cartographic Handoff
- **Status**: Approved (Phase 3B)
- **Decision**: Implemented the cartographic analytical layer using precomputed vector SVG contours (`contours.svg` at 50 m minor / 200 m index; `contours-mobile.svg` at 100 m) layered over a lightweight analytical Lambertian shaded relief image (`hillshade.webp`, solar azimuth 315° NW, altitude 45°).
- **Rationale**: Avoids heavy client-side GeoTIFF parsing or WebGL overhead. Yields razor-sharp typography and linework, integrates directly with CSS custom properties (`--contour`, `--contour-ink`, `--background`), and delivers total incremental transfer of 111.5 KB on desktop and 62.0 KB on mobile (well within 150 KB / 75 KB budgets).

### D-030: Regional Handoff Classification (Unregistered Authentic Transition)
- **Status**: Approved (Phase 3B)
- **Decision**: Classified the relationship between the photograph and the DEM contours as `REGIONAL`. The DEM covers the verified broader area of Kavrepalanchok middle hills but is not artificially or falsely registered to the camera's perspective angle. The analytical layer is presented on an Engineering Editorial cartographic specimen sheet with neatline ticks, graphic scale bar, and technical metadata.
- **Rationale**: Honest cartographic practice. Eliminates any misleading claim of camera registration while providing authentic spatial evidence of the regional geomorphology.

### D-031: Mobile Document Flow Strategy with 100m Contour Optimization
- **Status**: Approved (Phase 3B) / Superseded for hero by D-032
- **Decision**: On mobile viewports (`< 768px`), the hero experience avoids scroll pinning and multi-screen travel. Instead, the analytical cartographic sheet was rendered in natural document flow beneath the hero header with 100 m contour intervals.
- **Rationale**: Validated lightweight mobile vector rendering before the standalone hero cartographic handoff was superseded by D-032.

### D-032: Removal of Standalone Verified GIS/Cartographic Hero Handoff
- **Status**: Approved
- **Decision**: The standalone verified GIS / cartographic analytical handoff (topographic specimen sheet, DEM contour overlay, analytical hillshade, and technical map metadata) is removed from the public portfolio hero. The verified Copernicus DEM GLO-30 assets and generator scripts are archived in `artifacts/archive/gis-handoff-experiment/`.
- **Rationale**: The hero has one job: introduce Er. Sadhuram Lamichhane clearly and memorably. The standalone cartographic specimen added an artificial technical demonstration that interrupted the visitor's introduction to the engineer, making the hero feel like a technical report rather than a professional personal portfolio.

### D-033: Contextual Presentation of GIS Visual Evidence
- **Status**: Approved
- **Decision**: GIS visual evidence will be communicated contextually through real project work (project case studies, verified survey maps, UAV/LiDAR plans, municipal land-use models, hazard analyses, publications) and regional footprint maps, rather than through decorative or standalone hero demonstrations.
- **Rationale**: Demonstrates geomatics engineering authority through actual problem-solving and client outcomes rather than decorative interface widgets. Avoids "vibe-coding" and maintains strict domain credibility.

### D-034: Direct Hero-to-Editorial Portfolio Transition
- **Status**: Approved
- **Decision**: The hero now transitions directly and smoothly from real Himalayan landscape photography with restrained parallax into the editorial portfolio on `#F2F1EC` paper background. Desktop travel is simplified from 180svh to 150svh (and 135svh on tablet) to provide a natural, unhurried progression without holding the visitor in the hero longer than necessary.
- **Rationale**: Creates an elegant, calm, and dignified entrance that releases smoothly into the professional practice content.

### D-035: Topographic Contour Linework as Restrained Hero Geospatial Motif
- **Status**: Approved
- **Decision**: Rather than a separate technical GIS handoff panel, specimen sheet, or map viewer, subtle topographic contour lines are integrated directly into the physical-geography hero experience as a restrained visual geospatial motif. Sourced from verified Copernicus DEM GLO-30 regional elevation data for Kavrepalanchok, Bagmati Province, the vector linework is stripped of all numeric labels, coordinates, and scale bars, and draped across the middle-hill terrain relief via vertical gradient masking that leaves the upper sky and headline text completely clear.
- **Rationale**: Satisfies the desire for authentic geospatial identity and cartographic atmospheric feeling within the opening hero without re-introducing an intrusive separate report screen, fake pseudo-GIS graphics, or readability issues for the primary typography.

### D-036: Scroll-Responsive Contour Lifecycle (Fade-In / Fade-Out Curve)
- **Status**: Approved
- **Decision**: The topographic contour linework is animated strictly across a defined four-phase scroll lifecycle:
  1. `0% – 20%`: Initial hero state (real landscape photography dominant, contour lines invisible, opacity 0.0).
  2. `20% – 55%`: Lines gradually fade in over the terrain relief as the user initiates scroll exploration.
  3. `55% – 80%`: Lines reach peak subtle presence (capped at 0.35 opacity, synchronized with terrain parallax travel at -4.2% travel).
  4. `80% – 98%`: Lines fade out smoothly before the editorial portfolio (`#F2F1EC`) paper transition completes.
  On mobile viewports (`< 768px`), a static subtle watermark presence (opacity 0.16) is used without JS scrub. Under `prefers-reduced-motion: reduce`, a static subtle opacity (0.22) is used with zero motion or scroll scrub.
- **Rationale**: Guarantees a pristine initial landing impression, preserves high text contrast (> 9:1) in the upper sky, introduces domain identity during downward exploration, and releases cleanly into the editorial body.

### D-037: Contour Depth-Draping, Desktop Mouse Micro-Depth, and Minimal Scroll Invitation
- **Status**: Approved
- **Decision**: Refined the active photographic parallax hero with three targeted polish enhancements:
  1. **Contour Depth-Draping**: Positioned the contour layer at `z-index: 5` (between `.terrain` at `z:4` and `.foreground` at `z:6`), allowing foreground trees and terraced ridges to physically occlude the linework.
  2. **Subtle Mouse Micro-Depth**: Enabled a barely perceptible, damped cursor-tracking offset on desktop (max 1px backdrop, 2.5px ridge, 5px terrain/contours, 8px foreground) that fades out completely over the first 12% of scroll.
  3. **Minimal Scroll Invitation**: Placed a quiet, non-intrusive indicator ("Scroll to explore" with a 20px hairline) centered at the bottom of the hero, fading out as scroll travel begins ($p=0.00$ to $0.12$).
  4. **Strict Exclusion of Technical Clutter**: Explicitly rejected neatline ticks, margin coordinates, geodetic datum stamps, and complex mastheads in the hero to prevent the design from regressing into an artificial GIS demonstration.
- **Rationale**: Elevates the hero to an architectural, spatial editorial standard while preserving pristine typography, visual breathing room, and zero clutter.

### D-038: Production Hero Promotion & Component Architecture
- **Status**: Approved
- **Decision**: Promoted the frozen photographic parallax hero from `/hero-lab` to the production homepage (`app/page.tsx`) as a dedicated, reusable component (`components/hero/hero.tsx` and `components/hero/hero.module.css`). The laboratory route `/hero-lab` remains available as an unlinked, no-index testbed. CTA navigation links are wired safely: `Explore Projects` binds to `#selected-projects` (an anchor marker preceding Section 03), and `Professional Profile` binds directly to `#profile` (Section 02).
- **Rationale**: Establishes a clean, production-grade homepage foundation without breaking prototype regression tests or introducing dead-end links.

### D-039: Homepage Section 02 — Professional Introduction Architecture, Authentic Imagery & Editorial Typography
- **Status**: Approved
- **Decision**: Designed and implemented Homepage Section 02 (`components/sections/professional-introduction.tsx`) as an asymmetrical 12-column editorial grid on `#F2F1EC` paper background. Text follows a calm, monograph-style editorial voice answering *Who is Sadhuram? What kind of professional is he? What problems does he solve?*, strictly sourced from `Details.docx`. Features:
  1. Approved headline: *"Geomatics engineering grounded in real places and real decisions."*
  2. Exactly 2 narrative paragraphs synthesizing his legal licensure, academic leadership at UESC, and municipal/governmental planning practice.
  3. Curated list of 5 core practice disciplines with numbered monospace indices (`01`–`05`), with zero decorative icon grids.
  4. Genuine rectangular portrait photograph extracted from `Details.docx` (Canon EOS 250D DSLR at the CSIS The University of Tokyo / CSSGS Tribhuvan University GNSS Workshop, Jan 2022) with factual caption and sticky desktop alignment.
  5. Discrete verified credentials strip (NEC Reg. 221 Geomatics 'A', UNIGIS M.Sc. Distinction, UESC Head of Department).
- **Rationale**: Provides high editorial contrast following the immersive hero, projecting unshakeable professional credibility and scientific rigor without trendy cards, bento boxes, or fabricated statistics.

### D-040: True Sticky Hero Section & Curtain Reveal Transition
- **Status**: Approved
- **Decision**: Architected the homepage hero and Section 02 transition as a true sticky section curtain reveal:
  1. The Hero root container (`.heroRoot`) is assigned `position: sticky; top: 0; height: 100svh; z-index: 1; overflow: hidden;` on desktop and tablet viewports.
  2. Section 02 (`.section`) sits immediately following the hero in normal document flow (`position: relative; z-index: 2; margin-top: 0; background-color: var(--background); border-top: 1px solid var(--border-subtle);`).
  3. All arbitrary negative margins (`margin-top: -100svh`) and container-level opacity hides (`gsap.set(sectionRef, { opacity: 0 })`) are eliminated.
  4. At initial load ($scroll = 0$), the hero is 100% full-screen without occlusion.
  5. Upon scrolling, the hero remains anchored at `top: 0` while Section 02 smoothly glides up over it like an architectural paper sheet over a window. During this motion ($p = 0.0 \to 1.0$), the hero headline gracefully dissolves ($p = 0.08 \to 0.36$), Copernicus contour lines reveal across the midground terrain ($p = 0.10 \to 0.35$ and $0.48 \to 0.75$), and as Section 02 enters the viewport ($start: "top 75%"`), its kicker, headline, portrait, prose, disciplines, and credentials animate into position via a staggered GSAP reveal.
  6. Mobile viewports (`< 768px`) retain natural document flow (`position: relative; height: auto; min-height: 100svh;`) with zero height locks.
- **Rationale**: Completely eliminates the blank background scroll gap and prevents the hero from ever being cut in half horizontally during scroll-off, creating an authentic, seamless, and high-end editorial transition.

### D-041: Experimental Video Hero Evaluation (Geography in Motion)
- **Status**: EXPERIMENTAL / UNDER REVIEW
- **Decision**: A new scroll-scrub video hero is being evaluated at `/hero-video-lab` as an isolated experimental alternative to the approved photographic-parallax hero. It combines real Nepal middle hills cinematography (CC0 1.0 Universal) with keyframe-optimized video scrubbing, Copernicus DEM contour emergence, and a large architectural name reveal occluded by a pixel-aligned foreground landscape cutout. The current approved photographic hero remains active on `/` and `/hero-lab` pending comparative visual review.
- **Rationale**: Allows systematic evaluation of cinematic video scrub depth against photographic parallax without destabilizing the approved production baseline.


### D-042: Video Hero Approved and Promoted to the Production Homepage
- **Status**: APPROVED / PRODUCTION
- **Decision**: The scroll-driven video/window hero (`components/hero-video/video-hero.tsx`) is approved and is now the hero of `/`. The component is the single source of truth: `/` and the retained `/hero-video-lab` QA route both render it, with no forked copy of its markup or styles. Its art direction is unchanged by the promotion. Two production-plumbing edits were made and nothing else: the prototype "Minimal Test Editorial Section" stub was removed (Section 02 now occupies that space), and the navigation lost its "Sunset Lab" prototype badge and its links to unbuilt sections. Navigation now exposes only Profile (`#profile`), Practice (`#engineering-practice`) and Projects (`#selected-projects`), all of which resolve. Hero hrefs are props so the lab route can point back at `/#…`.
- **Rationale**: Production requires real anchors and no prototype scaffolding; keeping one component prevents the two routes from drifting apart. The hero is now FROZEN — only genuine production bugs may be fixed in it.

### D-043: Previous Photographic Hero Retained at /hero-lab as a Noindex Reference
- **Status**: Approved
- **Decision**: `/hero-lab` is retained, unmodified in art direction, as `robots: { index: false, follow: false }`, outside production navigation, and retitled "Hero Lab — Previous Photographic Hero (Reference)". `components/hero/hero.tsx` (the former production photographic hero) is likewise retained rather than deleted, though `/` no longer renders it.
- **Rationale**: Preserves design history for comparison. Archival or removal is a later, separate decision.

### D-044: Section 02 Is a Two-Part Structure
- **Status**: Approved
- **Decision**: Homepage Section 02 is split into Part A, a quiet Profile introduction (`#profile`, `components/sections/professional-introduction.tsx`), and Part B, a finite Engineering Practice visual sequence (`#engineering-practice`, `components/sections/engineering-practice.tsx`). Part A is deliberately almost motionless editorial type on paper with one verified portrait; Part B carries the evidence. The five-discipline typographic list documented in `docs/16-PROFESSIONAL-INTRODUCTION.md` (D-039) is superseded by the four-practice sequence documented in `docs/18-ENGINEERING-PRACTICE.md`.
- **Rationale**: The cinematic hero must be answered with calm before any second interactive moment. Page rhythm: hero → editorial breath → practice sequence → release toward Selected Projects.

### D-045: Reference Infinite Slider Adapted, Not Reproduced
- **Status**: Approved
- **Decision**: Only the editorial visual language of the supplied project-slider reference is adopted — large imagery, an active numbered item, an informational side rail, restrained internal image parallax. Its mechanics are explicitly rejected: no infinite loop, no duplicated or virtual indices, no thumbnail minimap (a typographic practice rail replaces it), no custom `targetY`/`MAX_VELOCITY`/snap engine, no extreme scale, blur, rotation or distortion. The sequence is finite: 01 → 04 → end.
- **Rationale**: The reference is a gallery toy; this is an engineering portfolio. A finite sequence with a clear end communicates a bounded practice, which is the actual message.

### D-046: Engineering Practice Uses the Existing Lenis + ScrollTrigger Architecture
- **Status**: Approved
- **Decision**: On desktop (`>= 1024px`, motion allowed), the practice stage is sticky via CSS `position: sticky` inside a `360svh` travel wrapper. State is read from a single `ScrollTrigger` (`id: "engineering-practice-sequence"`) — no `ScrollTrigger.pin`, no wheel/touch listeners, no `preventDefault`, no custom RAF loop, no second Lenis instance, no body scroll locking. Each segment holds still for its first 62 % and transitions over the remainder; internal image drift is capped at 12 %. Scrub was chosen over snap after testing both.
- **Rationale**: Preserves native scroll semantics and the single-owner scroll architecture defined in `docs/06-TECHNICAL-ARCHITECTURE.md`.

### D-047: Mobile and Tablet Use Natural Vertical Stacking
- **Status**: Approved
- **Decision**: Below 1024px — and at any width under `prefers-reduced-motion: reduce` — Section 02 Part B renders as a plain editorial stack (index → title → image → caption → rule → description) with no sticky stage and no scripted state. The sticky styles are gated inside `@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)`, and the script returns early in those conditions. One DOM serves both layouts via `display: contents`, so no markup or image payload is duplicated.
- **Rationale**: Zero scroll traps on touch, an honest reduced-motion fallback, and no second copy of the section to keep in sync.

### D-048: Compact profile replaces the four-image practice sequence
- **Status**: Implemented; awaiting visual approval.
- **Decision**: Following the user's rejection of the long four-image sequence, combine the professional introduction and practice index into one static Section 02. Four columns on desktop, two on tablet, four compact rows on mobile. No imagery or descriptions per practice; no sticky scroll duration or animation dependency.
- **Supersedes**: D-044's portrait and separate visual moment, D-045's slider adaptation, D-046's sticky sequence and D-047's image stack.
- **Rationale**: Reserve detailed visual evidence for future Selected Projects and keep the homepage introduction concise. Preserve the frozen hero, palette, authoritative source and existing anchors.
