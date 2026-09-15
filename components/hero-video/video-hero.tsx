"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./video-hero.module.css";

function smoothRange(start: number, end: number, value: number): number {
  if (value <= start) return 0;
  if (value >= end) return 1;
  const t = (value - start) / (end - start);
  return t * t * (3 - 2 * t);
}

const WORDS = [
  "Geospatial",
  "Intelligence",
  "for",
  "land,",
  "infrastructure",
  "and",
  "planning.",
];

const UPPER_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const LOWER_GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";

interface ReelChar {
  char: string;
  reel: string[];
  globalIdx: number;
}

const SENTENCE_DATA: { word: string; chars: ReelChar[] }[] = (() => {
  let counter = 0;
  return WORDS.map((word) => ({
    word,
    chars: word.split("").map((char) => {
      const idx = counter++;
      if (char === "," || char === ".") {
        return { char, reel: [char], globalIdx: idx };
      }
      const isUpper = char >= "A" && char <= "Z";
      const glyphPool = isUpper ? UPPER_GLYPHS : LOWER_GLYPHS;
      const reel: string[] = [];
      for (let s = 0; s < 4; s++) {
        const glyphIdx = (idx * 7 + s * 11 + 3) % glyphPool.length;
        reel.push(glyphPool[glyphIdx]);
      }
      reel.push(char);
      return { char, reel, globalIdx: idx };
    }),
  }));
})();

export interface VideoHeroProps {
  profileHref?: string;
  practiceHref?: string;
  projectsHref?: string;
}

