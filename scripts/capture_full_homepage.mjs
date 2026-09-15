import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT = 'artifacts/homepage-review/full-homepage';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function capture() {
  console.log('Starting full homepage screenshot capture on', BASE);

  // 1440x900 Desktop Deep-Dive
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Measure sections
  const sectionIds = [
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

  const positions = await page.evaluate((ids) => {
    const res = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const r = el.getBoundingClientRect();
        res[id] = Math.round(r.top + window.scrollY);
      }
    }
    return res;
  }, sectionIds);

  console.log('Section positions:', positions);

  // Capture each major section
  for (const id of sectionIds) {
    if (positions[id] !== undefined) {
      await page.evaluate((y) => window.scrollTo(0, y), positions[id]);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/1440x900-sec-${id}.png` });
    }
  }

  // Section 03 specific states (horizontal scroll progress)
  if (positions['selected-projects']) {
    const spTop = positions['selected-projects'];
    // Project 01
    await page.evaluate((y) => window.scrollTo(0, y + 200), spTop);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/1440x900-sec-03-project-01.png` });

    // Mid sequence
    await page.evaluate((y) => window.scrollTo(0, y + 1000), spTop);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/1440x900-sec-03-project-mid.png` });

    // Final project
    await page.evaluate((y) => window.scrollTo(0, y + 1800), spTop);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/1440x900-sec-03-project-final.png` });
  }

  // Section 05 Map interaction states
  if (positions['work-across-nepal']) {
    await page.evaluate((y) => window.scrollTo(0, y), positions['work-across-nepal']);
    await page.waitForTimeout(400);

    // Click another location
    const buttons = await page.$$('button:has-text("Baitadi"), button:has-text("Dudhkoshi"), button:has-text("Mustang")');
    if (buttons.length > 0) {
      await buttons[0].click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${OUT}/1440x900-sec-05-map-active-state.png` });
    }
  }

  // Full page screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/1440x900-FULL-PAGE.png`, fullPage: true });

  await context.close();

  // Responsive Breakpoints
  const viewports = [
    [1024, 768],
    [768, 1024],
    [390, 844],
    [320, 568],
  ];

  for (const [w, h] of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: 1,
    });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);

    await p.screenshot({ path: `${OUT}/${w}x${h}-fullpage.png`, fullPage: true });
    await ctx.close();
  }

  await browser.close();
  console.log('All full-homepage captures completed successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
