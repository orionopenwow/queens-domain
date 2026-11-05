const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('master-prompt-bundle-console');
const endIdx = html.indexOf('</div>', html.indexOf('dock-preview'));
console.log(html.slice(endIdx, endIdx + 1000));
