"use client";

import React, { useState } from "react";

interface Publication {
  id: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  category: "urban" | "suitability" | "drought";
  categoryLabel: string;
  doi?: string;
  url?: string;
  abstract: string;
  keywords: string[];
  citationApa: string;
  bibtex: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: "pub-bharatpur-2026",
    year: "2026",
    title: "Geospatial Modeling of Urban Sprawl in Bharatpur Metropolitan City",
    authors: "Lamichhane, S.",
    venue: "Urban and Regional Planning, 11(2), 96–109",
    category: "urban",
    categoryLabel: "Urban Sprawl & Dynamics",
    doi: "10.11648/j.urp.20261102.11",
    url: "https://doi.org/10.11648/j.urp.20261102.11",
    abstract:
      "A quantitative investigation into peri-urban expansion vectors across Bharatpur Metropolitan City. Utilizes multi-temporal satellite imagery, spatial Shannon entropy indices, and transition probability modeling to measure urban dispersion and deliver data-driven directives for municipal land-use allocation.",
    keywords: ["Cellular Automata", "Shannon Entropy", "Urban Dispersion", "Landsat Time-Series"],
    citationApa:
      "Lamichhane, S. (2026). Geospatial Modeling of Urban Sprawl in Bharatpur Metropolitan City. Urban and Regional Planning, 11(2), 96–109. https://doi.org/10.11648/j.urp.20261102.11",
    bibtex: `@article{lamichhane2026geospatial,
  title={Geospatial Modeling of Urban Sprawl in Bharatpur Metropolitan City},
  author={Lamichhane, Sadhuram},
  journal={Urban and Regional Planning},
  volume={11},
  number={2},
  pages={96--109},
  year={2026},
  doi={10.11648/j.urp.20261102.11}
}`,
  },
  {
    id: "pub-dhangadi-2024",
    year: "2024",
    title:
      "Urbanization and Its Impact on Land Use and Land Cover in Dhangadi Sub-Metropolitan City: Comprehensive Analysis and Forecasting",
    authors:
      "Paudel, I. R., Bhurtyal, U., Lamichhane, S., Pokharel, B., & Katuwal, N. B.",
    venue: "Journal of Engineering and Sciences, 3(2), 61–72",
    category: "urban",
    categoryLabel: "Urban Sprawl & Dynamics",
    doi: "10.3126/jes2.v3i2.72191",
    url: "https://doi.org/10.3126/jes2.v3i2.72191",
    abstract:
      "Comprehensive multi-decade land use and land cover (LULC) classification and CA-Markov predictive simulation tracking the rapid loss of agricultural fertile land to built-up expansion in western Nepal's primary gateway city.",
    keywords: ["CA-Markov Simulation", "LULC Change Detection", "Dhangadi Urbanization", "Terai Region"],
    citationApa:
      "Paudel, I. R., Bhurtyal, U., Lamichhane, S., Pokharel, B., & Katuwal, N. B. (2024). Urbanization and Its Impact on Land Use and Land Cover in Dhangadi Sub-Metropolitan City: Comprehensive Analysis and Forecasting. Journal of Engineering and Sciences, 3(2), 61–72. https://doi.org/10.3126/jes2.v3i2.72191",
    bibtex: `@article{paudel2024urbanization,
  title={Urbanization and Its Impact on Land Use and Land Cover in Dhangadi Sub-Metropolitan City: Comprehensive Analysis and Forecasting},
  author={Paudel, I. R. and Bhurtyal, U. and Lamichhane, S. and Pokharel, B. and Katuwal, N. B.},
  journal={Journal of Engineering and Sciences},
  volume={3},
  number={2},
  pages={61--72},
  year={2024},
  doi={10.3126/jes2.v3i2.72191}
}`,
  },
  {
    id: "pub-ahp-2022",
    year: "2022",
    title:
      "AHP and GIS Based Land Suitability Analysis for Built-Up in Bharatpur Metropolitan City, Nepal",
    authors: "Lamichhane, S.",
    venue:
      "International Journal of Innovative Science and Research Technology (IJISRT), 7(12), pp. 1472–1488",
    category: "suitability",
    categoryLabel: "Land Suitability & MCE",
    doi: "10.5281/zenodo.7525683",
    url: "https://doi.org/10.5281/zenodo.7525683",
    abstract:
      "Formulation of an Analytical Hierarchy Process (AHP) multi-criteria decision framework integrating geotechnical slope, flood vulnerability, road proximity, and infrastructure accessibility layers to classify municipal land suitability for resilient settlement expansion.",
    keywords: ["AHP Weighting", "Multi-Criteria Evaluation", "Slope Hazard", "Flood Buffer Analysis"],
    citationApa:
      "Lamichhane, S. (2022). AHP and GIS Based Land Suitability Analysis for Built-Up in Bharatpur Metropolitan City, Nepal. International Journal of Innovative Science and Research Technology, 7(12), 1472–1488. https://doi.org/10.5281/zenodo.7525683",
    bibtex: `@article{lamichhane2022ahp,
  title={AHP and GIS Based Land Suitability Analysis for Built-Up in Bharatpur Metropolitan City, Nepal},
  author={Lamichhane, Sadhuram},
  journal={International Journal of Innovative Science and Research Technology},
  volume={7},
  number={12},
  pages={1472--1488},
  year={2022},
  doi={10.5281/zenodo.7525683}
}`,
  },
  {
    id: "pub-drought-national-2022",
    year: "2022",
    title: "Drought Assessment Using Remote Sensing and GIS in Nepal",
    authors: "Lamichhane, S.",
    venue: "Geo World, Volume V, pp. 21–29",
    category: "drought",
    categoryLabel: "Earth Observation & Drought",
    abstract:
      "National-scale spatial-temporal drought monitoring across Nepal's diverse ecological belts utilizing satellite-derived vegetation health indices (VHI), Normalized Difference Vegetation Index (NDVI) anomalies, and meteorological station data.",
    keywords: ["Vegetation Health Index", "NDVI Anomaly", "MODIS Remote Sensing", "Macroclimatic Belts"],
    citationApa:
      "Lamichhane, S. (2022). Drought Assessment Using Remote Sensing and GIS in Nepal. Geo World, 5, 21–29.",
    bibtex: `@article{lamichhane2022drought,
  title={Drought Assessment Using Remote Sensing and GIS in Nepal},
  author={Lamichhane, Sadhuram},
  journal={Geo World},
  volume={5},
  pages={21--29},
  year={2022}
}`,
  },
  {
    id: "pub-gandaki-drought-2022",
    year: "2022",
    title:
      "Agricultural Drought Assessment Using Remote Sensing and GIS in Gandaki Province, Nepal",
    authors: "Lamichhane, S.",
    venue:
      "Proceedings of KEC Conference 2022 (4th International Conference on Engineering and Technology)",
    category: "drought",
    categoryLabel: "Earth Observation & Drought",
    abstract:
      "High-resolution regional drought susceptibility modeling in Gandaki Province. Combines Standardized Precipitation Indices (SPI) with temperature condition index (TCI) to map agricultural crop vulnerability across hill and mountain farming valleys.",
    keywords: ["Agricultural Drought", "Gandaki Basin", "SPI & TCI", "KEC Proceedings"],
    citationApa:
      "Lamichhane, S. (2022). Agricultural Drought Assessment Using Remote Sensing and GIS in Gandaki Province, Nepal. In Proceedings of the 4th KEC International Conference on Engineering and Technology (pp. 45–52).",
    bibtex: `@inproceedings{lamichhane2022gandaki,
  title={Agricultural Drought Assessment Using Remote Sensing and GIS in Gandaki Province, Nepal},
  author={Lamichhane, Sadhuram},
  booktitle={Proceedings of the 4th KEC International Conference on Engineering and Technology},
  year={2022}
}`,
  },
];

