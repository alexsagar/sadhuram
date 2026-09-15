import React from "react";

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
      className="relative z-10 border-t border-border-subtle bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">04 / Areas of Practice</p>
          <h2 id="practice-heading" className="font-medium text-foreground">
            Disciplinary Scope
          </h2>
        </header>

        {/* Lead Editorial Statement */}
        <div className="pt-10 md:pt-14 pb-12 md:pb-16 max-w-3xl">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-balance leading-snug">
            Technical competencies applied across government infrastructure, statutory planning, and academic training.
          </p>
        </div>

        {/* Typographic Discipline Roster */}
        <div className="border-t border-border-subtle divide-y divide-border-subtle">
          {DISCIPLINES.map((item) => (
            <article
              key={item.num}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs font-semibold text-accent-strong">
                  {item.num}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-sm md:text-base leading-relaxed text-foreground-muted">
                  {item.scope}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="font-mono text-[11px] leading-relaxed text-foreground-muted">
                  <span className="text-foreground font-medium block uppercase tracking-wider mb-1">
                    Deliverables
                  </span>
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
