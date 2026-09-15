# Content Architecture

## 1. Primary Navigation
The navigation reflects professional rigor and provides direct paths to core proof points:
- **Home (`/`)**: High-level synthesis, spatial hero, key domains, selected landmark projects, geographic footprint.
- **About (`/about`)**: Background, engineering philosophy, geodetic foundation, education, credentials, professional affiliations.
- **Projects (`/projects`)**: Filterable, deep-dive archive of spatial analysis, drone surveying, hazard modeling, and master planning projects.
- **Experience (`/experience`)**: Chronological and role-based record of leadership in consultancies, government projects, and field missions.
- **Research & Publications (`/research`)**: Academic papers, conference proceedings, technical reports, and working studies.
- **Training & Recognition (`/training`)**: Capacity building, university lectures, workshops delivered to engineers, awards, and professional milestones.
- **Contact (`/contact`)**: Inquiries for consulting, advisory roles, and academic collaboration.

**Primary Call to Action (CTA)**:
- `Download Official CV` (Direct link to verified PDF document).

---

## 2. Homepage Content Structure (Implemented Architecture)

```
01. HERO (IMMERSIVE)
    - Cinematic real Nepal landscape video with keyframe-driven scroll scrub
    - Architectural name reveal occluded by pixel-aligned mountain cutout
    - Direct, smooth transition into Section 02 without gap or veil

02. PROFILE & ENGINEERING PRACTICE (CALM / VISUAL)
    - Calm editorial statement: "Turning spatial data into practical decisions."
    - Concise 2-sentence verified introduction
    - Curated 01–04 visual engineering practice sequence with verified imagery

03. SELECTED PROJECTS (IMMERSIVE / HORIZONTAL)
    - Desktop vertical scroll driving horizontal project spread (ScrollTrigger + Lenis)
    - 5 flagship projects: Dudhkoshi LiDAR, Narayanghat NH44, National EV MCE, Bagmati BRBIP, Municipal Land Zoning
    - Mobile vertical stack fallback

04. AREAS OF PRACTICE (CALM)
    - 6-discipline typographic matrix (GIS, Land Use, Surveying, Remote Sensing, UAV/LiDAR, Hazard Resilience)
    - Scope descriptions and concrete deliverable summaries

05. WORK ACROSS NEPAL (SPATIAL / STICKY)
    - Authentic Nepal administrative vector map (EPSG:4326)
    - 14 verified project and field locations across 7 provinces
    - Desktop sticky map + interactive location roster

06. EXPERIENCE (CALM)
    - Curated editorial timeline of 7 pivotal career roles
    - Progression toward academic leadership as Head of Department at UESC

07. RESEARCH & PUBLICATIONS (EDITORIAL)
    - Journal publication roster featuring 5 peer-reviewed papers and conference proceedings
    - Verified outbound DOI links

08. TEACHING / TRAINING / FIELD PRACTICE (PHOTOGRAPHIC)
    - 3-plate composition of authentic photography: Total Station field survey, CSIS GNSS workshop, VUCL GIS training

09. CONTACT / CLOSING STATEMENT (CALM)
    - Editorial invitation: "Let's discuss land, mapping, and spatial decisions."
    - Direct communication coordinates and academic post

10. FULL-VIEWPORT STICKY FOOTER (IMMERSIVE CLOSING)
    - Dark graphite (#121715) architectural monograph conclusion
    - Complete directory navigation and cartographic colophon
```


08. TEACHING, FIELD TRAININGS & CAPACITY BUILDING
    - Institutional training programs for government officers and junior engineers
    - University teaching modules and practical field bootcamps

09. CONTACT & ADVISORY ENGAGEMENT
    - Direct contact channels, institutional affiliation, consulting inquiry form/details

10. FOOTER
    - Cartographic metadata (datum, projection reference, coordinates of Kathmandu/Nepal)
    - Copyright, navigational links, and professional social profiles (LinkedIn, ResearchGate, ORCID)
```

*Note: In Phase 1, only the architectural skeleton and design foundation are initialized. Content will be populated systematically from `Details.docx` in subsequent phases.*
