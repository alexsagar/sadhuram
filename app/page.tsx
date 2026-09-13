export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-[1320px] mx-auto w-full">
      {/* Editorial Header / Geodetic Marker */}
      <header className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            Portfolio Workspace · Initial Foundation
          </span>
        </div>
        <div className="font-mono text-xs text-foreground-subtle flex items-center gap-4">
          <span>CRS: WGS 84 / UTM 45N</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span>Kathmandu, Nepal</span>
        </div>
      </header>

      {/* Main Subject Presentation */}
      <main className="py-16 sm:py-24 max-w-[760px]">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
          Geomatics Engineering · GIS & Spatial Analysis
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.15] mb-6">
          Er. Sadhuram Lamichhane
        </h1>

        <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed mb-8">
          GIS Expert, Geomatics Engineer, Researcher, and Educator specializing in spatial analysis,
          remote sensing, UAV photogrammetry, and risk-sensitive land use planning across Nepal.
        </p>

        <div className="bg-surface border border-border p-6 rounded-[4px] mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-foreground-muted font-medium">
              Phase 1 Status: Foundation Complete
            </span>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            Project architecture, Next.js 16 App Router, core dependencies (React Three Fiber, Three.js, GSAP),
            comprehensive design documentation, and semantic token systems are established.
            The final WebGL immersive hero will be art-directed in Phase 2.
          </p>
        </div>

        {/* Button & Link Treatment Validation */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/docs/00-PROJECT-BRIEF.md"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[4px] bg-accent text-[#FFFFFF] text-sm font-medium transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Review Project Brief
          </a>
          <a
            href="/docs/01-DESIGN-DIRECTION.md"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[4px] border border-border bg-surface text-foreground text-sm font-medium transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Design Direction
          </a>
        </div>
      </main>

      {/* Editorial Colophon / System Status */}
      <footer className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-foreground-subtle">
        <div>
          <span>Authoritative Source: Details.docx (Preserved)</span>
        </div>
        <div>
          <span>Design Direction: Cartographic Neutral / Engineering Editorial</span>
        </div>
      </footer>
    </div>
  );
}
