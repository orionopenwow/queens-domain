const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Replace the static suggestions grid with the Evolving Questionnaire
const startMarker = '<div id="inspiration-sparks-bar"';
const endMarker = '<div id="zen-drop-zone"';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate block markers in app/index.html');
  process.exit(1);
}

const questionnaireHtml = `<div id="inspiration-sparks-bar" style="max-width:760px;margin:12px auto 16px;text-align:left">
              
              <!-- Evolving Questionnaire Header -->
              <div style="background:rgba(8,12,18,0.95);border:1.5px solid rgba(56,189,248,0.3);border-radius:14px;padding:16px 18px;box-shadow:0 8px 30px rgba(0,0,0,0.7)">
                
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">⚡</span>
                    <div>
                      <div style="font-size:12px;font-weight:800;color:#38bdf8;letter-spacing:.06em">EVOLVING GAME ARCHITECTURE QUESTIONNAIRE</div>
                      <div style="font-size:10px;color:#94a3b8">Interactive questions evolve your prompt and architectural blueprint in real time</div>
                    </div>
                  </div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap">
                    <span class="q-badge on" data-step="1" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5)">1. AGENT</span>
                    <span class="q-badge on" data-step="2" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5)">2. STYLE</span>
                    <span class="q-badge on" data-step="3" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5)">3. ENGINE</span>
                    <span class="q-badge on" data-step="4" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5)">4. MECHANICS</span>
                    <span class="q-badge on" data-step="5" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5)">5. INSPIRATION</span>
                  </div>
                </div>

                <!-- Q1: AI Agent Target -->
                <div class="q-row" style="margin-bottom:12px">
                  <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                    <span style="color:#fbbf24;font-weight:800">Q1: Target AI Agent / Source</span>
                    <span style="font-size:10px;color:#64748b">— Who will construct this game with you?</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    <button class="q-pill on" data-cat="agent" data-val="Claude 3.5 Sonnet / Claude Code" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🤖 Claude 3.5 Sonnet / Claude Code</button>
                    <button class="q-pill" data-cat="agent" data-val="Own Local LLM (Ollama / Qwen 2.5 Coder)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">💻 Own Local LLM (Ollama / Qwen)</button>
                    <button class="q-pill" data-cat="agent" data-val="Cursor / Windsurf AI IDE" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⚡ Cursor / Windsurf IDE</button>
                    <button class="q-pill" data-cat="agent" data-val="Antigravity / Gemini 2.0 Pro" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">✨ Antigravity / Gemini 2.0</button>
                    <button class="q-pill" data-cat="agent" data-val="ChatGPT / OpenAI o3-mini" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🧠 OpenAI o3-mini</button>
                  </div>
                </div>

                <!-- Q2: Game Dimension & Visual Style -->
                <div class="q-row" style="margin-bottom:12px">
                  <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                    <span style="color:#fbbf24;font-weight:800">Q2: Game Dimension & Style</span>
                    <span style="font-size:10px;color:#64748b">— What graphical paradigm?</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    <button class="q-pill on" data-cat="dim" data-val="3D Low-Poly Stylized" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🧊 3D Low-Poly Stylized</button>
                    <button class="q-pill" data-cat="dim" data-val="2D Pixel Art (16-Bit Retro)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">👾 2D Pixel Art (16-Bit Retro)</button>
                    <button class="q-pill" data-cat="dim" data-val="2.5D Isometric Grid" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">📐 2.5D Isometric Grid</button>
                    <button class="q-pill" data-cat="dim" data-val="3D High-Fidelity PBR" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌄 3D High-Fidelity PBR</button>
                    <button class="q-pill" data-cat="dim" data-val="Procedural Text / MUD" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">📜 Procedural Text / MUD</button>
                  </div>
                </div>

                <!-- Q3: Engine & Programming Level -->
                <div class="q-row" style="margin-bottom:12px">
                  <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                    <span style="color:#fbbf24;font-weight:800">Q3: Engine & Programming Target</span>
                    <span style="font-size:10px;color:#64748b">— What tech stack and architectural depth?</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    <button class="q-pill on" data-cat="engine" data-val="Unity C# (Zero-GC Architecture)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">⚔️ Unity C# (Zero-GC Architecture)</button>
                    <button class="q-pill" data-cat="engine" data-val="Godot 4 (Strictly Typed GDScript)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🤖 Godot 4 (Strict GDScript)</button>
                    <button class="q-pill" data-cat="engine" data-val="Spawn / Three.js WebGPU Engine" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌐 Spawn / Three.js WebGPU</button>
                    <button class="q-pill" data-cat="engine" data-val="Unreal Engine 5 (C++ Gameplay Framework)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⚡ Unreal Engine 5 (C++)</button>
                    <button class="q-pill" data-cat="engine" data-val="Visual Scripting / Fast Prototype" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🧩 Visual Scripting / Prototype</button>
                  </div>
                </div>

                <!-- Q4: Gameplay Mechanics -->
                <div class="q-row" style="margin-bottom:12px">
                  <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                    <span style="color:#fbbf24;font-weight:800">Q4: Gameplay Core & Mechanics</span>
                    <span style="font-size:10px;color:#64748b">— What are the primary player systems?</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    <button class="q-pill on" data-cat="mech" data-val="Committed Stamina Combat, i-Frame Dodge & Boss Phases" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🗡️ Stamina Combat & Boss Phases</button>
                    <button class="q-pill" data-cat="mech" data-val="Cozy Day/Night Cycle, Crop Seasons, Grid Farming & NPC Life" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌾 Cozy Farm, Crops & NPC Life</button>
                    <button class="q-pill" data-cat="mech" data-val="Turn-Based Tactical Encounters, Branching Dialogue & Dice Rules" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🎲 Tactical Encounters & Dialogue</button>
                    <button class="q-pill" data-cat="mech" data-val="Destructible Voxel Blocks, Procedural Mining & Crafting Tiers" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⛏️ Voxel Mining & Crafting Tiers</button>
                    <button class="q-pill" data-cat="mech" data-val="Dynamic Flashlight Raycasting, Heartbeat Monitor & Sanity Drain" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🔦 Survival Horror & Sanity Drain</button>
                  </div>
                </div>

                <!-- Q5: Aesthetic Vibe & Asset Palette -->
                <div class="q-row" style="margin-bottom:4px">
                  <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                    <span style="color:#fbbf24;font-weight:800">Q5: Aesthetic Vibe & CC0 Palette</span>
                    <span style="font-size:10px;color:#64748b">— What mood and inspiration atmosphere?</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    <button class="q-pill on" data-cat="vibe" data-val="Dark Fantasy Medieval Castle & Bonfire Sparks" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🏰 Dark Fantasy Medieval Ruins</button>
                    <button class="q-pill" data-cat="vibe" data-val="Cozy Pastoral Dawn, Whispering Pines & Windmills" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌻 Cozy Pastoral Dawn & Pines</button>
                    <button class="q-pill" data-cat="vibe" data-val="Neon Cyberpunk Dystopia & Terminal Grid" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🏙️ Neon Cyberpunk & Terminal Grid</button>
                    <button class="q-pill" data-cat="vibe" data-val="Sunken Eldritch Fog & Cosmic Horror" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🐙 Sunken Eldritch Cosmic Fog</button>
                  </div>
                </div>

              </div>
            </div>\n\n            `;

