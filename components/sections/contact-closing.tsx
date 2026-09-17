import React from "react";

export default function ContactClosing() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 border-t border-white/10 bg-transparent text-[#FCFCFC] py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-(--container-max) px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[#262626] pb-4 font-mono text-xs tracking-widest uppercase text-[#888888]">
          <p className="text-[#FCFCFC]">Direct Inquiries</p>
          <p className="text-[#707070]">Kathmandu &amp; Lalitpur, Nepal</p>
        </header>

        {/* Editorial Headline & Context */}
        <div className="pt-12 md:pt-16 pb-16 max-w-4xl">
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#FCFCFC] leading-[1.1] font-heading"
          >
            Let&apos;s discuss land, mapping, and spatial decisions.
          </h2>
          <p className="text-base sm:text-lg text-[#999999] max-w-2xl mt-5 leading-relaxed font-sans">
            Available for statutory municipal land use planning, GIS database design, geodetic engineering surveys, and spatial risk analysis across Nepal.
          </p>
        </div>

        {/* Clean, Minimal Direct Communication Channels — Direct on canvas, no heavy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-10 border-t border-[#262626]">
          {/* Email Channel */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#707070] block mb-3">
              Direct Correspondence
            </span>
            <a
              href="mailto:sadhuramlamichhane2019@gmail.com"
              className="text-base sm:text-lg xl:text-xl font-mono text-[#FCFCFC] hover:text-white hover:underline underline-offset-4 transition-colors block font-medium break-all"
            >
              sadhuramlamichhane2019@gmail.com
            </a>
            <a
              href="mailto:sadhuramlamichhane@uesc.edu.np"
              className="text-xs sm:text-sm font-mono text-[#888888] hover:text-[#FCFCFC] transition-colors block mt-2 break-all"
            >
              sadhuramlamichhane@uesc.edu.np
            </a>
            <p className="font-mono text-[11px] text-[#606060] mt-3">
              Official &amp; Academic Matters
            </p>
          </div>

          {/* Telephony Channel */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#707070] block mb-3">
              Direct Telephony
            </span>
            <a
              href="tel:+9779851142018"
              className="text-2xl font-mono font-medium text-[#FCFCFC] hover:underline underline-offset-4 transition-colors block"
            >
              +977 9851142018
            </a>
            <p className="font-mono text-xs text-[#888888] mt-2">
              Nepal Standard Time (UTC +5:45)
            </p>
            <p className="font-mono text-[11px] text-[#606060] mt-1">
              Sunday — Friday &middot; 09:00 — 17:00 NPT
            </p>
          </div>

          {/* Academic & Practice Office */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#707070] block mb-3">
              Academic Headquarters
            </span>
            <p className="text-base font-semibold text-[#FCFCFC]">
              Universal Engineering &amp; Science College
            </p>
            <p className="text-sm text-[#999999] mt-1">
              Department of Geomatics Engineering
            </p>
            <p className="font-mono text-xs text-[#707070] mt-3">
              Chakupat, Lalitpur, Nepal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
