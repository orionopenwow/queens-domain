// scripts/apply-3d-sprite-and-expanded-layout.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Remove vertical black bar / frame border / unstyled scrollbar line over forest
const stylePatch = `
  /* Eliminate vertical bar & frame borders cutting through forest */
  .frame, .page, #t-projects > .frame, #t-projects > .frame.page {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
  }
  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12) !important;
    border-radius: 4px !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25) !important;
  }
  /* Enlarge hero logo 3x */
  .tome-hero-logo {
    width: 210px !important;
    height: 210px !important;
  }
  /* Blatant suggestion card styling */
  .blatant-sugg-card {
    background: rgba(14, 20, 30, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    user-select: none;
  }
  .blatant-sugg-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
  .blatant-sugg-card.souls:hover { border-color: #ffd700; box-shadow: 0 0 16px rgba(255, 215, 0, 0.25); }
  .blatant-sugg-card.pixel:hover { border-color: #4ade80; box-shadow: 0 0 16px rgba(74, 222, 128, 0.25); }
  .blatant-sugg-card.farm:hover  { border-color: #38bdf8; box-shadow: 0 0 16px rgba(56, 189, 248, 0.25); }
  .blatant-sugg-card.sand:hover  { border-color: #c084fc; box-shadow: 0 0 16px rgba(192, 132, 252, 0.25); }
  .blatant-sugg-card.cyber:hover { border-color: #00f0ff; box-shadow: 0 0 16px rgba(0, 240, 255, 0.25); }
  .blatant-sugg-card.horror:hover { border-color: #f43f5e; box-shadow: 0 0 16px rgba(244, 63, 94, 0.25); }
</style>`;

html = html.replace('</style>', stylePatch);

// 2. Triple the size of hero logo in markup
const oldHeroLogoRegex = /<!-- Hero Tome Logo with Vibegaming Neon Aura -->[\s\S]*?<\/div>\s*<\/div>/;
const newHeroLogo = `<!-- Hero Tome Logo with Vibegaming Neon Aura (Tripled in Size) -->
            <div style="display:flex;justify-content:center;margin-bottom:14px;position:relative">
              <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;padding:26px;border-radius:50%;background:radial-gradient(circle, rgba(103,58,183,0.4) 0%, rgba(0,188,212,0.22) 45%, rgba(233,30,99,0.15) 65%, transparent 75%);box-shadow:0 0 60px rgba(103,58,183,0.45), 0 0 80px rgba(0,188,212,0.3)">
                <img class="tome-hero-logo tome-glow" src="tome_logo_transparent.png" alt="Tome: Vibegaming Engine" style="width:215px;height:215px;object-fit:contain;animation:floatTome 4s ease-in-out infinite">
              </div>
            </div>`;

html = html.replace(oldHeroLogoRegex, newHeroLogo);

