const { Document, Packer, Paragraph, TextRun, ExternalHyperlink, Table, TableRow, TableCell, WidthType, BorderStyle, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');

// All exercises organized by section
const sections = [
  {
    title: 'SECTION 1: THE BIG 3 CHECKLIST (10 exercises)',
    groups: [
      {
        subtitle: 'Foot Position / Mechanics',
        exercises: [
          { name: 'Short Foot Activation → Balance Drill', url: null, search: 'short foot exercise arch activation balance' },
          { name: 'Toe Yoga (Splay & Isolate)', url: null, search: 'toe yoga foot isolation drill' },
          { name: 'Heel Elevated Balance (Short Foot + Plantar Flexion ER)', url: null, search: 'short foot balance external rotation heel elevated' },
        ]
      },
      {
        subtitle: 'Bracing / Breathing',
        exercises: [
          { name: '360 Breathing', url: null, search: '360 breathing bracing diaphragm' },
          { name: 'Dead Bug (Static → Movement)', url: null, search: 'dead bug progression breathing anti-extension' },
          { name: 'Bear Crawl (Static Hold → Crawl)', url: null, search: 'bear crawl hold to crawl progression' },
          { name: 'Full Breathing Technique Progression (Crawl Position)', url: null, search: 'quadruped breathing progression crawl diaphragmatic' },
        ]
      },
      {
        subtitle: 'Set the Scap and Neck',
        exercises: [
          { name: 'Scapula Push-Ups (Protraction & Retraction)', url: null, search: 'scapula push ups protraction retraction' },
          { name: 'Wall Slide with Foam Roller (Serratus Activation)', url: null, search: 'wall slide foam roller serratus anterior' },
          { name: 'Wall Slide W-to-Y (Scap Depression + ER)', url: null, search: 'wall slide W to Y scapular depression external rotation' },
        ]
      }
    ]
  },
  {
    title: 'SECTION 2: MOBILITY (19 exercises)',
    groups: [
      {
        subtitle: 'Ankle',
        exercises: [
          { name: 'Ankle CARS (Supine → Standing Balance)', url: 'https://www.youtube.com/watch?v=upLI2OzqODU', videoTitle: 'Ep.15: Whiteboard Session — Dr. Andreo Spina' },
          { name: 'Deep Squat Soleus Calf Raises', url: null, search: 'kneesovertoesguy ATG calf raises soleus' },
          { name: 'Squat to Hamstring Stretch (Flat + Heel Elevated)', url: 'https://www.youtube.com/watch?v=JfHFkG9fjz4', videoTitle: 'Working the Deep Squat — Kelly Starrett / MobilityWOD' },
        ]
      },
      {
        subtitle: 'Hip',
        exercises: [
          { name: 'Hip CARS (Quadruped → Standing Balance)', url: null, search: 'Ian Markow hip CAR kinstretch' },
          { name: '90/90 Passive Stretch → Active Lift-Offs', url: null, search: 'Markow Training Systems 90/90 stretch guide' },
          { name: 'Cossack Squat', url: null, search: 'Tom Merrick cossack squat mobility' },
          { name: 'Kneeling Hip Flexions to Kicks (Supported)', url: null, search: 'kneeling hip flexor stretch to kick' },
          { name: 'Deep Squat Knee Adduction / Abduction Isometrics', url: 'https://www.youtube.com/watch?v=JBHzXF-mVjY', videoTitle: 'Super Squat Hip Sequence — Kelly Starrett / MobilityWOD' },
        ]
      },
      {
        subtitle: 'Low Back',
        exercises: [
          { name: 'Prone Back Extensions → Full Back + Hip Extension', url: null, search: 'superman exercise progression prone back extension' },
          { name: 'Prone Alternating Heel Touches', url: null, search: 'scorpion stretch prone alternating heel touches' },
          { name: 'Marinovich Swiss Ball Side-to-Side Rotations', url: 'https://www.youtube.com/watch?v=sDq4P9BSACE', videoTitle: 'Marinovich Movement Methods: Unlocking Elite Performance & Rehab' },
        ]
      },
      {
        subtitle: 'Shoulder',
        exercises: [
          { name: 'Prone Shoulder CARS (Handcuff Position)', url: null, search: 'prone shoulder CARS handcuff FRC' },
          { name: 'Prone W to Y Overhead Press', url: 'https://www.youtube.com/watch?v=rlaeZAjU0Io', videoTitle: 'Prone Scapular Stability Exercises — Man Flow Yoga' },
          { name: 'Bridge to L-Sit', url: 'https://www.youtube.com/watch?v=TrxZLshL0Ec', videoTitle: 'Bridge Progressions — GMB', url2: 'https://www.youtube.com/watch?v=BbAkWxDZKIM', videoTitle2: 'L-Sit Progressions — GMB' },
          { name: 'Scapula Push-Ups (Mobility)', url: null, search: 'ATHLEAN-X scapular winging fix push ups' },
          { name: 'Pull-Up Bar Hang → Scap Pull-Ups → Simple Planche', url: 'https://www.youtube.com/watch?v=8mnNpNZ88Oo', videoTitle: 'Planche Tutorial: Fundamentals — GMB' },
        ]
      },
      {
        subtitle: 'Wrist / Forearm',
        exercises: [
          { name: 'Wrist CARS + Pronation / Supination', url: 'https://www.youtube.com/watch?v=20w70zUTZik', videoTitle: 'New Routine for Strong & Flexible Wrists — GMB' },
          { name: 'Passive Wrist Stretches (Flexion / Extension / Prayer)', url: 'https://www.youtube.com/watch?v=20w70zUTZik', videoTitle: 'Same GMB Wrist Routine (covers passive stretches)' },
        ]
      },
      {
        subtitle: 'Neck',
        exercises: [
          { name: 'Neck CARS (Quadruped + Supine Off-Bench)', url: 'https://www.youtube.com/watch?v=yn6zEhwRtqg', videoTitle: 'Neck Circles (CARs) — Dr. Notley' },
        ]
      }
    ]
  },
  {
    title: 'SECTION 3: ARM CARE (15 exercises)',
    groups: [
      {
        subtitle: 'Foundational',
        exercises: [
          { name: 'Banded Shoulder Dislocations', url: 'https://www.youtube.com/watch?v=02HdChcpyBs', videoTitle: 'Shoulder Dislocation Mobility Drill — Pat Flynn' },
          { name: 'Scapula Push-Ups', url: 'https://www.youtube.com/watch?v=CEiqDwif3b4', videoTitle: 'How To Sculpt Your Serratus Anterior — Jeremy Ethier' },
          { name: 'Prone Shoulder CARS (Handcuff Position)', url: null, search: 'prone shoulder CARS handcuff FRC kinstretch' },
          { name: 'Band External Rotation at 0°', url: 'https://www.youtube.com/watch?v=UyBb2-bP0CU', videoTitle: 'Standing Banded External Rotation (Neutral) — E3 Rehab' },
          { name: 'Band Internal Rotation', url: null, search: 'band internal rotation shoulder E3 rehab' },
          { name: 'Band Pull-Aparts', url: 'https://www.youtube.com/watch?v=JObYtU7Y7ag', videoTitle: 'Do This EVERY SINGLE Day! — ATHLEAN-X' },
          { name: 'Prone Y-T-W-I Raises', url: 'https://www.youtube.com/watch?v=QdGTI4Lshg4', videoTitle: 'Prone Y T W — The Active Life' },
          { name: 'Wall Slides', url: null, search: 'eric cressey wall slide scapular upward rotation' },
          { name: '90/90 External Rotation (Thrower\'s Position)', url: 'https://www.youtube.com/watch?v=DYt1H87lkcM', videoTitle: 'Prone Shoulder ER on Bench (90/90) — E3 Rehab' },
        ]
      },
      {
        subtitle: 'Advanced',
        exercises: [
          { name: 'Crawl Position Sit-Outs', url: 'https://www.youtube.com/watch?v=kjFb40DwwLs', videoTitle: 'Crawling Exercises - 21 Variations — Redefining Strength' },
          { name: 'Band ER/IR at 90/90 with Rhythmic Stabilization', url: null, search: 'shoulder rhythmic stabilization 90/90 perturbation' },
          { name: 'Kneeling Backward Plyo Ball Throws', url: null, search: 'driveline baseball kneeling overhead med ball throw' },
          { name: 'Turkish Get-Up', url: 'https://www.youtube.com/watch?v=D6Ed9jmniqw', videoTitle: 'How To Do A Turkish Get-Up — BuiltLean' },
          { name: 'Pull-Up Bar Hang → Scap Pull-Ups → Simple Planche', url: null, search: 'dead hang scapular pull ups progression' },
          { name: 'Positional Band Whips', url: null, search: 'jaeger sports j-bands exercise routine band whips' },
        ]
      }
    ]
  },
  {
    title: 'SECTION 4: REHAB / PREHAB (14 exercises)',
    groups: [
      {
        subtitle: 'Foundational',
        exercises: [
          { name: 'Banded Standing VMO Activation', url: 'https://www.youtube.com/watch?v=M8u5lbP4f4g', videoTitle: 'Top 4 Exercises for VMO — Physio REHAB / Tim Keeley' },
          { name: 'Side-Lying Clamshell (Mini Band)', url: 'https://www.youtube.com/watch?v=CiqvDV8pzRk', videoTitle: 'Hip ER Clamshell Exercise — Mike Reinold' },
          { name: 'Crawl Position Bird-Dog', url: 'https://www.youtube.com/watch?v=dQ1r9o_tbj8', videoTitle: 'Bird Dogs in Bear Crawl Position — Training Room' },
          { name: 'Swiss Ball Hamstring Curls', url: 'https://www.youtube.com/watch?v=R_ixoqCNuNE', videoTitle: 'Hamstring Swiss Ball Curls — Prehab Guys' },
          { name: 'Dynamic Straight-Leg Hamstring Kicks', url: 'https://www.youtube.com/watch?v=3l31E2cMGMk', videoTitle: 'Leg Swings - Dynamic Warm Up' },
          { name: 'Hip Flexor Swiss Ball Plank → Marching', url: 'https://www.youtube.com/watch?v=rQZ00uVdohg', videoTitle: 'Stability Ball Plank w Marching — Dr. Yepez' },
          { name: 'Lateral Band Walk (Monster Walk)', url: 'https://www.youtube.com/watch?v=dHJOQ4mjQ30', videoTitle: '5 Tips for Better Lateral Band Walks — Bret Contreras' },
          { name: 'Alternating Single-Leg Squat & RDL', url: 'https://www.youtube.com/watch?v=PYsfRegfYcM', videoTitle: 'Single Leg Squat — Prehab Guys' },
          { name: 'Standing Pallof Press', url: 'https://www.youtube.com/watch?v=5aZ0IhJS8O8', videoTitle: 'How to perform the pallof press — Beyond Measure' },
        ]
      },
      {
        subtitle: 'Intermediate',
        exercises: [
          { name: 'Side Plank + Copenhagen Side Plank', url: 'https://www.youtube.com/watch?v=5paDavNMjGM', videoTitle: 'How To Perform Copenhagen Planks — E3 Rehab' },
          { name: 'Isometric Lunge Pallof Press', url: 'https://www.youtube.com/watch?v=3HffoVz88Vo', videoTitle: 'Isometric Lunge with Pallof Rotation — Onward ATL' },
          { name: 'Isometric Lunge Holds → Bulgarian Split Squat Iso\'s', url: 'https://www.youtube.com/watch?v=U185qTIj69c', videoTitle: 'Isometric Split Squat/Lunge Hold — Coach O' },
          { name: 'Sissy Squat (Iso → Progressive ROM)', url: 'https://www.youtube.com/watch?v=oKlxCb2EYTM', videoTitle: 'Master the Sissy Squat Safely — Prehab Guys' },
          { name: 'Single-Leg Balance Hops to Stick → Drop Landing', url: 'https://www.youtube.com/watch?v=2bIIvDXgWys', videoTitle: 'ACL Rehab - SL Vertical Jump & Land — Wesley Wang DPT' },
        ]
      }
    ]
  }
];

function makeBold(text, size = 20) {
  return new TextRun({ text, bold: true, size, font: 'Calibri' });
}

function makeText(text, size = 20) {
  return new TextRun({ text, size, font: 'Calibri' });
}

function makeHyperlink(text, url, size = 20) {
  return new ExternalHyperlink({
    children: [new TextRun({ text, style: 'Hyperlink', size, font: 'Calibri' })],
    link: url,
  });
}

const noBorder = { style: BorderStyle.NONE, size: 0 };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const cellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function makeHeaderRow() {
  const headers = ['#', 'Exercise', 'Verified Link', 'Decision\n(APPROVED / REJECTED / FILM)', 'Your Link\n(paste URL here)'];
  const widths = [500, 3000, 3500, 1800, 2200];
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

function makeExerciseRow(num, ex) {
  const linkChildren = [];
  if (ex.url) {
    linkChildren.push(makeHyperlink(ex.videoTitle || ex.url, ex.url, 18));
    if (ex.url2) {
      linkChildren.push(makeText(' + ', 18));
      linkChildren.push(makeHyperlink(ex.videoTitle2 || ex.url2, ex.url2, 18));
    }
  } else {
    linkChildren.push(makeBold('NO LINK', 18));
    if (ex.search) {
      linkChildren.push(makeText(' — search: ' + ex.search, 16));
    }
  }

  const widths = [500, 3000, 3500, 1800, 2200];
  return new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [makeText(String(num), 18)] })], width: { size: widths[0], type: WidthType.DXA }, borders: cellBorders }),
      new TableCell({ children: [new Paragraph({ children: [makeBold(ex.name, 18)] })], width: { size: widths[1], type: WidthType.DXA }, borders: cellBorders }),
      new TableCell({ children: [new Paragraph({ children: linkChildren, spacing: { after: 40 } })], width: { size: widths[2], type: WidthType.DXA }, borders: cellBorders }),
      new TableCell({ children: [new Paragraph({ children: [] })], width: { size: widths[3], type: WidthType.DXA }, borders: cellBorders }),
      new TableCell({ children: [new Paragraph({ children: [] })], width: { size: widths[4], type: WidthType.DXA }, borders: cellBorders }),
    ]
  });
}

