const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'app', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// =========================================================================
// 1. UPDATE CSS FOR MERGED WIDE WINDOW & ELIMINATE SECONDARY SCROLLBAR
// =========================================================================

// Ensure outer layout has zero scrolling
const cleanScrollCss = `
  /* Complete elimination of secondary outer window scrollbars */
  html, body, #shell, main, #t-projects, .frame, .page, #pj-list {
    overflow: hidden !important;
    height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar, main::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  /* Unified Single Master Studio Window: Wide landscape proportions */
  #pj-explainer {
    max-width: 1280px !important;
    width: 94vw !important;
    height: calc(100vh - 24px) !important;
    max-height: calc(100vh - 24px) !important;
    margin: 12px auto !important;
    padding: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 30 26 26 25 !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    background: linear-gradient(180deg, rgba(20,26,36,0.98) 0%, rgba(12,16,24,0.99) 100%) !important;
    backdrop-filter: blur(24px) saturate(160%) !important;
    box-shadow: 0 24px 70px rgba(0,0,0,0.85) !important;
    box-sizing: border-box !important;
    position: relative !important;
  }

  /* Merged Window Titlebar: Top of the frame */
  #top-nav-bar {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 6px 16px !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: rgba(12, 16, 24, 0.95) !important;
    flex-shrink: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    box-sizing: border-box !important;
    position: relative !important;
    z-index: 10 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  /* Traffic lights hover micro-interactions */
  #window-traffic-lights:hover .light-icon {
    opacity: 1 !important;
  }
  #win-btn-close:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 10px rgba(255,95,86,0.8) !important;
  }
  #win-btn-min:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 10px rgba(255,189,46,0.8) !important;
  }
  #win-btn-max:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 10px rgba(39,201,63,0.8) !important;
  }

  /* Internal tucked scrollbar inside the unified window */
  #pj-explainer-body {
    flex: 1 !important;
    min-height: 0 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    padding: 16px 24px 30px !important;
    scrollbar-width: thin !important;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent !important;
    box-sizing: border-box !important;
  }
  #pj-explainer-body::-webkit-scrollbar {
    width: 6px !important;
  }
  #pj-explainer-body::-webkit-scrollbar-track {
    background: transparent !important;
  }
  #pj-explainer-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18) !important;
    border-radius: 3px !important;
  }
  #pj-explainer-body::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 189, 248, 0.5) !important;
  }
`;

// Insert or replace cleanScrollCss
if (!html.includes('Complete elimination of secondary outer window scrollbars')) {
  html = html.replace('</style>', cleanScrollCss + '\n</style>');
}

// =========================================================================
// 2. EXTRACT EXISTING TOP-NAV-BAR AND EMBED IT AS TITLEBAR INSIDE PJ-EXPLAINER
// =========================================================================

// Check if top-nav-bar is currently outside pj-explainer
const headerStartIdx = html.indexOf('<header id="top-nav-bar"');
const headerEndIdx = html.indexOf('</header>', headerStartIdx) + 9;

if (headerStartIdx !== -1 && headerEndIdx !== -1) {
  // Extract old header
  const oldHeaderHtml = html.substring(headerStartIdx, headerEndIdx);
  
  // Cut old header from its previous position in <main>
  html = html.substring(0, headerStartIdx) + html.substring(headerEndIdx);
  console.log('Cut top-nav-bar from outside pj-explainer');
}

// Build merged header bar with macOS-style Red, Yellow, Green circles
const mergedHeaderHtml = `<header id="top-nav-bar">
    <!-- Left: Traffic Light Window Buttons + Winged Tome Brand -->
    <div style="display:flex;align-items:center;gap:12px">
      <!-- Traffic Light Circles (Red Close, Yellow Minimize, Green Maximize) -->
      <div id="window-traffic-lights" style="display:flex;align-items:center;gap:8px;padding-right:8px;border-right:1px solid rgba(255,255,255,0.1)">
        <button id="win-btn-close" title="Close" aria-label="Close" style="width:13px;height:13px;border-radius:50%;background:#ff5f56;border:1px solid #e0443e;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(255,95,86,0.45);transition:all .15s ease">
          <span class="light-icon" style="opacity:0;font-size:8px;font-weight:900;color:#5a0000;line-height:1;transition:opacity .15s">✕</span>
        </button>
        <button id="win-btn-min" title="Minimize / Compact View" aria-label="Minimize" style="width:13px;height:13px;border-radius:50%;background:#ffbd2e;border:1px solid #dea123;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(255,189,46,0.45);transition:all .15s ease">
          <span class="light-icon" style="opacity:0;font-size:10px;font-weight:900;color:#613b00;line-height:1;transition:opacity .15s">−</span>
        </button>
        <button id="win-btn-max" title="Maximize / Toggle Fullscreen" aria-label="Maximize" style="width:13px;height:13px;border-radius:50%;background:#27c93f;border:1px solid #1aab29;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(39,201,63,0.45);transition:all .15s ease">
          <span class="light-icon" style="opacity:0;font-size:8px;font-weight:900;color:#004d11;line-height:1;transition:opacity .15s">⤢</span>
        </button>
      </div>

      <!-- Winged Tome Brand / Menu Toggle -->
      <div id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:2px 6px;border-radius:10px;transition:all .2s ease;user-select:none">
        <img src="tome_logo_transparent.png" alt="Tome" style="width:64px;height:64px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(103,58,183,0.65));transition:transform .2s ease">
        <img src="tome_header_text.png" alt="Tome: Vibegaming Engine" style="height:64px;width:auto;object-fit:contain;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.7))">
      </div>
    </div>

    <!-- Right: Projects, Settings, Dev Console -->
    <div style="display:flex;align-items:center;gap:8px">
      <button class="top-header-btn" id="top-btn-projects" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(251,191,36,0.14);border:1px solid rgba(251,191,36,0.38);color:#fbbf24;transition:all .2s ease;display:flex;align-items:center;gap:6px">📁 PROJECTS</button>
      <button class="top-header-btn" id="top-btn-settings" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(148,163,184,0.12);border:1px solid rgba(148,163,184,0.28);color:#cbd5e1;transition:all .2s ease;display:flex;align-items:center;gap:6px">⚙️ SETTINGS</button>
      <button class="top-header-btn" id="top-btn-dev" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.03em;cursor:pointer;background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.4);color:#34d399;transition:all .2s ease;display:flex;align-items:center;gap:6px">★ DEV CONSOLE</button>
    </div>
  </header>`;

