const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'exercise-library.json');
const lib = JSON.parse(fs.readFileSync(libPath, 'utf8'));

// === EXERCISES TO DROP ===
const toDrop = new Set([
  "Banded Ankle 4-Way",
  "Single-Leg Balance on Foam Pad (Eyes Closed)",
  "Reactive Drop Landing to Throw (Single-Leg)",
  "Multi-Directional Agility Ladder with Perturbation",
  "Crocodile Breathing (Prone)",
  "Supine 90/90 Hip Lift (Basic)",
  "Supine Diaphragmatic Breathing with Hand Feedback",
  "90/90 Hip Lift with Ball Squeeze and Reach",
  "Tall Kneeling Overhead Med Ball Catch and Throw",
  "Supine Chin Tuck (Deep Neck Flexor Activation)",
  "Deep Neck Flexor Endurance Hold",
  "Seated Wall Slide (Scapular Upward Rotation)",
  "Quadruped Chin Tuck with Neck Isometrics",
  "Half-Kneeling Banded Neck Isometric with Pallof Hold",
  "Prone Y-T-W on Incline Bench with Light Dumbbells",
  "Tall Kneeling Banded Neck Flexion/Extension with Perturbations",
  "Overhead Carry with Packed Neck (Bottoms-Up KB)",
  "Standing 4-Way Neck Machine (Eccentric Emphasis)",
  "Drop Step to Throw with Perturbation",
  "Ankle Dorsiflexion Half-Kneeling Wall Stretch",
  "Half-Kneeling Adductor Rockback",
  "Quadruped T-Spine CARS",
  "Half-Kneeling Arm Bar with Rotation",
  "Sidelying External Rotation (Dumbbell)",
  "Prone Horizontal Abduction at 90 (Full Can)",
  "Band ER/IR at 90/90 with Rhythmic Stabilization",
  "Jaeger Band Long-Toss Simulation Series",
  "Plyometric Ball Throws (90/90 and Overhead)",
  "Quadriceps Setting (Quad Set)",
  "Prone Hip Extension (Glute Squeeze)",
  "McGill Curl-Up",
  "Rotational Medicine Ball Scoop Toss",
  "Walking Knee Hugs",
  "Inchworm to World's Greatest Stretch",
  "Reactive Drop Step to Sprint (3-Step Drop Simulation)",
]);

// === VIDEO LINKS ===
const newLinks = {
  "Tripod Foot Stance (Static Hold)": "https://youtube.com/shorts/IqlAEjkc4kY?si=VjH9WdGVRC9giMyg",
  "Towel Scrunches with Toe Spread": "https://youtube.com/shorts/TPizJY0tGEk?si=HuFTcUgiFSYA4xbI",
  "Single-Leg Calf Raise with Tripod Focus": "https://youtube.com/shorts/eA-hDC48_Qc?si=I0nS7hfrjuIdagPv",
  "Single-Leg Hop to Stick (Multi-Direction)": "https://youtube.com/shorts/anxY4FVjVzo?si=qILW2ewWUEbBnt63",
  "Lateral Band Walk with Short Foot Engagement": "https://youtube.com/shorts/0SIMd_y9V0M?si=jIWndNnD3WgUSA6D",
  "Single-Leg RDL to Overhead Press (Barefoot)": "https://youtube.com/shorts/6DZpFbR1Dl0?si=FXOZjqpkHphZhSGa",
  "Single-Leg Stance Cable Chop with Breath Tempo": "https://youtube.com/shorts/Cvet6zVyfSQ?si=-ddjeqwDOljCT02b",
  "Supine 90/90 Hip Breathing": "https://youtu.be/c0Ec3Gn5BHI?si=2Lh9HaoCpoNynedx",
  "Hip CARS (Standing)": "https://youtube.com/shorts/zSKaNK4FYho?si=OYXrg9T6r_KLGDgl",
  "Shoulder CARS (Standing)": "https://youtube.com/shorts/F87CnjvWKpc?si=5UVa8nZ_GG_ztTBM",
  "90/90 Lift-Off (Hip IR/ER End-Range Strength)": "https://youtube.com/shorts/uCpBCLUZu1A?si=7mtmLXPTW4Gj3-cH",
  "Double-Leg Pogo Hops (Ankle Bounces)": "https://youtube.com/shorts/NayP9L6Mh5A?si=-I2PctCxzlCxHkwS",
  "Lateral Bound to Stick (Bilateral to Bilateral)": "https://youtube.com/shorts/IyMLKJX4MRU?si=tXAovWM2exXRtvps",
  "Box Jump with Step-Down (16-20 inch)": "https://youtube.com/shorts/v3TRyepXnJ4?si=IPzOvvhCvXsYFrFk",
  "Drop Landing from Box (12-20 inch, progressive)": "https://youtube.com/shorts/-LSzqzL75VI?si=6iHb0bdohcfY2ahz",
  "Lateral Single-Leg Bound (Skater Hop) with Stick": "https://youtube.com/shorts/d94Z-RX0XRs?si=CBPYe3g2BX7gylGW",
  "Plank": "https://youtube.com/shorts/xe2MXatLTUw?si=Ma7IuT-BnliHSFrm",
  // Cross-references
  "Quadruped Breathing (All-Fours Belly Breathing)": "https://youtube.com/shorts/aVhdFy9gL-g?si=KNrSsT6zZdyEdtPG",
  "Standing Wall Slide with Foam Roller": "https://youtube.com/shorts/_ta0-N6xTgQ?si=DvJY971QRnIJaumH",
  "90/90 Hip Switch (Shinbox)": "https://youtube.com/shorts/y_6i7nGHAio?si=0qSbEI3ml7MFiVn_",
  "Lateral Bound to Stick (Single-Leg Landing)": "https://youtube.com/shorts/IkGOdk2VDJw?si=mRVX_jiccW28VOSb",
};

