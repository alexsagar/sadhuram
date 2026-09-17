"use client";

import React, { useState } from "react";
import { NEPAL_MAP_DATA } from "@/lib/nepal-map-data";

export default function WorkAcrossNepal() {
  const [activeLocationId, setActiveLocationId] = useState<string>(
    NEPAL_MAP_DATA.locations[0].id
  );

  const activeLocation =
    NEPAL_MAP_DATA.locations.find((l) => l.id === activeLocationId) ||
    NEPAL_MAP_DATA.locations[0];

  return (
    <section
      id="work-across-nepal"
      aria-labelledby="nepal-heading"
      className="relative z-10 border-t border-white/8 bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-white/8 pb-5 font-mono text-xs tracking-widest uppercase">
          <h2 id="nepal-heading" className="font-medium text-foreground">
            Work Across Nepal
          </h2>
          <p className="text-foreground-muted">Geographic Footprint</p>
        </header>

        {/* Lead Summary */}
        <div className="pt-10 pb-12 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug text-foreground">
            Spatial planning and geodetic survey assignments across 20+ rural and urban municipalities, from high-altitude Himalayan valleys to the Terai lowlands.
          </p>
        </div>

        {/* Asymmetrical Sticky Layout: Left Map, Right Interactive List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Map Column (Sticky on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between pb-3 border-b border-white/8 font-mono text-[11px] text-foreground-muted">
                <span>PROJECTION: EPSG:4326 (WGS84)</span>
                <span className="text-emerald-400 font-medium">NEPAL ADMINISTRATIVE PROVINCES</span>
              </div>

              {/* Authentic Nepal Vector Map */}
              <div className="relative w-full aspect-[1000/560] my-4">
                <svg
                  viewBox={NEPAL_MAP_DATA.viewBox}
                  className="w-full h-full"
                  aria-label="Vector boundary map of Nepal with province outlines and project locations"
                >
                  {/* Province Outlines */}
                  {NEPAL_MAP_DATA.provinces.map((prov) => (
                    <path
                      key={prov.id}
                      d={prov.d}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1.2"
                      className="hover:stroke-emerald-400 transition-colors"
                    />
                  ))}

                  {/* Location Points — Static clean geodetic dots, zero pulse */}
                  {NEPAL_MAP_DATA.locations.map((loc) => {
                    const isActive = loc.id === activeLocationId;
                    return (
                      <g
                        key={loc.id}
                        className="cursor-pointer"
                        onClick={() => setActiveLocationId(loc.id)}
                      >
                        {/* Target ring if active */}
                        {isActive && (
                          <circle
                            cx={loc.x}
                            cy={loc.y}
                            r="8"
                            fill="rgba(16, 185, 129, 0.2)"
                            stroke="#10b981"
                            strokeWidth="1.4"
                          />
                        )}
                        {/* Center dot */}
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={isActive ? 3.5 : 2.5}
                          fill={isActive ? "#10b981" : "rgba(255, 255, 255, 0.45)"}
                          className="transition-all"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Marker Callout */}
              <div className="pt-4 border-t border-white/8 flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                <div>
                  <span className="text-emerald-400 font-semibold mr-2">
                    ACTIVE PINPOINT:
                  </span>
                  <span className="text-foreground font-medium">
                    {activeLocation.name}
                  </span>
                  <span className="text-foreground-muted ml-2">
                    ({activeLocation.region})
                  </span>
                </div>
                <div className="text-foreground-muted">
                  {activeLocation.year} · {activeLocation.type}
                </div>
              </div>
            </div>
          </div>

          {/* Location Roster Column */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-4 pb-2 border-b border-white/8">
              Verified Project Locations ({NEPAL_MAP_DATA.locations.length})
            </p>

            <div className="space-y-3">
              {NEPAL_MAP_DATA.locations.map((loc) => {
                const isActive = loc.id === activeLocationId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer block focus:outline-hidden ${
                      isActive
                        ? "border border-emerald-500/40 bg-emerald-500/[0.08]"
                        : "border border-white/6 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        className={`text-base font-medium tracking-tight ${
                          isActive ? "text-white font-semibold" : "text-foreground-muted"
                        }`}
                      >
                        {loc.name}
                      </h4>
                      <span className="font-mono text-xs text-foreground-muted shrink-0">
                        {loc.year}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 mt-1">{loc.project}</p>
                    <p className="font-mono text-[11px] text-foreground-muted mt-1">
                      {loc.region} · {loc.type}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
