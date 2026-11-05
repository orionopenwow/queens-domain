const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'app', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// =========================================================================
// 1. ADD NON-NEON LEGIBLE TYPOGRAPHY CSS TO <style>
// =========================================================================
const typographyUpgradeCss = `
  /* Refined, High-Legibility Modern Typography & Non-Neon Theme */
  :root {
    --cyan: #38bdf8 !important;     /* Calmer, deeply legible sky cyan instead of glaring electric cyan */
    --blue: #38bdf8 !important;
    --gold: #f59e0b !important;     /* Warm elegant amber instead of radioactive yellow */
    --gold2: #d97706 !important;
    --gold3: #fef3c7 !important;
    --text: #f8fafc !important;     /* Clean soft off-white primary text */
    --dim: #94a3b8 !important;      /* Balanced neutral slate secondary text */
  }

  body, button, input, select, textarea {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
  }

  code, pre, .mono, textarea {
    font-family: Consolas, "SF Mono", Monaco, Menlo, "Courier New", monospace !important;
  }

  /* Tone down harsh neon glows and text shadows */
  h1, h2, h3, h4, h5, h6, .badge, .top-header-btn {
    text-shadow: none !important;
  }

  /* Refined, non-neon badge styling */
  .badge {
    font-weight: 600 !important;
    letter-spacing: .02em !important;
    border-radius: 6px !important;
  }
  .badge.ok {
    background: rgba(16, 185, 129, 0.12) !important;
    color: #34d399 !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important;
  }
  .badge.gold {
    background: rgba(245, 158, 11, 0.12) !important;
    color: #fbbf24 !important;
    border: 1px solid rgba(245, 158, 11, 0.3) !important;
  }
  .badge.act {
    background: rgba(56, 189, 248, 0.12) !important;
    color: #38bdf8 !important;
    border: 1px solid rgba(56, 189, 248, 0.3) !important;
  }
`;

if (!html.includes('Refined, High-Legibility Modern Typography')) {
  html = html.replace('</style>', typographyUpgradeCss + '\n</style>');
  console.log('Added legible non-neon typography CSS rules');
}

// =========================================================================
// 2. SIMPLIFY & UPGRADE CURRENT SELECTED PROJECT ARCHITECTURE CARD
// =========================================================================
const builderStart = html.indexOf('<div id="active-project-builder-section">');
const builderEnd = html.indexOf('<!-- ==================== 3. INSPIRATION VAULT & MOODBOARD', builderStart);

if (builderStart !== -1 && builderEnd !== -1) {
  const simplifiedBuilderHtml = `<div id="active-project-builder-section">
            <span id="pj-builder-engine-badge" style="display:none">Unity C#</span>
            <span id="pj-builder-steps-badge" style="display:none">32 Steps</span>
            <span id="pj-builder-prompt-snippet" style="display:none">Prompt</span>
            
            <!-- Simplified, Clean Architecture Card (Broken out, no empty black box) -->
            <div style="max-width:1160px;width:100%;margin:0 auto 30px;background:rgba(10,14,22,0.92);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px 24px;box-shadow:0 12px 32px rgba(0,0,0,0.5);box-sizing:border-box">
              
              <!-- Header Bar: Clean Title & Action Buttons -->
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:16px">👑</span>
                  <span style="font-size:13.5px;font-weight:700;color:#f8fafc;letter-spacing:.02em">Current Project Architecture</span>
                  <span class="badge" style="font-size:10px;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.12);color:#38bdf8;border:1px solid rgba(56,189,248,0.25)">Active Blueprint</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <button class="btn gold" id="pj-builder-copy-btn" style="padding:6px 14px;font-size:11.5px;font-weight:600;border-radius:8px;cursor:pointer">📋 Copy Project Prompt</button>
                  <button class="btn" id="pj-builder-work-btn" style="padding:6px 14px;font-size:11.5px;font-weight:600;border-radius:8px;cursor:pointer;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:#e2e8f0">⚡ Work on Project</button>
                </div>
              </div>

              <!-- Main Project Blueprint Content -->
              <div style="background:#04060a;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px 18px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:8px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">🎮</span>
                    <h4 id="builder-proj-name" style="font-size:14px;font-weight:700;color:#f8fafc;margin:0"><span id="pj-builder-title">Active Project: 3D Dark Experience</span></h4>
                  </div>
                  <span class="badge" style="font-size:9.5px;padding:2px 7px;border-radius:6px;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.25)">VERIFIED BLUEPRINT</span>
                </div>

                <!-- Clean, Subdued Metadata Chips -->
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;font-size:11.5px;color:#94a3b8">
                  <span style="background:rgba(255,255,255,0.04);padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.08)"><b style="color:#cbd5e1;font-weight:600">Engine:</b> Unity C# / Godot 4</span>
                  <span style="background:rgba(255,255,255,0.04);padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.08)"><b style="color:#cbd5e1;font-weight:600">Architecture:</b> Zero-GC Structs</span>
                  <span style="background:rgba(255,255,255,0.04);padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.08)"><b style="color:#cbd5e1;font-weight:600">Scope:</b> 32 Modular Steps</span>
                </div>

                <!-- Highly Legible Monospaced Code Box (Non-Neon) -->
                <pre style="background:#020306;border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;font-size:11px;color:#94a3b8;font-family:Consolas, 'SF Mono', Monaco, monospace;margin:0;line-height:1.55"><span style="color:#7dd3fc">[TOME: GAME ENGINE // ARCHITECTURE SYSTEM]</span>
<span style="color:#f1f5f9">Game: "Tome: Awakening"</span>
Fixed 60Hz loop with isolated state structs, stamina combat, and bonfire resets.</pre>
              </div>

            </div>
          </div>\n\n          `;

  html = html.substring(0, builderStart) + simplifiedBuilderHtml + html.substring(builderEnd);
  console.log('Successfully simplified active-project-builder-section');
}

// =========================================================================
// 3. REPLACE HARSH NEON INLINE COLORS WITH REFINED LEGIBLE TONES
// =========================================================================
// Replace electric cyan in titles and borders
html = html.replace(/color:#00f0ff/g, 'color:#38bdf8');
html = html.replace(/border-color:rgba\(0,240,255,/g, 'border-color:rgba(56,189,248,');
html = html.replace(/color:#ffd700/g, 'color:#fbbf24');
html = html.replace(/rgba\(0,188,212,0.3\)/g, 'rgba(56,189,248,0.25)');
html = html.replace(/rgba\(0,188,212,0.5\)/g, 'rgba(56,189,248,0.4)');

// Master prompt title: clean non-neon
html = html.replace(
  'EVER-EVOLVING MASTER AI PROMPT // ZERO-DEBT SPEC',
  'Ever-Evolving Master AI Prompt // Zero-Debt Spec'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully saved app/index.html with legible, non-neon styling');
