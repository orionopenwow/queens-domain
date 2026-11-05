// scripts/apply-gallery-and-center-header.js
// 1. Center-align the header with max-width: 790px
// 2. Add Pinterest-style Inspiration Gallery & "Pin to Board" Moodboard directly under the typing area
// 3. Apply Tome: Vibegaming Engine neon aura and palette from brand sheet

const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Update <title>
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Tome: Vibegaming Engine // Technical Architecture &amp; Asset Studio</title>'
);

// 2. Center-align top navigation bar with the center card container (max-width: 790px; margin: 12px auto 6px)
const oldNavRegex = /<header id="top-nav-bar"[\s\S]*?<\/header>/;
const newNav = `  <header id="top-nav-bar" style="max-width:790px;width:100%;margin:12px auto 8px;display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:rgba(12,16,24,0.88);backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.1);position:relative;z-index:10">
    <!-- Left: Winged Tome Brand / Menu Toggle (Centered Alignment with Content) -->
    <div id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:4px 8px;border-radius:10px;transition:all .2s ease;user-select:none">
      <img src="tome_logo_transparent.png" alt="Tome" style="width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 0 12px rgba(103,58,183,0.55));transition:transform .2s ease">
      <div style="display:flex;flex-direction:column;justify-content:center">
        <span style="font-family:Georgia,'Times New Roman',Garamond,serif;font-style:italic;font-size:25px;font-weight:500;color:#f8fafc;line-height:1;letter-spacing:-0.01em;text-shadow:0 2px 10px rgba(0,0,0,0.8)">Tome</span>
        <span style="font-family:Georgia,'Times New Roman',Garamond,serif;font-style:italic;font-size:12.5px;color:#cbd5e1;line-height:1.2;letter-spacing:0.03em;text-shadow:0 1px 4px rgba(0,0,0,0.8)">Vibegaming Engine</span>
      </div>
    </div>
    <!-- Right: Projects, Settings, Dev Console -->
    <div style="display:flex;align-items:center;gap:8px">
      <button class="btn on" data-t="projects" id="top-btn-projects" style="font-size:11px;padding:6px 14px;font-weight:600;letter-spacing:.03em;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:8px">PROJECTS</button>
      <button class="btn" data-t="settings" id="top-btn-settings" style="font-size:11px;padding:6px 14px;font-weight:600;letter-spacing:.03em;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:8px">SETTINGS</button>
      <button class="btn sb-btn-dev" data-t="devconsole" id="top-btn-dev" style="font-size:11px;padding:6px 14px;font-weight:600;letter-spacing:.03em;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.35);color:#4ade80;border-radius:8px">★ DEV CONSOLE</button>
    </div>
  </header>`;

html = html.replace(oldNavRegex, newNav);

// 3. Update Hero Logo with Vibegaming Engine circular neon aura
const oldHeroLogoRegex = /<!-- Hero Tome Logo -->[\s\S]*?<\/div>/;
const newHeroLogo = `<!-- Hero Tome Logo with Vibegaming Neon Aura -->
            <div style="display:flex;justify-content:center;margin-bottom:12px;position:relative">
              <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;padding:12px;border-radius:50%;background:radial-gradient(circle, rgba(103,58,183,0.3) 0%, rgba(0,188,212,0.15) 50%, transparent 70%);box-shadow:0 0 35px rgba(0,188,212,0.25), 0 0 45px rgba(233,30,99,0.2)">
                <img class="tome-hero-logo tome-glow" src="tome_logo_transparent.png" alt="Tome: Vibegaming Engine" style="width:76px;height:76px;object-fit:contain;animation:floatTome 4s ease-in-out infinite">
              </div>
            </div>`;

if (html.includes('<!-- Hero Tome Logo -->')) {
  html = html.replace(oldHeroLogoRegex, newHeroLogo);
}

