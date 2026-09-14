# Hero Direction: Spatial Layers in Motion

Status: Updated 2026-09-14 under approved decisions D-024 through D-027. Direction: CARTOGRAPHIC NEUTRAL / ENGINEERING EDITORIAL. The synthetic 3D rock DEM mesh was rejected as the primary hero (D-024); authentic geographic photography with restrained GSAP parallax is the approved physical-geography hero (D-025). Pseudo-contours and unverified marks are prohibited (D-026); physical photography is cleanly separated from future analytical GIS transitions (D-027). See [14-HERO-PROTOTYPE.md](14-HERO-PROTOTYPE.md) for live prototype architecture.

## 1. Hero concept

One full-width spatial environment explains physical terrain → spatial data → analysis → decision. The same valley/ridge system becomes increasingly readable as cartography. Decision is communicated through professional positioning and project evidence, never a fabricated analytical result. Minimum height 100svh; no object card, separate right column, scenic mountain or dashboard.

## 2. Visual composition

Terrain crosses the entire lower frame and extends beyond both side edges. Its broad highest ridge sits right of center; a lower valley leaves upper-left negative space for typography. Terrain occupies approximately 60–70% of the frame, including dark relief below text. No visible rectangular DEM tile or ornamental background gradient.

## 3. Terrain specification

Recommend a real elevation-derived Nepal mid-hill crop approximately 8–12 km across, with connected rounded ridges and a broad valley. Begin source evaluation with SRTM 1 Arc-Second Global. Preserve drainage and relative relief; start at true vertical scale, with at most 1.2× exaggeration if justified. Exact crop and source terms remain pending. No national outline, satellite texture, random noise or dramatic alpine peak. No DEM files downloaded in Phase 2.

## 4. Camera specification

One PerspectiveCamera throughout: start 38–45° above horizontal, vertical FOV 32–38°. A short approach precedes an overhead arc toward 78–82°. Narrow FOV to 22–26° with compensating distance to avoid accidental zoom. Fixed bearing, zero roll, stable target. This is an orthographic-like editorial view, not a metric plan projection or a camera-type switch.

## 5. Contour specification

Recommend derivative-antialiased height bands in the terrain material, based on immutable source elevation in metres. Test 50 m interval with every fifth contour indexed; use 100 m if density demands it. Select one interval per published composition, not continuously changing intervals. Intermediate lines approximately 0.7–1 CSS px, index 1.2–1.5 px. Strengthen opacity during analysis; suppress unresolved fine bands to avoid moiré. Validate against offline isolines.

## 6. Spatial layers

Approved hierarchy: real Nepal-derived terrain, contours, conditional cadastral/parcel geometry and sparse survey/reference points. Parcels require licensed matching georeferenced data; otherwise omit. Three to five elevation samples must not be called measured survey control. Gradual planimetric transition remains approved. No drainage-divide or hydrology overlay by default; add only after later composition/project justification and approval. Zero decorative particles, fake coordinates or random polygons.

## 7. Typography composition

Retain Geist and Geist Mono for actual technical metadata. Reading order: Sadhuram Lamichhane; Geomatics Engineer & GIS Expert; positioning headline; short support; actions. Preferred Phase 3 prototype headline (not final locked marketing copy): “Geospatial analysis for land, infrastructure and planning.” Name 24–32 px on desktop; headline 56–76 px at 1440 × 900, measure 12–17ch. Supporting text 17–19 px, 38–48ch. Title-case identity, normal tracking; no redundant uppercase eyebrow or colored headline word.

Primary “Explore Projects”; secondary text link “Download CV”. Navigation directly over the hero: About, Projects, Experience, Research, Training, Contact. Supporting copy remains explicitly pending Details.docx verification. No public CV link until a verified public asset exists.

## 8. Palette

Keep existing tokens: environment #121715, terrain shadow #1B211E, midtones #323C36 and #66746C, main text #F2F1EC, secondary text #B6BDB8. Contour pigments #B6BDB8 / #6E7771 are supplemental linework only. Secondary paper #E8E7E1, secondary ink #5F6561, technical accent #5C7480 and optional meaningful boundary accent #9A7658 complete the palette. Green is confined to visualization; gold and broad green backgrounds are removed. Handoff reaches existing paper #F2F1EC and ink #171B19. Use the technical accent sparingly. Semantic tokens live in globals.css and are updated in this correction pass.

## 9. Lighting

One directional key from upper-left/front with ambient fill, aiming at roughly 2:1 lit/shaded balance. Smooth normals, matte terrain, readable slopes. No shadow maps by default, HDR environment, bloom, SSAO, specular spectacle or moving lights. Reduce directional contrast as the scene becomes cartographic.