export default function VideoHero({
  profileHref = "#profile",
  practiceHref = "#engineering-practice",
  projectsHref = "#selected-projects",
}: VideoHeroProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const travel = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || !travel.current) {
      return;
    }

    const ctx = gsap.context((self) => {
      const scope = (s: string) =>
        self.selector ? self.selector(s) : root.current?.querySelectorAll(s);

      const navBar = scope(`.${styles.liquidNav}`);
      const roomFrame = scope(`.${styles.roomFrameLayer}`);
      const mountainBg = scope(`.${styles.mountainBgLayer}`);
      const mountainSil = scope(`.${styles.mountainSilLayer}`);
      const textGroup = scope(`.${styles.heroHeader}`);
      const scrollInvite = scope(`.${styles.scrollInvite}`);
      const progressBar = scope(`.${styles.progressBarFill}`);
      const largeName = scope(`.${styles.largeNameLayer}`);
      const veil = scope(`.${styles.veil}`);
      const charSlots = scope(`.${styles.charSlot}`);
      const charReels = scope(`.${styles.charReel}`);

      // High-speed letter-by-letter scrolled reel animation (Completes in ~3.2-3.4s)
      const introDelay = 0.22;
      const charStagger = 0.046;
      const charRollDuration = 0.38;

      if (charSlots && charReels) {
        if (prefersReducedMotion) {
          charSlots.forEach((slot: Element) => gsap.set(slot, { opacity: 1 }));
          charReels.forEach((reel: Element) => {
            const el = reel as HTMLElement;
            const len = parseInt(el.dataset.reelLength || "1", 10);
            if (len > 1) {
              gsap.set(reel, { yPercent: -((len - 1) / len) * 100 });
            }
          });
        } else {
          charSlots.forEach((slot: Element) => gsap.set(slot, { opacity: 0 }));
          charReels.forEach((reel: Element) => gsap.set(reel, { yPercent: 0 }));

          charReels.forEach((reel: Element) => {
            const el = reel as HTMLElement;
            const idx = parseInt(el.dataset.charReel || "0", 10);
            const len = parseInt(el.dataset.reelLength || "1", 10);
            const slot = el.parentElement;
            const startTime = introDelay + idx * charStagger;

            if (slot) {
              gsap.to(slot, {
                opacity: 1,
                duration: 0.08,
                delay: startTime,
                ease: "power1.in",
              });
            }

            if (len > 1) {
              gsap.to(reel, {
                yPercent: -((len - 1) / len) * 100,
                duration: charRollDuration,
                delay: startTime,
                ease: "power2.out",
              });
            }
          });
        }
      }

      let currentP = 0;
      let mouseResetDone = false;
      let currentPhase = "";

      // Restrained Desktop Mouse Micro-Depth (Pre-cached elements to avoid querySelector in scroll loop)
      const mouseTargets = [
        { sel: `.${styles.mountainBgLayer}`, factor: 2.0 },
        { sel: `.${styles.largeNameLayer}`, factor: 3.5 },
        { sel: `.${styles.mountainSilLayer}`, factor: 2.0 },
        { sel: `.${styles.roomFrameLayer}`, factor: 6.0 },
      ];

      const mouseElements = mouseTargets.map((item) => ({
        el: root.current?.querySelector(item.sel) as HTMLElement | null,
        factor: item.factor,
      }));

      const onMouseMove = (e: MouseEvent) => {
        if (currentP > 0.15) return;
        const fade = 1 - currentP / 0.15;
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;

        for (const item of mouseElements) {
          if (!item.el) continue;
          gsap.to(item.el, {
            x: normX * item.factor * fade,
            y: normY * item.factor * fade,
            duration: 1.4,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      };

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer && !isMobile) {
        window.addEventListener("mousemove", onMouseMove, { passive: true });
      }

      const update = (p: number) => {
        currentP = p;

        // Reset micro-depth once upon scroll travel (no repeated calls or DOM lookups)
        if (p > 0.15) {
          if (!mouseResetDone) {
            for (const item of mouseElements) {
              if (item.el) gsap.set(item.el, { x: 0, y: 0 });
            }
            mouseResetDone = true;
          }
        } else {
          mouseResetDone = false;
        }

        // 1. Bottom Progress Bar (0.00 to 1.00)
        gsap.set(progressBar, {
          scaleX: p,
        });

        // 2. Navigation Bar: Hidden during hero, reveals only when Section 02 profile appears (p >= 0.86)
        const navT = smoothRange(0.86, 0.96, p);
        gsap.set(navBar, {
          opacity: navT,
          y: -14 * (1 - navT),
          pointerEvents: navT > 0.5 ? "auto" : "none",
          visibility: navT <= 0.01 ? "hidden" : "visible",
        });

        // 3. Minimal Scroll Invitation Cue (0.00 to 0.10)
        const inviteFade = Math.max(0, 1 - p / 0.10);
        gsap.set(scrollInvite, {
          opacity: inviteFade,
          y: -8 * (1 - inviteFade),
          visibility: inviteFade <= 0 ? "hidden" : "visible",
        });

        // 4. Horizontal Scrolled Statement Exit (0.00 to 0.28) - 100% GPU composited (no blur filter)
        const titleT = 1 - smoothRange(0.0, 0.28, p);
        gsap.set(textGroup, {
          opacity: titleT,
          y: (1 - titleT) * -20,
          scale: 0.97 + titleT * 0.03,
          visibility: titleT <= 0.01 ? "hidden" : "visible",
        });

        // 5. Move towards room window & Dolly through aperture (0.00 to 0.45) - (no blur filter)
        const roomScaleProgress = smoothRange(0.0, 0.45, p);
        const roomOpacity = 1 - smoothRange(0.22, 0.45, p);
        gsap.set(roomFrame, {
          scale: 1.0 + 2.4 * roomScaleProgress,
          opacity: roomOpacity,
          visibility: roomOpacity <= 0 ? "hidden" : "visible",
        });

        // 6. Sunset Himalayan Mountains Approach (0.05 to 0.85)
        const mountainScale = 1.0 + 0.16 * smoothRange(0.08, 0.85, p);
        gsap.set(mountainBg, {
          scale: mountainScale,
        });
        gsap.set(mountainSil, {
          scale: mountainScale,
        });

        // 7. Mountain Silhouette Cutout (Always 100% opaque to physically occlude letters behind mountain peaks)
        gsap.set(mountainSil, {
          opacity: 1,
        });

        // 8. Large Name Typography Reveal (0.32 to 0.74) - (no blur filter, no letterSpacing reflow)
        const nameT = smoothRange(0.32, 0.74, p);
        gsap.set(largeName, {
          opacity: nameT,
          y: 260 * (1 - nameT),
          scale: 0.96 + nameT * 0.04,
          visibility: nameT <= 0.01 ? "hidden" : "visible",
        });

        // 9. Editorial Paper Release into Section 02 - disabled veil to prevent blank dead gap
        gsap.set(veil, { opacity: 0 });

        // 10. Phase Transition only on state change (no continuous per-frame dataset string mutations)
        const nextPhase =
          p > 0.88 ? "paper" : p > 0.45 ? "outside-mountains" : "room-interior";
        if (currentPhase !== nextPhase) {
          currentPhase = nextPhase;
          if (root.current) root.current.dataset.phase = nextPhase;
        }
      };

      const trigger = ScrollTrigger.create({
        id: "hero-video-scrub",
        trigger: travel.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });

      update(trigger.progress);

      return () => {
        if (finePointer && !isMobile) {
          window.removeEventListener("mousemove", onMouseMove);
        }
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className={styles.heroRoot}
      ref={root}
      data-variant="sunset-window-hero"
      data-subsystem="himalayan-sunset-reveal"
    >
      <section
        className={styles.travel}
        ref={travel}
        aria-label="Er. Sadhuram Lamichhane — Himalayan Sunset Window to Mountain Panorama Hero"
      >
        <div className={styles.stickyViewport}>
          {/* Interactive Cinematic Stage */}
          <div className={styles.stage} aria-hidden="true">
            {/* Layer 1: Himalayan Sunset Mountain Panorama (Deepest Background) */}
            <div className={styles.mountainBgLayer}>
              <img
                src="/media/hero-window/sunset-mountains-base.webp"
                alt=""
                width={1920}
                height={1080}
                className={styles.landscapeImage}
              />
            </div>

            {/* Layer 2: Warm Ambient Scrim Gradient (From demo: #1a0f0a tones) */}
            <div className={styles.scrim} />

            {/* Layer 3: Large Architectural Personal Name Reveal (Behind glowing mountain peaks) */}
            <div className={styles.largeNameLayer}>
              <p className={styles.largeKicker}>Geomatics &amp; Earth Observation</p>
              <h2 className={styles.largeFirstName}>Sadhuram</h2>
              <h2 className={styles.largeLastName}>Lamichhane</h2>
            </div>

            {/* Layer 4: Mountain Silhouette Cutout (Occludes Large Name) */}
            <div className={styles.mountainSilLayer}>
              <img
                src="/media/hero-window/sunset-mountains-silhouette.webp"
                alt=""
                width={1920}
                height={1080}
                className={styles.mountainSilImg}
              />
            </div>

            {/* Layer 5: Architectural Room Window Frame (Dollies forward on scroll) */}
            <div className={styles.roomFrameLayer}>
              <img
                src="/media/hero-window/sunset-window-frame.webp"
                alt=""
                width={1920}
                height={1080}
                className={styles.roomFrameImg}
              />
            </div>

            {/* Layer 7: Editorial Paper Veil */}
            <div className={styles.veil} />
          </div>

          {/* Horizontal Scrolled-Letter Statement Reveal */}
          <div
            className={styles.heroHeader}
            aria-label="Geospatial Intelligence for land, infrastructure and planning."
          >
            <h1 className={styles.scrolledSentence} aria-hidden="true">
              {SENTENCE_DATA.map((wordObj, wIdx) => (
                <span key={wIdx} className={styles.wordBlock}>
                  {wordObj.chars.map((charObj) => (
                    <span
                      key={charObj.globalIdx}
                      className={styles.charSlot}
                      data-char-idx={charObj.globalIdx}
                    >
                      <span className={styles.charGhost} aria-hidden="true">
                        {charObj.char}
                      </span>
                      <span
                        className={styles.charReel}
                        data-char-reel={charObj.globalIdx}
                        data-reel-length={charObj.reel.length}
                      >
                        {charObj.reel.map((glyph, gIdx) => (
                          <span key={gIdx} className={styles.charGlyph}>
                            {glyph}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <span className="sr-only">
              Geospatial Intelligence for land, infrastructure and planning.
            </span>
          </div>

          {/* Minimal Scroll Invitation Cue */}
          <div className={styles.scrollInvite} aria-hidden="true">
            <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              className={styles.scrollIcon}
              aria-hidden="true"
            >
              <path
                d="M7 1 L7 17 M2 12 L7 17 L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Scroll Progress Bar at Bottom (From demo) */}
          <div className={styles.progressBarTrack} aria-hidden="true">
            <div className={styles.progressBarFill} />
          </div>
        </div>
      </section>

    </div>
  );
}
