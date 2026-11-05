// scripts/apply-viewports-and-builder-layout.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Fix CSS: remove 'fill' from border-image-slice so vines do not glitch into background
html = html.replace(
  /border-image-slice:\s*36\s*fill\s*!important;/g,
  'border-image-slice: 36 !important;'
);

// Ensure background of #pj-explainer is explicitly solid gunmetal slate gradient
const cssHardening = `
  /* Hardened clean solid gunmetal slate card background (zero glitch) */
  #pj-explainer, .window-vine-frame {
    background: linear-gradient(180deg, rgba(22, 28, 38, 0.96) 0%, rgba(13, 17, 24, 0.98) 100%) !important;
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 36 !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    border-image-outset: 2px !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 25px rgba(74, 222, 128, 0.1) !important;
  }
`;

if (!html.includes('border-image-slice: 36 !important;')) {
  html = html.replace('</style>', cssHardening + '\n</style>');
} else {
  // Update existing block
  html = html.replace(/border-image-slice:\s*36\s*fill/g, 'border-image-slice: 36');
}

// 2. Build the new consolidated middle section of #pj-explainer
// Replace everything between #zen-drop-zone and #insp-board-container
const startTarget = '<!-- ==================== 2. BALANCED SHOWCASE';
const endTarget = '<!-- ==================== 3. INSPIRATION VAULT';

const sIdx = html.indexOf(startTarget);
const eIdx = html.indexOf(endTarget);

if (sIdx !== -1 && eIdx !== -1) {
  const replacement = `<!-- ==================== 2. BIG LIVE VIEWPORTS ROW (3D Model & Pixel Sprite on their own dedicated row) ==================== -->
          <div id="viewports-dedicated-row" style="max-width:760px;margin:0 auto 20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px">🔮</span>
                <span style="font-size:13px;font-weight:800;color:#00f0ff;letter-spacing:.05em;text-transform:uppercase">LIVE INTERACTIVE VIEWPORTS</span>
                <span class="badge ok" style="font-size:9.5px;padding:2px 7px">60 FPS RENDERER</span>
              </div>
              <span style="font-size:11px;color:#94a3b8">Real-time Shaders &amp; Pixel Art</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              
              <!-- Big 3D Model Viewport Card -->
              <div class="studio-viewport-card" style="padding:14px;background:rgba(8,12,18,0.95);border:1px solid rgba(0,188,212,0.3);border-radius:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="font-size:13px">🪨</span>
                    <span style="font-size:12px;font-weight:700;color:#00f0ff;letter-spacing:.04em">3D MESH VIEWPORT</span>
                  </div>
                  <div style="display:flex;gap:4px">
                    <button id="btn-3d-wire" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer">WIRE</button>
                    <button id="btn-3d-mesh" style="background:rgba(0,188,212,0.2);border:1px solid rgba(0,188,212,0.5);color:#00f0ff;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer">MESH</button>
                  </div>
                </div>

                <div style="position:relative;width:100%;height:190px;background:#030508;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);cursor:grab" id="three-canvas-wrap">
                  <canvas id="three-model-canvas" width="360" height="190" style="width:100%;height:100%;display:block"></canvas>
                  <div style="position:absolute;bottom:8px;left:10px;font-size:10px;color:rgba(255,255,255,0.45);pointer-events:none;font-family:Consolas,monospace">DRAG TO ORBIT IN 3D</div>
                </div>

                <div style="font-size:11px;color:#94a3b8;margin-top:6px;line-height:1.3">
                  <b style="color:#ffffff">Low-Poly Stylized Rock Set #1</b> // Real-time directional lighting, face normals &amp; ambient occlusion.
                </div>
              </div>

              <!-- Big 16-Bit Animated Pixel Sprite Card -->
              <div class="studio-viewport-card" style="padding:14px;background:rgba(8,12,18,0.95);border:1px solid rgba(233,30,99,0.3);border-radius:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="font-size:13px">👾</span>
                    <span style="font-size:12px;font-weight:700;color:#f43f5e;letter-spacing:.04em">16-BIT SPRITE ENGINE</span>
                  </div>
                  <div style="display:flex;gap:4px">
                    <button id="btn-anim-walk" style="background:rgba(244,63,94,0.25);border:1px solid rgba(244,63,94,0.6);color:#f43f5e;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer">WALK</button>
                    <button id="btn-anim-attack" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer">ATTACK</button>
                    <button id="btn-anim-cast" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer">CAST</button>
                  </div>
                </div>

                <div style="position:relative;width:100%;height:190px;background:#030508;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center" id="sprite-canvas-wrap">
                  <canvas id="pixel-sprite-canvas" width="240" height="190" style="image-rendering:pixelated;image-rendering:crisp-edges;display:block"></canvas>
                  <div id="sprite-frame-counter" style="position:absolute;top:8px;right:10px;font-size:10px;color:#94a3b8;font-family:Consolas,monospace">FRAME: 1/8</div>
                </div>

                <div style="font-size:11px;color:#94a3b8;margin-top:6px;line-height:1.3">
                  <b style="color:#ffffff">Crimson Wanderer Sprite</b> // 8-frame walk/combat cycle at 12fps, pixel-perfect integer scale.
                </div>
              </div>

            </div>
          </div>

          <!-- ==================== CURRENT SELECTED PROJECT ARCHITECTURE BUILDER (Builds below 3D & 2D viewports) ==================== -->
          <div id="active-project-builder-section" style="max-width:760px;margin:0 auto 20px;background:rgba(10,14,22,0.9);border:1px solid rgba(255,215,0,0.3);border-radius:14px;padding:16px 18px;box-shadow:0 12px 32px rgba(0,0,0,0.5)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:16px">👑</span>
                <span style="font-size:13px;font-weight:800;color:#ffd700;letter-spacing:.04em;text-transform:uppercase">CURRENT SELECTED PROJECT ARCHITECTURE</span>
                <span class="badge ok" style="font-size:10px;padding:2px 7px">ACTIVE BLUEPRINT</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <button class="btn gold" id="pj-builder-copy-btn" style="padding:5px 12px;font-size:11px;font-weight:600">📋 Copy Project Prompt</button>
                <button class="btn" id="pj-builder-work-btn" style="padding:5px 12px;font-size:11px;color:var(--cyan);border-color:rgba(0,240,255,0.4)">⚡ Work on Project</button>
              </div>
            </div>

            <!-- Project Details Card (Tome: Awakening Preset / Current Game) -->
            <div style="display:grid;grid-template-columns:180px 1fr;gap:16px;align-items:center;background:#05070b;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px">
              <div style="position:relative;border-radius:8px;overflow:hidden;background:#0a0e17;height:105px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)">
                <img src="preset_pyramid.png" alt="Tome: Awakening" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:cover">
                <div style="position:absolute;top:6px;left:6px;font-size:9px;background:rgba(0,0,0,0.7);padding:2px 6px;border-radius:4px;color:#ffd700;font-weight:700">PRESET</div>
              </div>

              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <h4 id="builder-proj-name" style="font-size:14px;font-weight:800;color:#ffffff;margin:0">Tome: Awakening (Preset)</h4>
                  <span class="badge ok" style="font-size:9.5px;padding:1px 6px">VERIFIED BLUEPRINT</span>
                </div>
                <div style="font-size:11px;color:#cbd5e1;line-height:1.4;margin-bottom:8px">
                  <b style="color:var(--cyan)">Target Engine:</b> Unity C# / Godot 4 &bull; <b style="color:var(--gold)">Rules:</b> Ponytail Strict (Zero-GC) &bull; <b style="color:#4ade80">Scope:</b> 32 Modular Steps
                </div>
                <pre style="background:#020407;border:1px solid rgba(56,189,248,0.25);border-radius:6px;padding:8px 10px;font-size:10px;color:#38bdf8;font-family:Consolas,monospace;margin:0;line-height:1.4">[TOME: GAME ENGINE // ARCHITECTURE SYSTEM]
Game: "Tome: Awakening"
Fixed 60Hz loop with isolated state structs, stamina combat, and bonfire resets.</pre>
              </div>
            </div>

            <!-- Hidden compatibility hooks for projects list & creation -->
            <div id="pj-section-inner" style="display:none">
              <div class="pjgrid" id="pj-grid"></div>
              <button class="btn" id="pj-new"></button>
            </div>
          </div>

          `;

  html = html.slice(0, sIdx) + replacement + html.slice(eIdx);
  console.log('Replaced viewports row and added active project builder section');
} else {
  console.error('Could not find markers: sIdx =', sIdx, ', eIdx =', eIdx);
}

