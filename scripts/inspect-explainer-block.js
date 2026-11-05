const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const startExplainer = html.indexOf('<!-- Unified Minimalist Autonomous Game Studio Card');
const closeTab = html.indexOf('</section>', startExplainer);

console.log(html.slice(startExplainer, startExplainer + 1200));
console.log('...\n', html.slice(closeTab - 800, closeTab));
