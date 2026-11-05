const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const matches = [...html.matchAll(/id="([^"]*proj[^"]*)"/gi)];
console.log('Project IDs:', matches.map(m => m[1]));
