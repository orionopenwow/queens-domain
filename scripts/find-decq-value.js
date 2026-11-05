const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('decQ.value', idx)) !== -1) {
  console.log(`=== decQ.value at ${idx} ===`);
  console.log(html.slice(Math.max(0, idx - 80), idx + 120));
  idx += 'decQ.value'.length;
}
