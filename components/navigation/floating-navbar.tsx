"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface NavItem {
  id: string;
  label: string;
  short: string;
  num: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "profile", label: "Profile", short: "Profile", num: "02" },
  { id: "selected-projects", label: "Projects", short: "Projects", num: "03" },
  { id: "practice", label: "Practice", short: "Practice", num: "04" },
  { id: "work-across-nepal", label: "Map", short: "Map", num: "05" },
  { id: "experience", label: "Experience", short: "Exp", num: "06" },
  { id: "research", label: "Research", short: "Research", num: "07" },
  { id: "contact", label: "Contact", short: "Contact", num: "09" },
];

export default function FloatingNavbar() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollTo } = useSmoothScroll();

  // 1. Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active, isVisible]);

  // 2. Hide in hero, show once hero fades away (scrolled past hero into Section 02)
  useEffect(() => {
    const handleScroll = () => {
      const profileEl = document.getElementById("profile");
      if (!profileEl) {
        // Fallback: show after 1 viewport height
        setIsVisible(window.scrollY > window.innerHeight * 0.9);
        return;
      }

      const profileRect = profileEl.getBoundingClientRect();
      // When top of Profile reaches upper viewport area, hero has faded out
      const passedHero = profileRect.top <= window.innerHeight * 0.75;
      setIsVisible(passedHero);

      // Track active section based on proximity to center of viewport
      let currentActive = 0;
      const targetY = window.innerHeight * 0.4;

      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY) {
            currentActive = i;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (index: number, id: string) => {
    setActive(index);
    const element = document.getElementById(id);
    if (element) {
      scrollTo(element, { offset: -32 });
    }
  };

  return (
    <nav
      aria-label="Floating Directory Navigation"
      className={`fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div
        ref={containerRef}
        className="relative flex items-center bg-[#F2F1EC]/95 dark:bg-[#171B19]/95 backdrop-blur-md border border-[#D8D6CD] dark:border-[#2E3532] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full p-1 sm:p-1.5"
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              type="button"
              onClick={() => handleNavClick(index, item.id)}
              className={`relative z-10 flex items-center justify-center px-2.5 sm:px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer focus:outline-hidden whitespace-nowrap ${
                isActive
                  ? "text-[#F2F1EC] dark:text-[#171B19] font-medium"
                  : "text-[#5F6561] hover:text-[#171B19] dark:hover:text-[#F2F1EC]"
              }`}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden text-[11px]">{item.short}</span>
            </button>
          );
        })}

        {/* Sliding Active Indicator Pill */}
        <div
          style={{
            width: indicatorStyle.width,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
          className="absolute top-1 bottom-1 left-0 rounded-full bg-[#171B19] dark:bg-[#F2F1EC] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
        />
      </div>
    </nav>
  );
}
