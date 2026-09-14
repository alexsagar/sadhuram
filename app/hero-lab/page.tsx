import type { Metadata } from "next";
import HeroLab from "@/components/hero/hero-lab";

export const metadata: Metadata = {
  title: "Hero Lab | Spatial Layers in Motion",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return <HeroLab />;
}
