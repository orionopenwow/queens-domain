const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const hubIdx = html.indexOf('id="studio-unfolded-hub"');
console.log('studio-unfolded-hub at:', hubIdx);
if (hubIdx !== -1) {
  console.log(html.slice(hubIdx, hubIdx + 1200));
}
