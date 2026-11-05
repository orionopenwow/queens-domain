const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pjStart = html.indexOf('id="pj-explainer"');
console.log('pj-explainer tag:\n', html.substring(pjStart - 30, pjStart + 350));

const zenStart = html.indexOf('id="zen-hero-square"');
console.log('\nzen-hero-square tag:\n', html.substring(zenStart - 10, zenStart + 250));

const cssStart = html.indexOf('.window-vine-frame');
console.log('\nCSS block:\n', html.substring(cssStart - 50, cssStart + 450));
