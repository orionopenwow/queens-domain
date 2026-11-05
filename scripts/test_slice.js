const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const btnIdx = html.indexOf('id="btn-dock-open-agent"');
console.log(html.slice(btnIdx, btnIdx + 500));
