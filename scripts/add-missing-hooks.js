const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

const missingIds = [
  'asset-sub-drawer', 'asset-sub-title', 'asset-sub-options', 'asset-sub-close',
  'asset-pane-drop-zone', 'asset-link-input', 'asset-link-add-btn', 'dec-prompt-sel',
  'dec-prompt-preview', 'dec-preset-scifi', 'dec-preset-horror', 'dock-prompt-meta',
  'ide-eng-unreal', 'ide-open-cdn', 'dec-copy-prompt', 'btn-dock-send-agent', 'sprite-frame-counter'
];

const hookElements = missingIds.map(id => {
  if (id.startsWith('btn') || id.includes('btn') || id.startsWith('ide-')) {
    return `<button id="${id}"></button>`;
  } else if (id.includes('input')) {
    return `<input id="${id}">`;
  } else {
    return `<div id="${id}"></div>`;
  }
}).join('');

const target = '<div id="studio-unfolded-hub" style="display:none">';
if (html.includes(target)) {
  html = html.replace(target, target + '\n' + hookElements);
  fs.writeFileSync(appHtmlPath, html, 'utf8');
  console.log('Added missing compatibility hooks successfully');
}
