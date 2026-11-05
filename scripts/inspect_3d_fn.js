const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('function init3DSpinningModel');
if (pos !== -1) {
  console.log(html.substring(pos, pos + 1000));
}
