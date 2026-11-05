const fs = require('fs');
const s = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/scripts/build-exe.js', 'utf8');
const idx = s.indexOf('if (File.Exists(edge))');
console.log(s.slice(idx, idx + 400));
