const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const navIdx = html.indexOf('<nav id="nav"');
console.log('NAV HTML:');
console.log(html.slice(navIdx, navIdx + 600));

// Find CSS for #nav or nav
const cssMatch = html.match(/nav\s*\{[^}]+\}/g);
console.log('NAV CSS:', cssMatch);
