# Archived: synthetic Three.js terrain hero (rejected)

Rejected as the homepage hero on 2026-09-13 (see D-024 in `docs/10-DECISIONS.md`): the
rendered DEM mesh read as a large 3D rock object rather than as real geography, GIS or
professional spatial analysis.

These files are kept only so the R3F/DEM work is not lost. Nothing imports them, they are
excluded from `tsconfig.json` and ESLint, and they are not compiled or shipped. The
Copernicus GLO-30 pipeline that fed them (`scripts/terrain/preprocess.py`,
`public/terrain/*`) is still in the repository and may be reused for a non-hero GIS
interaction.

| File | Was |
| --- | --- |
| `hero-lab.tsx` / `hero-lab.module.css` | previous `/hero-lab` shell, sticky travel and paper handoff |
| `hero-canvas.tsx`, `scene.tsx` | R3F canvas, camera rig and terrain mesh |
| `terrain-shader.ts` | height-band contour material |
| `terrain.ts` | was `lib/hero/terrain.ts`; DEM decode plus `smoothRange` |
