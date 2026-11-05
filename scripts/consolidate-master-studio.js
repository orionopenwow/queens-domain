// scripts/consolidate-master-studio.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. CSS hardening: remove all vertical lines, fix scrollbars, perfect layout styling
const cssRules = `
  /* Hardened clean layout: no borders or scrollbar lines over forest */
  html, body, #shell, main, .frame, .page, #t-projects, #pj-list {
    border: none !important;
    outline: none !important;
  }
  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
    border: none !important;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12) !important;
    border-radius: 4px !important;
    border: none !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25) !important;
  }

  /* Consolidated card styling */
  .studio-viewport-card {
    background: rgba(8, 12, 18, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    transition: all .2s ease;
  }
  .studio-viewport-card:hover {
    border-color: rgba(56, 189, 248, 0.35);
  }
</style>`;

html = html.replace('</style>', cssRules);

// 2. Locate the full pj-explainer block
const startExplainer = html.indexOf('<!-- Unified Minimalist Autonomous Game Studio Card');
const closeTab = html.indexOf('</section>', startExplainer);

if (startExplainer !== -1 && closeTab !== -1) {
  console.log('Found explainer region');
} else {
  console.error('Could not find explainer region');
}
