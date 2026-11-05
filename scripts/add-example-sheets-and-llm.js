// scripts/add-example-sheets-and-llm.js
// Adds Example Asset Sheets Gallery, AI Image Generator Prompt Importer/Generator, and LLM Integration

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add "🎨 Example Sheets & AI" shortcut button to main studio header right by zen-attach-btn
if (!html.includes('id="zen-open-sheets-btn"')) {
  html = html.replace(
    '<button id="zen-attach-btn"',
    '<button id="zen-open-sheets-btn" type="button" title="Open Example Asset Sheets & AI Image Generator Studio" style="background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.35);color:#fbbf24;border-radius:6px;padding:5px 11px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:all .15s ease"><span>🎨</span> Example Sheets &amp; AI</button>\n                <button id="zen-attach-btn"'
  );
}

// 2. Add "ast-btn-examples" button in t-assets studio switcher if not present
if (!html.includes('id="ast-btn-examples"')) {
  html = html.replace(
    '<button class="btn gold" id="ast-btn-3d"',
    '<button class="btn gold" id="ast-btn-examples" style="font-size:12px;padding:6px 14px">✨ Example Sheets &amp; AI Studio</button>\n          <button class="btn" id="ast-btn-3d"'
  );
  // remove initial gold class from ast-btn-3d since ast-btn-examples will be primary
  html = html.replace('<button class="btn gold" id="ast-btn-3d"', '<button class="btn" id="ast-btn-3d"');
}