// Insert merged header directly inside pj-explainer
const explainerStartIdx = html.indexOf('id="pj-explainer"');
if (explainerStartIdx !== -1) {
  // Find where opening <div ... id="pj-explainer" ...> ends
  const explainerOpenEnd = html.indexOf('>', explainerStartIdx) + 1;
  
  // Wrap existing explainer content into <div id="pj-explainer-body">
  // Check if pj-explainer-body already exists
  if (!html.includes('id="pj-explainer-body"')) {
    // Find closing </div> of pj-explainer:
    // It's right before </section> or before the end of pj-list
    const pjListEnd = html.indexOf('</div>\n        <!-- Bottom Outside Game Studio Info Banner', explainerOpenEnd);
    let closeIdx = pjListEnd;
    if (closeIdx === -1) {
      closeIdx = html.indexOf('</div>\n      </div>\n    </div>\n  </section>', explainerOpenEnd);
    }
    if (closeIdx === -1) {
      closeIdx = html.indexOf('</div>\n    </div>\n  </section>', explainerOpenEnd);
    }

    if (closeIdx !== -1) {
      const innerContent = html.substring(explainerOpenEnd, closeIdx);
      const newInner = '\n' + mergedHeaderHtml + '\n<div id="pj-explainer-body">' + innerContent + '\n</div>';
      html = html.substring(0, explainerOpenEnd) + newInner + html.substring(closeIdx);
      console.log('Merged top-nav-bar into pj-explainer and wrapped body with #pj-explainer-body');
    } else {
      // Just insert at top of pj-explainer
      html = html.substring(0, explainerOpenEnd) + '\n' + mergedHeaderHtml + '\n<div id="pj-explainer-body">\n' + html.substring(explainerOpenEnd) + '\n</div>';
      console.log('Inserted mergedHeaderHtml into top of pj-explainer');
    }
  } else {
    // Replace existing top-nav-bar inside pj-explainer if already there
    const curTopIdx = html.indexOf('<header id="top-nav-bar"');
    const curTopEnd = html.indexOf('</header>', curTopIdx) + 9;
    html = html.substring(0, curTopIdx) + mergedHeaderHtml + html.substring(curTopEnd);
    console.log('Updated existing top-nav-bar inside pj-explainer');
  }
}

// =========================================================================
// 3. JAVASCRIPT CONTROLLERS FOR TRAFFIC LIGHT BUTTONS
// =========================================================================
const trafficJs = `
  // --- Traffic Light Window Control Buttons (Red Close, Yellow Min, Green Max) ---
  (function initTrafficLightControls() {
    const btnClose = document.getElementById('win-btn-close');
    const btnMin = document.getElementById('win-btn-min');
    const btnMax = document.getElementById('win-btn-max');

    if (btnClose) {
      btnClose.onclick = () => {
        if (confirm('Close Tome: Vibegaming Engine?')) {
          window.close();
        }
      };
    }

    if (btnMin) {
      btnMin.onclick = () => {
        const bodyEl = document.getElementById('pj-explainer-body');
        if (bodyEl) {
          const isHidden = bodyEl.style.display === 'none';
          bodyEl.style.display = isHidden ? 'block' : 'none';
          btnMin.title = isHidden ? 'Minimize / Collapse' : 'Expand / Restore';
        }
      };
    }

    if (btnMax) {
      btnMax.onclick = () => {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          }
        }
      };
    }
  })();
`;

if (!html.includes('initTrafficLightControls')) {
  const scriptEndIdx = html.lastIndexOf('</script>');
  if (scriptEndIdx !== -1) {
    html = html.substring(0, scriptEndIdx) + '\n' + trafficJs + '\n' + html.substring(scriptEndIdx);
    console.log('Inserted JS controller for traffic light buttons');
  }
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully saved app/index.html');

// =========================================================================
// 4. UPDATE BUILD-EXE.JS FOR WIDE INITIAL WINDOW SIZE
// =========================================================================
const buildExePath = path.join(root, 'scripts', 'build-exe.js');
let buildExeContent = fs.readFileSync(buildExePath, 'utf8');

// Update LaunchBrowser to pass --window-size=1440,880
buildExeContent = buildExeContent.replace(
  'Process.Start(edge, "--app=\\"" + url + "\\"");',
  'Process.Start(edge, "--app=\\"" + url + "\\" --window-size=1440,880");'
);
buildExeContent = buildExeContent.replace(
  'Process.Start(chrome, "--app=\\"" + url + "\\"");',
  'Process.Start(chrome, "--app=\\"" + url + "\\" --window-size=1440,880");'
);

fs.writeFileSync(buildExePath, buildExeContent, 'utf8');
console.log('Successfully updated scripts/build-exe.js with wide initial window launch size (1440x880)');
