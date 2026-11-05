const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// =========================================================================
// 1. DOUBLE THE SIZE OF THE TOME TEXT IN THE HEADER (NOT OVERLAPPING FRAME)
// =========================================================================
// In #top-nav-bar:
// Change padding from padding:10px 18px to padding:4px 18px
// Change book logo from 44px to 68px
// Change tome_header_text.png from height:36px to height:68px
const oldTopMenuBtn = `<div id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:4px 8px;border-radius:10px;transition:all .2s ease;user-select:none">
      <img src="tome_logo_transparent.png" alt="Tome" style="width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 0 12px rgba(103,58,183,0.55));transition:transform .2s ease">
      <img src="tome_header_text.png" alt="Tome: Vibegaming Engine" style="height:36px;width:auto;object-fit:contain;display:block">
    </div>`;

const newTopMenuBtn = `<div id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:14px;cursor:pointer;padding:2px 8px;border-radius:10px;transition:all .2s ease;user-select:none">
      <img src="tome_logo_transparent.png" alt="Tome" style="width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(103,58,183,0.65));transition:transform .2s ease">
      <img src="tome_header_text.png" alt="Tome: Vibegaming Engine" style="height:68px;width:auto;object-fit:contain;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.7))">
    </div>`;

if (html.includes(oldTopMenuBtn)) {
  html = html.replace(oldTopMenuBtn, newTopMenuBtn);
  // Also adjust top-nav-bar padding to 4px 18px
  html = html.replace(
    'id="top-nav-bar" style="max-width:820px;width:100%;margin:12px auto 8px;display:flex;align-items:center;justify-content:space-between;padding:10px 18px;',
    'id="top-nav-bar" style="max-width:820px;width:100%;margin:12px auto 8px;display:flex;align-items:center;justify-content:space-between;padding:4px 18px;'
  );
  console.log('Successfully doubled size of header logo & text, tight fit inside frame');
} else {
  console.log('oldTopMenuBtn not found exactly, searching substring...');
  const idx = html.indexOf('id="top-menu-btn"');
  if (idx !== -1) {
    const endIdx = html.indexOf('</div>', idx) + 6;
    html = html.substring(0, idx - 10) + newTopMenuBtn + html.substring(endIdx);
    html = html.replace(
      'padding:10px 18px;background:linear-gradient',
      'padding:4px 18px;background:linear-gradient'
    );
    console.log('Replaced top-menu-btn via slice');
  }
}

// =========================================================================
// 2. HAVE "TOME" UNDER THE HERO LOGO IN THAT FONT
// =========================================================================
const oldHeroLogoBlock = `<div style="display:flex;justify-content:center;margin-bottom:16px;position:relative">
              <img class="tome-hero-logo" src="tome_logo_transparent.png" alt="Tome: Vibegaming Engine" style="width:175px;height:175px;object-fit:contain;animation:floatTome 4s ease-in-out infinite;image-rendering:pixelated;transition:filter .3s ease">
            </div>`;

