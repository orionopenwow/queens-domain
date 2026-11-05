const fs = require('fs');
const s = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/server/server.js', 'utf8');
console.log(s.slice(0, 800));
