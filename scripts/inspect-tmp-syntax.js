const fs = require('fs');
const path = require('path');
const os = require('os');

const tmp = path.join(os.tmpdir(), 'qd_all.js');
if (fs.existsSync(tmp)) {
  const lines = fs.readFileSync(tmp, 'utf8').split('\n');
  console.log('Lines around 5032:');
  for (let i = Math.max(0, 5025); i < Math.min(lines.length, 5045); i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}
