const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const btnIdx = html.indexOf('btn-copy-claude-prompt');
console.log(html.slice(btnIdx + 300, btnIdx + 800));
