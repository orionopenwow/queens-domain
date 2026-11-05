const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const oldBrandBlock = `<div style="display:flex;flex-direction:column;justify-content:center">
        <span style="font-family:Georgia,'Times New Roman',Garamond,serif;font-style:italic;font-size:25px;font-weight:500;color:#f8fafc;line-height:1;letter-spacing:-0.01em;text-shadow:0 2px 10px rgba(0,0,0,0.8)">Tome</span>
        <span style="font-family:Georgia,'Times New Roman',Garamond,serif;font-style:italic;font-size:12.5px;color:#cbd5e1;line-height:1.2;letter-spacing:0.03em;text-shadow:0 1px 4px rgba(0,0,0,0.8)">Vibegaming Engine</span>
      </div>`;

const newBrandBlock = `<img src="tome_header_text.png" alt="Tome: Vibegaming Engine" style="height:36px;width:auto;object-fit:contain;display:block">`;

if (html.includes(oldBrandBlock)) {
  html = html.replace(oldBrandBlock, newBrandBlock);
  console.log('Successfully replaced header text with tome_header_text.png');
} else {
  console.log('Searching for Tome header block via regex');
  html = html.replace(
    /<div style="display:flex;flex-direction:column;justify-content:center">[\s\S]*?Vibegaming Engine<\/span>\s*<\/div>/,
    newBrandBlock
  );
  console.log('Replaced header text via regex');
}

fs.writeFileSync(filePath, html, 'utf8');
