// Run: node --test tests/hero-lab-structure.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('HeroLab component adheres to authenticity, accessibility, and responsive loading standards', () => {
  const tsxSource = readFileSync(new URL('../components/hero/hero-lab.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero/hero-lab.module.css', import.meta.url), 'utf8');

  // 1. Prohibited fake GIS graphics must not exist in the active component or stylesheet
  assert.ok(!tsxSource.includes('isolines'), 'Component must not reference fake isolines');
  assert.ok(!tsxSource.includes('MARKS'), 'Component must not reference arbitrary MARKS');
  assert.ok(!tsxSource.includes('styles.survey'), 'Component must not reference fake survey overlay');
  assert.ok(!cssSource.includes('.isolines'), 'CSS must not define isolines styles');
  assert.ok(!cssSource.includes('.mark'), 'CSS must not define arbitrary crosshair marks');
  assert.ok(!cssSource.includes('.survey'), 'CSS must not define survey overlay styles');

  // 2. Responsive picture sources must partition mobile and desktop assets
  assert.ok(tsxSource.includes('media="(max-width: 767px)"'), 'Mobile image must use max-width media query');
  assert.ok(tsxSource.includes('media="(min-width: 768px)"'), 'Desktop plates must use min-width media query');
  assert.ok(tsxSource.includes('/images/hero/hero-mobile.webp'), 'Mobile picture must load hero-mobile.webp');
  assert.ok(tsxSource.includes('/images/hero/backdrop.webp'), 'Desktop picture must load backdrop.webp');

  // 3. Stable layout geometry: travel height must not be dependent on data-animated
  assert.ok(!cssSource.includes('.lab[data-animated="false"] .travel'), 'Travel height must not switch on data-animated');
  assert.ok(!cssSource.includes('.lab[data-animated="false"] .frame'), 'Frame position must not switch on data-animated');

  // 4. Mobile flow must not use fixed 88svh height lock
  assert.ok(!cssSource.includes('height: 88svh'), 'Mobile must not lock frame to 88svh');

  // 5. Typography must use title case, not all-caps display
  const titleBlock = cssSource.slice(cssSource.indexOf('.title {'), cssSource.indexOf('.title span {'));
  assert.ok(!titleBlock.includes('uppercase'), 'Title must not be forced uppercase');
  assert.ok(tsxSource.includes('Geospatial analysis for land'), 'Title must use title case professional statement');

  // 6. Architectural slot for future verified GIS layer must exist
  assert.ok(tsxSource.includes('data-analytical-slot'), 'Architectural slot for future GIS layer must exist');
});
