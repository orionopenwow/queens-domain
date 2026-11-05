const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
let idx = 0;
while ((idx = html.indexOf('runDeconstructor', idx)) !== -1) {
  console.log('runDeconstructor at', idx, ':', html.slice(Math.max(0, idx - 80), idx + 120));
  idx += 'runDeconstructor'.length;
}
