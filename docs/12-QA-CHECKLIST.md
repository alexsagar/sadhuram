# Quality Assurance & Verification Checklist

Every pull request, architectural milestone, and deployment must pass this QA checklist:

---

## 1. Design & Art Direction
- [ ] Visual direction adheres strictly to **Geospatial Editorial** (no generic AI or SaaS aesthetics).
- [ ] No prohibited patterns present (no glowing orbs, particle vortexes, spinning globes, glassmorphic cards, fake dashboards).
- [ ] Typography exhibits clear hierarchical pacing, optical balance, and correct measure (line lengths 60–75 characters).
- [ ] Whitespace is deliberate and structural; sections do not feel crowded or arbitrarily padded.
- [ ] Color values strictly utilize semantic CSS tokens (`var(--background)`, `var(--foreground)`, etc.).

---

## 2. Scroll Experience (Lenis & ScrollTrigger)
- [ ] Lenis feels immediate, controlled, and responsive (no floating lag or slippery delay).
- [ ] Trackpad scrolling feels natural and smooth.
- [ ] Mouse wheel increments feel balanced and steady.
- [ ] Keyboard navigation works (`ArrowUp`, `ArrowDown`, `Space`, `PageUp`, `PageDown`, `Home`, `End`).
- [ ] Anchor navigation (`#section`) works smoothly and lands with correct offset.
- [ ] Route navigation resets scroll position to top immediately without position bleeding.
- [ ] No scrolling traps (users can always advance or retreat effortlessly).
- [ ] Pinned sections enter and release cleanly without blank spacer voids.
- [ ] ScrollTrigger recalculates and refreshes accurately upon window resize.
- [ ] Pinned horizontal section displays zero unwanted clipping.
- [ ] Zero accidental horizontal body overflow (`overflow-x` is cleanly managed).
- [ ] Sticky footer reveal works without keyboard focus trapping or stacking bugs.
- [ ] Browser resize does not corrupt pin spacing or trigger layout shifts.
- [ ] Mobile orientation change remains fully usable and legible.

---

## 3. Motion & Choreography
- [ ] Cinematic sequences reinforce geospatial narrative (terrain, contours, data depth).
- [ ] No animation exists merely for decorative spectacle.
- [ ] `prefers-reduced-motion: reduce` fallback verified: instant layout, zero interpolation lag.
- [ ] No excessive camera movement, wobble, or disorientation.
- [ ] No bounce, elastic, or overshoot easing gimmicks.
- [ ] No scroll velocity distortion tricks (text skew, image stretching).

---

## 4. Performance & Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 1.8s.
- [ ] Cumulative Layout Shift (CLS) = 0.00.
- [ ] Zero significant scroll jank (smooth 60 FPS on standard displays).
- [ ] No layout thrashing during scroll scrub.
- [ ] GPU-accelerated composited transforms (`translate3d`, `scale3d`, `opacity`) used for all scrubbed motion.
- [ ] Zero continuous React state updates inside scroll frame handlers.
- [ ] Animations utilize DOM refs and GSAP timelines rather than React re-render loops.
- [ ] Three.js scene maintains steady frame rate; render loop pauses when offscreen.
- [ ] WebGL canvas pixel ratio clamped (`dpr <= 2`).
- [ ] Mobile WebGL scene geometry and shaders simplified appropriately.
- [ ] Zero hydration errors or unhandled console warnings.
- [ ] Minimal bundle footprint; zero redundant dependencies.

---

## 5. Responsive & Multi-Device
- [ ] **Large Desktop (1440px+)**: Expansive margins, sharp spatial resolution, full horizontal pinned sequence.
- [ ] **Standard Desktop (1280px)**: Baseline layout perfectly balanced.
- [ ] **Small Desktop / Laptop (1024px)**: No overlapping columns or clipping elements.
- [ ] **Tablet (768px - 834px)**: Touch targets >= 44px, legible text sizing, touch-tuned Lenis scroll.
- [ ] **Large Mobile (430px - 390px)**: Clear single-column vertical flow, horizontal tracks convert to vertical stacks, zero horizontal scrollbar.
- [ ] **Small Mobile (375px - 320px)**: Critical content fully legible, 16px min padding, zero clipping.

---

## 6. Accessibility (a11y)
- [ ] Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) properly structured.
- [ ] Unbroken heading hierarchy (`<h1>` to `<h4>`). Exactly one `<h1>` per page.
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for body copy, 7:1 for headings).
- [ ] Full keyboard navigability with visible, high-contrast focus outlines.
- [ ] Canvas elements tagged with `aria-hidden="true"`; alternative accessible content in DOM.

---

## 7. Content Integrity
- [x] All career claims, degrees, titles, and dates are verified against `Details.docx`.
- [x] No invented project names, metrics, clients, or statistics.
- [x] Unverified items explicitly marked with `[Pending Verification]`.

---

## 8. Section 02 Professional Introduction Verification
- [x] Natural paper background `#F2F1EC` creates calm, high-contrast transition from hero.
- [x] Asymmetrical 12-column editorial grid on desktop with sticky visual alignment.
- [x] Headline: *"Geomatics engineering grounded in real places and real decisions."*
- [x] Authoritative 2-paragraph narrative answering *Who is Sadhuram? What kind of professional is he? What problems does he solve?*
- [x] 5 core practice disciplines with numbered monospace indices (`01`–`05`), zero generic icons.
- [x] Genuine rectangular portrait photograph from `Details.docx` (CSIS UTokyo GNSS Workshop, Jan 2022) with factual caption.
- [x] Discrete verified credentials strip (NEC Reg. 221 Geomatics 'A', UNIGIS M.Sc. Distinction, UESC HOD).
- [x] WCAG AAA/AA contrast compliance across all text elements (15.2:1 heading, 5.1:1 body, 5.85:1 mono tags).
- [x] Hero CTA routing verified: `Explore Projects` $\to$ `#selected-projects`, `Professional Profile` $\to$ `#profile`.
- [x] Responsive layout verified across all viewports (1440px, 1280px, 1024px, 768px, 390px, 320px).

## Section 02 compact revision (current specification)
Earlier five-discipline and four-image sequence checks above describe superseded versions.
- [x] Server-rendered profile plus four-item practice index; no image scroller.
- [x] No new colors, icons, cards, hover gimmicks or scroll duration.
- [x] Tailwind responsive container and native vertical flow.
- [x] All 10 Node tests and production build pass.
- [ ] User visual approval; review current screenshots in `artifacts/section-02-audit/compact/`.
- [x] Compact browser QA across all ten target viewports: no clipping, overflow or console errors.
- [x] Reduced-motion capture saved; content has no motion dependency.
- [x] Impeccable layout detector returned no findings.
- [x] Lint: zero errors; existing/vendor warnings recorded in compact-lint.txt.
