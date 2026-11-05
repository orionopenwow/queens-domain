const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const matches = html.match(/[^{}]*collapsed[^{}]*\{[^}]+\}/g);
console.log('COLLAPSED CSS:', matches);
