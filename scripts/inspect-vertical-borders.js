const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

// Search for any border-right or border-left or divider or separator in the main views
const borderMatches = [...html.matchAll(/(?:border-right|border-left|width:\s*1px|width:\s*2px)[^;]+;/gi)];
console.log('Border vertical rules:');
borderMatches.slice(0, 30).forEach(m => console.log(m[0]));
