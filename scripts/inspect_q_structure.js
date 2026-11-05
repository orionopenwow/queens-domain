const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const start = html.indexOf('id="evolving-questionnaire-card"');
if (start === -1) {
  console.log('Searching for inspiration-sparks-bar');
  const spStart = html.indexOf('id="inspiration-sparks-bar"');
  console.log(html.substring(spStart, spStart + 1000));
} else {
  console.log(html.substring(start, start + 1000));
}
