import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1})).newPage();
await p.goto('http://localhost:3000/', {waitUntil:'networkidle'});
await p.waitForTimeout(1200);
console.log(JSON.stringify(await p.evaluate(() => {
  const box = (sel) => { const e=document.querySelector(sel); if(!e) return null; const r=e.getBoundingClientRect();
    return {top:Math.round(r.top+scrollY), bottom:Math.round(r.bottom+scrollY), h:Math.round(r.height)}; };
  const main = document.querySelector('main');
  const kids = [...main.children].map(c=>({tag:c.tagName, cls:(c.className||'').toString().slice(0,40), ...box2(c)}));
  function box2(e){const r=e.getBoundingClientRect();return {top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),h:Math.round(r.height)};}
  const heroRoot = main.children[0];
  const heroKids = [...heroRoot.children].map(c=>({tag:c.tagName, cls:(c.className||'').toString().slice(40), ...box2(c)}));
  const cs = getComputedStyle(document.querySelector('#profile'));
  return {doc:document.documentElement.scrollHeight, mainKids:kids, heroKids,
    profilePadTop: cs.paddingTop, profilePadBottom: cs.paddingBottom,
    header: box('#profile header'), grid: box('#profile header + div'),
    practiceSection: box('#engineering-practice'),
    practiceIntro: box('#engineering-practice > div'),
    seq: box('#engineering-practice > div + div'),
  };
}, null), null, 1));
await b.close();