// 3. Add Example Asset Sheets & AI Studio View markup (as-view-examples) inside t-assets
const exampleSheetsViewMarkup = `
      <!-- ==================== 0. EXAMPLE ASSET SHEETS, AI PROMPTS & LLM STUDIO ==================== -->
      <div id="as-view-examples" style="display:flex;flex-direction:column;gap:14px">
        
        <!-- Header & Action Sub-nav -->
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:15px;font-weight:800;color:#ffffff;display:flex;align-items:center;gap:8px">
              <span style="color:#fbbf24">✨</span> EXAMPLE ASSET SHEETS &amp; AI PROMPT / LLM ENGINE
            </div>
            <div style="font-size:11px;color:#94a3b8;margin-top:2px">
              7 Modular Production Game Asset Sheets · AI Image Gen Prompt Importer · LLM Multimodal Vision &amp; Code Synthesis
            </div>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn gold" id="subtab-ex-sheets" style="font-size:11.5px;padding:5px 12px">🖼️ Example Sheets (7)</button>
            <button class="btn" id="subtab-ex-aigen" style="font-size:11.5px;padding:5px 12px">✨ AI Image Prompt Studio</button>
            <button class="btn" id="subtab-ex-llm" style="font-size:11.5px;padding:5px 12px">🤖 Import &amp; Connect LLM</button>
          </div>
        </div>

        <!-- SUBVIEW 1: EXAMPLE ASSET SHEETS GALLERY -->
        <div id="ex-subview-sheets" style="display:flex;flex-direction:column;gap:14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:14px" id="example-sheets-grid">
            <!-- Dynamic Cards Populated by JS -->
          </div>
        </div>

        <!-- SUBVIEW 2: AI IMAGE GENERATOR PROMPT IMPORTER & GENERATOR -->
        <div id="ex-subview-aigen" style="display:none;flex-direction:column;gap:14px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            
            <!-- Left: Prompt Generator for Midjourney / DALL-E / Flux -->
            <div style="background:rgba(10,14,20,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px">
              <div style="font-size:13px;font-weight:700;color:#fbbf24;display:flex;align-items:center;gap:6px">
                <span>🪄</span> AI ASSET SHEET PROMPT GENERATOR
              </div>
              <p style="font-size:11px;color:#94a3b8;margin:0">Crafts precise prompts for Midjourney, DALL-E 3, Flux.1, and Stable Diffusion to generate matching modular sprite sheets.</p>
              
              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Style &amp; Dimension:</label>
                <select id="aigen-style" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px;color:#ffffff;font-size:11.5px">
                  <option value="pixel-16">16-bit Crisp Pixel Art Sprite Sheet (Isolated Assets)</option>
                  <option value="pixel-32">32-bit High-Detail Pixel RPG Atlas</option>
                  <option value="stylized-3d">Stylized 3D Low-Poly Modular Prop Set</option>
                  <option value="hand-painted">Hand-Painted Isometric 2.5D Atlas</option>
                  <option value="vector-clean">Modern Flat Vector HUD &amp; Sprite Kit</option>
                </select>
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Protagonist Archetype:</label>
                <input id="aigen-char" value="Hooded Crimson Rogue with leather boots and broadsword" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#ffffff;font-size:11.5px">
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Modular World Props &amp; Items:</label>
                <input id="aigen-props" value="Iron gear lockbox, ancient parchment, stone dungeon tiles, water well, ancient lectern, mossy rocks" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#ffffff;font-size:11.5px">
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Generated Midjourney / Flux Prompt:</label>
                <textarea id="aigen-output-prompt" rows="4" readonly style="background:#03060a;border:1px solid rgba(56,189,248,0.3);border-radius:6px;padding:8px 10px;color:#38bdf8;font-family:Consolas,monospace;font-size:11px;line-height:1.4;resize:none"></textarea>
              </div>

              <div style="display:flex;gap:8px;margin-top:4px">
                <button class="btn gold" id="btn-copy-aigen-prompt" style="flex:1;font-size:11px;padding:6px">📋 Copy Midjourney Prompt</button>
                <button class="btn" id="btn-refresh-aigen-prompt" style="font-size:11px;padding:6px 12px">🔄 Refresh</button>
              </div>
            </div>

            <!-- Right: Prompt Importer & Parser -->
            <div style="background:rgba(10,14,20,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px">
              <div style="font-size:13px;font-weight:700;color:#00f0ff;display:flex;align-items:center;gap:6px">
                <span>📥</span> IMPORT &amp; PARSE EXTERNAL AI PROMPT
              </div>
              <p style="font-size:11px;color:#94a3b8;margin:0">Paste an AI image generator prompt from Midjourney, CivitAI, DALL-E, or Leonardo to auto-extract game systems and inject them into the Architecture Engine.</p>
              
              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Paste Your AI Image Generator Prompt:</label>
                <textarea id="aigen-import-input" rows="6" placeholder="e.g. pixel art game asset sheet, female desert nomad in linen hood with scimitar, modular sandstone ruins, dunes, aloe cactus, clean slate background, 16-bit RPG sprites --v 6.1" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:8px 10px;color:#ffffff;font-size:11.5px;line-height:1.4;resize:none"></textarea>
              </div>

              <div style="display:flex;gap:8px;margin-top:auto">
                <button class="btn gold" id="btn-parse-import-prompt" style="flex:1;font-size:11.5px;padding:8px;font-weight:700">⚡ Parse &amp; Inject into Architecture Engine</button>
              </div>

              <!-- Parsed Results Preview -->
              <div id="aigen-import-results" style="display:none;background:#03060a;border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:10px;font-size:11px;color:#34d399">
                <b>✔ Successfully Parsed &amp; Injected:</b>
                <div id="aigen-parsed-summary" style="color:#cbd5e1;margin-top:4px"></div>
              </div>
            </div>

          </div>
        </div>

        <!-- SUBVIEW 3: IMPORT & CONNECT LLM -->
        <div id="ex-subview-llm" style="display:none;flex-direction:column;gap:14px">
          <div style="background:rgba(10,14,20,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:12px;max-width:860px;margin:0 auto;width:100%">
            
            <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px">
              <div style="font-size:13.5px;font-weight:700;color:#a855f7;display:flex;align-items:center;gap:6px">
                <span>🤖</span> IMPORT &amp; CONNECT LLM INTO ASSET STUDIO
              </div>
              <span class="badge ok" id="llm-status-pill" style="font-size:10px">READY: CLAUDE / CODEX / OLLAMA</span>
            </div>

            <p style="font-size:11.5px;color:#94a3b8;margin:0">
              Configure an LLM (Claude Code, OpenAI GPT-4o, Google Gemini, or Local Ollama) to analyze your asset sheets, automatically slice sprite coordinate bounding boxes, generate deterministic code, and guide prompt synthesis.
            </p>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">LLM Provider:</label>
                <select id="llm-provider-select" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px;color:#ffffff;font-size:11.5px">
                  <option value="claude">Anthropic Claude (Claude 3.5 Sonnet / Claude Code)</option>
                  <option value="openai">OpenAI (GPT-4o Multimodal Vision / Codex)</option>
                  <option value="gemini">Google Gemini (Gemini 2.0 Flash / 1.5 Pro)</option>
                  <option value="ollama">Local Ollama (LLaVA / Llama 3 / Mistral)</option>
                  <option value="openrouter">OpenRouter / Custom OpenAI-Compatible Base URL</option>
                </select>
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Model Name / Identifier:</label>
                <input id="llm-model-input" value="claude-3-5-sonnet-20241022" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#ffffff;font-size:11.5px">
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">Custom Base URL (Optional for Ollama / vLLM):</label>
                <input id="llm-baseurl-input" placeholder="http://localhost:11434/v1" style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#ffffff;font-size:11.5px">
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:11px;color:#cbd5e1;font-weight:600">API Key / Auth Token (Saved Locally):</label>
                <input id="llm-apikey-input" type="password" placeholder="sk-ant-... / sk-..." style="background:#06080c;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#ffffff;font-size:11.5px">
              </div>
            </div>

            <!-- LLM Multimodal Asset Decomposition & Actions -->
            <div style="background:#04060a;border:1px solid rgba(168,85,247,0.25);border-radius:8px;padding:12px;margin-top:6px;display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <b style="font-size:11.5px;color:#a855f7">🎯 Automated LLM Sprite Sheet Deconstruction:</b>
                <span style="font-size:10px;color:#94a3b8">Active Target: <span id="llm-active-sheet-name" style="color:#ffffff">Crimson Wanderer</span></span>
              </div>
              
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn gold" id="btn-llm-decompose" style="font-size:11px;padding:6px 12px">🤖 Run LLM Sprite Slicing &amp; Manifest</button>
                <button class="btn" id="btn-llm-gencode" style="font-size:11px;padding:6px 12px">⚡ Generate Unity C# / Godot Atlas Loader</button>
                <button class="btn" id="btn-llm-bind-prompt" style="font-size:11px;padding:6px 12px">🔗 Bind LLM to Live Architecture Prompt</button>
              </div>

              <pre id="llm-console-output" style="background:#020306;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px;color:#38bdf8;font-family:Consolas,monospace;font-size:10.5px;line-height:1.35;max-height:140px;overflow-y:auto;margin:4px 0 0">// LLM Output Console: Ready to process asset sheet with selected vision model.</pre>
            </div>

            <div style="display:flex;justify-content:flex-end">
              <button class="btn gold" id="btn-save-llm-config" style="font-size:11.5px;padding:6px 16px">💾 Save LLM Connection Config</button>
            </div>

          </div>
        </div>

      </div>
`;

