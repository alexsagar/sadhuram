"use client";

import React from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface DirectoryLink {
  num: string;
  label: string;
  id: string;
}

const DIRECTORY_LINKS: DirectoryLink[] = [
  { num: "01", label: "Genesis Editorial", id: "main-content" },
  { num: "02", label: "Profile & Engineering", id: "profile" },
  { num: "03", label: "Selected Projects", id: "selected-projects" },
  { num: "04", label: "Areas of Practice", id: "practice" },
  { num: "05", label: "Career Continuum", id: "experience" },
  { num: "06", label: "Research & Papers", id: "research" },
  { num: "07", label: "Field Practice", id: "field-practice" },
  { num: "08", label: "Direct Inquiries", id: "contact" },
];

export default function StickyFooter() {
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (id: string) => {
    if (id === "main-content") {
      scrollTo(0);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = id === "experience" ? 0 : -32;
      scrollTo(el, { offset });
    }
  };

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer
      id="site-footer"
      className="relative z-20 bg-transparent text-[#FCFCFC] border-t border-white/10 pt-14 pb-12 px-6 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-(--container-max)">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-5 font-mono text-xs tracking-widest uppercase text-[#777777]">
          <span>Index &amp; Colophon</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-3.5 py-1.5 border border-[#2B2B2B] bg-[#141414] hover:border-[#444444] text-[#D0D0D0] hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <span>Return to Top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        {/* Centerpiece Architecture: 3-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-12 border-b border-[#222222]">
          {/* Column 1: Identity & Official Engineering Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#FCFCFC] leading-tight font-heading">
                Er. Sadhuram Lamichhane
              </h2>
              <p className="font-mono text-xs text-[#888888] uppercase tracking-wider mt-2">
                Licensed Geomatics Engineer &middot; GIS Specialist
              </p>
              <p className="text-sm sm:text-base text-[#909090] mt-4 leading-relaxed max-w-md font-sans">
                Synthesizing satellite earth observation, geodetic precision, and statutory land governance across the rugged terrain of Nepal.
              </p>
            </div>

            {/* Verified Statutory Credentials (Preserving NEC Reg. No. 221 and UNIGIS Salzburg) */}
            <div className="mt-8 pt-5 border-t border-[#1C1C1C]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#666666] block mb-2.5">
                Verified Credentials
              </span>
              <ul className="font-mono text-xs space-y-1.5 text-[#A0A0A0]">
                <li>
                  <span className="text-[#FCFCFC] font-medium">NEC Reg. No. 221</span> &ldquo;A&rdquo; Geomatics
                </li>
                <li>
                  <span className="text-[#FCFCFC] font-medium">UNIGIS M.Sc. (Salzburg)</span> with Distinction
                </li>
                <li>
                  <span className="text-[#FCFCFC] font-medium">NEA Life Member</span> 26768
                </li>
                <li>
                  <span className="text-[#FCFCFC] font-medium">Head of Department</span> Geomatics, UESC
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Architectural Site Directory (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="pb-2.5 border-b border-[#222222] mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                Directory
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-1 font-mono text-xs">
              {DIRECTORY_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="w-full text-left py-1.5 px-2 hover:bg-[#161616] text-[#888888] hover:text-[#FCFCFC] transition-colors cursor-pointer flex items-center group"
                  >
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Geodetic Metadata & Specifications (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <div className="pb-2.5 border-b border-[#222222] mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                Geodetic Specifications
              </span>
            </div>

            <dl className="font-mono text-xs space-y-2.5">
              <div className="border-b border-[#1C1C1C] pb-1.5">
                <dt className="text-[10px] uppercase tracking-wider text-[#606060]">Horizontal Datum</dt>
                <dd className="text-[#CCCCCC] mt-0.5">WGS 84 / EPSG:4326</dd>
              </div>
              <div className="border-b border-[#1C1C1C] pb-1.5">
                <dt className="text-[10px] uppercase tracking-wider text-[#606060]">Grid Projection</dt>
                <dd className="text-[#CCCCCC] mt-0.5">MUTM 84° E (Nepal)</dd>
              </div>
              <div className="border-b border-[#1C1C1C] pb-1.5">
                <dt className="text-[10px] uppercase tracking-wider text-[#606060]">Base Coordinate</dt>
                <dd className="text-[#CCCCCC] mt-0.5">27°40&apos;44&quot; N, 85°19&apos;18&quot; E</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-[#606060]">Vertical Reference</dt>
                <dd className="text-[#CCCCCC] mt-0.5">Mean Sea Level (MSL Nepal)</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Legal & Colophon Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#666666]">
          <p>
            &copy; {new Date().getFullYear()} Er. Sadhuram Lamichhane. Verified from Details.docx.
          </p>
          <p className="tracking-wider uppercase text-[11px]">
            CARTOGRAPHIC NEUTRAL &middot; EPSG:4326 / WGS84 &middot; KATHMANDU, NEPAL
          </p>
        </div>
      </div>
    </footer>
  );
}
