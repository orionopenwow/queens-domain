const fs = require('fs');
const html = fs.readFileSync('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'utf8');
const used = new Set([...html.matchAll(/(?:\$|getElementById)\(\s*['"]([\w-]+)['"]\s*\)/g)].map(m => m[1]));
console.log('Uses top-nav-bar:', used.has('top-nav-bar'));
console.log('Uses pj-explainer:', used.has('pj-explainer'));
console.log('Uses top-menu-btn:', used.has('top-menu-btn'));
console.log('Uses top-btn-projects:', used.has('top-btn-projects'));
console.log('Uses top-btn-settings:', used.has('top-btn-settings'));
console.log('Uses top-btn-dev:', used.has('top-btn-dev'));