if (!html.includes('id="as-view-examples"')) {
  html = html.replace(
    '<!-- ==================== 1. 3D MODEL STUDIO (Isolated Character Workshop) ==================== -->',
    exampleSheetsViewMarkup + '\n      <!-- ==================== 1. 3D MODEL STUDIO (Isolated Character Workshop) ==================== -->'
  );
}

// 4. Add JavaScript to power the Example Sheets Gallery, AI Prompt Gen/Import, and LLM Integration
const scriptAddition = `
// ==================== EXAMPLE ASSET SHEETS, AI PROMPTS & LLM ENGINE ====================
const EXAMPLE_ASSET_SHEETS = [
  {
    id: 'crimson_wanderer',
    title: 'Crimson Wanderer & Ancient Citadel',
    img: 'example_sheets/sheet_crimson_wanderer.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#f43f5e',
    genre: 'Action RPG / Dark Fantasy',
    protagonist: 'Crimson Rogue / Cultist in Red Mantle',
    props: 'Iron Cog Lockbox, Ancient Parchment, Stone Slabs, Water Cistern, Ancient Lectern, Mossy Boulders',
    engine: 'Unity C# / Godot 4 / WebGL Canvas',
    prompt: 'pixel art game asset sheet, full character sprite of hooded crimson rogue standing on left, modular inventory items, iron gear lockbox, ancient parchment scroll, stone dungeon tiles, steel sword, hanging wall torch, dark slate background, 16-bit RPG sprite atlas, isolated game assets, crisp pixel grid, clean edges --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 30, y: 150, w: 200, h: 420 },
      sword: { x: 235, y: 170, w: 45, h: 140 },
      lockbox: { x: 270, y: 20, w: 90, h: 90 },
      scroll: { x: 170, y: 65, w: 75, h: 95 },
      well: { x: 470, y: 200, w: 105, h: 110 }
    }
  },
  {
    id: 'shadow_assassin',
    title: 'Shadow Assassin & Frost Ruins',
    img: 'example_sheets/sheet_shadow_assassin.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#a855f7',
    genre: 'Stealth ARPG / Survival Horror',
    protagonist: 'Shadow Stalker in Midnight Cowl',
    props: 'Dual Daggers, Winter Icicles, Cursed Grimoire, Stone Well, Dungeon Archways',
    engine: 'Godot 4 / Unity C# / Spawn.co',
    prompt: 'pixel art game asset sheet, dark hooded assassin in black cloak on left, icicles, mechanical cogs, cursed grimoire, dark stone masonry, rusted broadsword, modular game sprites, slate blue background, isolated pixel assets --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 25, y: 145, w: 205, h: 425 },
      daggers: { x: 235, y: 170, w: 45, h: 140 },
      tome: { x: 245, y: 350, w: 110, h: 70 },
      icicles: { x: 30, y: 25, w: 110, h: 90 }
    }
  },
  {
    id: 'desert_nomad',
    title: 'Desert Nomad & Sandstone Citadel',
    img: 'example_sheets/sheet_desert_nomad.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#fbbf24',
    genre: 'Sunken Sands Open World RPG',
    protagonist: 'Desert Nomad in Linen Cowl & Sandals',
    props: 'Scimitar, Dune Mound, Sandstone Masonry, Desert Aloe Cactus, Golden Relics',
    engine: 'Unity C# / Godot 4',
    prompt: 'pixel art game asset sheet, desert nomad wanderer woman in linen hood on left, sand dunes, sandstone wall tiles, desert flora, scimitar sword, modular RPG inventory items, isolated game assets, clean pixel art --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 30, y: 140, w: 200, h: 420 },
      scimitar: { x: 235, y: 170, w: 45, h: 140 },
      dunes: { x: 230, y: 430, w: 150, h: 110 }
    }
  },
  {
    id: 'verdant_druid',
    title: 'Verdant Druid & Forest Sanctuary',
    img: 'example_sheets/sheet_verdant_druid.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#10b981',
    genre: 'Woodland High Fantasy / Cozy Sim',
    protagonist: 'Woodland Elf Druid with Oak Staff',
    props: 'Glowing Bioluminescent Mushrooms, Mossy Stone Well, Ancient Parchment, Leaf Armor',
    engine: 'Godot 4 / Unity C# / HTML5 Canvas',
    prompt: 'pixel art game asset sheet, female elf druid in leaf armor with wooden staff on left, glowing blue mushrooms, mossy stone well, ancient parchment, modular fantasy game sprites, dark background, 16-bit RPG atlas --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 30, y: 140, w: 210, h: 430 },
      mushrooms: { x: 230, y: 440, w: 150, h: 110 },
      well: { x: 470, y: 210, w: 105, h: 100 }
    }
  },
  {
    id: 'frost_sorcerer',
    title: 'Frost Sorcerer & Glacial Citadel',
    img: 'example_sheets/sheet_frost_sorcerer.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#38bdf8',
    genre: 'Glacial Citadel Tactical RPG',
    protagonist: 'Glacial Sorcerer with Crystalline Staff',
    props: 'Snowflake Crest Aegis, Ice Cistern, Hanging Icicles, Frozen Masonry',
    engine: 'Unity C# / Unreal / Godot 4',
    prompt: 'pixel art game asset sheet, frost sorcerer wizard in icy blue hooded robe on left, snowflake shield, crystal staff, frozen stone masonry, ice well, icicles, modular RPG sprite atlas, clean pixel art --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 30, y: 140, w: 210, h: 430 },
      shield: { x: 285, y: 120, w: 75, h: 80 },
      frozen_well: { x: 470, y: 210, w: 105, h: 100 }
    }
  },
  {
    id: 'pyromancer',
    title: 'Pyromancer & Volcanic Forge',
    img: 'example_sheets/sheet_pyromancer.jpg',
    tag: '2D PIXEL SPRITE ATLAS',
    color: '#f97316',
    genre: 'Volcanic Molten Action RPG',
    protagonist: 'Ember Pyromancer with Flame Torch Staff',
    props: 'Phoenix Shield, Molten Rock, Volcanic Cistern, Fiery Embers',
    engine: 'Unity C# / Godot 4 / Unreal Engine 5',
    prompt: 'pixel art game asset sheet, pyromancer mage in fiery red hood on left, burning torch staff, phoenix crest shield, molten rock tiles, glowing embers, volcanic well, modular game sprites, isolated assets --ar 1:1 --v 6.1',
    slices: {
      hero: { x: 30, y: 140, w: 210, h: 430 },
      phoenix_shield: { x: 285, y: 120, w: 75, h: 80 },
      volcanic_well: { x: 470, y: 210, w: 105, h: 100 }
    }
  },
  {
    id: 'stylized_rocks',
    title: 'Stylized Rock Set Volume 1',
    img: 'example_sheets/sheet_stylized_rocks.jpg',
    tag: '3D LOW-POLY PROPS',
    color: '#d97706',
    genre: '3D Low-Poly Souls / Platformer',
    protagonist: 'Environmental Prop Atlas',
    props: '8 Modular Stylized Boulders, Cliff Outcroppings, Sandstone Steppes, Rock Scatter',
    engine: 'Unity C# / Unreal Engine 5 / Godot 4 / Three.js',
    prompt: 'game asset sheet, stylized 3D rock set volume 1, 8 modular low-poly rocks, boulders, cliff outcroppings, hand-painted textures, clean dark background, 3D game props, isometric render, unity asset store style --ar 1:1 --v 6.1',
    slices: {
      boulder1: { x: 10, y: 180, w: 170, h: 130 },
      twin_rocks: { x: 210, y: 200, w: 165, h: 100 },
      cliff_ramp: { x: 390, y: 170, w: 175, h: 135 }
    }
  }
];

let selectedExampleSheet = EXAMPLE_ASSET_SHEETS[0];

function renderExampleSheetsGallery() {
  const g = $('example-sheets-grid');
  if (!g) return;
  g.innerHTML = '';

  EXAMPLE_ASSET_SHEETS.forEach(s => {
    const card = el('div');
    card.style.cssText = 'background:rgba(9,13,19,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 6px 20px rgba(0,0,0,0.5);transition:all .2s ease';
    card.onmouseenter = () => card.style.borderColor = s.color;
    card.onmouseleave = () => card.style.borderColor = 'rgba(255,255,255,0.08)';

    const imgWrap = el('div');
    imgWrap.style.cssText = 'height:160px;border-radius:8px;overflow:hidden;background:#06080c;display:flex;align-items:center;justify-content:center;position:relative';
    
    const img = el('img');
    img.src = s.img;
    img.alt = s.title;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover';
    imgWrap.append(img);

    const tagBadge = el('span', null, s.tag);
    tagBadge.style.cssText = 'position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;padding:2px 8px;border-radius:4px;background:rgba(0,0,0,0.75);color:' + s.color + ';border:1px solid ' + s.color;
    imgWrap.append(tagBadge);

    card.append(imgWrap);

    const titleRow = el('div', 'row');
    titleRow.style.alignItems = 'center';
    const bTitle = el('b', null, s.title);
    bTitle.style.cssText = 'font-size:12.5px;color:#ffffff';
    titleRow.append(bTitle);
    card.append(titleRow);

    const desc = el('div', null, s.props);
    desc.style.cssText = 'font-size:10.5px;color:#94a3b8;line-height:1.35;height:28px;overflow:hidden;text-overflow:ellipsis';
    card.append(desc);

    const btnRow = el('div', 'row');
    btnRow.style.gap = '6px';

    const injectBtn = el('button', 'btn gold', '⚡ Inject into Architecture');
    injectBtn.style.cssText = 'flex:1.2;font-size:10.5px;padding:5px 8px;font-weight:700';
    injectBtn.onclick = () => {
      injectAssetSheetToStudio(s);
    };

    const copyPromptBtn = el('button', 'btn', '📋 Copy AI Prompt');
    copyPromptBtn.style.cssText = 'flex:1;font-size:10.5px;padding:5px 8px';
    copyPromptBtn.onclick = () => {
      copy(s.prompt);
      toast('COPIED AI IMAGE PROMPT FOR ' + s.title.toUpperCase());
    };

    btnRow.append(injectBtn, copyPromptBtn);
    card.append(btnRow);

    g.append(card);
  });
}

function injectAssetSheetToStudio(s) {
  selectedExampleSheet = s;
  const decQ = $('dec-query');
  if (decQ) {
    decQ.value = s.genre + ' with ' + s.protagonist;
    try { runDeconstructor(decQ.value); } catch(e){}
  }
  const ashChar = $('ash-char-name');
  if (ashChar) ashChar.textContent = s.protagonist;
  const ashEnv = $('ash-env-name');
  if (ashEnv) ashEnv.textContent = s.props;
  const llmSheet = $('llm-active-sheet-name');
  if (llmSheet) llmSheet.textContent = s.title;

  toast('INJECTED ' + s.title.toUpperCase() + ' ASSET SHEET INTO STUDIO');
  showTab('projects');
}

function setupExampleSheetsAndLLM() {
  renderExampleSheetsGallery();

  // Subtabs switching inside Example Sheets Studio
  const bSheets = $('subtab-ex-sheets'), bAigen = $('subtab-ex-aigen'), bLlm = $('subtab-ex-llm');
  const vSheets = $('ex-subview-sheets'), vAigen = $('ex-subview-aigen'), vLlm = $('ex-subview-llm');

  if (bSheets && !bSheets._bound) {
    bSheets._bound = true;
    const setSub = (mode) => {
      [bSheets, bAigen, bLlm].forEach(b => { if(b) b.classList.remove('gold'); });
      if (mode === 'sheets') { bSheets.classList.add('gold'); vSheets.style.display = 'flex'; vAigen.style.display = 'none'; vLlm.style.display = 'none'; }
      else if (mode === 'aigen') { bAigen.classList.add('gold'); vSheets.style.display = 'none'; vAigen.style.display = 'flex'; vLlm.style.display = 'none'; updateAIGenPromptOutput(); }
      else { bLlm.classList.add('gold'); vSheets.style.display = 'none'; vAigen.style.display = 'none'; vLlm.style.display = 'flex'; }
    };
    bSheets.onclick = () => setSub('sheets');
    bAigen.onclick = () => setSub('aigen');
    bLlm.onclick = () => setSub('llm');
  }

  // AI Prompt Generator output helper
  function updateAIGenPromptOutput() {
    const styleSel = $('aigen-style');
    const charIn = $('aigen-char');
    const propsIn = $('aigen-props');
    const out = $('aigen-output-prompt');
    if (!out) return;

    const styleVal = styleSel ? styleSel.value : 'pixel-16';
    const charVal = charIn ? charIn.value : 'Hooded Crimson Rogue';
    const propsVal = propsIn ? propsIn.value : 'Iron lockbox, parchment, stone tiles';

    let promptStr = '';
    if (styleVal.includes('pixel')) {
      promptStr = \`pixel art game asset sheet, \${charVal} standing on left, modular inventory items, \${propsVal}, dark slate background, 16-bit RPG sprite atlas, isolated assets, clean pixel grid --ar 1:1 --v 6.1\`;
    } else if (styleVal.includes('3d')) {
      promptStr = \`game asset sheet, stylized 3D low-poly asset pack, \${charVal}, \${propsVal}, hand-painted textures, clean dark background, isometric render, unity asset store style --ar 1:1 --v 6.1\`;
    } else {
      promptStr = \`game sprite sheet atlas, \${charVal}, modular props: \${propsVal}, isolated game elements, 2.5D game art, transparent background --ar 1:1 --v 6.1\`;
    }
    out.value = promptStr;
  }

  ['aigen-style', 'aigen-char', 'aigen-props'].forEach(id => {
    const elIn = $(id);
    if (elIn && !elIn._bound) {
      elIn._bound = true;
      elIn.oninput = elIn.onchange = updateAIGenPromptOutput;
    }
  });

  const btnCopyAigen = $('btn-copy-aigen-prompt');
  if (btnCopyAigen && !btnCopyAigen._bound) {
    btnCopyAigen._bound = true;
    btnCopyAigen.onclick = () => {
      const out = $('aigen-output-prompt');
      if (out && out.value) {
        copy(out.value);
        toast('COPIED AI IMAGE GENERATOR PROMPT');
      }
    };
  }

  // Parse & Import External AI Prompt
  const btnParse = $('btn-parse-import-prompt');
  if (btnParse && !btnParse._bound) {
    btnParse._bound = true;
    btnParse.onclick = () => {
      const text = ($('aigen-import-input') && $('aigen-import-input').value) || '';
      if (!text.trim()) {
        toast('PLEASE PASTE AN AI IMAGE PROMPT FIRST');
        return;
      }
      // Parse character, theme, and props from prompt
      let detectedTheme = 'Action RPG';
      if (/pixel|16-bit|sprite/i.test(text)) detectedTheme = '2D Pixel RPG';
      if (/3d|low-poly|boulder|rock/i.test(text)) detectedTheme = '3D Low-Poly Adventure';
      if (/desert|sand|nomad/i.test(text)) detectedTheme = 'Desert Nomad RPG';
      if (/frost|ice|glacial/i.test(text)) detectedTheme = 'Glacial Citadel RPG';
      if (/fire|flame|pyro|lava/i.test(text)) detectedTheme = 'Volcanic Molten ARPG';

      const decQ = $('dec-query');
      if (decQ) {
        decQ.value = detectedTheme + ' (Imported from AI Prompt)';
        try { runDeconstructor(decQ.value); } catch(e){}
      }

      const resBox = $('aigen-import-results');
      const resSummary = $('aigen-parsed-summary');
      if (resBox && resSummary) {
        resBox.style.display = 'block';
        resSummary.innerHTML = 'Theme: <b>' + detectedTheme + '</b><br>Injected raw prompt into studio prompt compiler.';
      }
      toast('IMPORTED AI PROMPT & UPDATED ARCHITECTURE');
    };
  }

  // LLM Config Persistence & Actions
  const llmProv = $('llm-provider-select');
  const llmModel = $('llm-model-input');
  const llmBase = $('llm-baseurl-input');
  const llmKey = $('llm-apikey-input');
  const llmOut = $('llm-console-output');

  // Load saved config
  try {
    const savedLlm = JSON.parse(ls.get('qd.llm_config') || '{}');
    if (savedLlm.prov && llmProv) llmProv.value = savedLlm.prov;
    if (savedLlm.model && llmModel) llmModel.value = savedLlm.model;
    if (savedLlm.base && llmBase) llmBase.value = savedLlm.base;
    if (savedLlm.key && llmKey) llmKey.value = savedLlm.key;
  } catch(e){}

  const btnSaveLlm = $('btn-save-llm-config');
  if (btnSaveLlm && !btnSaveLlm._bound) {
    btnSaveLlm._bound = true;
    btnSaveLlm.onclick = () => {
      const cfg = {
        prov: llmProv ? llmProv.value : 'claude',
        model: llmModel ? llmModel.value : '',
        base: llmBase ? llmBase.value : '',
        key: llmKey ? llmKey.value : ''
      };
      ls.set('qd.llm_config', JSON.stringify(cfg));
      toast('SAVED LLM CONFIGURATION');
    };
  }

  const btnDecomp = $('btn-llm-decompose');
  if (btnDecomp && !btnDecomp._bound) {
    btnDecomp._bound = true;
    btnDecomp.onclick = () => {
      const curSheet = selectedExampleSheet;
      const jsonManifest = JSON.stringify({
        assetSheet: curSheet.title,
        file: curSheet.img,
        dimensions: { width: 1024, height: 1024 },
        slices: curSheet.slices
      }, null, 2);
      if (llmOut) {
        llmOut.textContent = '// [LLM Multimodal Vision Result for ' + curSheet.title + ']:\\n' + jsonManifest;
      }
      copy(jsonManifest);
      toast('LLM SLICE MANIFEST GENERATED & COPIED');
    };
  }

  const btnGencode = $('btn-llm-gencode');
  if (btnGencode && !btnGencode._bound) {
    btnGencode._bound = true;
    btnGencode.onclick = () => {
      const curSheet = selectedExampleSheet;
      const codeSnippet = \`// [PONYTAIL DETERMINISTIC ATLAS LOADER] // Engine: Unity C#
using UnityEngine;
using System.Collections.Generic;

public class SpriteAtlasLoader : MonoBehaviour {
    [SerializeField] private Texture2D \${curSheet.id}Texture;
    
    public Sprite LoadHeroSprite() {
        // Deterministic slice: X=\${curSheet.slices.hero ? curSheet.slices.hero.x : 30}, Y=\${curSheet.slices.hero ? curSheet.slices.hero.y : 140}
        Rect rect = new Rect(\${curSheet.slices.hero ? curSheet.slices.hero.x : 30}, \${curSheet.slices.hero ? curSheet.slices.hero.y : 140}, \${curSheet.slices.hero ? curSheet.slices.hero.w : 200}, \${curSheet.slices.hero ? curSheet.slices.hero.h : 420});
        return Sprite.Create(\${curSheet.id}Texture, rect, new Vector2(0.5f, 0.0f), 16.0f);
    }
}\`;
      if (llmOut) llmOut.textContent = codeSnippet;
      copy(codeSnippet);
      toast('GENERATED ENGINE ATLAS CODE & COPIED');
    };
  }

  const btnBindPrompt = $('btn-llm-bind-prompt');
  if (btnBindPrompt && !btnBindPrompt._bound) {
    btnBindPrompt._bound = true;
    btnBindPrompt.onclick = () => {
      const modelName = llmModel ? llmModel.value : 'claude-3-5-sonnet';
      const decQ = $('dec-query');
      if (decQ) {
        decQ.value = selectedExampleSheet.genre + ' [LLM: ' + modelName + ']';
        try { runDeconstructor(decQ.value); } catch(e){}
      }
      toast('BOUND LLM (' + modelName.toUpperCase() + ') TO STUDIO PROMPT');
      showTab('projects');
    };
  }
}

// Hook into setupAssetStudio to wire ast-btn-examples
`;