html = html.substring(0, startIndex) + questionnaireHtml + html.substring(endIndex);
console.log('Replaced sparks bar with Evolving Questionnaire HTML');

// 2. Update 3D Viewport Title and Buttons for Meshy GLB
const oldVpLabel = "Low-Poly Stylized Rock #1";
if (html.includes(oldVpLabel)) {
  html = html.replace(
    'Low-Poly Stylized Rock #1 // Real-time directional lighting, face normals & ambient occlusion.',
    'Meshy 3D Asset // Real-time 9,721 Triangles, Directional Lighting & Orbit Shading.'
  );
  console.log('Updated 3D Viewport label to Meshy 3D Asset');
}

// Add Meshy / Rock toggle button in 3D viewport controls
const oldButtons = `<button id="btn-3d-wire" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">WIRE</button>
                      <button id="btn-3d-mesh" style="background:rgba(0,188,212,0.2);border:1px solid rgba(0,188,212,0.5);color:#00f0ff;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">MESH</button>`;

const newButtons = `<button id="btn-3d-model-toggle" style="background:rgba(168,85,247,0.25);border:1px solid rgba(168,85,247,0.6);color:#c084fc;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">MESHY GLB</button>
                      <button id="btn-3d-wire" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">WIRE</button>
                      <button id="btn-3d-mesh" style="background:rgba(0,188,212,0.2);border:1px solid rgba(0,188,212,0.5);color:#00f0ff;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">MESH</button>`;

if (html.includes(oldButtons)) {
  html = html.replace(oldButtons, newButtons);
  console.log('Added Meshy GLB toggle button to 3D controls');
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Saved updated app/index.html');
