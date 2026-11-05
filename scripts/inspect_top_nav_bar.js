const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('id="top-nav-bar"');
console.log(html.substring(pos, pos + 1000));
