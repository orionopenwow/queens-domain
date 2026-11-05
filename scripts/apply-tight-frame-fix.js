const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update CSS for .window-vine-frame and #pj-explainer
const oldCssBlock = `  /* Pixel-art wooden vine frame for the entire studio window (excluding header) */
  #pj-explainer, .window-vine-frame {
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 36 !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    border-image-outset: 2px !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    border-radius: 0 !important;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(74, 222, 128, 0.15) !important;
  }`;

const newCssBlock = `  /* Pixel-art wooden vine frame for the entire studio window (excluding header) */
  #pj-explainer, .window-vine-frame {
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 30 26 26 25 !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    border-image-outset: 0 !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    border-radius: 0 !important;
    background-clip: padding-box !important;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(74, 222, 128, 0.15) !important;
  }`;

if (html.includes(oldCssBlock)) {
  html = html.replace(oldCssBlock, newCssBlock);
  console.log('Updated CSS for #pj-explainer and .window-vine-frame');
} else {
  console.log('Warning: oldCssBlock not found exactly, searching via regex');
  html = html.replace(
    /border-image-slice:\s*36\s*!important;[\s\S]*?border-image-outset:\s*2px\s*!important;/,
    `border-image-slice: 30 26 26 25 !important;\n    border-image-width: 11px !important;\n    border-image-repeat: round !important;\n    border-image-outset: 0 !important;\n    background-clip: padding-box !important;`
  );
}

// 2. Update pj-explainer opening tag to have zero border radius and snug padding
html = html.replace(
  /<div class="explainer-hero glass-card" id="pj-explainer" style="[^"]*">/,
  `<div class="explainer-hero" id="pj-explainer" style="max-width:820px;margin:14px auto 30px;background:linear-gradient(180deg, rgba(20,26,36,0.98) 0%, rgba(12,16,24,0.99) 100%);backdrop-filter:blur(24px) saturate(160%);border:11px solid transparent;border-radius:0;padding:16px 20px 22px;box-shadow:0 24px 70px rgba(0,0,0,0.85);position:relative;transition:all .3s ease">`
);

// 3. Remove panel-textured, borders, and separate background from zen-hero-square
html = html.replace(
  /<div id="zen-hero-square" class="panel-textured" style="[^"]*">/,
  `<div id="zen-hero-square" style="text-align:center;max-width:100%;margin:0 0 16px;border:none;border-radius:0;background:transparent;padding:10px 10px 4px">`
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated app/index.html');