// 4. Add Pinterest-style Inspiration Gallery & "Pin to Board" markup directly below zen-detected-chips
const inspGalleryMarkup = `
            <!-- ==================== PINTEREST-STYLE INSPIRATION BOARD & MASONRY GALLERY ==================== -->
            <div id="insp-board-container" style="max-width:740px;margin:14px auto 16px;text-align:left">
              
              <!-- Board Header & Filter Chips -->
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:13px;font-weight:800;color:#ffffff;letter-spacing:.03em;display:flex;align-items:center;gap:6px">
                    <span style="color:#00bcd4">🔮</span> INSPIRATION VAULT &amp; MOODBOARD
                  </span>
                  <span id="insp-pinned-count" class="badge" style="font-size:9.5px;background:rgba(233,30,99,0.18);border:1px solid rgba(233,30,99,0.45);color:#ff4081;font-weight:700">0 PINNED</span>
                </div>

                <div style="display:flex;align-items:center;gap:4px">
                  <button class="btn gold insp-cat-btn" data-cat="all" style="font-size:10px;padding:3px 9px;border-radius:6px">All (8)</button>
                  <button class="btn insp-cat-btn" data-cat="char" style="font-size:10px;padding:3px 9px;border-radius:6px">Characters</button>
                  <button class="btn insp-cat-btn" data-cat="props" style="font-size:10px;padding:3px 9px;border-radius:6px">3D &amp; Rocks</button>
                  <button class="btn insp-cat-btn" data-cat="env" style="font-size:10px;padding:3px 9px;border-radius:6px">Environments</button>
                </div>
              </div>

              <!-- Pinned Board Bar (Appears when items are pinned) -->
              <div id="pinned-moodboard-bar" style="display:none;background:linear-gradient(90deg, rgba(103,58,183,0.2) 0%, rgba(0,188,212,0.15) 100%);border:1px solid rgba(0,188,212,0.35);border-radius:10px;padding:10px 14px;margin-bottom:12px;box-shadow:0 8px 24px rgba(0,0,0,0.5)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                  <div style="font-size:11.5px;font-weight:700;color:#00e5ff;display:flex;align-items:center;gap:6px">
                    <span>📌</span> ACTIVE PINNED MOODBOARD
                  </div>
                  <div style="display:flex;gap:6px">
                    <button class="btn" id="btn-clear-pinned" style="font-size:10px;padding:3px 8px;color:#94a3b8">Clear Board</button>
                    <button class="btn" id="btn-synthesize-board" style="font-size:10.5px;padding:4px 12px;font-weight:700;background:linear-gradient(90deg, #00bcd4, #e91e63);color:#ffffff;border:none;border-radius:6px;box-shadow:0 0 12px rgba(0,188,212,0.4)">⚡ START VIBE</button>
                  </div>
                </div>
                <div id="pinned-items-strip" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
                  <!-- Pinned mini cards rendered by JS -->
                </div>
              </div>

              <!-- Pinterest Masonry Grid -->
              <div id="insp-masonry-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(215px, 1fr));gap:10px">
                <!-- Generated by JS -->
              </div>
            </div>
`;

if (!html.includes('id="insp-board-container"')) {
  html = html.replace(
    '<!-- CREATED PROJECTS SECTION (Directly inside central card 1:1 with mockup) -->',
    inspGalleryMarkup + '\n          <!-- CREATED PROJECTS SECTION (Directly inside central card 1:1 with mockup) -->'
  );
}

