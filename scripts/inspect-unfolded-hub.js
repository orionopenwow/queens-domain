const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const sIdx = html.indexOf('id="studio-unfolded-hub"');
if (sIdx !== -1) {
  console.log(html.slice(sIdx, sIdx + 1200));
} else {
  console.log('studio-unfolded-hub not found');
}