## 10. Initial animation

0–0.40 s environment/static relief available; 0.30–1.10 terrain gains prominence; 0.60–1.30 contours resolve; 0.90–1.50 optional references; 1.00–1.70 identity emphasis; 1.20–1.95 headline settles; 1.45–2.15 support; 1.70–2.35 actions settle. HTML remains readable and actionable from first paint. These timings control subtle emphasis and ≤12 px whole-block movement, not delayed content availability. No uplift from a flat slab, per-word stagger, spring or bounce. Late WebGL readiness skips missed stages.

## 11. Ambient behavior

Stillness after 2.35 seconds. No drift required. Render on demand when neither input nor timeline changes the scene.

## 12. Pointer behavior

Optional fine-pointer, hover-capable desktop only: horizontal offset ≤0.6°, vertical ≤0.3°, settling over 200–300 ms. Fade influence out over first 15% of scroll. One rig combines offsets; pointer never rotates terrain. No OrbitControls, dragging or custom cursor.

## 13. Scroll transformation

A departure 0–20%; B approach 20–45%; C analytical resolution 45–80%; D editorial handoff 80–100%. Desktop: visible 100svh plus 100–140svh travel, initial test 120svh. CSS sticky takes precedence. No snap, forced dwell or extra pin spacer on an already sized sticky wrapper. Scroll/anchors preempt entrance immediately.

## 14. Handoff

Copy exits before background lightens. Shading softens, relief flattens visually while source-height contours retain their levels. Line pigment becomes editorial ink as environment reaches paper. The same canvas remains briefly behind the incoming normal-flow introduction, then fades/releases. No black cut, mismatched contour imitation or immediately following pin.

## 15. Desktop

Primary artboard 1440 × 900; conceptually check 1920 × 1080, 1280 × 800 and 1024 × 768. Framing responds to aspect ratio with a protected reading zone. Collapse navigation into a plain accessible menu when it no longer fits. Preserve content height at zoom.

## 16. Tablet

768–1023 px: 32 px gutters; text above terrain spanning lower 55–65%. Fewer contours, no parcels/grid by default, conditional parcel/reference geometry. Camera approximately 50–70° above horizontal; additional travel 50–70svh. Touch-primary gets no pointer response. Natural flow if text exceeds viewport height.

## 17. Mobile

Intentional upper text/lower relief composition. Terrain targets lower 55–65% only when content fits; hero may exceed 100svh. Headline 32–44 px, body 16–18 px, gutters 20–24 px (16 at 320 px width). No pin, tiny desktop nav, labels or parcel complexity. Approved mobile-first choice: separately framed static/simplified relief; do not reproduce desktop camera choreography. Optional low-cost WebGL requires device evidence. At most a short normal-scroll contour crossfade.

## 18. Reduced motion

Finished static oblique composition with contours and all HTML immediately visible. No entrance, camera travel, pointer response, sticky travel or smooth interpolation. Normal document flow. Prefer responsive pre-render from the same terrain. Do not use the handoff state with invisible hero text as the static fallback.

## 19. Performance

Targets, not measured results: 60fps desktop interaction, stable mobile and low idle battery. Terrain ceilings desktop 32,768 triangles, tablet 18,432, optional mobile 8,192. DPR 1–1.5 / 1–1.25 / 1 respectively. Scene data/images ≤500 KB desktop, ≤350 KB tablet, ≤200 KB mobile compressed; measure lazy runtime JS separately. Preserve LCP <1.8 s, INP <100 ms, CLS 0.00 goals. Static relief/HTML precede WebGL.

## 20. Likely implementation

Offline crop/reprojection/resampling and source validation; small quantized height array. Build indexed PlaneGeometry once, displace positions and compute normals once. Contour bands share the material. Draped LineSegments for valid boundaries/grid; one Points object for a few elevation samples. One camera rig owns pose. GSAP/ScrollTrigger animate refs, camera/object properties and uniforms. Never call setState continuously during scroll or useFrame. Reuse existing Lenis owner and GSAP registration; client-only canvas enhances semantic HTML. Dispose resources and suspend offscreen rendering.

## 21. Open questions

Remaining review: supporting copy verification, exact crop/source terms, numeric calibration and Phase 3 authorization. Real Nepal terrain, contours, gradual planimetric transition, conditional parcels, sparse references and static/simplified mobile are approved. Headline is preferred prototype copy, not final marketing copy. Drainage/hydrology is not approved by default. Doc 13 records the corrected reduced-motion lifecycle and its validation. No hero prototype in this correction pass.
