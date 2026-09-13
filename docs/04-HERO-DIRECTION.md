# Hero Direction: Spatial Layers in Motion

## 1. Status
- **Direction**: APPROVED
- **Implementation Status**: Architectural specification documented. WebGL prototype scheduled for Phase 3.

---

## 2. Spatial Layers in Motion Concept
The hero is an art-directed, full-viewport 3D geospatial environment rendered with **React Three Fiber (Three.js)** and choreographed with **GSAP**.

- **Container**: `min-height: 100svh`, full-width, edge-to-edge canvas.
- **Placement**: The 3D scene is NOT trapped inside a card, right-hand column, rounded container, or browser mockup frame. It is the environment itself.
- **Typography**: Editorial typography sits directly within the spatial environment, layered with optimal contrast and depth.

---

## 3. Visual Layers & Hierarchy
The spatial scene visualizes the journey from physical landscape to structured analytical insight:

1. **Primary Layer — Terrain Surface (DEM / DTM)**:
   - High-fidelity elevation relief inspired by Himalayan topography and rugged river valleys.
   - Elegant hillshade and wire/solid hybrid rendering reflecting elevation data.
2. **Secondary Layer — Elevation Contours**:
   - Dynamic or measured topographic isolines tracing elevation intervals across the terrain surface.
   - Index contours distinguished from intermediate contours by line weight and subtle tonal difference.
3. **Supporting Spatial Overlays**:
   - Cadastral / parcel boundaries tracing valley floors or planned settlements.
   - Geodetic coordinate grid / graticules (subtle tick marks, coordinates in WGS 84 / UTM 45N).
   - Survey control points / benchmarks (GCP markers, trigonometrical stations).
   - Infrastructure vectors (roads, transmission lines, or river centerlines).

---

## 4. Hero Motion Choreography
The initial loading sequence must feel mathematical, calm, and deliberate:

```
Timeline (Seconds):
0.00 - 0.50 s  : Environment atmosphere establishes (subtle ground plane & depth fog).
0.30 - 1.20 s  : Terrain elevation geometry resolves from datum plane into 3D relief.
0.70 - 1.50 s  : Topographic contour lines draw onto the terrain contours.
1.00 - 1.70 s  : Key survey control points and coordinate ticks register.
1.10 - 1.90 s  : Eyebrow label and Subject Name enter ("Er. Sadhuram Lamichhane").
1.30 - 2.10 s  : Professional Headline enters ("GIS Expert · Geomatics Engineer").
1.60 - 2.30 s  : Concise editorial positioning description fades into place.
1.80 - 2.50 s  : Action buttons (Explore Work / Download CV) settle into position.
2.50 s +       : Scene transitions into calm ambient state.
```

### Ambient Movement
- Extremely subtle camera drift or slow sun/light rotation.
- No frantic pulsing, no particle storms, no spinning globes.
- Calm, steady, authoritative stability.

---

## 5. Pointer Interaction
- Desktop mouse movement induces subtle camera parallax and slight perspective tilt.
- **Strict Boundary**: No free 360° rotation; OrbitControls are strictly prohibited for public navigation.
- The user must never lose the art-directed framing or induce motion disorientation.

---

## 6. Scroll Narrative Transition
As the user scrolls down from the hero into the editorial content:
```
3D Terrain / Physical Geography
  ↓ Scroll progression
Camera tilts / lowers towards planimetric perspective
  ↓
Spatial layers flatten into map-like orthographic clarity
  ↓
Hero typography exits smoothly
  ↓
Scene resolves seamlessly into the light editorial interface
```
**Conceptual Narrative**: *Real World → Spatial Data → Analysis → Informed Decision.*
