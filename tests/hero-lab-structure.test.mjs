// Run: node --test tests/hero-lab-structure.test.mjs
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('HeroLab adheres to simplified hero principle, responsive loading, and editorial transition', () => {
  const tsxSource = readFileSync(new URL('../components/hero/hero-lab.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero/hero-lab.module.css', import.meta.url), 'utf8');

  // 1. Prohibited fake GIS graphics must not exist
  assert.ok(!tsxSource.includes('isolines'), 'Component must not reference fake isolines');
  assert.ok(!tsxSource.includes('MARKS'), 'Component must not reference arbitrary MARKS');
  assert.ok(!tsxSource.includes('styles.survey'), 'Component must not reference fake survey overlay');
  assert.ok(!cssSource.includes('.isolines'), 'CSS must not define isolines styles');
  assert.ok(!cssSource.includes('.mark'), 'CSS must not define arbitrary crosshair marks');
  assert.ok(!cssSource.includes('.survey'), 'CSS must not define survey overlay styles');

  // 2. Standalone analytical GIS handoff must be removed from active hero (D-032)
  assert.ok(!tsxSource.includes('AnalyticalHandoff'), 'Active hero must not import AnalyticalHandoff');
  assert.ok(!tsxSource.includes('data-analytical-slot'), 'Active hero must not retain data-analytical-slot');
  assert.ok(!cssSource.includes('.analyticalHandoff'), 'CSS must not contain analyticalHandoff class');
  assert.ok(!tsxSource.includes('styles.handoff'), 'Component must not render handoff subtitle');

  // 3. Responsive picture sources must partition mobile and desktop assets
  assert.ok(tsxSource.includes('media="(max-width: 767px)"'), 'Mobile image must use max-width media query');
  assert.ok(tsxSource.includes('media="(min-width: 768px)"'), 'Desktop plates must use min-width media query');
  assert.ok(tsxSource.includes('/images/hero/hero-mobile.webp'), 'Mobile picture must load hero-mobile.webp');
  assert.ok(tsxSource.includes('/images/hero/backdrop.webp'), 'Desktop picture must load backdrop.webp');

  // 4. Stable layout geometry: travel height must not switch on data-animated
  assert.ok(!cssSource.includes('.lab[data-animated="false"] .travel'), 'Travel height must not switch on data-animated');
  assert.ok(!cssSource.includes('.lab[data-animated="false"] .frame'), 'Frame position must not switch on data-animated');

  // 5. Desktop travel length tuned to 150svh (down from 180svh)
  assert.ok(cssSource.includes('height: 150svh;'), 'Desktop travel height must be 150svh');

  // 6. Mobile flow must not use fixed 88svh height lock
  assert.ok(!cssSource.includes('height: 88svh'), 'Mobile must not lock frame to 88svh');

  // 7. Typography must use title case, not all-caps display
  const titleBlock = cssSource.slice(cssSource.indexOf('.title {'), cssSource.indexOf('.title span {'));
  assert.ok(!titleBlock.includes('uppercase'), 'Title must not be forced uppercase');
  assert.ok(tsxSource.includes('Geospatial analysis for land'), 'Title must use title case professional statement');

  // 8. Direct transition into editorial portfolio section (#F2F1EC) (D-034)
  assert.ok(tsxSource.includes('id="practice-test"'), 'Direct transition into editorial practice section must exist');
  assert.ok(cssSource.includes('.veil'), 'Paper transition veil must exist');
  assert.ok(cssSource.includes('.paper'), 'Editorial paper section must be styled');
});

