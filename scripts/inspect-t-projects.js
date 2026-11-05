const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const idx = html.indexOf('id="t-projects"');
console.log(html.slice(idx - 100, idx + 1200));
