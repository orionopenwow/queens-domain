const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');

const pos = html.indexOf('SUGGESTIONS TO GET STARTED');
// Find parent div before
const divStart = html.lastIndexOf('<div', pos);
const parentDiv = html.lastIndexOf('<div', divStart - 1);
console.log('Parent div start:\n', html.substring(parentDiv, parentDiv + 200));

// Find drop zone or next section
const dropZone = html.indexOf('zen-drop-zone', pos);
const dropDiv = html.lastIndexOf('<div', dropZone);
console.log('\nDrop div start:\n', html.substring(dropDiv, dropDiv + 200));
