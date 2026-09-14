# ARCHIVED EXPERIMENT: VERIFIED GIS / CARTOGRAPHIC HERO HANDOFF

> **STATUS**: ARCHIVED · NOT ACTIVE · NOT PUBLIC PORTFOLIO CONTENT  
> **Superseded By**: New Approved Hero Principle (Decisions `D-032`, `D-033`, `D-034`)  
> **Archival Date**: 2026-09-14  

---

## 1. Rationale for Archival

During Phase 3B, an authentic cartographic handoff was implemented in `/hero-lab` using verified Copernicus DEM GLO-30 elevation contours (`contours.svg` / `contours-mobile.svg`) and analytical shaded relief (`hillshade.webp`) on an Engineering Editorial specimen sheet.

Upon design evaluation, the standalone GIS cartographic handoff was determined to add technical demonstration without improving the visitor's understanding of Er. Sadhuram Lamichhane's professional portfolio. It created a "report-like" pause in the hero instead of introducing the engineer directly and memorably.

The approved direction establishes that **GIS visual evidence belongs contextually in real project case studies, project maps, UAV/LiDAR work, land-use plans, and geographic coverage sections**, rather than in a decorative or standalone hero sequence (`D-033`).

---

## 2. Archived Assets & Components

The following verified assets and components are preserved here for reference and potential future use in project case studies:

- `components/analytical-handoff.tsx`: The React specimen sheet component with neatline coordinates, technical specs grid, and 2 km scale bar.
- `components/analytical-handoff.module.css`: The Engineering Editorial CSS module.
- `public-gis-hero/contours.svg`: Precomputed 50 m minor / 200 m index contours (Copernicus DEM GLO-30 10 km crop).
- `public-gis-hero/contours-mobile.svg`: Precomputed 100 m contours for mobile devices.
- `public-gis-hero/hillshade.webp`: Analytical Lambertian shaded relief image (1000×1000, 13.4 KB).
- `public-gis-hero/metadata.json`: Geodetic metadata, bounding box, CRS EPSG:32645, and licensing terms.
- `scripts/terrain/preprocess_contours.py`: Python marching-squares and analytical hillshade generator.
- `docs/15-GIS-DATA-PROVENANCE.md`: Complete 16-section technical provenance documentation (archived for reference).

These assets are **NOT** loaded in production, **NOT** imported into the active hero, and **NOT** part of the public site bundle.
