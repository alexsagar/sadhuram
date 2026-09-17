"use client";

import React from "react";
import Image from "next/image";

interface ProjectItem {
  num: string;
  title: string;
  year: string;
  location: string;
  role: string;
  client: string;
  summary: string;
  image: string;
  alt: string;
  tag: string;
  metric: string;
}

const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    title: "Dudhkoshi Reservoir Rim Risk Register",
    year: "2026",
    location: "Khotang, Okhaldhunga & Solukhumbu",
    role: "Geospatial Analyst / LiDAR Modeling",
    client: "BGC Engineering / ADB / DKJVCL",
    summary:
      "Community exposure modeling and landslide hazard assessment along the 31.5 km reservoir perimeter using aerial LiDAR and spatial terrain analytics for dam safety planning.",
    image: "/images/practice/practice-04-terrain.webp",
    alt: "Shaded relief terrain surface showing steep valley slopes and drainage network along reservoir rim",
    tag: "LiDAR & Hazard Modeling",
    metric: "31.5 km Rim · Aerial LiDAR",
  },
  {
    num: "02",
    title: "Narayanghat–Mugling Highway (NH44) Slope Stabilization",
    year: "2026",
    location: "Chitwan, NH44 Corridor",
    role: "Team Leader / UAV Survey Expert",
    client: "Road Division Bharatpur (DoR)",
    summary:
      "High-resolution UAV aerial mapping, dense point cloud extraction, and volumetric cut/fill estimation across steep landslide zones at Tuin Khola and Namsi Khola.",
    image: "/images/practice/practice-03-survey.webp",
    alt: "Field survey and instrument setup for highway geotechnical alignment and slope monitoring",
    tag: "UAV & Geotechnical",
    metric: "NH44 Corridor · Point Clouds",
  },
  {
    num: "03",
    title: "National EV Public Charging Infrastructure Master Plan",
    year: "2024–2025",
    location: "Nationwide Corridors, Nepal",
    role: "GIS Specialist / Spatial Modeler",
    client: "Water & Energy Commission Secretariat (WECS)",
    summary:
      "Nationwide spatial optimization using Multi-Criteria Evaluation (MCE) to model power grid capacity, traffic density, and terrain constraints for EV fast-charging stations.",
    image: "/images/practice/practice-01-gis.webp",
    alt: "ArcGIS spatial modeling and thematic highway network analysis for national energy infrastructure",
    tag: "Spatial Analysis & Energy",
    metric: "Nationwide MCE · Grid Siting",
  },
  {
    num: "04",
    title: "Bagmati River Basin Improvement Project (BRBIP)",
    year: "2024–2025",
    location: "Kathmandu Valley, Nepal",
    role: "Geomatics Engineer",
    client: "HPCIDBC / Asian Development Bank (ADB)",
    summary:
      "Design supervision and geodetic integration aligning parcel-level cadastral boundaries with river training walls, green corridors, and riparian buffer zones.",
    image: "/images/practice/practice-02-landuse.webp",
    alt: "Engineering planning session reviewing urban river corridor alignment and cadastral overlays",
    tag: "River Cadastre & Planning",
    metric: "Cadastral Realignment · Buffer",
  },
  {
    num: "05",
    title: "Risk-Sensitive Land Use Plan & Municipal Zoning",
    year: "2026",
    location: "Gaumul & Purchaudi",
    role: "Team Leader / GIS Expert",
    client: "Municipal Executives & MoFAGA",
    summary:
      "Statutory parcel-level classification across 10 statutory land categories under Nepal's Land Use Act 2076 & Regulation 2079, supported by hazard-weighted terrain analysis.",
    image: "/images/profile/sadhuram-gnss-workshop.webp",
    alt: "Technical team working session reviewing municipal spatial zoning classifications",
    tag: "Statutory Land Zoning",
    metric: "10 Land Classes · Act 2076",
  },
];

