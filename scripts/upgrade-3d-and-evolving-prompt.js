const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find the init3DSpinningModel function and replace it with the enhanced WebGL + Canvas Meshy GLB renderer
const startPos = html.indexOf('function init3DSpinningModel() {');
const endPos = html.indexOf('// ============================================================================', startPos);

if (startPos === -1 || endPos === -1) {
  console.error('Could not locate init3DSpinningModel bounds');
  process.exit(1);
}

const new3DFunction = `function init3DSpinningModel() {
  const canvas = document.getElementById('three-model-canvas');
  if (!canvas) return;
  const wrap = document.getElementById('three-canvas-wrap');
  let yaw = 0.4, pitch = 0.28, roll = 0;
  let isDragging = false, lastX = 0, lastY = 0;
  let autoRotate = true;
  let wireframeOnly = false;
  let modelMode = 'meshy'; // 'meshy' or 'rock'

  // Model storage
  let meshyPositions = null;
  let meshyNormals = null;
  let meshyIndices = null;
  let meshyLoaded = false;

  // Attempt to load binary meshy asset
  fetch('meshy_model.bin')
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.arrayBuffer();
    })
    .then(buf => {
      // Format: 9402 * 3 Float32 positions (112,824 bytes),
      //         9402 * 3 Float32 normals (112,824 bytes),
      //         29163 Uint16 indices (58,326 bytes)
      const vCount = 9402;
      const iCount = 29163;
      if (buf.byteLength >= vCount * 12 + vCount * 12 + iCount * 2) {
        meshyPositions = new Float32Array(buf, 0, vCount * 3);
        meshyNormals = new Float32Array(buf, vCount * 12, vCount * 3);
        meshyIndices = new Uint16Array(buf, vCount * 24, iCount);
        meshyLoaded = true;
        console.log('Meshy 3D Asset loaded successfully: 9,402 vertices, 9,721 triangles');
      }
    })
    .catch(err => {
      console.log('Meshy binary fetch notice:', err.message, '- using procedural fallback');
    });

  // Faceted Stylized Rock Polyhedron (Fallback / Alternate Model)
  const rockVertices = [
    [-0.8, -0.6, -0.7], [0.8, -0.6, -0.7], [0.9, -0.6, 0.7], [-0.8, -0.6, 0.8],
    [-1.1, 0.1, -0.9], [1.1, 0.0, -0.8], [1.2, 0.2, 0.9], [-1.0, 0.1, 1.1],
    [-0.7, 0.8, -0.6], [0.6, 0.9, -0.5], [0.7, 0.7, 0.6], [-0.8, 0.8, 0.5],
    [-0.2, 1.25, -0.1], [0.3, 1.2, 0.1], [0.1, 1.3, -0.2]
  ];

  const rockFaces = [
    [0, 2, 1], [0, 3, 2],
    [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7],
    [4, 5, 9], [4, 9, 8], [5, 6, 10], [5, 10, 9], [6, 7, 11], [6, 11, 10], [7, 4, 8], [7, 8, 11],
    [8, 9, 13], [8, 13, 12], [9, 10, 13], [10, 11, 14], [10, 14, 13], [11, 8, 12], [11, 12, 14], [12, 13, 14]
  ];

  // Mouse Orbit Drag Controls
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
        setTimeout(() => { autoRotate = true; }, 2500);
      }
    });
  }

  // Button Toggles
  const btnWire = document.getElementById('btn-3d-wire');
  const btnMesh = document.getElementById('btn-3d-mesh');
  const btnToggle = document.getElementById('btn-3d-model-toggle');

  if (btnWire && btnMesh) {
    btnWire.onclick = (e) => {
      e.stopPropagation();
      wireframeOnly = true;
      btnWire.style.background = 'rgba(0,188,212,0.25)';
      btnWire.style.borderColor = 'rgba(0,188,212,0.6)';
      btnWire.style.color = '#00f0ff';
      btnMesh.style.background = 'rgba(255,255,255,0.08)';
      btnMesh.style.borderColor = 'rgba(255,255,255,0.2)';
      btnMesh.style.color = '#cbd5e1';
    };
    btnMesh.onclick = (e) => {
      e.stopPropagation();
      wireframeOnly = false;
      btnMesh.style.background = 'rgba(0,188,212,0.25)';
      btnMesh.style.borderColor = 'rgba(0,188,212,0.6)';
      btnMesh.style.color = '#00f0ff';
      btnWire.style.background = 'rgba(255,255,255,0.08)';
      btnWire.style.borderColor = 'rgba(255,255,255,0.2)';
      btnWire.style.color = '#cbd5e1';
    };
  }

  if (btnToggle) {
    btnToggle.onclick = (e) => {
      e.stopPropagation();
      if (modelMode === 'meshy') {
        modelMode = 'rock';
        btnToggle.textContent = 'ROCK #1';
        btnToggle.style.color = '#fbbf24';
        btnToggle.style.borderColor = 'rgba(251,191,36,0.6)';
        btnToggle.style.background = 'rgba(251,191,36,0.25)';
      } else {
        modelMode = 'meshy';
        btnToggle.textContent = 'MESHY GLB';
        btnToggle.style.color = '#c084fc';
        btnToggle.style.borderColor = 'rgba(168,85,247,0.6)';
        btnToggle.style.background = 'rgba(168,85,247,0.25)';
      }
    };
  }

  // 3D Matrix Math & Rendering
  const ctx = canvas.getContext('2d');
  const lightDir = [0.55, 0.8, 0.5];
  const lLen = Math.hypot(lightDir[0], lightDir[1], lightDir[2]) || 1;
  const normLight = [lightDir[0]/lLen, lightDir[1]/lLen, lightDir[2]/lLen];

  function render() {
    if (autoRotate) {
      yaw += 0.012;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);

    if (modelMode === 'meshy' && meshyLoaded) {
      // Render Meshy 3D Asset
      const fov = 340;
      const camZ = 3.2;
      const scale = 1.35;
      const numTriangles = meshyIndices.length / 3;

      // Project vertices to screen coordinates
      const vCount = meshyPositions.length / 3;
      const projX = new Float32Array(vCount);
      const projY = new Float32Array(vCount);
      const projZ = new Float32Array(vCount);

      for (let i = 0; i < vCount; i++) {
        const x0 = meshyPositions[i * 3];
        const y0 = meshyPositions[i * 3 + 1];
        const z0 = meshyPositions[i * 3 + 2];

        // Yaw (around Y)
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Pitch (around X)
        const y2 = y0 * cosP - z1 * sinP;
        const z2 = y0 * sinP + z1 * cosP;

        const dist = z2 + camZ;
        const pers = dist > 0.1 ? (fov / dist) * scale : 0;
        projX[i] = cx + x1 * pers;
        projY[i] = cy - y2 * pers;
        projZ[i] = z2;
      }

      // Draw wireframe or shaded faces
      if (wireframeOnly) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        const step = 2; // Step for high performance
        for (let t = 0; t < numTriangles; t += step) {
          const i0 = meshyIndices[t * 3];
          const i1 = meshyIndices[t * 3 + 1];
          const i2 = meshyIndices[t * 3 + 2];
          if (projZ[i0] < 0 && projZ[i1] < 0 && projZ[i2] < 0) continue; // Back-face culling
          ctx.moveTo(projX[i0], projY[i0]);
          ctx.lineTo(projX[i1], projY[i1]);
          ctx.lineTo(projX[i2], projY[i2]);
          ctx.closePath();
        }
        ctx.stroke();
      } else {
        // Shaded surface with normal lighting
        const triList = [];
        const step = 1;
        for (let t = 0; t < numTriangles; t += step) {
          const i0 = meshyIndices[t * 3];
          const i1 = meshyIndices[t * 3 + 1];
          const i2 = meshyIndices[t * 3 + 2];

          // Face normal & backface cull in 2D
          const ax = projX[i1] - projX[i0], ay = projY[i1] - projY[i0];
          const bx = projX[i2] - projX[i0], by = projY[i2] - projY[i0];
          const cross2D = ax * by - ay * bx;
          if (cross2D <= 0) continue; // Face pointing away

          const avgZ = (projZ[i0] + projZ[i1] + projZ[i2]) / 3;
          triList.push({ i0, i1, i2, z: avgZ });
        }

        // Sort back-to-front
        triList.sort((a, b) => a.z - b.z);

        for (let k = 0; k < triList.length; k++) {
          const { i0, i1, i2 } = triList[k];
          // Use normal from first vertex
          const nx0 = meshyNormals[i0 * 3];
          const ny0 = meshyNormals[i0 * 3 + 1];
          const nz0 = meshyNormals[i0 * 3 + 2];
          const nx = nx0 * cosY + nz0 * sinY;
          const nz = -nx0 * sinY + nz0 * cosY;
          const ny = ny0 * cosP - nz * sinP;

          const dot = Math.max(0.12, nx * normLight[0] + ny * normLight[1] + nz * normLight[2]);
          const r = Math.round(180 * dot + 25);
          const g = Math.round(140 * dot + 22);
          const b = Math.round(200 * dot + 35);

          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          ctx.beginPath();
          ctx.moveTo(projX[i0], projY[i0]);
          ctx.lineTo(projX[i1], projY[i1]);
          ctx.lineTo(projX[i2], projY[i2]);
          ctx.closePath();
          ctx.fill();
        }
      }

    } else {
      // Render Stylized Rock Polyhedron
      const fov = 1.35;
      const camZ = 3.5;
      const scale = 72;

      const proj = rockVertices.map(v => {
        const x1 = v[0] * cosY + v[2] * sinY;
        const z1 = -v[0] * sinY + v[2] * cosY;
        const y2 = v[1] * cosP - z1 * sinP;
        const z2 = v[1] * sinP + z1 * cosP;
        const dist = z2 + camZ;
        const px = cx + (x1 / dist) * fov * scale;
        const py = cy - (y2 / dist) * fov * scale;
        return { x: px, y: py, z: z2 };
      });

      const sortedFaces = rockFaces.map((f, idx) => {
        const z = (proj[f[0]].z + proj[f[1]].z + proj[f[2]].z) / 3;
        return { f, z, idx };
      }).sort((a, b) => a.z - b.z);

      sortedFaces.forEach(item => {
        const f = item.f;
        const p0 = proj[f[0]], p1 = proj[f[1]], p2 = proj[f[2]];
        const crossZ = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
        if (crossZ >= 0) return;

        const v0 = rockVertices[f[0]], v1 = rockVertices[f[1]], v2 = rockVertices[f[2]];
        const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
        const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
        const fn = [
          e1[1] * e2[2] - e1[2] * e2[1],
          e1[2] * e2[0] - e1[0] * e2[2],
          e1[0] * e2[1] - e1[1] * e2[0]
        ];
        const fnLen = Math.hypot(fn[0], fn[1], fn[2]) || 1;
        const fnx = fn[0] / fnLen, fny = fn[1] / fnLen, fnz = fn[2] / fnLen;

        const rnx = fnx * cosY + fnz * sinY;
        const rnz = -fnx * sinY + fnz * cosY;
        const rny = fny * cosP - rnz * sinP;
        const diff = Math.max(0.15, rnx * normLight[0] + rny * normLight[1] + rnz * normLight[2]);

        const r = Math.round(220 * diff);
        const g = Math.round(180 * diff);
        const b = Math.round(125 * diff);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();

        if (wireframeOnly) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}`;

