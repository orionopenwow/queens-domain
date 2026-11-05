const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Check / Add canvas and exe-window-frame if not present
if (!html.includes('id="fairy-motes-canvas"')) {
  const bodyInsert = `<canvas id="fairy-motes-canvas" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0"></canvas>
<div id="exe-window-frame"></div>`;

  const bodyIdx = html.indexOf('<body');
  const bodyCloseIdx = html.indexOf('>', bodyIdx) + 1;
  html = html.substring(0, bodyCloseIdx) + '\n' + bodyInsert + '\n' + html.substring(bodyCloseIdx);
  console.log('Inserted fairy-motes-canvas and exe-window-frame');
}

// 2. Check / Add CSS for exe-window-frame
const exeFrameCss = `
  /* Fixed pixel-art wooden vine frame for the outer edge of the entire .exe window */
  #exe-window-frame {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    border: 11px solid transparent !important;
    border-image-source: url('vine_frame.png') !important;
    border-image-slice: 30 26 26 25 !important;
    border-image-width: 11px !important;
    border-image-repeat: round !important;
    border-image-outset: 0 !important;
    pointer-events: none !important;
    z-index: 99998 !important;
    box-sizing: border-box !important;
  }
`;

if (!html.includes('#exe-window-frame')) {
  html = html.replace('</style>', exeFrameCss + '\n</style>');
}

// 3. RESTRUCTURE QUESTIONNAIRE INTO STEP-BY-STEP CARD PANEL
const sparksStart = html.indexOf('<div id="inspiration-sparks-bar"');
const sparksEnd = html.indexOf('<div id="zen-drop-zone"', sparksStart);

