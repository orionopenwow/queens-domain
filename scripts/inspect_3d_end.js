const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const start = html.indexOf('function init3DSpinningModel');
const nextFn = html.indexOf('function initPixelSpriteAnimator', start);

console.log('init3DSpinningModel length:', nextFn - start);
console.log('Last 200 chars:\n', html.substring(nextFn - 200, nextFn));
