const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const regex = /#zen-hero-square[^\{]*\{[^\}]*\}/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
