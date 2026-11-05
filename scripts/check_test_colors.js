const fs = require('fs');
const testJs = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/tests/run.js', 'utf8');
console.log('run.js mentions cyan:', testJs.includes('cyan'));
console.log('run.js mentions neon:', testJs.includes('neon'));
console.log('run.js mentions 00f0ff:', testJs.includes('00f0ff'));
