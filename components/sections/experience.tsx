"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface Role {
  id: string;
  period: string;
  yearNum: string;
  title: string;
  organization: string;
  client?: string;
  location: string;
  sector: "infrastructure" | "municipal" | "academia";
  sectorLabel: string;
  scope: string;
  deliverables: string[];
}

const ROLES: Role[] = [
  {
    id: "uesc-hod",
    period: "2022 — PRESENT",
    yearNum: "2022+",
    title: "Head of Department (Geomatics Engineering)",
    organization: "Universal Engineering & Science College (UESC)",
    location: "Chakupat, Lalitpur",
    sector: "academia",
    sectorLabel: "Academia",
    scope:
      "Departmental leadership, geodetic curriculum administration, GNSS/GIS lab expansion, and undergraduate research supervision across earth observation and spatial modeling.",
    deliverables: ["Departmental Leadership", "Curriculum Administration", "Geodesy & GIS Lab"],
  },
  {
    id: "dudhkoshi-adb",
    period: "2026",
    yearNum: "2026 (ADB)",
    title: "Geospatial Analyst / LiDAR Risk Modeler",
    organization: "Geoinfra Research Institute / BGC Engineering",
    client: "Asian Development Bank (ADB)",
    location: "Dudhkoshi River Basin",
    sector: "infrastructure",
    sectorLabel: "Infrastructure",
    scope:
      "Airborne LiDAR point cloud classification, high-relief slope deformation analysis, reservoir rim community exposure modeling, and GIS landslide inventory registers for dam safety.",
    deliverables: ["Aerial LiDAR Point Clouds", "Reservoir Rim Exposure", "Dam Hazard Register"],
  },
  {
    id: "nh44-uav",
    period: "2026",
    yearNum: "2026 (DoR)",
    title: "Team Leader / UAV Survey Expert",
    organization: "Bavari Construction",
    client: "Road Division Bharatpur (DoR)",
    location: "Tuin Khola, NH44 Corridor",
    sector: "infrastructure",
    sectorLabel: "Infrastructure",
    scope:
      "Drone photogrammetric acquisition along vertical rock cliffs, 3D surface modeling, steep-face cross-section extraction, and cut/fill volumetric quantification for slope stabilization.",
    deliverables: ["UAV Photogrammetry", "3D Point Clouds", "Cut/Fill Volumetrics"],
  },
  {
    id: "municipal-zoning",
    period: "2023 — 2026",
    yearNum: "2023–26",
    title: "Team Leader / Senior GIS & Land Zoning Expert",
    organization: "Mappers Nepal / Global Era / Dynamic Vision",
    client: "MoFAGA & 20+ Municipalities",
    location: "20+ Municipalities Nationwide",
    sector: "municipal",
    sectorLabel: "Municipal",
    scope:
      "Directing multidisciplinary squads executing statutory parcel-level (kitta-wise) spatial zoning under Nepal's Land Use Act 2076, producing ward-level GIS map books and soil suitability baselines.",
    deliverables: ["Land Use Act 2076", "Kitta-wise Zoning", "Ward-Level Map Books"],
  },
  {
    id: "wecs-ev",
    period: "2024 — 2025",
    yearNum: "2024–25 (EV)",
    title: "GIS Specialist / Infrastructure Modeler",
    organization: "Shrestha–C2TECH–RIMC J/V",
    client: "Water & Energy Commission Secretariat (WECS)",
    location: "National Highway Network",
    sector: "infrastructure",
    sectorLabel: "Infrastructure",
    scope:
      "Nationwide multi-criteria spatial analysis (MCE) harmonizing 11kV/33kV power grid substations, highway geometry, and traffic flow models to establish the national EV charging master plan.",
    deliverables: ["Multi-Criteria Evaluation", "Power Grid Overlay", "Fast-Charging Siting"],
  },
  {
    id: "bagmati-adb",
    period: "2024 — 2025",
    yearNum: "2024–25 (ADB)",
    title: "Geomatics Engineer",
    organization: "SILT–FBC–IERC JV / HPCIDBC",
    client: "Asian Development Bank (ADB)",
    location: "Bagmati River Basin, Kathmandu",
    sector: "infrastructure",
    sectorLabel: "Infrastructure",
    scope:
      "Precision cadastral superimposition, hydraulic cross-section surveys, and riparian buffer corridor alignment verification for the Bagmati River Basin Improvement Project (BRBIP).",
    deliverables: ["Cadastral Superimposition", "Urban Riparian Buffer", "River Training Alignment"],
  },
  {
    id: "dor-gorkha",
    period: "2021 — 2022",
    yearNum: "2021–22",
    title: "Engineering Surveyor & GIS Modeler",
    organization: "Milestone Design & Consult",
    client: "PMEU Department of Roads (DoR)",
    location: "Gorkha District",
    sector: "infrastructure",
    sectorLabel: "Infrastructure",
    scope:
      "Detail Engineering Surveys (DPR) along 30+ km of mountain highway in Gorkha utilizing high-precision total stations and dual-frequency geodetic GNSS receivers for road alignment design.",
    deliverables: ["Total Station & GNSS", "30+ km Road DPR", "Catchment Delineation"],
  },
];

