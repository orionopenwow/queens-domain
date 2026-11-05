const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, '..', 'app', 'index.html');
let html = fs.readFileSync(appHtmlPath, 'utf8');

// 1. Restore zen-drop-zone & zen-detected-chips directly after inspiration-sparks-bar
const dropZoneHtml = `
            <!-- Zen Drop Zone & File Detection -->
            <div id="zen-drop-zone" class="zen-drop-target" style="border:1.5px dashed rgba(255,255,255,0.18);border-radius:12px;padding:12px 18px;max-width:720px;margin:0 auto 12px;background:rgba(5,8,14,0.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s ease">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:16px">🔮</span>
                <div style="text-align:left">
                  <div style="font-size:12px;font-weight:700;color:#ffffff">Drop &amp; Drop Inspiration Anywhere Into This Studio</div>
                  <div style="font-size:10.5px;color:#94a3b8">Drop 3D models (.glb), pixel sprites, concept images, sound FX, or paste web links to auto-detect</div>
                </div>
              </div>
              <span class="badge ok" style="font-size:10.5px;padding:3px 9px">Auto-Detect ON</span>
            </div>

            <div id="zen-detected-chips" style="display:flex;flex-wrap:wrap;gap:6px;max-width:720px;margin:0 auto 10px"></div>
`;

if (!html.includes('id="zen-drop-zone"')) {
  const sparksEndMarker = '<!-- Expanded Blatant Suggestions to Get Started';
  const sparksIdx = html.indexOf(sparksEndMarker);
  if (sparksIdx !== -1) {
    // Find the end of this div container
    const closeDiv = html.indexOf('</div>\n          </div>', sparksIdx);
    if (closeDiv !== -1) {
      html = html.slice(0, closeDiv + 6) + dropZoneHtml + html.slice(closeDiv + 6);
      console.log('Restored zen-drop-zone and zen-detected-chips');
    } else {
      // Fallback: insert before pj-section-inner
      const pjInner = html.indexOf('id="pj-section-inner"');
      html = html.slice(0, pjInner) + dropZoneHtml + html.slice(pjInner);
      console.log('Restored zen-drop-zone before pj-section-inner');
    }
  }
}

// 2. Fix the trailing script tag syntax error
// Remove any stray <script> / </script> tags after </html>
const endHtmlIdx = html.indexOf('</html>');
if (endHtmlIdx !== -1) {
  const afterHtml = html.slice(endHtmlIdx + 7).trim();
  if (afterHtml.length > 0) {
    // Extract the JS code from the trailing script
    const jsContent = afterHtml.replace(/<script>/gi, '').replace(/<\/script>/gi, '').trim();
    // Cut trailing script from after </html>
    html = html.slice(0, endHtmlIdx + 7);
    
    // Insert jsContent right before the main closing </script> tag
    const lastScriptClose = html.lastIndexOf('</script>');
    if (lastScriptClose !== -1) {
      html = html.slice(0, lastScriptClose) + '\n\n' + jsContent + '\n' + html.slice(lastScriptClose);
      console.log('Moved trailing script cleanly inside main script block');
    }
  }
}

fs.writeFileSync(appHtmlPath, html, 'utf8');
console.log('Successfully saved fixes to app/index.html');
