const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pjExp = html.indexOf('id="pj-explainer"');
const closeTab = html.indexOf('</section>', pjExp);
console.log('closeTab:', closeTab);
console.log(html.slice(pjExp, pjExp + 500));
console.log('--- around closeTab ---');
console.log(html.slice(closeTab - 300, closeTab + 200));
