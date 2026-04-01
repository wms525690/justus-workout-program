const fs = require('fs');

// Exercise card helper
function card(id, name, details, cue, videoUrl) {
  const href = videoUrl || 'javascript:void(0)';
  return `          <div class="exercise-card" data-id="${id}">
            <div class="exercise-check"><input type="checkbox" id="${id}-check"><label for="${id}-check" class="checkmark"></label></div>
            <div class="exercise-info">
              <h4>${name}</h4>
              <p class="exercise-details">${details}</p>
              <p class="exercise-cue">Cue: ${cue}</p>
              <a href="${href}" class="video-link" target="_blank" rel="noopener noreferrer">&#9654; Watch video</a>
            </div>
            <button class="exercise-note-btn" title="Add note">&#128221;</button>
          </div>`;
}

function supersetOpen(group, label) {
  return `          <div class="superset-group${label.includes('Giant') ? ' giant' : ''}" data-group="${group}">
            <div class="superset-label">${label}</div>`;
}
const supersetClose = '          </div>';

// Video URLs from library
const v = {
  hipCarsStand: 'https://youtube.com/shorts/zSKaNK4FYho?si=OYXrg9T6r_KLGDgl',
  proneShoulderCars: 'https://youtube.com/shorts/-8MolSOs0Ys?si=XFFbK4o2ixQhbqFy',
  ninetyNinety: 'https://youtube.com/shorts/y_6i7nGHAio?si=0qSbEI3ml7MFiVn_',
  wgs: 'https://youtube.com/shorts/BtlDLVmlBb4?si=qg-VGHTqoeoprpEz',
  cossack: 'https://youtube.com/shorts/TR4GN3rLuQ8?si=QWz_qMiKKSxwgWkV',
  gluteBridgeBand: 'https://youtube.com/shorts/L9kD8sEL-js?si=iFQZBPnyIBo0j-Fj',
  slRdlBw: 'https://youtube.com/shorts/s32cCgmRV3I?si=ZNnL0yhseKmFRMAd',
  sitOuts: 'https://youtube.com/shorts/1psHWkBOHfM?si=M3huE-0OMxbdv7m1',
  lateralSkater: 'https://youtube.com/shorts/IkGOdk2VDJw?si=mRVX_jiccW28VOSb',
  revLunge: 'https://youtube.com/shorts/iaXnGoWZ-MA?si=ngsiU_6dGnjO4XXl',
  birdDogRow: 'https://youtube.com/shorts/njnGtfSfIqg?si=3h3h-Kr9o0cIqT-0',
  sumoKb: 'https://youtube.com/shorts/I7q_EPywprs?si=NAh4eLQJUOHGGfv3',
  pallofWalk: 'https://youtube.com/shorts/W7pHDQYeWXY?si=3HtknBu4FXcLvtvV',
  slGluteBridge: 'https://youtube.com/shorts/L9kD8sEL-js?si=iFQZBPnyIBo0j-Fj',
  facePullBand: 'https://youtube.com/shorts/ZAnCd0fUg2s?si=NDEs_GC7DBlt1F-O',
  advDeadBug: 'https://youtube.com/shorts/iW_CtYtzbeU?si=CF1vAlh-TcLm4pyt',
  suitcaseCarry: 'https://youtube.com/shorts/hGib77xYs7M?si=b7RfPl9FW-WbUnrs',
  shoulderCars: 'https://youtube.com/shorts/F87CnjvWKpc?si=5UVa8nZ_GG_ztTBM',
  hipShifts: 'https://youtu.be/c0Ec3Gn5BHI?si=2Lh9HaoCpoNynedx',
  scapPushUp: 'https://youtube.com/shorts/SBPRhZI2RkI?si=jYqPemAlQq_8AVhD',
  bearCrawl: 'https://youtube.com/shorts/aVhdFy9gL-g?si=KNrSsT6zZdyEdtPG',
  ninetyLiftOff: 'https://youtube.com/shorts/uCpBCLUZu1A?si=7mtmLXPTW4Gj3-cH',
  soleusCalf: 'https://youtube.com/shorts/kzEqPq5-gEY?si=sdOq7BxGkIMnMAYN',
  skaterIso: 'https://youtube.com/shorts/kUdjkvVVkWc?si=KD2-JEYbI4K0lmXI',
  facePullER: 'https://youtube.com/shorts/I41wK3wTZlo?si=urvSIU6HlCJ_J7_t',
  bandPullApart: 'https://youtube.com/shorts/EBXD9orJyBQ?si=tjgpdUUQO12mjOd1',
  sissyIso: 'https://youtube.com/shorts/wX_SBQInZcs?si=bU0grSVZgByU4xxB',
  broadJump: 'https://youtube.com/shorts/lMRZLjhdQ7Y?si=YozA_z0eQ4oq6C0z',
  pushUpTempo: 'https://youtube.com/shorts/4Bc1tPaYkOo?si=f-56wu1CyeKq-Ywh',
  stepUpOffset: 'https://youtube.com/shorts/vN21nlymWUU?si=dVlZwQ4C15Bw8Rcw',
  hkPress: 'https://youtube.com/shorts/gd5UrdxVn6Q?si=u6_wl-ZrmmGjiLzE',
  cableChop: 'https://youtu.be/mvvu8imyMFs?si=EBswAshhNQUlZ33k',
  latFly: 'https://youtube.com/shorts/FIQt9pqinXc?si=aJlnevaj-LwZX-gE',
  sidePlank: 'https://youtube.com/shorts/4yZjGvTuvYY?si=GUwIuMuU3a-3XEeB',
  bridgeLSit: 'https://youtube.com/shorts/y1O4XjlutKA?si=HHYOrN3IU2AatChF',
  plank: 'https://youtube.com/shorts/xe2MXatLTUw?si=Ma7IuT-BnliHSFrm',
  wristCars: 'https://www.youtube.com/watch?v=20w70zUTZik',
  hipFlow: 'https://youtube.com/shorts/O3Dudt2-OQ4?si=ajpU7ffk5qRc4Gpq',
  ytw: 'https://youtube.com/shorts/qUc2jCbZoYg?si=jOHweuJ_ffO8CzYV',
  crawlBirdDog: 'https://youtube.com/shorts/dQ1r9o_tbj8?si=fGSp6dl6T43mUP5O',
  latHurdleHop: 'https://youtube.com/shorts/EL3wXPrrQ4Q?si=wr8JANlwni0oZuHi',
  maxSkips: 'https://youtube.com/shorts/PYzQTWVn8lk?si=Mv9yMJn32B7TscyU',
  bentRow: 'https://youtube.com/shorts/1yb-Yst2Tyw?si=a4vBBWu7O1eFT2BX',
  slRdlDb: 'https://youtube.com/shorts/QdN6IV84BiM?si=irGhSEXYaMrowoe7',
  assistPullUp: 'https://youtube.com/shorts/aFb65fs0Y4c?si=UOlJu0ZY1-G79rrf',
  marinovich: 'https://youtube.com/shorts/5rnWfQAbV6Y?si=ZWUdh1PJYQyvlYV5',
  facePullCable: 'https://youtube.com/shorts/I41wK3wTZlo?si=urvSIU6HlCJ_J7_t',
  bicepCurl: 'https://youtube.com/shorts/iui51E31sX8?si=6GNJNRVkWUrPOnCU',
  lizardCrawl: 'https://youtube.com/shorts/5pwEQswmePk?si=evRw5-yzEB_xstoF',
  farmerCarry: 'https://youtube.com/shorts/hGib77xYs7M?si=b7RfPl9FW-WbUnrs',
  hipCarsQuad: 'https://youtube.com/shorts/Yvg9tbm980A?si=559ERRHn8T0BBHq2',
  ankleCars: 'https://youtube.com/shorts/UVtCSGJmGEY?si=2pdA_UhG4F35gi2s',
  shortFoot: 'https://youtube.com/shorts/IqlAEjkc4kY?si=VjH9WdGVRC9giMyg',
  deadBug: 'https://youtube.com/shorts/ZKZU7T2llwA?si=Z_H4tivd3WpApD25',
  sqJumpStick: 'https://youtube.com/shorts/mAGRr3ZMF20?si=9hGwk5SkbBzNTcKE',
  gobletSquat: 'https://youtube.com/shorts/pLD82dZyhDY?si=XfiZ5sXUiEJoBAFJ',
  landmineHK: 'https://youtube.com/shorts/ewd9eJOmgmM?si=8a4qfu7o78lXb6ye',
  bulgarianSS: 'https://youtube.com/shorts/or1frhkjBDc?si=3ztltVVbwT5jmIvR',
  crossCarry: 'https://youtube.com/shorts/lVSvv5sJsuY?si=M3m0FGa5-LBR0qtu',
  tricepPush: 'https://youtube.com/shorts/JyqX6S6Z7RA?si=dbY8sJqHs-wkBObV',
  swissBallPlank: 'https://youtube.com/shorts/9yhQhf4zpSo?si=4HStI41YKqRM7KFc',
  isoLunge: 'https://youtube.com/shorts/Nkj5yzOUnxQ?si=Sy_QcAMANwHzmWSr',
  pallof: 'https://youtube.com/shorts/knoBudRYK8E?si=fAnDNey9nwMAmZPM',
};

