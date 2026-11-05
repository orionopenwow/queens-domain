const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('PROJECTS');
console.log(html.substring(pos - 150, pos + 300));
