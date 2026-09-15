import { chromium } from 'playwright';
import { mkdirSync,writeFileSync } from 'node:fs';
const out='artifacts/section-02-audit/compact';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch();
const results=[];
const errors=[];
for(const [width,height] of [[1920,1080],[1440,900],[1280,800],[1024,768],[820,1180],[768,1024],[430,932],[390,844],[375,812],[320,568]]) {
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
  await page.goto('http://localhost:3102',{waitUntil:'networkidle'});
  await page.waitForTimeout(4000);
  await page.locator('#profile').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY,behavior:'instant'}));
  await page.waitForTimeout(400);
  await page.screenshot({path:`${out}/${width}x${height}-profile.png`});
  await page.locator('#profile').screenshot({path:`${out}/${width}x${height}-section.png`});
  results.push(await page.locator('#profile').evaluate((el,width)=>({width,sectionHeight:el.getBoundingClientRect().height,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,practiceCount:el.querySelectorAll('li').length,clipped:[...el.querySelectorAll('p,h2')].filter(p=>{const r=p.getBoundingClientRect();return r.left<0||r.right>document.documentElement.clientWidth||p.scrollWidth>p.clientWidth+1;}).map(p=>p.textContent)}),width));
  if(width===1440){
    await page.screenshot({path:`${out}/1440x900-full-page.png`,fullPage:true});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(200);
    await page.locator('#profile').screenshot({path:`${out}/1440x900-reduced-motion.png`});
  }
  await context.close();
}
await browser.close();
writeFileSync(`${out}/results.json`,JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({results,errors},null,2));
if(errors.length||results.some(r=>r.clipped.length||r.scrollWidth>r.clientWidth||r.practiceCount!==4))process.exitCode=1;
