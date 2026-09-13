# Er. Sadhuram Lamichhane — Professional Portfolio

> **Production Portfolio Website**  
> GIS Expert · Geomatics Engineer · Researcher · Educator / Trainer

---

## Overview
This repository contains the source code for the professional portfolio of **Er. Sadhuram Lamichhane**, an accomplished Geomatics Engineer and GIS Expert with extensive experience across Nepal's diverse topographic, hydrological, and municipal landscapes.

The website is art-directed under the **Geospatial Editorial** aesthetic — blending engineering precision, cartographic discipline, Swiss editorial composition, and restrained 3D spatial visualization.

---

## Key Technologies
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Runtime**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Semantic Design Tokens
- **3D Spatial Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Motion & Choreography**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Typography**: [Geist & Geist Mono](https://vercel.com/font) via `next/font`

---

## Architectural Documentation
All project guidelines, design tokens, and decisions are documented inside the [`docs/`](./docs/) directory:
- [00-PROJECT-BRIEF.md](./docs/00-PROJECT-BRIEF.md) — Positioning, audiences, and goals.
- [01-DESIGN-DIRECTION.md](./docs/01-DESIGN-DIRECTION.md) — Geospatial Editorial visual philosophy.
- [02-DESIGN-PRINCIPLES.md](./docs/02-DESIGN-PRINCIPLES.md) — Twelve inviolable design rules.
- [03-CONTENT-ARCHITECTURE.md](./docs/03-CONTENT-ARCHITECTURE.md) — Site map and section roadmap.
- [04-HERO-DIRECTION.md](./docs/04-HERO-DIRECTION.md) — "Spatial Layers in Motion" full-screen hero.
- [05-MOTION-SYSTEM.md](./docs/05-MOTION-SYSTEM.md) — GSAP motion choreography & accessibility.
- [06-TECHNICAL-ARCHITECTURE.md](./docs/06-TECHNICAL-ARCHITECTURE.md) — Component architecture & progressive enhancement.
- [07-RESPONSIVE-STRATEGY.md](./docs/07-RESPONSIVE-STRATEGY.md) — Viewport adaptation from 320px to 1440px+.
- [08-ACCESSIBILITY-PERFORMANCE.md](./docs/08-ACCESSIBILITY-PERFORMANCE.md) — WCAG 2.1 AA & WebGL optimizations.
- [09-CONTENT-SOURCE.md](./docs/09-CONTENT-SOURCE.md) — Authoritative content policy (`Details.docx`).
- [10-DECISIONS.md](./docs/10-DECISIONS.md) — Formal decision log.
- [11-TASKS.md](./docs/11-TASKS.md) — Implementation roadmap by phase.
- [12-QA-CHECKLIST.md](./docs/12-QA-CHECKLIST.md) — Quality assurance verification standard.

AI agents and contributors must also review [`AGENTS.md`](./AGENTS.md).

---

## Getting Started

### Prerequisites
- Node.js `20.x` or `22.x` (Tested on `v22.17.1`)
- npm `10.x` or `11.x` (Tested on `11.5.2`)

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project in development mode.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```
