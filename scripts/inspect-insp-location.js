const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const inspIdx = html.indexOf('id="insp-board-container"');
console.log('insp-board-container at:', inspIdx);
if (inspIdx !== -1) {
  console.log(html.slice(inspIdx - 200, inspIdx + 400));
}
