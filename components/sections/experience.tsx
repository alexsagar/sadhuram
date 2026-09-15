import React from "react";

interface Role {
  period: string;
  title: string;
  organization: string;
  location: string;
  scope: string;
}

const ROLES: Role[] = [
  {
    period: "2022 — PRESENT",
    title: "Head of Department (Geomatics Engineering)",
    organization: "Universal Engineering & Science College (UESC), Lalitpur",
    location: "Chakupat, Lalitpur",
    scope:
      "Departmental academic leadership, curriculum administration, GIS lab development, and undergraduate engineering research supervision across geodesy, photogrammetry, and spatial analysis.",
  },
  {
    period: "2026",
    title: "Geospatial Analyst / LiDAR Risk Modeler",
    organization: "Geoinfra Research Institute / BGC Engineering / ADB",
    location: "Dudhkoshi River Basin",
    scope:
      "LiDAR point cloud analysis, reservoir rim community exposure modeling, and GIS-based landslide hazard register development for dam safety and resilience planning.",
  },
  {
    period: "2026",
    title: "Team Leader / UAV Survey Expert",
    organization: "Bavari Construction / Road Division Bharatpur (DoR)",
    location: "Namsi Khola & Tuin Khola, NH44",
    scope:
      "High-precision UAV photogrammetry, rock slope profile extraction, cut/fill volumetric quantification, and slope stabilization engineering support along the Narayanghat–Mugling corridor.",
  },
  {
    period: "2023 — 2026",
    title: "Team Leader / Senior GIS & Land Zoning Expert",
    organization: "Mappers Nepal / Global Era / Dynamic Vision",
    location: "Multiple Municipalities across Nepal",
    scope:
      "Directing multi-disciplinary engineering teams executing statutory parcel-level (kitta-wise) land zoning under Nepal's Land Use Act 2076 across 20+ rural and urban municipalities.",
  },
  {
    period: "2024 — 2025",
    title: "GIS Specialist / Infrastructure Modeler",
    organization: "Shrestha–C2TECH–RIMC J/V / Water & Energy Commission (WECS)",
    location: "National Highway Network, Nepal",
    scope:
      "Nationwide multi-criteria spatial analysis (MCE) integrating electrical grid feed capacities, road geometry, and traffic flow models to establish the national EV charging master plan.",
  },
  {
    period: "2024 — 2025",
    title: "Geomatics Engineer",
    organization: "SILT–FBC–IERC JV / HPCIDBC / Asian Development Bank",
    location: "Bagmati River Basin, Kathmandu",
    scope:
      "Design supervision, engineering surveying, and cadastral boundary superimposition for river training, urban riverbank green corridors, and environmental weir construction.",
  },
  {
    period: "2021 — 2022",
    title: "Engineering Surveyor & GIS Modeler",
    organization: "Milestone Design & Consult / PMEU Department of Roads",
    location: "Gorkha District",
    scope:
      "Detail Engineering Survey (DPR) utilizing total stations and geodetic GNSS receivers for 30+ km of mountain road corridors, catchment delineation, and DoR compliance mapping.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-10 border-t border-border-subtle bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">06 / Experience</p>
          <h2 id="experience-heading" className="font-medium text-foreground">
            Professional Trajectory
          </h2>
        </header>

        {/* Lead Statement */}
        <div className="pt-10 pb-12 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug">
            A progression from high-precision field instrument surveys to statutory municipal planning, national infrastructure modeling, and academic department leadership.
          </p>
        </div>

        {/* Editorial Timeline */}
        <div className="border-t border-border-subtle divide-y divide-border-subtle">
          {ROLES.map((role) => (
            <article
              key={`${role.period}-${role.title}`}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs font-semibold text-accent-strong tracking-wide block">
                  {role.period}
                </span>
                <span className="font-mono text-[11px] text-foreground-muted block mt-1">
                  {role.location}
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground">
                  {role.title}
                </h3>
                <p className="text-sm font-medium text-foreground-muted mt-1">
                  {role.organization}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-sm md:text-base leading-relaxed text-foreground-muted">
                  {role.scope}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
