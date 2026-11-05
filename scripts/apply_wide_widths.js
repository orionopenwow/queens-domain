const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'app', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update #pj-explainer inline style from 820px to wide flex column
html = html.replace(
  'id="pj-explainer" style="max-width:820px;margin:14px auto 30px;background:linear-gradient(180deg, rgba(20,26,36,0.98) 0%, rgba(12,16,24,0.99) 100%);backdrop-filter:blur(24px) saturate(160%);border:11px solid transparent;border-radius:0;padding:16px 20px 22px;box-shadow:0 24px 70px rgba(0,0,0,0.85);position:relative;transition:all .3s ease">',
  'id="pj-explainer" style="max-width:1280px;width:94vw;height:calc(100vh - 24px);max-height:calc(100vh - 24px);margin:12px auto;padding:0;background:linear-gradient(180deg, rgba(20,26,36,0.98) 0%, rgba(12,16,24,0.99) 100%);backdrop-filter:blur(24px) saturate(160%);border:11px solid transparent;border-radius:0;box-shadow:0 24px 70px rgba(0,0,0,0.85);position:relative;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;transition:all .3s ease">'
);

// Update widths of inner cards to wide 1160px
html = html.replace(/max-width:760px;/g, 'max-width:1160px;width:100%;');
html = html.replace(/max-width:720px;/g, 'max-width:1160px;width:100%;');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated wide layout styles in app/index.html');
