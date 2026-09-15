# 18. HOMEPAGE SECTION 02 — PROFILE / ENGINEERING PRACTICE

> **STATUS**: IMPLEMENTED — AWAITING REVIEW
> **Routes**: `/` (production)
> **Components**: `components/sections/professional-introduction.tsx` (Part A), `components/sections/engineering-practice.tsx` (Part B)
> **Decisions**: `D-042` … `D-047`
> **Supersedes**: the five-discipline list documented in `docs/16-PROFESSIONAL-INTRODUCTION.md`

---

## 1. Purpose

Section 02 is the first thing a visitor reads after the cinematic hero releases. It answers, in order:

1. Who is Er. Sadhuram Lamichhane, professionally?
2. How does he work?
3. Which areas of engineering practice does he actually operate across, and what is the evidence?

It is deliberately **not** a résumé dump and not a generic "About Me". The résumé belongs to later sections (Experience, Research, Training); this section positions the practice.

Because the hero is immersive and cinematic, Section 02 opens quietly. The page rhythm is:

```
VIDEO HERO  →  calm editorial introduction  →  engineering practice sequence  →  release toward Selected Projects
```

---

## 2. Content source

`Details.docx` (project root) is the sole authority. Extraction used `scripts/inspect_details.py` (tables/paragraphs) and `scripts/map_images.py` (embedded images with their surrounding paragraph context).

Facts used in this section, and where they come from:

| Claim | Source row in `Details.docx` |
| :--- | :--- |
| Licensed Geomatics Engineer, GIS Expert | `POSITION`, `MEMBERSHIP OF PROFESSIONAL ASSOCIATIONS` (NEC Reg. No. 221 Geomatics 'A') |
| Head of Department, Universal Engineering & Science College, Lalitpur | `PRESENT EMPLOYMENT` |
| UNIGIS M.Sc. in Geographical Information Science, University of Salzburg | `EDUCATION / QUALIFICATIONS` |
| Field survey, UAV capture, land use zoning, hazard modelling, municipal spatial databases | `TECHNICAL SKILLS & COMPETENCIES` and the 34-row experience table |
| Rural municipalities, provincial offices, Department of Roads (MoPIT) | experience table (Gaumul, Ghiring, Chumnuwri, Patarasi, Manang Ngisyang, Chame, Gharapjhong, Bardibas, Inaruwa, Nepalgunj; PMEU / Department of Roads DPR contracts) |
| Land Use Act 2076 & Regulation 2079, parcel-level zoning, cadastral superimposition, ward-wise atlases | experience table (Gaumul, Ghiring, Banganga, Sakhuwa Prasauni, Gokulganga rows) |
| MCE/AHP, geodatabase, municipal profiles, watershed studies, infrastructure siting | experience table (Purchaudi RSLUP, Makwanpuragadhi digital profile, Krishnanagar MCE, EV charging GIS optimisation) |
| Total station / GNSS control, route alignment, detailed engineering survey | experience table (Ghyampesal–Baarpaak DPR, Darbung–Dalbhanjyang DPR, Gandaki Province Assembly, Ramgram topographic survey) |
| UAV / LiDAR, landslide assessment, land pooling | experience table (Narayanghat–Mugling NH44 UAV survey, Dudhkoshi reservoir rim LiDAR, Kamalamai land pooling UAV survey) |

No statistic, client, date or credential appears on the page that is not in that table.

---

## 3. Selected practice areas

Four, in this order:

| # | Title | Why this one |
| :--- | :--- | :--- |
| 01 | GIS & Spatial Analysis | The `POSITION` row literally reads "GIS Expert"; spatial analysis underpins every other practice. |
| 02 | Land Use Planning & Zoning | The single largest block of verified engagements (20+ municipal land use plans). |
| 03 | Surveying & GNSS | The foundation of the earlier career and of all DPR work with the Department of Roads. |
| 04 | Remote Sensing & UAV | Current growth area — UAV/LiDAR landslide and reservoir-rim work in 2025–2026. |

Terminology was checked against `Details.docx` and adjusted from the working brief:

- "Land Use Planning" → **"Land Use Planning & Zoning"**: the CV consistently pairs *Land Use Plan* with *Land Use Classification / Land Use Zoning (LUZ)*, and "LUZ Expert" is a position title he has held.
- "Remote Sensing & UAV" retained as written; the CV uses "UAV/Drone/LIDAR" and "Remote Sensing Analysis".

