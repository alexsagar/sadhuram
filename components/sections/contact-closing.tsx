import React from "react";

export default function ContactClosing() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 border-t border-border-subtle bg-background text-foreground py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-border-subtle pb-5 font-mono text-xs tracking-widest uppercase">
          <p className="text-foreground-muted">09 / Direct Inquiries</p>
          <h2 id="contact-heading" className="font-medium text-foreground">
            Contact & Collaboration
          </h2>
        </header>

        {/* Large Editorial Headline */}
        <div className="pt-12 md:pt-16 pb-12 max-w-4xl">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.15]">
            Let&apos;s discuss land, mapping, and spatial decisions.
          </p>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mt-6 leading-relaxed">
            Available for statutory municipal land use planning, GIS database design, geodetic engineering surveys, and spatial risk analysis across Nepal.
          </p>
        </div>

        {/* Contact Coordinates Matrix */}
        <div className="border-t border-border-subtle pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-2">
              Primary Communications
            </p>
            <a
              href="mailto:sadhuramlamichhane2019@gmail.com"
              className="text-lg font-medium text-foreground hover:text-accent-strong transition-colors block"
            >
              sadhuramlamichhane2019@gmail.com
            </a>
            <a
              href="mailto:sadhuramlamichhane@uesc.edu.np"
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors block mt-1"
            >
              sadhuramlamichhane@uesc.edu.np
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-2">
              Direct Telephone
            </p>
            <a
              href="tel:+9779851142018"
              className="text-lg font-medium text-foreground hover:text-accent-strong transition-colors block"
            >
              +977 9851142018
            </a>
            <p className="font-mono text-xs text-foreground-muted mt-1">
              Kathmandu / Lalitpur Time (UTC +5:45)
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted mb-2">
              Academic & Professional Post
            </p>
            <p className="text-base font-medium text-foreground">
              Universal Engineering & Science College
            </p>
            <p className="text-sm text-foreground-muted mt-0.5">
              Department of Geomatics Engineering
            </p>
            <p className="font-mono text-xs text-foreground-muted mt-1">
              Chakupat, Lalitpur, Nepal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
