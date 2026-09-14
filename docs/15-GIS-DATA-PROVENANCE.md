# 15. GIS DATA PROVENANCE & CARTOGRAPHIC HANDOFF SPECIFICATION

> **STATUS**: ARCHIVED EXPERIMENT · NOT PART OF THE PUBLIC HERO  
> **Superseded By**: Decisions `D-032`, `D-033`, and `D-034` (Simplified Direct Hero → Editorial Portfolio Transition)  
> **Reference Only**: Preserved as technical reference and geodetic documentation for future project case studies.  
> **Project**: Er. Sadhuram Lamichhane Professional Portfolio  
> **Relevant Decisions**: `D-020`, `D-024`, `D-025`, `D-026`, `D-027`, `D-028`, `D-029`, `D-030`, `D-031`, `D-032`, `D-033`, `D-034`  
> **Applicable Routes**: None (Archived from active prototype)

---

## 1. Purpose & Scope

This document preserves the geospatial provenance, geodetic parameters, cartographic specifications, and technical reference data for the **archived Phase 3B Verified GIS / Cartographic Handoff experiment**.

Under decisions **`D-032`** and **`D-033`**, the standalone GIS cartographic handoff was removed from the public hero experience. The hero transitions directly from real geographic photography into the editorial portfolio. GIS visual evidence will be presented contextually in project case studies, surveying imagery, and thematic mapping sections. This document is retained solely for data provenance and algorithmic reproducibility.

---

## 2. Photograph Provenance & Location Certainty Assessment

| Parameter | Value / Description |
| :--- | :--- |
| **Photograph Title** | *“Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across hilltops.”* |
| **Photographer / Contributor** | Eagle Vision IT |
| **Repository** | WordPress Photo Directory (`photo/805643550b`) |
| **Original URL** | `https://wordpress.org/photos/photo/805643550b/` |
| **License** | Creative Commons Zero (CC0 1.0 Universal) Public Domain Dedication |
| **Geographic Region** | Kavrepalanchok District middle hills, Bagmati Province, Nepal |
| **Approximate Centroid** | 27.68° N, 85.49° E |
| **Location Certainty Category** | **Category B: GENERAL AREA KNOWN** |
| **Camera Metadata (EXIF)** | Maker: Canon; Model: EOS 80D; Focal Length: 70mm; Aperture: f/8.0. Exact GNSS coordinates, camera altitude, and shooting azimuth were not recorded in the public EXIF payload. |

---

## 3. Relationship Classification: REGIONAL

Under decision **`D-027`** and **`D-030`**, the relationship between the physical landscape photograph and the cartographic data is formally classified as:

$$\mathbf{PROVENANCE\ CLASSIFICATION:\ REGIONAL}$$

### Operational Meaning:
1. **Broader Area Alignment**: The DEM data and analytical contour geometry are sampled directly from the verified middle hills region of Kavrepalanchok District where the photograph was captured.
2. **No Faux-Registration**: The contour lines are **NOT** artificially overlaid, warped, or projected onto the perspective landscape photography. Faking pixel-perfect alignment without rigorous photogrammetric resection is prohibited by professional geomatics standards.
3. **Engineering Editorial Specimen Sheet**: The analytical layer is rendered as an authentic cartographic sheet (neatline framing, UTM coordinate ticks, graphic scale bar, and technical metadata block) on the project's `#F2F1EC` paper ground.
4. **Honest Handoff Narrative**: The transition guides the viewer from physical landscape contemplation (*Real Geography*) through depth planes (*Spatial Depth*) into scientific measurement (*Measured Geography*) and professional cartography (*Cartographic Information*).

---

## 4. Elevation Dataset Specification

The elevation data powering Phase 3B is sourced from the European Space Agency (ESA) and Airbus Defence and Space **Copernicus DEM GLO-30 Public** dataset.

