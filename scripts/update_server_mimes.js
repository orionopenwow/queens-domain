const fs = require('fs');
const path = require('path');

const serverPath = 'C:/Users/campw/Desktop/QueensDomain/server/server.js';
let code = fs.readFileSync(serverPath, 'utf8');

// Ensure all files in DIR are in FILES and MIME types include .glb and .bin
if (!code.includes("'.glb': 'model/gltf-binary'")) {
  code = code.replace(
    "const CTYPE = {",
    "const CTYPE = { '.glb': 'model/gltf-binary', '.bin': 'application/octet-stream', '.webp': 'image/webp',"
  );
}

if (!code.includes("FILES['/' + f] = f")) {
  const target = "for (const f of fs.readdirSync(path.join(DIR, 'fonts')))";
  const addition = `for (const f of fs.readdirSync(DIR)) { try { if (fs.statSync(path.join(DIR, f)).isFile()) FILES['/' + f] = f; } catch(e){} }\n`;
  code = code.replace(target, addition + target);
}

fs.writeFileSync(serverPath, code, 'utf8');
console.log('Updated server.js to dynamically serve .glb, .bin, and root assets');
