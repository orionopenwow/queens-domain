const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'dist') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes("Queen's Domain Architecture") || content.includes("QueensDomain Architecture") || content.includes("Architecture Engine")) {
        console.log('Found in:', full);
      }
    }
  }
}

searchDir('C:/Users/campw/Desktop/QueensDomain');
