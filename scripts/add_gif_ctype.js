const fs = require('fs');
const serverPath = 'C:/Users/campw/Desktop/QueensDomain/server/server.js';
let code = fs.readFileSync(serverPath, 'utf8');

if (!code.includes("'.gif': 'image/gif'")) {
  code = code.replace("const CTYPE = {", "const CTYPE = { '.gif': 'image/gif',");
  fs.writeFileSync(serverPath, code, 'utf8');
  console.log('Added .gif to CTYPE in server.js');
}
