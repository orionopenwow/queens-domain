const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Locate the Suggestions Grid to replace it with the Evolving Questionnaire
const oldSuggestionsStart = html.indexOf('<!-- Suggestions Grid -->');
const oldSuggestionsEnd = html.indexOf('<!-- Unified Inspiration Drop & Detection Zone -->', oldSuggestionsStart);

if (oldSuggestionsStart !== -1 && oldSuggestionsEnd !== -1) {
  const newQuestionnaireHtml = `<!-- Evolving Interactive Questionnaire Studio -->
            <div id="evolving-questionnaire-card" style="margin:16px 0 18px;text-align:left;background:rgba(8,12,18,0.92);border:1px solid rgba(56,189,248,0.25);border-radius:14px;padding:16px 18px;box-shadow:0 8px 30px rgba(0,0,0,0.6)">
              
              <!-- Questionnaire Header -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:10px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:14px">⚡</span>
                  <div>
                    <div style="font-size:12px;font-weight:800;color:#38bdf8;letter-spacing:.05em">EVOLVING GAME ARCHITECTURE QUESTIONNAIRE</div>
                    <div style="font-size:10.5px;color:#94a3b8">Answers automatically compile and evolve your master AI prompt live</div>
                  </div>
                </div>
                <div style="display:flex;gap:4px">
                  <span class="q-step-indicator on" data-step="1" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid rgba(56,189,248,0.4)">1. AGENT</span>
                  <span class="q-step-indicator" data-step="2" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1)">2. STYLE</span>
                  <span class="q-step-indicator" data-step="3" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1)">3. ENGINE</span>
                  <span class="q-step-indicator" data-step="4" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1)">4. MECHANICS</span>
                  <span class="q-step-indicator" data-step="5" style="font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1)">5. VIBE</span>
                </div>
              </div>

              <!-- Question 1: AI Agent / Target LLM -->
              <div class="q-group" id="q-group-1" style="margin-bottom:12px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                  <span style="color:#fbbf24">Step 1:</span> Which AI Agent will you use to build this game?
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <button class="q-opt on" data-q="agent" data-val="Claude 3.5 Sonnet / Claude Code" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🤖 Claude 3.5 Sonnet / Claude Code</button>
                  <button class="q-opt" data-q="agent" data-val="Own Local LLM (Ollama / Qwen 2.5 Coder)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">💻 Own Local LLM (Ollama / Qwen)</button>
                  <button class="q-opt" data-q="agent" data-val="Cursor / Windsurf AI IDE" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⚡ Cursor / Windsurf IDE</button>
                  <button class="q-opt" data-q="agent" data-val="Antigravity / Gemini 2.0 Pro" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">✨ Antigravity / Gemini 2.0</button>
                  <button class="q-opt" data-q="agent" data-val="ChatGPT / OpenAI o3-mini" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🧠 OpenAI o3-mini</button>
                </div>
              </div>

              <!-- Question 2: Game Dimension & Visual Style -->
              <div class="q-group" id="q-group-2" style="margin-bottom:12px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                  <span style="color:#fbbf24">Step 2:</span> What dimension and visual style do you envision?
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <button class="q-opt on" data-q="dim" data-val="3D Low-Poly Stylized" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🧊 3D Low-Poly Stylized</button>
                  <button class="q-opt" data-q="dim" data-val="2D Pixel Art (16-Bit Retro)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">👾 2D Pixel Art (16-Bit Retro)</button>
                  <button class="q-opt" data-q="dim" data-val="2.5D Isometric Grid" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">📐 2.5D Isometric Grid</button>
                  <button class="q-opt" data-q="dim" data-val="3D High-Fidelity PBR" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌄 3D High-Fidelity PBR</button>
                  <button class="q-opt" data-q="dim" data-val="Procedural Text / MUD" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">📜 Procedural Text / MUD</button>
                </div>
              </div>

              <!-- Question 3: Engine Architecture & Programming Level -->
              <div class="q-group" id="q-group-3" style="margin-bottom:12px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                  <span style="color:#fbbf24">Step 3:</span> Which engine & programming paradigm do you want?
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <button class="q-opt on" data-q="engine" data-val="Unity C# (Zero-GC Architecture)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">⚔️ Unity C# (Zero-GC Architecture)</button>
                  <button class="q-opt" data-q="engine" data-val="Godot 4 (Strictly Typed GDScript)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🤖 Godot 4 (Strict GDScript)</button>
                  <button class="q-opt" data-q="engine" data-val="Spawn / Three.js WebGPU Engine" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌐 Spawn / Three.js WebGPU</button>
                  <button class="q-opt" data-q="engine" data-val="Unreal Engine 5 (C++ Gameplay Framework)" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⚡ Unreal Engine 5 (C++)</button>
                  <button class="q-opt" data-q="engine" data-val="Visual Scripting / Fast Prototype" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🧩 Visual Scripting / Prototype</button>
                </div>
              </div>

              <!-- Question 4: Gameplay Core & Mechanics -->
              <div class="q-group" id="q-group-4" style="margin-bottom:12px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                  <span style="color:#fbbf24">Step 4:</span> What are the primary gameplay mechanics?
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <button class="q-opt on" data-q="mechanic" data-val="Committed Stamina Combat, i-Frame Dodge & Boss Phases" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🗡️ Stamina Combat & Boss Phases</button>
                  <button class="q-opt" data-q="mechanic" data-val="Cozy Day/Night Cycle, Crop Seasons, Grid Farming & NPC Life" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌾 Cozy Farm, Crops & NPC Life</button>
                  <button class="q-opt" data-q="mechanic" data-val="Turn-Based Tactical Encounters, Branching Dialogue & Dice Rules" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🎲 Tactical Encounters & Dialogue</button>
                  <button class="q-opt" data-q="mechanic" data-val="Destructible Voxel Blocks, Procedural Mining & Crafting Tiers" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">⛏️ Voxel Mining & Crafting Tiers</button>
                  <button class="q-opt" data-q="mechanic" data-val="Dynamic Flashlight Raycasting, Heartbeat Monitor & Sanity Drain" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🔦 Survival Horror & Sanity Drain</button>
                </div>
              </div>

              <!-- Question 5: Inspiration, Assets & Vibe -->
              <div class="q-group" id="q-group-5" style="margin-bottom:6px">
                <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                  <span style="color:#fbbf24">Step 5:</span> What aesthetic vibe & inspiration assets do you want?
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <button class="q-opt on" data-q="vibe" data-val="Dark Fantasy Medieval Castle & Bonfire Sparks" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(56,189,248,0.22);color:#38bdf8;border:1px solid rgba(56,189,248,0.5);cursor:pointer;transition:all .15s ease">🏰 Dark Fantasy Medieval Ruins</button>
                  <button class="q-opt" data-q="vibe" data-val="Cozy Pastoral Dawn, Whispering Pines & Windmills" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🌻 Cozy Pastoral Dawn & Pines</button>
                  <button class="q-opt" data-q="vibe" data-val="Neon Cyberpunk Dystopia & Terminal Grid" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🏙️ Neon Cyberpunk & Terminal Grid</button>
                  <button class="q-opt" data-q="vibe" data-val="Sunken Eldritch Fog & Cosmic Horror" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all .15s ease">🐙 Sunken Eldritch Cosmic Fog</button>
                </div>
              </div>

            </div>`;

  html = html.substring(0, oldSuggestionsStart) + newQuestionnaireHtml + '\n            ' + html.substring(oldSuggestionsEnd);
  console.log('Successfully replaced static suggestions with Evolving Questionnaire UI');
} else {
  console.log('Error locating suggestions grid');
}

fs.writeFileSync(filePath, html, 'utf8');