Hydrology & hazard assessment, which had its own entry in the superseded five-item list, is folded into 01 and 04 rather than added as a fifth item — the brief caps the sequence at four to five, and hazard modelling is always delivered *inside* a land use or terrain engagement in the source document.

---

## 4. Copy

**Part A**

- Kicker: `02 / Profile`
- Title: `Engineering Practice`
- Statement: `Turning spatial data into practical decisions.`
- Introduction (78 words): identity, licence, academic post, degree, and the span of work from field capture to municipal spatial databases.

**Part B** — one to two sentences each, no marketing register:

- **01 GIS & Spatial Analysis** — "Spatial databases, thematic mapping and multi-criteria evaluation (MCE/AHP) supporting municipal profiles, watershed studies and infrastructure siting."
- **02 Land Use Planning & Zoning** — "Parcel-level land use classification and zoning under Nepal's Land Use Act 2076 and Regulation 2079, with cadastral superimposition and ward-wise map atlases for municipalities and rural municipalities."
- **03 Surveying & GNSS** — "Topographic and cadastral survey with total station and GNSS — control networks, route alignment and detailed engineering survey for DPR work with the Department of Roads."
- **04 Remote Sensing & UAV** — "UAV and satellite data turned into terrain models, land cover change and slope or flood hazard surfaces — used for landslide assessment, land pooling and risk-sensitive land use plans."

Closing line after the sequence: `Selected work across land, infrastructure and planning.`

---

## 5. Image provenance

Seventeen images are embedded in `Details.docx`; they were extracted to `artifacts/details-images/` and each was matched to its surrounding paragraph. Most are group photographs, certificates or classroom shots. Only a few carry genuine engineering evidence, and those are the ones used.

| Practice | Asset | Source | What it actually shows | Why selected | Verified |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | `public/images/practice/practice-01-gis.webp` | `Details.docx` image 11, cropped to the projected screen | An ArcMap page layout of the **Phukot Karnali watershed** — neatline, graticule, legend, scale bar, Nepal inset, and the title block "Closing Ceremony, GIS Training for Engineers, Vidhyut Utpadan Company Limited" | A real cartographic output produced by him, not a photo *about* GIS | Yes — the same programme is corroborated by the VUCL certificate of appreciation (image 10, GIS training, Kathmandu, 19–28 May 2022) |
| 02 | `public/images/practice/practice-02-landuse.webp` | `Details.docx` image 9 | Engineers working on spatial data at laptop workstations, thematic project maps framed on the wall | The strongest available image of applied spatial planning work; the section does not fabricate a land use map that does not exist | Partially — the working session is verified (same VUCL programme); it is **not** a land use plan deliverable. Flagged for replacement when project map exports are supplied. |
| 03 | `public/images/practice/practice-03-survey.webp` | `Details.docx` image 6, cropped to 4:3 | Total station on a tripod over a ground marker during field survey | Direct, unambiguous evidence of instrument survey practice | Yes — paragraph context: "Surveying at Poultry feed Factory at Chitwan" |
| 04 | `public/images/practice/practice-04-terrain.webp` | Computed by `scripts/render_practice_hillshade.py` from `data/terrain-source/nepal-crop.tif` | Shaded relief (315° azimuth, 45° altitude) of a 10 × 10 km block of the Kavrepalanchok middle hills, elevations 1 235–2 161 m | `Details.docx` contains **no** UAV, drone or satellite image. Rather than fabricate one or use stock, the section shows a genuine elevation product of the class described in the copy, captioned with its exact dataset and coordinates. | Yes as to what it is (Copernicus DEM GLO-30, tile `Copernicus_DSM_COG_10_N27_00_E085_00_DEM`); it is a **reference specimen**, not a project deliverable, and the caption says so |

Attribution carried on the page for 04: *Produced using Copernicus WorldDEM-30 © DLR / Airbus DS, under COPERNICUS by the EU and ESA.* Full licence terms in `data/terrain-source/README.md`.

No stock photography. No AI-generated engineering scenes. Every image has descriptive `alt` text and a visible provenance caption.

**Known gap**: practices 02 and 04 deserve genuine project deliverables (a land use zoning map sheet; a UAV orthomosaic or DSM). Both are noted in `docs/11-TASKS.md` as content requests for Er. Lamichhane.

