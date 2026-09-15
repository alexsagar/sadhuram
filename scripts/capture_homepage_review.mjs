/**
 * Homepage review capture for Section 02 (Profile + Engineering Practice).
 * Run with the dev server up:  node scripts/capture_homepage_review.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT = 'artifacts/homepage-review/engineering-practice';
mkdirSync(OUT, { recursive: true });

const problems = [];

async function settle(page, ms = 700) {
  await page.waitForTimeout(ms);
}

/** Scroll in Lenis-friendly steps so ScrollTrigger sees continuous motion. */
async function scrollTo(page, y) {
  await page.evaluate((target) => window.scrollTo({ top: target, behavior: 'instant' }), y);
  await page.waitForTimeout(450);
}

async function audit(page, label) {
  const report = await page.evaluate(() => {
    const de = document.documentElement;
    return {
      overflowX: de.scrollWidth > de.clientWidth + 1,
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      brokenImages: [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
      anchors: [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h.length > 1 && !document.querySelector(h)),
    };
  });
  if (report.overflowX) {
    problems.push(`${label}: horizontal overflow (${report.scrollWidth} > ${report.clientWidth})`);
  }
  if (report.brokenImages.length) {
    problems.push(`${label}: broken images ${report.brokenImages.join(', ')}`);
  }
  if (report.anchors.length) {
    problems.push(`${label}: broken anchors ${report.anchors.join(', ')}`);
  }
  return report;
}

const browser = await chromium.launch();

async function session(width, height, fn, { reducedMotion = 'no-preference' } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`console ${msg.type()} @${width}x${height}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`pageerror @${width}x${height}: ${err.message}`));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await settle(page, 1200);
  await fn(page, `${width}x${height}`);
  await context.close();
}

// ---------------------------------------------------------------- 1440 x 900
await session(1440, 900, async (page, tag) => {
  const anchors = await page.evaluate(() => {
    const at = (sel) => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY) };
    };
    return {
      doc: document.documentElement.scrollHeight,
      profile: at('#profile'),
      practice: at('#engineering-practice'),
    };
  });
  console.log(tag, JSON.stringify(anchors));

  const p = anchors.practice;
  const seqTop = p.top + 140; // past the section kicker, into the sticky sequence
  const seqSpan = p.bottom - seqTop - 400;

  const shots = [
    ['A-hero-initial', 0],
    ['B-hero-final-reveal', Math.round(anchors.profile.top * 0.82)],
    ['C-hero-to-profile', Math.round(anchors.profile.top - 240)],
    ['D-profile-intro', anchors.profile.top + 60],
    ['E-practice-01', Math.round(seqTop + seqSpan * 0.06)],
    ['F-practice-02', Math.round(seqTop + seqSpan * 0.32)],
    ['G-practice-03', Math.round(seqTop + seqSpan * 0.57)],
    ['H-practice-04', Math.round(seqTop + seqSpan * 0.86)],
    ['I-section-exit', Math.round(anchors.practice.bottom - 500)],
  ];

  for (const [name, y] of shots) {
    await scrollTo(page, y);
    await page.screenshot({ path: `${OUT}/${tag}-${name}.png` });
  }

  await audit(page, tag);

  // Full-page rhythm check: hero + Section 02 in one image.
  await scrollTo(page, 0);
  await page.screenshot({ path: `${OUT}/${tag}-FULLPAGE-hero-plus-section-02.png`, fullPage: true });
});

// ----------------------------------------------- reduced motion (desktop)
await session(
  1440,
  900,
  async (page, tag) => {
    const state = await page.evaluate(() => {
      const s = document.querySelector('#engineering-practice');
      const stage = s.querySelector('div > div');
      return {
        sticky: getComputedStyle(stage).position,
        visiblePlates: [...s.querySelectorAll('figure')].filter(
          (f) => getComputedStyle(f).visibility !== 'hidden' && getComputedStyle(f).opacity !== '0'
        ).length,
        descriptionsVisible: [...s.querySelectorAll('[data-state] p')].filter(
          (p) => p.getBoundingClientRect().height > 0
        ).length,
      };
    });
    console.log('reduced-motion', JSON.stringify(state));
    if (state.sticky === 'sticky') problems.push('reduced motion: sequence still sticky');
    if (state.visiblePlates !== 4) problems.push(`reduced motion: ${state.visiblePlates}/4 images visible`);
    if (state.descriptionsVisible !== 4)
      problems.push(`reduced motion: ${state.descriptionsVisible}/4 descriptions visible`);
    await page.screenshot({ path: `${OUT}/${tag}-reduced-motion-full.png`, fullPage: true });
    await audit(page, `${tag} reduced-motion`);
  },
  { reducedMotion: 'reduce' }
);

// -------------------------------------------------------- other breakpoints
for (const [w, h] of [
  [1920, 1080],
  [1280, 800],
  [1024, 768],
  [820, 1180],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [320, 568],
]) {
  await session(w, h, async (page, tag) => {
    const profileTop = await page.evaluate(
      () => Math.round(document.querySelector('#profile').getBoundingClientRect().top + window.scrollY)
    );
    const practiceTop = await page.evaluate(
      () =>
        Math.round(
          document.querySelector('#engineering-practice').getBoundingClientRect().top + window.scrollY
        )
    );
    await scrollTo(page, profileTop + 40);
    await page.screenshot({ path: `${OUT}/${tag}-profile.png` });
    await scrollTo(page, practiceTop + 320);
    await page.screenshot({ path: `${OUT}/${tag}-practice.png` });
    await audit(page, tag);
  });
}

await browser.close();

if (problems.length) {
  console.log('\nPROBLEMS');
  for (const p of [...new Set(problems)]) console.log(' -', p);
  process.exitCode = 1;
} else {
  console.log('\nNo overflow, broken images, broken anchors, or console errors.');
}
