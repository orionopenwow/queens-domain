const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('three-model-canvas');
console.log(html.slice(idx - 400, idx + 100));
