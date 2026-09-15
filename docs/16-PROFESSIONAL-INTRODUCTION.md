# Documentation: Homepage Section 02 — Professional Introduction

> **STATUS**: SUPERSEDED BY `docs/18-ENGINEERING-PRACTICE.md` (decisions `D-044`, `D-045`).
> Section 02 was rebuilt as a two-part structure: a quiet Profile introduction plus a finite
> four-item Engineering Practice sequence. The five-discipline list, credentials strip and
> sticky portrait column described below are no longer on the page. The portrait, its
> provenance, and the contrast audit remain accurate and still apply.

## 1. Overview & Purpose
Homepage Section 02 (**Professional Introduction**, DOM id `#profile`) is the primary editorial positioning anchor of Er. Sadhuram Lamichhane's professional portfolio. It follows the frozen geographic parallax hero, providing an immediate, high-contrast transition from the immersive Himalayan physical geography into a calm, authoritative, and scientifically grounded engineering editorial monograph.

The section answers three essential questions for institutional clients, government ministries, engineering firms, and academic peers:
1. **Who is Sadhuram?** A licensed Geomatics Engineer (NEC Reg. 221 'A'), UNIGIS Salzburg postgraduate with distinction, and Head of the Department of Geomatics Engineering at Universal Engineering and Science College (UESC).
2. **What kind of professional is he?** A spatial science practitioner bridging field geodetic measurements, UAV photogrammetry, and computational GIS modeling to inform high-stakes physical and civil decisions.
3. **What problems does he solve?** Statutory parcel-level land use planning under Nepal's Land Use Act, multi-hazard risk assessment, road infrastructure alignment optimization, and watershed hydrology.

---

## 2. Design System & Editorial Philosophy
In strict compliance with `AGENTS.md`, `docs/01-DESIGN-DIRECTION.md`, and `docs/02-DESIGN-PRINCIPLES.md`:
- **Direction**: Cartographic Neutral / Engineering Editorial.
- **Surface**: Warm tactile paper canvas (`--background: #F2F1EC`), dark slate ink (`--foreground: #171B19`), and muted secondary slate (`--foreground-muted: #5F6561`).
- **No Prohibited Patterns**:
  - Zero cards or floating drop-shadow boxes (`box-shadow: none`).
  - Zero bento grids, glassmorphism blur halos, or gradient backdrops.
  - Zero generic Lucide/Feather icons; core disciplines are presented with clean, dignified typographic discipline indices (`01` through `05`).
  - Zero fake statistics, number tickers, or arbitrary skill percentages.
  - Rectangular photographic framing with authentic factual attribution; no circular avatar cuts, pill frames, or decorative drop shadows.

---

## 3. Layout Architecture
Section 02 is built on a responsive 12-column asymmetrical editorial grid:
- **Container**: Max width `1320px` (`var(--container-max)`), centered horizontally with fluid gutter padding `clamp(24px, 5.2vw, 84px)`.
- **Vertical Spacing**: Generous architectural breathing room `clamp(96px, 12vh, 160px)` top and bottom.
- **Desktop Grid (`>= 1024px`)**:
  - **Left / Editorial Column (7 of 12 columns)**: Contains the monospace kicker, approved headline, two narrative paragraphs, the 5 core practice disciplines, and the discrete verified credentials strip.
  - **Right / Visual Column (5 of 12 columns)**: Sits adjacent with `position: sticky; top: clamp(32px, 5vh, 64px)`, anchoring the genuine portrait alongside the reading flow.
- **Tablet Grid (`768px – 1023px`)**: Maintains the 7/5 editorial column split with optimized padding and a 2-column credentials layout.
- **Mobile Flow (`< 768px`)**: Collapses gracefully into a single vertical reading flow (Kicker $\to$ Headline $\to$ Narrative Prose $\to$ Core Disciplines $\to$ Credentials $\to$ Portrait Plate) with zero horizontal overflow down to 320px width.

---

