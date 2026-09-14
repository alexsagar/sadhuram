# Motion System & Scroll Architecture

## 1. Core Tooling
- **Smooth Scroll Driver**: **Lenis** (`lenis@^1.3.x`) — centralized singleton provider.
- **2D & Choreography Engine**: **GSAP** (GreenSock Animation Platform) + **ScrollTrigger**.
- **Spatial 3D Motion**: **React Three Fiber** / **Three.js** `useFrame` loop coordinated with GSAP timeline states and Lenis scroll progress.

---

## 2. Motion Philosophy
Motion in this project is an instrument of precision, clarity, and spatial explanation:
- **Measured**: Timing mirrors physical instrument movement or geographic progression.
- **Coherent**: Every animation shares easing curves derived from natural physical inertia (`power2.out`, `power3.out`, `sine.inOut`).
- **Interruptible**: User navigation and fast scrolling take precedence over animation completions.
- **Performant**: Animations run on composited properties (`transform: translate3d/scale3d`, `opacity`) or WebGL vertex attributes.
- **Spatial Immersion**: The visitor feels as though they are moving *through* geographic information, not simply scrolling past UI boxes.

---

## 3. Scroll Experience

### Lenis Architecture & GSAP Synchronization
Lenis is initialized once at the root via `<SmoothScrollProvider>` and synchronized with GSAP ScrollTrigger:
```ts
// Lenis notifies ScrollTrigger of every scroll update
lenis.on("scroll", ScrollTrigger.update);

// GSAP central ticker drives the Lenis RAF loop without duplicate loops
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Avoid lag smoothing jumps during heavy rendering
gsap.ticker.lagSmoothing(0);
```

