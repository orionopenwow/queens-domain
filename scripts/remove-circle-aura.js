// scripts/remove-circle-aura.js
const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Replace the hero logo block: remove circle aura, keep drop shadow and float animation
const oldHeroLogoRegex = /<!-- Hero Tome Logo[\s\S]*?<\/div>\s*<\/div>/;
const newHeroLogo = `<!-- Hero Tome Logo: Floating with Drop Shadow (No Circle Aura) -->
            <div style="display:flex;justify-content:center;margin-bottom:16px;position:relative">
              <img class="tome-hero-logo" src="tome_logo_transparent.png" alt="Tome: Vibegaming Engine" style="width:175px;height:175px;object-fit:contain;animation:floatTome 4s ease-in-out infinite;image-rendering:pixelated;transition:filter .3s ease">
            </div>`;

html = html.replace(oldHeroLogoRegex, newHeroLogo);

// 2. Enhance @keyframes floatTome with realistic floating drop shadow
const oldKeyframes = `@keyframes floatTome {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(-1deg); }
  }`;

const newKeyframes = `@keyframes floatTome {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.85)) drop-shadow(0 4px 12px rgba(103, 58, 183, 0.35));
    }
    50% {
      transform: translateY(-9px) rotate(-1deg);
      filter: drop-shadow(0 22px 34px rgba(0, 0, 0, 0.7)) drop-shadow(0 6px 18px rgba(103, 58, 183, 0.45));
    }
  }`;

if (html.includes(oldKeyframes)) {
  html = html.replace(oldKeyframes, newKeyframes);
  console.log('Updated floatTome keyframes with floating drop shadow');
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully removed circle aura from app/index.html');
