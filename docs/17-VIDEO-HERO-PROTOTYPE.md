# 17 — Video Hero Prototype Evaluation: Geography in Motion

> **STATUS**: APPROVED / PRODUCTION (`D-042`). The hero documented here now ships on `/`.
> `/hero-video-lab` is retained as a noindex QA route rendering the same component.
> The hero direction is FROZEN — production bug fixes only.
> The previous photographic hero is retained at `/hero-lab` as a noindex reference (`D-043`).

## 1. Concept Overview
The `/hero-video-lab` prototype ("Geography in Motion" / "Nepal Video Scrub Hero") explores a cinematic scroll-driven video scrub paradigm for Er. Sadhuram Lamichhane's professional portfolio. It adapts the interaction mechanics of high-end scroll-scrub experiences (specifically the reference Tokyo Skyline hero) while translating the visual subject entirely into **real Nepal geography** and strictly adhering to the portfolio's **Cartographic Neutral / Engineering Editorial** design direction ([`D-020`](file:///D:/sadhuram/docs/10-DECISIONS.md)).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCROLL PROGRESSION ARCHITECTURE                                             │
├─────────────────┬─────────────────┬───────────────────┬─────────────────────┤
│ 0.00 – 0.35     │ 0.35 – 0.70     │ 0.68 – 0.90       │ 0.88 – 1.00         │
│ INITIAL STATE   │ CONTOUR MOTIF   │ LARGE NAME REVEAL │ PAPER RELEASE       │
├─────────────────┼─────────────────┼───────────────────┼─────────────────────┤
│ • Full-screen   │ • Video glides  │ • Video settles   │ • Editorial veil    │
│   video scrub   │   through hills │ • "SADHURAM       │   (#F2F1EC) eases   │
│ • Initial text  │ • Copernicus DEM│   LAMICHHANE"     │   over landscape    │
│   exits calmly  │   contours      │   rises behind    │ • Sticky hero       │
│ • Scroll cue    │   draped over   │   foreground hill │   releases to       │
│   clears (0.12) │   terrain       │ • Trees occlude   │   editorial practice│
└─────────────────┴─────────────────┴───────────────────┴─────────────────────┘
```

---

## 2. Relationship to Supplied Reference
The Tokyo Skyline reference was used strictly as an **interaction concept** (video scrub, layered foreground cutout, large name reveal sandwiched behind foreground geometry), and **not for style or code architecture**:

| Reference Feature | Reference Implementation | Our Prototype Implementation |
| :--- | :--- | :--- |
| **Scroll Engine** | `document.body.style.position = 'fixed'`, manual `wheel`/`touchmove` `preventDefault()` hijacking | **Zero scroll hijacking**. Native document scroll + CSS sticky `100svh` viewport + GSAP ScrollTrigger |
| **Smooth Scrolling**| Custom raw wheel listener with manual delta accumulation | Centralized **Lenis** provider (`SmoothScrollProvider`) driving GSAP ticker |
| **Visual Subject** | Tokyo neon cityscape & skyline cutout | **Real Nepal middle hills** (Kavrepalanchok landscape, terraced slopes, natural atmosphere) |
| **Navigation** | Liquid glassmorphism pill navbar with blur halos | **Engineering Editorial minimal navbar** with crisp typography and subtle status badge |
| **Scrub UI** | Bottom media progress bar | **Removed**. No progress bar; feels like an architectural exploration, not a media player |
| **Typography** | Japanese brand mark with character spacing expansions | **Geist architectural display**, restrained uppercase `#F2F1EC` text with zero distortion |

---

## 3. Video Source & Licensing
- **Geographic Subject**: Middle hills near Kavre, Bagmati Province, Nepal. Features authentic Himalayan agrarian topography: terraced slopes, deep valley relief, sub-tropical hill vegetation, and layered distant ridges under natural overcast sky.
- **Source Material**: High-resolution photogrammetric plates created from verified photographic captures by *Eagle Vision IT*.
- **License**: **CC0 1.0 Universal** (Public Domain Dedication). Verified permissive for commercial and professional usage without mandatory attribution.
- **Classification**: Marked as **TEMPORARY DEVELOPMENT ASSET** for prototype evaluation. If approved for production, client-owned 4K drone cinematography of statutory project sites in Nepal can be captured following the identical technical encoding specifications.

---

## 4. Video Technical Properties & Encoding
To guarantee immediate, lag-free scrubbing both forward and backward on desktop and laptop browsers:
- **Duration**: 6.0 seconds (180 frames at 30 fps).
- **Keyframe Interval (GOP)**: **`gop=6`** (`-keyint_min 3 -sc_threshold 0`). A keyframe is present every 0.2 seconds. This enables instant seeking without the decode stutter that plagues standard long-GOP web videos.
- **Desktop Codec / Formats**:
  - MP4 (H.264 High Profile, CRF 20, YUV420p, `+faststart`): **6,147 KB**
  - WebM (VP9, CRF 28): **6,386 KB**
- **Mobile Codec**:
  - MP4 (H.264, 960×540, CRF 22): **2,311 KB**
- **Poster Fallback**:
  - WebP Desktop (1600×900, Q85): **146.5 KB**
  - WebP Mobile (960×540, Q82): **60.7 KB**

---

## 5. Foreground Cutout Architecture & Depth Layering
The primary visual payoff of this prototype is the physical occlusion of the personal name by the foreground landscape:

```
VIEWER (Z: FRONT)
  │
  ├── [Z: 15] Navigation Bar (.navBar)
  ├── [Z: 10] Initial Editorial Typography (.heroHeader)
  ├── [Z:  9] Editorial Paper Veil (.veil, #F2F1EC)
  ├── [Z:  7] Foreground Landscape Cutout (.foregroundCutoutLayer) ──┐
  │           (196 KB WebP; terraced ridge, trees, vegetation)      │ OCCLUDES NAME
  ├── [Z:  6] Large Architectural Name (.largeNameLayer) ───────────┘
  │           ("SADHURAM LAMICHHANE" in #F2F1EC, 11vw)
  ├── [Z:  5] Copernicus DEM Topographic Contours (.contourOverlay)
  ├── [Z:  4] Contrast Scrim (.scrim)
  └── [Z:  1] Full-Screen Video Canvas (.videoContainer)
  │
BACKGROUND (Z: BACK)
```

Because `foreground.webp` was extracted directly from the photographic plates matching the final video frame coordinate system, the alignment between the video background and the foreground cutout is **100% pixel-perfect**: zero white halos, zero edge feathering, and zero artificial blurring.

---

## 6. Scroll & Animation Lifecycle

1. **Phase 1: Initial Presentation ($p = 0.00 \to 0.35$)**:
   - Initial landscape frame displays with maximum visual contrast (> 9:1 text contrast in upper sky).
   - "Scroll to explore" hairline indicator clears immediately ($p = 0.00 \to 0.12$).
   - Video scrubs forward smoothly: $t = (p / 0.70) \times \text{duration}$.
   - Initial title and CTAs lift and clear calmly ($p = 0.15 \to 0.38$).

2. **Phase 2: Topographic Contour Linework ($p = 0.35 \to 0.72$)**:
   - Genuine vector contours derived from Copernicus DEM GLO-30 regional elevation data emerge over the midground terrain ($p = 0.35 \to 0.52$, capped at 0.32 peak opacity).
   - Contours sit behind foreground trees ($z: 7$) and large name ($z: 6$), physically draped over the terrain relief.
   - Contours soften and fade out ($p = 0.68 \to 0.85$).

3. **Phase 3: Large Personal Name Reveal ($p = 0.68 \to 0.90$)**:
   - As video settles onto its final frame, `SADHURAM LAMICHHANE` rises from the valley ($p = 0.70 \to 0.88$, `y: 40 -> 0`, `opacity: 0 -> 1`).
   - The lower third of the letters is physically occluded by the foreground trees and terraced ridge, giving the impression that his name is a monument carved directly into the Himalayan geography.

4. **Phase 4: Editorial Paper Release ($p = 0.88 \to 1.00$)**:
   - Soft paper veil (`#F2F1EC`) smoothly fades in ($p = 0.88 \to 0.98$).
   - The sticky hero releases cleanly into the test editorial practice section without any blank voids or abrupt cuts.

---

## 7. Responsive & Accessibility Architecture

- **Desktop ($\ge 1024\text{px}$)**: Full video scrubbing across 250svh scroll travel with micro-depth cursor damping.
- **Tablet ($768\text{px} - 1023\text{px}$)**: Compact 220svh travel, scaled typographic sizing, smooth touch-scroll scrub.
- **Mobile ($< 768\text{px}$)**:
  - Natural document flow (`height: auto; min-height: 100svh;`).
  - Heavy video scroll scrubbing is disabled to prevent mobile battery drain and frame drops.
  - Displays high-resolution optimized poster (`poster-mobile.webp`, 60.7 KB) with static typography and authentic foreground landscape composition.
  - Total mobile payload: < 150 KB.
- **Reduced Motion (`prefers-reduced-motion: reduce`)**:
  - Video element is unmounted (`display: none !important`).
  - Clean static composition with poster image, visible headline, and accessible semantic HTML.
  - Zero scroll scrubbing, zero micro-depth, normal native document scroll.

---

## 8. Verification & Review Artifacts

All screenshots have been generated and archived in `artifacts/hero-video-lab-review/`:
- `1440x900-A-initial.png`: Initial landscape state with header typography and minimal nav.
- `1440x900-B-early-scrub.png`: Early video scrub progression with clearing introductory statement.
- `1440x900-C-contours.png`: Subtle Copernicus DEM contours draped over midground terrain.
- `1440x900-D-large-name.png`: Large name emerging behind ridge lines.
- `1440x900-E-foreground-occlusion.png`: Peak architectural reveal with trees and terraced ridges occluding letters.
- `1440x900-F-editorial-exit.png`: Seamless paper handoff into `#F2F1EC`.
- Additional tablet and mobile captures: `1024x768`, `820x1180`, `768x1024`, `390x844`, `320x568`.
