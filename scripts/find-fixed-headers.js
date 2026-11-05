const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const headers = [...html.matchAll(/<header[^>]*>/gi)];
console.log('HEADERS found:');
headers.forEach(h => console.log(h[0]));

const navs = [...html.matchAll(/<nav[^>]*>/gi)];
console.log('NAVS found:');
navs.forEach(n => console.log(n[0]));

// Search for 'fixed' in style
const fixeds = [...html.matchAll(/position:\s*fixed[^;"'>]*/gi)];
console.log('FIXED styles:');
fixeds.forEach(f => console.log(f[0]));