const newHeroLogoBlock = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:14px;position:relative">
              <img class="tome-hero-logo" src="tome_logo_transparent.png" alt="Tome" style="width:175px;height:175px;object-fit:contain;animation:floatTome 4s ease-in-out infinite;image-rendering:pixelated;transition:filter .3s ease">
              <img src="tome_hero_text.png" alt="Tome" style="width:145px;height:auto;object-fit:contain;margin-top:4px;filter:drop-shadow(0 4px 14px rgba(0,0,0,0.85));display:block">
            </div>`;

if (html.includes(oldHeroLogoBlock)) {
  html = html.replace(oldHeroLogoBlock, newHeroLogoBlock);
  console.log('Successfully placed "Tome" in custom font under the hero logo');
} else {
  console.log('oldHeroLogoBlock exact match not found, checking class="tome-hero-logo"');
  const heroIdx = html.indexOf('class="tome-hero-logo"');
  if (heroIdx !== -1) {
    const parentDivStart = html.lastIndexOf('<div', heroIdx);
    const parentDivEnd = html.indexOf('</div>', heroIdx) + 6;
    html = html.substring(0, parentDivStart) + newHeroLogoBlock + html.substring(parentDivEnd);
    console.log('Replaced hero logo block via parent search');
  }
}

// =========================================================================
// 3. OPEN-SOURCE GAME STUDIO WIDGET SUITE (JSFXR, LOSPEC, TILED, BLUEPRINTS)
// =========================================================================
// Insert right below the 2D/3D Viewports section and before the builder section
const widgetSuiteHtml = `
          <!-- ==================== OPEN-SOURCE STUDIO WIDGET SUITE (jsfxr, Lospec, Tiled, Blueprints) ==================== -->
          <div id="studio-widget-suite" style="max-width:760px;margin:18px auto 20px;background:rgba(8,12,18,0.95);border:1.5px solid rgba(56,189,248,0.3);border-radius:14px;padding:16px 18px;box-shadow:0 12px 36px rgba(0,0,0,0.7)">
            
            <!-- Widget Suite Navigation Tabs -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;flex-wrap:wrap;gap:8px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:16px">🛠️</span>
                <div>
                  <div style="font-size:12px;font-weight:800;color:#38bdf8;letter-spacing:.06em">OPEN-SOURCE GAME DEV TOOLCHEST</div>
                  <div style="font-size:10px;color:#94a3b8">Community-standard widgets for sound synthesis, palettes, tiles, and architecture</div>
                </div>
              </div>
              <div id="widget-tabs" style="display:flex;gap:4px;flex-wrap:wrap">
                <button class="w-tab on" data-target="widget-jsfxr" style="padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:700;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer">🔊 JSFXR AUDIO</button>
                <button class="w-tab" data-target="widget-lospec" style="padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:700;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">🎨 LOSPEC PALETTE</button>
                <button class="w-tab" data-target="widget-tiled" style="padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:700;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">🗺️ TILED SLICER</button>
                <button class="w-tab" data-target="widget-pipeline" style="padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:700;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">⚡ BLUEPRINT NODES</button>
              </div>
            </div>

            <!-- WIDGET 1: jsfxr Procedural Web Audio Synthesizer -->
            <div id="widget-jsfxr" class="widget-panel" style="display:block">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc">
                  8-Bit / 16-Bit Procedural SFX Generator <span style="font-size:10px;color:#94a3b8;font-weight:400">(jsfxr Web Audio engine)</span>
                </div>
                <div id="sfx-status" style="font-size:10px;color:#38bdf8;font-family:Consolas,monospace">READY (Web Audio)</div>
              </div>

              <!-- Quick Presets -->
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
                <button class="sfx-preset-btn" data-type="coin" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(251,191,36,0.15);color:#fbbf24;border:1px solid rgba(251,191,36,0.4);cursor:pointer">🪙 Coin Pickup</button>
                <button class="sfx-preset-btn" data-type="laser" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.4);cursor:pointer">⚡ Laser / Shoot</button>
                <button class="sfx-preset-btn" data-type="explosion" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.4);cursor:pointer">💥 Explosion</button>
                <button class="sfx-preset-btn" data-type="powerup" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.4);cursor:pointer">⭐ Powerup</button>
                <button class="sfx-preset-btn" data-type="hit" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(244,63,94,0.15);color:#fb7185;border:1px solid rgba(244,63,94,0.4);cursor:pointer">⚔️ Hit / Hurt</button>
                <button class="sfx-preset-btn" data-type="jump" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.4);cursor:pointer">🦘 Jump</button>
                <button class="sfx-preset-btn" data-type="select" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:600;background:rgba(255,255,255,0.08);color:#cbd5e1;border:1px solid rgba(255,255,255,0.2);cursor:pointer">🔘 Menu Select</button>
                <button class="sfx-preset-btn" data-type="random" style="padding:5px 11px;border-radius:6px;font-size:10.5px;font-weight:700;background:rgba(251,191,36,0.25);color:#fef08a;border:1px solid rgba(251,191,36,0.6);cursor:pointer">🎲 Randomize</button>
              </div>

              <!-- Controls Bar -->
              <div style="display:flex;align-items:center;gap:12px;background:rgba(0,0,0,0.3);padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:10px;color:#94a3b8;font-weight:600">WAVE:</span>
                  <select id="sfx-wave-type" style="background:#090d14;border:1px solid rgba(255,255,255,0.2);color:#38bdf8;font-size:10.5px;padding:3px 6px;border-radius:4px">
                    <option value="square">Square (NES / GB)</option>
                    <option value="sawtooth">Sawtooth (Arcade)</option>
                    <option value="sine">Sine (Soft Melody)</option>
                    <option value="noise">Noise (Explosion / Hit)</option>
                  </select>
                </div>

                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:10px;color:#94a3b8;font-weight:600">PITCH:</span>
                  <input type="range" id="sfx-pitch-slider" min="120" max="1200" value="440" style="width:90px;cursor:pointer">
                </div>

                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:10px;color:#94a3b8;font-weight:600">DURATION:</span>
                  <input type="range" id="sfx-decay-slider" min="0.05" max="0.8" step="0.05" value="0.25" style="width:80px;cursor:pointer">
                </div>

                <button id="sfx-btn-play" style="padding:4px 12px;background:rgba(56,189,248,0.25);border:1px solid rgba(56,189,248,0.5);color:#38bdf8;border-radius:6px;font-size:10.5px;font-weight:700;cursor:pointer;margin-left:auto">▶ Play Sound</button>
                <button id="sfx-btn-copy-code" style="padding:4px 10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;border-radius:6px;font-size:10px;font-weight:600;cursor:pointer">📋 Copy Code</button>
              </div>
            </div>

            <!-- WIDGET 2: Lospec Retro Palette Studio -->
            <div id="widget-lospec" class="widget-panel" style="display:none">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc">
                  Lospec Color Ramp Studio <span style="font-size:10px;color:#94a3b8;font-weight:400">— Click swatch to copy hex code</span>
                </div>
                <div id="palette-selected-hex" style="font-size:10px;color:#fbbf24;font-family:Consolas,monospace">#HEX: None</div>
              </div>

              <!-- Palette Selector -->
              <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
                <button class="pal-btn on" data-pal="pico8" style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer">PICO-8 (16)</button>
                <button class="pal-btn" data-pal="gameboy" style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">Game Boy DMG (4)</button>
                <button class="pal-btn" data-pal="cyberpunk" style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">Cyberpunk Neon (8)</button>
                <button class="pal-btn" data-pal="darkfantasy" style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">Dark Fantasy (8)</button>
                <button class="pal-btn" data-pal="cozypastoral" style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.12);cursor:pointer">Cozy Pastoral (8)</button>
              </div>

              <!-- Swatch Strip -->
              <div id="palette-swatches-strip" style="display:flex;height:38px;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);box-shadow:inset 0 2px 6px rgba(0,0,0,0.5)">
                <!-- Filled via JS -->
              </div>
            </div>

            <!-- WIDGET 3: Tiled / LDtk Spritesheet Slicer & Inspector -->
            <div id="widget-tiled" class="widget-panel" style="display:none">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc">
                  Tiled / LDtk Grid Slicer &amp; Frame Inspector
                </div>
                <div id="tiled-coord-badge" style="font-size:10px;color:#34d399;font-family:Consolas,monospace">GRID: 16x16 · TILE [X:0, Y:0]</div>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.3);padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);flex-wrap:wrap;gap:8px">
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:10px;color:#94a3b8;font-weight:600">GRID SIZE:</span>
                  <button class="tile-grid-btn on" data-size="16" style="padding:3px 8px;background:rgba(52,211,153,0.25);border:1px solid rgba(52,211,153,0.5);color:#34d399;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer">16x16</button>
                  <button class="tile-grid-btn" data-size="24" style="padding:3px 8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;border-radius:4px;font-size:10px;font-weight:600;cursor:pointer">24x24</button>
                  <button class="tile-grid-btn" data-size="32" style="padding:3px 8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;border-radius:4px;font-size:10px;font-weight:600;cursor:pointer">32x32</button>
                </div>

                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:10px;color:#94a3b8;font-weight:600">ANIM SPEED:</span>
                  <button class="tile-speed-btn" data-speed="0.5" style="padding:3px 6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;border-radius:4px;font-size:10px;cursor:pointer">0.5x</button>
                  <button class="tile-speed-btn on" data-speed="1.0" style="padding:3px 6px;background:rgba(56,189,248,0.25);border:1px solid rgba(56,189,248,0.5);color:#38bdf8;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer">1.0x</button>
                  <button class="tile-speed-btn" data-speed="2.0" style="padding:3px 6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;border-radius:4px;font-size:10px;cursor:pointer">2.0x</button>
                </div>

                <button id="tiled-btn-export-spec" style="padding:4px 10px;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.4);color:#34d399;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer">📋 Copy TileSet Spec</button>
              </div>
            </div>

            <!-- WIDGET 4: Blueprint Architecture Node Graph -->
            <div id="widget-pipeline" class="widget-panel" style="display:none">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc">
                  Architecture Pipeline Graph <span style="font-size:10px;color:#94a3b8;font-weight:400">(LiteGraph Reactive Dataflow)</span>
                </div>
                <div style="font-size:10px;color:#c084fc;font-family:Consolas,monospace">5 STAGES CONNECTED</div>
              </div>

              <!-- Node Chain Flow -->
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px">
                <div class="pipe-node" style="background:rgba(56,189,248,0.12);border:1.5px solid rgba(56,189,248,0.4);border-radius:8px;padding:8px 10px;text-align:center">
                  <div style="font-size:9px;font-weight:700;color:#38bdf8;text-transform:uppercase">1. Prompt Input</div>
                  <div style="font-size:11px;font-weight:700;color:#ffffff;margin:2px 0">User Concept</div>
                  <div style="font-size:9.5px;color:#94a3b8">Active Signal ●</div>
                </div>

                <div class="pipe-node" style="background:rgba(168,85,247,0.12);border:1.5px solid rgba(168,85,247,0.4);border-radius:8px;padding:8px 10px;text-align:center">
                  <div style="font-size:9px;font-weight:700;color:#c084fc;text-transform:uppercase">2. Compiler</div>
                  <div style="font-size:11px;font-weight:700;color:#ffffff;margin:2px 0">32-Step Blueprint</div>
                  <div style="font-size:9.5px;color:#94a3b8">Zero-GC Rules ●</div>
                </div>

                <div class="pipe-node" style="background:rgba(244,63,94,0.12);border:1.5px solid rgba(244,63,94,0.4);border-radius:8px;padding:8px 10px;text-align:center">
                  <div style="font-size:9px;font-weight:700;color:#fb7185;text-transform:uppercase">3. Art Viewports</div>
                  <div style="font-size:11px;font-weight:700;color:#ffffff;margin:2px 0">3D GLB &amp; 2D GIF</div>
                  <div style="font-size:9.5px;color:#94a3b8">Live Sync ●</div>
                </div>

                <div class="pipe-node" style="background:rgba(251,191,36,0.12);border:1.5px solid rgba(251,191,36,0.4);border-radius:8px;padding:8px 10px;text-align:center">
                  <div style="font-size:9px;font-weight:700;color:#fbbf24;text-transform:uppercase">4. Engine Target</div>
                  <div id="pipe-node-engine" style="font-size:11px;font-weight:700;color:#ffffff;margin:2px 0">Unity / Godot</div>
                  <div style="font-size:9.5px;color:#94a3b8">Calibrated ●</div>
                </div>

                <div class="pipe-node" style="background:rgba(52,211,153,0.12);border:1.5px solid rgba(52,211,153,0.4);border-radius:8px;padding:8px 10px;text-align:center">
                  <div style="font-size:9px;font-weight:700;color:#34d399;text-transform:uppercase">5. Release</div>
                  <div style="font-size:11px;font-weight:700;color:#ffffff;margin:2px 0">ZIP / Native EXE</div>
                  <div style="font-size:9.5px;color:#94a3b8">Ready ●</div>
                </div>
              </div>
            </div>

          </div>
