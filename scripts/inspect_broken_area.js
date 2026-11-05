const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const idx = html.indexOf('id="btn-copy-claude-prompt"');
console.log(html.slice(idx + 350, idx + 800));