// 3. Update the 3D and 2D canvas dimensions in the JS renderer loops to fit the bigger canvases
// In three-model-canvas: canvas is 360x190
// In pixel-sprite-canvas: canvas is 240x190
const old3dCenter = 'const px = 140 + x1 * fov * scale;\n      const py = 74 - y2 * fov * scale;';
const new3dCenter = 'const px = (canvas.width / 2) + x1 * fov * scale;\n      const py = (canvas.height / 2) - y2 * fov * scale;';
if (html.includes(old3dCenter)) {
  html = html.replace(old3dCenter, new3dCenter);
  html = html.replace('const scale = 54;', 'const scale = 72;');
  html = html.replace('ctx.ellipse(140, 115, 65, 18', 'ctx.ellipse(canvas.width / 2, 160, 85, 22');
  console.log('Updated 3D canvas dimensions for bigger viewport');
}

const oldSpriteScale = 'const pSize = 5; // 5x scale => 80x80px character\n    const ox = 40;\n    const oy = 22';
const newSpriteScale = 'const pSize = 7; // 7x scale => 112x112px character\n    const ox = Math.round((canvas.width - 16 * pSize) / 2);\n    const oy = 28';
if (html.includes(oldSpriteScale)) {
  html = html.replace(oldSpriteScale, newSpriteScale);
  html = html.replace('ctx.ellipse(80, 122, 34, 9', 'ctx.ellipse(canvas.width / 2, 168, 48, 12');
  console.log('Updated pixel sprite scale for bigger viewport');
}

// 4. Hook up pj-builder-copy-btn and pj-builder-work-btn
const builderBtnLogic = `
  const bCopy = $('pj-builder-copy-btn');
  if (bCopy) {
    bCopy.onclick = () => {
      const promptText = '[TOME: GAME ENGINE // ARCHITECTURE SYSTEM]\\nGame: "Tome: Awakening"\\nFixed 60Hz loop with isolated state structs, stamina combat, and bonfire resets.';
      navigator.clipboard.writeText(promptText);
      toast('COPIED CURRENT PROJECT PROMPT!');
    };
  }
  const bWork = $('pj-builder-work-btn');
  if (bWork) {
    bWork.onclick = () => {
      showTab('chat');
      toast('LOADED PROJECT IN ARCHITECTURE AGENT');
    };
  }
`;

if (!html.includes('pj-builder-copy-btn')) {
  const lastScript = html.lastIndexOf('</script>');
  html = html.slice(0, lastScript) + '\n' + builderBtnLogic + '\n' + html.slice(lastScript);
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully written to app/index.html');