| Parameter | Specification |
| :--- | :--- |
| **Dataset Title** | Copernicus Digital Elevation Model (GLO-30 Public) |
| **Data Release** | 2021 Public Release |
| **Tile Identifier** | `Copernicus_DSM_COG_10_N27_00_E085_00_DEM` |
| **Distribution Source** | AWS Open Data Registry (`s3://copernicus-dem-30m/`) |
| **Primary S3 URI** | `https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N27_00_E085_00_DEM/Copernicus_DSM_COG_10_N27_00_E085_00_DEM.tif` |
| **Nominal Ground Resolution** | 1.0 arc-second (~30 meters at the equator; ~27 meters at 27.68°N) |
| **Relative Vertical Accuracy** | < 2.0 meters (90% confidence level) |
| **Absolute Vertical Accuracy** | < 4.0 meters (90% confidence level) |

---

## 5. Tile & Geodetic Boundary Coordinates

The extracted specimen represents a contiguous $10.0\text{ km} \times 10.0\text{ km}$ terrain block centered over the Kavre middle hills:

### Geographic Coordinates (WGS84 / EPSG:4326):
- **Centroid**: $27.68000^\circ\text{ N},\ 85.49000^\circ\text{ E}$ ($27^\circ 40' 48''\text{ N},\ 85^\circ 29' 24''\text{ E}$)
- **Northwest Corner**: $27.72567^\circ\text{ N},\ 85.43867^\circ\text{ E}$ ($27^\circ 43' 32''\text{ N},\ 85^\circ 26' 19''\text{ E}$)
- **Northeast Corner**: $27.72567^\circ\text{ N},\ 85.54129^\circ\text{ E}$ ($27^\circ 43' 32''\text{ N},\ 85^\circ 32' 29''\text{ E}$)
- **Southwest Corner**: $27.63432^\circ\text{ N},\ 85.43867^\circ\text{ E}$ ($27^\circ 38' 04''\text{ N},\ 85^\circ 26' 19''\text{ E}$)
- **Southeast Corner**: $27.63432^\circ\text{ N},\ 85.54129^\circ\text{ E}$ ($27^\circ 38' 04''\text{ N},\ 85^\circ 32' 29''\text{ E}$)

---

## 6. Projected Coordinate Reference System (CRS)

To guarantee distortion-free metric distance calculations and conformal angle preservation:

- **Projected CRS**: `EPSG:32645` (WGS 84 / UTM Zone 45N)
- **Projection Type**: Transverse Mercator
- **Central Meridian**: $87^\circ 00' 00''\text{ E}$
- **False Easting**: $500,000.0\text{ m}$
- **False Northing**: $0.0\text{ m}$
- **Scale Factor at Central Meridian**: $0.9996$
- **Bounding Box in UTM 45N**:
  - Easting Range: $351,192\text{ m E}$ to $361,192\text{ m E}$ ($\Delta X = 10,000.0\text{ m}$)
  - Northing Range: $3,058,041\text{ m N}$ to $3,068,041\text{ m N}$ ($\Delta Y = 10,000.0\text{ m}$)

---

## 7. Vertical Datum & Geoid Model

- **Vertical Datum**: Earth Gravitational Model 2008 (`EGM2008`)
- **Height System**: Orthometric Heights ($H$) referenced to Mean Sea Level (MSL)
- **Unit of Measure**: International Metre ($\text{m}$)

---

## 8. Elevation Statistics & Relief Metrics

Extracted over the $129 \times 129$ sample grid ($78.125\text{ m}$ posting interval):

| Metric | Metric Value | Cartographic Signification |
| :--- | :--- | :--- |
| **Minimum Elevation** | $1,254.6\text{ m}$ | Valley drainage basin |
| **Maximum Elevation** | $2,155.0\text{ m}$ | Upper ridgeline crest |
| **Total Topographic Relief** | $900.4\text{ m}$ | Typical high-relief middle hills geomorphology |
| **Mean Elevation** | $1,682.3\text{ m}$ | Cultivated slope and terrace zones |
| **Median Elevation** | $1,694.0\text{ m}$ | Mid-elevation settlement zone |

---

## 9. Preprocessing Methodology & Reproducibility

