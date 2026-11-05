const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const start = html.indexOf('id="pj-explainer"');
console.log(html.substring(start, start + 3000));