`;

if (!html.includes('id="studio-widget-suite"')) {
  // Find where viewports end:
  const viewportsEnd = html.indexOf('<!-- ==================== CURRENT SELECTED PROJECT ARCHITECTURE BUILDER');
  if (viewportsEnd !== -1) {
    html = html.substring(0, viewportsEnd) + widgetSuiteHtml + '\n' + html.substring(viewportsEnd);
    console.log('Inserted open-source studio widget suite HTML');
  } else {
    // Fallback: before active-project-builder-section
    const builderIdx = html.indexOf('id="active-project-builder-section"');
    if (builderIdx !== -1) {
      const parentStart = html.lastIndexOf('<div', builderIdx);
      html = html.substring(0, parentStart) + widgetSuiteHtml + '\n' + html.substring(parentStart);
      console.log('Inserted widget suite before builder section');
    }
  }
}

// Clean up the typo on active-project-builder-section if present
html = html.replace(
  '<span id="pj-builder-prompt-snippet" style="display:none">Prompt</span> style="max-width:760px;margin:0 auto 20px;background:rgba(10,14,22,0.9);border:1px solid rgba(255,215,0,0.3);border-radius:14px;padding:16px 18px;box-shadow:0 12px 32px rgba(0,0,0,0.5)">',
  '<span id="pj-builder-prompt-snippet" style="display:none">Prompt</span>\n            <div style="max-width:760px;margin:0 auto 20px;background:rgba(10,14,22,0.9);border:1px solid rgba(255,215,0,0.3);border-radius:14px;padding:16px 18px;box-shadow:0 12px 32px rgba(0,0,0,0.5)">'
);

// =========================================================================
// 4. JAVASCRIPT ENGINE FOR THE OPEN-SOURCE WIDGETS
// =========================================================================
const widgetsJsLogic = `
  // --- Open-Source Game Dev Widget Suite Controller ---
  (function initStudioWidgetSuite() {
    // 1. Tab Switching
    const tabs = document.querySelectorAll('#widget-tabs .w-tab');
    const panels = document.querySelectorAll('#studio-widget-suite .widget-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('on');
          t.style.background = 'rgba(255,255,255,0.05)';
          t.style.color = '#94a3b8';
          t.style.borderColor = 'rgba(255,255,255,0.12)';
        });
        panels.forEach(p => p.style.display = 'none');

        tab.classList.add('on');
        tab.style.background = 'rgba(56,189,248,0.25)';
        tab.style.color = '#38bdf8';
        tab.style.borderColor = 'rgba(56,189,248,0.5)';

        const targetId = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.style.display = 'block';
      });
    });

    // 2. jsfxr Web Audio Synthesizer
    let audioCtx = null;
    function getAudioCtx() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioCtx;
    }

    function playSyntheticSfx(type) {
      try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        const waveType = document.getElementById('sfx-wave-type').value || 'square';
        const basePitch = parseFloat(document.getElementById('sfx-pitch-slider').value) || 440;
        const decayTime = parseFloat(document.getElementById('sfx-decay-slider').value) || 0.25;

        osc.type = waveType;

        if (type === 'coin') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(basePitch, now);
          osc.frequency.exponentialRampToValueAtTime(basePitch * 1.6, now + decayTime);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);
        } else if (type === 'laser') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(basePitch * 2.2, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + decayTime);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);
        } else if (type === 'explosion') {
          // Low frequency rumble or noise
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.linearRampToValueAtTime(30, now + decayTime * 1.5);
          gain.gain.setValueAtTime(0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 1.5);
        } else if (type === 'powerup') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(basePitch * 0.7, now);
          osc.frequency.linearRampToValueAtTime(basePitch * 1.8, now + decayTime);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);
        } else if (type === 'hit') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(basePitch * 0.9, now);
          osc.frequency.linearRampToValueAtTime(60, now + decayTime * 0.8);
          gain.gain.setValueAtTime(0.45, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 0.8);
        } else if (type === 'jump') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(basePitch * 0.6, now);
          osc.frequency.exponentialRampToValueAtTime(basePitch * 1.4, now + decayTime * 0.9);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 0.9);
        } else if (type === 'select') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(basePitch * 1.2, now);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        } else {
          // Random
          const randomPitch = 120 + Math.random() * 900;
          osc.frequency.setValueAtTime(randomPitch, now);
          osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 800, now + decayTime);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);
        }

        osc.start(now);
        osc.stop(now + decayTime + 0.1);

        const statusEl = document.getElementById('sfx-status');
        if (statusEl) statusEl.textContent = 'PLAYING: ' + type.toUpperCase();
        setTimeout(() => {
          if (statusEl) statusEl.textContent = 'READY (Web Audio)';
        }, (decayTime + 0.1) * 1000);
      } catch (err) {
        console.warn('Audio playback error:', err);
      }
    }

    // Hook preset buttons
    const presetBtns = document.querySelectorAll('.sfx-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        playSyntheticSfx(type);
      });
    });

    const btnPlay = document.getElementById('sfx-btn-play');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        playSyntheticSfx('laser');
      });
    }

    const btnCopyCode = document.getElementById('sfx-btn-copy-code');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', () => {
        const code = \`// jsfxr Web Audio SFX snippet\\nfunction playSfx(pitch, decay) {\\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\\n  const osc = ctx.createOscillator();\\n  const g = ctx.createGain();\\n  osc.connect(g); g.connect(ctx.destination);\\n  osc.frequency.setValueAtTime(pitch || 440, ctx.currentTime);\\n  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + (decay || 0.25));\\n  g.gain.setValueAtTime(0.3, ctx.currentTime);\\n  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (decay || 0.25));\\n  osc.start(); osc.stop(ctx.currentTime + (decay || 0.25));\\n}\`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            btnCopyCode.textContent = '✓ Copied!';
            setTimeout(() => { btnCopyCode.textContent = '📋 Copy Code'; }, 1500);
          });
        }
      });
    }

    // 3. Lospec Palette Swatches
    const PALETTES = {
      pico8: ['#000000', '#1D2B53', '#7E2553', '#008751', '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8', '#FF004D', '#FFA300', '#FFEC27', '#00E436', '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA'],
      gameboy: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
      cyberpunk: ['#050811', '#00f0ff', '#ff003c', '#fcee0a', '#711c91', '#133e7c', '#0abdc6', '#ea00d9'],
      darkfantasy: ['#0a0808', '#2b1b17', '#5c3a21', '#8b5a2b', '#c49a45', '#871a1a', '#4a1515', '#e0d8b0'],
      cozypastoral: ['#1c2826', '#3b5249', '#519872', '#a4b494', '#bec5ad', '#f4d06f', '#ff9f1c', '#e76f51']
    };

    const stripEl = document.getElementById('palette-swatches-strip');
    const hexBadge = document.getElementById('palette-selected-hex');

    function renderPalette(palKey) {
      if (!stripEl) return;
      const colors = PALETTES[palKey] || PALETTES.pico8;
      stripEl.innerHTML = '';
      colors.forEach(hex => {
        const swatch = document.createElement('div');
        swatch.style.flex = '1';
        swatch.style.background = hex;
        swatch.style.cursor = 'pointer';
        swatch.style.transition = 'transform .1s ease';
        swatch.title = 'Click to copy ' + hex;

        swatch.addEventListener('mouseenter', () => {
          swatch.style.transform = 'scaleY(1.15)';
          if (hexBadge) hexBadge.textContent = '#HEX: ' + hex;
        });
        swatch.addEventListener('mouseleave', () => {
          swatch.style.transform = 'scaleY(1.0)';
        });
        swatch.addEventListener('click', () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(hex);
            if (hexBadge) hexBadge.textContent = 'COPIED: ' + hex;
          }
        });
        stripEl.appendChild(swatch);
      });
    }

    const palBtns = document.querySelectorAll('.pal-btn');
    palBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        palBtns.forEach(b => {
          b.classList.remove('on');
          b.style.background = 'rgba(255,255,255,0.05)';
          b.style.color = '#94a3b8';
          b.style.borderColor = 'rgba(255,255,255,0.12)';
        });
        btn.classList.add('on');
        btn.style.background = 'rgba(56,189,248,0.2)';
        btn.style.color = '#38bdf8';
        btn.style.borderColor = 'rgba(56,189,248,0.5)';

        const pal = btn.getAttribute('data-pal');
        renderPalette(pal);
      });
    });

    renderPalette('pico8');

    // 4. Tiled / LDtk Slicer
    const gridBtns = document.querySelectorAll('.tile-grid-btn');
    const coordBadge = document.getElementById('tiled-coord-badge');
    gridBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        gridBtns.forEach(b => {
          b.classList.remove('on');
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.color = '#cbd5e1';
          b.style.borderColor = 'rgba(255,255,255,0.15)';
        });
        btn.classList.add('on');
        btn.style.background = 'rgba(52,211,153,0.25)';
        btn.style.color = '#34d399';
        btn.style.borderColor = 'rgba(52,211,153,0.5)';
        const size = btn.getAttribute('data-size');
        if (coordBadge) coordBadge.textContent = 'GRID: ' + size + 'x' + size + ' · TILE [X:0, Y:0]';
      });
    });

    const exportSpecBtn = document.getElementById('tiled-btn-export-spec');
    if (exportSpecBtn) {
      exportSpecBtn.addEventListener('click', () => {
        const spec = \`{\\n  "tileset": "crimson_wanderer_sheet.png",\\n  "tileSize": 16,\\n  "columns": 8,\\n  "rows": 4,\\n  "animations": {\\n    "walk": [0, 1, 2, 3, 4, 5, 6, 7],\\n    "attack": [8, 9, 10, 11],\\n    "cast": [12, 13, 14, 15]\\n  }\\n}\`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(spec).then(() => {
            exportSpecBtn.textContent = '✓ Copied Spec!';
            setTimeout(() => { exportSpecBtn.textContent = '📋 Copy TileSet Spec'; }, 1500);
          });
        }
      });
    }

    // 5. Blueprint Pipeline Nodes Real-Time Sync
    if (typeof state !== 'undefined') {
      const pipeNodeEngine = document.getElementById('pipe-node-engine');
      if (pipeNodeEngine && state.engine) {
        pipeNodeEngine.textContent = state.engine.split('(')[0].trim();
      }
    }
  })();
`;

if (!html.includes('initStudioWidgetSuite')) {
  const scriptEndIdx = html.lastIndexOf('</script>');
  if (scriptEndIdx !== -1) {
    html = html.substring(0, scriptEndIdx) + '\n' + widgetsJsLogic + '\n' + html.substring(scriptEndIdx);
    console.log('Inserted JS controller for open-source widget suite');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated app/index.html with all features!');