// === RENAMES ===
const toRename = {
  "Half-Kneeling Pallof Press with Breath Hold": "ISO Pallof Press Walkouts",
  "Dead Bug with Band Resistance (Contralateral)": "Advanced Dead Bug",
  "Bear Crawl with Perturbation (Partner Push)": "Lizard Crawl",
  "Open Book Thoracic Rotation (Side-lying)": "World's Greatest Stretch",
  "World's Greatest Stretch (with Rotation)": "World's Greatest Stretch (with Rotation)",
  "Sleeper Stretch to Prone Shoulder CARS Combo": "Sleeper Stretch / Banded",
  "Standing Bow (Hip Extension + Shoulder Flexion End-Range Hold)": "Hip Mobility Flow",
  "Loaded Cossack Squat": "Loaded Cossack Squat",
  "Lateral Lunge to Overhead Reach": "Lateral Lunge to Rotational Reach",
};

// Video links for renamed exercises
const renamedLinks = {
  "ISO Pallof Press Walkouts": "https://youtube.com/shorts/W7pHDQYeWXY?si=3HtknBu4FXcLvtvV",
  "Advanced Dead Bug": "https://youtube.com/shorts/iW_CtYtzbeU?si=CF1vAlh-TcLm4pyt",
  "Lizard Crawl": "https://youtube.com/shorts/5pwEQswmePk?si=evRw5-yzEB_xstoF",
  "World's Greatest Stretch": "https://youtube.com/shorts/BtlDLVmlBb4?si=qg-VGHTqoeoprpEz",
  "Sleeper Stretch / Banded": "https://youtube.com/shorts/MrOwFwj2wwQ?si=Q4NXNhIYZ4pWLMwc",
  "Hip Mobility Flow": "https://youtube.com/shorts/O3Dudt2-OQ4?si=ajpU7ffk5qRc4Gpq",
  "Lateral Lunge to Rotational Reach": "https://youtube.com/shorts/VaJOo2Kb1OU?si=CrepVLV0dqeKFoXd",
};

// === NEW EXERCISES TO ADD ===
// Plyos section
const newPlyos = [
  { id: "plyo-new-01", name: "2-Foot Forward Hurdle Hops", difficulty: 3, videoLink: "https://youtube.com/shorts/ojIxuqn7OnE?si=CdO1qA3-p2DEbjnS" },
  { id: "plyo-new-02", name: "2-Foot Lateral Hurdle Hops", difficulty: 3, videoLink: "https://youtube.com/shorts/EL3wXPrrQ4Q?si=wr8JANlwni0oZuHi" },
  { id: "plyo-new-03", name: "2-Foot 3-Way Hurdle Hops", difficulty: 3, videoLink: "https://youtube.com/shorts/bmKpte7iv0Y?si=cusBY2XUkBUPTtb7" },
  { id: "plyo-new-04", name: "Rear Foot Elevated Lateral Hops", difficulty: 4, videoLink: "https://youtube.com/shorts/nYjaHfBAZUk?si=G3R_4-hn-DoRbNwm" },
  { id: "plyo-new-05", name: "Rear Foot Elevated Vertical Plyo", difficulty: "4-5", videoLink: "https://youtube.com/shorts/SsXINDkWYbU?si=Ji1ehEqBnDv4X7uj" },
  { id: "plyo-new-06", name: "High Forward Hurdle Hops", difficulty: 5, videoLink: "https://youtube.com/shorts/BIpGY3sfHVM?si=WgacorRCQnr4WV6k" },
  { id: "plyo-new-07", name: "High Lateral Hops", difficulty: 5, videoLink: "https://youtube.com/shorts/1rDb0wzxtXw?si=-tbf1-fvQwTIRzDs" },
];

