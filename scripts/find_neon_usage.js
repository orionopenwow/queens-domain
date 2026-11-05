const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('#00f0ff', pos)) !== -1) {
  console.log(html.slice(Math.max(0, pos - 30), Math.min(html.length, pos + 40)));
  pos += 7;
}
