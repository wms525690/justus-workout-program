const fs = require('fs');
const path = require('path');

const files = [
  'workout-template/app.js',
  'workout-kay/app.js',
  'workout-beano/app.js',
  'workout-program/app.js',
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  if (!fs.existsSync(filePath)) { console.log('SKIP: ' + f); return; }
  let js = fs.readFileSync(filePath, 'utf8');

  // 1. Add setWeightInputs declaration after setTimeInputs
  js = js.replace(
    "var setTimeInputs = document.querySelectorAll('.set-time');",
    "var setTimeInputs = document.querySelectorAll('.set-time');\n  var setWeightInputs = document.querySelectorAll('.set-weight');"
  );

  // 2. Add weight restore after time restore
  js = js.replace(
    "setTimeInputs.forEach(function (input, i) { input.value = (sets[i] && sets[i].time) || ''; });",
    "setTimeInputs.forEach(function (input, i) { input.value = (sets[i] && sets[i].time) || ''; });\n      setWeightInputs.forEach(function (input, i) { input.value = (sets[i] && sets[i].weight) || ''; });"
  );

  // 3. Update save to include weight
  js = js.replace(
    "var r = input.value ? parseInt(input.value, 10) : null;\n      var t = setTimeInputs[i].value ? parseInt(setTimeInputs[i].value, 10) : null;\n      sets.push({ reps: r, time: t });",
    "var r = input.value ? parseInt(input.value, 10) : null;\n      var t = setTimeInputs[i].value ? parseInt(setTimeInputs[i].value, 10) : null;\n      var w = setWeightInputs[i] && setWeightInputs[i].value ? parseInt(setWeightInputs[i].value, 10) : null;\n      sets.push({ weight: w, reps: r, time: t });"
  );

  // 4. Update hasSetData check to include weight
  js = js.replace(
    "var hasSetData = sets.some(function (s) { return s.reps || s.time; });",
    "var hasSetData = sets.some(function (s) { return s.weight || s.reps || s.time; });"
  );

  fs.writeFileSync(filePath, js);
  console.log('UPDATED: ' + f);
});
