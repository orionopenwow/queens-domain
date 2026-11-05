const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const regex = /Queen['\u2019]s Domain Architecture/i;
console.log('in app/index.html:', regex.test(html));

// Search for MENU and PROJECTS and SETTINGS and DEV CONSOLE together
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Architecture Engine') || l.includes('DEV CONSOLE') || l.includes('SETTINGS') || l.includes('MENU')) {
    console.log(i + 1, l.slice(0, 100));
  }
});
