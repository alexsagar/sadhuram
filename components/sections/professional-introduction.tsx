import React from "react";

export default function ProfessionalIntroduction() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative z-10 bg-transparent pt-24 pb-28 text-white md:pt-32 md:pb-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Quiet running header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-white/15 pb-5 font-mono text-xs tracking-widest uppercase">
          <h2 id="profile-heading" className="font-medium text-white">
            Engineering Practice
          </h2>
          <p className="text-white/50">Kathmandu, Nepal</p>
        </header>

        {/* Calm editorial statement and concise introduction */}
        <div className="grid gap-8 pt-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-14 md:pt-16 xl:gap-20 items-start">
          <div>
            <p className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl text-white drop-shadow-xs">
              Turning complex spatial data into grounded decisions.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg drop-shadow-xs">
              Er. Sadhuram Lamichhane is a licensed Geomatics Engineer (NEC Reg. No. 6757 &ldquo;A&rdquo;) and GIS Expert operating across spatial analysis, geodetic surveying, municipal land use zoning, and UAV photogrammetry in Nepal.
            </p>
            <p className="text-sm leading-relaxed text-white/70 drop-shadow-xs">
              His engineering practice anchors satellite Earth observation and high-precision field GNSS into municipal master plans, hydropower watershed models, and national infrastructure DPRs.
            </p>
          </div>
        </div>

        {/* Architectural Typographic Data Strip — Direct on canvas, zero vibecoded cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-16 pt-10 pb-12 border-y border-white/15 backdrop-blur-[2px] bg-black/10 rounded-xl px-4 sm:px-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3">
              National Scope
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl lg:text-6xl font-medium tracking-tight font-mono text-white">77</span>
              <span className="text-sm font-mono text-white/80 font-medium">Districts</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mt-2">
              Spatial database, cadastral zoning, and hazard mapping across all 7 provinces of Nepal.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3">
              Elevation Relief
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl lg:text-6xl font-medium tracking-tight font-mono text-white">8,778</span>
              <span className="text-sm font-mono text-white/80 font-medium">m span</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mt-2">
              Topographic analysis from Mount Everest summit (8,848.86 m) to Jhapa lowlands (71 m).
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3">
              Field Practice
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl lg:text-6xl font-medium tracking-tight font-mono text-white">14+</span>
              <span className="text-sm font-mono text-white/80 font-medium">Years</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mt-2">
              Continuous surveying, spatial modeling, peer-reviewed publications, and university instruction.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3">
              Verified License
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl lg:text-6xl font-medium tracking-tight font-mono text-white">6757</span>
              <span className="text-sm font-mono text-white/80 font-medium">NEC &ldquo;A&rdquo;</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mt-2">
              Nepal Engineering Council Certified Geomatics Engineer with ground-truthed datum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