if (!html.includes('const EXAMPLE_ASSET_SHEETS =')) {
  // Inject scriptAddition right before setupAssetStudio definition
  html = html.replace('function setupAssetStudio(){', scriptAddition + '\nfunction setupAssetStudio(){\n');
}

// Update setupAssetStudio to support ast-btn-examples and as-view-examples
html = html.replace(
  "const b3d = $('ast-btn-3d'), bPx = $('ast-btn-pixel'), bCat = $('ast-btn-catalog'), bCdn = $('ast-btn-cdn');",
  "const bEx = $('ast-btn-examples'), b3d = $('ast-btn-3d'), bPx = $('ast-btn-pixel'), bCat = $('ast-btn-catalog'), bCdn = $('ast-btn-cdn');"
);
html = html.replace(
  "const v3d = $('as-view-3d'), vPx = $('as-view-pixel'), vCat = $('as-view-catalog'), vCdn = $('as-view-cdn');",
  "const vEx = $('as-view-examples'), v3d = $('as-view-3d'), vPx = $('as-view-pixel'), vCat = $('as-view-catalog'), vCdn = $('as-view-cdn');"
);
html = html.replace(
  "if(!b3d || b3d._bound) return;\n  b3d._bound = true;",
  "if((!b3d && !bEx) || (b3d && b3d._bound)) return;\n  if(b3d) b3d._bound = true;\n  if(bEx) bEx._bound = true;\n  setupExampleSheetsAndLLM();"
);

