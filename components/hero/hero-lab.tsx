"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import styles from "./hero-lab.module.css";

/**
 * CINEMATIC GEOGRAPHIC PARALLAX — /hero-lab.
 *
 * Real geographic photography of Nepal's middle hills near Kavre, pre-composited into
 * depth planes and choreographed with restrained scroll-driven parallax.
 *
 * In accordance with D-024, D-025, D-026, D-032, D-033, D-034, D-035, and D-036:
 * - Real photograph opens the experience in its authentic landscape state.
 * - Restrained scroll parallax conveys physical depth across four depth planes.
 * - Hero has one clear job: introduce Er. Sadhuram Lamichhane clearly and memorably.
 * - Standalone GIS analytical demonstration removed from the hero (D-032).
 * - Real GIS evidence lives contextually in project case studies and regional sections (D-033).
 * - Hero transitions smoothly and directly into the editorial portfolio (#F2F1EC) (D-034).
 * - Topographic contour linework is integrated as a subtle atmospheric motif during scroll (D-035).
 * - Contour lifecycle: invisible (0-20%), fades in (20-55%), peaks subtly (55-80%), fades out (80-98%) (D-036).
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
    let currentP = 0;

    const finePointer = matchMedia("(pointer: fine) and (min-width: 1024px)");
    const mouseTargets = [
      { sel: `.${styles.backdrop}`, mx: 1.0, my: 0.5 },
      { sel: `.${styles.ridge}`, mx: 2.5, my: 1.5 },
      { sel: `.${styles.terrain}`, mx: 5.0, my: 3.0 },
      { sel: `.${styles.contourOverlay}`, mx: 5.0, my: 3.0 },
      { sel: `.${styles.foreground}`, mx: 8.0, my: 4.0 },
    ];

    const onMouseMove = (e: MouseEvent) => {
      if (!finePointer.matches) return;
      const influence = Math.max(0, 1 - currentP / 0.12);
      if (influence <= 0) return;

      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      for (const item of mouseTargets) {
        const el = scope.querySelector(item.sel);
        if (el) {
          gsap.to(el, {
            x: -nx * item.mx * influence,
            y: -ny * item.my * influence,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const ctx = gsap.context((self) => {
      const planes = (Object.keys(PLANE_TRAVEL) as (keyof typeof PLANE_TRAVEL)[]).map(
        (name) => [self.selector!(`.${styles[name]}`), PLANE_TRAVEL[name]] as const
      );
      const textGroup = self.selector!(`.${styles.heroHeader}`);
      const veil = self.selector!(`.${styles.veil}`);
      const contours = self.selector!(`.${styles.contourOverlay}`);
      const scrollInvite = self.selector!(`.${styles.scrollInvite}`);

      const update = (p: number) => {
        currentP = p;

        // Reset mouse offsets once scroll travel commences
        if (p > 0.12) {
          for (const item of mouseTargets) {
            const el = scope.querySelector(item.sel);
            if (el) gsap.set(el, { x: 0, y: 0 });
          }
        }

        // Restrained vertical parallax per depth plane
        for (const [targets, distance] of planes) {
          gsap.set(targets, { yPercent: distance * p });
        }

        // Minimal scroll invitation clears cleanly as scroll begins (0.00 to 0.12)
        const inviteFade = Math.max(0, 1 - p / 0.12);
        gsap.set(scrollInvite, {
          opacity: inviteFade,
          y: -8 * (1 - inviteFade),
          visibility: inviteFade <= 0 ? "hidden" : "visible",
        });

        // Subtle topographic contour linework motif (0.20 to 0.55 fade-in, 0.80 to 0.98 fade-out)
        // D-035 / D-036: Peak opacity 0.35, gentle vertical travel synchronized with terrain
        const contourFadeIn = smoothRange(0.20, 0.55, p);
        const contourFadeOut = 1 - smoothRange(0.80, 0.98, p);
        const contourOpacity = 0.35 * contourFadeIn * contourFadeOut;
        gsap.set(contours, {
          opacity: contourOpacity,
          yPercent: -4.2 * p,
        });

        // Professional statement clears as parallax progresses (0.42 to 0.72)
        const exit = smoothRange(0.42, 0.72, p);
        gsap.set(textGroup, {
          opacity: 1 - exit,
          y: -24 * exit,
          visibility: exit >= 1 ? "hidden" : "visible",
        });

        // Landscape recedes and smoothly transitions to editorial paper (#F2F1EC) (0.68 to 0.98)
        const veilOpacity = smoothRange(0.68, 0.98, p);
        gsap.set(veil, { opacity: veilOpacity });

        scope.dataset.phase = p > 0.75 ? "paper" : "photo";
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
      window.removeEventListener("mousemove", onMouseMove);
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
            <img
              src="/images/hero/contours-overlay.svg"
              alt=""
              width="1000"
              height="1000"
              className={styles.mobileContour}
            />
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

            {/* Subtle topographic contour overlay — Geospatial motif (D-035 / D-036) */}
            {/* Positioned at z-index: 5, behind the foreground trees (z-index: 6) for physical depth draping */}
            <div className={styles.contourOverlay}>
              <img
                src="/images/hero/contours-overlay.svg"
                alt=""
                width="1000"
                height="1000"
                className={styles.contourImg}
              />
            </div>

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

          {/* Minimal scroll invitation: quiet, non-intrusive cue that fades out on scroll */}
          <div className={styles.scrollInvite} aria-hidden="true">
            <span className={styles.scrollLine} />
            <span className={styles.scrollText}>Scroll to explore</span>
          </div>

          {/* Paper transition veil: smoothly carries landscape into editorial background */}
          <div className={styles.veil} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.paper} id="practice-test">
        <div className={styles.paperInner}>
          <p className={styles.note}>Editorial Introduction · Direct Hero Transition (D-032 / D-033 / D-034)</p>
          <h2>Professional Practice</h2>
          <p>
            GIS, geomatics, and spatial analysis applied to land development, civil infrastructure,
            and municipal planning across Nepal.
          </p>
          <p className={styles.note}>
            Real geographic landscape hero. Standalone GIS demonstrations removed; authentic spatial
            evidence is integrated directly into project case studies.
          </p>

          <details className={styles.source}>
            <summary>Geographic photograph source &amp; portfolio GIS architecture</summary>
            <p>
              <strong>Photograph Source:</strong> “Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across hilltops.” by
              Eagle Vision IT, published in the WordPress Photo Directory under{" "}
              <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">
                CC0 1.0 Universal
              </a>
              . Location certainty is Category B (General Area Known): middle hills of Kavrepalanchok District, Bagmati Province, Nepal.
              The photograph was calibrated to the project’s cartographic-neutral palette and separated offline into depth planes for restrained parallax.
            </p>
            <p>
              <strong>Portfolio GIS Architecture (D-032 / D-033):</strong> The opening hero focuses strictly on
              clear, memorable professional introduction. Standalone decorative GIS demonstrations have been eliminated.
              Authentic geospatial evidence (including project maps, survey plans, UAV photogrammetry, and cadastral datasets)
              is presented contextually within specific project case studies and regional practice sections.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
