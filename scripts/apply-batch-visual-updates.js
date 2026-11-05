const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE HEADER BUTTONS & HEADER FRAME STYLE
// Replace top-nav-bar styles and buttons
const topNavRegex = /<header id="top-nav-bar" style="[^"]*">/;
const newTopNavTag = `<header id="top-nav-bar" style="max-width:820px;width:100%;margin:12px auto 8px;display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:linear-gradient(180deg, rgba(20,26,36,0.98) 0%, rgba(12,16,24,0.99) 100%) !important;backdrop-filter:blur(22px);border:11px solid transparent !important;border-image-source:url('vine_frame.png') !important;border-image-slice:30 26 26 25 !important;border-image-width:11px !important;border-image-repeat:round !important;border-image-outset:0 !important;background-clip:padding-box !important;border-radius:0 !important;box-shadow:0 16px 40px rgba(0,0,0,0.85);position:relative;z-index:10;box-sizing:border-box">`;

if (topNavRegex.test(html)) {
  html = html.replace(topNavRegex, newTopNavTag);
  console.log('Applied wooden vine frame and slate styling to top-nav-bar');
}

// Update top-btn-projects
const projectsRegex = /<button class="btn on" data-t="projects" id="top-btn-projects" style="[^"]*">PROJECTS<\/button>/;
const newProjectsBtn = `<button class="btn on" data-t="projects" id="top-btn-projects" style="font-size:11px;padding:6px 14px;font-weight:700;letter-spacing:.03em;background:rgba(251,191,36,0.12) !important;border:1.5px solid rgba(251,191,36,0.45) !important;color:#fbbf24 !important;border-radius:8px;box-shadow:0 0 10px rgba(251,191,36,0.15);cursor:pointer;transition:all .15s ease">📁 PROJECTS</button>`;

if (projectsRegex.test(html)) {
  html = html.replace(projectsRegex, newProjectsBtn);
  console.log('Updated PROJECTS button to 📁 PROJECTS with yellow-ish styling');
}

// Update top-btn-settings
const settingsRegex = /<button class="btn" data-t="settings" id="top-btn-settings" style="[^"]*">SETTINGS<\/button>/;
const newSettingsBtn = `<button class="btn" data-t="settings" id="top-btn-settings" style="font-size:11px;padding:6px 14px;font-weight:600;letter-spacing:.03em;background:rgba(148,163,184,0.08) !important;border:1.5px solid rgba(148,163,184,0.25) !important;color:#94a3b8 !important;border-radius:8px;cursor:pointer;transition:all .15s ease">⚙️ SETTINGS</button>`;

if (settingsRegex.test(html)) {
  html = html.replace(settingsRegex, newSettingsBtn);
  console.log('Updated SETTINGS button to ⚙️ SETTINGS with greyish styling');
}

// 2. SCROLLBAR TUCKED INSIDE pj-explainer AND REMOVED FROM OUTSIDE
// Add CSS rules for hiding outer scrollbar and tucking scrollbar inside #pj-explainer
const scrollbarCss = `
  /* Hide outer browser window scrollbars */
  html, body {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  /* Tucked, transparent internal scrollbar for #pj-explainer */
  #pj-explainer {
    max-height: calc(100vh - 95px) !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    scrollbar-width: thin !important;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent !important;
    box-sizing: border-box !important;
  }
  #pj-explainer::-webkit-scrollbar {
    width: 6px !important;
  }
  #pj-explainer::-webkit-scrollbar-track {
    background: transparent !important;
  }
  #pj-explainer::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18) !important;
    border-radius: 3px !important;
  }
  #pj-explainer::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 189, 248, 0.5) !important;
  }
`;

if (!html.includes('/* Tucked, transparent internal scrollbar for #pj-explainer */')) {
  html = html.replace('</style>', scrollbarCss + '\n</style>');
  console.log('Added tucked internal scrollbar CSS');
}

