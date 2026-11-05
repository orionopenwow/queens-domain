const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('SUGGESTIONS TO GET STARTED');
console.log('pos:', pos);
if (pos !== -1) {
  console.log(html.substring(pos - 100, pos + 250));
}
