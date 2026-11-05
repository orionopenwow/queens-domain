const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Ensure the IDs exist in the active-project-builder-section:
// pj-builder-title, pj-builder-engine-badge, pj-builder-steps-badge, pj-builder-prompt-snippet
const titleTarget = '<h4 id="builder-proj-name" style="font-size:14px;font-weight:800;color:#ffffff;margin:0">Tome: Awakening (Preset)</h4>';
const titleReplacement = '<h4 id="builder-proj-name" style="font-size:14px;font-weight:800;color:#ffffff;margin:0"><span id="pj-builder-title">Tome: Awakening (Preset)</span></h4>';

if (html.includes(titleTarget)) {
  html = html.replace(titleTarget, titleReplacement);
  console.log('Added pj-builder-title');
}

// Add hidden compatibility tags if not present directly in the active builder:
if (!html.includes('id="pj-builder-engine-badge"')) {
  html = html.replace(
    'id="active-project-builder-section"',
    'id="active-project-builder-section">\n            <span id="pj-builder-engine-badge" style="display:none">Unity C#</span>\n            <span id="pj-builder-steps-badge" style="display:none">32 Steps</span>\n            <span id="pj-builder-prompt-snippet" style="display:none">Prompt</span>'
  );
  console.log('Added pj-builder-engine-badge, steps-badge, and prompt-snippet');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Saved app/index.html');