if (sparksStart !== -1 && sparksEnd !== -1) {
  const stepCardQuestionnaireHtml = `<div id="inspiration-sparks-bar" style="max-width:760px;margin:12px auto 16px;text-align:left">
              
              <!-- Evolving Questionnaire Card Panel (One Step At A Time) -->
              <div id="q-card-container" style="background:rgba(8,12,18,0.96);border:1.5px solid rgba(56,189,248,0.35);border-radius:14px;padding:18px 22px;box-shadow:0 12px 36px rgba(0,0,0,0.7);position:relative">
                
                <!-- Questionnaire Navigation Header -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;flex-wrap:wrap;gap:8px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">⚡</span>
                    <div>
                      <div style="font-size:12.5px;font-weight:800;color:#38bdf8;letter-spacing:.06em">GAME ARCHITECTURE QUESTIONNAIRE</div>
                      <div style="font-size:10.5px;color:#94a3b8">Answer one simple question at a time to evolve your master AI prompt</div>
                    </div>
                  </div>
                  
                  <!-- Step Jump Badges -->
                  <div id="q-step-badges" style="display:flex;gap:4px;flex-wrap:wrap">
                    <span class="q-badge on" data-step="1" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.6);cursor:pointer">1. AGENT</span>
                    <span class="q-badge" data-step="2" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.12);cursor:pointer">2. STYLE</span>
                    <span class="q-badge" data-step="3" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.12);cursor:pointer">3. ENGINE</span>
                    <span class="q-badge" data-step="4" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.12);cursor:pointer">4. MECHANICS</span>
                    <span class="q-badge" data-step="5" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.12);cursor:pointer">5. VIBE</span>
                    <span class="q-badge" data-step="6" style="font-size:9.5px;font-weight:700;padding:3px 8px;border-radius:12px;background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.3);cursor:pointer">6. SUMMARY</span>
                  </div>
                </div>

                <!-- CARD 1: AI Agent / Target LLM -->
                <div class="q-step-card" id="q-card-1" style="display:block">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 1 of 5</span>
                      <span>Which AI Agent will construct this game with you?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Select your primary AI model or development assistant. Queen's Domain formats architecture directives and code prompts specifically tuned for this agent.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="agent" data-val="Claude 3.5 Sonnet / Claude Code" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🤖 Claude 3.5 Sonnet / Claude Code</div>
                      <div style="font-size:10px;color:#cbd5e1">Industry standard for reasoning, clean refactoring & autonomous coding.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="Own Local LLM (Ollama / Qwen 2.5 Coder)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">💻 Own Local LLM (Ollama / Qwen)</div>
                      <div style="font-size:10px;color:#94a3b8">100% private, offline-capable code execution on your GPU.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="Cursor / Windsurf AI IDE" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">⚡ Cursor / Windsurf IDE</div>
                      <div style="font-size:10px;color:#94a3b8">Inline repository completions & multi-file composer workflows.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="Antigravity / Gemini 2.0 Pro" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">✨ Antigravity / Gemini 2.0</div>
                      <div style="font-size:10px;color:#94a3b8">Massive context window with native multimodal and tool orchestration.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="ChatGPT / OpenAI o3-mini" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🧠 OpenAI o3-mini</div>
                      <div style="font-size:10px;color:#94a3b8">High-speed STEM logic, algorithmic proofs & state machine generation.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 2: Visual Style & Dimension -->
                <div class="q-step-card" id="q-card-2" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 2 of 5</span>
                      <span>What is your game's visual dimension and art style?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Defines the camera projection, render pipeline, and texture/mesh budgets for your assets.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="dim" data-val="3D Low-Poly Stylized" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🧊 3D Low-Poly Stylized</div>
                      <div style="font-size:10px;color:#cbd5e1">Flat-shaded low-poly meshes (.glb/.obj), Kenney assets, zero heavy textures.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="2D Pixel Art (16-Bit Retro)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">👾 2D Pixel Art (16-Bit Retro)</div>
                      <div style="font-size:10px;color:#94a3b8">Crisp spritesheets, animated 4-frame walks, tilemaps & SNES nostalgia.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="2.5D Isometric Grid" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">📐 2.5D Isometric Grid</div>
                      <div style="font-size:10px;color:#94a3b8">Dimetric/isometric depth, grid-based pathfinding & tactical clarity.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="3D High-Fidelity PBR" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌄 3D High-Fidelity PBR</div>
                      <div style="font-size:10px;color:#94a3b8">Normal maps, metallic/roughness workflows, post-processing & HDR.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="Procedural Text / MUD" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">📜 Procedural Text / MUD</div>
                      <div style="font-size:10px;color:#94a3b8">Pure ASCII/RichText narrative parser, deep simulation & zero rendering overhead.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 3: Engine Architecture -->
                <div class="q-step-card" id="q-card-3" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 3 of 5</span>
                      <span>Which Engine & Programming Architecture will you target?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Determines code patterns, garbage-collection management, folder layout, and build automation.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="engine" data-val="Unity C# (Zero-GC Architecture)" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">⚔️ Unity C# (Zero-GC Architecture)</div>
                      <div style="font-size:10px;color:#cbd5e1">Struct-based data pipelines, object pooling, clean MonoBehaviour lifecycle.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Godot 4 (Strictly Typed GDScript)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🤖 Godot 4 (Strict GDScript)</div>
                      <div style="font-size:10px;color:#94a3b8">Node composition trees, static typing (&apos;var x: int&apos;), lightning-fast lightweight builds.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Spawn / Three.js WebGPU Engine" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌐 Spawn / Three.js WebGPU</div>
                      <div style="font-size:10px;color:#94a3b8">1-click browser deployment, WebGPU shaders, zero install required for players.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Unreal Engine 5 (C++ Gameplay Framework)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">⚡ Unreal Engine 5 (C++)</div>
                      <div style="font-size:10px;color:#94a3b8">UObject memory safety, Gameplay Ability System (GAS) & Nanite geometry.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Visual Scripting / Fast Prototype" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🧩 Visual Scripting / Prototype</div>
                      <div style="font-size:10px;color:#94a3b8">Event graphs, high-velocity iteration, ideal for concept proofs and game jams.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 4: Gameplay Mechanics -->
                <div class="q-step-card" id="q-card-4" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 4 of 5</span>
                      <span>What is your primary player gameplay loop?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Defines player controllers, state machines, win/loss conditions, and physics interactions.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="mech" data-val="Committed Stamina Combat, i-Frame Dodge & Boss Phases" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🗡️ Stamina Combat & Boss Phases</div>
                      <div style="font-size:10px;color:#cbd5e1">Action RPG feel: attack windups, recovery frames, lock-on & posture meters.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Cozy Day/Night Cycle, Crop Seasons, Grid Farming & NPC Life" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌾 Cozy Farm, Crops & NPC Life</div>
                      <div style="font-size:10px;color:#94a3b8">Tile hoeing, seed growth timers, watering grids, villager gift schedules.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Turn-Based Tactical Encounters, Branching Dialogue & Dice Rules" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🎲 Tactical Encounters & Dialogue</div>
                      <div style="font-size:10px;color:#94a3b8">Initiative rolls, grid moves, cover percentages & narrative node trees.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Destructible Voxel Blocks, Procedural Mining & Crafting Tiers" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">⛏️ Voxel Mining & Crafting Tiers</div>
                      <div style="font-size:10px;color:#94a3b8">Chunk meshing, raycast block breaking, inventory grids & furnace recipes.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Dynamic Flashlight Raycasting, Heartbeat Monitor & Sanity Drain" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🔦 Survival Horror & Sanity Drain</div>
                      <div style="font-size:10px;color:#94a3b8">Limited battery life, shadow lurking AI, hallucination shaders & hiding closets.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 5: Aesthetic Vibe -->
                <div class="q-step-card" id="q-card-5" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 5 of 5</span>
                      <span>What aesthetic mood and atmosphere inspires this world?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Injects ambient soundscapes, lighting palettes, and creative worldbuilding motifs.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="vibe" data-val="Dark Fantasy Medieval Castle & Bonfire Sparks" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🏰 Dark Fantasy Medieval Ruins</div>
                      <div style="font-size:10px;color:#cbd5e1">Crumbling stone keeps, torch flicker, eerie chanting & melancholic bonfires.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Cozy Pastoral Dawn, Whispering Pines & Windmills" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌻 Cozy Pastoral Dawn & Pines</div>
                      <div style="font-size:10px;color:#94a3b8">Golden sunbeams, acoustic guitars, fluttering leaves & tranquil streams.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Neon Cyberpunk Dystopia & Terminal Grid" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🏙️ Neon Cyberpunk & Terminal Grid</div>
                      <div style="font-size:10px;color:#94a3b8">Rain-slicked asphalt, flickering magenta holosigns, synth basslines & dark alleys.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Sunken Eldritch Fog & Cosmic Horror" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🐙 Sunken Eldritch Cosmic Fog</div>
                      <div style="font-size:10px;color:#94a3b8">Bioluminescent deep sea depths, non-Euclidean angles, distant horn echoes.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 6: Master Architecture Blueprint & Summary -->
                <div class="q-step-card" id="q-card-6" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#fbbf24;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="background:rgba(251,191,36,0.2);padding:2px 8px;border-radius:6px;font-size:11px">Complete</span>
                      <span>Game Architecture Blueprint Configured</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Here is the architectural foundation compiled from your selections. Your AI Agent prompt below is ready to execute.
                    </p>
                  </div>
                  
                  <!-- Selected Profile Summary Grid -->
                  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;margin-bottom:14px">
                    <div>
                      <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase">1. AI AGENT</div>
                      <div id="q-sum-agent" style="font-size:11px;font-weight:700;color:#38bdf8">Claude 3.5 Sonnet</div>
                    </div>
                    <div>
                      <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase">2. STYLE &amp; DIMENSION</div>
                      <div id="q-sum-dim" style="font-size:11px;font-weight:700;color:#38bdf8">3D Low-Poly Stylized</div>
                    </div>
                    <div>
                      <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase">3. ENGINE ARCHITECTURE</div>
                      <div id="q-sum-engine" style="font-size:11px;font-weight:700;color:#38bdf8">Unity C# Zero-GC</div>
                    </div>
                    <div>
                      <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase">4. GAMEPLAY CORE</div>
                      <div id="q-sum-mech" style="font-size:11px;font-weight:700;color:#38bdf8">Stamina Combat &amp; Bosses</div>
                    </div>
                    <div>
                      <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase">5. VIBE &amp; PALETTE</div>
                      <div id="q-sum-vibe" style="font-size:11px;font-weight:700;color:#38bdf8">Dark Fantasy Ruins</div>
                    </div>
                  </div>

                  <!-- Nudge in Direction -->
                  <div style="padding:10px 14px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.3);border-radius:8px;margin-bottom:14px">
                    <div style="font-size:11px;font-weight:700;color:#38bdf8;margin-bottom:2px">🎯 Recommended Next Step:</div>
                    <div style="font-size:10.5px;color:#cbd5e1;line-height:1.4">
                      Copy the Master Prompt below into your AI Agent (or click <strong>Download Starter Bundle (.zip)</strong>) to immediately implement <strong>Step 1</strong> of the modular 32-step game foundation.
                    </div>
                  </div>
                </div>

                <!-- Step Card Bottom Controls (Back, Next, Indicator) -->
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:12px">
                  <button id="q-btn-prev" style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;display:none;transition:all .15s ease">← Previous Question</button>
                  <div id="q-step-hint" style="font-size:10.5px;color:#94a3b8;font-weight:600">Click any option to lock choice &amp; continue</div>
                  <button id="q-btn-next" style="padding:6px 16px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(56,189,248,0.25);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">Next Question →</button>
                </div>

              </div>
            </div>`;

  html = html.substring(0, sparksStart) + stepCardQuestionnaireHtml + '\n            ' + html.substring(sparksEnd);
  console.log('Successfully replaced questionnaire with step-by-step card panel');
} else {
  console.log('sparksStart or sparksEnd not found:', { sparksStart, sparksEnd });
}