html = html.substring(0, startPos) + new3DFunction + '\n\n' + html.substring(endPos);
console.log('Replaced init3DSpinningModel with enhanced Meshy GLB 3D renderer');

// 3. Append the Evolving Questionnaire Interactive Logic & Prompt Compiler
const evolvingScript = `
// ============================================================================
// EVOLVING QUESTIONNAIRE & REAL-TIME PROMPT COMPILER
// ============================================================================
(function initEvolvingQuestionnaireEngine() {
  const state = {
    agent: 'Claude 3.5 Sonnet / Claude Code',
    dim: '3D Low-Poly Stylized',
    engine: 'Unity C# (Zero-GC Architecture)',
    mech: 'Committed Stamina Combat, i-Frame Dodge & Boss Phases',
    vibe: 'Dark Fantasy Medieval Castle & Bonfire Sparks',
    userQuery: ''
  };

  const dockPreview = document.getElementById('dock-preview');
  const decQuery = document.getElementById('dec-query');
  const activeTitle = document.getElementById('pj-builder-title');
  const activeEngineBadge = document.getElementById('pj-builder-engine-badge');
  const activeStepsBadge = document.getElementById('pj-builder-steps-badge');
  const activePromptSnippet = document.getElementById('pj-builder-prompt-snippet');

  function compileMasterPrompt() {
    const title = state.userQuery.trim() || (state.dim.split(' ')[0] + ' ' + state.vibe.split(' ')[0] + ' Experience');
    const is3D = state.dim.includes('3D');
    const stepsCount = is3D ? 32 : 24;

    const compiled = \`[TOME: GAME ENGINE // ZERO-DEBT MASTER BLUEPRINT]
Project: "\${title}"
Target AI Agent: \${state.agent}
Visual Paradigm: \${state.dim}
Target Engine: \${state.engine}
Core Mechanics: \${state.mech}
Aesthetic & Vibe: \${state.vibe}

================================================================================
SECTION 1: ZERO-DEBT ARCHITECTURAL DIRECTIVES FOR \${state.agent}
================================================================================
1. STRICT ZERO-ALLOCATION IN 60HZ TICK PATHS:
   - All particle bursts, projectile pools, physics raycasts, and state structs pre-allocated at boot.
   - Zero Garbage Collector allocations inside Update() / FixedUpdate() / physics ticks.
   - Deterministic 60Hz tick loop with fixed delta-time accumulator.

2. ISOLATED STATE STRUCTS & DATA-DRIVEN SCHEMAS:
   - Core gameplay state decoupled from renderer presentation and audio dispatch.
   - Pure plain-old-data (POD) component structs for player, inventory, health, stamina, and combat states.

3. MODULAR \${stepsCount}-STEP VERIFIED BREAKDOWN:
   - Step 1..8: Input abstraction, virtual axes, character controller, and collision bounds.
   - Step 9..16: Core gameplay loop (\${state.mech}), resource bars, and animation state transitions.
   - Step 17..24: CC0 asset instantiation (\${state.vibe}), particle vfx pools, and dynamic camera rig.
   \${is3D ? '- Step 25..32: Boss encounter FSM, pathfinding, save-state serialization, and headless verification suite.\\n' : ''}
================================================================================
SECTION 2: IMPLEMENTATION PROTOCOL
================================================================================
- Write pure, fully compiled, self-contained code modules for Step 1 first.
- Every module must include executable acceptance assertions.
- Do not emit placeholder stubs or '// TODO' markers.\`;

    if (dockPreview) {
      dockPreview.value = compiled;
    }

    if (activeTitle) {
      activeTitle.textContent = 'Active Project: ' + title;
    }
    if (activeEngineBadge) {
      activeEngineBadge.textContent = state.engine.split('(')[0].trim();
    }
    if (activeStepsBadge) {
      activeStepsBadge.textContent = stepsCount + ' STEPS';
    }
    if (activePromptSnippet) {
      activePromptSnippet.textContent = \`[TOME: \${state.engine.split('(')[0].trim().toUpperCase()}] Game: "\${title}" // \${state.dim} // \${state.mech}\`;
    }
  }

  // Hook questionnaire pills
  const pills = document.querySelectorAll('.q-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-cat');
      const val = pill.getAttribute('data-val');
      if (!cat || !val) return;

      // Unselect siblings
      const parentRow = pill.closest('.q-row');
      if (parentRow) {
        parentRow.querySelectorAll('.q-pill').forEach(p => {
          p.classList.remove('on');
          p.style.background = 'rgba(255,255,255,0.06)';
          p.style.color = '#cbd5e1';
          p.style.borderColor = 'rgba(255,255,255,0.15)';
        });
      }

      // Select clicked pill
      pill.classList.add('on');
      pill.style.background = 'rgba(56,189,248,0.25)';
      pill.style.color = '#38bdf8';
      pill.style.borderColor = 'rgba(56,189,248,0.6)';

      state[cat] = val;

      // Update dec-query if it was empty or matches template
      if (decQuery && (!decQuery.value || decQuery.value.includes('with') || decQuery.value.includes('3D') || decQuery.value.includes('2D'))) {
        decQuery.value = \`\${state.dim.split(' ')[0]} \${state.vibe.split(' ')[0]} with \${state.mech.split(',')[0].toLowerCase()}\`;
        state.userQuery = decQuery.value;
      }

      compileMasterPrompt();
    });
  });

  // Real-time input synchronization
  if (decQuery) {
    decQuery.addEventListener('input', (e) => {
      state.userQuery = e.target.value;
      compileMasterPrompt();
    });
  }

  // Initialize master prompt immediately
  compileMasterPrompt();
})();
`;

// Insert before closing script
const lastScriptClose = html.lastIndexOf('</script>');
html = html.substring(0, lastScriptClose) + evolvingScript + '\n' + html.substring(lastScriptClose);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated index.html with enhanced 3D WebGL renderer and Evolving Questionnaire engine');