// 3. PIXEL ART VIEWER AREA: REPLACE WITH ANIMATED GIF
// Locate pixel-sprite-canvas container
const oldSpriteCanvasBlock = `<canvas id="pixel-sprite-canvas" width="240" height="190" style="width:100%;height:100%;image-rendering:pixelated"></canvas>`;
const newSpriteBlock = `<img id="pixel-sprite-gif" src="pixel_art.gif" alt="Pixel Art Animation" style="width:100%;height:100%;object-fit:contain;image-rendering:pixelated;image-rendering:crisp-edges">
                  <canvas id="pixel-sprite-canvas" width="240" height="190" style="display:none"></canvas>`;

if (html.includes(oldSpriteCanvasBlock)) {
  html = html.replace(oldSpriteCanvasBlock, newSpriteBlock);
  console.log('Replaced pixel-sprite-canvas with cropped pixel_art.gif and hidden canvas compatibility hook');
}

// Update the label below sprite
html = html.replace(
  '<span>Crimson Wanderer Sprite</span>',
  '<span>Pixel Art Animation</span>'
);

// 4. ADD 'ADD CLAUDE' BOTTOM INFO AREA OUTSIDE GAME CREATION BOX
const bottomClaudeHtml = `
          <!-- Bottom Info Area: Add Claude (Outside Game Creation Card) -->
          <div id="add-claude-banner" style="max-width:820px;margin:0 auto 28px;padding:12px 18px;background:rgba(12,16,24,0.92);backdrop-filter:blur(18px);border:1px solid rgba(168,85,247,0.35);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;box-sizing:border-box">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="font-size:20px">🤖</span>
              <div>
                <div style="font-size:12px;font-weight:800;color:#c084fc;display:flex;align-items:center;gap:8px">
                  <span>ADD CLAUDE TO STUDIO UI</span>
                  <span class="badge" style="background:rgba(168,85,247,0.2);color:#c084fc;border:1px solid rgba(168,85,247,0.5);font-size:9.5px;padding:1px 6px">AUTONOMOUS CO-PILOT</span>
                </div>
                <div style="font-size:11px;color:#94a3b8;line-height:1.35;margin-top:2px">
                  Prompt Claude directly into your workflow to edit code, generate CC0 asset specifications, craft world placements, and expand mechanics.
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <input id="claude-quick-prompt" readonly value="Act as my Lead Game Architect inside Queen's Domain studio. You can edit any project file, generate CC0 asset specifications, build zero-GC game mechanics, and expand the master prompt. Let's create: [Game Concept]" style="width:280px;font-size:10px;padding:6px 10px;background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.18);border-radius:6px;color:#cbd5e1;outline:none" />
              <button class="btn gold" id="btn-copy-claude-prompt" onclick="navigator.clipboard.writeText(document.getElementById('claude-quick-prompt').value);this.textContent='Copied!';setTimeout(()=>this.textContent='📋 Copy Claude Prompt',1500)" style="font-size:11px;font-weight:700;padding:6px 12px;white-space:nowrap;background:rgba(168,85,247,0.25);border:1px solid rgba(168,85,247,0.6);color:#e9d5ff">📋 Copy Claude Prompt</button>
            </div>
          </div>
`;

// Insert directly after closing tag of pj-explainer
if (!html.includes('id="add-claude-banner"')) {
  // Find </section> before BRIEFING
  const briefingStart = html.indexOf('<!-- BRIEFING -->');
  if (briefingStart !== -1) {
    const insertPoint = html.lastIndexOf('</div>', briefingStart);
    // Find the end of pj-explainer:
    const explainerStart = html.indexOf('id="pj-explainer"');
    const explainerEnd = html.indexOf('<!-- DOCK PROMPT -->', explainerStart);
    // Let's find the closing div of pj-explainer
    const masterConsole = html.indexOf('id="master-prompt-bundle-console"');
    const afterConsole = html.indexOf('</div>', masterConsole);
    const afterExplainer = html.indexOf('</div>', afterConsole + 6);
    
    html = html.substring(0, afterExplainer + 6) + '\n' + bottomClaudeHtml + html.substring(afterExplainer + 6);
    console.log('Inserted Add Claude banner below pj-explainer');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully applied all batch updates to app/index.html');
