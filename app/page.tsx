import type { Metadata } from "next";
import Image from "next/image";
import GenesisHero from "@/components/hero/genesis-hero";
import ProfessionalIntroduction from "@/components/sections/professional-introduction";
import SelectedProjects from "@/components/sections/selected-projects";
import AreasOfPractice from "@/components/sections/areas-of-practice";
import Experience from "@/components/sections/experience";
import ResearchPublications from "@/components/sections/research-publications";
import FieldPractice from "@/components/sections/field-practice";
import ContactClosing from "@/components/sections/contact-closing";
import StickyFooter from "@/components/sections/sticky-footer";
import FloatingNavbar from "@/components/navigation/floating-navbar";

export const metadata: Metadata = {
  title: {
    absolute: "Sadhuram Lamichhane | Geomatics Engineer & GIS Expert",
  },
  description:
    "Er. Sadhuram Lamichhane — licensed Geomatics Engineer and GIS Expert in Nepal. Land use planning, spatial analysis, surveying, UAV photogrammetry and hazard modeling.",
};

export default function HomePage() {
  return (
    <main id="main-content" className="relative overflow-x-clip">
      {/* 01 + 02 / Continuous Landscape Environment: Hero through Section 02 */}
      <div className="relative overflow-hidden bg-[#121212]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <Image
            src="/media/hero-section-and-section-2-bg.webp"
            alt="Scenic mountain valley and terraced hills of Nepal"
            fill
            priority
            unoptimized
            className="object-cover object-top brightness-[0.9] contrast-[1.04]"
          />
          {/* Subtle top & bottom scrims so typography has crisp contrast while morning light, mountains, and valley remain clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent via-50% to-[#121212]" />
        </div>

        {/* 01 / Genesis Editorial Hero */}
        <GenesisHero />

        {/* 02 / Profile & Engineering Practice */}
        <ProfessionalIntroduction />
      </div>

      {/* 03 / Selected Projects — Bento Grid with images */}
      <SelectedProjects />

      {/* 04 / Areas of Practice — clean typographic discipline matrix on off-white */}
      <AreasOfPractice />

      {/* 05 / Experience — curated editorial career progression on off-white */}
      <Experience />

      {/* 06 / Research & Publications — peer-reviewed papers with DOIs */}
      <ResearchPublications />

      {/* 07 / Field Practice & Instruction — authentic photographic evidence */}
      <FieldPractice />

      {/* 08 + 09 / Continuous Panoramic Landscape: Direct Inquiries through Index & Colophon */}
      <div className="relative overflow-hidden bg-[#121212]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <Image
            src="/media/contact-and-colophon-bg.jpg"
            alt="Scenic Himalayan terraced ridges and river basin of Nepal"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center brightness-[0.72] contrast-[1.06]"
          />
          {/* Subtle gradient scrim so typography and data remain crystal clear while the cinematic daylight landscape breathes underneath */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/85 via-[#121212]/70 to-[#0A0A0A]/90" />
        </div>

        {/* 08 / Direct Inquiries & Collaboration */}
        <ContactClosing />

        {/* 09 / Index & Colophon Closure */}
        <StickyFooter />
      </div>

      {/* Floating Directory Navigation — appears only when hero fades away */}
      <FloatingNavbar />
    </main>
  );
}
