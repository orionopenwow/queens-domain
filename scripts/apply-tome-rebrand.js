// scripts/apply-tome-rebrand.js
// Sweeping rebranding to "Tome: Game Engine" with winged tome logo & arcane purple/gold style upgrade

const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Update <title>
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Tome: Game Engine // Technical Architecture &amp; Asset Studio</title>'
);

// 2. Add floating animation and arcane purple/gold styles in <style>
const tomeStyles = `
  /* Tome: Game Engine Styling & Floating Logo */
  @keyframes floatTome {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(-1deg); }
  }
  .tome-glow {
    filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.55)) drop-shadow(0 0 32px rgba(251, 191, 36, 0.35));
  }
  #top-menu-btn:hover {
    border-color: rgba(168, 85, 247, 0.8) !important;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-1px);
  }
`;

if (!html.includes('@keyframes floatTome')) {
  html = html.replace('</style>', tomeStyles + '\n</style>');
}

// 3. Update the Top Bar left corner with Winged Tome Logo + "Tome: Game Engine"
const oldTopBarRegex = /<header id="topbar"[\s\S]*?<\/header>/;
const newTopBar = `<header id="topbar" style="display:flex;align-items:center;justify-content:space-between;padding:8px 18px;background:rgba(8,11,16,0.75);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:4px">
    <div style="display:flex;align-items:center;gap:12px">
      <!-- Winged Tome Menu Logo Button -->
      <button class="btn" id="top-menu-btn" title="Toggle Tome System Menu (Alt+M)" style="display:flex;align-items:center;gap:8px;font-size:11.5px;padding:3px 12px 3px 6px;font-weight:700;letter-spacing:.03em;background:rgba(18,24,34,0.85);border:1px solid rgba(168,85,247,0.45);border-radius:20px;box-shadow:0 0 16px rgba(168,85,247,0.22),inset 0 1px 0 rgba(255,255,255,0.15);cursor:pointer;transition:all .2s ease">
        <img src="tome_logo_transparent.png" alt="Tome Logo" style="width:26px;height:26px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(168,85,247,0.7))">
        <span style="color:#ffffff">MENU ☰</span>
      </button>
      <div style="display:flex;align-items:center;gap:7px">
        <span style="font-size:13.5px;font-weight:800;color:#ffffff;letter-spacing:.02em;text-shadow:0 0 14px rgba(168,85,247,0.4)">Tome: Game Engine</span>
        <span style="font-size:9.5px;padding:2px 7px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.4);color:#c084fc;border-radius:9999px;font-weight:700;letter-spacing:.03em">v1.0</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <button class="btn on" data-t="projects" id="top-btn-projects" style="font-size:11px;padding:4px 12px;font-weight:600;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:#ffffff;border-radius:6px">PROJECTS</button>
      <button class="btn" data-t="settings" id="top-btn-settings" style="font-size:11px;padding:4px 12px;font-weight:600;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#94a3b8;border-radius:6px">SETTINGS</button>
      <button class="btn sb-btn-dev" data-t="devconsole" id="top-btn-dev" style="font-size:11px;padding:4px 12px;font-weight:600;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.35);color:#4ade80;border-radius:6px">★ DEV CONSOLE</button>
    </div>
  </header>`;

html = html.replace(oldTopBarRegex, newTopBar);

// 4. Add Hero Logo above the prompt badge in #zen-hero-square
if (!html.includes('class="tome-hero-logo"')) {
  const heroBadgeAnchor = '<div style="display:inline-flex;align-items:center;gap:6px;padding:3.5px 14px;background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.3);border-radius:20px;font-size:10.5px;font-weight:700;color:#fbbf24;letter-spacing:.05em;margin-bottom:10px">';
  const heroLogoMarkup = `
            <!-- Hero Tome Logo -->
            <div style="display:flex;justify-content:center;margin-bottom:12px">
              <img class="tome-hero-logo tome-glow" src="tome_logo_transparent.png" alt="Tome: Game Engine" style="width:78px;height:78px;object-fit:contain;animation:floatTome 4s ease-in-out infinite">
            </div>\n            ` + heroBadgeAnchor;
  html = html.replace(heroBadgeAnchor, heroLogoMarkup);
}

// 5. Update Sidebar Header brand
html = html.replace(
  /<header id="sb-header" class="sb-header-card">[\s\S]*?<\/header>/,
  `<header id="sb-header" class="sb-header-card" style="border-color:rgba(168,85,247,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.6),0 0 16px rgba(168,85,247,0.15)">
    <div style="display:flex;align-items:center;gap:10px">
      <img class="logo" src="tome_logo_transparent.png" alt="Tome: Game Engine" style="width:36px;height:36px;border-radius:8px;object-fit:contain;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.35);box-shadow:0 0 10px rgba(168,85,247,0.3)">
      <div>
        <h1 style="font-size:13.5px;color:#ffffff;text-shadow:0 0 8px rgba(168,85,247,0.4)">Tome: Game Engine</h1>
        <small style="color:#c084fc;font-size:9px;font-weight:700;letter-spacing:.05em">ARCHITECTURE &amp; AGENT STUDIO</small>
      </div>
    </div>
  </header>`
);

// 6. Sweeping text updates
// Update Welcome screen title
html = html.replace(
  /Queen's Domain \/\/ Autonomous Game Architecture Studio/g,
  'Tome: Game Engine // Architecture & AI Asset Studio'
);
html = html.replace(
  /Queen's Domain/g,
  'Tome'
);

// Restore specific required constant and preset tags for test consistency
html = html.replace(/name:"Tome"/g, 'name:"Tome: Awakening"');

// Update prePrompt default text in JS
html = html.replace(
  /Game: "Queen's Domain"/g,
  'Game: "Tome: Awakening"'
);
html = html.replace(
  /\[PONYTAIL ARCHITECTURE ENGINE\]/g,
  '[TOME: GAME ENGINE // ARCHITECTURE SYSTEM]'
);

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully applied sweeping Tome: Game Engine rebrand to app/index.html');
