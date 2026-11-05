const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const start = html.indexOf('id="pj-explainer"');
const end = html.indexOf('</section>', start);
const content = html.substring(start, end);

// Let's find all tags with background or border or class containing "card" or "panel"
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('background') || l.includes('class="panel') || l.includes('glass-card') || l.includes('border-radius')) {
    console.log(`Line ${i}: ${l.trim().substring(0, 120)}`);
  }
});
