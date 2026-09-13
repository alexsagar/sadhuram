# Project Roadmap & Task System

## Phase 1: Foundation (CURRENT)
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

## Phase 2: Hero Art Direction (UPCOMING - AWAITING APPROVAL)
- [ ] Research spatial visual language and authentic Nepali terrain elevation profiles
- [ ] Art-direct elevation mesh topology, contour intervals, and line weight hierarchy
- [ ] Establish exact color grading between 3D terrain and light editorial background
- [ ] Determine elevation data strategy (procedural heightmap vs. real DEM of Himalayan ridge)
- [ ] Define precise spatial camera framing, lens focal length, and lighting rig

---

## Phase 3: Hero Prototype & Spatial Choreography
- [ ] Implement isolated client-side R3F Canvas with progressive fallback
- [ ] Build terrain mesh component (`terrain.tsx`)
- [ ] Implement topographic contour shader or vector line overlay (`contours.tsx`)
- [ ] Implement coordinate graticules and geodetic survey benchmark markers (`survey-points.tsx`)
- [ ] Build camera rig and GSAP timeline entry orchestration
- [ ] Implement scroll-driven transition from 3D terrain to 2D editorial interface
- [ ] Implement reduced-motion static fallback and mobile GPU performance clamping

---

## Phase 4: Motion Prototypes & Scroll Storytelling
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