// Read current file to get the header (hero + nav) and footer (modals + scripts)
const current = fs.readFileSync('index.html', 'utf8');
const mainStart = current.indexOf('  <main class="program-content">');
const mainEnd = current.indexOf('  </main>');

const header = current.substring(0, mainStart);
const footer = current.substring(mainEnd + '  </main>\n'.length);

// Build the program sections
let html = header;
html += '  <main class="program-content">\n\n';

// ==================== DAY 1 ====================
html += `    <section class="program-section active" id="section-day1">
      <div class="section-header">
        <div class="section-number">01</div>
        <h2>Pull Day &mdash; Lower Body Focus</h2>
        <p class="section-subtitle">Posterior chain + full body mobility. Reprogram the joints, then load them.</p>
        <div class="coaching-tips">
          <p><strong>Phase 1 Focus (Weeks 1-2):</strong></p>
          <p>&#10003; <strong>Set your arches</strong> &mdash; before every rep. Build the arch, feel the knee and hip follow into external rotation. This is the foundation for every standing movement.</p>
          <p>&#10003; <strong>Breathe and brace</strong> &mdash; 360 breath into the belly and sides. Brace before you move. If you can't breathe through it, you've braced too hard.</p>
          <p>&#10003; <strong>Own end range</strong> &mdash; don't just stretch to a position. Be strong in it. Strength at end range is what protects joints under load.</p>
        </div>
      </div>

      <button class="start-workout-btn" data-day="day1">Start Workout</button>
      <div class="workout-timer" id="timer-day1" style="display:none;"><span class="timer-icon">&#9201;</span> <span class="timer-value">0:00</span></div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128293;</span><h3>Warm-Up &amp; Mobility</h3><span class="category-note">Full body joint prep + nervous system activation</span></div>
        <div class="exercise-list">
${card('d1-w1', 'Hip CARS (Standing)', '3 each hip &middot; Slow, max range', 'Biggest, slowest circles you can make. Every degree of rotation counts. Brace the standing leg, short foot engaged.', v.hipCarsStand)}
${card('d1-w2', 'Prone Shoulder CARS (Handcuff Position)', '2 each shoulder', 'Face down, hands behind the back. Sweep the arm through full ROM &mdash; out to the side, overhead, and back. Emphasize height off the ground at every position. Slow, controlled, max range.', v.proneShoulderCars)}
${card('d1-w3', '90/90 Passive Stretch &rarr; Active Lift-Offs', '2 &times; 30s hold + 5 lift-offs each side', 'Sit in the 90/90. Breathe into the stretch. Then lift the back knee (hip IR) and front knee (hip ER) 1-2 inches off the floor. Small movement, big demand. Building strength at end range.', v.ninetyNinety)}
${card('d1-w4', 'World&#39;s Greatest Stretch', '2 &times; 5 each side', 'Lunge forward, plant the inside hand, rotate the other arm to the ceiling. Hip flexor, T-spine, hamstring all opening at once. Breathe into each rotation.', v.wgs)}
${card('d1-w5', 'Cossack Squat (Bodyweight)', '2 &times; 6 each side &middot; 3s iso at bottom', 'Deep lateral lunge, straight trailing leg. Hold the bottom for 3 seconds. Build strength and control in the lateral plane.', v.cossack)}
${card('d1-w6', 'Glute Bridge (Banded)', '2 &times; 12 &middot; 3s squeeze at top', 'Band above knees. Drive hips up, push knees out against the band, squeeze the glutes hard for 3 seconds at the top.', v.gluteBridgeBand)}
${card('d1-w7', 'Single-Leg RDL &mdash; Bodyweight', '2 &times; 6 each leg &middot; 3s tempo down', 'Hinge at the hip, reach the back leg behind you. 3 seconds on the way down. Balance challenge + hamstring lengthening. Wall assist if needed, earn freestanding.', v.slRdlBw)}
${card('d1-w8', 'Crawl Position Sit-Outs', '2 &times; 6 each side', 'Bear crawl position, thread the leg underneath your body toward a near-seated rotation. Controlled, return to crawl before switching. Rotational mobility + shoulder stability under dynamic load.', v.sitOuts)}
${card('d1-w9', 'Lateral Skater Jumps', '3 &times; 5 each side &middot; Stick every landing', 'Jump sideways, land on one foot, freeze. Quiet feet, arch engaged, knee tracking out. Nervous system primer.', v.lateralSkater)}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128170;</span><h3>Main Work</h3></div>
        <div class="exercise-list">
${supersetOpen('A', 'Superset A')}
${card('d1-a1', 'Reverse Lunge &mdash; Goblet', '3 &times; 8 each leg &middot; 3s eccentric', 'KB at chest. Step back slowly (3 seconds down). Front foot slightly elevated. Drive through the front heel. Set the arch before every rep.', v.revLunge)}
${card('d1-a2', 'Single-Arm DB Row (Bird-Dog Position)', '3 &times; 10 each arm', 'Hand on bench, extend the opposite leg behind you. Row the DB to your hip. Your core fights rotation the entire time. Pull from the shoulder blade, not the arm.', v.birdDogRow)}
${supersetClose}
${supersetOpen('B', 'Superset B')}
${card('d1-b1', 'KB/DB Sumo Deadlift', '3 &times; 10 &middot; 3s eccentric', 'Wide stance, toes out. KB between feet. Push knees out, hinge at hips. Drive through the floor, squeeze glutes at top. 3 seconds on the way down.', v.sumoKb)}
${card('d1-b2', 'ISO Pallof Press Walkouts', '3 &times; 6 each side', 'Pallof press position, arms extended. Walk away from the anchor until band tension is high. Hold. The further you walk, the harder your core works to resist rotation.', v.pallofWalk)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#9889;</span><h3>Accessory</h3></div>
        <div class="exercise-list">
${supersetOpen('C', 'Giant Set C')}
${card('d1-c1', 'Single-Leg Glute Bridge', '2 &times; 10 each leg &middot; 3s hold at top', 'One foot planted, drive hips up, squeeze the glute for 3 seconds. If you feel it in your low back, reset your position.', v.slGluteBridge)}
${card('d1-c2', 'Face Pull (Band)', '2 &times; 15', 'Pull to your face, elbows high. Rotate hands outward at the end. Rear delts and rotator cuff. Daily shoulder maintenance.', v.facePullBand)}
${card('d1-c3', 'Advanced Dead Bug', '2 &times; 8 each side &middot; Cue breathing', 'Band-resisted or contralateral with extended range. Breathe in through the nose as you extend, exhale as you return. Low back stays flat. The breath IS the exercise.', v.advDeadBug)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#127937;</span><h3>Finisher</h3></div>
        <div class="exercise-list">
${card('d1-f1', 'Suitcase Carry', '2 &times; 40yd each hand', 'One KB in one hand. Walk tall. Don&#39;t lean toward the weight. Core and arch fight the offset the entire time.', v.suitcaseCarry)}
        </div>
      </div>

      <button class="finish-workout-btn" data-day="day1" style="display:none;">Finish Workout</button>
    </section>

`;