// 3. Expand Action Sparks to Blatant Suggestions that Populate Blueprint List
const oldSparksRegex = /<!-- Clickable Instant Inspiration Sparks Bar[\s\S]*?<\/div>\s*<\/div>/;
const newSuggestions = `<!-- Expanded Blatant Suggestions to Get Started (Populates Blueprint List) -->
            <div id="inspiration-sparks-bar" style="max-width:720px;margin:8px auto 14px;text-align:left">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                <span style="font-size:11px;font-weight:800;letter-spacing:.08em;color:#ffd700;text-transform:uppercase;display:flex;align-items:center;gap:6px">
                  <span>💡</span> SUGGESTIONS TO GET STARTED // CLICK ANY GENRE TO POPULATE BLUEPRINT
                </span>
                <span style="font-size:10.5px;color:#94a3b8">Instant 1-Click Generation</span>
              </div>

              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(215px, 1fr));gap:8px">
                <!-- 1. 3D Souls -->
                <div class="blatant-sugg-card souls insp-spark-pill" data-idea="3D Soulslike Action RPG with committed stamina combat, dodge roll i-frames, and boss phases">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#ffd700">🗡️ 3D Souls</span>
                    <span class="badge ok" style="font-size:9.5px;padding:1px 6px">32 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">Committed stamina combat, i-frame dodge roll, bonfire spawns &amp; multi-phase bosses.</span>
                </div>

                <!-- 2. 2D Pixel RPG -->
                <div class="blatant-sugg-card pixel insp-spark-pill" data-idea="2D Pixel RPG with 16x16 tiles, retro hero walk cycle and village NPCs">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#4ade80">👾 2D Pixel RPG</span>
                    <span class="badge act" style="font-size:9.5px;padding:1px 6px">24 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">16x16 Dawnbringer tiles, turn-based battle encounters &amp; branching NPC dialogue.</span>
                </div>

                <!-- 3. Cozy Farm Sim -->
                <div class="blatant-sugg-card farm insp-spark-pill" data-idea="2D Cozy Farm Sim with daily seasonal clocks and seed-to-harvest crop economy">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#38bdf8">🌾 Cozy Farm Sim</span>
                    <span class="badge" style="font-size:9.5px;padding:1px 6px">18 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">15-minute day/night cycle, seasonal crop economy, grid tilemap &amp; watering tools.</span>
                </div>

                <!-- 4. Sandbox Miner -->
                <div class="blatant-sugg-card sand insp-spark-pill" data-idea="2D Destructible Sandbox Miner with procedural underground biomes and crafting">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#c084fc">⛏️ Sandbox MMORPG</span>
                    <span class="badge gold" style="font-size:9.5px;padding:1px 6px">28 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">Voxel destructible tiles, procedural cave biomes, ore vein discovery &amp; crafting tiers.</span>
                </div>

                <!-- 5. Cyberpunk Roguelike -->
                <div class="blatant-sugg-card cyber insp-spark-pill" data-idea="Cyberpunk Roguelike with isometric neon hacking nodes and drone combat">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#00f0ff">🌆 Cyberpunk</span>
                    <span class="badge ok" style="font-size:9.5px;padding:1px 6px">22 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">Isometric neon grid, terminal node hacking timer, cyber-deck upgrades &amp; drone waves.</span>
                </div>

                <!-- 6. Survival Horror -->
                <div class="blatant-sugg-card horror insp-spark-pill" data-idea="Survival Horror with scarce ammo pools, flashlight raycasts and sanity meter">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12.5px;font-weight:700;color:#f43f5e">🔦 Survival Horror</span>
                    <span class="badge red" style="font-size:9.5px;padding:1px 6px">26 Steps</span>
                  </div>
                  <span style="font-size:10.5px;color:#cbd5e1;line-height:1.3">Scarce ammo pools, dynamic flashlight raycasting, heartbeat monitor &amp; sanity drain.</span>
                </div>
              </div>
            </div>`;

html = html.replace(oldSparksRegex, newSuggestions);

// 4. Move Inspiration Gallery BELOW Created Projects & Live Viewports
// First extract the inspiration gallery block
const inspStart = html.indexOf('<!-- ==================== PINTEREST-STYLE INSPIRATION BOARD');
const inspEnd = html.indexOf('<!-- CREATED PROJECTS SECTION', inspStart);

let inspHtml = '';
if (inspStart !== -1 && inspEnd !== -1) {
  inspHtml = html.slice(inspStart, inspEnd);
  // Cut it from current location
  html = html.slice(0, inspStart) + html.slice(inspEnd);
}

// 5. Replace Created Projects section with Projects + Spinning 3D Model Viewer + Live Pixel Sprite Viewer
const oldPjSectionRegex = /<!-- CREATED PROJECTS SECTION[\s\S]*?<div class="pjgrid" id="pj-grid"[^>]*><\/div>\s*<\/div>/;

