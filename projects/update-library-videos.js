const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'exercise-library.json');
const lib = JSON.parse(fs.readFileSync(libPath, 'utf8'));

// All approved video links from Justus + Kay programs
const videoMap = {
  "Toe Yoga (Isolation Drill)": "https://youtube.com/shorts/9iYGZGhfCd8?si=VU0HpAT3l3DbeRn0",
  "Short Foot Exercise (Foot Doming)": "https://youtube.com/shorts/IqlAEjkc4kY?si=VjH9WdGVRC9giMyg",
  "Scapula Push-Ups": "https://youtube.com/shorts/SBPRhZI2RkI?si=jYqPemAlQq_8AVhD",
  "Scapula Push-Ups (Protraction & Retraction)": "https://youtube.com/shorts/SBPRhZI2RkI?si=jYqPemAlQq_8AVhD",
  "Dead Bug -- Arms Only (Breathing Focus)": "https://youtube.com/shorts/ZKZU7T2llwA?si=Z_H4tivd3WpApD25",
  "Dead Bug -- Contralateral Arms and Legs": "https://youtube.com/shorts/ZKZU7T2llwA?si=Z_H4tivd3WpApD25",
  "Dead Bug (Static \u2192 Movement)": "https://youtube.com/shorts/ZKZU7T2llwA?si=Z_H4tivd3WpApD25",
  "Bear Crawl Hold (Static)": "https://youtube.com/shorts/aVhdFy9gL-g?si=KNrSsT6zZdyEdtPG",
  "Bear Crawl -- Slow Forward/Backward": "https://youtube.com/shorts/aVhdFy9gL-g?si=KNrSsT6zZdyEdtPG",
  "Bear Crawl (Static Hold \u2192 Crawl)": "https://youtube.com/shorts/aVhdFy9gL-g?si=KNrSsT6zZdyEdtPG",
  "Wall Slides": "https://youtube.com/shorts/_ta0-N6xTgQ?si=DvJY971QRnIJaumH",
  "Prone Y-T-W Raises (Floor)": "https://youtube.com/shorts/qUc2jCbZoYg?si=jOHweuJ_ffO8CzYV",
  "Prone Y-T-W Raises": "https://youtube.com/shorts/qUc2jCbZoYg?si=jOHweuJ_ffO8CzYV",
  "Prone Y-T-W-I Raises": "https://youtube.com/shorts/qUc2jCbZoYg?si=jOHweuJ_ffO8CzYV",
  "Banded Shoulder Dislocations": "https://youtube.com/shorts/qJz79bK7QS8?si=9E2vwE5i6Hj1-YsZ",
  "Prone Shoulder CARS (Handcuff Position)": "https://youtube.com/shorts/-8MolSOs0Ys?si=XFFbK4o2ixQhbqFy",
  "Band Pull-Aparts": "https://youtube.com/shorts/EBXD9orJyBQ?si=tjgpdUUQO12mjOd1",
  "Band Pull-Apart": "https://youtube.com/shorts/EBXD9orJyBQ?si=tjgpdUUQO12mjOd1",
  "Crawl Position Sit-Outs": "https://youtube.com/shorts/1psHWkBOHfM?si=M3huE-0OMxbdv7m1",
  "Kneeling Backward Plyo Ball Throws": "https://youtube.com/shorts/uc9tEWSd1K0?si=atvppwycixCBYvII",
  "Turkish Get-Up": "https://youtube.com/shorts/a5rr2Jynh2U?si=q5KWVCBnxUNnFIgu",
  "Side-Lying Clamshell (Mini Band)": "https://youtube.com/shorts/Hj-2r7OlXuE?si=Ho75Dxk2iVSgv-mn",
  "Crawl Position Bird-Dog": "https://youtube.com/shorts/dQ1r9o_tbj8?si=fGSp6dl6T43mUP5O",
  "Bird-Dog": "https://youtube.com/shorts/dQ1r9o_tbj8?si=fGSp6dl6T43mUP5O",
  "Swiss Ball Hamstring Curls": "https://youtube.com/shorts/xwMN6AC_VwU?si=bvUZXefYoebCHTtp",
  "Swiss Ball Hamstring Curl": "https://youtube.com/shorts/xwMN6AC_VwU?si=bvUZXefYoebCHTtp",
  "Dynamic Straight-Leg Hamstring Kicks": "https://youtube.com/shorts/AhO44Sov0SY?si=yX1pEM02AY04dngs",
  "Lateral Band Walk (Monster Walk)": "https://youtube.com/shorts/BmxtM0fT4xs?si=kfFAoLxvbdzcJrbc",
  "Alternating Single-Leg Squat & RDL": "https://youtube.com/shorts/ctHgSZhL3gs?si=hvGJgOjOBEksmtzM",
  "Standing Pallof Press": "https://youtube.com/shorts/knoBudRYK8E?si=fAnDNey9nwMAmZPM",
  "Pallof Press (Band/Cable)": "https://youtube.com/shorts/knoBudRYK8E?si=fAnDNey9nwMAmZPM",
  "Side Plank + Copenhagen Side Plank": "https://youtube.com/shorts/wR6zrHOnrGk?si=L_R_a8-2IrABNBWF",
  "Side Plank": "https://youtube.com/shorts/wR6zrHOnrGk?si=L_R_a8-2IrABNBWF",
  "Copenhagen Side Plank": "https://youtube.com/shorts/wR6zrHOnrGk?si=L_R_a8-2IrABNBWF",
  "Isometric Lunge Pallof Press": "https://youtube.com/shorts/qMWhizwlsxY?si=xPzNDFS0rnhl4t-s",
  "Isometric Lunge Holds \u2192 Bulgarian Split Squat Iso's": "https://youtube.com/shorts/Nkj5yzOUnxQ?si=Sy_QcAMANwHzmWSr",
  "Sissy Squat (Iso \u2192 Progressive ROM)": "https://youtube.com/shorts/wX_SBQInZcs?si=OQ2MzVktMMQsNssa",
  "Single-Leg Balance Hops to Stick \u2192 Drop Landing Progression": "https://youtube.com/shorts/bOdz7FZy4xA?si=HTUR8h_yRDO_zsjF",
  "Wrist CARS + Pronation / Supination": "https://www.youtube.com/watch?v=20w70zUTZik",
  "Neck CARS (Quadruped + Supine Off-Bench)": "https://youtube.com/shorts/7KjzapyyJf0?si=r8_kzhAKR5XyFNTo",
  "90/90 External Rotation (Thrower's Position)": "https://youtube.com/shorts/daeeEdNt78Q?si=wycc1dKEnlug0W7y",
  // Strength library matches from Kay
  "Glute Bridge": "https://youtube.com/shorts/L9kD8sEL-js?si=iFQZBPnyIBo0j-Fj",
  "Single-Leg Glute Bridge": "https://youtube.com/shorts/L9kD8sEL-js?si=iFQZBPnyIBo0j-Fj",
  "KB Deadlift (Sumo Stance)": "https://youtube.com/shorts/I7q_EPywprs?si=NAh4eLQJUOHGGfv3",
  "Reverse Lunge": "https://youtube.com/shorts/iaXnGoWZ-MA?si=ngsiU_6dGnjO4XXl",
  "Single-Arm DB Row (Bird-Dog Position)": "https://youtube.com/shorts/njnGtfSfIqg?si=3h3h-Kr9o0cIqT-0",
  "Single-Arm DB Row (Bench-Supported)": "https://www.youtube.com/shorts/qN54-QNO1eQ",
  "Face Pull (Cable/Band)": "https://youtube.com/shorts/ZAnCd0fUg2s?si=NDEs_GC7DBlt1F-O",
  "Farmer / Suitcase / Cross-Body Carry": "https://youtube.com/shorts/hGib77xYs7M?si=b7RfPl9FW-WbUnrs",
  "Push-Up": "https://youtube.com/shorts/4Bc1tPaYkOo?si=f-56wu1CyeKq-Ywh",
  "Push-Up (Iso Hold)": "https://youtube.com/shorts/4Bc1tPaYkOo?si=f-56wu1CyeKq-Ywh",
  "DB Bench Press": "https://youtube.com/shorts/mTaiQemkEpU?si=Na0UNQQsGqyTCytg",
  "Half-Kneeling DB Press": "https://youtube.com/shorts/gd5UrdxVn6Q?si=u6_wl-ZrmmGjiLzE",
  "Landmine Press (Half-Kneeling)": "https://youtube.com/shorts/95U7U1JfMNU?si=Rl2YpL9MAbUNpuUM",
  "Cable Tricep Pushdown": "https://youtube.com/shorts/JyqX6S6Z7RA?si=dbY8sJqHs-wkBObV",
  "Lateral DB Fly": "https://youtube.com/shorts/FIQt9pqinXc?si=aJlnevaj-LwZX-gE",
  "Cable/Band Chest Fly": "https://youtube.com/shorts/y4RJDSOBEl8?si=F3PwXgVEV0WU93wH",
  "Single-Arm DB Bench Press": "https://youtube.com/shorts/Cs2uNF-jW5s?si=CfbzgVTJWjkefrdX",
  "Lat Pulldown": "https://youtube.com/shorts/LEaBn_R2S4M?si=zZwJHn5rSfof6yx8",
  "Single-Leg RDL \u2014 DB/KB": "https://youtube.com/shorts/QdN6IV84BiM?si=irGhSEXYaMrowoe7",
  "Cable Row (Seated)": "https://youtube.com/shorts/5Swv2DUetjk?si=fNmGfxvZEEMsDsLp",
  "DB Bicep Curl": "https://youtube.com/shorts/iui51E31sX8?si=6GNJNRVkWUrPOnCU",
  "B-Stance Hip Thrust": "https://youtube.com/shorts/b3SOY5ljRsM?si=WkG4dHiizI-CDjOL",
  "Max Height Skips": "https://youtube.com/shorts/PYzQTWVn8lk?si=Mv9yMJn32B7TscyU",
  "Lateral Skater Jumps": "https://youtube.com/shorts/IkGOdk2VDJw?si=mRVX_jiccW28VOSb",
  "Broad Jump": "https://youtube.com/shorts/lMRZLjhdQ7Y?si=YozA_z0eQ4oq6C0z",
  "Squat Jump (Bodyweight)": "https://youtube.com/shorts/mAGRr3ZMF20?si=9hGwk5SkbBzNTcKE",
  "Squat Jump to Stick (3s Hold)": "https://youtube.com/shorts/mAGRr3ZMF20?si=9hGwk5SkbBzNTcKE",
  "Cossack Squat": "https://youtube.com/shorts/TR4GN3rLuQ8?si=QWz_qMiKKSxwgWkV",
  "Cossack Squat (Iso Hold)": "https://youtube.com/shorts/TR4GN3rLuQ8?si=QWz_qMiKKSxwgWkV",
  "Marinovich Swiss Ball Rotations": "https://youtube.com/shorts/-8MolSOs0Ys?si=XFFbK4o2ixQhbqFy",
  "Superman / Prone Back Extension (Floor)": "https://youtube.com/shorts/zlIEq_iXWQA?si=mA_IpkDjvNTIlym7",
  "Bodyweight Squat (Iso Hold)": "https://youtube.com/shorts/yTDROg8zZsU?si=Wgmk4zbb58VRJcAH",
  "Bodyweight Squat": "https://youtube.com/shorts/yTDROg8zZsU?si=Wgmk4zbb58VRJcAH",
  "Scapular Pull-Up": "https://youtube.com/shorts/scz21w0Ub0M?si=QatEkAcyr2oSoaak",
  "Reverse Cable/Band Fly": "https://youtube.com/shorts/ZAnCd0fUg2s?si=NDEs_GC7DBlt1F-O",
  "Med Ball Slam": "https://youtube.com/shorts/-8MolSOs0Ys?si=XFFbK4o2ixQhbqFy",
};

