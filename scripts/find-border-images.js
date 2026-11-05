const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const regex = /border-image[^\n;]+/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[0]);
}
