const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('id="top-nav-bar"');
console.log(html.slice(idx - 1500, idx));