type FilterCategory = "all" | "urban" | "suitability" | "drought";

export default function ResearchPublications() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPublications =
    activeCategory === "all"
      ? PUBLICATIONS
      : PUBLICATIONS.filter((p) => p.category === activeCategory);

  const handleCopyCitation = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.citationApa);
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = pub.citationApa;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedId(pub.id);
        setTimeout(() => setCopiedId(null), 2500);
      } catch {
        // Fallback gracefully
      }
    }
  };

  const landmarkPaper = PUBLICATIONS[0];

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative z-10 bg-[#121212] text-[#FCFCFC] py-20 md:py-28 border-t border-[#303030]"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[#303030] pb-5 font-mono text-xs tracking-widest uppercase">
          <h2 id="research-heading" className="font-medium text-[#FCFCFC]">
            Research &amp; Publications
          </h2>
          <p className="text-[#FCFCFC]/50">Scholarly Literature &amp; Computational GIS</p>
        </header>

        {/* Lead Statement & Scholarly Metrics Datum */}
        <div className="pt-10 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-[#FCFCFC]/50 tracking-wider uppercase block mb-3">
              Peer-Reviewed Scientific Output
            </span>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-balance leading-[1.14] text-[#FCFCFC]">
              Rigorous spatial modeling, land suitability algorithms, and earth observation analytics.
            </p>
          </div>

          {/* Academic Metrics Benchmark Panel */}
          <div className="lg:col-span-4 bg-[#1C1C1C] border border-[#303030] rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#303030] pb-3 font-mono text-[11px] text-[#FCFCFC]/60 uppercase tracking-wider">
              <span>Scholarly Datum</span>
              <span>Volume</span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div>
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#FCFCFC] block">
                  05
                </span>
                <span className="font-mono text-[10px] text-[#FCFCFC]/55 uppercase tracking-wide mt-1 block">
                  Peer-Reviewed
                </span>
              </div>
              <div className="border-x border-[#303030] px-3">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#FCFCFC] block">
                  03
                </span>
                <span className="font-mono text-[10px] text-[#FCFCFC]/55 uppercase tracking-wide mt-1 block">
                  Intl Journals
                </span>
              </div>
              <div className="pl-1">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#FCFCFC] block">
                  02
                </span>
                <span className="font-mono text-[10px] text-[#FCFCFC]/55 uppercase tracking-wide mt-1 block">
                  Symposia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-[#303030] font-mono text-xs">
          <span className="text-[#FCFCFC]/40 uppercase tracking-wider mr-2 text-[11px]">
            Filter Discipline:
          </span>
          {(
            [
              { id: "all", label: "All Papers", count: PUBLICATIONS.length },
              {
                id: "urban",
                label: "Urban Sprawl & Dynamics",
                count: PUBLICATIONS.filter((p) => p.category === "urban").length,
              },
              {
                id: "suitability",
                label: "Land Suitability & MCE",
                count: PUBLICATIONS.filter((p) => p.category === "suitability").length,
              },
              {
                id: "drought",
                label: "Earth Observation & Drought",
                count: PUBLICATIONS.filter((p) => p.category === "drought").length,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-xs font-mono flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? "bg-[#FCFCFC] text-[#121212] border-[#FCFCFC] font-semibold shadow-xs"
                  : "bg-[#1C1C1C] text-[#FCFCFC]/70 border-[#303030] hover:border-[#FCFCFC]/40 hover:text-[#FCFCFC]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === tab.id
                    ? "bg-[#121212]/15 text-[#121212]"
                    : "bg-white/10 text-[#FCFCFC]/60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* FEATURED LANDMARK PAPER (Top Hero Monograph) */}
        {activeCategory === "all" && (
          <div className="pt-10 pb-8">
            <div className="relative rounded-2xl bg-[#1C1C1C] border border-[#303030] p-6 sm:p-8 lg:p-10 shadow-lg overflow-hidden group">
              {/* Subtle top cartographic datum mark */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#303030] pb-4 font-mono text-xs text-[#FCFCFC]/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-[#121212] bg-[#FCFCFC] px-2.5 py-0.5 rounded-xs">
                    {landmarkPaper.year} · FEATURED PAPER
                  </span>
                  <span className="text-[#FCFCFC]/50 text-[11px]">
                    Lead Author & Primary Investigator
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#FCFCFC]/70 bg-[#262626] border border-[#3A3A3A] px-2.5 py-0.5 rounded-xs">
                  {landmarkPaper.venue}
                </span>
              </div>

              {/* Title & Scope */}
              <div className="pt-6 max-w-4xl">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FCFCFC] leading-tight">
                  {landmarkPaper.title}
                </h3>
                <p className="font-mono text-xs text-[#FCFCFC]/60 mt-3 flex items-center gap-2">
                  <span>Author:</span>
                  <span className="font-semibold text-[#FCFCFC]">{landmarkPaper.authors}</span>
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#FCFCFC]/80 leading-relaxed max-w-3xl">
                  {landmarkPaper.abstract}
                </p>
              </div>

              {/* Methodologies & Action Buttons */}
              <div className="mt-6 pt-5 border-t border-[#303030] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {landmarkPaper.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11px] text-[#FCFCFC]/75 bg-[#262626] border border-[#3A3A3A] px-2.5 py-0.5 rounded-xs"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation(landmarkPaper)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-lg border border-[#3A3A3A] bg-[#222222] hover:bg-[#2A2A2A] text-[#FCFCFC] transition-colors cursor-pointer"
                  >
                    <span>{copiedId === landmarkPaper.id ? "✓ Copied Citation" : "Copy Citation"}</span>
                  </button>
                  {landmarkPaper.url && (
                    <a
                      href={landmarkPaper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-lg bg-[#FCFCFC] hover:bg-[#E5E5E5] text-[#121212] font-semibold transition-colors shadow-xs"
                    >
                      <span>Direct DOI ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECONDARY PUBLICATIONS GRID (Architectural 2-Column Cards) */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPublications
            .filter((p) => (activeCategory === "all" ? p.id !== landmarkPaper.id : true))
            .map((pub) => (
              <article
                key={pub.id}
                className="rounded-xl bg-[#1C1C1C] border border-[#303030] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#4A4A4A] group"
              >
                <div>
                  {/* Card Header Datum */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#303030] pb-3 font-mono text-xs text-[#FCFCFC]/60">
                    <span className="font-semibold text-[#FCFCFC] bg-[#262626] px-2 py-0.5 rounded-xs">
                      {pub.year}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#FCFCFC]/50 truncate max-w-[200px]">
                      {pub.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="pt-4 text-lg sm:text-xl font-medium tracking-tight text-[#FCFCFC] leading-snug group-hover:text-white">
                    {pub.title}
                  </h4>

                  {/* Venue & Authors */}
                  <p className="font-mono text-xs text-[#FCFCFC]/55 mt-2.5 italic">
                    {pub.venue}
                  </p>
                  <p className="font-mono text-[11px] text-[#FCFCFC]/50 mt-1">
                    {pub.authors}
                  </p>

                  {/* Concise Abstract Snippet */}
                  <p className="mt-3 text-xs sm:text-sm text-[#FCFCFC]/75 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>

                {/* Footer Controls & Keywords */}
                <div className="mt-5 pt-4 border-t border-[#303030] flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {pub.keywords.slice(0, 2).map((kw, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-[#FCFCFC]/60 bg-[#262626] border border-[#333333] px-2 py-0.5 rounded-xs"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(pub)}
                      className="font-mono text-[11px] text-[#FCFCFC]/60 hover:text-[#FCFCFC] px-2 py-1 rounded-sm border border-transparent hover:border-[#3A3A3A] transition-colors cursor-pointer"
                      title="Copy APA Citation"
                    >
                      {copiedId === pub.id ? "✓ Copied" : "Cite"}
                    </button>
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#FCFCFC] hover:underline underline-offset-2"
                      >
                        <span>DOI Access</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-[#FCFCFC]/45">
                        Symposium
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
