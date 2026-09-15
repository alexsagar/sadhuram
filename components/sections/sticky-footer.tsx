"use client";

import React from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

export default function StickyFooter() {
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, { offset: -32 });
    }
  };

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer
      id="site-footer"
      className="relative z-20 bg-[#121715] text-[#F2F1EC] min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-t border-[#232B28]"
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-[#232B28] pb-6 font-mono text-xs tracking-widest uppercase text-[#88908C]">
        <span>10 / Index & Governance</span>
        <button
          type="button"
          onClick={scrollToTop}
          className="hover:text-[#F2F1EC] transition-colors cursor-pointer flex items-center gap-1 focus:outline-hidden"
        >
          <span>Return to Top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>

      {/* Centerpiece Monograph Identity & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-[#88908C] mb-3">
            Professional Monograph
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[#F2F1EC] leading-tight">
            Er. Sadhuram Lamichhane
          </h2>
          <p className="text-lg sm:text-xl text-[#A2A9A5] mt-4 font-normal max-w-xl">
            Licensed Geomatics Engineer & GIS Expert bridging field geodesy, statutory land use classification, and spatial modeling across Nepal.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#88908C]">
            <span>NEC Reg. No. 221 Geomatics &apos;A&apos;</span>
            <span>UNIGIS M.Sc. (Salzburg)</span>
            <span>NEA Life Member 26768</span>
          </div>
        </div>

        {/* Directory Navigation */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#88908C] mb-4 pb-2 border-b border-[#232B28]">
            Directory Sections
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 font-mono text-xs">
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("profile")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                02 / Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("selected-projects")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                03 / Selected Projects
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("practice")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                04 / Areas of Practice
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("work-across-nepal")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                05 / Work Across Nepal
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("experience")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                06 / Experience
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("research")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                07 / Research
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("field-practice")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                08 / Field Practice
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="text-[#A2A9A5] hover:text-[#F2F1EC] transition-colors cursor-pointer"
              >
                09 / Contact
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="pt-6 border-t border-[#232B28] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#6E7571]">
        <p>
          © {new Date().getFullYear()} Er. Sadhuram Lamichhane. Engineering portfolio verified from Details.docx.
        </p>
        <p>
          CARTOGRAPHIC NEUTRAL · EPSG:4326 / WGS84 · KATHMANDU, NEPAL
        </p>
      </div>
    </footer>
  );
}