type FilterType = "all" | "infrastructure" | "municipal" | "academia";

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const stRef = useRef<ScrollTrigger | null>(null);

  const { scrollTo } = useSmoothScroll();

  const filteredRoles =
    activeFilter === "all"
      ? ROLES
      : ROLES.filter((r) => r.sector === activeFilter);

  // Setup GSAP ScrollTrigger auto-scrub on desktop
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !viewportRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const viewport = viewportRef.current;

      const getDistance = () => {
        return Math.max(0, track.scrollHeight - viewport.clientHeight);
      };

      const distance = getDistance();
      if (distance <= 0) return;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getDistance() + 100}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          y: () => -getDistance(),
          ease: "none",
        }),
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * filteredRoles.length),
            filteredRoles.length - 1
          );
          setActiveRoleIndex(idx);
        },
      });

      stRef.current = st;

      return () => {
        st.kill();
        stRef.current = null;
        if (trackRef.current) {
          gsap.set(trackRef.current, { clearProps: "transform" });
        }
      };
    });

    mm.add("(max-width: 1023px)", () => {
      if (trackRef.current) {
        gsap.set(trackRef.current, { clearProps: "all" });
      }
    });

    return () => {
      mm.revert();
    };
  }, [filteredRoles.length, activeFilter]);

  // Handle filter changes cleanly without setState inside effect
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveRoleIndex(0);
    if (trackRef.current) {
      gsap.set(trackRef.current, { y: 0 });
    }
    ScrollTrigger.refresh();
  };

  const scrollToRole = (id: string) => {
    // If desktop pinned ScrollTrigger is active, drive window scroll to that card's progress
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && stRef.current) {
      const st = stRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const card = cardRefs.current[id];

      if (track && viewport && card) {
        const maxScroll = track.scrollHeight - viewport.clientHeight;
        if (maxScroll > 0) {
          const cardTop = card.offsetTop;
          const progress = Math.min(Math.max(cardTop / maxScroll, 0), 1);
          const targetY = st.start + progress * (st.end - st.start);
          scrollTo(targetY);
          return;
        }
      }
    }

    // Fallback for mobile / narrow screens
    const target = cardRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-10 bg-[#F8F8F8] text-[#121212] min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-16 lg:pb-24 border-t border-[#E0E0E0] overflow-x-clip lg:overflow-hidden"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-6 sm:px-10 lg:px-12 xl:px-16 flex-1 flex flex-col justify-between">
        {/* Minimal Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-[#121212]/10 pb-4 font-mono text-xs tracking-widest uppercase">
          <h2 id="experience-heading" className="font-medium text-[#121212]">
            Career Trajectory
          </h2>
          <div className="text-[#121212]/50 font-mono text-xs">
            2011 — 2026+
          </div>
        </header>

        {/* Minimal Dual-Column Layout: Locked Overview (Left) + Automatic Scrubbing Stream (Right) */}
        <div className="pt-6 lg:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start flex-1 min-h-0">
          {/* Left Column: Quiet Overview & Active Appointment Indicator */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-[#121212]/50 tracking-wider uppercase block mb-2">
                Career Continuum · 2011 — 2026+
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.12] text-[#121212] font-heading">
                From high-precision geodesy to national-scale spatial modeling.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#121212]/70 leading-relaxed font-sans">
                A 14-year continuum bridging university department leadership, statutory parcel-level land zoning, and multilateral hazard risk mitigation across Nepal.
              </p>
            </div>

            {/* Minimal Sector Filter Tabs */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[#121212]/45 uppercase tracking-wider block">
                Discipline Filter
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {(
                  [
                    { id: "all", label: "All", count: ROLES.length },
                    {
                      id: "infrastructure",
                      label: "Infrastructure",
                      count: ROLES.filter((r) => r.sector === "infrastructure").length,
                    },
                    {
                      id: "municipal",
                      label: "Municipal",
                      count: ROLES.filter((r) => r.sector === "municipal").length,
                    },
                    {
                      id: "academia",
                      label: "Academia",
                      count: ROLES.filter((r) => r.sector === "academia").length,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleFilterChange(tab.id)}
                    className={`px-3 py-1 rounded-full border transition-colors duration-150 cursor-pointer text-xs flex items-center gap-1.5 ${
                      activeFilter === tab.id
                        ? "bg-[#121212] text-white border-[#121212] font-medium"
                        : "bg-white text-[#121212]/65 border-[#121212]/12 hover:border-[#121212]/30 hover:text-[#121212]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-70">({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chronological Quick Jump Rail with Active Synchronized State */}
            <div className="pt-3 border-t border-[#121212]/10 space-y-2.5 pb-8 lg:pb-14">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#121212]/50 uppercase tracking-wider">
                <span>Timeline Jump</span>
                <span className="font-semibold text-[#121212]">
                  {String(activeRoleIndex + 1).padStart(2, "0")} / {String(filteredRoles.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filteredRoles.map((r, idx) => {
                  const isActive = idx === activeRoleIndex;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => scrollToRole(r.id)}
                      className={`font-mono text-xs px-2.5 py-1.5 rounded-sm border transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#121212] text-white border-[#121212] font-medium shadow-xs"
                          : "bg-white border-[#121212]/10 text-[#121212]/75 hover:border-[#121212]/30 hover:text-[#121212]"
                      }`}
                    >
                      {r.yearNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Scroll-Driven Track (Desktop pinned, mobile sequential flow) */}
          <div className="lg:col-span-7 relative min-w-0">
            {/* Viewport Mask */}
            <div
              ref={viewportRef}
              className="relative h-auto lg:h-[calc(100vh-270px)] lg:max-h-[580px] overflow-visible lg:overflow-hidden rounded-xl pr-0 lg:pr-3"
            >
              {/* Top and Bottom Architectural Gradient Masks */}
              <div
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#F8F8F8] to-transparent z-10"
              />
              <div
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F8F8F8] to-transparent z-10"
              />

              {/* The Moving Track (Animated on scroll by GSAP on desktop) */}
              <div ref={trackRef} className="space-y-4 py-2">
                {filteredRoles.map((role, idx) => {
                  const isCurrent = idx === activeRoleIndex;
                  return (
                    <article
                      key={role.id}
                      ref={(el) => {
                        cardRefs.current[role.id] = el;
                      }}
                      className={`rounded-xl bg-white border p-5 sm:p-6 transition-all duration-300 group ${
                        isCurrent
                          ? "border-[#121212] shadow-sm ring-1 ring-[#121212]/10"
                          : "border-[#121212]/10 hover:border-[#121212]/30"
                      }`}
                    >
                      {/* Card Header Datum */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#121212]/8 pb-3 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-xs font-semibold ${
                              isCurrent
                                ? "bg-[#121212] text-white"
                                : "bg-[#121212]/[0.05] text-[#121212]"
                            }`}
                          >
                            {role.period}
                          </span>
                          <span className="text-[#121212]/50 text-[11px]">
                            {role.location}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#121212]/55 bg-[#121212]/[0.03] px-2 py-0.5 rounded-xs font-medium">
                          {role.sectorLabel}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <div className="pt-3.5">
                        <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-[#121212] leading-snug font-heading">
                          {role.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#121212]/85 mt-1 font-medium font-sans">
                          {role.organization}
                        </p>
                        {role.client && (
                          <p className="font-mono text-[11px] text-[#121212]/55 mt-0.5">
                            Client: <span className="font-medium text-[#121212]/80">{role.client}</span>
                          </p>
                        )}
                      </div>

                      {/* Scope */}
                      <p className="mt-3 text-xs sm:text-sm text-[#121212]/70 leading-relaxed font-sans">
                        {role.scope}
                      </p>

                      {/* Deliverables Chips */}
                      <div className="mt-4 pt-3 border-t border-[#121212]/6 flex flex-wrap gap-1.5">
                        {role.deliverables.map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            className="font-mono text-[10px] sm:text-[11px] text-[#121212]/75 bg-[#121212]/[0.04] border border-[#121212]/8 px-2 py-0.5 rounded-xs"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
