const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix closing of init3DSpinningModel IIFE: replace `requestAnimationFrame(render);\n}` with `requestAnimationFrame(render);\n})();`
const targetStr = `    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}`;

const fixedStr = `    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();`;

if (html.includes(targetStr)) {
  html = html.replace(targetStr, fixedStr);
  console.log('Fixed init3DSpinningModel closing IIFE');
}

// 2. Add #btn-3d-model-toggle in the 3D controls if not present
if (!html.includes('id="btn-3d-model-toggle"')) {
  html = html.replace(
    'id="btn-3d-wire"',
    'id="btn-3d-model-toggle" style="background:rgba(168,85,247,0.25);border:1px solid rgba(168,85,247,0.6);color:#c084fc;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">MESHY GLB</button>\n                      <button id="btn-3d-wire"'
  );
  console.log('Added btn-3d-model-toggle');
}

// 3. Add the IDs to active-project-builder-section:
// pj-builder-title, pj-builder-engine-badge, pj-builder-steps-badge, pj-builder-prompt-snippet
if (!html.includes('id="pj-builder-title"')) {
  html = html.replace(
    '<div style="font-size:15px;font-weight:800;color:#ffffff;margin-bottom:6px">Tome: Awakening (Preset)</div>',
    '<div id="pj-builder-title" style="font-size:15px;font-weight:800;color:#ffffff;margin-bottom:6px">Tome: Awakening (Preset)</div>'
  );
}

if (!html.includes('id="pj-builder-engine-badge"')) {
  html = html.replace(
    '<span class="badge" style="font-size:10px">Unity C# / Godot 4</span>',
    '<span class="badge" id="pj-builder-engine-badge" style="font-size:10px">Unity C# / Godot 4</span>'
  );
}

if (!html.includes('id="pj-builder-steps-badge"')) {
  html = html.replace(
    '<span class="badge ok" style="font-size:10px">32 Steps Verified</span>',
    '<span class="badge ok" id="pj-builder-steps-badge" style="font-size:10px">32 Steps Verified</span>'
  );
}

if (!html.includes('id="pj-builder-prompt-snippet"')) {
  html = html.replace(
    '<pre style="background:#020407;border:1px solid rgba(56,189,248,0.25);border-radius:6px;padding:8px 10px;font-size:10px;color:#38bdf8;font-family:Consolas,monospace;margin:0 0 10px;white-space:pre-wrap;line-height:1.4">',
    '<pre id="pj-builder-prompt-snippet" style="background:#020407;border:1px solid rgba(56,189,248,0.25);border-radius:6px;padding:8px 10px;font-size:10px;color:#38bdf8;font-family:Consolas,monospace;margin:0 0 10px;white-space:pre-wrap;line-height:1.4">'
  );
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Saved app/index.html with all required DOM IDs and IIFE fix');
