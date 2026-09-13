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