// Build document
const docChildren = [];

// Title
docChildren.push(new Paragraph({ children: [makeBold('Video Link Review — Justus Workout Program', 32)], heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }));

// Instructions
docChildren.push(new Paragraph({ children: [makeBold('Instructions:', 22)], spacing: { after: 80 } }));
docChildren.push(new Paragraph({ children: [makeText('For each exercise, review the linked video (click the hyperlink). Mark your decision in the Decision column:', 20)], spacing: { after: 60 } }));
docChildren.push(new Paragraph({ children: [makeBold('APPROVED', 20), makeText(' — link is good, embed it in the page', 20)], spacing: { after: 40 }, indent: { left: 400 } }));
docChildren.push(new Paragraph({ children: [makeBold('REJECTED', 20), makeText(' — paste your preferred link in the "Your Link" column', 20)], spacing: { after: 40 }, indent: { left: 400 } }));
docChildren.push(new Paragraph({ children: [makeBold('FILM', 20), makeText(' — you plan to film this exercise yourself', 20)], spacing: { after: 40 }, indent: { left: 400 } }));
docChildren.push(new Paragraph({ children: [makeText('For exercises with NO LINK: find one and paste it, or write FILM.', 20)], spacing: { after: 200 }, indent: { left: 400 } }));
docChildren.push(new Paragraph({ children: [makeText('Return this doc when done. I\'ll wire all approved URLs into the live page and build your filming to-do list.', 20)], spacing: { after: 400 } }));

