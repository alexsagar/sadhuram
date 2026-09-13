"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollContextValue {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configureLenis = () => {
      const scrollY = window.scrollY;
      const wasStopped = lenisRef.current?.isStopped;
      lenisRef.current?.off("scroll", ScrollTrigger.update);
      lenisRef.current?.destroy();

      const lenis = new Lenis({
        duration: motionMediaQuery.matches ? 0 : 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: !motionMediaQuery.matches,
        touchMultiplier: 1.5,
        wheelMultiplier: 1.0,
        autoResize: true,
      });
      lenisRef.current = lenis;
      lenis.scrollTo(scrollY, { immediate: true });
      if (wasStopped) lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
    };
    configureLenis();

    // Drive Lenis RAF loop via GSAP's central ticker
    const updateTicker = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Intercept internal anchor clicks for smooth scrolling without breaking ScrollTrigger state
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          if (motionMediaQuery.matches) {
            (targetElement as HTMLElement).scrollIntoView({ behavior: "instant" });
          } else {
            lenisRef.current?.scrollTo(targetElement as HTMLElement, { offset: -24 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Listen to reduced motion changes dynamically
    motionMediaQuery.addEventListener("change", configureLenis);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      motionMediaQuery.removeEventListener("change", configureLenis);
      gsap.ticker.remove(updateTicker);
      lenisRef.current?.off("scroll", ScrollTrigger.update);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position on route changes and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    lenisRef.current?.scrollTo(target, options);
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  const getLenis = () => lenisRef.current;

  return (
    <SmoothScrollContext.Provider value={{ getLenis, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
