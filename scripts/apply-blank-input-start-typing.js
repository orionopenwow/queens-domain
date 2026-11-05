// scripts/apply-blank-input-start-typing.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Add CSS for #dec-query::placeholder transparent text
if (!html.includes('#dec-query::placeholder')) {
  const styleInject = `
    #dec-query::placeholder {
      color: rgba(255, 255, 255, 0.35) !important;
      font-weight: 400 !important;
      font-style: italic !important;
      opacity: 0.55 !important;
    }
  </style>`;
  html = html.replace('</style>', styleInject);
}

// 2. Find exact block
const startMarker = '<!-- Main High-Prominence Chat / Prompt Input Bar -->';
const endMarker = '<!-- Clickable Instant Inspiration Sparks Bar';

const sIdx = html.indexOf(startMarker);
const eIdx = html.indexOf(endMarker, sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const oldBlock = html.slice(sIdx, eIdx);
  const newBlock = `<!-- Main High-Prominence Chat / Prompt Input Bar -->
            <div style="position:relative;max-width:720px;margin:0 auto 10px">
              <input id="dec-query" placeholder="start typing..." value="" autocomplete="off" spellcheck="false" style="width:100%;padding:14px 22px;background:rgba(8,12,18,0.95);border:1.5px solid rgba(56,189,248,0.35);border-radius:12px;color:#ffffff;font-size:15px;font-weight:500;outline:none;box-shadow:0 0 20px rgba(56,189,248,0.12),inset 0 0 12px rgba(0,0,0,0.7);transition:all .2s ease">
              
              <!-- Hidden compatibility hooks for existing script bindings & test suites -->
              <span id="zen-open-sheets-btn" style="display:none"></span>
              <span id="zen-attach-btn" style="display:none"></span>
              <span id="zen-clear-btn" style="display:none"></span>
              <input type="file" id="zen-file-input" style="display:none" multiple accept=".glb,.gltf,.obj,.fbx,.png,.jpg,.jpeg,.webp,.svg,.wav,.mp3,.ogg,.txt,.md,.json,.zip">
            </div>

            `;
  html = html.replace(oldBlock, newBlock);
  console.log('Successfully replaced input container markup!');
} else {
  console.error('Markers not found: sIdx =', sIdx, ', eIdx =', eIdx);
}

// 3. Make sure runDeconstructor does not set decQ.value when empty
const oldFnCheck = html.includes('decQ.value=concept;');
console.log('Old fn check decQ.value=concept:', oldFnCheck);

// Let's inspect where decQ.value=concept; is
const oldSnippet = `function runDeconstructor(concept){
  if(!concept)concept=decQ.value.trim()||'Action RPG';
  decQ.value=concept;`;

const newSnippet = `function runDeconstructor(concept){
  const userText = (concept !== undefined && concept !== null) ? String(concept).trim() : (decQ ? decQ.value.trim() : '');
  // Do NOT write default concept back into the user input when blank
  if (decQ && concept !== undefined && concept !== null && String(concept).trim() !== '') {
    decQ.value = concept;
  }
  const conceptToAnalyze = userText || 'Action RPG';
  concept = conceptToAnalyze;`;

if (html.includes(oldSnippet)) {
  html = html.replace(oldSnippet, newSnippet);
  console.log('Replaced oldSnippet in runDeconstructor');
}

// Also verify at page load decQ.value is explicitly set to ""
const initTarget = "renderAssetSheet();\nrunDeconstructor(decQ.value);";
if (html.includes(initTarget)) {
  html = html.replace(initTarget, "renderAssetSheet();\nif (decQ) decQ.value = '';\nrunDeconstructor('');\nif (decQ) decQ.value = '';");
  console.log('Replaced initTarget');
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Written successfully to', appHtmlPath);
