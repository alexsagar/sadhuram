import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const home = read('app/page.tsx');

test('Full homepage mounts all 10 coordinated sections in editorial rhythm', () => {
  const sections = [
    '<VideoHero',
    '<ProfessionalIntroduction',
    '<SelectedProjects',
    '<AreasOfPractice',
    '<WorkAcrossNepal',
    '<Experience',
    '<ResearchPublications',
    '<FieldPractice',
    '<ContactClosing',
    '<StickyFooter',
  ];

  for (const sec of sections) {
    assert.ok(home.includes(sec), `Missing section ${sec} in app/page.tsx`);
  }
});

test('All primary navigation anchors resolve across the 10 sections', () => {
  const filePaths = [
    'components/hero-video/video-hero.tsx',
    'components/sections/professional-introduction.tsx',
    'components/sections/selected-projects.tsx',
    'components/sections/areas-of-practice.tsx',
    'components/sections/work-across-nepal.tsx',
    'components/sections/experience.tsx',
    'components/sections/research-publications.tsx',
    'components/sections/field-practice.tsx',
    'components/sections/contact-closing.tsx',
    'components/sections/sticky-footer.tsx',
  ];

  const fullCode = filePaths.map(read).join('\n');

  const requiredAnchors = [
    'profile',
    'selected-projects',
    'practice',
    'work-across-nepal',
    'experience',
    'research',
    'field-practice',
    'contact',
    'site-footer',
  ];

  for (const id of requiredAnchors) {
    assert.ok(
      fullCode.includes(`id="${id}"`),
      `Missing anchor destination id="${id}"`
    );
  }
});

test('Authoritative facts from Details.docx are rigorously preserved', () => {
  const selectedProjects = read('components/sections/selected-projects.tsx');
  const experience = read('components/sections/experience.tsx');
  const research = read('components/sections/research-publications.tsx');
  const footer = read('components/sections/sticky-footer.tsx');

  // License & Academic credential
  assert.ok(footer.includes('NEC Reg. No. 221'));
  assert.ok(footer.includes('UNIGIS M.Sc. (Salzburg)'));

  // Project names
  assert.ok(selectedProjects.includes('Dudhkoshi Reservoir Rim Risk Register'));
  assert.ok(selectedProjects.includes('Narayanghat–Mugling Highway (NH44)'));
  assert.ok(selectedProjects.includes('National EV Public Charging'));
  assert.ok(selectedProjects.includes('Bagmati River Basin Improvement Project'));

  // HOD Experience
  assert.ok(experience.includes('Head of Department (Geomatics Engineering)'));
  assert.ok(experience.includes('Universal Engineering & Science College'));

  // Peer-reviewed paper
  assert.ok(research.includes('Geospatial Modeling of Urban Sprawl in Bharatpur'));
});

test('No scroll hijacking or duplicate smooth-scroll engines introduced', () => {
  const newComponents = [
    'components/sections/selected-projects.tsx',
    'components/sections/areas-of-practice.tsx',
    'components/sections/work-across-nepal.tsx',
    'components/sections/experience.tsx',
    'components/sections/research-publications.tsx',
    'components/sections/field-practice.tsx',
    'components/sections/contact-closing.tsx',
    'components/sections/sticky-footer.tsx',
  ];

  for (const comp of newComponents) {
    const code = read(comp);
    assert.ok(!code.includes('new Lenis'), `Duplicate Lenis found in ${comp}`);
    assert.ok(!code.includes('preventDefault'), `preventDefault hijacking found in ${comp}`);
  }
});
