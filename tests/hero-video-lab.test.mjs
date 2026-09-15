// Run: node --test tests/hero-video-lab.test.mjs
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('Hero video route stays noindex while the approved hero ships to production', () => {
  const pageSource = readFileSync(new URL('../app/hero-video-lab/page.tsx', import.meta.url), 'utf8');
  const homeSource = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');

  // 1. Isolated route with noindex metadata
  assert.ok(pageSource.includes('index: false'), 'Page must specify index: false in robots metadata');
  assert.ok(pageSource.includes('follow: false'), 'Page must specify follow: false in robots metadata');
  assert.ok(pageSource.includes('Hero Video Lab'), 'Page title must reflect prototype lab status');

  // 2. The approved hero is now in production; the lab route shares the component
  assert.ok(pageSource.includes('@/components/hero-video/video-hero'), 'Lab route must render the shared hero component');
  assert.ok(homeSource.includes('@/components/hero-video/video-hero'), 'Production homepage must consume the approved hero');
  assert.ok(!homeSource.includes('hero-video-lab'), 'Production homepage must not reference the lab route');
  assert.ok(homeSource.includes('<ProfessionalIntroduction'), 'Production homepage must retain Section 02 Part A');
  const profileSource = readFileSync(new URL('../components/sections/professional-introduction.tsx', import.meta.url), 'utf8');
  assert.ok(profileSource.includes('<EngineeringPractice'), 'Profile must include the compact practice index');
});

test('Hero Video Lab strictly complies with scroll architecture: no scroll-hijacking, no duplicate Lenis', () => {
  const tsxSource = readFileSync(new URL('../components/hero-video/video-hero.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero-video/video-hero.module.css', import.meta.url), 'utf8');

  // 1. Prohibited scroll-lock patterns from Tokyo reference must NOT exist
  assert.ok(!tsxSource.includes('position = "fixed"'), 'Must not lock body position to fixed');
  assert.ok(!tsxSource.includes("position = 'fixed'"), 'Must not lock body position to fixed');
  assert.ok(!tsxSource.includes('overflow = "hidden"'), 'Must not set overflow hidden on body');
  assert.ok(!tsxSource.includes('e.preventDefault()'), 'Must not hijack scroll via preventDefault');
  assert.ok(!tsxSource.includes('addEventListener("wheel"'), 'Must not intercept wheel events manually');
  assert.ok(!tsxSource.includes('addEventListener("touchmove"'), 'Must not intercept touchmove events manually');

  // 2. No duplicate Lenis instance
  assert.ok(!tsxSource.includes('new Lenis'), 'Must not instantiate local Lenis instance');
  assert.ok(!tsxSource.includes('@studio-freight/lenis'), 'Must not import legacy Studio Freight Lenis');

  // 3. Proper GSAP ScrollTrigger architecture
  assert.ok(tsxSource.includes('ScrollTrigger.create'), 'Must use GSAP ScrollTrigger');
  assert.ok(tsxSource.includes('id: "hero-video-scrub"'), 'Must define specific ScrollTrigger id');
  assert.ok(!tsxSource.includes('ScrollTrigger.getAll().forEach'), 'Must not kill unrelated ScrollTriggers');
  assert.ok(!tsxSource.includes('ScrollTrigger.killAll()'), 'Must not globally kill ScrollTriggers');

  // 4. Clean sticky architecture in CSS
  assert.ok(cssSource.includes('position: sticky;'), 'Must use CSS position: sticky for viewport');
  assert.ok(cssSource.includes('top: 0;'), 'Sticky viewport must anchor to top: 0');
  assert.ok(cssSource.includes('height: 100svh;'), 'Sticky viewport must occupy 100svh');
  assert.ok(cssSource.includes('height: 250svh;'), 'Travel must define substantial scroll distance (~250svh)');
});

