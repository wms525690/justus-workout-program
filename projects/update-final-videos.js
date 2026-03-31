const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'exercise-library.json');
const lib = JSON.parse(fs.readFileSync(libPath, 'utf8'));

// === NEW VIDEO LINKS ===
const newLinks = {
  "Bodyweight Squat (Iso Hold)": "https://youtube.com/shorts/SJ7r9mPL5a0?si=A-3DzxPORnd0a8L2",
  "Bodyweight Squat": "https://youtube.com/shorts/SJ7r9mPL5a0?si=A-3DzxPORnd0a8L2",
  "Goblet Squat (Iso Hold)": "https://youtube.com/shorts/pLD82dZyhDY?si=XfiZ5sXUiEJoBAFJ",
  "Goblet Squat": "https://youtube.com/shorts/pLD82dZyhDY?si=XfiZ5sXUiEJoBAFJ",
  "Double KB Front Squat": "https://youtube.com/shorts/e7y8jEUbQiQ?si=XsFa7r0wKDoOUApz",
  "Barbell Front Squat": "https://youtube.com/shorts/_qv0m3tPd3s?si=CFrS4QjXDX2fCROl",
  "Box Squat": "https://youtube.com/shorts/YOxRlwtMEWA?si=jIFOLfatyKQieh2f",
  "Barbell Back Squat": "https://youtube.com/shorts/dW3zj79xfrc?si=DyKbXYdE0PQFwIQM",
  "Goblet Split Squat": "https://youtube.com/shorts/moCfy-ak2CU?si=MZrE8m-uCh6_WB8q",
  "Step-Up (Iso Hold at Top)": "https://youtube.com/shorts/8q9LVgN2RD4?si=D8VwdnTPK4Njxi2e",
  "Step-Up": "https://youtube.com/shorts/8q9LVgN2RD4?si=D8VwdnTPK4Njxi2e",
  "Bulgarian Split Squat": "https://youtube.com/shorts/or1frhkjBDc?si=3ztltVVbwT5jmIvR",
  "Bulgarian Split Squat (Iso Hold)": "https://youtube.com/shorts/or1frhkjBDc?si=3ztltVVbwT5jmIvR",
  "Bulgarian Split Squat \u2014 DB/KB Loaded": "https://youtube.com/shorts/or1frhkjBDc?si=3ztltVVbwT5jmIvR",
  "Forward Lunge": "https://youtube.com/shorts/BYe4uyGF-h4?si=A13kJgBL15sy4sW4",
  "Walking Lunge": "https://youtube.com/shorts/BYe4uyGF-h4?si=A13kJgBL15sy4sW4",
  "Single-Leg Box Squat (Sit-to-Stand)": "https://youtube.com/shorts/AYWWdxabA3s?si=wKk3I2tyaqe611xx",
  "Skater Squat (Iso Hold)": "https://youtube.com/shorts/kUdjkvVVkWc?si=KD2-JEYbI4K0lmXI",
  "Skater Squat": "https://youtube.com/shorts/XQyUlYxTGuM?si=CWsni94aWe9SHVAm",
  "Sled March (Forward)": "https://youtube.com/shorts/B27ZkGGjHwg?si=U56iRb4wTtNzehvS",
  "Reverse Sled Drag": "https://youtube.com/shorts/CkjlvBEDlfQ?si=hl7B6Qfl4_Nb6-bP",
  "Squat Jump (Bodyweight)": "https://youtube.com/shorts/36vnWAkL7ZQ?si=Lk8qE3BVcUa-s9Id",
  "Squat Jump to Stick (3s Hold)": "https://youtube.com/shorts/36vnWAkL7ZQ?si=Lk8qE3BVcUa-s9Id",
  "Step-Up Jump": "https://youtube.com/shorts/5F--_e_LXhc?si=17QC8JrNsca39NRv",
  "Box Jump (2-Foot Jump, 1-Foot Land)": "https://youtube.com/shorts/x2scn5kx5pw?si=R_CSZudgnlvLDTXN",
  "Split Squat Jump Switch": "https://youtube.com/shorts/sR1tV08BZBo?si=y9DNT05hDm5IC3PZ",
  "Split Squat Jump \u2014 Cycle Switch": "https://youtube.com/shorts/OcyyvFUiv6I?si=ERy2W7qobSZy1Vdo",
  "Depth Drop to Squat Hold": "https://youtube.com/shorts/wVHDhdejjPE?si=GjiD-XidMQ3LZqfw",
  "Depth Jump": "https://youtube.com/shorts/gpXV2dzZ-oA?si=7ejhma6rHl5_zYrv",
  "Sled Push": "https://youtube.com/shorts/e7-4Z3TSrhQ?si=nve7_qQt0VdMClf7",
  "Multi-Directional Hop to Stick": "https://youtube.com/shorts/vzxT7X8ZC6U?si=PmJ-Pm2bYI-9MNC9",
  "45-Degree Back Extension": "https://youtube.com/shorts/d-S2VfpRL_I?si=3w9WwfEBnZaR9GkT",
  "Romanian Deadlift \u2014 DB/KB": "https://youtube.com/shorts/1yb-Yst2Tyw?si=a4vBBWu7O1eFT2BX",
  "Trap Bar Deadlift": "https://youtube.com/shorts/ZJPZQklCSLs?si=eLab1lex2FVdcD5P",
  "Sumo Barbell Deadlift": "https://youtube.com/shorts/-HIodPha7uA?si=sSaTsf3HrsId6Wb0",
  "GHD Back Extension": "https://youtube.com/shorts/8pVXATtrG1E?si=VRf8XX8cEVBXIgqR",
  "GHD Raise (Full)": "https://youtube.com/shorts/4lPHJC46ItI?si=MDkfk1EmjWts72Rd",
  "Staggered Stance RDL \u2014 DB/KB": "https://youtube.com/shorts/gw3z148hJiU?si=Q0c7S0TTBLkfL2HL",
  "Hip Thrust \u2014 Barbell": "https://youtube.com/shorts/Kvh5yudFKyM?si=ygUHCDhStjYcW6ow",
  "Single-Leg Hip Thrust": "https://youtube.com/shorts/GqVK-IKtZaU?si=hSlfHnztRQQIq8La",
  "Single-Leg Swiss Ball Hamstring Curl": "https://youtube.com/shorts/hejnIbt1tJE?si=MFWOqwP3eTwto6Kz",
  "Cable RDL to Row": "https://youtube.com/shorts/VfYyIJxTmcA?si=NrApuYq2xSwzXqTn",
  "Single-Leg Deadlift to Row": "https://youtube.com/shorts/VfYyIJxTmcA?si=NrApuYq2xSwzXqTn",
  "Single-Leg RDL to Row": "https://youtube.com/shorts/VfYyIJxTmcA?si=NrApuYq2xSwzXqTn",
  "Pull-Through (Cable/Band)": "https://youtube.com/shorts/dcHyetTdY_I?si=j_d1gLoR5PK81qsH",
  "Nordic Hamstring Curl (Eccentric)": "https://youtube.com/shorts/ehxvDjvCwHw?si=bTBG1pP2XBNQjyKO",
  "Reverse Hyper": "https://youtube.com/shorts/_9ybN0ToY4I?si=wYY20YWbIFIX66zb",
  "Single-Leg Broad Jump": "https://youtube.com/shorts/sVabwxwwd1Y?si=FGlwoE8-IURIwUs2",
  "Dynamic Straight-Leg Swiss Ball Hamstring Kicks": "https://youtube.com/shorts/v4SO81EktGQ?si=nz_LdTdMsqcW-ZgD",
  "Med Ball Slam": "https://youtube.com/shorts/reIpHeafMuc?si=pWvdnrQTQkuPf4Z-",
  "Med Ball Slam (Rotational)": "https://youtube.com/shorts/8ReGsLOc-lo?si=xVVXc8aff2Pz5ZPn",
  "Sprints \u2014 Short (15yd)": "https://youtube.com/shorts/7_-gaumnzWw?si=6vc2coXWFB-ACl0W",
  "Sled Sprints": "https://youtube.com/shorts/e7-4Z3TSrhQ?si=nve7_qQt0VdMClf7",
  "Sled Pull (Forward Lean)": "https://youtube.com/shorts/gxYXUGGUlMk?si=zJr5n4nOMgC7SJA7",
  "Dips (Assisted \u2192 Bodyweight \u2192 Weighted)": "https://youtube.com/shorts/yd3bFBUFYZI?si=nT6JMRAHLFyWbWOu",
  "Standing DB Overhead Press": "https://youtube.com/shorts/ldABahTUB0U?si=h9cMJzEp3aUNjTvA",
  "Bottom-Up KB Press": "https://youtube.com/shorts/VkHg5igybhE?si=njvQCoBpg1ww7FWi",
  "Barbell Overhead Press": "https://youtube.com/shorts/zoN5EH50Dro?si=gK3xjZbfw67NaKJz",
  "Single-Arm DB Overhead Press (Standing)": "https://youtube.com/shorts/F2x9CkRHO-8?si=gZJUdaFsMF2Z-oDH",
  "Iso Lunge Single-Arm Cable Press (Horizontal)": "https://youtube.com/shorts/5L2uvIACYog?si=LxQN1D-mrNf_7zdm",
  "Split Stance Landmine Press": "https://youtube.com/shorts/a4zbCZ-h3X0?si=fvqdx8DKr9XoTcA-",
  "Plyo Push-Up": "https://youtube.com/shorts/8HxnxfcqrEw?si=LNCn_aqxpDmOrF_Q",
  "Med Ball Chest Pass": "https://youtube.com/shorts/YsVYyjCM1fA?si=N8u_VZKCvgn9-yfM",
  "Med Ball Overhead Throw (Forward)": "https://youtube.com/shorts/reIpHeafMuc?si=pWvdnrQTQkuPf4Z-",
  "Landmine Push Press": "https://youtu.be/bC9DNLeDiZo?si=6MAvFgs8NgYCXXZ7",
  "TRX/Ring Row (Inverted Row)": "https://youtube.com/shorts/iY6HcOrPVB0?si=P3E-0DCW9s7DBlak",
  "Chest-Supported DB Row": "https://youtube.com/shorts/BzMCCQAxKPU?si=xm6lXu-o-K-eDadF",
  "KB Gorilla Row": "https://youtube.com/shorts/Prwa0uFbSYU?si=9GZN0TLqctdPojUY",
  "Assisted Pull-Up (Band)": "https://youtube.com/shorts/aFb65fs0Y4c?si=UOlJu0ZY1-G79rrf",
  "Pull-Up / Chin-Up": "https://youtube.com/shorts/aFb65fs0Y4c?si=UOlJu0ZY1-G79rrf",
  "Scapular Pull-Up": "https://youtube.com/shorts/9M8ylnbriB0?si=7CWjOB3q_qET37Cv",
  "Reverse Cable/Band Fly": "https://youtube.com/shorts/xswhV6zJaxY?si=nt0-ThJio2Sqitgf",
  "Band Speed Row": "https://youtube.com/shorts/ojdWOPKPEgE?si=WELF79eFqWxzAj4N",
  "Cable/Band Speed Row": "https://youtube.com/shorts/ojdWOPKPEgE?si=WELF79eFqWxzAj4N",
  "Explosive TRX/Ring Row": "https://youtu.be/6sUnkStVMA0?si=XBED7smeKnvMacss",
  "Rope Climb / Towel Pull-Up": "https://youtube.com/shorts/CClItHev_2Q?si=0is9j17XnXjjuUA-",
  "Cable/Band Chop (Horizontal)": "https://youtu.be/mvvu8imyMFs?si=EBswAshhNQUlZ33k",
  "Med Ball Rotational Throw": "https://youtube.com/shorts/02c2YLgF8iE?si=olUCloaq1F16rhaJ",
  "Ab Wheel / Barbell Rollout": "https://youtube.com/shorts/vDFoJy9dvzg?si=oFgvxy7hnZannjMi",
  "Marinovich Swiss Ball Rotations": "https://youtube.com/shorts/5rnWfQAbV6Y?si=ZWUdh1PJYQyvlYV5",
  "Side Plank": "https://youtube.com/shorts/4yZjGvTuvYY?si=GUwIuMuU3a-3XEeB",
  "Copenhagen Side Plank": "https://youtube.com/shorts/Ua7YHHOWRlA?si=LjP-iFSq_Rv1RgW3",
  "Hanging Knee Raise (Dip Bar)": "https://youtu.be/RD_A-Z15ER4?si=P_wSejeQ7DAu-I3P",
  "Iso Lunge Single-Arm DB Row": "https://youtube.com/shorts/rZgmOQqpn6Y?si=nxhuV34EBOXgmNu_",
  "Single-Arm Lat Pulldown": "https://youtube.com/shorts/LEaBn_R2S4M?si=zZwJHn5rSfof6yx8",
};