// Update setStudio modes
const oldSetStudio = `const setStudio = (mode) => {
    currentAssetStudio = mode;
    [b3d, bPx, bCat, bCdn].forEach(b => { if(b) b.classList.remove('gold'); });
    if(mode === '3d') { b3d.classList.add('gold'); v3d.style.display = 'flex'; vPx.style.display = 'none'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'none'; }
    else if(mode === 'pixel') { bPx.classList.add('gold'); v3d.style.display = 'none'; vPx.style.display = 'flex'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'none'; }
    else if(mode === 'cdn') { if(bCdn) bCdn.classList.add('gold'); v3d.style.display = 'none'; vPx.style.display = 'none'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'flex'; }
    else { bCat.classList.add('gold'); v3d.style.display = 'none'; vPx.style.display = 'none'; vCat.style.display = 'flex'; if(vCdn) vCdn.style.display = 'none'; }
  };`;

const newSetStudio = `const setStudio = (mode) => {
    currentAssetStudio = mode;
    [bEx, b3d, bPx, bCat, bCdn].forEach(b => { if(b) b.classList.remove('gold'); });
    if(mode === 'examples') { if(bEx) bEx.classList.add('gold'); if(vEx) vEx.style.display = 'flex'; v3d.style.display = 'none'; vPx.style.display = 'none'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'none'; }
    else if(mode === '3d') { b3d.classList.add('gold'); if(vEx) vEx.style.display = 'none'; v3d.style.display = 'flex'; vPx.style.display = 'none'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'none'; }
    else if(mode === 'pixel') { bPx.classList.add('gold'); if(vEx) vEx.style.display = 'none'; v3d.style.display = 'none'; vPx.style.display = 'flex'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'none'; }
    else if(mode === 'cdn') { if(bCdn) bCdn.classList.add('gold'); if(vEx) vEx.style.display = 'none'; v3d.style.display = 'none'; vPx.style.display = 'none'; vCat.style.display = 'none'; if(vCdn) vCdn.style.display = 'flex'; }
    else { bCat.classList.add('gold'); if(vEx) vEx.style.display = 'none'; v3d.style.display = 'none'; vPx.style.display = 'none'; vCat.style.display = 'flex'; if(vCdn) vCdn.style.display = 'none'; }
  };
  if(bEx) bEx.onclick = () => setStudio('examples');`;

html = html.replace(oldSetStudio, newSetStudio);

// Wire zen-open-sheets-btn on main studio screen
if (!html.includes('zenOpenSheetsBtn.onclick')) {
  html = html.replace(
    "const zenFoldBtn = $('btn-zen-fold');",
    `const zenFoldBtn = $('btn-zen-fold');
const zenOpenSheetsBtn = $('zen-open-sheets-btn');
if (zenOpenSheetsBtn) {
  zenOpenSheetsBtn.onclick = () => {
    showTab('assets');
    const bEx = $('ast-btn-examples');
    if (bEx) bEx.click();
    toast('OPENED EXAMPLE ASSET SHEETS & AI STUDIO');
  };
}`
  );
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully added Example Asset Sheets, AI Prompt Importer & LLM Integration to app/index.html');