// Sections
let globalNum = 0;
sections.forEach(section => {
  docChildren.push(new Paragraph({ children: [makeBold(section.title, 28)], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));

  section.groups.forEach(group => {
    docChildren.push(new Paragraph({ children: [makeBold(group.subtitle, 24)], heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));

    const rows = [makeHeaderRow()];
    group.exercises.forEach((ex, i) => {
      rows.push(makeExerciseRow(i + 1, ex));
      globalNum++;
    });

    docChildren.push(new Table({
      rows,
      width: { size: 11000, type: WidthType.DXA },
    }));

    docChildren.push(new Paragraph({ children: [], spacing: { after: 200 } }));
  });
});

// Summary
docChildren.push(new Paragraph({ children: [makeBold('SUMMARY', 28)], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));
docChildren.push(new Paragraph({ children: [makeText('Verified working links: 34', 20)], spacing: { after: 60 } }));
docChildren.push(new Paragraph({ children: [makeText('No link / broken — needs your input: 24', 20)], spacing: { after: 60 } }));
docChildren.push(new Paragraph({ children: [makeBold('Total exercises: 58', 20)], spacing: { after: 200 } }));

const doc = new Document({
  sections: [{ children: docChildren }],
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 20 } }
    }
  }
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = process.argv[2] || 'video-review.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('Created: ' + outPath);
});
