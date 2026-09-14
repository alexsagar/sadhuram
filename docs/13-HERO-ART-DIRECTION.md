# Hero Art Direction: Production Blueprint

2026-09-14. Phase 2/3 blueprint updated under approved D-020 through D-027: Cartographic Neutral / Engineering Editorial. The synthetic 3D rock DEM mesh was rejected as the primary hero (D-024); authentic geographic photography with restrained GSAP parallax is the approved physical-geography hero (D-025). Pseudo-contours and unverified marks are prohibited (D-026); physical photography is cleanly separated from future analytical GIS transitions (D-027). See [14-HERO-PROTOTYPE.md](14-HERO-PROTOTYPE.md) for live prototype architecture.

## 1. Concept and composition study

Spatial Layers in Motion: first observe geography, then read it. One recognizable valley/ridge relationship persists through relief, contours and analysis. Professional identity and project evidence supply the human purpose.

| Study | Assessment |
| --- | --- |
| Centered title above isolated mountain | Reject: scenic object presentation. |
| Left text column / right terrain object | Reject: contradicts full-environment brief. |
| Continuous foreground valley, broad ridge right of center, upper-left text | Recommend: depth across the full width and a controlled reading zone. |

The transformation is the memorable event. Remove decorative labels, HUD framing, numerical tickers, particles, floating planes and fake coordinates.

## 2. Baseline composition: 1440 × 900

Coordinates are percentages of visible frame, origin top-left, not rigid CSS or geospatial coordinates.

| Element | Framing constraint |
| --- | --- |
| Navigation | Upper 4–10%; shared baseline, 48–64 px gutters. |
| Name and role | x 5–8%, y 20–25%; role directly below name. |
| Headline | Same left origin, starts about y 31%; right edge at most x 49–52%; three considered lines. |
| Support | 20–28 px below headline, measure 38–48ch. |
| Actions | Same left edge, approximately y 65–73% if content fits; use normal flow. |
| Protected text area | x 4–53%, y 17–76%; no bright ridge, dense linework or marker behind text. |
| Highest visible ridge | x 70–82%, y 43–56%; broad shoulder, not pointed summit. |
| Valley focal bend | x 57–65%, y 69–79%; drainage direction toward lower-left foreground. |
| Terrain edges | Enters left near y 78%, crosses bottom, rises toward right mid-frame; extends beyond edges. |

Terrain covers roughly 60–70% of frame, including dark relief beneath typography. Negative space comes from crop, bearing and lighting, not an opaque text panel. Select terrain that fits rather than deforming actual ridges to manufacture space.

```text
 Sadhuram Lamichhane       About Projects Experience Research Training Contact

 Sadhuram Lamichhane
 Geomatics Engineer & GIS Expert

 Geospatial analysis for
 land, infrastructure
 and planning.                               broad ridge shoulder
                                            ___/~~~~~~~~~~~\____
 Short supporting copy                     /   contours          \_
                                          /        valley bend     \
 Explore Projects   Download CV       ___/                           \
                         ____________/                               \
 __________foreground relief___________________________________________
```

This wireframe expresses balance only. The ridge must not become a separate right-column object. Compact home branding can shorten visually if its accessible name retains the full identity.

## 3. Real DEM versus synthetic elevation

| Criterion | Real Nepal elevation | Controlled synthetic elevation |
| --- | --- | --- |
| Relevance | Direct geographic provenance; no need for recognizable outline. | Method illustration only; cannot imply Nepal or field evidence. |
| Loading | Large source, small preprocessed browser crop. | Equally small baked height array; no runtime generation needed. |
| Preprocessing | Void inspection, metric reprojection, resampling, analysis. | Author believable drainage/ridges, bake and validate. |
| Licensing | Verify exact product terms, attribution and derivatives. | Record original authorship and generation method. |
| Visual quality | Natural drainage; possible radar artefacts. | Easy smoothness; credible landforms harder than noise. |
| Composition | Choose crop/bearing/scale without altering geography. | Full control, higher risk of meaningless decoration. |
| Mobile | Same budget after resampling. | Not inherently faster than an equivalent real height array. |
| Complexity | One offline workflow; no live tiles, key or API. | Simple surface easy; plausible hydrology less simple. |
| Maintenance | Pin source/version and reproducible processing recipe. | Pin recipe, parameters and baked output. |

