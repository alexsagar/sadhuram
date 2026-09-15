import React from "react";

interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  doi?: string;
  url?: string;
}

const PUBLICATIONS: Publication[] = [
  {
    year: "2026",
    title: "Geospatial Modeling of Urban Sprawl in Bharatpur Metropolitan City",
    authors: "Lamichhane, S.",
    venue: "Urban and Regional Planning, 11(2), 96–109",
    doi: "10.11648/j.urp.20261102.11",
    url: "https://doi.org/10.11648/j.urp.20261102.11",
  },
  {
    year: "2024",
    title:
      "Urbanization and Its Impact on Land Use and Land Cover in Dhangadi Sub-Metropolitan City: Comprehensive Analysis and Forecasting",
    authors:
      "Paudel, I. R., Bhurtyal, U., Lamichhane, S., Pokharel, B., & Katuwal, N. B.",
    venue: "Journal of Engineering and Sciences, 3(2), 61–72",
    doi: "10.3126/jes2.v3i2.72191",
    url: "https://doi.org/10.3126/jes2.v3i2.72191",
  },
  {
    year: "2022",
    title:
      "AHP and GIS Based Land Suitability Analysis for Built-Up in Bharatpur Metropolitan City, Nepal",
    authors: "Lamichhane, S.",
    venue:
      "International Journal of Innovative Science and Research Technology (IJISRT), 7(12), pp. 1472–1488",
    doi: "10.5281/zenodo.7525683",
    url: "https://doi.org/10.5281/zenodo.7525683",
  },
  {
    year: "2022",
    title: "Drought Assessment Using Remote Sensing and GIS in Nepal",
    authors: "Lamichhane, S.",
    venue: "Geo World, Volume V, pp. 21–29",
  },
  {
    year: "2022",
    title:
      "Agricultural Drought Assessment Using Remote Sensing and GIS in Gandaki Province, Nepal",
    authors: "Lamichhane, S.",
    venue:
      "Proceedings of KEC Conference 2022 (4th International Conference on Engineering and Technology)",
  },
];

export default function ResearchPublications() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative z-10 border-t border-border-subtle bg-background text-foreground py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">07 / Research & Publications</p>
          <h2 id="research-heading" className="font-medium text-foreground">
            Academic Research
          </h2>
        </header>

        {/* Lead Statement */}
        <div className="pt-10 pb-12 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug">
            Peer-reviewed research exploring urban sprawl dynamics, multi-criteria land suitability, and remote sensing drought monitoring across Nepal.
          </p>
        </div>

        {/* Journal-Style Publication Table */}
        <div className="border-t border-border-subtle divide-y divide-border-subtle">
          {PUBLICATIONS.map((pub) => (
            <article
              key={`${pub.year}-${pub.title}`}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs font-semibold text-accent-strong">
                  {pub.year}
                </span>
              </div>

              <div className="md:col-span-7">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground leading-snug">
                  {pub.title}
                </h3>
                <p className="font-mono text-xs text-foreground-muted mt-2">
                  {pub.authors}
                </p>
                <p className="text-sm text-foreground-muted italic mt-1">
                  {pub.venue}
                </p>
              </div>

              <div className="md:col-span-3 md:text-right">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-strong hover:underline hover:text-foreground transition-colors"
                  >
                    <span>DOI / Paper Link</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="font-mono text-xs text-foreground-muted">
                    Conference / Print
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