// ==================== DAY 2 ====================
html += `    <section class="program-section" id="section-day2">
      <div class="section-header">
        <div class="section-number">02</div>
        <h2>Push Day &mdash; Upper Body Focus</h2>
        <p class="section-subtitle">Pressing strength + deep mobility work. Shoulders, hips, ankles, and core all get attention.</p>
        <div class="coaching-tips">
          <p><strong>Phase 1 Focus (Weeks 1-2):</strong></p>
          <p>&#10003; <strong>Set your arches</strong> &mdash; even on pressing days. Feet are your connection to the ground.</p>
          <p>&#10003; <strong>Pack your shoulders</strong> &mdash; before every press, pull shoulder blades down and back. This is the position that protects the shoulder under load.</p>
          <p>&#10003; <strong>Breathe and brace</strong> &mdash; exhale as you push. The core drives the press, not just the arms.</p>
        </div>
      </div>

      <button class="start-workout-btn" data-day="day2">Start Workout</button>
      <div class="workout-timer" id="timer-day2" style="display:none;"><span class="timer-icon">&#9201;</span> <span class="timer-value">0:00</span></div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128293;</span><h3>Warm-Up &amp; Mobility</h3><span class="category-note">Shoulders, hips, ankles, and end-range work</span></div>
        <div class="exercise-list">
${card('d2-w1', 'Shoulder CARS (Standing)', '3 each shoulder &middot; Slow, full range', 'Full circumduction. Biggest circle you can make without compensating at the torso. Own every degree.', v.shoulderCars)}
${card('d2-w2', 'Supine 90/90 Hip Shifts', '2 &times; 8 each side', 'On your back, knees up. Slowly shift both knees to one side, shoulders pinned. Feel the low back decompress and obliques control the movement.', v.hipShifts)}
${card('d2-w3', 'Scapula Push-Ups', '2 &times; 12', 'Push-up position, arms locked. Let chest sink between shoulder blades (retraction), then push the ground away (protraction). No elbow bend. Pure scapular movement.', v.scapPushUp)}
${card('d2-w4', 'Bear Crawl (Forward / Backward)', '2 &times; 20yd each direction', 'Knees 1 inch off ground. Opposite hand and foot move together. Slow and controlled. Forward then reverse. Nasal breathing only &mdash; if you have to mouth-breathe, slow down.', v.bearCrawl)}
${card('d2-w5', '90/90 Lift-Off (Hip IR/ER End-Range)', '2 &times; 5 each side &middot; 5s hold', 'In the 90/90, lift back knee (IR) then front knee (ER). Hold each 5 seconds. Active strength at the very end of your hip range.', v.ninetyLiftOff)}
${card('d2-w6', 'Deep Squat Soleus Calf Raises', '2 &times; 10', 'Sit into a deep squat, feet flat. Drive up onto the balls of your feet, then press heels back down. Chest tall, ribs down. Achilles and soleus reprogramming.', v.soleusCalf)}
${card('d2-w7', 'Skater Squat (Iso Hold)', '2 &times; 15s each leg', 'Rear knee hovers or taps a pad. Hold the bottom position. Heel elevated variation or flat foot. VMO and balance demand.', v.skaterIso)}
${card('d2-w8', 'Face Pull with External Rotation', '2 &times; 15', 'Pull to face, elbows high. Finish by rotating hands outward. External rotation at the top is what makes this a rotator cuff exercise, not just a rear delt exercise.', v.facePullER)}
${card('d2-w9', 'Band Pull-Apart', '2 &times; 20', 'Arms straight, pull band apart by squeezing shoulder blades together. Open the chest, fire the rear delts. High reps, light resistance.', v.bandPullApart)}
${card('d2-w10', 'Sissy Squat (Iso Hold)', '2 &times; 15s', 'Lean back from the knees, hold the position. Assisted with band or wall if needed. Extreme quad lengthening and knee resilience. Don&#39;t go to max range yet &mdash; build into it.', v.sissyIso)}
${card('d2-w11', 'Broad Jump to Stick', '3 &times; 3 &middot; Stick 3s', 'Jump forward, land soft, freeze 3 seconds. The landing is the test. Quiet feet, arch engaged.', v.broadJump)}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128170;</span><h3>Main Work</h3></div>
        <div class="exercise-list">
${supersetOpen('A', 'Superset A')}
${card('d2-a1', 'Push-Up (Tempo)', '3 &times; 10 &middot; 4s down, 1s up', '4 seconds down, 1 second up. Core locked the entire time. If your low back sags, the set is over. Quality over quantity.', v.pushUpTempo)}
${card('d2-a2', 'Step-Up (Offset &mdash; Single DB)', '3 &times; 8 each leg', 'One DB suitcase hold. Step up, drive to full hip extension. The offset forces your core to fight lateral flexion. Stay tall.', v.stepUpOffset)}
${supersetClose}
${supersetOpen('B', 'Superset B')}
${card('d2-b1', 'Half-Kneeling DB Press', '3 &times; 8 each arm', 'One knee down, same-side arm presses. Core stays locked. No arching, no leaning. The press starts from the brace.', v.hkPress)}
${card('d2-b2', 'Cable/Band Chop (Horizontal)', '3 &times; 10 each side', 'Cable at chest height. Pull across the body horizontally. Keep it horizontal. Trains controlled rotation AND deceleration of rotation. Breathe through every rep.', v.cableChop)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#9889;</span><h3>Accessory</h3></div>
        <div class="exercise-list">
${supersetOpen('C', 'Giant Set C')}
${card('d2-c1', 'Lateral DB Fly', '2 &times; 12', 'Light weight. Lift DBs out to the sides to shoulder height. Control the lower. Shoulder health and joint support.', v.latFly)}
${card('d2-c2', 'Side Plank', '2 &times; 30s each side', 'Elbow under shoulder, hips up, squeeze the bottom glute. Breathe. If your hips drop, the set is over.', v.sidePlank)}
${card('d2-c3', 'Bridge to L-Sit', '2 &times; 6', 'L-sit position, press heels into ground, drive hips and chest up into a bridge. Sit hips back through your hands. Demands shoulder extension, T-spine mobility, and full-body control.', v.bridgeLSit)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#127937;</span><h3>Finisher</h3></div>
        <div class="exercise-list">
${card('d2-f1', 'Plank', '2 &times; 45s', 'Squeeze everything &mdash; glutes, quads, abs. Breathe through the brace. 45 seconds of maximum tension beats 3 minutes of sagging.', v.plank)}
        </div>
      </div>

      <button class="finish-workout-btn" data-day="day2" style="display:none;">Finish Workout</button>
    </section>

`;