Recommend an 8–12 km central Nepal mid-hill crop with two connected rounded ridges and a broad valley. Kathmandu's surrounding middle hills are a candidate search region, not a selected dataset or claim of a project location. Exact bounds require preview inspection. Reject summit-dominated crops and national-border silhouettes.

Start with SRTM 1 Arc-Second Global. USGS documents approximately 30 m postings, possible voids, WGS84 horizontal reference, EGM96 vertical datum and open distribution. Record selected product usage terms and citation before production; do not assume a reseller has identical terms. [USGS SRTM archive](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm).

Radar elevation is not a verified bare-earth engineering survey. Preserve source metres and provenance. Select a metric CRS from crop location: evaluate UTM 45N east of 84°E in central Nepal, 44N west of that boundary. The earlier UTM 45N example does not authorize an inaccurate coordinate label.

Future offline workflow: inspect source/terms → clip with margin → handle no-data explicitly → reproject → resample once → check drainage/ridges → quantize heights with metre scale/offset → derive reference contours → export height array, provenance metadata and responsive static images. Keep original rasters out of the repository/browser; retain source identifiers/checksums and processing settings. No DEM downloaded during Phase 2.

Synthetic fallback needs explicit review against the fake-map prohibition: a deterministic controlled valley/ridge model labelled illustrative, with no geographic, legal parcel or measured-survey claims. Do not silently substitute procedural noise.

## 4. Geometry and depth contract

Local axes: X east, Y up, negative Z north. Center coordinates near the crop; use crop width W = 1 for camera reasoning while retaining metre conversion. Render elevation as (source height minus local datum) / crop width. Start at 1× vertical scale; allow at most 1.2× with recorded justification.

Indexed PlaneGeometry displaced once from a height array is the simplest starting approach: desktop 128 × 128 segments (32,768 triangles), tablet 96 × 96 (18,432), optional mobile 64 × 64 (8,192). Compute normals once. No geometry rebuilding during animation. A custom adaptive BufferGeometry or preprocessed mesh is justified only by demonstrated silhouette/bandwidth improvements.

Retain immutable source elevation as a vertex attribute. Late flattening changes displayed Y, not contour heights; contours must not slide between elevations. Draped boundary/grid vertices share the same transformation. Tiny depth bias prevents z-fighting without visible floating layers. No low-poly faceting or rendered mesh wireframe.

## 5. Camera and projection

One PerspectiveCamera and one rig. Fixed azimuth selected after crop inspection; candidate bearing looks north-northeast across the valley. Retain geographic registration if scene bearing changes. No inaccurate north arrow.

| State | Elevation above horizontal | Vertical FOV | Intent |
| --- | --- | --- | --- |
| Rest | 38–45° | 32–38° | Valley foreground, ridge right, no scenic horizon. |
| Approach | 43–50° | 32–36° | Only 8–12% apparent enlargement. |
| Analytical | 65–76° | 26–30° | Connected plan structure becomes readable. |
| Handoff | 78–82° | 22–26° | Near-plan view, flatter shading and relief. |

Reference framing formula: d = visible vertical span / (2 tan(FOV/2)); then account for oblique projection and terrain depth. Narrowing FOV requires compensating distance to maintain desired coverage. A short approach can reduce altitude/distance; the overhead arc may raise world altitude. “Descent” means moving toward readable data, not continuously lowering the camera into the surface.

Use stable target/up vector, zero roll, no bearing reversal and no exact 90° endpoint. Validate camera remains outside terrain. Near/far cover actual bounds with margin. Update projection matrix when FOV/aspect changes. [Three.js PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html).

Fixed wide perspective is simpler but less analytical; switching perspective/orthographic introduces calibration and popping risk. Recommend one narrowing perspective camera plus reduced relief/shading. No metric scale bar or claim of exact orthographic measurement. Do not implement a second camera merely for this metaphor.

## 6. Contour strategy

| Method | Quality and stability | Animation/mobile | Recommendation |
| --- | --- | --- | --- |
| Height shader bands | Correct height relationship; needs derivative antialiasing and density suppression. | One terrain draw; uniform opacity/width; pixel-bound cost. | Preferred. |
| Offline CPU isolines | Explicit inspectable levels; draping and joins require care. | More vertices; good export/fallback. | Independent validation reference; fallback if shader fails. |
| Analytical contour texture | Filtering can blur or alias oblique lines. | Bounded cost, less independent control; mipmaps needed. | Static/low-end option. |
| Screen-space edges | Depth/normal edges alone are not elevation contours. | Extra pass, view-dependent output. | Reject as contour source. |

