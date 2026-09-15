import type { Metadata } from "next";
import VideoHero from "@/components/hero-video/video-hero";
import ProfessionalIntroduction from "@/components/sections/professional-introduction";

export const metadata: Metadata = {
  title: {
    absolute: "Sadhuram Lamichhane | Geomatics Engineer & GIS Expert",
  },
  description:
    "Er. Sadhuram Lamichhane — licensed Geomatics Engineer and GIS Expert in Nepal. Land use planning, spatial analysis, surveying and remote sensing for land, infrastructure and planning.",
};

export default function HomePage() {
  return (
    <main id="main-content">
      {/* 01 / Approved cinematic video hero — frozen, single source of truth */}
      <VideoHero />

      {/* 02 / Profile — compact introduction and practice index */}
      <ProfessionalIntroduction />

      {/* Anchor destination for the hero 'Projects' link until Section 03 lands */}
      <div
        id="selected-projects"
        aria-hidden="true"
        className="sr-only"
        tabIndex={-1}
      />
    </main>
  );
}
