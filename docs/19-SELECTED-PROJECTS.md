# 19. HOMEPAGE SECTION 03 — SELECTED PROJECTS

> **STATUS**: IMPLEMENTED
> **Route**: `/` (production)
> **Component**: `components/sections/selected-projects.tsx`
> **Anchors**: `#selected-projects`
> **Decisions**: `D-053`

---

## 1. Purpose
Section 03 provides the first major applied engineering evidence following the video hero and profile introduction. It showcases 5 verified, high-stakes infrastructure and geomatics projects undertaken by Er. Sadhuram Lamichhane.

## 2. Source Content (`Details.docx`)
All projects are extracted directly from Table 1 of `Details.docx`:
1. **Dudhkoshi Reservoir Rim Risk Register (2026)**: Ongoing reservoir rim community exposure modeling and landslide hazard assessment using aerial LiDAR in coordination with BGC Engineering, ADB, and DKJVCL.
2. **Narayanghat–Mugling Highway (NH44) Slope Stabilization (2026)**: Team Leader for UAV/drone survey, 3D point cloud generation, and volumetric cut/fill estimation at Tuin Khola and Namsi Khola for Road Division Bharatpur (DoR).
3. **National EV Public Charging Infrastructure Master Plan (2024–2025)**: GIS specialist conducting national highway network multi-criteria evaluation (MCE) for Water & Energy Commission Secretariat (WECS).
4. **Bagmati River Basin Improvement Project (BRBIP) (2024–2025)**: Geomatics engineer for design supervision and cadastral boundary superimposition with ADB and HPCIDBC.
5. **Risk-Sensitive Land Use Plan & Municipal Zoning (2026)**: Team Leader directing statutory parcel-level (kitta-wise) zoning under Nepal's Land Use Act 2076 in Gaumul (Bajura) and Purchaudi (Baitadi).

## 3. Layout & Desktop Interaction
- **Desktop (>= 1024px, motion enabled)**: Vertical scroll drives horizontal translation of project frames using GSAP ScrollTrigger and the centralized Lenis instance. The section pins while each project frame (580px wide) glides smoothly across the viewport, ending with a release into normal document flow.
- **Mobile (< 1024px) / Reduced Motion**: Pinned horizontal scroll is disabled. Content renders as a clean vertical editorial stack with responsive 16:10 imagery and zero horizontal overflow.

## 4. Accessibility & Performance
- Semantic `<article>` tags, `<header>`, `<h2>`, and `<h3>`.
- Next/Image responsive image sizing.
- Pure GSAP context with automatic cleanup on unmount (`ctx.revert()`).