For a candidate 400–900 m relief range, test 50 m intermediate and 250 m index intervals; choose 100/500 m if density is excessive. Final interval follows the actual crop, never normalized values disguised as metres. Levels are integral multiples of interval from the documented datum. No interval animation during scroll.

Use derivatives of unmodified elevation for apparent line width. Suppress fine bands where projected spacing falls below about 3 pixels. Target intermediate 0.7–1 CSS px / index 1.2–1.5 px. Rest opacity 0.10–0.18 / 0.22–0.30; analytical 0.25–0.40 / 0.50–0.65. These are tuning targets, not measured contrast. No additive blend, glow or animated contour phase.

Compare ridge/valley crossings against independently generated contours from the same resampled heights, accounting for mesh interpolation. GDAL supports explicit contour intervals and is an offline reference, not a runtime dependency. [GDAL contour documentation](https://gdal.org/en/stable/programs/gdal_raster_contour.html).

## 7. Spatial overlay specification

Approved baseline: real Nepal terrain plus contours, gradual planimetric transition, conditional cadastral/parcel geometry and sparse survey/reference points. No analytical overlay is required to make the transition meaningful.

Drainage-divide/hydrology is **not approved by default**. Remove it from planned entrance, scroll states, mobile composition and asset processing. Introduce such a layer only after later composition or specific-project justification and approval. Do not replace it with another invented analytical result.

Optional grid: at most 3–4 major lines in either direction, roughly 1 km spacing for a 10 km crop, opacity 0.06–0.12. Same projected CRS as terrain; prefer edge ticks if lines compete. No luminous floor.

Conditional parcels: 6–10 adjoining licensed, verified polygons on the valley floor, approximately 0.15–0.25 opacity. They must match the selected geography; no Voronoi cells, invented ownership or IDs. Default is omission until authentic data exists. D-002's conceptual layer inventory remains approved; fabrication is not a way to satisfy it.

Reference points: 3–5 actual DEM elevation samples, one batched Points object, small square/cross around 3 CSS px. Describe them as samples, not measured GCPs. Actual survey control requires verified observations. Omit if meaning cannot be made clear. No map pin, pulse, ring or decorative dot field.

## 8. Copy, typography and navigation

| Headline | Critique |
| --- | --- |
| Transforming spatial data into better decisions. | Clear but “better” is a generic unsupported comparison. |
| From terrain to insight. | Strong visual fit, weak professional specificity. |
| Mapping land, infrastructure and risk with precision. | Concrete, but risk/precision need evidential care. |
| Geospatial analysis for land, infrastructure and planning. | Preferred Phase 3 prototype copy; not final locked marketing copy. |

Reading order and preferred Phase 3 prototype draft (not final marketing copy):

1. **Sadhuram Lamichhane** — user-specified identity.
2. **Geomatics Engineer & GIS Expert** — engineering first; user-specified identity.
3. H1: **Geospatial analysis for land, infrastructure and planning.**
4. **“GIS and spatial analysis for land-use planning, informed by surveying and remote sensing.” [Pending verification against Details.docx; editorial draft only.]**
5. **Explore Projects**, then **Download CV** when the public CV is verified.

Use Geist; no replacement typeface. Name 24–32 px; role title case 14–16 px, tracking 0–0.03em. Headline 56–76 px at baseline, weight 450–550, line-height 1.05–1.12, tracking approximately −0.02em to 0. Body 17–19 px, line-height 1.5. Mono only for legitimate technical metadata. No per-word colors, all-caps filler or forced desktop line breaks on mobile.

Primary CTA: modest off-white rectangle, dark text, existing 2–4 px radius and ≥44 px target height. Secondary: underlined text with equivalent usable hit area. No third large button. Never expose Details.docx automatically as the public CV.

Navigation sits directly on environment. About, Projects, Experience, Research, Training, Contact. Replace with plain “Menu” disclosure when it cannot fit; retain accessible expanded state, keyboard operation, visible focus and Escape close. No floating glass capsule or tiny six-link mobile nav. No menu code in this phase.

## 9. Palette and lighting

| Role | Color | Treatment |
| --- | --- | --- |
| Environment | #121715 existing | Matte base / reading zone. |
| Terrain shadow | #1B211E existing | Readable low relief. |
| Midterrain | #323C36 existing | Dominant terrain family. |
| Lit slope | #66746C existing | Restrained ridge faces, outside secondary text. |
| Main text / paper | #F2F1EC existing | Identity and editorial destination. |
| Secondary text | #B6BDB8 existing | Only against protected dark space. |
| Contour pigment | #B6BDB8 approved | Supplemental linework at tuned opacity. |
| Editorial ink | #171B19 existing | Handoff text and line family. |

Approved Cartographic Neutral / Engineering Editorial tokens are applied in globals.css. Technical accent #5C7480 is restrained; optional earth/boundary #9A7658 is not decorative gold. Secondary paper #E8E7E1, secondary ink #5F6561 and dark contour #6E7771 complete the neutral system. No green page backgrounds, luxury green/gold, gradient-heavy treatment, neon or rainbow ramps. Light upper-left/front, elevation approximately 40–55°, key plus ambient fill, roughly 2:1 lit/shaded appearance. Smooth normals and matte material; no shadow maps by default, HDR environment, bloom, SSAO or moving sun. Reduce lighting contrast toward analysis.

Project contrast requirements remain: headline ≥7:1, body ≥4.5:1, meaningful control/focus boundaries ≥3:1. Validate actual composited scene/fallback pixels at every text-visible state, not just flat hex pairs. Supplemental lines may remain quiet because meaning exists in HTML. Technical-accent global focus outline is not assumed sufficient on dark hero; specify a high-contrast hero focus treatment in Phase 3.

Lightening is scene-to-paper interpolation, not a decorative gradient. Match final canvas output and CSS paper through consistent color management; inspect for gamma seams. Remove competing linework before introducing any text backing panel.

## 10. Entrance, ambient and ownership

Follow doc 04's 0–2.35 s schedule. HTML is readable and actionable from first paint; timing controls ≤12 px whole-block movement and emphasis rather than withholding content. Terrain starts at true relief, not animated geological uplift. Static relief stays behind canvas until its first valid frame, then crossfades without layout shift. After settling, default is complete stillness.

Fine-pointer/hover desktop may add ≤0.6° horizontal / ≤0.3° vertical offset with 200–300 ms settling. Scroll removes influence by p=0.15. No direct terrain rotation, drag or OrbitControls.

One rig owns camera. Scroll immediately cancels unfinished entrance on user input, anchor navigation or restored position. Compute current state directly on late load. No intro replay on resize or context recovery. Never run competing entrance and scroll tweens on the same camera property.

## 11. Scroll states and travel

p = normalized travel, not a timed video. Desktop starts at 120svh additional travel (range 100–140svh) plus visible 100svh, approximately 220svh document region. CSS sticky preferred per D-014; do not also add JS pin spacing.

| Phase | p | Scene | Copy and overlays |
| --- | --- | --- | --- |
| A Departure | 0–0.20 | Modest approach starts. | Copy moves up ≤16 px and fades; pointer reaches zero by 0.15. |
| B Approach | 0.20–0.45 | Coverage grows only 8–12%; camera near 50°. | Copy fully exits by 0.35; contours strengthen. |
| C Analysis | 0.45–0.80 | Arc toward 76°; FOV narrows; rendered relief becomes 0.35–0.50 of initial. | Source-height contours remain fixed; conditional parcels and sparse references emerge when verified. |
| D Handoff | 0.80–1.00 | 78–82°, relief 0.15–0.25, softer lighting. | Parcel/reference grid fades first; contours become dark ink; environment becomes paper; introduction enters. |

No snap, forced dwell or velocity distortion. Fast/reverse scrolling maps directly to progress. Links navigate past travel without waiting. Hidden copy must not leave invisible tab stops; restore controls on reverse scroll. If focus is inside a departing control, keep it visibly presented rather than fading the focused element. Provide normal skip-to-content navigation.

Reuse existing Lenis singleton and GSAP registration. ScrollTrigger measures progress for native sticky unless testing proves JS pin necessary. At zoom/content height exceeding viewport, disable sticky travel. Resize refreshes framing once, not a new timeline each frame.

## 12. Editorial handoff

Normal-flow professional introduction follows the hero. Its first region can remain transparent over the same sticky canvas as paper tone arrives; editorial ink text sits outside the remaining contour cluster. Fade canvas over final roughly 10–15% of travel. Subsequent introduction content sits on opaque paper as sticky releases. Final canvas pixels match paper, preventing black edge or rectangle.

No duplicate decorative contours needed. If static continuation later proves necessary, export identical camera/data transform and check registration. Default: same-canvas overlap, then quiet editorial space. No immediate second pin. Introduction content requires verified biography, not another spatial spectacle.

## 13. Responsive composition matrix

| Viewport | Layout | Motion/fidelity |
| --- | --- | --- |
| 1920 × 1080 | Preserve text measure within centered 1320 px alignment; show more terrain margins, ridge near x 74%. | Full path; 1.5 DPR starting cap. |
| 1440 × 900 | Baseline §2. | 120svh starting travel. |
| 1280 × 800 | Headline 52–64 px; tighter nav gaps; protect left reading zone. | 100–120svh travel. |
| 1024 × 768 | Headline 46–56 px; plain menu if needed; ridge slightly lower. | 80–100svh if content fits, otherwise normal flow. |
| 768–1023 tablet | 32 px gutters, text upper region, terrain lower 55–65%; fewer bands. | 50–70° camera; 50–70svh travel; no touch pointer or parcels/grid. |
| 390 × 844 / 430 × 932 | Headline 32–44 px; name/role above, actions in flow; separate mobile terrain framing. | Static default; no pin; optional 200–300 ms departure crossfade. |
| 320 × 568 / short landscape | 16 px gutters, natural wrapping; hero grows beyond viewport; terrain follows actions. | Static, normal flow; do not shrink text to force a single screen. |

These are conceptual fit checks, not screenshots. Phase 3 must render all above plus 200%/400% zoom, safe-area insets, long text, browser address-bar changes and keyboard menu traversal. No horizontal overflow. Mobile is separately composed, not desktop image cropping.

## 14. Reduced motion and fallback

Fully composed static oblique relief and readable contours; all text/actions immediately visible. Responsive pre-render from same dataset preferred. No intro, parallax, camera scrub, pin or smooth interpolation. Normal scroll into paper section; do not use the final animation state that has hidden hero text.

Canvas is decorative and aria-hidden; substantive meaning and provenance exist in HTML. No WebGL, failed assets and context loss preserve static relief and navigation. Dispose resources and stop active animation. Live preference changes must release travel without blank space and maintain position continuity. No essential action lives only in canvas.

## 15. Rendering and performance budget

| Budget | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Triangle ceiling | 32,768 | 18,432 | 8,192 if justified |
| DPR | 1–1.5 | 1–1.25 | 1 |
| Compressed scene data/images | ≤500 KB | ≤350 KB | ≤200 KB |
| Draw calls | ≤8 | ≤5 | 0 static / ≤3 WebGL |
| Hero GPU allocation incl. render buffers | ≤48 MiB | ≤32 MiB | ≤16 MiB if WebGL |
| Runtime | 60fps active motion target | Stable motion, lower fidelity if needed | Static default, battery priority |

Separately measure lazy runtime JS; provisional incremental hero JS budget ≤300 KB gzip, not yet measured against installed versions. If exceeded, inspect imports/defer loading rather than claiming data assets are total cost. A 129 × 129 UInt16 height array is roughly 33 KB uncompressed plus metadata. No raw GIS parser, dense displacement/normal map stack, post-processing or runtime analysis.

Build/displace indexed PlaneGeometry once; custom BufferGeometry/preprocessed mesh only if measurement justifies. Contours share terrain material. Draped LineSegments for thin valid vectors; wider consistent strokes need a tested line approach or texture rather than assuming portable WebGL line widths. One Points object suffices for a few samples; no instancing infrastructure needed.

GSAP/ScrollTrigger animate refs, object/camera properties and uniforms. **No setState continuously during scroll or useFrame.** React may update once for capability/breakpoint changes. Reuse Lenis provider; no second scroll RAF. R3F demand rendering requires explicit invalidation for imperative mutations; invalidate while motion changes, then stop and suspend offscreen/hidden rendering. [R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Targets: LCP <1.8 s, INP <100 ms, CLS 0.00; reserve layout and show static relief/HTML before WebGL. Measure cold load, transfer, frame times and GPU use on actual desktop/midrange mobile. Degrade optional overlays → DPR → mesh/contour density → static relief. Never sacrifice readable content/navigation. Dispose scene resources and scoped timelines/listeners on unmount.

## 16. Design-skill critique

Applied frontend-design subject-first composition/two-pass critique and UI/UX Pro Max targeted searches: `reduced motion scroll` (ux) and `terrain rendering performance` (threejs). Refined existing approved direction; did not generate a replacement design system. Impeccable and standalone GSAP/interaction skills are not listed as available; no claim of using them. Technical study uses primary sources linked above.

| Criterion | Finding and response |
| --- | --- |
| Subject relevance | Real height relationships support geomatics; reject invented parcels/control observations. |
| Hierarchy | One ridge, one valley, conditional reference geometry; reduce simultaneous GIS layers. |
| Originality | Same-landscape transformation carries identity; isolated mountain would fail. |
| Accessibility | Immediate HTML, visible focus, static reduced motion; composited contrast/runtime behavior still need testing. |
| Readability | Protected upper-left zone is a hard camera/crop constraint. Remove competing lines before adding backing panels. |
| Motion purpose | One explanatory transition; remove ambient drift and moving light. |
| Restraint | No uppercase filler, fake coordinates, rainbow ramp or extra CTA. Geist stays. |
| Performance | Static mobile and demand rendering reduce idle work; budgets remain unmeasured targets. |
| Responsive quality | Separate mobile framing and content-led height prevent viewport traps. |
| AI-generated appearance | No panel kit, particle filler or ornamental technical labels; domain-led copy replaces promises. |

Rejected generic skill advice: blanket smooth-scroll advice conflicts with reduced-motion native behavior and existing Lenis owner; instancing for many objects is irrelevant to a few points; default HDR tone mapping/shadow recipes are unnecessary. Approved direction overrides any generic recommendation.

## 17. Phase 1 verification and limitation

Initial git status: master, no commits. Initial lint and build passed. Created local foundation commit `8e6b848` with requested message. No push/history rewrite. Git emitted LF-to-CRLF normalization warnings, not commit failures.

Correction: the provider replaces Lenis on runtime preference changes after removing the previous scroll subscription and destroying the old instance. The new instance starts at the current scroll position with smoothWheel disabled/duration zero for reduced motion, and restores smooth settings when motion is re-enabled. One stable ticker reads the current ref; one media-query and one anchor listener remain registered. Anchor handling reads the live preference. Existing stopped state is retained. Cleanup removes all owned callbacks/subscriptions.

Validation: 12 browser media-preference toggles passed with scroll preservation within 1 CSS pixel, cleared old subscriptions and resumed wheel scrolling. The runnable check `node --test tests/smooth-scroll-lifecycle.test.mjs` covers both initial preferences, repeated toggles, single owned subscriptions, live anchor preference and Strict Mode-style setup/cleanup. No hero integration is included.

## 18. Approval questions and future validation gates

Approved now: Cartographic Neutral / Engineering Editorial; identity and preferred prototype headline; real Nepal-derived terrain strategy; terrain/contours and gradual planimetric transition; conditional parcels; sparse survey/reference points; static/simplified mobile-first scene. No drainage/hydrology overlay by default.

Remaining review: exact crop/bounds/CRS/terms, supporting biography and public CV verification, shader/contour calibration, rendered contrast, camera continuity, handoff and performance measurements. The headline remains prototype copy. Phase 3 still needs separate authorization. Do not build the hero prototype during this correction pass.

## 19. Simplified Hero Art Direction (Approved per D-032, D-033, D-034)

Following review of the Phase 3B prototype, the hero art direction was formally simplified:
- **Core Role**: Introduce Er. Sadhuram Lamichhane with quiet dignity, authentic Himalayan geomorphology, and editorial restraint.
- **Removal of Hero GIS Demonstration (D-032)**: The standalone cartographic specimen sheet, DEM contour handoff, and technical map metadata were removed from the hero to prevent a report-like interruption.
- **Contextual Evidence Rule (D-033)**: Technical GIS visual evidence belongs contextually in client project case studies and regional sections, where it carries genuine engineering meaning.
- **Direct Editorial Release (D-034)**: The hero moves with restrained parallax and releases smoothly into the `#F2F1EC` paper portfolio section across a tuned desktop travel distance of 150svh (135svh tablet).
