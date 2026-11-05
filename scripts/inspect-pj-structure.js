const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pjIdx = html.indexOf('id="pj-explainer"');
const closePj = html.indexOf('<!-- Dynamic Blueprint Architecture Deconstruction', pjIdx);
console.log(html.slice(pjIdx, pjIdx + 300));
console.log('--- around close ---');
console.log(html.slice(closePj - 200, closePj + 300));
