const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const shellCss = html.match(/[^{}]*shell[^{}]*\{[^}]+\}/g);
console.log('SHELL CSS:', shellCss);

const mainCss = html.match(/[^{}]*main[^{}]*\{[^}]+\}/g);
console.log('MAIN CSS:', mainCss);
