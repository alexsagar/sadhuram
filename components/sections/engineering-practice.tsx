const PRACTICES = [
  "GIS & Spatial Analysis",
  "Land Use Planning & Zoning",
  "Surveying & GNSS",
  "Remote Sensing & UAV",
];

/** Compact practice index; detailed project evidence belongs in Selected Projects. */
export default function EngineeringPractice() {
  return (
    <div id="engineering-practice" className="mt-10 scroll-mt-28 border-y border-border-subtle md:mt-14">
      <ul aria-label="Engineering practice areas" className="grid md:grid-cols-2 lg:grid-cols-4">
        {PRACTICES.map((title) => (
          <li key={title} className="min-w-0 border-b border-border-subtle py-5 last:border-b-0 md:px-6 md:py-6 md:odd:pl-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:odd:pl-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
            <p className="max-w-60 text-lg leading-snug font-medium tracking-tight text-foreground">{title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