// 4. ADD JS LOGIC FOR FAIRY MOTES AND STEP CARDS
const jsLogic = `
  // --- Fairy Motes Animation Background ---
  (function initFairyMotes() {
    const canvas = document.getElementById('fairy-motes-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const motes = [];
    const colors = [
      { r: 251, g: 191, b: 36 },  // Warm fairy gold
      { r: 56,  g: 189, b: 248 }, // Celestial cyan
      { r: 167, g: 139, b: 250 }, // Arcane violet
      { r: 52,  g: 211, b: 153 }  // Emerald wisp
    ];

    for (let i = 0; i < 20; i++) {
      const c = colors[i % colors.length];
      motes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 1.5 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: 0.3 + Math.random() * 0.4,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        color: c
      });
    }

    function animateMotes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.phase += m.pulseSpeed;
        const curAlpha = Math.max(0.1, Math.min(0.8, m.alpha + Math.sin(m.phase) * 0.22));

        m.x += m.vx + Math.sin(m.phase * 0.7) * 0.25;
        m.y += m.vy + Math.cos(m.phase * 0.7) * 0.25;

        if (m.x < -20) m.x = canvas.width + 20;
        if (m.x > canvas.width + 20) m.x = -20;
        if (m.y < -20) m.y = canvas.height + 20;
        if (m.y > canvas.height + 20) m.y = -20;

        // Outer glow aura
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 4.5);
        glow.addColorStop(0, 'rgba(' + m.color.r + ',' + m.color.g + ',' + m.color.b + ',' + curAlpha + ')');
        glow.addColorStop(0.4, 'rgba(' + m.color.r + ',' + m.color.g + ',' + m.color.b + ',' + (curAlpha * 0.4) + ')');
        glow.addColorStop(1, 'rgba(' + m.color.r + ',' + m.color.g + ',' + m.color.b + ', 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (curAlpha * 0.9) + ')';
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animateMotes);
    }

    requestAnimationFrame(animateMotes);
  })();

  // --- Step-by-Step Card Questionnaire Controller ---
  (function initStepCardQuestionnaire() {
    let currentStep = 1;
    const totalSteps = 6;
    const hints = [
      '',
      'Select your target AI agent to calibrate architecture and syntax prompt',
      'Select visual dimension & graphics pipeline',
      'Select game engine target & coding architecture',
      'Select core gameplay loop & primary player mechanics',
      'Select aesthetic atmosphere, lighting & asset palette',
      'Architecture blueprint configured! Ready for generation'
    ];

    function updateSummary() {
      const qSumAgent = document.getElementById('q-sum-agent');
      const qSumDim = document.getElementById('q-sum-dim');
      const qSumEngine = document.getElementById('q-sum-engine');
      const qSumMech = document.getElementById('q-sum-mech');
      const qSumVibe = document.getElementById('q-sum-vibe');

      if (typeof state !== 'undefined') {
        if (qSumAgent) qSumAgent.textContent = state.agent ? state.agent.split('/')[0].trim() : 'Claude 3.5 Sonnet';
        if (qSumDim) qSumDim.textContent = state.dim || '3D Low-Poly Stylized';
        if (qSumEngine) qSumEngine.textContent = state.engine ? state.engine.split('(')[0].trim() : 'Unity C#';
        if (qSumMech) qSumMech.textContent = state.mech ? state.mech.split(',')[0].trim() : 'Stamina Combat';
        if (qSumVibe) qSumVibe.textContent = state.vibe ? state.vibe.split('&')[0].trim() : 'Dark Fantasy Ruins';
      }
    }

    function goToStep(step) {
      if (step < 1) step = 1;
      if (step > totalSteps) step = totalSteps;
      currentStep = step;

      // Update Card Visibility
      for (let s = 1; s <= totalSteps; s++) {
        const card = document.getElementById('q-card-' + s);
        if (card) {
          card.style.display = (s === currentStep) ? 'block' : 'none';
        }
      }

      // Update Badges
      const badges = document.querySelectorAll('#q-step-badges .q-badge');
      badges.forEach(b => {
        const stepNum = parseInt(b.getAttribute('data-step'), 10);
        if (stepNum === currentStep) {
          b.classList.add('on');
          b.style.background = 'rgba(56,189,248,0.25)';
          b.style.color = '#38bdf8';
          b.style.borderColor = 'rgba(56,189,248,0.6)';
        } else if (stepNum < currentStep) {
          b.classList.remove('on');
          b.style.background = 'rgba(56,189,248,0.08)';
          b.style.color = '#7dd3fc';
          b.style.borderColor = 'rgba(56,189,248,0.2)';
        } else {
          b.classList.remove('on');
          b.style.background = 'rgba(255,255,255,0.05)';
          b.style.color = '#64748b';
          b.style.borderColor = 'rgba(255,255,255,0.12)';
        }
      });

      // Update Buttons & Hint
      const btnPrev = document.getElementById('q-btn-prev');
      const btnNext = document.getElementById('q-btn-next');
      const hintEl = document.getElementById('q-step-hint');

      if (btnPrev) {
        btnPrev.style.display = (currentStep > 1) ? 'inline-block' : 'none';
      }

      if (btnNext) {
        if (currentStep < totalSteps) {
          btnNext.textContent = 'Next Question →';
          btnNext.style.background = 'rgba(56,189,248,0.25)';
          btnNext.style.color = '#38bdf8';
          btnNext.style.borderColor = 'rgba(56,189,248,0.5)';
        } else {
          btnNext.textContent = '⚡ Copy Master Prompt';
          btnNext.style.background = 'rgba(251,191,36,0.2)';
          btnNext.style.color = '#fbbf24';
          btnNext.style.borderColor = 'rgba(251,191,36,0.5)';
        }
      }

      if (hintEl && hints[currentStep]) {
        hintEl.textContent = hints[currentStep];
      }

      if (currentStep === totalSteps) {
        updateSummary();
        if (typeof compileMasterPrompt === 'function') {
          compileMasterPrompt();
        }
      }
    }

    // Attach Next / Prev Listeners
    const btnPrev = document.getElementById('q-btn-prev');
    const btnNext = document.getElementById('q-btn-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        goToStep(currentStep - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        } else {
          const out = document.getElementById('dock-preview');
          if (out) {
            out.scrollIntoView({ behavior: 'smooth', block: 'center' });
            out.focus();
            if (navigator.clipboard && out.value) {
              navigator.clipboard.writeText(out.value).catch(() => {});
            }
          }
        }
      });
    }

    // Attach Badge Click Listeners
    const badges = document.querySelectorAll('#q-step-badges .q-badge');
    badges.forEach(b => {
      b.addEventListener('click', () => {
        const s = parseInt(b.getAttribute('data-step'), 10);
        if (s) goToStep(s);
      });
    });

    // Attach Option Card Click Listeners
    const optCards = document.querySelectorAll('.q-opt-card');
    optCards.forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-cat');
        const val = card.getAttribute('data-val');
        if (!cat || !val) return;

        // Unselect siblings
        const parentGrid = card.closest('.q-options-grid');
        if (parentGrid) {
          parentGrid.querySelectorAll('.q-opt-card').forEach(c => {
            c.classList.remove('on');
            c.style.background = 'rgba(255,255,255,0.04)';
            c.style.borderColor = 'rgba(255,255,255,0.12)';
            const titleEl = c.querySelector('div');
            if (titleEl) titleEl.style.color = '#f1f5f9';
          });
        }

        // Select clicked card
        card.classList.add('on');
        card.style.background = 'rgba(56,189,248,0.15)';
        card.style.borderColor = 'rgba(56,189,248,0.5)';
        const activeTitleEl = card.querySelector('div');
        if (activeTitleEl) activeTitleEl.style.color = '#38bdf8';

        if (typeof state !== 'undefined') {
          state[cat] = val;
          const decQuery = document.getElementById('dec-query');
          if (decQuery && (!decQuery.value || decQuery.value.includes('with') || decQuery.value.includes('3D') || decQuery.value.includes('2D'))) {
            decQuery.value = state.dim.split(' ')[0] + ' ' + state.vibe.split(' ')[0] + ' with ' + state.mech.split(',')[0].toLowerCase();
            state.userQuery = decQuery.value;
          }
          if (typeof compileMasterPrompt === 'function') {
            compileMasterPrompt();
          }
        }

        // Smooth auto-advance to next question
        if (currentStep < totalSteps) {
          setTimeout(() => {
            goToStep(currentStep + 1);
          }, 240);
        } else {
          updateSummary();
        }
      });
    });

    // Initialize step 1
    goToStep(1);
  })();
`;

if (!html.includes('initStepCardQuestionnaire')) {
  // Insert inside the main <script> tag before </script>
  const scriptEndIdx = html.lastIndexOf('</script>');
  if (scriptEndIdx !== -1) {
    html = html.substring(0, scriptEndIdx) + '\n' + jsLogic + '\n' + html.substring(scriptEndIdx);
    console.log('Inserted JS controller for fairy motes and step-by-step questionnaire');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated app/index.html');
