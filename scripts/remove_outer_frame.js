const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Check if script uses exe-window-frame
const hasScriptRef = /(?:\$|getElementById)\(\s*['"]exe-window-frame['"]\s*\)/.test(html);
console.log('Script references exe-window-frame:', hasScriptRef);

// 1. Remove the DOM element <div id="exe-window-frame"></div> or hide it
// If we remove the element completely and no script queries it, that is cleanest.
// To be 100% safe with tests/run.js, we can also remove the element OR if any script did query it, keep hidden.
// Let's check:
if (!hasScriptRef) {
  html = html.replace('<div id="exe-window-frame"></div>\n', '');
  html = html.replace('<div id="exe-window-frame"></div>', '');
} else {
  // If there was a script ref, keep element with display:none
  html = html.replace('<div id="exe-window-frame"></div>', '<div id="exe-window-frame" style="display:none"></div>');
}

// 2. Remove the CSS rule for #exe-window-frame or set display: none
const cssPattern = /\/\* Fixed pixel-art wooden vine frame for the outer edge of the entire \.exe window \*\/[\s\S]*?#exe-window-frame\s*\{[\s\S]*?\}/;
if (cssPattern.test(html)) {
  html = html.replace(cssPattern, '/* Outer edge window frame removed per user request */');
  console.log('Removed #exe-window-frame CSS rule');
} else {
  // Direct replacement
  html = html.replace(/#exe-window-frame\s*\{[\s\S]*?\}/g, '#exe-window-frame { display: none !important; }');
  console.log('Disabled #exe-window-frame CSS rule');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully removed outer edge frame border from app/index.html');
