// scripts/resize-vine-border.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

const oldCss = `  #pj-explainer, .window-vine-frame {
    border: 28px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 36 fill !important;
    border-image-width: 28px !important;
    border-image-repeat: round !important;
    border-image-outset: 6px !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    border-radius: 0 !important;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(74, 222, 128, 0.15) !important;
  }`;

const newCss = `  #pj-explainer, .window-vine-frame {
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 36 fill !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    border-image-outset: 2px !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    border-radius: 0 !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(74, 222, 128, 0.1) !important;
  }`;

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
  console.log('Replaced oldCss with 2.5x smaller border (11px)');
} else {
  // Regex fallback
  html = html.replace(
    /border:\s*28px solid transparent[^}]*image-rendering:\s*crisp-edges !important;/g,
    `border: 11px solid transparent !important;\n    border-image-source: url('vine_frame.png') !important;\n    border-image-slice: 36 fill !important;\n    border-image-width: 11px !important;\n    border-image-repeat: round !important;\n    border-image-outset: 2px !important;\n    image-rendering: pixelated !important;\n    image-rendering: crisp-edges !important;`
  );
  console.log('Replaced using regex fallback');
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Saved to app/index.html');
