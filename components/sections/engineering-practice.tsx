"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface PracticeItem {
  id: string;
  num: string;
  title: string;
  caption: string;
  description: string;
  image: string;
  imageMobile: string;
  alt: string;
}

const PRACTICES: PracticeItem[] = [
  {
    id: "gis-spatial-analysis",
    num: "01",
    title: "GIS & Spatial Analysis",
    caption:
      "Phukot Karnali Hydroelectric Project GIS mapping and spatial analysis session at Vidhyut Utpadan Company Limited (VUCL).",
    description:
      "Spatial databases, thematic mapping and multi-criteria evaluation (MCE/AHP) supporting municipal profiles, watershed studies and infrastructure siting.",
    image: "/images/practice/practice-01-gis.webp",
    imageMobile: "/images/practice/practice-01-gis-mobile.webp",
    alt: "ArcMap GIS spatial layout showing the Phukot Karnali watershed mapping prepared by Er. Sadhuram Lamichhane",
  },
  {
    id: "land-use-planning",
    num: "02",
    title: "Land Use Planning & Zoning",
    caption:
      "Municipal spatial planning and zoning working session with technical team members.",
    description:
      "Parcel-level land use classification and zoning under Nepal's Land Use Act 2076 and Regulation 2079, with cadastral superimposition and ward-wise map atlases for municipalities and rural municipalities.",
    image: "/images/practice/practice-02-landuse.webp",
    imageMobile: "/images/practice/practice-02-landuse-mobile.webp",
    alt: "Technical engineering team reviewing spatial planning and municipal cadastral layers on workstations",
  },
  {
    id: "surveying-gnss",
    num: "03",
    title: "Surveying & GNSS",
    caption:
      "Er. Sadhuram Lamichhane conducting high-precision instrument setup and geodetic survey in Chitwan, Nepal.",
    description:
      "Topographic and cadastral survey with total station and GNSS — control networks, route alignment and detailed engineering survey for DPR work with the Department of Roads.",
    image: "/images/practice/practice-03-survey.webp",
    imageMobile: "/images/practice/practice-03-survey-mobile.webp",
    alt: "Er. Sadhuram Lamichhane operating an electronic total station on a heavy tripod during field survey",
  },
  {
    id: "remote-sensing-uav",
    num: "04",
    title: "Remote Sensing & UAV",
    caption:
      "Copernicus DEM GLO-30 shaded relief model (315° azimuth, 45° altitude) over Kavrepalanchok middle hills (27.5°N, 85.5°E, elev. 1,235–2,161m).",
    description:
      "UAV and satellite data turned into terrain models, land cover change and slope or flood hazard surfaces — used for landslide assessment, land pooling and risk-sensitive land use plans.",
    image: "/images/practice/practice-04-terrain.webp",
    imageMobile: "/images/practice/practice-04-terrain-mobile.webp",
    alt: "High-resolution shaded relief elevation model showing ridges and drainage networks of the Nepal middle hills",
  },
];