## 4. Authoritative Content & Facts (`Details.docx`)
Every statement and figure is verified directly from `Details.docx`:
- **Headline**: *"Geomatics engineering grounded in real places and real decisions."*
- **Lead Paragraph**: Establishes identity, legal licensure, and academic anchor as Head of Department of Geomatics Engineering at Universal Engineering and Science College (UESC), Lalitpur.
- **Supporting Paragraph**: Details the problem domain across government ministries (Department of Roads, Ministry of Physical Infrastructure and Transport), provincial administrations (Gandaki, Bagmati), and rural municipalities (e.g. Gaumul, Ghiring, Chumnuwri, Purchaudi, Makwanpuragadhi, Patarasi).
- **Core Practice Disciplines**:
  1. `01 / GIS & Spatial Analysis` — Spatial modeling, Multi-Criteria Evaluation (MCE/AHP), geodatabase architecture, and digital municipal analytical profiles.
  2. `02 / Land Use Planning & Zoning` — Statutory parcel-level classification (kitta-wise), risk-sensitive municipal land zoning, and land pooling design under Nepal's Land Use Act 2076 & Regulation 2079.
  3. `03 / Remote Sensing & Photogrammetry` — High-resolution satellite analytics, UAV/drone aerial surveys, terrain extraction, and LULC change modeling.
  4. `04 / Geodetic Surveying & GNSS` — High-precision geodetic control networks, RTK/PPK positioning, and civil engineering infrastructure setting-out.
  5. `05 / Hydrology & Hazard Assessment` — Catchment delineation, river flood simulation, terrain slope hazard modeling, and multi-hazard disaster resilience mapping.
- **Verified Credentials**:
  - *Professional License*: Nepal Engineering Council (NEC) Reg. No. 221 Geomatics 'A' Category.
  - *Postgraduate Degree*: UNIGIS M.Sc. in Geographical Information Science & Systems (University of Salzburg, Austria) with Distinction / Outstanding Student Honor.
  - *Academic Leadership*: Head of Department, Universal Engineering and Science College (UESC).

---

## 5. Authentic Portrait & Visual Evidence
- **Asset**: `public/images/profile/sadhuram-gnss-workshop.webp` (with `sadhuram-gnss-workshop.jpg` fallback).
- **Provenance**: Extracted from `Details.docx` (Image 3), photographed using a Canon EOS 250D DSLR in January 2022.
- **Subject & Context**: Depicts Er. Sadhuram Lamichhane working at his engineering workstation during the Global Navigation Satellite System (GNSS) Training Workshop jointly organized by the Center for Spatial Information Science (CSIS) at The University of Tokyo, the International Committee on GNSS (ICG), and the Centre for Space Science and Geomatics Studies (CSSGS) at Tribhuvan University (IOE Pashchimanchal Campus), Pokhara.
- **Caption**:
  `POKHARA, NEPAL · JAN 2022`
  `Er. Sadhuram Lamichhane during the GNSS Workshop jointly organized by CSIS The University of Tokyo and CSSGS Tribhuvan University.`

---

## 6. Accessibility & Contrast Audit
- **Ink on Paper Contrast**:
  - Heading & Primary Body (`#171B19` on `#F2F1EC`): **15.2:1** (WCAG AAA compliant, threshold 7:1).
  - Secondary / Supporting Body (`#5F6561` on `#F2F1EC`): **5.1:1** (WCAG AA compliant, threshold 4.5:1).
  - Monospace Kicker / Index Numbers (`--accent-strong: #465D68` on `#F2F1EC`): **5.85:1** (WCAG AA compliant, threshold 4.5:1).
- **Semantic Structure**: `<section id="profile" aria-labelledby="profile-heading">`, `<header>`, `<h2>`, `<p>`, `<ul role="list">`, `<figure>`, `<figcaption>`.
- **Keyboard Navigation & Anchor Hooks**:
  - Hero `Explore Projects` binds to `#selected-projects` (clean anchor marker before Section 03).
  - Hero `Professional Profile` binds to `#profile` (smooth scroll to Section 02).
  - Zero broken links, zero 404 targets.