// ==================== DAY 3 ====================
html += `    <section class="program-section" id="section-day3">
      <div class="section-header">
        <div class="section-number">03</div>
        <h2>Pull Day &mdash; Upper Body Focus</h2>
        <p class="section-subtitle">Build the back. Core-loaded hinge work. Grip and pull strength.</p>
        <div class="coaching-tips">
          <p><strong>Phase 1 Focus (Weeks 1-2):</strong></p>
          <p>&#10003; <strong>Set your arches</strong> &mdash; especially on single-leg movements. The arch controls knee position which controls whether the right muscles fire.</p>
          <p>&#10003; <strong>Pull with your back, not your arms</strong> &mdash; every row starts by squeezing the shoulder blade. Then bend the elbow.</p>
          <p>&#10003; <strong>Breathe and brace</strong> &mdash; maintain nasal breathing through all mobility and stability work. Controlled exhale on effort for strength work.</p>
        </div>
      </div>

      <button class="start-workout-btn" data-day="day3">Start Workout</button>
      <div class="workout-timer" id="timer-day3" style="display:none;"><span class="timer-icon">&#9201;</span> <span class="timer-value">0:00</span></div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128293;</span><h3>Warm-Up &amp; Mobility</h3><span class="category-note">Upper back, shoulders, hips, power primer</span></div>
        <div class="exercise-list">
${card('d3-w1', 'Wrist CARS', '2 each wrist', 'Full circles in both directions + pronation/supination. Wrist health is non-negotiable for gripping, posting, and catching.', v.wristCars)}
${card('d3-w2', 'Hip Mobility Flow', '2 &times; through full flow', 'Hip circles, pigeon transitions, 90/90 switches. Move smoothly between positions. Open the hips in every plane.', v.hipFlow)}
${card('d3-w3', 'Prone Y-T-W', '1 &times; 8 each position &middot; 3s hold at top', 'Face down. Y = arms overhead, thumbs up. T = arms out. W = elbows bent, rotate hands to ceiling. Hold each at top. Scapular stabilizer activation.', v.ytw)}
${card('d3-w4', '90/90 Lift-Off (Hip IR/ER End-Range)', '2 &times; 5 each side &middot; 5s hold', 'In the 90/90, lift back knee (IR) then front knee (ER). Hold each 5 seconds. Active strength at end range.', v.ninetyLiftOff)}
${card('d3-w5', 'Crawl Position Bird-Dog', '2 &times; 8 each side &middot; 3s hold', 'Bear crawl position (knees up). Extend opposite arm and leg. Hold 3 seconds. Anti-rotation + anti-extension from an elevated position. More demanding than floor bird-dog.', v.crawlBirdDog)}
${card('d3-w6', '2-Foot Lateral Hurdle Hops', '3 &times; 6', 'Both feet, hop laterally over a hurdle or line. Quick, reactive. Land soft, bounce immediately. Lateral power and ankle stiffness.', v.latHurdleHop)}
${card('d3-w7', 'Max Height Skips', '3 &times; 5 each leg', 'Skip as high as you can. Drive the knee up, fire the opposite arm. Be explosive. Power primer for the session.', v.maxSkips)}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128170;</span><h3>Main Work</h3></div>
        <div class="exercise-list">
${supersetOpen('A', 'Superset A')}
${card('d3-a1', 'Bent-Over DB Row', '3 &times; 10', 'Hinge forward, flat back. Row both DBs to your hips, squeeze shoulder blades at the top. Control the lower. Keep the brace tight &mdash; if your low back rounds, the weight is too heavy.', v.bentRow)}
${card('d3-a2', 'Single-Leg RDL &mdash; DB (Contralateral)', '3 &times; 8 each leg', 'DB in the opposite hand from the standing leg. Hinge forward, reach the free leg back. The DB pulls you into rotation &mdash; resist it. Core works as hard as the hamstring.', v.slRdlDb)}
${supersetClose}
${supersetOpen('B', 'Superset B')}
${card('d3-b1', 'Assisted Pull-Up (Band)', '3 &times; 8', 'Band takes a percentage of bodyweight. Use the lightest band you can handle. Full range &mdash; dead hang at the bottom, chin over bar at top. Scap depression first, then pull.', v.assistPullUp)}
${card('d3-b2', 'Marinovich Swiss Ball Rotations', '3 &times; 10 each direction', 'Hands on ground, knees on swiss ball. Rotate lower body side to side while shoulders stay planted. Core and low back rotational control. Slow and controlled.', v.marinovich)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#9889;</span><h3>Accessory</h3></div>
        <div class="exercise-list">
${supersetOpen('C', 'Giant Set C')}
${card('d3-c1', 'Face Pull (Cable)', '2 &times; 15', 'Pull to face, elbows high, rotate hands out at the end. Daily shoulder maintenance. Every session.', v.facePullCable)}
${card('d3-c2', 'DB Bicep Curl', '2 &times; 12', 'No swinging. Elbows pinned. Slow up, slower down. Strong biceps protect the elbows.', v.bicepCurl)}
${card('d3-c3', 'Lizard Crawl', '2 &times; 20yd', 'Bear crawl with deep hip flexion on each step &mdash; knees come up high and out to the side. Dynamic hip mobility + core stability + shoulder stability in one movement.', v.lizardCrawl)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#127937;</span><h3>Finisher</h3></div>
        <div class="exercise-list">
${card('d3-f1', 'Farmer Carry (Heavy)', '2 &times; 50yd', 'Heavy DBs or KBs, both hands. Walk tall, squeeze the handles, own every step. Grip, traps, core, feet &mdash; everything works.', v.farmerCarry)}
        </div>
      </div>

      <button class="finish-workout-btn" data-day="day3" style="display:none;">Finish Workout</button>
    </section>

`;

