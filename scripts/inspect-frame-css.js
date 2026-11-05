const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

function findCss(selector) {
  const r = new RegExp(selector + '\\s*\\{[^}]+\\}', 'g');
  console.log('CSS for', selector, ':', html.match(r));
}

findCss('\\.frame');
findCss('\\.page');
findCss('main');
findCss('#pj-list');
findCss('#pj-explainer');
findCss('::-webkit-scrollbar');
