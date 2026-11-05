const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pjExp = html.indexOf('id="pj-explainer"');
console.log('pj-explainer at', pjExp);
console.log(html.slice(pjExp, pjExp + 400));

const pjSec = html.indexOf('id="pj-section-inner"');
console.log('pj-section-inner at', pjSec);
console.log(html.slice(pjSec - 200, pjSec + 300));