// Cross-reference existing plyo videos for the "add any videos we have" note
const plyoCrossRef = {
  "Lateral Single-Leg Bound (Skater Hop) with Stick": "https://youtube.com/shorts/d94Z-RX0XRs?si=CBPYe3g2BX7gylGW",
  "Single-Leg Box Jump (12-16 inch)": "https://youtube.com/shorts/x2scn5kx5pw?si=R_CSZudgnlvLDTXN",
};

// === PROCESS ===
let dropped = 0, linked = 0, renamed = 0, added = 0;

function processExercises(exercises) {
  // Drop
  const before = exercises.length;
  const filtered = exercises.filter(ex => {
    if (toDrop.has(ex.name)) {
      console.log('DROPPED: ' + ex.name);
      dropped++;
      return false;
    }
    return true;
  });

  // Rename, link
  filtered.forEach(ex => {
    if (toRename[ex.name] && toRename[ex.name] !== ex.name) {
      console.log('RENAMED: ' + ex.name + ' -> ' + toRename[ex.name]);
      ex.name = toRename[ex.name];
      renamed++;
    }
    if (renamedLinks[ex.name] && !ex.videoLink) {
      ex.videoLink = renamedLinks[ex.name];
      linked++;
    }
    if (newLinks[ex.name] && !ex.videoLink) {
      ex.videoLink = newLinks[ex.name];
      linked++;
    } else if (newLinks[ex.name] && ex.videoLink !== newLinks[ex.name]) {
      ex.videoLink = newLinks[ex.name];
      linked++;
    }
    if (plyoCrossRef[ex.name] && !ex.videoLink) {
      ex.videoLink = plyoCrossRef[ex.name];
      linked++;
    }
  });

  return filtered;
}

Object.values(lib.categories).forEach(cat => {
  if (cat.exercises) cat.exercises = processExercises(cat.exercises);
  if (cat.subcategories) {
    Object.values(cat.subcategories).forEach(sub => {
      sub.exercises = processExercises(sub.exercises);
    });
  }
});

// Add new plyo exercises
if (lib.categories.plyos && lib.categories.plyos.exercises) {
  newPlyos.forEach(p => {
    lib.categories.plyos.exercises.push({
      id: p.id,
      name: p.name,
      difficulty: p.difficulty,
      breathingType: "dynamic",
      primaryFocus: ["landing-mechanics", "CNS-activation"],
      secondaryFocus: ["calves/ankles", "quads", "glutes"],
      prescription: "",
      cue: "",
      prerequisites: [],
      videoLink: p.videoLink,
      notes: ""
    });
    added++;
    console.log('ADDED: ' + p.name);
  });
}

// Recount
let total = 0, withVideo = 0, noVideo = [];
Object.entries(lib.categories).forEach(([ck, cat]) => {
  if (cat.exercises) cat.exercises.forEach(ex => {
    total++;
    if (ex.videoLink) withVideo++;
    else noVideo.push((cat.label||ck) + ' | ' + ex.name);
  });
  if (cat.subcategories) Object.entries(cat.subcategories).forEach(([sk, sub]) => {
    sub.exercises.forEach(ex => {
      total++;
      if (ex.videoLink) withVideo++;
      else noVideo.push((cat.label||ck) + ' / ' + (sub.label||sk) + ' | ' + ex.name);
    });
  });
});

lib.meta.totalExercises = total;
lib.meta.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(libPath, JSON.stringify(lib, null, 2));

console.log('\n=== RESULTS ===');
console.log('Dropped: ' + dropped);
console.log('Renamed: ' + renamed);
console.log('Linked: ' + linked);
console.log('Added: ' + added);
console.log('Total exercises: ' + total);
console.log('With video: ' + withVideo);
console.log('Without video: ' + noVideo.length);
console.log('\n=== STILL WITHOUT VIDEO ===');
noVideo.forEach((e, i) => console.log((i+1) + '. ' + e));
