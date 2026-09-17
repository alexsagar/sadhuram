import React from "react";
import Image from "next/image";

interface PracticePlate {
  title: string;
  role: string;
  locationDate: string;
  image: string;
  alt: string;
  caption: string;
}

const PLATES: PracticePlate[] = [
  {
    title: "Geodetic Instrument Setup & Field Measurement",
    role: "Lead Surveyor",
    locationDate: "Chitwan, Nepal · 2021",
    image: "/images/practice/practice-03-survey.webp",
    alt: "Er. Sadhuram Lamichhane setting up a total station over a control benchmark in the field",
    caption:
      "High-precision engineering survey and horizontal/vertical control establishment using an electronic total station for industrial site planning in Chitwan.",
  },
  {
    title: "GNSS Workshop & Technical Training",
    role: "Participant / Researcher",
    locationDate: "Pokhara, Nepal · Jan 2022",
    image: "/images/profile/sadhuram-gnss-workshop.webp",
    alt: "Er. Sadhuram Lamichhane analyzing satellite GNSS observables on dual monitors at workstation",
    caption:
      "Advanced multi-GNSS data processing (GPS, Galileo, BeiDou, QZSS) with RTKLIB, organized by CSIS The University of Tokyo, ICG, and TU IOE Pashchimanchal Campus.",
  },
  {
    title: "Applied GIS Training for Infrastructure Engineers",
    role: "GIS Trainer / Instructor",
    locationDate: "Kathmandu, Nepal · May 2022",
    image: "/images/practice/practice-02-landuse.webp",
    alt: "Engineers working on spatial databases and thematic mapping at laptop workstations",
    caption:
      "Professional capacity building in spatial database management and cartographic layout production for engineers at Vidhyut Utpadan Company Limited (VUCL).",
  },
];

export default function FieldPractice() {
  return (
    <section
      id="field-practice"
      aria-labelledby="field-practice-heading"
      className="relative z-10 border-t border-white/8 bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-white/8 pb-5 font-mono text-xs tracking-widest uppercase">
          <h2 id="field-practice-heading" className="font-medium text-foreground">
            Field Practice &amp; Instruction
          </h2>
          <p className="text-foreground-muted">Observation &amp; Mentorship</p>
        </header>

        {/* Lead Statement */}
        <div className="pt-10 pb-12 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug text-foreground">
            Bridging rigorous outdoor field observations with spatial laboratory instruction, engineering workshops, and professional GIS training.
          </p>
        </div>

        {/* Architectural Photographic Plates — Direct on canvas, no vibecoded cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 pt-6">
          {PLATES.map((plate) => (
            <article
              key={plate.title}
              className="flex flex-col justify-between"
            >
              <div>
                <figure className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] mb-4 shadow-xl shadow-black/30">
                  <Image
                    src={plate.image}
                    alt={plate.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </figure>

                <div className="flex items-baseline justify-between font-mono text-xs text-white/50 mb-2">
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px]">{plate.role}</span>
                  <span>{plate.locationDate}</span>
                </div>

                <h3 className="text-xl font-medium tracking-tight text-white leading-snug">
                  {plate.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-white/60 mt-3 pt-3 border-t border-white/8">
                {plate.caption}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
