// scripts/apply-vine-frame.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Add CSS rules for the pixel-art vine frame
const vineCss = `
  /* Pixel-art wooden vine frame for the entire studio window (excluding header) */
  #pj-explainer, .window-vine-frame {
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
  }
`;

if (!html.includes('border-image-source: url(\'vine_frame.png\')')) {
  html = html.replace('</style>', vineCss + '\n</style>');
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully applied pixel-art vine frame border to app/index.html');
