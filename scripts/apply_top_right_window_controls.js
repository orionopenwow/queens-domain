// scripts/apply_top_right_window_controls.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'app', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Remove verbose title at top
html = html.replace(
  '<title>Tome: Vibegaming Engine // Technical Architecture &amp; Asset Studio</title>',
  '<title>&#8203;</title>'
);

// 2. Make window container wide landscape mode
html = html.replace(
  'max-width:1280px;width:94vw;',
  'max-width:1560px;width:calc(100vw - 24px);'
);

// 3. Update #top-nav-bar layout:
// Move red, yellow, green buttons to TOP RIGHT CORNER (replacing Windows original min/max/close)
// Brand on left, Nav buttons in center/right, Window controls in far top-right corner.
const oldHeaderRegex = /<header id="top-nav-bar">[\s\S]*?<\/header>/;

const newHeader = `<header id="top-nav-bar" style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(8,12,18,0.92);border-bottom:1px solid rgba(255,255,255,0.08);user-select:none">
    <!-- Left: Winged Tome Brand Logo & System Menu Toggle -->
    <div style="display:flex;align-items:center;gap:14px">
      <div id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:2px 6px;border-radius:10px;transition:all .2s ease">
        <img src="tome_logo_transparent.png" alt="Tome" style="width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(103,58,183,0.65));transition:transform .2s ease">
        <img src="tome_header_text.png" alt="Tome: Vibegaming Engine" style="height:38px;width:auto;object-fit:contain;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.7))">
      </div>
    </div>

    <!-- Center / Actions: Projects, Settings, Dev Console -->
    <div style="display:flex;align-items:center;gap:10px;margin-left:auto;margin-right:16px">
      <button class="top-header-btn" id="top-btn-projects" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(251,191,36,0.14);border:1px solid rgba(251,191,36,0.38);color:#fbbf24;transition:all .2s ease;display:flex;align-items:center;gap:6px">📁 PROJECTS</button>
      <button class="top-header-btn" id="top-btn-settings" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(148,163,184,0.12);border:1px solid rgba(148,163,184,0.28);color:#cbd5e1;transition:all .2s ease;display:flex;align-items:center;gap:6px">⚙️ SETTINGS</button>
      <button class="top-header-btn" id="top-btn-dev" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.4);color:#34d399;transition:all .2s ease;display:flex;align-items:center;gap:6px">★ DEV CONSOLE</button>
    </div>

    <!-- Far Top-Right Corner: Unified Window Controls (Yellow Minimize, Green Maximize, Red Close) -->
    <div id="window-traffic-lights" style="display:flex;align-items:center;gap:8px;padding-left:14px;border-left:1px solid rgba(255,255,255,0.12)">
      <button id="win-btn-min" title="Minimize / Collapse" aria-label="Minimize" style="width:13px;height:13px;border-radius:50%;background:#ffbd2e;border:1px solid #dea123;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(255,189,46,0.45);transition:all .15s ease">
        <span class="light-icon" style="opacity:0;font-size:10px;font-weight:900;color:#613b00;line-height:1;transition:opacity .15s">−</span>
      </button>
      <button id="win-btn-max" title="Maximize / Toggle Fullscreen" aria-label="Maximize" style="width:13px;height:13px;border-radius:50%;background:#27c93f;border:1px solid #1aab29;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(39,201,63,0.45);transition:all .15s ease">
        <span class="light-icon" style="opacity:0;font-size:8px;font-weight:900;color:#004d11;line-height:1;transition:opacity .15s">⤢</span>
      </button>
      <button id="win-btn-close" title="Close Studio" aria-label="Close" style="width:13px;height:13px;border-radius:50%;background:#ff5f56;border:1px solid #e0443e;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(255,95,86,0.45);transition:all .15s ease">
        <span class="light-icon" style="opacity:0;font-size:8px;font-weight:900;color:#5a0000;line-height:1;transition:opacity .15s">✕</span>
      </button>
    </div>
  </header>`;

if (oldHeaderRegex.test(html)) {
  html = html.replace(oldHeaderRegex, newHeader);
  console.log('Successfully replaced top header with top-right window controls!');
} else {
  console.error('Could not find #top-nav-bar in html');
  process.exit(1);
}

// 4. Update close handler to cleanly close without blocking prompt
const oldCloseHandler = `    if (btnClose) {
      btnClose.onclick = () => {
        if (confirm('Close Tome: Vibegaming Engine?')) {
          window.close();
        }
      };
    }`;

const newCloseHandler = `    if (btnClose) {
      btnClose.onclick = () => {
        window.close();
        try { window.open('', '_self').close(); } catch(e) {}
      };
    }`;

if (html.includes(oldCloseHandler)) {
  html = html.replace(oldCloseHandler, newCloseHandler);
  console.log('Updated close button handler');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved app/index.html');
