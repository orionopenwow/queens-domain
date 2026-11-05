const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const projIdx = html.indexOf('id="pane-projects"');
console.log(html.slice(projIdx - 100, projIdx + 1200));
