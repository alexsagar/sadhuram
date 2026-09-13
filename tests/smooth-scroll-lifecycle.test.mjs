// Run: node --test tests/smooth-scroll-lifecycle.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

test('motion toggles preserve position and own only one instance/subscription', () => {
  for (const initiallyReduced of [false, true]) {
    const effects = [], instances = [], tickers = new Set(), mediaListeners = new Set(), clicks = new Set();
    const media = {
      matches: initiallyReduced,
      addEventListener: (_, fn) => mediaListeners.add(fn),
      removeEventListener: (_, fn) => mediaListeners.delete(fn),
    };
    const window = { scrollY: 0, matchMedia: () => media };
    const target = { scrollIntoView: () => { window.scrollY = 900; } };
    const document = {
      addEventListener: (_, fn) => clicks.add(fn),
      removeEventListener: (_, fn) => clicks.delete(fn),
      querySelector: () => target,
    };
    class Lenis {
      constructor(options) {
        assert.equal(instances.filter(x => !x.destroyed).length, 0);
        this.options = options;
        this.listeners = new Set();
        instances.push(this);
      }
      on(_, fn) { this.listeners.add(fn); }
      off(_, fn) { this.listeners.delete(fn); }
      destroy() { assert.equal(this.listeners.size, 0); this.destroyed = true; }
      scrollTo(value) { assert.ok(!this.destroyed); window.scrollY = typeof value === 'number' ? value : 876; }
      raf() { assert.ok(!this.destroyed); }
      stop() { this.isStopped = true; }
      start() { this.isStopped = false; }
    }
    const react = {
      createContext: () => ({ Provider: 'provider' }),
      useContext: () => {}, useRef: () => ({ current: null }),
      useEffect: (fn) => effects.push(fn),
      createElement: (_, props) => props,
    };
    const modules = {
      react, lenis: Lenis, 'next/navigation': { usePathname: () => '/' },
      '@/lib/gsap': {
        gsap: { ticker: { add: fn => tickers.add(fn), remove: fn => tickers.delete(fn), lagSmoothing() {} } },
        ScrollTrigger: { update() {}, refresh() {} },
      },
    };
    const source = readFileSync(new URL('../components/providers/smooth-scroll-provider.tsx', import.meta.url), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true,
    } }).outputText;
    const exports = {};
    runInNewContext(compiled, { exports, require: name => modules[name], window, document, Math });
    const { value: api } = exports.SmoothScrollProvider({ children: null });
    // Repeat effect setup/cleanup as React Strict Mode does.
    for (let mount = 0; mount < 2; mount++) {
      const cleanup = effects[0]();
      effects[1]();
      for (let i = 0; i < 12; i++) {
        window.scrollY = 240 + i * 11;
        const before = window.scrollY;
        media.matches = !media.matches;
        for (const fn of mediaListeners) fn({ matches: media.matches });
        assert.equal(window.scrollY, before);
        assert.equal(instances.filter(x => !x.destroyed).length, 1);
        assert.equal(tickers.size, 1);
        assert.equal(mediaListeners.size, 1);
        assert.equal(clicks.size, 1);
        const active = api.getLenis();
        assert.equal(active.options.smoothWheel, !media.matches);
        assert.equal(active.options.duration, media.matches ? 0 : 1.05);
        assert.equal(active.listeners.size, 1);
        for (const fn of tickers) fn(i);
        for (const fn of clicks) fn({
          target: { closest: () => ({ getAttribute: () => '#target' }) }, preventDefault() {},
        });
        assert.equal(window.scrollY, media.matches ? 900 : 876, 'anchor must read current preference');
      }
      cleanup();
      assert.equal(api.getLenis(), null);
      assert.equal(tickers.size + mediaListeners.size + clicks.size, 0);
      assert.equal(instances.filter(x => !x.destroyed).length, 0);
    }
  }
});
