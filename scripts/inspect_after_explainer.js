const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('id="pj-explainer"');
const endPos = html.indexOf('</section>', pos);
console.log(html.substring(endPos - 300, endPos + 100));
