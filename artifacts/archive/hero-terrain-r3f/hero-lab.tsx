"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { smoothRange, type HeroMotion } from "@/lib/hero/terrain";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import styles from "./hero-lab.module.css";

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });
const motionQuery = "(min-width: 768px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const media = matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const snapshot = () => matchMedia(motionQuery).matches;

export default function HeroLab() {
  const motion = useRef<HeroMotion>({ progress: 0, entrance: 1 });
  const root = useRef<HTMLElement>(null);
  const travel = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const handoff = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const capable = useSyncExternalStore(subscribe, snapshot, () => false);
  const animated = capable && !failed;
  const { getLenis } = useSmoothScroll();
  useEffect(() => {
    if (!travel.current || !content.current || !visual.current || !handoff.current) return;
    const state = motion.current;
    state.progress = 0;
    state.entrance = 1;
    if (!animated) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline();
      if (window.scrollY < 10) {
        state.entrance = 0;
        intro.to(state, { entrance: 1, duration: 1, delay: .6, onUpdate: () => state.render?.() }, 0)
          .from(content.current, { y: 10, duration: .8, ease: "power2.out" }, .95);
      }
      const update = (p: number) => {
        if (p > .01) { intro.progress(1).kill(); state.entrance = 1; }
        state.progress = p;
        state.render?.();
        gsap.set(content.current, { opacity: 1 - smoothRange(0, .25, p), y: -16 * smoothRange(0, .25, p), visibility: p >= .25 ? "hidden" : "visible" });
        gsap.set(visual.current, { opacity: 1 - smoothRange(.94, 1, p) });
        gsap.set(handoff.current, { opacity: smoothRange(.84, 1, p), y: 20 * (1 - smoothRange(.84, 1, p)) });
        if (root.current) root.current.dataset.progress = p.toFixed(3);
      };
      const trigger = ScrollTrigger.create({ id: "hero-lab", trigger: travel.current, start: "top top", end: "bottom bottom",
        onUpdate: self => update(self.progress), onRefresh: self => update(self.progress), invalidateOnRefresh: true });
      update(trigger.progress);
    }, root);
    ScrollTrigger.refresh();
    return () => {
      // Preserve the user's place relative to the paper section when travel collapses.
      const oldTop = document.getElementById("practice-test")?.getBoundingClientRect().top;
      ctx.revert();
      state.progress = 0;
      if (oldTop !== undefined && oldTop < window.innerHeight) {
        requestAnimationFrame(() => {
          const nextTop = document.getElementById("practice-test")?.getBoundingClientRect().top;
          if (nextTop !== undefined) getLenis()?.scrollTo(window.scrollY + nextTop - oldTop, { immediate: true });
        });
      }
    };
  }, [animated, getLenis]);
  return <main ref={root} className={styles.lab} data-animated={animated} data-ready={ready}>
    <section ref={travel} className={styles.travel}>
      <div className={styles.frame}>
        <picture className={styles.fallback}>
          <source media="(max-width: 767px)" srcSet="/terrain/relief-mobile.webp" />
          {/* Pre-rendered from the same source terrain; no runtime GIS parser. */}
          <img src="/terrain/relief-desktop.webp" alt="" width="1440" height="900" />
        </picture>
        <div ref={visual} className={styles.visual} aria-hidden="true">{animated && <HeroCanvas motion={motion} onReady={onReady} onFailure={onFailure} />}</div>
        <div ref={content} className={styles.content}>
          <p className={styles.name}>Sadhuram Lamichhane</p>
          <p className={styles.role}>Geomatics Engineer &amp; GIS Expert</p>
          <h1>Geospatial analysis for land, infrastructure and planning.</h1>
          <div className={styles.actions} aria-describedby="prototype-actions">
            <button type="button" disabled>Explore Projects</button>
            <button type="button" disabled>Download CV</button>
          </div>
          <p id="prototype-actions" className={styles.prototype}>Prototype actions · not connected</p>
        </div>
        <div ref={handoff} className={styles.handoff} aria-hidden="true"><span>Physical terrain. Spatial information.</span></div>
      </div>
    </section>
    <section className={styles.paper} id="practice-test">
      <p className={styles.note}>Isolated composition test</p>
      <h2>Professional Practice</h2>
      <p>GIS, geomatics and spatial analysis applied to land, infrastructure and planning.</p>
      <p className={styles.note}>Layout test only. Terrain is elevation-derived; no project or cadastral claim.</p>
      <details className={styles.source}><summary>Terrain source and licence</summary>
        <p>Produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.</p>
        <p>The organisations in charge of the Copernicus programme by law or by delegation do not incur any liability for any use of the Copernicus WorldDEM-30.</p>
        <p>No endorsement is implied. Derived crop and subsequent distribution remain subject to these notices and the <a href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Data/DEM/resources/license/License-COPDEM-30.pdf">Copernicus licence</a>.</p>
      </details>
    </section>
  </main>;
}
