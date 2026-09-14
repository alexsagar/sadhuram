/* eslint-disable @next/next/no-img-element */
import styles from "./analytical-handoff.module.css";

/**
 * Analytical Cartographic Handoff — Phase 3B Component.
 *
 * Renders verified Copernicus DEM GLO-30 contours and analytical shaded relief
 * for the Kavre middle hills region, Bagmati Province, Nepal.
 *
 * In accordance with:
 * - D-026: Removal of unverified pseudo-contours and crosshairs.
 * - D-027: Separation of physical photography from analytical GIS layers.
 * - D-028: Copernicus DEM GLO-30 Public (10 km crop) as the verified elevation source.
 * - D-029: Grouped SVG contours + subtle WebP paper hillshade.
 * - D-030: Honest REGIONAL classification (analytical handoff, not camera-registered overlay).
 * - D-031: Responsive mobile 100m contour optimization.
 */

export interface AnalyticalHandoffProps {
  className?: string;
}

export function AnalyticalHandoff({ className }: AnalyticalHandoffProps) {
  return (
    <figure
      className={`${styles.container} ${className ?? ""}`.trim()}
      data-analytical-slot
      aria-label="Analytical cartographic representation of Kavre middle hills"
    >
      <figcaption className={styles.srOnly}>
        Topographic map specimen of Kavrepalanchok middle hills, Nepal. Elevation ranges
        from 1,255 meters to 2,155 meters with 50-meter minor contours and 200-meter index contours
        derived from Copernicus DEM GLO-30, projected in EPSG:32645 UTM Zone 45N.
      </figcaption>

      <div className={styles.sheet}>
        {/* Left Column: Marginalia, Technical Metadata, Scale, and Provenance */}
        <div className={styles.marginalia}>
          <div className={styles.sheetHeader}>
            <p className={styles.seriesTag}>Topographic Specimen · 10 km × 10 km</p>
            <h2 className={styles.sheetTitle}>Kavre Middle Hills Terrain</h2>
            <p className={styles.sheetSubtitle}>
              Bagmati Province, Nepal · 27°40&apos;48&quot;N, 85°29&apos;24&quot;E
            </p>
          </div>

          <div className={styles.specGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Elevation Source</span>
              <span className={styles.specValue}>Copernicus DEM GLO-30</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Projected CRS</span>
              <span className={styles.specValue}>EPSG:32645 (UTM 45N)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Vertical Datum</span>
              <span className={styles.specValue}>EGM2008 (Orthometric)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Contour Interval</span>
              <span className={styles.specValue}>50 m (Index: 200 m)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Relief (Min / Max)</span>
              <span className={styles.specValue}>1,255 m – 2,155 m (900 m)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Illumination</span>
              <span className={styles.specValue}>Azimuth 315° · Alt 45°</span>
            </div>
          </div>

          <div className={styles.scaleSection}>
            <span className={styles.scaleLabel}>Graphic Scale (2 Kilometers)</span>
            <div className={styles.scaleBarWrapper}>
              <div>
                <div className={styles.scaleBar} aria-hidden="true">
                  <div className={styles.scaleSegmentBlack} />
                  <div className={styles.scaleSegmentWhite} />
                </div>
                <div className={styles.scaleTicks} aria-hidden="true">
                  <span>0</span>
                  <span>1 km</span>
                  <span>2 km</span>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.provenanceNotice}>
            <p>
              <strong>Provenance Notice (D-030):</strong> Elevation contours and analytical shaded
              relief are computed directly from verified Copernicus DEM GLO-30 30-meter postings.
              Presented as an authentic regional handoff to illustrate geospatial analysis methods;
              not a camera-registered overlay.
            </p>
          </aside>
        </div>

        {/* Right Column: Neatline Framed Map Plate */}
        <div className={styles.mapCol}>
          <div className={styles.neatlineFrame}>
            {/* Corner Coordinate Marginalia */}
            <span className={`${styles.coordCorner} ${styles.coordNW}`}>
              351 000 E · 3 068 000 N
            </span>
            <span className={`${styles.coordCorner} ${styles.coordNE}`}>
              361 000 E · 3 068 000 N
            </span>
            <span className={`${styles.coordCorner} ${styles.coordSW}`}>
              351 000 E · 3 058 000 N
            </span>
            <span className={`${styles.coordCorner} ${styles.coordSE}`}>
              361 000 E · 3 058 000 N
            </span>

            {/* Map Viewport: Hillshade + Vector Contours */}
            <div className={styles.mapViewport}>
              <img
                src="/gis/hero/hillshade.webp"
                alt=""
                width="1000"
                height="1000"
                className={styles.hillshadeImg}
                loading="lazy"
                decoding="async"
              />

              <picture className={styles.contourPicture}>
                <source
                  media="(max-width: 767px)"
                  srcSet="/gis/hero/contours-mobile.svg"
                  type="image/svg+xml"
                />
                <img
                  src="/gis/hero/contours.svg"
                  alt="Topographic contours of Kavre middle hills at 50 meter intervals with labeled index contours"
                  width="1000"
                  height="1000"
                  className={styles.contourImg}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <div className={styles.centerDatum} aria-hidden="true">
                <div className={styles.crosshair} />
                <span className={styles.centerLabel}>27.68°N 85.49°E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