export default function SelectedProjects() {
  const p1 = PROJECTS[0];
  const p2 = PROJECTS[1];
  const p3 = PROJECTS[2];
  const p4 = PROJECTS[3];
  const p5 = PROJECTS[4];

  return (
    <section
      id="selected-projects"
      aria-labelledby="selected-projects-heading"
      className="relative z-10 bg-[#F8F8F8] text-[#121212] py-20 md:py-28 border-t border-[#E0E0E0]"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[#121212]/12 pb-5 font-mono text-xs tracking-widest uppercase">
          <h2 id="selected-projects-heading" className="font-medium text-[#121212]">
            Selected Projects
          </h2>
          <p className="text-[#121212]/50">Applied Engineering &amp; Spatial Research</p>
        </header>

        {/* Section Lead Narrative */}
        <div className="pt-8 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.12] text-[#121212] max-w-2xl">
              Major national infrastructure & risk modeling.
            </h3>
          </div>
          <p className="text-sm sm:text-base text-[#121212]/70 max-w-md leading-relaxed">
            Statutory municipal land zoning, nationwide highway corridors, aerial LiDAR terrain analytics, and river training DPRs across Nepal.
          </p>
        </div>

        {/* Bento Grid: 2 Large Feature Tiles (Top) + 3 Equal Complementary Tiles (Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 pt-2">
          {/* Bento Tile 1: Hero Large Tile (7 cols) */}
          <article className="group md:col-span-7 bg-white rounded-2xl border border-[#121212]/10 overflow-hidden flex flex-col justify-between hover:border-[#121212]/25 hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E7EAE3]">
              <Image
                src={p1.image}
                alt={p1.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 z-10 font-mono text-[11px] uppercase tracking-wider bg-[#121212]/85 text-white px-3 py-1 rounded-sm">
                {p1.tag}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow space-y-4">
              <div>
                <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-[#121212]/50 mb-1.5">
                  <span>{p1.num} · {p1.location}</span>
                  <span>{p1.year}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-[#121212]">
                  {p1.title}
                </h4>
                <p className="mt-2 text-sm text-[#121212]/70 leading-relaxed">
                  {p1.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#121212]/8 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#121212]/60">
                <span>Role: <strong className="font-medium text-[#121212]">{p1.role}</strong></span>
                <span className="font-semibold text-[#121212]/85">{p1.metric}</span>
              </div>
            </div>
          </article>

          {/* Bento Tile 2: Secondary Feature Tile (5 cols) */}
          <article className="group md:col-span-5 bg-white rounded-2xl border border-[#121212]/10 overflow-hidden flex flex-col justify-between hover:border-[#121212]/25 hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden bg-[#E7EAE3]">
              <Image
                src={p2.image}
                alt={p2.alt}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 z-10 font-mono text-[11px] uppercase tracking-wider bg-[#121212]/85 text-white px-3 py-1 rounded-sm">
                {p2.tag}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow space-y-4">
              <div>
                <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-[#121212]/50 mb-1.5">
                  <span>{p2.num} · {p2.location}</span>
                  <span>{p2.year}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-[#121212]">
                  {p2.title}
                </h4>
                <p className="mt-2 text-sm text-[#121212]/70 leading-relaxed">
                  {p2.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#121212]/8 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#121212]/60">
                <span>Role: <strong className="font-medium text-[#121212]">{p2.role}</strong></span>
                <span className="font-semibold text-[#121212]/85">{p2.metric}</span>
              </div>
            </div>
          </article>

          {/* Bento Tile 3: EV Master Plan (4 cols) */}
          <article className="group md:col-span-4 bg-white rounded-2xl border border-[#121212]/10 overflow-hidden flex flex-col justify-between hover:border-[#121212]/25 hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7EAE3]">
              <Image
                src={p3.image}
                alt={p3.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-wider bg-[#121212]/85 text-white px-2.5 py-0.5 rounded-sm">
                {p3.tag}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between grow space-y-3">
              <div>
                <div className="flex items-baseline justify-between gap-2 font-mono text-xs text-[#121212]/50 mb-1">
                  <span>{p3.num} · {p3.location}</span>
                  <span>{p3.year}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium tracking-tight text-[#121212] leading-snug">
                  {p3.title}
                </h4>
                <p className="mt-2 text-xs text-[#121212]/70 leading-relaxed line-clamp-3">
                  {p3.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#121212]/8 font-mono text-[11px] text-[#121212]/60 space-y-1">
                <div className="break-words">Client: <strong className="font-medium text-[#121212]">{p3.client}</strong></div>
                <div className="text-[#121212]/80 font-semibold">{p3.metric}</div>
              </div>
            </div>
          </article>

          {/* Bento Tile 4: Bagmati River Basin (4 cols) */}
          <article className="group md:col-span-4 bg-white rounded-2xl border border-[#121212]/10 overflow-hidden flex flex-col justify-between hover:border-[#121212]/25 hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7EAE3]">
              <Image
                src={p4.image}
                alt={p4.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-wider bg-[#121212]/85 text-white px-2.5 py-0.5 rounded-sm">
                {p4.tag}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between grow space-y-3">
              <div>
                <div className="flex items-baseline justify-between gap-2 font-mono text-xs text-[#121212]/50 mb-1">
                  <span>{p4.num} · {p4.location}</span>
                  <span>{p4.year}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium tracking-tight text-[#121212] leading-snug">
                  {p4.title}
                </h4>
                <p className="mt-2 text-xs text-[#121212]/70 leading-relaxed line-clamp-3">
                  {p4.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#121212]/8 font-mono text-[11px] text-[#121212]/60 space-y-1">
                <div className="break-words">Client: <strong className="font-medium text-[#121212]">{p4.client}</strong></div>
                <div className="text-[#121212]/80 font-semibold">{p4.metric}</div>
              </div>
            </div>
          </article>

          {/* Bento Tile 5: Risk-Sensitive Land Zoning (4 cols) */}
          <article className="group md:col-span-4 bg-white rounded-2xl border border-[#121212]/10 overflow-hidden flex flex-col justify-between hover:border-[#121212]/25 hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7EAE3]">
              <Image
                src={p5.image}
                alt={p5.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-wider bg-[#121212]/85 text-white px-2.5 py-0.5 rounded-sm">
                {p5.tag}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between grow space-y-3">
              <div>
                <div className="flex items-baseline justify-between gap-2 font-mono text-xs text-[#121212]/50 mb-1">
                  <span>{p5.num} · {p5.location}</span>
                  <span>{p5.year}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium tracking-tight text-[#121212] leading-snug">
                  {p5.title}
                </h4>
                <p className="mt-2 text-xs text-[#121212]/70 leading-relaxed line-clamp-3">
                  {p5.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#121212]/8 font-mono text-[11px] text-[#121212]/60 space-y-1">
                <div className="break-words">Client: <strong className="font-medium text-[#121212]">{p5.client}</strong></div>
                <div className="text-[#121212]/80 font-semibold">{p5.metric}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
