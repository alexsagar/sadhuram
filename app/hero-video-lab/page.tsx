import type { Metadata } from "next";
import VideoHero from "@/components/hero-video/video-hero";

export const metadata: Metadata = {
  title: "Hero Video Lab — Approved Hero QA Reference",
  description:
    "Noindex QA reference route rendering the approved production video hero component in isolation.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * QA / reference route. It renders the same approved component the production
 * homepage uses — no forked copy — so the hero has one source of truth.
 * Navigation targets resolve back to the homepage sections.
 */
export default function HeroVideoLabPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <VideoHero
        profileHref="/#profile"
        practiceHref="/#engineering-practice"
        projectsHref="/#selected-projects"
      />
    </main>
  );
}
