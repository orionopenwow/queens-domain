const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'app', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Exact slice of the cramped add-claude-banner inside master-prompt-bundle-console
const bannerStart = html.indexOf('<!-- Bottom Info Area: Add Claude (Outside Game Creation Card) -->');
const bannerEnd = html.indexOf('<p style="font-size:11px;color:#94a3b8;margin:0 0 10px;line-height:1.4">');

if (bannerStart === -1 || bannerEnd === -1) {
  console.error('Failed to locate bannerStart or bannerEnd:', { bannerStart, bannerEnd });
  process.exit(1);
}

// Remove it from inside master-prompt-bundle-console
html = html.substring(0, bannerStart) + html.substring(bannerEnd);
console.log('Cleanly removed add-claude-banner from inside master-prompt-bundle-console');

// 2. Re-style Inspiration Vault & Moodboard with generous spacing
html = html.replace(
  'id="insp-board-container" style="max-width:1160px;width:100%;margin:0 auto 18px;text-align:left">',
  'id="insp-board-container" style="max-width:1160px;width:100%;margin:28px auto 36px;background:rgba(8,12,18,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px 26px;box-shadow:0 12px 32px rgba(0,0,0,0.5);text-align:left">'
);

// Add spacing to masonry grid
html = html.replace(
  '<div id="insp-masonry-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(170px, 1fr));gap:10px"></div>',
  '<div id="insp-masonry-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:14px;margin-top:14px"></div>'
);

// 3. Re-style Ever-Evolving Master AI Prompt Console with generous padding and spacing
html = html.replace(
  'id="master-prompt-bundle-console" style="background:linear-gradient(180deg, rgba(8,12,18,0.96) 0%, rgba(4,6,10,0.98) 100%);border:1px solid rgba(56,189,248,0.35);border-radius:14px;padding:16px 18px;margin-top:14px;box-shadow:0 12px 32px rgba(0,0,0,0.6)">',
  'id="master-prompt-bundle-console" style="max-width:1160px;width:100%;margin:36px auto 32px;background:linear-gradient(180deg, rgba(8,12,18,0.98) 0%, rgba(4,6,10,0.99) 100%);border:1.5px solid rgba(56,189,248,0.4);border-radius:16px;padding:24px 28px;box-shadow:0 16px 45px rgba(0,0,0,0.7);box-sizing:border-box">'
);

// Enlarge header margin
html = html.replace(
  '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">',
  '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">'
);

// Upgrade description
html = html.replace(
  '<p style="font-size:11px;color:#94a3b8;margin:0 0 10px;line-height:1.4">',
  '<p style="font-size:12px;color:#94a3b8;margin:0 0 16px;line-height:1.5">'
);

// Enlarge textarea to 8 rows, 185px min-height, comfortable padding
html = html.replace(
  '<textarea id="dock-preview" rows="5" readonly style="width:100%;background:#020408;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;color:#38bdf8;font-family:Consolas,monospace;font-size:11px;line-height:1.45;resize:vertical"></textarea>',
  '<textarea id="dock-preview" rows="8" readonly style="width:100%;min-height:185px;background:#020408;border:1px solid rgba(56,189,248,0.25);border-radius:10px;padding:14px 18px;color:#38bdf8;font-family:Consolas,monospace;font-size:12px;line-height:1.6;resize:vertical;box-sizing:border-box;box-shadow:inset 0 2px 8px rgba(0,0,0,0.7)"></textarea>'
);

// Space out button row
html = html.replace(
  '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;flex-wrap:wrap">',
  '<div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:18px;flex-wrap:wrap">'
);

// 4. Clean, spacious standalone Claude Autonomous Co-Pilot Dock
const cleanClaudeBannerHtml = `<!-- Dedicated Autonomous Co-Pilot Dock: Add Claude (Spacious Standalone Card) -->
          <div id="add-claude-banner" style="max-width:1160px;width:100%;margin:32px auto 24px;padding:20px 26px;background:linear-gradient(135deg, rgba(20,16,36,0.96) 0%, rgba(12,14,24,0.98) 100%);backdrop-filter:blur(20px);border:1.5px solid rgba(168,85,247,0.4);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;box-sizing:border-box">
            <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:300px">
              <span style="font-size:26px;filter:drop-shadow(0 0 10px rgba(168,85,247,0.6))">🤖</span>
              <div>
                <div style="font-size:13px;font-weight:800;color:#c084fc;display:flex;align-items:center;gap:8px;letter-spacing:.03em">
                  <span>ADD CLAUDE TO STUDIO UI</span>
                  <span class="badge" style="background:rgba(168,85,247,0.22);color:#d8b4fe;border:1px solid rgba(168,85,247,0.5);font-size:10px;padding:2px 8px;border-radius:6px">AUTONOMOUS CO-PILOT</span>
                </div>
                <div style="font-size:11.5px;color:#cbd5e1;line-height:1.45;margin-top:4px">
                  Prompt Claude directly into your workflow to edit project code, generate CC0 asset specifications, craft world placements, and expand game mechanics.
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <input id="claude-quick-prompt" readonly value="Act as my Lead Game Architect inside Queen's Domain studio. You can edit any project file, generate CC0 asset specifications, build zero-GC game mechanics, and expand the master prompt. Let's create: [Game Concept]" style="width:340px;max-width:100%;font-size:11px;padding:9px 12px;background:rgba(0,0,0,0.75);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#e2e8f0;outline:none" />
              <button class="btn gold" id="btn-copy-claude-prompt" onclick="navigator.clipboard.writeText(document.getElementById('claude-quick-prompt').value);this.textContent='Copied!';setTimeout(()=>this.textContent='📋 Copy Claude Prompt',1500)" style="font-size:11.5px;font-weight:700;padding:9px 16px;white-space:nowrap;background:rgba(168,85,247,0.3);border:1.5px solid rgba(168,85,247,0.65);color:#f3e8ff;border-radius:8px;cursor:pointer;transition:all .15s ease">📋 Copy Claude Prompt</button>
            </div>
          </div>`;

// Insert the standalone Claude banner right after master-prompt-bundle-console closing div
const targetAfterConsole = '<!-- Hidden compatibility hooks for existing script bindings & test suites -->';
const targetPos = html.indexOf(targetAfterConsole);
if (targetPos !== -1) {
  html = html.substring(0, targetPos) + cleanClaudeBannerHtml + '\n\n          ' + html.substring(targetPos);
  console.log('Successfully placed standalone Claude banner below master prompt console');
} else {
  console.error('Target position for standalone banner not found');
  process.exit(1);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully saved app/index.html');