---

## 6. Part A layout

Paper ground `#F2F1EC`, `--container-max` 1320px, fluid gutters `clamp(20px, 5.2vw, 84px)`, opening padding `clamp(112px, 18vh, 208px)` — the whitespace *is* the transition from the hero.

```
02 / PROFILE
Engineering Practice
──────────────────────────────────────────────────────────────

Turning spatial                      Er. Sadhuram Lamichhane is a licensed
data into practical                  Geomatics Engineer and GIS Expert …
decisions.
                                     [ portrait ]
                                     POKHARA, NEPAL · JAN 2022
```

- Asymmetrical grid: `1.25fr / 1fr` at ≥1024px, `1.15fr / 1fr` at ≥768px, single column below.
- The statement is the strongest line in Part A at `clamp(30px, 4.4vw, 58px)` — roughly a third of the hero headline, so it never reads as a second hero.
- One portrait (GNSS workshop, Pokhara, Jan 2022) retained as the only photographic evidence of the person. No cards, icons, counters, pills, panels or gradients.

---

## 7. Part B layout

Desktop (≥1024px, motion allowed): a sticky stage, 62 / 38 split.

```
┌───────────────────────────────┬──────────────────────────┐
│                               │ 01  GIS & Spatial Analysis│
│      LARGE VERIFIED IMAGE     │     ────                  │
│                               │     short description     │
│                               │                           │
│                               │ 02  Land Use Planning …   │
│  CAPTION / PROVENANCE         │ 03  Surveying & GNSS      │
│                               │ 04  Remote Sensing & UAV  │
└───────────────────────────────┴──────────────────────────┘
```

- No bordered card: the viewport is the composition. The image frame has no radius, no shadow, no border.
- The right column is a **typographic practice rail**, not a thumbnail minimap. All four items stay visible; the active one is full ink with a short rule and its description open, the others are muted.
- Section heading `Areas of practice` is a small monospace lead-in above the sequence (it carries `aria-labelledby`).

DOM is a single `<ol>` of four `<li>`, each holding one `<figure>` and one info block. Desktop uses `display: contents` on the `<li>` so the four figures stack in grid column 1 while the four info blocks stack down column 2 — one DOM, two layouts, no duplicated markup and no duplicated image downloads.

---

## 8. Desktop scroll behaviour

- Outer `.sequence` is `360svh`; the inner `.stage` is `position: sticky; top: 0; height: 100svh`. Sticky comes from CSS, **not** from `ScrollTrigger.pin`.
- One `ScrollTrigger` (`id: "engineering-practice-sequence"`) reads `progress` over that travel. No wheel or touch listeners, no `preventDefault`, no custom RAF loop, no second Lenis instance, no body scroll locking. The single Lenis instance in `components/providers/smooth-scroll-provider.tsx` remains the only one.
- Each of the four segments spends its first 62 % (`READ_HOLD`) holding still to be read; the remaining 38 % runs a smoothstep transition.
- Transition: the outgoing frame's inner wrapper translates to `-100%` while the incoming one travels from `+100%` to `0`; the image inside each frame counter-moves by 12 % (`PARALLAX`) so it drifts slightly slower than its frame. Captions cross-fade with their own frame. Frames are transparent so the outgoing one reveals the incoming one beneath it.
- No snap. Scrub only — natural scrubbing read better than forced snapping when both were tried.
- After practice 04 the sticky state releases on its own and the page returns to document flow, with a quiet closing line before the `#selected-projects` anchor.

Explicitly **not** implemented, from the reference: infinite looping, duplicated/virtual indices, a thumbnail minimap, a custom `targetY`/`currentY`/`MAX_VELOCITY` snap engine, manual wheel and touch state, extreme image scale, blur, rotation or distortion.

---

## 9. Tablet behaviour (768–1023px)

Vertical editorial flow, identical to mobile. Portrait tablets felt cramped with a pinned 62/38 stage, so pinning is not forced onto them; the breakpoint for the sticky sequence is 1024px.

## 10. Mobile behaviour (<768px)

Natural vertical stacking, one practice after another:

```
01
GIS & Spatial Analysis
[image]
caption
────
description
```

Full-width imagery at natural aspect ratio, `820w` sources served via `srcset`/`sizes`, no scroll trap, no horizontal overflow down to 320px.

## 11. Motion