The preprocessing pipeline is fully deterministic and version-controlled under `scripts/terrain/preprocess_contours.py`.

```
Copernicus DEM (COG)
       │
       ▼
 [Raster Crop] ─── 10 km × 10 km @ (85.49°E, 27.68°N) in UTM 45N
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[Analytical Hillshade]                [Marching Squares Contours]
 - Lambertian analytical model         - 50 m minor intervals
 - Solar Azimuth: 315° (NW)            - 200 m index contours
 - Solar Altitude: 45°                 - Haloed elevation labels
 - Palette: Cartographic Neutral       - SVG polylines grouped
       │                                         │
       ▼                                         ▼
public/gis/hero/hillshade.webp         public/gis/hero/contours.svg
     (13.4 KB)                              (98.1 KB uncompressed)
```

### Script Execution:
```bash
python scripts/terrain/preprocess_contours.py
```
*Dependencies: Pure `numpy` and `PIL` (Pillow). Zero external GIS binary runtime dependencies required for website deployment.*

---

## 10. Contour Generation & Cartographic Specifications

Contour lines are extracted via an analytical Marching Squares algorithm with linear edge interpolation and polyline chain continuous tracing.

### Cartographic Standards Applied:
1. **Contour Intervals**:
   - **Desktop Minor / Intermediate**: $50.0\text{ m}$ interval.
   - **Index / Master Contours**: $200.0\text{ m}$ interval ($1,400\text{ m}, 1,600\text{ m}, 1,800\text{ m}, 2,000\text{ m}$).
   - **Mobile Minor Contours**: $100.0\text{ m}$ interval (optimized for cellular bandwidth and GPU vector rendering).
2. **Symbology & Styling**:
   - Intermediate contours: `stroke: var(--contour, #9AA39E); stroke-width: 0.85; stroke-opacity: 0.65; fill: none;`
   - Index contours: `stroke: var(--contour-ink, #5F6561); stroke-width: 1.45; stroke-opacity: 0.95; fill: none;`
3. **Elevation Index Labels**:
   - Monospace typography (`var(--font-mono)`) at $11\text{ px}$.
   - Halo effect: $3.5\text{ px}$ background mask (`#F2F1EC`) to ensure legibility across intersecting contours.

---

## 11. Analytical Shaded Relief Parameters

To provide intuitive spatial depth beneath the contour lines, shaded relief is computed using analytical Lambertian illumination:

$$\cos(i) = \sin(\text{alt}) \cdot \cos(\text{slope}) + \cos(\text{alt}) \cdot \sin(\text{slope}) \cdot \cos(\text{az} - \text{aspect})$$

- **Solar Azimuth**: $315.0^\circ$ (Northwest — conventional cartographic light source).
- **Solar Altitude**: $45.0^\circ$ above the horizon.
- **Vertical Exaggeration**: $1.0\times$ (natural, undistorted slope representation).
- **Palette Mapping**: Blended into the Cartographic Neutral paper ground (`#F2F1EC`), avoiding high-contrast black shadows or artificial saturation.

---

## 12. Responsive Asset Strategy & Transfer Payload

All GIS assets are generated statically at build time and served from `public/gis/hero/`. No client-side GeoTIFF parsing, WebGL shaders, or heavy WASM binaries are loaded in the browser.

| Asset File | Format | Desktop Transfer | Mobile Transfer | Budget Limit | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `contours.svg` | SVG (Vector) | 98.1 KB (20.4 KB gzip) | *Excluded on mobile* | — | PASS |
| `contours-mobile.svg` | SVG (Vector) | *Excluded on desktop* | 48.6 KB (10.1 KB gzip) | — | PASS |
| `hillshade.webp` | WebP (1000×1000) | 13.4 KB | 13.4 KB | — | PASS |
| `metadata.json` | JSON | 1.3 KB | 1.3 KB | — | PASS |
| **Total Transfer** | — | **111.5 KB** | **62.0 KB** | **≤ 150 KB (Desktop) / ≤ 75 KB (Mobile)** | **PASS** |

---

## 13. Component Implementation & Accessibility Architecture

