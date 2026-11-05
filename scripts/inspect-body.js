const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const navIdx = html.indexOf('<nav id="nav"');
console.log(html.slice(navIdx - 400, navIdx + 200));
