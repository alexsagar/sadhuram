"use client";

import React from "react";

export default function GenesisHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative z-10 min-h-[95vh] lg:min-h-screen flex flex-col justify-between items-center text-center bg-transparent text-white px-5 sm:px-8 lg:px-12 pt-28 pb-14 overflow-hidden"
    >
      {/* Centerpiece Genesis Editorial Hero — Centered Middle */}
      <div className="relative z-10 my-auto mx-auto max-w-4xl pt-8 pb-12 flex flex-col items-center text-center">
        <header className="space-y-4 text-center">
          <h1
            id="hero-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.04] sm:leading-[0.98] text-white drop-shadow-sm text-center break-words"
          >
            Sadhuram Lamichhane
          </h1>
          <p className="text-lg sm:text-2xl lg:text-3xl text-white/85 font-normal tracking-tight drop-shadow-xs text-center">
            Geomatics Engineer <span className="text-white/40 mx-1.5 sm:mx-2">·</span> GIS Expert
          </p>
        </header>

        <div className="mt-6 sm:mt-8 max-w-2xl mx-auto text-center">
          <p className="text-base sm:text-xl lg:text-2xl font-normal text-white/90 leading-relaxed text-balance drop-shadow-xs text-center">
            Geospatial analysis, precision spatial modeling, and land infrastructure planning in Nepal.
          </p>
        </div>

        {/* Clean Genesis Pill CTA Suite — Centered */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 mx-auto">
          <a
            href="#selected-projects"
            className="inline-flex items-center justify-center min-h-[48px] px-8 bg-white text-[#0E120B] rounded-full text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-[#F4F8F3] hover:scale-[1.02] shadow-lg shadow-black/30 cursor-pointer"
          >
            <span>Explore Projects</span>
            <span className="ml-2" aria-hidden="true">↓</span>
          </a>
          <a
            href="#practice"
            className="inline-flex items-center justify-center min-h-[48px] px-8 bg-white/[0.08] text-white border border-white/20 rounded-full text-sm font-medium tracking-tight backdrop-blur-md transition-all duration-200 hover:bg-white/[0.15] hover:border-white/40 cursor-pointer"
          >
            <span>Areas of Practice</span>
          </a>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 font-mono text-xs text-white/60">
        <span>KATHMANDU / LALITPUR, NEPAL</span>
        <span className="uppercase tracking-wider">SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
