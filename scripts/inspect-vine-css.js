const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const idx = html.indexOf('border-image-source: url(\'vine_frame.png\')');
console.log(html.slice(idx - 150, idx + 350));