- Part A: a single `opacity`/`y: 18px` reveal, staggered 0.09s, fired once. Nothing else moves.
- Part B: motion is functional only — frame progression, restrained internal parallax, active-state colour and rule transitions. No character-by-character text animation, no bobbing, no pulsing, no parallax on type.

## 12. Reduced motion

`prefers-reduced-motion: reduce` disables the sequence entirely:

- The script returns before creating any ScrollTrigger.
- The sticky/overlap CSS lives inside `@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)`, so the section renders as the plain vertical stack at every width.
- Verified in the capture run: `sticky: static`, 4/4 images visible, 4/4 descriptions visible. No content is reachable only through animation.

## 13. Accessibility

- `<section id="profile" aria-labelledby="profile-heading">` with an `<h2>`; `<section id="engineering-practice" aria-labelledby="engineering-practice-heading">` with an `<h3>` and four `<h4>` practice titles — real HTML text, never image-baked, never animation-gated.
- Ordered list markup matches the 01–04 semantics.
- Every image: descriptive `alt` plus a visible `<figcaption>` carrying place, date and provenance.
- Contrast on `#F2F1EC`: ink `#171B19` 15.2:1; secondary `#5F6561` 5.1:1; accent `#465D68` 5.85:1.
- Keyboard scrolling works throughout; nothing traps scroll; anchors `#profile`, `#engineering-practice` and `#selected-projects` all resolve (asserted in `tests/homepage-section-02.test.mjs` and re-checked at every captured breakpoint).

## 14. Performance

- Four WebP images, 1600w and 820w, served with `srcset` + `sizes="(min-width: 1024px) 62vw, 100vw"`. Largest is 243KB; all are under 400KB (asserted in tests).
- Only practice 01 loads eagerly; 02–04 are lazy. The hero remains the loading priority — nothing in Section 02 is preloaded.
- Transform-only animation (`yPercent`, opacity); `will-change: transform` on the moving wrappers; no filters, no layout-triggering properties in the scroll loop.
- GSAP work is torn down via `gsap.Context.revert()` on unmount and rebuilt on breakpoint / motion-preference change.

## 15. Rejected reference behaviours

| Reference behaviour | Decision |
| :--- | :--- |
| Infinite loop with duplicated indices | Rejected — the practice list is finite and must read as 01→04→end |
| Image minimap / thumbnail strip | Rejected — replaced by a typographic rail; duplicate thumbnails add no information |
| Custom scroll engine (`targetY`, `MAX_VELOCITY`, manual wheel/touch, snap duration) | Rejected — violates the project scroll architecture; ScrollTrigger progress is used instead |
| 1.5× image scale, heavy blur, 3D rotation, liquid distortion | Rejected — reduced to a 12 % internal drift |
| Hard snap between items | Tried and rejected — scrub reads calmer |

## 16. Handoff into Selected Projects

The sequence releases into plain document flow, followed by `Selected work across land, infrastructure and planning.` and then the `#selected-projects` anchor marker. Section 03 will replace that marker; nothing in Section 02 needs to change when it does, and the hero's `Projects` link already points at it.

---

## Revision: compact profile (supersedes the image sequence above)

**Current direction:** The user rejected the four large practice images and descriptions because they made the homepage too long. Section 02 is now one compact editorial introduction. Earlier sequence documentation is retained as history, not the current specification.

### Audit findings

The current checkout did not reproduce the reported horizontal clipping: baseline browser captures at all ten widths recorded scrollWidth equal to clientWidth and no clipped visible copy. The verified failures were compositional: a viewport-height image frame, 140% image height with negative percentage margin, excessive cropping, a caption competing with the image, different container padding between Parts A and B, and a 12ch statement beside a large portrait. A nominal 60/40 grid alone did not solve these problems. Previous documentation also differed from the actual implementation.

### Final architecture

- `ProfessionalIntroduction` is a server component with the section heading, approved statement, verified professional introduction, and nested `EngineeringPractice` index.
- `EngineeringPractice` is a static list, not a second section or gallery. Desktop uses four columns; tablet uses two; phones use four compact rows.
- One 1320px outer container, including gutters: 20px mobile, 32px from 640px, 48px from 1024px. Both the header and index align to that same container.
- Asymmetric 3:2 introduction grid from 768px; 32px mobile and 48px desktop statement, 16px body text with 28px line height. Existing Geist typography and paper/ink tokens are retained.
- Tailwind handles all layout, spacing and responsive behavior. Both obsolete Section 02 CSS modules were removed.
- No section images, captions, individual practice descriptions, progress meter, duplicated rail, portrait, sticky stage, ScrollTrigger, parallax, or client state remain.
- The approved hero and shared Lenis provider are unchanged. Existing Profile, Practice and Projects anchors still resolve. No later homepage section was started.

