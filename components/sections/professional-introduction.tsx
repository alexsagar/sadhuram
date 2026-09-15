/** The quiet reading interval between the approved hero and practice evidence. */
import EngineeringPractice from "./engineering-practice";

export default function ProfessionalIntroduction() {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="bg-background pb-16 pt-6 text-foreground md:pb-24 md:pt-8">
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">02 / Profile</p>
          <h2 id="profile-heading" className="font-medium">Engineering Practice</h2>
        </header>
        <div className="grid gap-8 pt-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-12 md:pt-14 xl:gap-16">
          <p className="max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance lg:text-5xl">
            Turning spatial data into practical decisions.
          </p>
          <p className="max-w-prose text-base leading-7 text-foreground-muted">
            Er. Sadhuram Lamichhane is a registered Geomatics Engineer and GIS
            Expert working in Nepal. His practice connects field survey and
            satellite imagery with spatial databases, land use planning and
            infrastructure studies. He uses total station, GNSS and UAV survey
            data to prepare terrain models, maps and planning evidence. His work
            includes municipal land use classification, road surveys and hazard
            assessment, alongside GIS teaching and professional training.
          </p>
        </div>
        <EngineeringPractice />
      </div>
    </section>
  );
}