test('Hero Video Lab preserves authentic Nepal geography, verified contours, and excludes external demo assets', () => {
  const tsxSource = readFileSync(new URL('../components/hero-video/video-hero.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero-video/video-hero.module.css', import.meta.url), 'utf8');

  // 1. No demo Tokyo assets or external CDN references
  assert.ok(!tsxSource.includes('21st.dev'), 'Must not reference 21st.dev CDN');
  assert.ok(!tsxSource.includes('guglielmogiannattasio'), 'Must not include reference demo signature');
  assert.ok(!tsxSource.includes('tokyo'), 'Must not reference Tokyo assets or copy');

  // 2. Verified clean Nepal mountain and room window assets exist on disk
  const mountBasePath = new URL('../public/media/hero-window/sunset-mountains-base.webp', import.meta.url);
  const mountSilPath = new URL('../public/media/hero-window/sunset-mountains-silhouette.webp', import.meta.url);
  const roomFramePath = new URL('../public/media/hero-window/sunset-window-frame.webp', import.meta.url);

  assert.ok(existsSync(mountBasePath), 'Sunset mountains base asset must exist');
  assert.ok(existsSync(mountSilPath), 'Sunset mountain silhouette cutout asset must exist');
  assert.ok(existsSync(roomFramePath), 'Sunset room window frame asset must exist');

  // 3. Authentic large name reveal and depth layering
  assert.ok(tsxSource.includes('Sadhuram'), 'Large name must include Sadhuram');
  assert.ok(tsxSource.includes('Lamichhane'), 'Large name must include Lamichhane');
  assert.ok(cssSource.includes('.largeNameLayer'), 'Must define largeNameLayer style');
  assert.ok(cssSource.includes('.mountainSilLayer'), 'Must define mountainSilLayer style');
  assert.ok(cssSource.includes('.roomFrameLayer'), 'Must define roomFrameLayer style');
  assert.ok(cssSource.includes('.liquidNav'), 'Must define liquidNav style inspired by demo reference');
  assert.ok(cssSource.includes('.progressBarFill'), 'Must define progressBarFill tracking scroll progress');

  // 4. Layering verification: room frame sits in front at z-index 9, mountain silhouette at 7 occludes name at 5
  const roomZIndex = cssSource.match(/\.roomFrameLayer[\s\S]*?z-index:\s*(\d+)/)?.[1];
  const silZIndex = cssSource.match(/\.mountainSilLayer[\s\S]*?z-index:\s*(\d+)/)?.[1];
  const nameZIndex = cssSource.match(/\.largeNameLayer[\s\S]*?z-index:\s*(\d+)/)?.[1];

  assert.strictEqual(roomZIndex, '9', 'Room window frame must be z-index 9');
  assert.strictEqual(silZIndex, '7', 'Mountain silhouette cutout must be z-index 7');
  assert.strictEqual(nameZIndex, '5', 'Large name must be z-index 5 (behind mountain silhouette)');

  // 5. Reduced motion accessibility
  assert.ok(cssSource.includes('@media (prefers-reduced-motion: reduce)'), 'Must define prefers-reduced-motion media query');
});

test('Hero Video Lab implements horizontal scrolled sentence reveal and stutter-free scroll architecture', () => {
  const tsxSource = readFileSync(new URL('../components/hero-video/video-hero.tsx', import.meta.url), 'utf8');
  const cssSource = readFileSync(new URL('../components/hero-video/video-hero.module.css', import.meta.url), 'utf8');

  // 1. Single horizontal sentence statement
  assert.ok(
    tsxSource.includes('Geospatial Intelligence for land, infrastructure and planning.'),
    'Must present authoritative Geospatial Intelligence sentence'
  );
  assert.ok(cssSource.includes('.scrolledSentence'), 'Must define scrolledSentence style');
  assert.ok(cssSource.includes('.charSlot'), 'Must define charSlot style');
  assert.ok(cssSource.includes('.charReel'), 'Must define charReel style');
  assert.ok(cssSource.includes('.charGhost'), 'Must define charGhost style for natural typography kerning');

  // 2. Old multi-item text and buttons removed from heroHeader
  assert.ok(!tsxSource.includes('Explore Projects'), 'Old Explore Projects CTA must be removed from heroHeader');
  assert.ok(!tsxSource.includes('Download CV'), 'Old Download CV CTA must be removed from heroHeader');
  assert.ok(!cssSource.includes('.primaryAction'), 'Obsolete primaryAction class must be removed');

  // 3. Stutter Prevention: No dynamic blur filters or letter-spacing during continuous scroll scrub
  const updateMethod = tsxSource.slice(tsxSource.indexOf('const update ='), tsxSource.indexOf('const trigger ='));
  assert.ok(!updateMethod.includes('filter:'), 'Must not apply dynamic filter: blur during scroll scrub');
  assert.ok(!updateMethod.includes('letterSpacing:'), 'Must not mutate letterSpacing during scroll scrub');
  assert.ok(!updateMethod.includes('querySelector('), 'Must not run querySelector inside scroll update loop');
});

