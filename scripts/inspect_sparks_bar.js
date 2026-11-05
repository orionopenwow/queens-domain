const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const start = html.indexOf('id="inspiration-sparks-bar"');
const dropStart = html.indexOf('id="zen-drop-zone"');
const end = html.lastIndexOf('<div', dropStart);

console.log(html.substring(start - 5, end));
