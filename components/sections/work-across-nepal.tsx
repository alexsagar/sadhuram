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
      className="relative z-10 border-t border-border-subtle bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">05 / Work Across Nepal</p>
          <h2 id="nepal-heading" className="font-medium text-foreground">
            Geographic Footprint
          </h2>
        </header>

        {/* Lead Summary */}
        <div className="pt-10 pb-12 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug">
            Spatial planning and geodetic survey assignments across 20+ rural and urban municipalities, from high-altitude Himalayan valleys to the Terai lowlands.
          </p>
        </div>

        {/* Asymmetrical Sticky Layout: Left Map, Right Interactive List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Map Column (Sticky on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="border border-border-subtle bg-surface-subtle/40 p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle font-mono text-[11px] text-foreground-muted">
                <span>PROJECTION: EPSG:4326 (WGS84)</span>
                <span>NEPAL ADMINISTRATIVE PROVINCES</span>
              </div>

              {/* Authentic Nepal Vector Map */}
              <div className="relative w-full aspect-[1000/560] my-4">
                <svg
                  viewBox={NEPAL_MAP_DATA.viewBox}
                  className="w-full h-full stroke-border-subtle"
                  aria-label="Vector boundary map of Nepal with province outlines and project locations"
                >
                  {/* Province Outlines */}
                  {NEPAL_MAP_DATA.provinces.map((prov) => (
                    <path
                      key={prov.id}
                      d={prov.d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="text-border-subtle hover:text-accent-strong/40 transition-colors"
                    />
                  ))}

                  {/* Location Points */}
                  {NEPAL_MAP_DATA.locations.map((loc) => {
                    const isActive = loc.id === activeLocationId;
                    return (
                      <g
                        key={loc.id}
                        className="cursor-pointer"
                        onClick={() => setActiveLocationId(loc.id)}
                      >
                        {/* Target halo if active */}
                        {isActive && (
                          <circle
                            cx={loc.x}
                            cy={loc.y}
                            r="10"
                            className="fill-accent-strong/20 stroke-accent-strong stroke-[1]"
                          />
                        )}
                        {/* Center dot */}
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={isActive ? 4 : 2.5}
                          className={`transition-all ${
                            isActive
                              ? "fill-accent-strong"
                              : "fill-foreground-muted hover:fill-foreground"
                          }`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Marker Callout */}
              <div className="pt-3 border-t border-border-subtle flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                <div>
                  <span className="text-accent-strong font-semibold mr-2">
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
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-4 pb-2 border-b border-border-subtle">
              Verified Project Locations ({NEPAL_MAP_DATA.locations.length})
            </p>

            <div className="divide-y divide-border-subtle">
              {NEPAL_MAP_DATA.locations.map((loc) => {
                const isActive = loc.id === activeLocationId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`w-full text-left py-4 px-3 transition-colors cursor-pointer block focus:outline-hidden ${
                      isActive
                        ? "bg-surface-subtle border-l-2 border-accent-strong pl-4"
                        : "hover:bg-surface-subtle/50"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        className={`text-base font-medium tracking-tight ${
                          isActive ? "text-foreground" : "text-foreground-muted"
                        }`}
                      >
                        {loc.name}
                      </h4>
                      <span className="font-mono text-xs text-foreground-muted shrink-0">
                        {loc.year}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">{loc.project}</p>
                    <p className="font-mono text-[11px] text-foreground-muted mt-0.5">
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
