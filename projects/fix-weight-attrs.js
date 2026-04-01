const fs = require('fs');
const path = require('path');

const files = [
  'workout-template/index.html',
  'workout-kay/index.html',
  'workout-beano/index.html',
  'workout-program/index.html',
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  if (!fs.existsSync(filePath)) { console.log('SKIP: ' + f); return; }
  let html = fs.readFileSync(filePath, 'utf8');

  // Fix: set-weight data-set should match the set-reps data-set in the same column
  // Pattern: "Set N" label followed by set-weight with wrong data-set
  html = html.replace(/<span class="set-label">Set (\d)<\/span>\s*\n\s*<input type="number" class="set-weight" data-set="\d+"/g,
    function(match, setNum) {
      const idx = parseInt(setNum) - 1;
      return match.replace(/data-set="\d+"/, 'data-set="' + idx + '"');
    });

  fs.writeFileSync(filePath, html);
  console.log('FIXED: ' + f);
});
