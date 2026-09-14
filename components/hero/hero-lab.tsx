"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import styles from "./hero-lab.module.css";

/**
 * CINEMATIC GEOGRAPHIC PARALLAX — /hero-lab prototype.
 *
 * Real geographic photography of Nepal's middle hills near Kavre, pre-composited into
 * depth planes and choreographed with restrained scroll-driven parallax.
 *
 * In accordance with D-024, D-025, D-026, and D-027:
 * - The primary physical-geography hero uses authentic photography and restrained parallax.
 * - Pseudo-contours derived from photo haze and arbitrary crosshairs have been removed.
 * - Physical photography is separated from analytical cartography; a clean architectural
 *   slot is provided for future verified GIS information.
 */

const smoothRange = (start: number, end: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

/** Percent of stage height each plane travels across the full scroll. Negative is upward. */
const PLANE_TRAVEL = {
  backdrop: -1.0,
  ridge: -2.4,
  terrain: -4.8,
  foreground: -7.6,
} as const;

const motionQuery = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => matchMedia(motionQuery).matches;

export default function HeroLab() {
  const root = useRef<HTMLElement>(null);
  const travel = useRef<HTMLElement>(null);
  const animated = useSyncExternalStore(subscribe, snapshot, () => false);
  const { getLenis } = useSmoothScroll();

  useEffect(() => {
    if (!animated || !root.current || !travel.current) return;
    const scope = root.current;

    const ctx = gsap.context((self) => {
      const planes = (Object.keys(PLANE_TRAVEL) as (keyof typeof PLANE_TRAVEL)[]).map(
        (name) => [self.selector!(`.${styles[name]}`), PLANE_TRAVEL[name]] as const
      );
      const textGroup = self.selector!(`.${styles.heroHeader}`);
      const veil = self.selector!(`.${styles.veil}`);
      const handoff = self.selector!(`.${styles.handoff}`);

      const update = (p: number) => {
        // Restrained vertical parallax per depth plane
        for (const [targets, distance] of planes) {
          gsap.set(targets, { yPercent: distance * p });
        }

        // Professional statement clears before landscape transitions
        const exit = smoothRange(0.42, 0.72, p);
        gsap.set(textGroup, {
          opacity: 1 - exit,
          y: -24 * exit,
          visibility: exit >= 1 ? "hidden" : "visible",
        });

        // Landscape softens tonally toward editorial paper
        const veilOpacity = Math.max(
          0.18 * smoothRange(0.38, 0.68, p),
          smoothRange(0.76, 0.98, p)
        );
        gsap.set(veil, { opacity: veilOpacity });

        // Clean analytical handoff indicator emerges as paper tone arrives
        gsap.set(handoff, {
          opacity: smoothRange(0.85, 0.96, p) * (1 - smoothRange(0.99, 1, p)),
        });

        scope.dataset.phase = p > 0.82 ? "paper" : "photo";
        scope.dataset.progress = p.toFixed(3);
      };

      const trigger = ScrollTrigger.create({
        id: "hero-parallax",
        trigger: travel.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });

      update(trigger.progress);
    }, root);

    ScrollTrigger.refresh();

    return () => {
      const before = document.getElementById("practice-test")?.getBoundingClientRect().top;
      ctx.revert();
      if (before !== undefined && before < window.innerHeight) {
        requestAnimationFrame(() => {
          const after = document.getElementById("practice-test")?.getBoundingClientRect().top;
          if (after !== undefined) {
            getLenis()?.scrollTo(window.scrollY + after - before, { immediate: true });
          }
        });
      }
    };
  }, [animated, getLenis]);

  return (
    <main ref={root} className={styles.lab} data-animated={animated}>
      <section ref={travel} className={styles.travel}>
        <div className={styles.frame}>
          {/* Responsive Photographic Plates:
              Using <picture> with media queries prevents mobile from requesting desktop plates,
              and prevents desktop from requesting the mobile crop. */}
          <div className={styles.mobileStage} aria-hidden="true">
            <picture className={styles.mobilePicture}>
              <source media="(max-width: 767px)" srcSet="/images/hero/hero-mobile.webp" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
                alt=""
                width="800"
                height="1200"
                className={styles.mobileImg}
              />
            </picture>
          </div>

          <div className={styles.stage} aria-hidden="true">
            <picture className={`${styles.plate} ${styles.backdrop}`}>
              <source media="(min-width: 768px)" srcSet="/images/hero/backdrop.webp" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
                alt=""
                width="1760"
                height="1467"
                fetchPriority="high"
                className={styles.plateImg}
              />
            </picture>

            <picture className={`${styles.plate} ${styles.ridge}`}>
              <source media="(min-width: 768px)" srcSet="/images/hero/ridge.webp" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
                alt=""
                width="1760"
                height="683"
                className={styles.plateImg}
              />
            </picture>

            <picture className={`${styles.plate} ${styles.terrain}`}>
              <source media="(min-width: 768px)" srcSet="/images/hero/terrain.webp" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
                alt=""
                width="1760"
                height="928"
                className={styles.plateImg}
              />
            </picture>

            <picture className={`${styles.plate} ${styles.foreground}`}>
              <source media="(min-width: 768px)" srcSet="/images/hero/foreground.webp" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
                alt=""
                width="1760"
                height="834"
                className={styles.plateImg}
              />
            </picture>
          </div>

          {/* Calmer Engineering Editorial Typographic Composition */}
          <div className={styles.heroHeader}>
            <div className={styles.identity}>
              <p className={styles.name}>Sadhuram Lamichhane</p>
              <p className={styles.role}>Geomatics Engineer &amp; GIS Expert</p>
            </div>

            <h1 className={styles.title}>
              <span>Geospatial analysis for land, </span>
              <span>infrastructure and planning.</span>
            </h1>

            <div className={styles.actions}>
              <div className={styles.buttons}>
                <a href="#practice-test" className={styles.primaryAction}>
                  Explore Projects
                </a>
                <a href="#practice-test" className={styles.secondaryAction}>
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Paper transition veil and clean architectural slot for future verified GIS layer */}
          <div className={styles.veil} aria-hidden="true" />
          <div className={styles.analyticalHandoff} data-analytical-slot aria-hidden="true" />
          <p className={styles.handoff} aria-hidden="true">
            Real terrain. Analytical cartography and spatial evidence follow.
          </p>
        </div>
      </section>

      <section className={styles.paper} id="practice-test">
        <div className={styles.paperInner}>
          <p className={styles.note}>Isolated Prototype Review · D-024 / D-025 / D-026 / D-027</p>
          <h2>Professional Practice</h2>
          <p>
            GIS, geomatics, and spatial analysis applied to land development, civil infrastructure,
            and municipal planning across Nepal.
          </p>
          <p className={styles.note}>
            Prototype layout only. Real geographic photography; pseudo-GIS graphics have been removed.
          </p>

          <details className={styles.source}>
            <summary>Geographic source, licence &amp; geospatial transition</summary>
            <p>
              “Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across hilltops.” by
              Eagle Vision IT, published in the WordPress Photo Directory under{" "}
              <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">
                CC0 1.0 Universal
              </a>
              . The photograph shows the middle hills near Kavre, Bagmati Province, Nepal. It was
              calibrated to the project’s cartographic-neutral palette and separated offline into depth
              planes for restrained parallax.
            </p>
            <p>
              In accordance with D-026, all former haze-derived pseudo-contours and unverified
              crosshair markers were removed from this prototype. Future analytical layers will be
              derived strictly from verified geospatial data (e.g. licensed DEM contours or cadastral
              surveys).
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
