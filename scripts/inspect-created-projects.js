const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const cpIdx = html.indexOf('CREATED PROJECTS');
console.log('CREATED PROJECTS at:', cpIdx);
if (cpIdx !== -1) {
  console.log(html.slice(cpIdx - 200, cpIdx + 800));
}