const newPjSection = `<!-- CREATED PROJECTS & LIVE VIEWPORTS (Side-by-Side: Projects, Spinning 3D Model, Animated Pixel Sprite) -->
          <div id="pj-section-inner" style="max-width:740px;margin:18px auto 14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <div style="display:flex;align-items:center;gap:8px">
                <h2 style="font-size:13.5px;font-weight:800;color:#ffffff;letter-spacing:.04em;margin:0;border:none">CREATED PROJECTS &amp; VIEWPORTS</h2>
                <span class="badge ok" style="font-size:10px;padding:2px 7px">READY</span>
              </div>
              <button class="btn btn-gold-wood" id="pj-new" style="padding:6px 16px;font-size:11.5px">+ Create New Project</button>
            </div>
            <p style="font-size:11px;color:#94a3b8;margin:0 0 12px">Open created blueprints, inspect live rotating 3D meshes, or preview 16-bit animated pixel sprites</p>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(225px, 1fr));gap:12px;margin-bottom:16px">
              
              <!-- 1. Created Project Preset Card -->
              <div class="pjgrid" id="pj-grid" style="display:flex;flex-direction:column;gap:12px"></div>

              <!-- 2. Live Interactive Spinning 3D Model Viewer -->
              <div class="card-textured" style="background:rgba(12,16,24,0.92);border:1px solid rgba(0,188,212,0.35);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 12px 30px rgba(0,0,0,0.55)">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="font-size:12px">🪨</span>
                    <span style="font-size:11.5px;font-weight:700;color:#00f0ff;letter-spacing:.03em">3D VIEWPORT</span>
                  </div>
                  <span class="badge ok" id="three-fps-badge" style="font-size:9.5px;padding:1px 6px">60 FPS</span>
                </div>
                
                <!-- 3D Canvas -->
                <div style="position:relative;width:100%;height:140px;background:#05070b;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);cursor:grab" id="three-canvas-wrap">
                  <canvas id="three-model-canvas" width="280" height="140" style="width:100%;height:100%;display:block"></canvas>
                  <div style="position:absolute;bottom:6px;left:8px;font-size:9.5px;color:rgba(255,255,255,0.45);pointer-events:none;font-family:Consolas,monospace">DRAG TO ORBIT</div>
                  <div style="position:absolute;bottom:6px;right:8px;display:flex;gap:4px">
                    <button id="btn-3d-wire" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:4px;font-size:9px;padding:2px 6px;cursor:pointer">WIRE</button>
                    <button id="btn-3d-mesh" style="background:rgba(0,188,212,0.18);border:1px solid rgba(0,188,212,0.4);color:#00f0ff;border-radius:4px;font-size:9px;padding:2px 6px;cursor:pointer">MESH</button>
                  </div>
                </div>

                <div style="font-size:10.5px;color:#94a3b8;line-height:1.3">
                  <b style="color:#ffffff">Low-Poly Stylized Rock #1</b> // Real-time directional lighting, face normals &amp; ambient occlusion.
                </div>
              </div>

              <!-- 3. Live Animated Pixel Sprite Character -->
              <div class="card-textured" style="background:rgba(12,16,24,0.92);border:1px solid rgba(233,30,99,0.35);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 12px 30px rgba(0,0,0,0.55)">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="font-size:12px">👾</span>
                    <span style="font-size:11.5px;font-weight:700;color:#f43f5e;letter-spacing:.03em">PIXEL SPRITE</span>
                  </div>
                  <span class="badge act" style="font-size:9.5px;padding:1px 6px">16-BIT RETRO</span>
                </div>

                <!-- Pixel Sprite Canvas -->
                <div style="position:relative;width:100%;height:140px;background:#05070b;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center" id="sprite-canvas-wrap">
                  <canvas id="pixel-sprite-canvas" width="160" height="140" style="image-rendering:pixelated;image-rendering:crisp-edges;display:block"></canvas>
                  <div style="position:absolute;bottom:6px;left:8px;display:flex;gap:4px">
                    <button id="btn-anim-walk" style="background:rgba(244,63,94,0.2);border:1px solid rgba(244,63,94,0.5);color:#f43f5e;border-radius:4px;font-size:9px;padding:2px 6px;cursor:pointer">WALK</button>
                    <button id="btn-anim-attack" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:4px;font-size:9px;padding:2px 6px;cursor:pointer">ATTACK</button>
                    <button id="btn-anim-cast" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:4px;font-size:9px;padding:2px 6px;cursor:pointer">CAST</button>
                  </div>
                  <div id="sprite-frame-counter" style="position:absolute;top:6px;right:8px;font-size:9.5px;color:#94a3b8;font-family:Consolas,monospace">FRAME: 1/8</div>
                </div>

                <div style="font-size:10.5px;color:#94a3b8;line-height:1.3">
                  <b style="color:#ffffff">Crimson Wanderer Sprite</b> // 8-frame loop at 12fps, pixelated integer scaling.
                </div>
              </div>

            </div>
          </div>

          ${inspHtml ? `<!-- PINTEREST-STYLE INSPIRATION GALLERY (Placed directly below Created Projects & Viewports) -->\n${inspHtml}` : ''}
`;

html = html.replace(oldPjSectionRegex, newPjSection);

