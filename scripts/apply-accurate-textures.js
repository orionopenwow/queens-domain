// scripts/apply-accurate-textures.js
// Applies accurate panel textures extracted from ui_elements_sheet.jpg to the studio panels

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add texture classes and styling in <style>
const textureCss = `
  /* Accurate Panel Texture from Asset Sheet */
  .panel-textured {
    background: #121822 url('panel_texture.jpg') repeat !important;
    background-size: 260px 90px !important;
    box-shadow: 0 16px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08) !important;
  }
  .card-textured {
    background: #0f151e url('panel_texture.jpg') repeat !important;
    background-size: 260px 90px !important;
    box-shadow: 0 12px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06) !important;
  }
  .btn-gold-wood {
    background: linear-gradient(180deg, #3d2a10 0%, #291c0a 100%) !important;
    border: 1.5px solid #d97706 !important;
    color: #fef3c7 !important;
    box-shadow: 0 2px 8px rgba(217,119,6,0.3), inset 0 1px 0 rgba(255,255,255,0.18) !important;
    border-radius: 7px !important;
    font-weight: 700 !important;
    transition: all .15s ease !important;
  }
  .btn-gold-wood:hover {
    filter: brightness(1.15) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(217,119,6,0.45), inset 0 1px 0 rgba(255,255,255,0.25) !important;
  }
`;

if (!html.includes('.panel-textured')) {
  html = html.replace('</style>', textureCss + '\n</style>');
}

// 2. Apply .panel-textured to the top hero box in pj-explainer
html = html.replace(
  '<div id="zen-hero-square" style="text-align:center;max-width:720px;margin:0 auto">',
  '<div id="zen-hero-square" class="panel-textured" style="text-align:center;max-width:740px;margin:0 auto 18px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:22px 24px">'
);

// 3. Update + Create New Project button with .btn-gold-wood
html = html.replace(
  '<button class="btn gold" id="pj-new" style="padding:5px 14px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.45);color:#fbbf24">+ Create New Project</button>',
  '<button class="btn btn-gold-wood" id="pj-new" style="padding:6px 16px;font-size:11.5px">+ Create New Project</button>'
);

// 4. Update the card creation in renderProjects to use .card-textured
html = html.replace(
  "c.style.cssText='width:340px;background:rgba(9,13,19,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 8px 24px rgba(0,0,0,0.5)';",
  "c.className += ' card-textured'; c.style.cssText='width:340px;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;';"
);

// 5. Ensure pj-explainer outer card matches the subtle transparent container enclosing both
html = html.replace(
  'id="pj-explainer" style="max-width:780px;margin:16px auto 28px;background:rgba(12,17,24,0.88);backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:22px 28px;box-shadow:0 24px 70px rgba(0,0,0,0.75),inset 0 1px 0 rgba(255,255,255,0.1);position:relative;transition:all .3s ease"',
  'id="pj-explainer" style="max-width:790px;margin:14px auto 26px;background:rgba(10,14,20,0.78);backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:18px 22px;box-shadow:0 24px 70px rgba(0,0,0,0.8);position:relative;transition:all .3s ease"'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated accurate textures in app/index.html');
