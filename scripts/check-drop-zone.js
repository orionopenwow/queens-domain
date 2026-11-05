const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

console.log('zen-drop-zone in html?', html.includes('id="zen-drop-zone"'));