test('Verified GIS cartographic assets are safely preserved in the archival directory', () => {
  const archiveReadme = new URL('../artifacts/archive/gis-handoff-experiment/README.md', import.meta.url);
  const archivedComponent = new URL('../artifacts/archive/gis-handoff-experiment/components/analytical-handoff.tsx', import.meta.url);
  const archivedContours = new URL('../artifacts/archive/gis-handoff-experiment/public-gis-hero/contours.svg', import.meta.url);
  const archivedHillshade = new URL('../artifacts/archive/gis-handoff-experiment/public-gis-hero/hillshade.webp', import.meta.url);
  const archivedMetadata = new URL('../artifacts/archive/gis-handoff-experiment/public-gis-hero/metadata.json', import.meta.url);

  assert.ok(existsSync(archiveReadme), 'Archival README must exist');
  assert.ok(existsSync(archivedComponent), 'Archived AnalyticalHandoff component must exist');
  assert.ok(existsSync(archivedContours), 'Archived contours.svg must exist');
  assert.ok(existsSync(archivedHillshade), 'Archived hillshade.webp must exist');
  assert.ok(existsSync(archivedMetadata), 'Archived metadata.json must exist');

  // Ensure active public directory does NOT bundle unused GIS assets
  const publicGis = new URL('../public/gis', import.meta.url);
  assert.ok(!existsSync(publicGis), 'public/gis must not exist in active public directory');
});

test('Topographic contour overlay is integrated as a subtle scroll motif (D-035 / D-036)', () => {
  const tsxSource = readFileSync(new URL('../components/hero/hero-lab.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero/hero-lab.module.css', import.meta.url), 'utf8');
  const contourSvgPath = new URL('../public/images/hero/contours-overlay.svg', import.meta.url);

  // 1. Clean contour asset exists and contains pure geometry without labels
  assert.ok(existsSync(contourSvgPath), 'public/images/hero/contours-overlay.svg must exist');
  const contourSvg = readFileSync(contourSvgPath, 'utf8');
  assert.ok(contourSvg.includes('intermediate-contour'), 'Contour SVG must contain intermediate contours');
  assert.ok(contourSvg.includes('index-contour'), 'Contour SVG must contain index contours');
  assert.ok(!contourSvg.includes('<text'), 'Contour SVG must not contain text elements');
  assert.ok(!contourSvg.includes('<tspan'), 'Contour SVG must not contain tspan elements');
  assert.ok(!contourSvg.includes('1400m'), 'Contour SVG must not contain elevation numbers');

  // 2. Component references the contour overlay asset
  assert.ok(tsxSource.includes('/images/hero/contours-overlay.svg'), 'Component must load contours-overlay.svg');
  assert.ok(tsxSource.includes('styles.contourOverlay'), 'Component must render contourOverlay container');

  // 3. Scroll lifecycle logic implements D-036 curve: 0-20% (0) -> 20-55% (fade in) -> 55-80% (peak 0.35) -> 80-98% (fade out)
  assert.ok(tsxSource.includes('smoothRange(0.20, 0.55, p)'), 'Component must fade in contours between 0.20 and 0.55');
  assert.ok(tsxSource.includes('smoothRange(0.80, 0.98, p)'), 'Component must fade out contours between 0.80 and 0.98');
  assert.ok(tsxSource.includes('0.35 * contourFadeIn * contourFadeOut'), 'Contour peak opacity must be capped at 0.35');

  // 4. CSS masking and depth draping (z-index: 5 places contours behind foreground trees at z-index: 6)
  assert.ok(cssSource.includes('.contourOverlay'), 'CSS must define .contourOverlay');
  assert.ok(cssSource.includes('mask-image'), 'CSS must define mask-image to keep sky clear');
  assert.ok(cssSource.includes('.mobileContour'), 'CSS must define mobileContour for static mobile presence');
  assert.ok(cssSource.includes('z-index: 5;'), 'Contour overlay must have z-index: 5 for depth draping behind foreground trees');

  // 5. Minimal scroll invitation exists and clears on scroll
  assert.ok(tsxSource.includes('Scroll to explore'), 'Component must include minimal scroll invitation');
  assert.ok(tsxSource.includes('styles.scrollInvite'), 'Component must render scrollInvite element');
  assert.ok(cssSource.includes('.scrollInvite'), 'CSS must style .scrollInvite');

  // 6. Restrained desktop mouse micro-depth logic exists
  assert.ok(tsxSource.includes('mouseTargets'), 'Component must define mouse micro-depth targets');
  assert.ok(tsxSource.includes('finePointer'), 'Component must constrain mouse tracking to fine pointers');
});
