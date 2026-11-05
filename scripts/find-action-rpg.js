const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
let idx = 0;
while ((idx = html.indexOf('Action RPG', idx)) !== -1) {
  console.log('Action RPG at', idx, ':', html.slice(Math.max(0, idx - 60), idx + 80));
  idx += 'Action RPG'.length;
}
