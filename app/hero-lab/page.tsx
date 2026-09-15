import type { Metadata } from "next";
import HeroLab from "@/components/hero/hero-lab";

export const metadata: Metadata = {
  title: "Hero Lab — Previous Photographic Hero (Reference)",
  description:
    "Retained noindex reference route preserving the previous photographic parallax hero experiment. Superseded in production by the approved video hero.",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return <HeroLab />;
}
