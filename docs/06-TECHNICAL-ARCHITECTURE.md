# Technical Architecture

## 1. Stack Foundation
- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19 (Strict Mode enabled)
- **Language**: TypeScript (Strict type checking, zero implicit `any`)
- **Styling**: Tailwind CSS v4 + Semantic CSS Custom Properties (Design Tokens)
- **Smooth Scrolling**: Lenis (`lenis@^1.3.x`)
- **Animation & Timelines**: GSAP + ScrollTrigger
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Package Manager**: npm

---

## 2. Directory Structure
```
D:\sadhuram\
├── app/                                 # Next.js App Router root
│   ├── layout.tsx                       # Root HTML shell, fonts, smooth-scroll provider
│   ├── page.tsx                         # Homepage composition
│   ├── globals.css                      # Theme tokens, base typography, reset
│   └── ...                              # Future routes (/about, /projects, etc.)
├── components/                          # Reusable UI, Spatial, & Provider components
│   ├── providers/                       # Global client providers
│   │   └── smooth-scroll-provider.tsx   # Centralized Lenis & GSAP ScrollTrigger sync
│   ├── layout/                          # Header, Navigation, Footer, Container, Section
│   ├── ui/                              # Accessible primitives (Button, Badge, CoordinateTag)
│   ├── hero/                            # Hero canvas, overlays, camera management
│   │   ├── hero-canvas.tsx              # R3F Canvas wrapper with fallback
│   │   ├── hero-content.tsx             # Editorial typography and actions
│   │   └── scene/                       # 3D spatial terrain, contours, markers
│   ├── sections/                        # Major editorial storytelling sections
│   │   ├── selected-projects/           # Pinned horizontal frame sequence
│   │   ├── geographic-footprint/        # Interactive/sticky map across Nepal
│   │   └── contact-footer/              # Full-viewport sticky reveal footer
│   └── motion/                          # Reusable motion hooks & utilities
├── lib/                                 # Utilities, coordinate math, GSAP registration
│   ├── gsap.ts                          # Centralized GSAP SSR-safe client registration
│   └── utils.ts                         # Class merging and string helpers
├── docs/                                # Project documentation & architectural logs
├── public/                              # Static assets, fonts, verified CV documents
├── Details.docx                         # Authoritative CV & project history document
├── AGENTS.md                            # AI Agent instructions & prohibited pattern rules
├── package.json
└── tsconfig.json
```

---

## 3. Smooth Scroll & GSAP Architecture
- **Single Owner**: Lenis initialization is centralized inside `<SmoothScrollProvider>`. No multiple or fragmented instances.
- **Loop Coordination**: GSAP ticker drives `lenis.raf(time * 1000)`; Lenis scroll events trigger `ScrollTrigger.update()`.
- **Navigation Safety**: Anchor clicks smoothly interpolate without position drift; route changes trigger immediate top reset and `ScrollTrigger.refresh()`.
- **Accessibility**: Smooth interpolation is disabled automatically when `prefers-reduced-motion: reduce` is active.

---

## 4. WebGL Architecture & Progressive Enhancement
- **Client Boundary**: R3F components are isolated behind `'use client'` dynamic imports with `ssr: false`.
- **Progressive Enhancement**:
  - The hero is functional without WebGL. If WebGL context creation fails or is unsupported, an elegant static cartographic relief fallback is displayed.
  - No critical career information or user action is trapped inside the canvas.
- **Resource Management**:
  - Geometries and materials are disposed of cleanly on unmount.
  - Animation frame loops pause when the hero is scrolled out of viewport (IntersectionObserver / ScrollTrigger).
  - Canvas pixel ratio is clamped (`dpr={[1, 2]}`) to protect high-density screens from GPU bottlenecks.

---

## 5. State & Data Strategy
- In Phase 1 and initial phases, data is stored in structured, typed TypeScript fixtures derived directly from `Details.docx`.
- No premature database or CMS complexity. Simplicity and build-time static generation ensure near-instant page loads and zero hosting maintenance overhead.