// Walk every exercise and match
let matched = 0;
let total = 0;
let unmatched = [];

function updateExercises(exercises, catLabel) {
  exercises.forEach(ex => {
    total++;
    if (ex.videoLink) { matched++; return; } // already has one

    // Exact match
    if (videoMap[ex.name]) {
      ex.videoLink = videoMap[ex.name];
      matched++;
      return;
    }

    // Normalized match
    const clean = s => s.replace(/[\u2014\u2013\u2192\-\/\(\)]/g, ' ').replace(/\s+/g,' ').trim().toLowerCase();
    for (const [name, url] of Object.entries(videoMap)) {
      if (clean(ex.name) === clean(name)) {
        ex.videoLink = url;
        matched++;
        return;
      }
    }

    unmatched.push((catLabel || '') + ' | ' + ex.name);
  });
}

Object.values(lib.categories).forEach(cat => {
  const label = cat.label || '';
  if (cat.exercises) updateExercises(cat.exercises, label);
  if (cat.subcategories) {
    Object.values(cat.subcategories).forEach(sub => {
      updateExercises(sub.exercises, label + ' / ' + (sub.label || ''));
    });
  }
});

fs.writeFileSync(libPath, JSON.stringify(lib, null, 2));
console.log('Matched: ' + matched + ' / ' + total);
console.log('Still need videos: ' + unmatched.length);
console.log('---');
unmatched.forEach((u, i) => console.log((i+1) + '. ' + u));
