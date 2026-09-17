"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface NavItem {
  id: string;
  label: string;
  short: string;
  desktopOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "profile", label: "Profile", short: "Profile", desktopOnly: true },
  { id: "selected-projects", label: "Projects", short: "Projects" },
  { id: "practice", label: "Practice", short: "Practice" },
  { id: "experience", label: "Experience", short: "Exp" },
  { id: "research", label: "Research", short: "Research" },
  { id: "contact", label: "Contact", short: "Contact" },
];

export default function FloatingNavbar() {
  const [active, setActive] = useState<number>(-1);
  const [isFooter, setIsFooter] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Track active section based on viewport scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // In the hero top area — keep navbar hidden for a pristine hero opening
      if (scrollY < 220) {
        setActive(-1);
        setIsFooter(false);
        return;
      }

      // Hide navbar when user enters site-footer so it doesn't overlap footer directory
      const footerEl = document.getElementById("site-footer");
      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect();
        if (fRect.top <= 80) {
          setIsFooter(true);
        } else {
          setIsFooter(false);
        }
      }

      let currentActive = -1;
      const targetY = 120; // Detection threshold below navbar

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
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      const offset = id === "experience" && isDesktop ? 0 : -72;
      scrollTo(element, { offset });
    }
  };

  const isVisible = active >= 0 && !isFooter;

  return (
    <nav
      aria-label="Primary Directory Navigation"
      className={`fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-0.5 sm:gap-1 bg-[#121212]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_32px_rgba(0,0,0,0.5)] rounded-full p-1 sm:p-1.5 pointer-events-auto">
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(index, item.id)}
              className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-hidden whitespace-nowrap ${
                item.desktopOnly ? "hidden sm:inline-flex" : "inline-flex"
              } items-center justify-center ${
                isActive
                  ? "bg-white text-[#121212] font-semibold shadow-xs"
                  : "text-white/65 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
