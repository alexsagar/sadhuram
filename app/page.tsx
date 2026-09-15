import type { Metadata } from "next";
import VideoHero from "@/components/hero-video/video-hero";
import ProfessionalIntroduction from "@/components/sections/professional-introduction";
import SelectedProjects from "@/components/sections/selected-projects";
import AreasOfPractice from "@/components/sections/areas-of-practice";
import WorkAcrossNepal from "@/components/sections/work-across-nepal";
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
    <main id="main-content" className="relative">
      {/* 01 / Approved cinematic video hero — frozen */}
      <VideoHero />

      {/* 02 / Profile & Engineering Practice — calm & visual */}
      <ProfessionalIntroduction />

      {/* 03 / Selected Projects — immersive horizontal on desktop, vertical on mobile */}
      <SelectedProjects />

      {/* 04 / Areas of Practice — calm typographic discipline matrix */}
      <AreasOfPractice />

      {/* 05 / Work Across Nepal — spatial interactive vector map & location roster */}
      <WorkAcrossNepal />

      {/* 06 / Experience — curated editorial career progression */}
      <Experience />

      {/* 07 / Research & Publications — peer-reviewed papers with DOIs */}
      <ResearchPublications />

      {/* 08 / Field Practice & Instruction — authentic photographic evidence */}
      <FieldPractice />

      {/* 09 / Contact & Collaboration — calm editorial inquiry statement */}
      <ContactClosing />

      {/* 10 / Full-Viewport Sticky Footer — dark graphite monograph closure */}
      <StickyFooter />

      {/* Floating Directory Navigation — appears only when hero fades away */}
      <FloatingNavbar />
    </main>
  );
}
