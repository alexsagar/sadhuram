"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

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
  },
  {
    num: "02",
    title: "Narayanghat–Mugling Highway (NH44) Slope Stabilization",
    year: "2026",
    location: "Chitwan, Narayanghat–Mugling Highway",
    role: "Team Leader / UAV Survey Expert",
    client: "Road Division Bharatpur (Department of Roads)",
    summary:
      "High-resolution UAV aerial mapping, dense point cloud extraction, and volumetric cut/fill estimation across steep landslide zones at Tuin Khola and Namsi Khola.",
    image: "/images/practice/practice-03-survey.webp",
    alt: "Field survey and instrument setup for highway geotechnical alignment and slope monitoring",
    tag: "UAV & Geotechnical Survey",
  },
  {
    num: "03",
    title: "National EV Public Charging Infrastructure Master Plan",
    year: "2024–2025",
    location: "Nationwide Highway Corridors, Nepal",
    role: "GIS Specialist / Spatial Modeler",
    client: "Water & Energy Commission Secretariat (WECS)",
    summary:
      "Nationwide spatial optimization using Multi-Criteria Evaluation (MCE) to model power grid capacity, traffic density, and terrain constraints for EV fast-charging stations.",
    image: "/images/practice/practice-01-gis.webp",
    alt: "ArcGIS spatial modeling and thematic highway network analysis for national energy infrastructure",
    tag: "Spatial Analysis & Energy",
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
  },
  {
    num: "05",
    title: "Risk-Sensitive Land Use Plan & Municipal Zoning",
    year: "2026",
    location: "Gaumul (Bajura) & Purchaudi (Baitadi)",
    role: "Team Leader / GIS Expert",
    client: "Municipal Executives & Ministry of Federal Affairs",
    summary:
      "Statutory parcel-level classification across 10 statutory land categories under Nepal's Land Use Act 2076 & Regulation 2079, supported by hazard-weighted terrain analysis.",
    image: "/images/practice/practice-04-terrain.webp",
    alt: "Digital elevation model overlaid with statutory municipal land zoning classifications",
    tag: "Statutory Land Zoning",
  },
];

export default function SelectedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );

    const updateMedia = () => {
      setIsDesktopMotion(mm.matches);
    };

    updateMedia();
    mm.addEventListener("change", updateMedia);

    return () => {
      mm.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopMotion || !containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;

    // Calculate the total scrollable distance for horizontal translation
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isDesktopMotion]);

  return (
    <section
      id="selected-projects"
      aria-labelledby="selected-projects-heading"
      className="relative z-10 border-t border-border-subtle bg-background text-foreground"
    >
      {/* Section Header */}
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-10">
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">03 / Selected Projects</p>
          <h2 id="selected-projects-heading" className="font-medium text-foreground">
            Applied Engineering & Spatial Research
          </h2>
        </header>
      </div>

      {/* Desktop Horizontal Scroll Storytelling (>= 1024px and motion allowed) */}
      <div
        ref={containerRef}
        className={`${isDesktopMotion ? "hidden lg:block relative overflow-hidden" : "hidden"}`}
      >
        <div className="h-screen flex items-center">
          <div
            ref={trackRef}
            className="flex flex-nowrap items-stretch gap-10 px-12 will-change-transform"
            style={{ width: "max-content" }}
          >
            {PROJECTS.map((project) => (
              <article
                key={project.num}
                className="w-[520px] xl:w-[580px] shrink-0 flex flex-col justify-between border-t border-b border-border-subtle py-8 bg-surface-subtle/30"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-foreground-muted mb-4 pb-2 border-b border-border-subtle">
                    <span className="text-accent-strong font-semibold">{project.num}</span>
                    <span>{project.tag}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-foreground leading-snug mb-3">
                    {project.title}
                  </h3>

                  <div className="font-mono text-xs text-foreground-muted space-y-1 mb-6">
                    <p>
                      <span className="text-foreground font-medium">Location:</span> {project.location}
                    </p>
                    <p>
                      <span className="text-foreground font-medium">Role:</span> {project.role}
                    </p>
                    <p>
                      <span className="text-foreground font-medium">Client:</span> {project.client}
                    </p>
                  </div>
                </div>

                <div>
                  <figure className="relative w-full aspect-[16/10] overflow-hidden border border-border-subtle mb-4">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="580px"
                      className="object-cover"
                    />
                  </figure>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {project.summary}
                  </p>
                </div>
              </article>
            ))}

            {/* Ending Plate */}
            <div className="w-[320px] shrink-0 flex flex-col justify-center border-l border-border-subtle pl-10 pr-6">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-3">
                Overview Complete
              </p>
              <p className="text-lg text-foreground font-medium leading-snug">
                Detailed project profiles, datasets, and statutory cadastral atlases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet / Reduced-Motion Vertical Stack */}
      <div className={`${isDesktopMotion ? "lg:hidden" : "block"} px-5 sm:px-8 pb-20`}>
        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <article
              key={project.num}
              className="border-b border-border-subtle pb-12 last:border-b-0"
            >
              <div className="flex items-baseline justify-between font-mono text-xs text-foreground-muted mb-3">
                <span className="text-accent-strong font-semibold">PROJECT {project.num}</span>
                <span>{project.year}</span>
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-foreground mb-3 leading-snug">
                {project.title}
              </h3>

              <div className="font-mono text-xs text-foreground-muted space-y-1 mb-4">
                <p>
                  <span className="text-foreground font-medium">Location:</span> {project.location}
                </p>
                <p>
                  <span className="text-foreground font-medium">Role:</span> {project.role}
                </p>
                <p>
                  <span className="text-foreground font-medium">Client:</span> {project.client}
                </p>
              </div>

              <figure className="relative w-full aspect-[16/10] overflow-hidden border border-border-subtle my-4">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 640px) 90vw, 100vw"
                  className="object-cover"
                />
              </figure>

              <p className="text-base leading-relaxed text-foreground-muted">
                {project.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
