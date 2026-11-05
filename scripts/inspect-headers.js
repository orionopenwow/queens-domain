const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('top-menu-btn', idx)) !== -1) {
  console.log(`=== top-menu-btn at ${idx} ===`);
  console.log(html.slice(Math.max(0, idx - 100), idx + 250));
  idx += 'top-menu-btn'.length;
}

// Search for any other <header in app/index.html
const hAll = [...html.matchAll(/<header[\s\S]*?<\/header>/g)];
console.log('Total <header> blocks:', hAll.length);
hAll.forEach((h, i) => {
  console.log(`--- Header ${i} ---`);
  console.log(h[0].slice(0, 200));
});