// 5. Add JavaScript to manage Pinterest Gallery & Pin to Board
const galleryScriptAddition = `
// ==================== PINTEREST-STYLE INSPIRATION GALLERY & PIN TO BOARD ====================
const INSPIRATION_GALLERY_ITEMS = [
  {
    id: 'sheet_crimson_wanderer',
    title: 'Crimson Rogue & Citadel',
    cat: 'char',
    tag: '16-BIT PIXEL ATLAS',
    color: '#f43f5e',
    img: 'example_sheets/sheet_crimson_wanderer.jpg',
    height: '180px',
    vision: '2D Pixel Action RPG with Hooded Crimson Rogue and Citadel Ruins'
  },
  {
    id: 'sheet_stylized_rocks',
    title: 'Stylized Rock Set Vol. 1',
    cat: 'props',
    tag: '3D LOW-POLY',
    color: '#d97706',
    img: 'example_sheets/sheet_stylized_rocks.jpg',
    height: '140px',
    vision: '3D Low-Poly Souls with Stylized Modular Boulders and Stepped Ramps'
  },
  {
    id: 'sheet_shadow_assassin',
    title: 'Shadow Assassin & Frost',
    cat: 'char',
    tag: 'DARK FANTASY PIXEL',
    color: '#a855f7',
    img: 'example_sheets/sheet_shadow_assassin.jpg',
    height: '175px',
    vision: 'Stealth ARPG with Shadow Stalker, Dual Daggers and Frost Ruins'
  },
  {
    id: 'sheet_desert_nomad',
    title: 'Desert Nomad & Sandstone',
    cat: 'char',
    tag: 'DESERT RPG ATLAS',
    color: '#fbbf24',
    img: 'example_sheets/sheet_desert_nomad.jpg',
    height: '170px',
    vision: 'Desert Nomad Open World RPG with Sandstone Ruins and Dune Exploration'
  },
  {
    id: 'sheet_verdant_druid',
    title: 'Verdant Druid & Forest',
    cat: 'char',
    tag: 'WOODLAND FANTASY',
    color: '#10b981',
    img: 'example_sheets/sheet_verdant_druid.jpg',
    height: '180px',
    vision: 'Cozy Woodland RPG with Elf Druid, Oak Staff and Bioluminescent Mushrooms'
  },
  {
    id: 'sheet_frost_sorcerer',
    title: 'Frost Sorcerer & Citadel',
    cat: 'char',
    tag: 'GLACIAL CITADEL',
    color: '#38bdf8',
    img: 'example_sheets/sheet_frost_sorcerer.jpg',
    height: '175px',
    vision: 'Glacial Citadel Tactical RPG with Frost Wizard and Snowflake Aegis'
  },
  {
    id: 'sheet_pyromancer',
    title: 'Pyromancer & Volcanic Forge',
    cat: 'char',
    tag: 'MOLTEN BASALT',
    color: '#f97316',
    img: 'example_sheets/sheet_pyromancer.jpg',
    height: '170px',
    vision: 'Volcanic Molten Action RPG with Ember Pyromancer and Phoenix Shield'
  },
  {
    id: 'pixel_forest_bg',
    title: 'Night Forest Trail',
    cat: 'env',
    tag: 'LEVEL BACKDROP',
    color: '#22c55e',
    img: 'pixel_forest_bg.jpg',
    height: '125px',
    vision: 'Pixel Forest Night Odyssey with Pine Tree Canopy and Mountain Vista'
  }
];

let pinnedInspirations = [];
try {
  pinnedInspirations = JSON.parse(ls.get('tome.pinned_board') || '[]');
} catch(e) { pinnedInspirations = []; }

let activeInspCategory = 'all';

function renderInspirationGallery() {
  const grid = $('insp-masonry-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = activeInspCategory === 'all'
    ? INSPIRATION_GALLERY_ITEMS
    : INSPIRATION_GALLERY_ITEMS.filter(x => x.cat === activeInspCategory);

  items.forEach(item => {
    const isPinned = pinnedInspirations.some(p => p.id === item.id);

    const card = el('div');
    card.style.cssText = 'position:relative;background:rgba(8,12,18,0.92);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,0.5);transition:all .2s ease;cursor:pointer;display:flex;flex-direction:column';
    card.onmouseenter = () => {
      card.style.transform = 'translateY(-2px)';
      card.style.borderColor = item.color;
      card.style.boxShadow = '0 12px 28px rgba(0,0,0,0.7), 0 0 16px ' + item.color + '44';
      hoverOverlay.style.opacity = '1';
    };
    card.onmouseleave = () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = isPinned ? item.color : 'rgba(255,255,255,0.08)';
      card.style.boxShadow = '0 8px 22px rgba(0,0,0,0.5)';
      hoverOverlay.style.opacity = '0';
    };

    if (isPinned) card.style.borderColor = item.color;

    // Image Container
    const imgWrap = el('div');
    imgWrap.style.cssText = 'height:' + item.height + ';background:#04060a;overflow:hidden;position:relative';
    const img = el('img');
    img.src = item.img;
    img.alt = item.title;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;transition:transform .3s ease';
    imgWrap.append(img);

    // Tag badge
    const tag = el('span', null, item.tag);
    tag.style.cssText = 'position:absolute;top:6px;left:6px;font-size:8.5px;font-weight:700;padding:2px 6px;border-radius:4px;background:rgba(0,0,0,0.75);color:' + item.color + ';border:1px solid ' + item.color + ';backdrop-filter:blur(4px)';
    imgWrap.append(tag);

    // Pin indicator icon
    if (isPinned) {
      const pinMark = el('span', null, '📌');
      pinMark.style.cssText = 'position:absolute;top:6px;right:6px;font-size:12px;filter:drop-shadow(0 0 4px #000)';
      imgWrap.append(pinMark);
    }

    // Hover Action Overlay
    const hoverOverlay = el('div');
    hoverOverlay.style.cssText = 'position:absolute;inset:0;background:rgba(4,7,12,0.85);backdrop-filter:blur(4px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transition:opacity .2s ease;padding:8px';
    
    const pinBtn = el('button', 'btn', isPinned ? '✔ Pinned to Board' : '📌 Pin to Board');
    pinBtn.style.cssText = 'width:100%;font-size:10px;padding:5px 8px;font-weight:700;background:' + (isPinned ? 'rgba(233,30,99,0.25)' : 'rgba(255,255,255,0.08)') + ';border:1px solid ' + (isPinned ? '#e91e63' : 'rgba(255,255,255,0.2)') + ';color:#ffffff;border-radius:6px';
    pinBtn.onclick = (e) => {
      e.stopPropagation();
      togglePinInspiration(item);
    };

    const selectBtn = el('button', 'btn gold', '⚡ Select as Vision');
    selectBtn.style.cssText = 'width:100%;font-size:10px;padding:5px 8px;font-weight:700';
    selectBtn.onclick = (e) => {
      e.stopPropagation();
      selectInspirationVision(item);
    };

    hoverOverlay.append(pinBtn, selectBtn);
    imgWrap.append(hoverOverlay);
    card.append(imgWrap);

    // Card Footer Info
    const footer = el('div');
    footer.style.cssText = 'padding:8px 10px;background:rgba(10,14,20,0.95);display:flex;align-items:center;justify-content:space-between';
    const bTitle = el('b', null, item.title);
    bTitle.style.cssText = 'font-size:11px;color:#ffffff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
    footer.append(bTitle);

    card.append(footer);

    // Clicking anywhere on card selects vision
    card.onclick = () => selectInspirationVision(item);

    grid.append(card);
  });

  renderPinnedMoodboardBar();
}

function togglePinInspiration(item) {
  const idx = pinnedInspirations.findIndex(p => p.id === item.id);
  if (idx !== -1) {
    pinnedInspirations.splice(idx, 1);
    toast('UNPINNED ' + item.title.toUpperCase());
  } else {
    pinnedInspirations.push(item);
    toast('PINNED TO BOARD: ' + item.title.toUpperCase());
  }
  ls.set('tome.pinned_board', JSON.stringify(pinnedInspirations));
  renderInspirationGallery();
}

function selectInspirationVision(item) {
  const decQ = $('dec-query');
  if (decQ) {
    decQ.value = item.vision;
    try { runDeconstructor(decQ.value); } catch(e){}
    toast('LOADED INSPIRATION: ' + item.title.toUpperCase());
  }
}

function renderPinnedMoodboardBar() {
  const bar = $('pinned-moodboard-bar');
  const countBadge = $('insp-pinned-count');
  const strip = $('pinned-items-strip');
  if (!bar || !strip) return;

  if (countBadge) countBadge.textContent = pinnedInspirations.length + ' PINNED';

  if (pinnedInspirations.length === 0) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'block';
  strip.innerHTML = '';

  pinnedInspirations.forEach(item => {
    const chip = el('div');
    chip.style.cssText = 'display:flex;align-items:center;gap:6px;background:rgba(8,12,18,0.9);border:1px solid ' + item.color + ';border-radius:6px;padding:3px 8px;flex:none';

    const thumb = el('img');
    thumb.src = item.img;
    thumb.style.cssText = 'width:20px;height:20px;border-radius:3px;object-fit:cover';

    const label = el('span', null, item.title);
    label.style.cssText = 'font-size:10px;font-weight:700;color:#ffffff';

    const del = el('span', null, '✕');
    del.style.cssText = 'font-size:10px;color:#94a3b8;cursor:pointer;margin-left:4px';
    del.onclick = () => togglePinInspiration(item);

    chip.append(thumb, label, del);
    strip.append(chip);
  });

  const btnClear = $('btn-clear-pinned');
  if (btnClear && !btnClear._bound) {
    btnClear._bound = true;
    btnClear.onclick = () => {
      pinnedInspirations = [];
      ls.set('tome.pinned_board', JSON.stringify([]));
      renderInspirationGallery();
      toast('CLEARED PINNED MOODBOARD');
    };
  }

  const btnSynth = $('btn-synthesize-board');
  if (btnSynth && !btnSynth._bound) {
    btnSynth._bound = true;
    btnSynth.onclick = () => {
      if (pinnedInspirations.length === 0) return;
      const combinedVision = pinnedInspirations.map(p => p.title).join(' + ') + ' (' + pinnedInspirations.map(p => p.tag).join(', ') + ')';
      const decQ = $('dec-query');
      if (decQ) {
        decQ.value = combinedVision;
        try { runDeconstructor(decQ.value); } catch(e){}
      }
      toast('SYNTHESIZED ARCHITECTURE FROM ' + pinnedInspirations.length + ' PINNED INSPIRATIONS');
    };
  }
}

// Category filter button wiring
document.querySelectorAll('.insp-cat-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.insp-cat-btn').forEach(b => b.classList.remove('gold'));
    btn.classList.add('gold');
    activeInspCategory = btn.getAttribute('data-cat') || 'all';
    renderInspirationGallery();
  };
});
`;

if (!html.includes('const INSPIRATION_GALLERY_ITEMS =')) {
  html = html.replace(
    'function setupExampleSheetsAndLLM(){',
    galleryScriptAddition + '\nfunction setupExampleSheetsAndLLM(){\n  renderInspirationGallery();\n'
  );
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully updated header alignment, added Pinterest Inspiration Gallery & Moodboard to app/index.html');