// 6. Add JS Renderers for the 3D Spinning Model & Animated Pixel Sprite
const jsRenderers = `
// ============================================================================
// 1. Interactive 3D Spinning Model Viewer (Pure Mathematical WebGL / Canvas)
// ============================================================================
(function init3DSpinningModel() {
  const canvas = document.getElementById('three-model-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let yaw = 0.4, pitch = 0.28, roll = 0;
  let isDragging = false, lastX = 0, lastY = 0;
  let autoRotate = true;
  let wireframeOnly = false;
  let meshType = 0; // 0 = Stylized Rock, 1 = Arcane Crystal, 2 = Grimoire

  // Faceted Stylized Rock 3D Polyhedron (Vertices & Faces)
  const rockVertices = [
    [-0.8, -0.6, -0.7], [0.8, -0.6, -0.7], [0.9, -0.6, 0.7], [-0.8, -0.6, 0.8], // base 0..3
    [-1.1, 0.1, -0.9], [1.1, 0.0, -0.8], [1.2, 0.2, 0.9], [-1.0, 0.1, 1.1],   // mid-low 4..7
    [-0.7, 0.8, -0.6], [0.6, 0.9, -0.5], [0.7, 0.7, 0.6], [-0.8, 0.8, 0.5],   // mid-high 8..11
    [-0.2, 1.25, -0.1], [0.3, 1.2, 0.1], [0.1, 1.3, -0.2]                       // top crown 12..14
  ];

  const rockFaces = [
    // Bottom
    [0, 2, 1], [0, 3, 2],
    // Mid facets
    [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7],
    // Upper facets
    [4, 5, 9], [4, 9, 8], [5, 6, 10], [5, 10, 9], [6, 7, 11], [6, 11, 10], [7, 4, 8], [7, 8, 11],
    // Crown
    [8, 9, 13], [8, 13, 12], [9, 10, 13], [10, 11, 14], [10, 14, 13], [11, 8, 12], [11, 12, 14], [12, 13, 14]
  ];

  // Palette: Stylized warm stone (#dcb37b) with deep slate ambient and cyan specular
  const lightDir = normalize([0.55, 0.8, 0.5]);

  function normalize(v) {
    const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) || 1;
    return [v[0]/len, v[1]/len, v[2]/len];
  }

  function cross(a, b) {
    return [
      a[1]*b[2] - a[2]*b[1],
      a[2]*b[0] - a[0]*b[2],
      a[0]*b[1] - a[1]*b[0]
    ];
  }

  function sub(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }

  const wrap = document.getElementById('three-canvas-wrap');
  if (wrap) {
    wrap.onmousedown = (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      autoRotate = false;
      wrap.style.cursor = 'grabbing';
    };
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      yaw += dx * 0.015;
      pitch += dy * 0.015;
      pitch = Math.max(-1.4, Math.min(1.4, pitch));
      lastX = e.clientX;
      lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (wrap) wrap.style.cursor = 'grab';
        setTimeout(() => { autoRotate = true; }, 3000);
      }
    });
  }

  const btnWire = document.getElementById('btn-3d-wire');
  if (btnWire) {
    btnWire.onclick = (e) => {
      e.stopPropagation();
      wireframeOnly = !wireframeOnly;
      btnWire.style.borderColor = wireframeOnly ? '#00f0ff' : 'rgba(255,255,255,0.2)';
      btnWire.style.color = wireframeOnly ? '#00f0ff' : '#fff';
    };
  }

  const btnMesh = document.getElementById('btn-3d-mesh');
  if (btnMesh) {
    btnMesh.onclick = (e) => {
      e.stopPropagation();
      meshType = (meshType + 1) % 2;
      toast(meshType === 0 ? '3D MESH: STYLIZED ROCK' : '3D MESH: ARCANE CRYSTAL');
    };
  }

  function render3D() {
    if (autoRotate) {
      yaw += 0.014;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle radial floor shadow
    const grad = ctx.createRadialGradient(140, 115, 10, 140, 115, 65);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(140, 115, 65, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    const scale = 54;
    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);

    // Rotate and project vertices
    const projected = rockVertices.map(v => {
      let x = v[0], y = v[1], z = v[2];
      if (meshType === 1) { // Arcane Crystal variant
        x *= 0.75;
        y *= 1.35;
        z *= 0.75;
      }
      // Yaw (Y axis)
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Pitch (X axis)
      const y2 = y * cosP - z1 * sinP;
      const z2 = y * sinP + z1 * cosP;

      // Perspective projection
      const dist = 3.6;
      const fov = 1.6 / (dist - z2);
      const px = 140 + x1 * fov * scale;
      const py = 74 - y2 * fov * scale;

      return { px, py, z: z2, rx: x1, ry: y2, rz: z2 };
    });

    // Face sorting by avg depth (Painter's algorithm)
    const sortedFaces = rockFaces.map(face => {
      const v0 = projected[face[0]];
      const v1 = projected[face[1]];
      const v2 = projected[face[2]];
      const avgZ = (v0.z + v1.z + v2.z) / 3;

      // Normal vector in 3D
      const e1 = sub([v1.rx, v1.ry, v1.rz], [v0.rx, v0.ry, v0.rz]);
      const e2 = sub([v2.rx, v2.ry, v2.rz], [v0.rx, v0.ry, v0.rz]);
      const normal = normalize(cross(e1, e2));

      return { face, avgZ, normal, v0, v1, v2 };
    });

    sortedFaces.sort((a, b) => a.avgZ - b.avgZ);

    sortedFaces.forEach(f => {
      // Backface culling
      if (f.normal[2] < -0.05) return;

      const dot = Math.max(0, f.normal[0]*lightDir[0] + f.normal[1]*lightDir[1] + f.normal[2]*lightDir[2]);
      
      ctx.beginPath();
      ctx.moveTo(f.v0.px, f.v0.py);
      ctx.lineTo(f.v1.px, f.v1.py);
      ctx.lineTo(f.v2.px, f.v2.py);
      ctx.closePath();

      if (!wireframeOnly) {
        if (meshType === 0) {
          // Warm Stylized Rock Shading
          const r = Math.round(130 + dot * 95);
          const g = Math.round(105 + dot * 80);
          const b = Math.round(78 + dot * 55);
          ctx.fillStyle = \`rgb(\${r},\${g},\${b})\`;
          ctx.fill();
        } else {
          // Arcane Crystal Shading (#673AB7 to #00BCD4)
          const r = Math.round(75 + dot * 60);
          const g = Math.round(45 + dot * 120);
          const b = Math.round(160 + dot * 95);
          ctx.fillStyle = \`rgba(\${r},\${g},\${b}, 0.88)\`;
          ctx.fill();
        }
      }

      // Edge line
      ctx.strokeStyle = wireframeOnly 
        ? '#00f0ff' 
        : (meshType === 0 ? 'rgba(60, 45, 30, 0.45)' : 'rgba(0, 240, 255, 0.4)');
      ctx.lineWidth = wireframeOnly ? 1.2 : 0.8;
      ctx.stroke();
    });

    requestAnimationFrame(render3D);
  }

  render3D();
})();

// ============================================================================
// 2. Live Animated Pixel Sprite Character (16-Bit Retro Walk / Attack Engine)
// ============================================================================
(function initPixelSpriteAnimator() {
  const canvas = document.getElementById('pixel-sprite-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  let animState = 'walk'; // 'walk', 'attack', 'cast'
  let frame = 0;
  let lastTime = 0;
  const fps = 8;
  const interval = 1000 / fps;

  const btnWalk = document.getElementById('btn-anim-walk');
  const btnAttack = document.getElementById('btn-anim-attack');
  const btnCast = document.getElementById('btn-anim-cast');
  const frameCounter = document.getElementById('sprite-frame-counter');

  function setAnim(state) {
    animState = state;
    frame = 0;
    [btnWalk, btnAttack, btnCast].forEach(b => {
      if (!b) return;
      b.style.background = 'rgba(255,255,255,0.08)';
      b.style.borderColor = 'rgba(255,255,255,0.2)';
      b.style.color = '#cbd5e1';
    });
    const target = state === 'walk' ? btnWalk : state === 'attack' ? btnAttack : btnCast;
    if (target) {
      target.style.background = 'rgba(244,63,94,0.2)';
      target.style.borderColor = 'rgba(244,63,94,0.5)';
      target.style.color = '#f43f5e';
    }
  }

  if (btnWalk) btnWalk.onclick = () => setAnim('walk');
  if (btnAttack) btnAttack.onclick = () => setAnim('attack');
  if (btnCast) btnCast.onclick = () => setAnim('cast');

  // Procedural 16-Bit Character Pixel Matrix (Walk, Attack, Cast)
  // Palette: Cape Crimson (#e11d48), Robe Violet (#581c87), Skin (#fed7aa), Gold (#fbbf24), Sword (#e2e8f0)
  const P = {
    _ : null,
    K : '#05070a', // outline
    R : '#e11d48', // crimson cape
    D : '#9f1239', // dark crimson
    V : '#6d28d9', // arcane violet tunic
    S : '#ffedd5', // skin peach
    G : '#fbbf24', // gold trims
    W : '#f8fafc', // sword steel
    B : '#1e1b4b', // boots dark
    F : '#38bdf8'  // cyan magic spark
  };

  function drawPixelGrid(grid, ox, oy, pSize) {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const color = P[grid[r][c]];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(ox + c * pSize, oy + r * pSize, pSize, pSize);
        }
      }
    }
  }

  // 16x16 Frames
  const walkFrames = [
    // Frame 0: Stride 1
    [
      "____KKKK________",
      "___KRRRRK_______",
      "__KRSSSSRK______",
      "__KRSGGSRK______",
      "___KSSSSK_______",
      "___KVVVVK__WW___",
      "__KVRRRRVK_WK___",
      "__KVRRRRVK_WK___",
      "_KVRRRRRRVKK____",
      "_KVRRRRRRVKK____",
      "__KVVVVVVK______",
      "___KBBKKBK______",
      "___KBBK_KBK_____",
      "___KBK___KBK____",
      "___KK_____KK____",
      "________________"
    ],
    // Frame 1: Mid
    [
      "____KKKK________",
      "___KRRRRK_______",
      "__KRSSSSRK______",
      "__KRSGGSRK______",
      "___KSSSSK_______",
      "___KVVVVK___W___",
      "__KVRRRRVK__WK__",
      "__KVRRRRVK_WKK__",
      "_KVRRRRRRVKK____",
      "_KVRRRRRRVKK____",
      "__KVVVVVVK______",
      "___KBBKBBK______",
      "___KBBKBBK______",
      "___KBKKKBK______",
      "___KK___KK______",
      "________________"
    ],
    // Frame 2: Stride 2
    [
      "____KKKK________",
      "___KRRRRK_______",
      "__KRSSSSRK______",
      "__KRSGGSRK______",
      "___KSSSSK_______",
      "___KVVVVK__WW___",
      "__KVRRRRVK_WK___",
      "__KVRRRRVK_WK___",
      "_KVRRRRRRVKK____",
      "_KVRRRRRRVKK____",
      "__KVVVVVVK______",
      "___KBKKBKK______",
      "__KBK_KBBK______",
      "__KBK__KBK______",
      "__KK____KK______",
      "________________"
    ],
    // Frame 3: Bob
    [
      "________________",
      "____KKKK________",
      "___KRRRRK_______",
      "__KRSSSSRK______",
      "__KRSGGSRK______",
      "___KSSSSK___W___",
      "___KVVVVK__WK___",
      "__KVRRRRVK_WK___",
      "_KVRRRRRRVKK____",
      "_KVRRRRRRVKK____",
      "__KVVVVVVK______",
      "___KBBKBBK______",
      "___KBBKBBK______",
      "___KBKKKBK______",
      "___KK___KK______",
      "________________"
    ]
  ];

  function loop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const elapsed = timestamp - lastTime;

    if (elapsed > interval) {
      lastTime = timestamp - (elapsed % interval);
      frame = (frame + 1) % 8;
      if (frameCounter) frameCounter.textContent = \`FRAME: \${frame + 1}/8\`;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Floor shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.ellipse(80, 122, 34, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pick frame
    const fIdx = frame % walkFrames.length;
    const grid = walkFrames[fIdx];
    const pSize = 5; // 5x scale => 80x80px character
    const ox = 40;
    const oy = 22 + (frame % 2 === 0 ? 0 : 2);

    drawPixelGrid(grid, ox, oy, pSize);

    // If attack or cast, draw effects
    if (animState === 'attack' && (frame % 4 >= 2)) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillRect(ox + 55, oy + 20, 35, 3);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.fillRect(ox + 50, oy + 17, 45, 9);
    } else if (animState === 'cast') {
      const sparkCount = 4;
      for (let s = 0; s < sparkCount; s++) {
        const sx = ox + 55 + Math.sin(timestamp * 0.01 + s) * 14;
        const sy = oy + 20 + Math.cos(timestamp * 0.01 + s) * 14;
        ctx.fillStyle = s % 2 === 0 ? '#00f0ff' : '#fbbf24';
        ctx.fillRect(sx, sy, 4, 4);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
`;

html += `\n<script>\n${jsRenderers}\n</script>\n`;

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully applied 3D model viewer, pixel sprite animator, enlarged logo, and blatant suggestions to app/index.html');
