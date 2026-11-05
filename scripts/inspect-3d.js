const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

console.log('three.js?', html.includes('three.js') || html.includes('three.min.js') || html.includes('Three'));
console.log('webgl?', html.includes('webgl') || html.includes('WebGL'));
console.log('canvas occurrences:', (html.match(/<canvas/g) || []).length);