export default function EngineeringPractice() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const { scrollTo } = useSmoothScroll();

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
    if (!isDesktopMotion || !sequenceRef.current) {
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sequenceRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress;
        // Segment into 4 discrete indices with smooth thresholds
        const idx = Math.min(3, Math.max(0, Math.floor(p * 4)));
        setActiveIndex(idx);
      },
    });

    stRef.current = trigger;

    return () => {
      trigger.kill();
      stRef.current = null;
    };
  }, [isDesktopMotion]);

  const handleRailClick = (index: number) => {
    if (stRef.current) {
      // Calculate target scroll position within the sequence
      const start = stRef.current.start;
      const end = stRef.current.end;
      // Scroll to the midpoint of the chosen segment
      const targetY = start + ((index + 0.5) / 4) * (end - start);
      scrollTo(targetY, { duration: 0.8 });
    } else {
      const element = document.getElementById(PRACTICES[index].id);
      if (element) {
        scrollTo(element, { offset: -80 });
      }
    }
  };

  return (
    <div
      id="engineering-practice"
      aria-labelledby="engineering-practice-heading"
      className="relative mt-16 md:mt-24"
    >
      <h3 id="engineering-practice-heading" className="sr-only">
        Engineering Practice Areas
      </h3>

      {/* Desktop Sticky Visual Sequence (>= 1024px and motion allowed) */}
      <div
        ref={sequenceRef}
        className={`relative ${isDesktopMotion ? "hidden lg:block lg:min-h-[260svh]" : "hidden"}`}
      >
        <div className="sticky top-0 h-svh w-full flex flex-col justify-center overflow-hidden py-10">
          <div className="grid grid-cols-12 gap-8 xl:gap-14 items-center">
            {/* Left: Large Editorial Image Plate (~60% width) */}
            <div className="col-span-7 flex flex-col">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none border border-border-subtle bg-surface-subtle shadow-none">
                {PRACTICES.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={item.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        isActive
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        priority={idx === 0}
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Factual Provenance Caption */}
              <div className="mt-3.5 min-h-[3.25rem] transition-opacity duration-500">
                <figcaption className="font-mono text-[11px] leading-relaxed tracking-normal text-foreground-muted">
                  <span className="font-semibold text-foreground mr-1.5 uppercase">
                    [{PRACTICES[activeIndex].num}]
                  </span>
                  {PRACTICES[activeIndex].caption}
                </figcaption>
              </div>
            </div>

            {/* Right: Typographic Practice Rail (~40% width) */}
            <div className="col-span-5 flex flex-col pl-4 xl:pl-8">
              <p className="font-mono text-xs tracking-widest uppercase text-foreground-muted mb-6">
                Areas of Practice
              </p>

              <ol className="flex flex-col divide-y divide-border-subtle border-t border-b border-border-subtle">
                {PRACTICES.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <li
                      key={item.id}
                      className="transition-colors duration-300 py-4.5 group"
                    >
                      <button
                        type="button"
                        onClick={() => handleRailClick(idx)}
                        className="w-full text-left cursor-pointer focus:outline-hidden"
                      >
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-mono text-xs transition-colors duration-300 ${
                              isActive
                                ? "text-accent-strong font-semibold"
                                : "text-foreground-muted opacity-60 group-hover:opacity-100"
                            }`}
                          >
                            {item.num}
                          </span>
                          <h4
                            className={`text-xl xl:text-2xl font-medium tracking-tight transition-all duration-300 ${
                              isActive
                                ? "text-foreground font-medium"
                                : "text-foreground-muted opacity-40 group-hover:opacity-75"
                            }`}
                          >
                            {item.title}
                          </h4>
                        </div>

                        {/* Collapsible descriptive narrative */}
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100 mt-2.5"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-sm xl:text-base leading-relaxed text-foreground-muted pr-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet / Reduced Motion Natural Vertical Flow */}
      <div className={`${isDesktopMotion ? "lg:hidden" : "block"} space-y-12 md:space-y-16`}>
        <p className="font-mono text-xs tracking-widest uppercase text-foreground-muted pb-3 border-b border-border-subtle">
          Areas of Practice
        </p>

        <ol className="space-y-12 md:space-y-16">
          {PRACTICES.map((item, idx) => (
            <li
              key={item.id}
              id={item.id}
              className="scroll-mt-24 border-b border-border-subtle pb-10 last:border-b-0 last:pb-0"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-xs text-accent-strong font-semibold">
                  {item.num}
                </span>
                <h4 className="text-2xl font-medium tracking-tight text-foreground">
                  {item.title}
                </h4>
              </div>

              <figure className="relative my-4 w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-border-subtle bg-surface-subtle">
                <Image
                  src={item.imageMobile}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 90vw, 100vw"
                  priority={idx === 0}
                  className="object-cover"
                />
              </figure>

              <figcaption className="font-mono text-[11px] leading-relaxed text-foreground-muted mb-4">
                <span className="font-semibold text-foreground mr-1.5 uppercase">
                  [{item.num}]
                </span>
                {item.caption}
              </figcaption>

              <p className="text-base leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Editorial closing line before next section */}
      <div className="mt-16 md:mt-24 pt-8 border-t border-border-subtle flex items-baseline justify-between">
        <p className="font-mono text-xs tracking-wider uppercase text-foreground-muted">
          Selected work across land, infrastructure and planning.
        </p>
      </div>

      {/* Anchor marker for Selected Projects handoff */}
      <div id="selected-projects" className="scroll-mt-24" />
    </div>
  );
}
