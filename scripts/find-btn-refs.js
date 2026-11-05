const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

function findContext(name) {
  let idx = 0;
  while ((idx = html.indexOf(name, idx)) !== -1) {
    console.log(`=== ${name} at ${idx} ===`);
    console.log(html.slice(Math.max(0, idx - 100), idx + 200));
    idx += name.length;
  }
}

findContext('zen-open-sheets-btn');
findContext('zen-attach-btn');
findContext('zen-clear-btn');
