const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

function searchSnippet(pattern) {
  let idx = 0;
  while ((idx = html.indexOf(pattern, idx)) !== -1) {
    console.log(`=== ${pattern} at ${idx} ===`);
    console.log(html.slice(Math.max(0, idx - 80), idx + 250));
    idx += pattern.length;
  }
}

searchSnippet('downloadStarterZip');
searchSnippet('dock-body');
searchSnippet('dec-prompt-output');
searchSnippet('ARCHITECTURE SYSTEM');