Implemented in `components/hero/analytical-handoff.tsx` and `components/hero/analytical-handoff.module.css`.

### Semantic Structure:
- `<figure role="region" aria-label="Analytical cartographic representation of Kavre middle hills">`
  - `<figcaption className={styles.srOnly}>`: Screen-reader descriptive text detailing the geographic region, elevation bounds, and coordinate system.
  - `<div className={styles.sheet}>`:
    - `.marginalia`: Title block, technical specs grid, graphic scale bar, and honest provenance notice.
    - `.mapCol`: Neatline framing with 4-corner coordinate marks, intermediate UTM coordinate ticks, shaded relief image, and responsive contour `<picture>`.

### Accessibility Compliance:
- Text contrast ratios exceed $7.5:1$ on `#F2F1EC` paper ground.
- Touch targets in the document flow meet WCAG $2.2\text{ AA}$ ($44 \times 44\text{ px}$).
- Screen readers receive the complete semantic description of the terrain without encountering unannounced decorative vector paths.

---

## 14. Motion & Scroll Choreography Architecture

In `components/hero/hero-lab.tsx`, GSAP ScrollTrigger manages the narrative progression across a desktop scroll travel distance of `180svh`:

| Scroll Progress ($p$) | Visual Phase | Component Actions | User Experience Narrative |
| :--- | :--- | :--- | :--- |
| **0.00 – 0.40** | `photo` | Text header fully visible; photographic plates parallaxing vertically. | **Real Geography**: Authentic landscape contemplative state. |
| **0.40 – 0.60** | `transition` | Text header exits (`y: -24px`, opacity $1 \to 0$); paper veil softly enters. | **Spatial Depth**: Restrained parallax reveals Himalayan morphology. |
| **0.60 – 0.84** | `analytical` | Cartographic sheet emerges (opacity $0 \to 1$, scale $0.97 \to 1.00$); veil reaches paper tone. | **Measured Geography**: Photography softens; elevation contours emerge. |
| **0.84 – 0.96** | `analytical` | Full analytical specimen plate visible for inspection; scale and coordinates sharp. | **Cartographic Information**: Authentic technical data, scale, and geodetic specs. |
| **0.96 – 1.00** | `paper` | Sheet rests and transitions cleanly into `#practice-test` editorial section. | **Editorial Portfolio**: Seamless arrival on `#F2F1EC` paper ground. |

### Mobile & Reduced Motion Fallback:
- On mobile (`< 768px`) and under `prefers-reduced-motion: reduce`, scroll pinning is disabled.
- The hero frame renders naturally in normal document flow.
- The `AnalyticalHandoff` component renders statically directly beneath the hero header.

---

## 15. Legal Licensing, Intellectual Property & Attribution

1. **Landscape Photograph**:
   - Contributor: Eagle Vision IT.
   - License: Creative Commons CC0 1.0 Universal (Public Domain Dedication).
   - Warranty: Free for commercial and non-commercial adaptation without mandatory attribution (attribution retained voluntarily for scientific provenance).
2. **Copernicus DEM Data**:
   - Copyright Notice: *Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.*
   - Permitted Use: Free and open access for commercial and non-commercial research, education, and professional display under the Copernicus WorldDEM-30 License Agreement.

---

## 16. Audit Log & Decision Traceability

- **`D-024`**: Rejection of synthetic 3D rock terrain mesh.
- **`D-025`**: Adoption of real geographic photography with restrained GSAP parallax.
- **`D-026`**: Strict prohibition of decorative pseudo-GIS graphics.
- **`D-027`**: Mandatory separation of physical landscape photography from analytical GIS layers.
- **`D-028`**: Selection of Copernicus DEM GLO-30 Public (10 km Kavre crop) as verified elevation source.
- **`D-029`**: Implementation via precomputed SVG vector contours and WebP shaded relief.
- **`D-030`**: Formal classification of the spatial relationship as `REGIONAL` (unregistered honest handoff).
- **`D-031`**: Mobile document flow strategy with 100 m contour optimization.
