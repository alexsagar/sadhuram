<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENT INSTRUCTIONS: Er. Sadhuram Lamichhane Portfolio

## 1. Mandatory Reading Before Any Task
Every AI agent, coding assistant, or developer working in this repository MUST read the following documents before planning or writing any code:
1. `AGENTS.md` (this document)
2. `docs/00-PROJECT-BRIEF.md`
3. `docs/01-DESIGN-DIRECTION.md`
4. `docs/02-DESIGN-PRINCIPLES.md`
5. `docs/10-DECISIONS.md`
6. `docs/11-TASKS.md`
7. Any feature-specific document relevant to your assigned task (e.g., `docs/04-HERO-DIRECTION.md`, `docs/05-MOTION-SYSTEM.md`, `docs/09-CONTENT-SOURCE.md`).

---

## 2. Professional Identity & Art Direction
This repository is the dedicated professional portfolio website for:
**Er. Sadhuram Lamichhane** — GIS Expert, Geomatics Engineer, Researcher, and Educator/Trainer.

- The approved visual direction is **CARTOGRAPHIC NEUTRAL / ENGINEERING EDITORIAL**.
- The website must feel professionally art-directed, calm, authoritative, scientifically rigorous, and architecturally refined.
- It must represent the high-stakes discipline of geomatics engineering, spatial modeling, infrastructure planning, and earth observation in Nepal.
- **Decoration without meaning should normally be removed.**
- No component should exist simply because an AI assistant commonly produces it. Every visual element must answer: *Why is this here, and how does it advance the geospatial subject matter?*

---

## 3. PROHIBITED DESIGN PATTERNS
The following design and visual patterns are **STRICTLY PROHIBITED** in this repository. Agents must never introduce any of these elements:

- Generic glowing orbs or blur halos
- Random particles or decorative particle fields
- Purple/blue AI gradients or neon lighting
- Neon cyberpunk visual language or dark matrix grids
- Excessive glassmorphism or unnecessary backdrop blur
- Random, unmotivated linear or radial gradients
- Fake dashboards, simulated charts, or pseudo-gauges
- Fake maps or non-georeferenced decorative vector blobs
- Stock technology graphics or generic circuit patterns
- Spinning 3D globes or revolving spheres
- Arbitrary network lines or floating constellation nodes
- Waveform animations with no physical or sensor meaning
- Floating cards with generic drop shadows
- Floating UI windows or faux-browser chrome
- Unnecessary pills, chips, and badge spam
- Excessive rounded rectangles (`rounded-2xl` / `rounded-3xl` on everything)
- Bento grids created only because they are trendy
- Gradients behind every heading or giant gradient text
- Meaningless number counters or fake counter tickers
- Fake statistics or invented percentage bars
- Generic feature icon grids with Lucide/Feather icon lists
- Decorative icons with no informational or cartographic purpose
- Oversized shadows or diffuse multi-layer drop shadows
- Glossy CTA buttons with reflective highlights
- Constant floating, bobbing, or pulsing animations
- Bounce animation or elastic overshoot easings
- Excessive scroll hijacking or momentum disruption
- Overdone cursor effects, magnetic cursor rings, or cursor trails
- Unnecessary custom cursor implementations
- Over-animated navbars that shrink, morph, or dance on scroll
- Rotating word carousels in headlines
- Marquees or ticker tapes with no substantive content reason
- Decorative loading screens created merely for style
- Random noise textures plastered over every surface
- Fake terminal or hacker CLI interfaces
- "Hi, I'm..." generic developer portfolio openings
- Avatar-in-a-circle hero layouts
- Generic left-aligned text / right-aligned card hero split
- SaaS pricing, testimonial, or feature visual language
- AI startup visual language
- Gaming interfaces or sci-fi HUD elements
- Meaningless 3D decoration disconnected from real spatial data

---

## 4. Authoritative Content Rule
- The single source of truth is **`Details.docx`** in the project root.
- **Never invent career information, project names, clients, dates, roles, publications, statistics, or credentials.**
- If content has not been verified from `Details.docx`, use an explicit placeholder noting verification is required.

---

## 5. Technology Standards
- **Framework**: Next.js 16 (App Router) with TypeScript (strict mode).
- **Styling**: Tailwind CSS v4 + Semantic CSS Custom Properties defined in `app/globals.css`.
- **3D**: Three.js via `@react-three/fiber` and `@react-three/drei`. Always isolate in client components with progressive enhancement.
- **Motion**: GSAP with ScrollTrigger. Always support `prefers-reduced-motion`.
- **Testing & Verification**: Always run `npm run lint` and `npm run build` before considering any task complete.
