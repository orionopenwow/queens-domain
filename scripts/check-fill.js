const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

console.log('Includes border-image-slice: 36 fill?', html.includes('border-image-slice: 36 fill'));
