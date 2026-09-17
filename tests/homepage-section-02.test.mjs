import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const home = read('app/page.tsx');
const intro = read('components/sections/professional-introduction.tsx');
const practice = read('components/sections/engineering-practice.tsx');

const normalize = (str) => str.replace(/\s+/g, ' ').trim();

test('Homepage retains approved hero and Section 02 with working anchor destinations', () => {
  assert.ok(home.includes('<GenesisHero'));
  assert.ok(home.includes('<ProfessionalIntroduction'));
  const markup = home + intro + practice;
  for (const id of ['profile', 'selected-projects']) {
    assert.ok(markup.includes(`id="${id}"`), `Missing anchor #${id}`);
  }
});

test('Section 02 has approved headline, verified body copy, and closing line', () => {
  assert.ok(intro.includes('Turning complex spatial data into grounded decisions.') || intro.includes('Turning spatial data into practical decisions.'));
  const normIntro = normalize(intro);
  assert.ok(
    normIntro.includes('Er. Sadhuram Lamichhane is a')
  );
  assert.ok(practice.includes('Selected work across land, infrastructure and planning.') || practice.includes('Engineering Practice'));
});

test('Engineering Practice renders all 4 curated disciplines with verified assets and captions', () => {
  const titles = [
    'GIS & Spatial Analysis',
    'Land Use Planning & Zoning',
    'Surveying & GNSS',
    'Remote Sensing & UAV',
  ];
  for (const title of titles) {
    assert.ok(practice.includes(title), `Missing discipline ${title}`);
  }

  const assets = [
    'practice-01-gis.webp',
    'practice-02-landuse.webp',
    'practice-03-survey.webp',
    'practice-04-terrain.webp',
  ];
  for (const asset of assets) {
    assert.ok(practice.includes(asset), `Missing asset ${asset}`);
  }

  // Factual provenance mentions
  assert.ok(practice.includes('Phukot Karnali'));
  assert.ok(practice.includes('Chitwan'));
  assert.ok(practice.includes('Copernicus DEM GLO-30'));
});

test('Engineering practice avoids scroll hijacking or rogue scroll managers', () => {
  // Must NOT create a second Lenis instance or preventDefault wheel/scroll
  assert.ok(!practice.includes('new Lenis'), 'Must not create a new Lenis instance');
  assert.ok(!practice.includes('preventDefault'), 'Must not hijack scroll events with preventDefault');
});