### Approved Lenis Configuration
The objective is **smoothness**, not slow motion. Scrolling must feel immediate, controlled, and responsive without floating lag:
- `duration: 1.05` (responsive interpolation; 0 when reduced-motion is requested)
- `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `smoothWheel: true`
- `wheelMultiplier: 1.0`
- `touchMultiplier: 1.5`
- `autoResize: true`

### Scroll Rhythm & Archetypes
The page alternates intentionally between five distinct scroll behaviors to create cadence:
1. **Normal Editorial Scroll**: Crisp, comfortable reading of text, credentials, and technical data.
2. **Immersive Full-Viewport Moments (`100svh`)**: Full-screen spatial focus (Hero, major spatial case studies, closing chapter).
3. **Pinned Spatial Experiences**: Brief, purposeful pin states where vertical scroll unfolds spatial layers or camera approach.
4. **Controlled Horizontal Storytelling**: Pinned horizontal progression on desktop for sequential spatial frames (e.g. Selected Projects).
5. **Sticky Reveal Transitions**: Browser-native CSS `position: sticky` used to hold headings or reveal underlying full-viewport footer layers.

*Rule: Special scroll behaviors are meaningful only because the majority of editorial content remains calm and unpinned.*

---

## 4. "Dive Into The Section" Spatial Behavior
Certain approved sections create the sensation of traveling *into* spatial data.
This is **NOT** a superficial scale/blur trick. It is a coordinated spatial choreography:
- 3D camera progresses down toward the terrain surface.
- Foreground vector layers separate slightly in Z-depth.
- Contour lines increase in spatial separation.
- Cadastral / parcel lines or analytical zones resolve as the camera approaches.
- Typography clears the focal plane cleanly.
- Planimetric 2D map detail emerges seamlessly from the 3D relief model.

---

## 5. Pinning & Horizontal Storytelling Rules
- **Pinning Restraint**: Never pin multiple consecutive sections. Pinned durations must be concise, intuitive, and devoid of empty spacer voids.
- **Desktop Horizontal Track**:
  - Vertical scroll drives horizontal movement of editorial project panels.
  - Calculated dynamically (`const travel = trackWidth - viewportWidth`) with `invalidateOnRefresh: true`.
  - No carousel dots, no swipe arrows, no e-commerce card look.
- **Mobile Strategy**: On mobile viewports (`< 768px`), pinned horizontal tracks automatically convert into clean vertical editorial stacks. Small screens never suffer horizontal scrub traps.

---

## 6. Full-Viewport Sticky Footer Reveal
- The closing contact section occupies `min-height: 100svh`.
- Implemented using a natural document flow + sticky reveal container (`position: sticky; bottom: 0; min-height: 100svh; z-index: 0;`) with preceding content layered above (`z-index: 10;`).
- As the preceding section rises, the deep spatial footer environment is revealed beneath it, feeling like an arrival at a final destination.

---

## 7. Scroll Depth System (Three Motion Depths)
To maintain visual clarity, elements are categorized into three distinct motion depths:
- **Depth 1 — Interface**: Headings, body copy, navigation, buttons. Minimal movement (`y: 0` to `y: 16px` max).
- **Depth 2 — Editorial Media**: Orthomosaics, project maps, survey photographs. Moderate parallax only when meaningful.
- **Depth 3 — Spatial Environment**: 3D terrain mesh, contour lines, camera trajectory. Largest perceptual depth.

### Parallax & Velocity Restraint
- Parallax is subtle and almost imperceptible consciously; no floating photos or loose cards.
- Scroll velocity does not trigger extreme geometry distortion, rotations, or text skew. Progress-based animation is strictly preferred.

---

## 8. Anchor Navigation, Route Changes & Modals
- **Anchor Links**: Internal links (`href="#..."`) are intercepted by the smooth scroll provider and scrolled via `lenis.scrollTo(target, { offset: -24 })`, ensuring ScrollTrigger positions remain accurate.
- **Route Changes**: Upon Next.js route change (`usePathname()`), `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()` are triggered immediately.
- **Modals / Overlays**: Scroll locking must be invoked via `lenis.stop()` and `lenis.start()` rather than arbitrary body overflow mutations.

---

## 9. Reduced Motion (`prefers-reduced-motion: reduce`)
When reduced motion is preferred:
- Lenis smooth wheel interpolation is disabled (`duration: 0` / native scroll).
- Pinned cinematic camera scrub sequences and horizontal scroll tracks resolve to static, naturally scrolled layouts.
- Anchor links jump natively without animation.

---

## 10. Hero Motion Choreography (Restrained Parallax & Contour Motif · D-034 / D-035 / D-036)

The hero scroll choreography operates across a concise desktop travel distance of `150svh` (`135svh` on tablet):
- **0.00 – 0.20 (Pristine Initial State)**: Real Himalayan landscape plates move vertically with restrained differential parallax (`backdrop: -1.0%`, `ridge: -2.4%`, `terrain: -4.8%`, `foreground: -7.6%`). Topographic contours are invisible (`opacity: 0.00`). Headline, role, and actions are crisp and prominent.
- **0.20 – 0.55 (Contour Fade-In & Identity Presentation)**: Topographic contours gradually fade in over the middle-hill terrain relief (`opacity: 0.00 -> 0.35`, synchronized with terrain travel at `-4.2% * p`). Text remains legible in the upper sky zone.
- **0.42 – 0.72 (Identity Release)**: Text header clears upward (`y: -24px`, opacity $1 \to 0$).
- **0.55 – 0.80 (Contour Peak State)**: Topographic contours are at peak subtle presence (`opacity: 0.35`), acting as a quiet geospatial motif draped over the physical topography.
- **0.80 – 0.98 (Contour Fade-Out & Paper Arrival)**: Contours fade out smoothly (`opacity: 0.35 -> 0.00`) as the landscape recedes and the editorial paper veil (`#F2F1EC`) smoothly fades in ($0 \to 1$).
- **0.98 – 1.00 (Editorial Release)**: Hero releases cleanly into the `#practice-test` editorial introduction without pauses or technical handoff screens.
- **Mobile (< 768px)**: Natural document flow. Zero scroll pinning. Subtle static contour watermark (`opacity: 0.16`).
- **Reduced Motion**: Static initial landscape, zero scrub, immediate text visibility, static subtle contour presence (`opacity: 0.22`).

All information, evidence, and actions remain 100% accessible.
