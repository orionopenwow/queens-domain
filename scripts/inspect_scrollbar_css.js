const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('::-webkit-scrollbar');
if (pos !== -1) {
  console.log(html.substring(pos - 50, pos + 300));
} else {
  console.log('No ::-webkit-scrollbar found');
}
