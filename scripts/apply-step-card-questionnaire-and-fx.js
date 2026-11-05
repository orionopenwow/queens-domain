const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. ADD FAIRY MOTES CANVAS & EXE WINDOW FRAME TO BODY
if (!html.includes('id="fairy-motes-canvas"')) {
  const bodyInsert = `<canvas id="fairy-motes-canvas" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0"></canvas>
<div id="exe-window-frame"></div>`;

  html = html.replace('<body', '<body');
  // insert right after <body> tag
  const bodyTag = '<body';
  const bodyIdx = html.indexOf(bodyTag);
  const bodyCloseIdx = html.indexOf('>', bodyIdx) + 1;
  html = html.substring(0, bodyCloseIdx) + '\n' + bodyInsert + '\n' + html.substring(bodyCloseIdx);
  console.log('Inserted fairy-motes-canvas and exe-window-frame inside body');
}

// 2. ADD CSS FOR EXE-WINDOW-FRAME
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
const sparksEnd = html.indexOf('<!-- Unified Inspiration Drop & Detection Zone -->', sparksStart);

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
                      <div style="font-size:10px;color:#94a3b8">Multi-file codebase indexing and inline workspace tab completions.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="Antigravity / Gemini 2.0 Pro" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">✨ Antigravity / Gemini 2.0</div>
                      <div style="font-size:10px;color:#94a3b8">Massive context window with paired terminal execution & subagents.</div>
                    </div>
                    <div class="q-opt-card" data-cat="agent" data-val="ChatGPT / OpenAI o3-mini" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🧠 OpenAI o3-mini</div>
                      <div style="font-size:10px;color:#94a3b8">Deep algorithmic chain-of-thought planning and logic checks.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 2: Visual Style & Dimension -->
                <div class="q-step-card" id="q-card-2" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 2 of 5</span>
                      <span>What dimension and visual paradigm do you envision?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Defines camera perspective, animation matrices, and asset pipelines.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="dim" data-val="3D Low-Poly Stylized" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🧊 3D Low-Poly Stylized</div>
                      <div style="font-size:10px;color:#cbd5e1">Geometric facets, flat shading, fast frame rates and timeless retro charm.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="2D Pixel Art (16-Bit Retro)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">👾 2D Pixel Art (16-Bit Retro)</div>
                      <div style="font-size:10px;color:#94a3b8">16x16 tilemaps, sprite sheets, crisp nostalgic palette and walk cycles.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="2.5D Isometric Grid" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">📐 2.5D Isometric Grid</div>
                      <div style="font-size:10px;color:#94a3b8">Elevated angle, depth sorting, tactical awareness and clean diorama visuals.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="3D High-Fidelity PBR" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌄 3D High-Fidelity PBR</div>
                      <div style="font-size:10px;color:#94a3b8">Physically based materials, normal maps, roughness and dynamic lighting.</div>
                    </div>
                    <div class="q-opt-card" data-cat="dim" data-val="Procedural Text / MUD" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">📜 Procedural Text / MUD</div>
                      <div style="font-size:10px;color:#94a3b8">Pure simulation depth, ASCII maps, emergent systems and branching stories.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 3: Target Engine & Architecture -->
                <div class="q-step-card" id="q-card-3" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 3 of 5</span>
                      <span>Which engine & programming paradigm do you want?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Determines code structure. We enforce zero-GC allocations in 60Hz loops and clean state isolation.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="engine" data-val="Unity C# (Zero-GC Architecture)" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">⚔️ Unity C# (Zero-GC Architecture)</div>
                      <div style="font-size:10px;color:#cbd5e1">Pre-allocated pools, struct components, zero runtime stutter at 60Hz.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Godot 4 (Strictly Typed GDScript)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🤖 Godot 4 (Strict GDScript)</div>
                      <div style="font-size:10px;color:#94a3b8">Clean scene trees, typed signals, lightning-fast compilation and open source.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Spawn / Three.js WebGPU Engine" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌐 Spawn / Three.js WebGPU</div>
                      <div style="font-size:10px;color:#94a3b8">Declarative 128m cell scene files, pure ctx hooks and instant browser play.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Unreal Engine 5 (C++ Gameplay Framework)" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">⚡ Unreal Engine 5 (C++)</div>
                      <div style="font-size:10px;color:#94a3b8">Gameplay Ability System, Nanite, Lumen and high-performance physics.</div>
                    </div>
                    <div class="q-opt-card" data-cat="engine" data-val="Visual Scripting / Fast Prototype" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🧩 Visual Scripting / Prototype</div>
                      <div style="font-size:10px;color:#94a3b8">Node graphs, instant feedback and rapid mechanic exploration.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 4: Gameplay Core & Mechanics -->
                <div class="q-step-card" id="q-card-4" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 4 of 5</span>
                      <span>What are the primary gameplay mechanics?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      The core interaction loop that the agent will implement and test first.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="mech" data-val="Committed Stamina Combat, i-Frame Dodge & Boss Phases" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🗡️ Stamina Combat & Boss Phases</div>
                      <div style="font-size:10px;color:#cbd5e1">Deliberate animation locking, dodge rolls, stamina meters and telegraphs.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Cozy Day/Night Cycle, Crop Seasons, Grid Farming & NPC Life" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌾 Cozy Farm, Crops & NPC Life</div>
                      <div style="font-size:10px;color:#94a3b8">Seasonal clock, tile hoeing/watering, seed growth stages and villager routines.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Turn-Based Tactical Encounters, Branching Dialogue & Dice Rules" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🎲 Tactical Encounters & Dialogue</div>
                      <div style="font-size:10px;color:#94a3b8">Action point economy, grid range, hit chance math and branching dialogue.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Destructible Voxel Blocks, Procedural Mining & Crafting Tiers" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">⛏️ Voxel Mining & Crafting Tiers</div>
                      <div style="font-size:10px;color:#94a3b8">Cellular automata caves, harvestable ore veins and progressive recipes.</div>
                    </div>
                    <div class="q-opt-card" data-cat="mech" data-val="Dynamic Flashlight Raycasting, Heartbeat Monitor & Sanity Drain" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🔦 Survival Horror & Sanity Drain</div>
                      <div style="font-size:10px;color:#94a3b8">Cone lighting, audio cues, stalker AI, limited inventory and stress effects.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 5: Aesthetic Vibe & Asset Palette -->
                <div class="q-step-card" id="q-card-5" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Step 5 of 5</span>
                      <span>What aesthetic mood and CC0 asset palette do you want?</span>
                    </div>
                    <p style="font-size:11px;color:#94a3b8;margin:0 0 12px;line-height:1.4">
                      Atmospheric lighting, color harmony, and ready-to-use free CC0 asset packs.
                    </p>
                  </div>
                  
                  <div class="q-options-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:16px">
                    <div class="q-opt-card on" data-cat="vibe" data-val="Dark Fantasy Medieval Castle & Bonfire Sparks" style="padding:10px 14px;background:rgba(56,189,248,0.15);border:1.5px solid rgba(56,189,248,0.5);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:2px">🏰 Dark Fantasy Medieval Ruins</div>
                      <div style="font-size:10px;color:#cbd5e1">Weathered stone, iron embers, torchlight flickers and somber strings.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Cozy Pastoral Dawn, Whispering Pines & Windmills" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🌻 Cozy Pastoral Dawn & Pines</div>
                      <div style="font-size:10px;color:#94a3b8">Soft sunbeams, gentle birdsong, lush greenery and warm acoustic guitar.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Neon Cyberpunk Dystopia & Terminal Grid" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🏙️ Neon Cyberpunk & Terminal Grid</div>
                      <div style="font-size:10px;color:#94a3b8">Cyan/magenta bloom, rain-slicked concrete, synth drones and scanlines.</div>
                    </div>
                    <div class="q-opt-card" data-cat="vibe" data-val="Sunken Eldritch Fog & Cosmic Horror" style="padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;cursor:pointer;transition:all .15s ease">
                      <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:2px">🐙 Sunken Eldritch Cosmic Fog</div>
                      <div style="font-size:10px;color:#94a3b8">Murky deep waters, ancient monoliths, eerie silence and dissonant brass.</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 6: Consolidated Blueprint Review & Nudge -->
                <div class="q-step-card" id="q-card-6" style="display:none">
                  <div style="margin-bottom:12px">
                    <div style="font-size:14px;font-weight:800;color:#ffd700;margin-bottom:4px;display:flex;align-items:center;gap:8px">
                      <span style="background:rgba(251,191,36,0.15);padding:2px 8px;border-radius:6px;font-size:11px">Ready To Build</span>
                      <span>Verified Architecture Blueprint Compiled</span>
                    </div>
                    <p style="font-size:11.5px;color:#cbd5e1;margin:0 0 12px;line-height:1.4">
                      Here is your consolidated game plan. All 5 dimensions have been unified into a zero-technical-debt blueprint:
                    </p>
                  </div>
                  
                  <!-- Selected Answers Review Grid -->
                  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;margin-bottom:14px">
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
  console.log('Successfully applied Step-by-Step Card Questionnaire HTML');
}

fs.writeFileSync(filePath, html, 'utf8');
