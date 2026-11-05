const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const idx = html.indexOf('Hero Tome Logo');
console.log(html.slice(idx - 50, idx + 600));