// === EXERCISES TO DROP ===
const toDrop = [
  "Bulgarian Split Squat \u2014 Barbell",
  "Single-Leg Squat to Box",
  "Conventional Barbell Deadlift",
  "Staggered Stance RDL \u2014 Barbell",
  "Kickstand RDL \u2014 DB/KB",
  "Forward Lunge to Jump",
];

// === EXERCISES TO RENAME ===
const toRename = {
  "Single-Leg Deadlift to Row": "Cable RDL to Row",
  "Cable/Band Speed Row": "Band Speed Row",
};

// Walk library: update videos, drop exercises, rename
let linked = 0;
let dropped = 0;
let renamed = 0;

function processCategory(cat) {
  // Handle subcategories (strength patterns)
  if (cat.subcategories) {
    Object.values(cat.subcategories).forEach(sub => {
      // Drop exercises
      const beforeLen = sub.exercises.length;
      sub.exercises = sub.exercises.filter(ex => {
        if (toDrop.includes(ex.name)) {
          console.log('DROPPED: ' + ex.name);
          dropped++;
          return false;
        }
        return true;
      });

      // Rename and link
      sub.exercises.forEach(ex => {
        if (toRename[ex.name]) {
          console.log('RENAMED: ' + ex.name + ' -> ' + toRename[ex.name]);
          ex.name = toRename[ex.name];
          renamed++;
        }
        if (newLinks[ex.name] && !ex.videoLink) {
          ex.videoLink = newLinks[ex.name];
          linked++;
        } else if (newLinks[ex.name] && ex.videoLink) {
          // Update even if already set
          ex.videoLink = newLinks[ex.name];
          linked++;
        }
      });
    });
  }

  // Handle flat exercise arrays (original categories)
  if (cat.exercises) {
    const beforeLen = cat.exercises.length;
    cat.exercises = cat.exercises.filter(ex => {
      if (toDrop.includes(ex.name)) {
        console.log('DROPPED: ' + ex.name);
        dropped++;
        return false;
      }
      return true;
    });

    cat.exercises.forEach(ex => {
      if (toRename[ex.name]) {
        console.log('RENAMED: ' + ex.name + ' -> ' + toRename[ex.name]);
        ex.name = toRename[ex.name];
        renamed++;
      }
      if (newLinks[ex.name] && !ex.videoLink) {
        ex.videoLink = newLinks[ex.name];
        linked++;
      } else if (newLinks[ex.name]) {
        ex.videoLink = newLinks[ex.name];
        linked++;
      }
    });
  }
}