### Content and evidence

The four verified labels remain GIS & Spatial Analysis; Land Use Planning & Zoning; Surveying & GNSS; Remote Sensing & UAV. The introductory paragraph synthesizes the position, NEC registration, technical skills and project experience in `Details.docx`; it adds no new credentials, clients, dates or statistics. Zoning is retained because the source explicitly uses Land Use Zoning.

The previous four assets remain on disk for historical review but are not loaded by Section 02. Their older provenance table is not blanket approval for future reuse: image 9 has ambiguous surrounding context, and the Copernicus relief is a reference specimen, not his project deliverable. Genuine land-use and UAV project outputs remain content requests for future Selected Projects work.

### Responsive, accessibility and performance

The entire section uses native vertical flow at every viewport and with reduced motion. All copy is server-rendered, immediately readable and available without JavaScript. A labelled section contains one h2 and a semantically labelled list. No interactive affordance, icons, cards, image payload, fixed-height trap or overflow suppression is introduced. Existing ink and secondary-ink tokens supply contrast.

### 21st.dev research and Impeccable

21st.dev MCP was verified by successful search and component retrieval.

- [Scroll 01](https://21st.dev/@felipemenezes098/components/scroll-01): inspected source for sticky media and natural mobile flow. The user's later direction rejects this interaction entirely; none of its code or dependencies ship.
- [Editorial Image Hero](https://21st.dev/@felipemenezes098/components/hero-07): inspected source for aligned asymmetric copy and measured spacing. Retained the principle of a common content grid; rejected full-bleed media, masks, blur, serif replacement and CTA scaffolding.
- [Editorial Collage Hero](https://21st.dev/@felipemenezes098/components/hero-04): metadata reviewed and rejected for overlapping imagery/background wash.
- Initial search results for animated type, carousel and infinite slider were rejected as unrelated to the brief.

Impeccable SKILL.md, audit, layout, adapt, craft-floor and polish guidance informed the implementation. Its context launcher initially failed because the engine cache was unavailable; the documented direct-context fallback was used. The engine was subsequently installed. The layout detector completed with no findings. No replacement PRODUCT.md or DESIGN.md was invented.

### Verification artifacts

- Baseline: `artifacts/section-02-audit/before/`.
- Superseded image-sequence iteration: `artifacts/section-02-audit/after/` (not the final design).
- Current compact layout: `artifacts/section-02-audit/compact/`.
- Reproduce browser checks: `node scripts/section-02-audit.mjs` with production server on port 3102.
- Full-page rhythm: `artifacts/section-02-audit/compact/1440x900-full-page.png`.
- `npm run build` and all 10 Node tests pass. No npm test script is configured; use `node --test tests/*.test.mjs`.
- Formal dual-agent Impeccable critique is not yet completed.

### Compact browser verification results

Production Chromium captures passed at 1920x1080, 1440x900, 1280x800, 1024x768, 820x1180, 768x1024, 430x932, 390x844, 375x812 and 320x568. At each width document scrollWidth equals clientWidth, visible copy is not clipped, all four practice labels are present and the browser reports no errors or warnings. Desktop section height is 639.75px; natural mobile height is 896px at 430px, 924px at 390px and 1073.5px at 320px. No artificial scroll travel remains. Reduced-motion screenshot is included.

Final lint exited successfully with 0 errors and 1793 pre-existing/vendor warnings (mostly local Impeccable installation files and frozen hero image warnings). Section 02 now has no raw image warnings. Impeccable layout detector: `[]`. Build and all 10 tests passed.

Design assessment: the statement leads, professional copy supports it, and the index groups the four disciplines without gallery repetition. Header and body align; the desktop text/image imbalance is eliminated by removing media altogether. No caption treatment, imagery claims, sticky rail, or decorative effects remain to compete with the profile. Tablet retains asymmetric reading columns and mobile uses a complete vertical reading order. Formal dual-agent critique is distinct from this bounded layout/polish review and was not run.