// ==================== DAY 4 ====================
html += `    <section class="program-section" id="section-day4">
      <div class="section-header">
        <div class="section-number">04</div>
        <h2>Push Day &mdash; Lower Body Focus</h2>
        <p class="section-subtitle">Squat patterns, core-loaded pressing. Build the base with precision.</p>
        <div class="coaching-tips">
          <p><strong>Phase 1 Focus (Weeks 1-2):</strong></p>
          <p>&#10003; <strong>Set your arches</strong> &mdash; before every squat and lunge. Build the arch, feel it spiral your knees outward. That's where quads and glutes fully engage.</p>
          <p>&#10003; <strong>Breathe and brace</strong> &mdash; big belly breath before you descend. Brace like you're about to absorb impact. That's your internal weight belt.</p>
          <p>&#10003; <strong>Earn new positions</strong> &mdash; go slow, go deep, own every inch of range. Depth of position = depth of control.</p>
        </div>
      </div>

      <button class="start-workout-btn" data-day="day4">Start Workout</button>
      <div class="workout-timer" id="timer-day4" style="display:none;"><span class="timer-icon">&#9201;</span> <span class="timer-value">0:00</span></div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128293;</span><h3>Warm-Up &amp; Mobility</h3><span class="category-note">Hips, ankles, core, nervous system</span></div>
        <div class="exercise-list">
${card('d4-w1', 'Hip CARS (Quadruped)', '3 each hip', 'Hands and knees. Lift the knee out to the side, rotate through the biggest circle you can, reverse. More range available than standing.', v.hipCarsQuad)}
${card('d4-w2', 'Ankle CARS', '2 each ankle', 'Full circumduction in both directions. Ankle mobility directly determines squat depth and running efficiency.', v.ankleCars)}
${card('d4-w3', 'World&#39;s Greatest Stretch', '2 &times; 5 each side', 'Lunge, plant, rotate. Hit the hip flexor, T-spine, and hamstring in one movement. Prep every joint for squat work.', v.wgs)}
${card('d4-w4', 'Iso Lunge Holds', '2 &times; 20s each leg', 'Hold the bottom of the lunge. Tall chest, ribs down. Feel the stretch in the back hip flexor. Build stability and tolerance in this position before loading it.', v.isoLunge)}
${card('d4-w5', 'Single-Leg Balance (Short Foot)', '2 &times; 30s each foot', 'Stand on one foot. Pull the ball of your foot back toward your heel &mdash; build the arch. Feel the knee and hip follow into external rotation. Hold it. Eyes forward, breathe.', v.shortFoot)}
${card('d4-w6', 'Dead Bug (Extended Holds)', '2 &times; 8 each side &middot; 5s hold per rep', 'Low back flat. Extend opposite arm and leg, hold 5 full seconds per rep. Breathe through each hold &mdash; nasal in, controlled out. The extended time under tension is the progression. The breath is the exercise.', v.deadBug)}
${card('d4-w7', 'Squat Jump to Single-Leg Stick', '3 &times; 3 each landing leg', 'Squat down, jump up, land on ONE foot, freeze 3 seconds. Alternate landing legs. This demands single-leg deceleration &mdash; a higher complexity plyometric primer.', v.sqJumpStick)}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#128170;</span><h3>Main Work</h3></div>
        <div class="exercise-list">
${supersetOpen('A', 'Superset A')}
${card('d4-a1', 'Goblet Squat (Heel Elevated)', '3 &times; 10 &middot; 3s eccentric', 'Heels on a plate or wedge. KB at chest. 3 seconds on the way down. Go as deep as your mobility allows. Tall chest, ribs down, brace before you descend.', v.gobletSquat)}
${card('d4-a2', 'Landmine Press (Half-Kneeling)', '3 &times; 8 each arm', 'Half-kneeling, press the landmine up. The angled press path is shoulder-friendly. The kneeling position forces the core to do the stabilizing.', v.landmineHK)}
${supersetClose}
${supersetOpen('B', 'Superset B')}
${card('d4-b1', 'Bulgarian Split Squat (Iso Hold &rarr; Reps)', '3 &times; 6 each leg', 'Rear foot on bench. Set 1: hold the bottom for 20 seconds. Sets 2-3: slow reps. Own the bottom position with perfect form. Short foot on front leg, knee tracking over pinky toe, ribs down.', v.bulgarianSS)}
${card('d4-b2', 'Cable/Band Chop (Horizontal)', '3 &times; 10 each side', 'Cable at chest height. Pull across horizontally. Trains controlled rotation and deceleration. Breathe through every rep.', v.cableChop)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#9889;</span><h3>Accessory</h3></div>
        <div class="exercise-list">
${supersetOpen('C', 'Superset C')}
${card('d4-c1', 'Cross-Body Carry (Rack + Suitcase)', '2 &times; 40yd each setup', 'One KB in rack, one DB at side. Walk tall. Two different forces competing &mdash; your core solves the puzzle every step. Swap sides each set.', v.crossCarry)}
${card('d4-c2', 'Cable Tricep Pushdown', '2 &times; 15', 'Elbows pinned. Full lockout at bottom, slow back up. Light weight, feel the squeeze. Supports all pressing.', v.tricepPush)}
${supersetClose}
        </div>
      </div>

      <div class="category-block">
        <div class="category-title"><span class="category-icon">&#127937;</span><h3>Finisher</h3></div>
        <div class="exercise-list">
${card('d4-f1', 'Plank (Swiss Ball)', '2 &times; 30s', 'Forearms on the ball. Squeeze everything. Breathe through the brace. The ball wants to move &mdash; don&#39;t let it.', v.swissBallPlank)}
        </div>
      </div>

      <button class="finish-workout-btn" data-day="day4" style="display:none;">Finish Workout</button>
    </section>

`;

