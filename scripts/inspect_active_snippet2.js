const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('id="active-project-builder-section"');
console.log(html.substring(pos + 400, pos + 1200));
