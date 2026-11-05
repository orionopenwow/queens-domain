const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('pj-builder-copy-btn');
console.log(html.slice(idx, idx + 1200));