// ==================== STATS ====================
html += `    <section class="program-section" id="section-stats">
      <div class="section-header">
        <div class="section-number">05</div>
        <h2>Weekly Stats</h2>
        <p class="section-desc">Your training data, tracked automatically.</p>
      </div>

      <span class="stats-week-label" id="statsWeekLabel">This Week</span>

      <div class="stats-summary">
        <div class="stats-card">
          <div class="stats-card-value" id="statsDaysActive">0/3</div>
          <div class="stats-card-label">Workouts This Week</div>
        </div>
        <div class="stats-card">
          <div class="stats-card-value" id="statsTotalChecks">0%</div>
          <div class="stats-card-label">Exercises Touched</div>
        </div>
        <div class="stats-card">
          <div class="stats-card-value" id="statsAvgCompletion">&mdash;</div>
          <div class="stats-card-label">Avg Workout Time</div>
        </div>
        <div class="stats-card">
          <div class="stats-card-value" id="statsCurrentStreak">0</div>
          <div class="stats-card-label">Total Work Days</div>
        </div>
      </div>

      <div class="stats-weekly-targets">
        <h3 class="stats-section-title">Weekly Targets</h3>
        <div class="stats-targets" id="statsWeeklyTargets"></div>
      </div>

      <div class="stats-daily-breakdown">
        <h3 class="stats-section-title">Daily Breakdown</h3>
        <div class="stats-day-grid" id="statsDayGrid"></div>
      </div>

      <div class="stats-difficulty">
        <h3 class="stats-section-title">Difficulty Ratings This Week</h3>
        <div class="stats-rating-summary" id="statsRatingSummary"></div>
      </div>

      <div class="stats-flags">
        <h3 class="stats-section-title">Pain / Discomfort Flags</h3>
        <div class="stats-flag-list" id="statsFlagList">
          <p class="stats-empty">No pain flags this week. Keep it up.</p>
        </div>
      </div>
    </section>

`;

html += '  </main>\n\n';
html += footer;

fs.writeFileSync('index.html', html);
console.log('Built index.html — ' + html.split('\n').length + ' lines');
