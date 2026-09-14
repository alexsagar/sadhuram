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
