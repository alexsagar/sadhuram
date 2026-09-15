import EngineeringPractice from "./engineering-practice";

export default function ProfessionalIntroduction() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative z-10 border-t border-border-subtle bg-background pt-20 pb-16 text-foreground md:pt-28 md:pb-24"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Quiet running header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">02 / Profile</p>
          <h2 id="profile-heading" className="font-medium text-foreground">
            Engineering Practice
          </h2>
        </header>

        {/* Calm editorial statement and concise 2-sentence introduction */}
        <div className="grid gap-8 pt-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12 md:pt-14 xl:gap-16">
          <p className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Turning spatial data into practical decisions.
          </p>
          <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
            Er. Sadhuram Lamichhane is a Geomatics Engineer and GIS Expert working across
            spatial analysis, surveying, land use planning and infrastructure. His practice connects
            field observations with geographic data to support informed decisions about land and place.
          </p>
        </div>

        {/* Visual Engineering Practice sequence */}
        <EngineeringPractice />
      </div>
    </section>
  );
}
