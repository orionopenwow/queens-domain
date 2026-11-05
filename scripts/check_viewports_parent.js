const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('<!-- Big 3D Model Viewport Card -->');
console.log(html.slice(idx - 400, idx));
