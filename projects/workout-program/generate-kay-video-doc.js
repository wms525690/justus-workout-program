const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, HeadingLevel } = require('docx');
const fs = require('fs');

function makeBold(text, size) { return new TextRun({ text, bold: true, size: size || 20, font: 'Calibri' }); }
function makeText(text, size) { return new TextRun({ text, size: size || 20, font: 'Calibri' }); }

const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const cellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function makeHeaderRow(headers, widths) {
  return new TableRow({
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({ children: [makeBold(h, 18)], spacing: { after: 40 } })],
      width: { size: widths[i], type: WidthType.DXA },
      borders: cellBorders,
      shading: { fill: 'F2F2F2' },
    })),
    tableHeader: true,
  });
}

function makeRow(cells, widths) {
  return new TableRow({
    children: cells.map((c, i) => new TableCell({
      children: [new Paragraph({ children: [typeof c === 'string' ? makeText(c, 18) : c], spacing: { after: 40 } })],
      width: { size: widths[i], type: WidthType.DXA },
      borders: cellBorders,
    })),
  });
}

const docChildren = [];

// Title
docChildren.push(new Paragraph({ children: [makeBold('Video Link Master List', 32)], heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }));

// Instructions
docChildren.push(new Paragraph({ children: [makeText('For each exercise, find a YouTube video and paste the URL. Write FILM if you plan to film it yourself.', 20)], spacing: { after: 400 } }));

// ============ SECTION 1: KAY'S NEEDS ============
docChildren.push(new Paragraph({ children: [makeBold('NEEDED FOR KAY', 28)], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 200 } }));
docChildren.push(new Paragraph({ children: [makeText('These 38 exercises are in Kay\'s active program and need video links immediately.', 20)], spacing: { after: 200 } }));

const kayExercises = [
  ['Day 1 — Pull / Lower', [
    'Single-Leg RDL — Bodyweight', 'Glute Bridge (Banded)', 'Broad Jump to Stick',
    'Reverse Lunge — Goblet', 'Single-Arm DB Row (Bird-Dog Position)', 'KB/DB Sumo Deadlift',
    'Iso Lunge Single-Arm DB Row', 'Single-Leg Glute Bridge', 'Face Pull (Band)', 'Suitcase Carry'
  ]],
  ['Day 2 — Push / Upper', [
    'Push-Up to Downward Dog', 'Split Squat (Iso Hold)', 'Lateral Skater Jumps',
    'DB Bench Press', 'Step-Up (Offset — Single DB)', 'Half-Kneeling DB Press',
    'Walking Lunge (Hands Overhead)', 'Cable Tricep Pushdown', 'Lateral DB Fly', 'Plank (Swiss Ball)'
  ]],
  ['Day 3 — Pull / Upper', [
    'Bodyweight Squat (Tempo)', 'Max Height Skips',
    'Single-Arm DB Row (Bench-Supported)', 'B-Stance Hip Thrust', 'Lat Pulldown',
    'Single-Leg RDL — DB (Contralateral)', 'Cable Row (Seated, Single-Arm)',
    'Face Pull (Cable)', 'DB Bicep Curl', 'Farmer Carry (Heavy)'
  ]],
  ['Day 4 — Push / Lower', [
    'Glute Bridge (Single-Leg Tap)', 'Push-Up (Tempo)', 'Squat Jump to Stick',
    'Goblet Squat (Heel Elevated)', 'Single-Arm DB Bench Press',
    'Landmine Press (Iso Lunge Stance)', 'Cable/Band Chest Fly', 'Cross-Body Carry (Rack + Suitcase)'
  ]],
];

const kayWidths = [400, 2800, 4500, 2300];
const kayHeaders = ['#', 'Exercise', 'Your Link (paste URL)', 'Notes (FILM if filming)'];

let kayNum = 0;
kayExercises.forEach(([dayLabel, exercises]) => {
  docChildren.push(new Paragraph({ children: [makeBold(dayLabel, 22)], heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
  const rows = [makeHeaderRow(kayHeaders, kayWidths)];
  exercises.forEach(name => {
    kayNum++;
    rows.push(makeRow([String(kayNum), name, '', ''], kayWidths));
  });
  docChildren.push(new Table({ rows, width: { size: 10000, type: WidthType.DXA } }));
  docChildren.push(new Paragraph({ children: [], spacing: { after: 200 } }));
});

// ============ SECTION 2: FULL STRENGTH LIBRARY ============
docChildren.push(new Paragraph({ children: [makeBold('FULL STRENGTH TRAINING LIBRARY — VIDEO LINKS NEEDED', 28)], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));
docChildren.push(new Paragraph({ children: [makeText('These 132 exercises are in the master library. Adding videos here makes them available for any athlete\'s program.', 20)], spacing: { after: 200 } }));

const lib = JSON.parse(fs.readFileSync('exercise-library.json', 'utf8'));
const strengthCats = ['squat', 'hinge', 'push', 'pull', 'core-7a-rotational', 'core-7b-stability'];
const libWidths = [400, 2400, 4500, 2700];
const libHeaders = ['#', 'Exercise', 'Your Link (paste URL)', 'Notes (FILM if filming)'];

let libNum = 0;
strengthCats.forEach(catKey => {
  const cat = lib.categories[catKey];
  if (!cat) return;

  docChildren.push(new Paragraph({ children: [makeBold(cat.label.toUpperCase(), 24)], heading: HeadingLevel.HEADING_3, spacing: { before: 300, after: 100 } }));

  Object.entries(cat.subcategories || {}).forEach(([subKey, sub]) => {
    docChildren.push(new Paragraph({ children: [makeBold(sub.label, 20)], spacing: { before: 100, after: 60 } }));
    const rows = [makeHeaderRow(libHeaders, libWidths)];
    sub.exercises.forEach(ex => {
      libNum++;
      rows.push(makeRow([String(libNum), ex.name, '', ''], libWidths));
    });
    docChildren.push(new Table({ rows, width: { size: 10000, type: WidthType.DXA } }));
    docChildren.push(new Paragraph({ children: [], spacing: { after: 150 } }));
  });
});

// Summary
docChildren.push(new Paragraph({ children: [makeBold('SUMMARY', 28)], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));
docChildren.push(new Paragraph({ children: [makeText('Kay\'s program — needs: 38 videos', 20)], spacing: { after: 60 } }));
docChildren.push(new Paragraph({ children: [makeText('Strength library — needs: 132 videos', 20)], spacing: { after: 60 } }));
docChildren.push(new Paragraph({ children: [makeBold('Total: 170 exercises needing video links', 20)], spacing: { after: 200 } }));

const doc = new Document({
  sections: [{ children: docChildren }],
  styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } }
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('video-needs.docx', buffer);
  console.log('Created: video-needs.docx');
});
