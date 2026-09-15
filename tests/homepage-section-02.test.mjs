import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const read = path => readFileSync(path, 'utf8');
const home = read('app/page.tsx');
const intro = read('components/sections/professional-introduction.tsx');
const practice = read('components/sections/engineering-practice.tsx');

test('Homepage retains approved hero and compact profile with working anchor destinations', () => {
  assert.ok(home.includes('<VideoHero'));
  assert.ok(home.includes('<ProfessionalIntroduction'));
  assert.ok(intro.includes('<EngineeringPractice'));
  const markup = home + intro + practice;
  for (const id of ['profile','engineering-practice','selected-projects']) assert.ok(markup.includes(`id="${id}"`));
});

test('Compact profile has no image sequence, animation dependency, or scroll trap', () => {
  for (const forbidden of ['use client','ScrollTrigger','new Lenis','preventDefault','<Image','<img','h-svh','data-sequence']) {
    assert.ok(!practice.includes(forbidden), `Unexpected ${forbidden}`);
  }
  assert.ok(intro.includes('Turning spatial data into practical decisions.'));
  for (const title of ['GIS & Spatial Analysis','Land Use Planning & Zoning','Surveying & GNSS','Remote Sensing & UAV']) assert.ok(practice.includes(title));
});