Object.values(lib.categories).forEach(processCategory);

// Recount total
let total = 0;
let withVideo = 0;
let withoutVideo = [];
Object.entries(lib.categories).forEach(([catKey, cat]) => {
  if (cat.exercises) {
    cat.exercises.forEach(ex => {
      total++;
      if (ex.videoLink) withVideo++;
      else withoutVideo.push((cat.label || catKey) + ' | ' + ex.name);
    });
  }
  if (cat.subcategories) {
    Object.entries(cat.subcategories).forEach(([subKey, sub]) => {
      sub.exercises.forEach(ex => {
        total++;
        if (ex.videoLink) withVideo++;
        else withoutVideo.push((cat.label || catKey) + ' / ' + (sub.label || subKey) + ' | ' + ex.name);
      });
    });
  }
});

lib.meta.totalExercises = total;
lib.meta.lastUpdated = new Date().toISOString().slice(0, 10);

fs.writeFileSync(libPath, JSON.stringify(lib, null, 2));

console.log('');
console.log('=== RESULTS ===');
console.log('Videos linked: ' + linked);
console.log('Exercises dropped: ' + dropped);
console.log('Exercises renamed: ' + renamed);
console.log('Total exercises now: ' + total);
console.log('With video: ' + withVideo);
console.log('Still need video: ' + withoutVideo.length);
console.log('');
console.log('=== EXERCISES STILL WITHOUT VIDEO ===');
withoutVideo.forEach((e, i) => console.log((i+1) + '. ' + e));
