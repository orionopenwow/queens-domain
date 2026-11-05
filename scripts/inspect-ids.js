const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const searchIds = ['zen-open-sheets-btn', 'zen-attach-btn', 'zen-clear-btn'];
for (const id of searchIds) {
  let count = 0;
  let pos = 0;
  while ((pos = html.indexOf(id, pos)) !== -1) {
    count++;
    pos += id.length;
  }
  console.log(id, 'occurrences:', count);
}
