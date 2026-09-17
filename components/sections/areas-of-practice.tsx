"use client";

import React from "react";
import Image from "next/image";

interface Discipline {
  num: string;
  title: string;
  scope: string;
  deliverables: string;
}

const DISCIPLINES: Discipline[] = [
  {
    num: "01",
    title: "GIS & Spatial Analysis",
    scope: "Enterprise geodatabase architecture, spatial multi-criteria evaluation (MCE/AHP), and digital municipal profiling.",
    deliverables: "Geo-DBMS schema, spatial suitability models, thematic atlas plates.",
  },
  {
    num: "02",
    title: "Land Use Planning & Zoning",
    scope: "Statutory parcel-level (kitta-wise) classification and zoning compliance under Nepal's Land Use Act 2076 & Regulation 2079.",
    deliverables: "Cadastral superimposition, statutory land zoning bylaws, ward-level map books.",
  },
  {
    num: "03",
    title: "Geodetic Surveying & GNSS",
    scope: "High-order geodetic control networks, static and kinematic GNSS baseline processing, and detailed engineering route surveys.",
    deliverables: "Control point registers, longitudinal alignment profiles, topographic DPR maps.",
  },
  {
    num: "04",
    title: "Remote Sensing & Photogrammetry",
    scope: "Multi-temporal satellite image interpretation, land use/land cover (LULC) transition detection, and optical spectral analysis.",
    deliverables: "Supervised classification maps, vegetation indices, urban sprawl tracking.",
  },
  {
    num: "05",
    title: "UAV & LiDAR Mapping",
    scope: "Low-altitude drone surveys, dense 3D point cloud generation, high-resolution DSM/DTM extraction, and slope cut/fill calculation.",
    deliverables: "Georeferenced orthomosaics, digital surface models, volumetric balance sheets.",
  },
  {
    num: "06",
    title: "Hazard & Disaster Resilience Mapping",
    scope: "Terrain slope stability modeling, hydrological catchment delineation, and infrastructure vulnerability assessment.",
    deliverables: "Risk-sensitive land zoning overlays, flood simulation rasters, reservoir risk registers.",
  },
];

export default function AreasOfPractice() {
  return (
    <section
      id="practice"
      aria-labelledby="practice-heading"
      className="relative z-10 min-h-screen flex flex-col justify-center bg-[#121212] text-white py-16 md:py-24 border-t border-[#303030] overflow-hidden"
    >
      {/* 4K Landscape image fitted cleanly to the viewport without over-stretching */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/images/practice/practice-section-bg.webp"
          alt="Dramatic mountain ridges and glacial river valley of Nepal"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-[0.72] contrast-[1.08]"
        />
        {/* Ambient atmospheric gradient scrim for high contrast and crystal-clear topography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/85 via-[#121212]/70 to-[#121212]/90" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12 my-auto">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-white/15 pb-4 font-mono text-xs tracking-widest uppercase">
          <h2 id="practice-heading" className="font-medium text-white">
            Areas of Practice
          </h2>
          <p className="text-white/50">Disciplinary Scope</p>
        </header>

        {/* Section Headline */}
        <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-balance leading-snug text-white max-w-2xl drop-shadow-xs">
            Technical competencies applied across national infrastructure & statutory planning.
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed font-mono">
            Ground-truthed datum, geodetic precision, and statutory compliance across Nepal.
          </p>
        </div>

        {/* 3x2 Compact Architectural Grid: Fits viewport naturally without vertical stretching */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {DISCIPLINES.map((item) => (
            <article
              key={item.num}
              className="bg-black/30 backdrop-blur-md border border-white/12 p-5 sm:p-6 rounded-xl hover:border-white/30 hover:bg-black/45 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-white/50 mb-2.5">
                  <span className="font-semibold text-white/90">{item.num}</span>
                  <span className="uppercase tracking-wider text-[10px]">Specialization</span>
                </div>
                <h4 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {item.scope}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/10 font-mono text-[11px]">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-0.5">
                  Key Deliverables
                </span>
                <p className="text-white/85 leading-snug">
                  {item.deliverables}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
