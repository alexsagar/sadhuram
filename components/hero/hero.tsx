"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./hero.module.css";

function smoothRange(start: number, end: number, value: number): number {
  if (value <= start) return 0;
  if (value >= end) return 1;
  const t = (value - start) / (end - start);
  return t * t * (3 - 2 * t);
}

export interface HeroProps {
  projectsHref?: string;
  profileHref?: string;
}

export default function Hero({
  projectsHref = "#selected-projects",
  profileHref = "#profile",
}: HeroProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const travel = useRef<HTMLElement | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isMobile || !travel.current || !frame.current) {
      return;
    }

    const ctx = gsap.context((self) => {
      const scope = self.selector ? self.selector : (s: string) => root.current?.querySelectorAll(s);
      const textGroup = scope(`.${styles.heroHeader}`);
      const veil = scope(`.${styles.veil}`);
      const contours = scope(`.${styles.contourOverlay}`);
      const scrollInvite = scope(`.${styles.scrollInvite}`);

      const planes: [Element[], number][] = [
        [Array.from(scope(`.${styles.backdrop}`)), 8],
        [Array.from(scope(`.${styles.ridge}`)), 16],
        [Array.from(scope(`.${styles.terrain}`)), 24],
        [Array.from(scope(`.${styles.foreground}`)), 32],
      ];

      let currentP = 0;

      // Restrained Desktop Mouse Micro-Depth (D-037)
      // Damped offsets: backdrop 1px, ridge 2.5px, terrain/contours 5px, foreground 8px
      const mouseTargets = [
        { sel: `.${styles.backdrop}`, factor: 1.0 },
        { sel: `.${styles.ridge}`, factor: 2.5 },
        { sel: `.${styles.terrain}`, factor: 5.0 },
        { sel: `.${styles.contourOverlay}`, factor: 5.0 },
        { sel: `.${styles.foreground}`, factor: 8.0 },
      ];

      const onMouseMove = (e: MouseEvent) => {
        // Fade out cursor micro-depth as user scrolls into the story (0.0 to 0.12)
        if (currentP > 0.12) return;
        const fade = 1 - currentP / 0.12;

        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;

        for (const item of mouseTargets) {
          const el = root.current?.querySelector(item.sel);
          if (!el) continue;
          gsap.to(el, {
            x: normX * item.factor * fade,
            y: normY * item.factor * fade,
            duration: 1.4,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      };

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) {
        window.addEventListener("mousemove", onMouseMove, { passive: true });
      }

      const update = (p: number) => {
        currentP = p;

        // Reset mouse offsets once scroll travel commences
        if (p > 0.12) {
          for (const item of mouseTargets) {
            const el = root.current?.querySelector(item.sel);
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

        // Subtle topographic contour linework motif (0.10 to 0.35 fade-in, 0.45 to 0.72 fade-out)
        // D-035 / D-036: Peak opacity 0.35, gentle vertical travel synchronized with terrain
        const contourFadeIn = smoothRange(0.10, 0.35, p);
        const contourFadeOut = 1 - smoothRange(0.48, 0.75, p);
        const contourOpacity = 0.35 * contourFadeIn * contourFadeOut;
        gsap.set(contours, {
          opacity: contourOpacity,
          yPercent: -4.2 * p,
        });

        // Professional statement clears as parallax progresses (0.08 to 0.36)
        const exit = smoothRange(0.08, 0.36, p);
        gsap.set(textGroup, {
          opacity: 1 - exit,
          y: -28 * exit,
          visibility: exit >= 1 ? "hidden" : "visible",
        });

        // Landscape recedes and smoothly transitions to editorial paper (#F2F1EC) (0.35 to 0.85)
        const veilOpacity = smoothRange(0.35, 0.85, p);
        gsap.set(veil, { opacity: veilOpacity });

        if (root.current) {
          root.current.dataset.phase = p > 0.5 ? "paper" : "photo";
          root.current.dataset.progress = p.toFixed(3);
        }
      };

      const trigger = ScrollTrigger.create({
        id: "hero-parallax",
        trigger: root.current,
        start: "top top",
        end: "+=100%",
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });

      update(trigger.progress);

      return () => {
        if (finePointer) {
          window.removeEventListener("mousemove", onMouseMove);
        }
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.heroRoot} ref={root} data-variant="geographic-parallax">
      <section
        className={styles.travel}
        ref={travel}
        aria-label="Er. Sadhuram Lamichhane — Geospatial Analysis and Geomatics Engineering"
      >
        <div className={styles.frame} ref={frame}>
          {/* Mobile Background: Single responsive image asset (< 768px) with subtle contour motif */}
          <div className={styles.mobileStage} aria-hidden="true">
            <picture className={styles.mobilePicture}>
              <source media="(max-width: 767px)" srcSet="/images/hero/hero-mobile.webp" />
              <img
                src="/images/hero/hero-mobile.webp"
                alt=""
                width="1125"
                height="1500"
                fetchPriority="high"
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

          {/* Desktop Parallax Stage: Pre-composited landscape plates (>= 768px) */}
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
                <a href={projectsHref} className={styles.primaryAction}>
                  Explore Projects
                </a>
                <a href={profileHref} className={styles.secondaryAction}>
                  Professional Profile
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
    </div>
  );
}
