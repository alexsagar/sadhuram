import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121B17",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "Er. Sadhuram Lamichhane | GIS Expert & Geomatics Engineer",
    template: "%s | Er. Sadhuram Lamichhane",
  },
  description:
    "Professional portfolio and research archive of Er. Sadhuram Lamichhane — GIS Expert, Geomatics Engineer, Researcher, and Educator specializing in spatial modeling, remote sensing, UAV photogrammetry, and infrastructure planning.",
  keywords: [
    "Sadhuram Lamichhane",
    "GIS Expert Nepal",
    "Geomatics Engineer",
    "Remote Sensing",
    "Photogrammetry",
    "Spatial Analysis",
    "Topographic Survey",
    "Hazard Mapping",
    "Land Use Planning Nepal",
  ],
  authors: [{ name: "Er. Sadhuram Lamichhane" }],
  creator: "Er. Sadhuram Lamichhane",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Er. Sadhuram Lamichhane | GIS Expert & Geomatics Engineer",
    description:
      "Professional portfolio of Er. Sadhuram Lamichhane. Spatial analysis, remote sensing, surveying, and geomatics engineering.",
    siteName: "Er. Sadhuram Lamichhane Portfolio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
