const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'exercise-library.json');
const lib = JSON.parse(fs.readFileSync(libPath, 'utf8'));

// Helper to build exercise objects
function ex(id, name, complexity, intent, notes, wrinkles, primaryMuscles, secondaryMuscles) {
  return {
    id,
    name,
    complexity,
    movementPattern: id.split('-')[0],
    trainingIntent: intent,
    primaryMuscles,
    secondaryMuscles: secondaryMuscles || [],
    notes,
    wrinkles,
    videoLink: "",
    cue: ""
  };
}

// ========== 1. SQUAT ==========
const squat = {
  label: "Squat",
  subcategories: {
    "squat-bilateral": {
      label: "Bilateral",
      exercises: [
        ex("sqt-01", "Bodyweight Squat (Iso Hold)", 1, ["stability"], "Bottom position hold. Own the range before moving through it. Foot position work — short foot, tripod, knee tracking.", "Heel elevated; varied depth holds; narrow/wide stance", ["quads", "glutes"], ["core", "calves/ankles", "feet/intrinsic"]),
        ex("sqt-02", "Bodyweight Squat", 1, ["stability", "mobility"], "Full ROM, tempo down (3-4s eccentric). Establish depth, bracing, foot position.", "Tempo eccentric (3-4s); heel elevated", ["quads", "glutes"], ["core", "hamstrings", "calves/ankles"]),
        ex("sqt-03", "Goblet Squat (Iso Hold)", 2, ["stability", "strength"], "KB/DB front-loaded. The counterbalance teaches upright torso. Hold bottom position.", "Heel elevated; varied depth holds", ["quads", "glutes"], ["core", "shoulders"]),
        ex("sqt-04", "Goblet Squat", 2, ["strength"], "Full ROM with load. The workhorse beginner squat.", "Heel elevated; tempo; offset (single KB suitcase, single-arm rack)", ["quads", "glutes"], ["core", "shoulders"]),
        ex("sqt-05", "Double KB Front Squat", 3, ["strength"], "Two kettlebells in rack position. Higher core demand than goblet. Bridge between goblet and barbell.", "Tempo; heel elevated; single KB rack (offset)", ["quads", "glutes"], ["core", "shoulders"]),
        ex("sqt-06", "Barbell Front Squat", 3, ["strength"], "Upright torso demand. Punishes compensation — if you fold, you dump the bar. Self-correcting.", "Tempo; heel elevated; box target for depth", ["quads", "glutes"], ["core", "thoracic-spine"]),
        ex("sqt-07", "Box Squat", 3, ["strength", "power"], "Teaches sitting back, posterior chain loading, and dead-stop concentric.", "High box (regression) → low box; banded; chains", ["quads", "glutes", "hamstrings"], ["core", "lower-back/lumbar"]),
        ex("sqt-08", "Barbell Back Squat", 4, ["strength", "hypertrophy"], "The classic. Only earned after front squat competency. Higher loading potential.", "Tempo (4-1-2); heel elevated; banded; chains", ["quads", "glutes", "hamstrings"], ["core", "lower-back/lumbar"])
      ]
    },
    "squat-split-stance": {
      label: "Split Stance",
      exercises: [
        ex("sqt-09", "Split Squat (Iso Hold)", 2, ["stability"], "Static split position, hold bottom. Foot position, knee tracking, pelvic stability. Front foot always elevated.", "Heel elevated; varied depth; hand position (goblet, overhead, hands-free); offset load", ["quads", "glutes"], ["core", "hip-flexors"]),
        ex("sqt-10", "Split Squat", 2, ["stability", "strength"], "Bodyweight, full ROM, tempo down. Establishes the split stance pattern. Front foot always elevated.", "Heel elevated; tempo; offset load", ["quads", "glutes"], ["core", "hip-flexors"]),
        ex("sqt-11", "Goblet Split Squat", 3, ["strength"], "Front-loaded split stance. Anterior core demand increases.", "Heel elevated; tempo; front foot elevation height; offset", ["quads", "glutes"], ["core", "shoulders"]),
        ex("sqt-12", "Step-Up (Iso Hold at Top)", 2, ["stability", "strength"], "Isometric hold at top of step. Box height is the variable.", "High step/light for ROM; low step/heavy for strength", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-13", "Step-Up", 3, ["strength"], "Full step-up. Box height determines quad vs glute emphasis.", "High step/light; low step/heavy; med-high/dynamic effort; offset load; contralateral vs ipsilateral", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-14", "Bulgarian Split Squat (Iso Hold)", 3, ["stability", "mobility"], "Rear foot on bench. Hold bottom position. Hip flexor stretch on rear leg, deep knee flexion on front.", "Heel elevated; varied depth; hip flexor stretch emphasis; offset load", ["quads", "glutes"], ["hip-flexors", "core"]),
        ex("sqt-15", "Bulgarian Split Squat", 3, ["strength"], "The king of split stance. Massive single-leg loading potential with inherent stability demand.", "Heel elevated; tempo; front foot elevation height; offset", ["quads", "glutes"], ["hip-flexors", "core"]),
        ex("sqt-16", "Bulgarian Split Squat — DB/KB Loaded", 4, ["strength", "hypertrophy"], "Add load. Goblet first, then dumbbells at sides.", "Goblet → DBs at sides; heel elevated; offset; contralateral vs ipsilateral", ["quads", "glutes"], ["hip-flexors", "core"]),
        ex("sqt-17", "Bulgarian Split Squat — Barbell", 5, ["strength"], "Front rack or back rack. High demand — balance + load + ROM.", "Front rack or back rack; heel elevated", ["quads", "glutes"], ["hip-flexors", "core"]),
        ex("sqt-18", "Forward Lunge", 2, ["stability", "strength"], "Stepping into the lunge adds deceleration demand — the front leg must absorb and stop forward momentum.", "Tempo; iso hold at bottom; hands overhead; offset load", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-19", "Walking Lunge", "2-4", ["strength", "hypertrophy"], "Continuous forward movement. Each step is a deceleration event followed by a drive.", "BW → goblet → DBs at sides → single DB offset → front rack BB; tempo; iso hold each step; hands overhead", ["quads", "glutes", "hamstrings"], ["core", "calves/ankles"])
      ]
    },
    "squat-unilateral": {
      label: "Unilateral",
      exercises: [
        ex("sqt-20", "Single-Leg Box Squat (Sit-to-Stand)", 2, ["stability", "strength"], "Squat to a box on one leg. Box height is the regression/progression lever. Lower = harder.", "Box height is the progression lever", ["quads", "glutes"], ["core", "VMO"]),
        ex("sqt-21", "Single-Leg Squat to Box", 3, ["strength", "stability"], "No sit — control the descent, touch box, stand.", "Full control descent, touch box, stand", ["quads", "glutes"], ["core", "VMO"]),
        ex("sqt-22", "Cossack Squat (Iso Hold)", 2, ["stability", "mobility"], "Deep lateral lunge with straight trailing leg. End-range adductor and hip mobility under control.", "Heel elevated; hold at depth", ["quads", "adductors", "glutes"], ["core", "hip-rotators"]),
        ex("sqt-23", "Cossack Squat", 3, ["mobility", "strength"], "Full ROM Cossack. Almost bilateral — high priority.", "Heel elevated; tempo; goblet loaded; lateral lunge variation (shorter ROM, more upright); lateral slide/skater slide (disc, endurance/adductor)", ["quads", "adductors", "glutes"], ["core", "hip-rotators"]),
        ex("sqt-24", "Skater Squat (Iso Hold)", 3, ["stability"], "Rear knee hovers/taps pad. Hold bottom position.", "Heel elevated; flat foot", ["quads", "glutes", "VMO"], ["core", "calves/ankles"]),
        ex("sqt-25", "Skater Squat", 4, ["strength", "stability"], "Full ROM. Rear knee taps pad/ground. Massive VMO and balance demand.", "Heel elevated; flat foot; light goblet load; offset", ["quads", "glutes", "VMO"], ["core", "calves/ankles"])
      ]
    },
    "squat-adjacent": {
      label: "Squat-Adjacent",
      exercises: [
        ex("sqt-26", "Sissy Squat (Iso → Progressive ROM)", 3, ["mobility", "strength"], "Extreme knee flexion, quad lengthening. Knees-over-toes approach.", "Assisted (band/TRX) → unassisted; heel elevated", ["quads", "VMO"], ["core", "hip-flexors"]),
        ex("sqt-27", "Sled March (Forward)", 2, ["endurance", "hypertrophy"], "Each step is a single-leg drive. Zero eccentric stress — pure concentric. Volume without soreness.", "Light/fast for conditioning; heavy/slow for strength", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-28", "Reverse Sled Drag", 2, ["endurance", "hypertrophy"], "Quad-dominant pull. Great for knee prehab and quad volume without eccentric stress.", "Vary load and distance", ["quads", "VMO"], ["calves/ankles"])
      ]
    },
    "squat-plyometric": {
      label: "Plyometric / Dynamic",
      exercises: [
        ex("sqt-29", "Squat Jump (Bodyweight)", 3, ["power"], "Countermovement jump from squat depth. Land soft, stick it, reset. Landing mechanics are the skill.", "Stick landing 3s; coach foot mechanics", ["quads", "glutes"], ["calves/ankles", "core"]),
        ex("sqt-30", "Squat Jump to Stick (3s Hold)", 3, ["power", "stability"], "Same as squat jump but freeze the landing for 3 seconds. Teaches deceleration.", "Deceleration is the skill", ["quads", "glutes"], ["calves/ankles", "core"]),
        ex("sqt-31", "Step-Up Jump", 4, ["power"], "One foot on box, opposite hand up, drive down leg up as you step up and straight into a jump, firing other arm up with the knee.", "Land and stick", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-32", "Box Jump (2-Foot Jump, 1-Foot Land)", 4, ["power", "stability"], "Higher complexity landing. Must own bilateral box jump first.", "Vary box height; alternate landing foot", ["quads", "glutes"], ["calves/ankles", "core"]),
        ex("sqt-33", "Split Squat Jump Switch", 4, ["power"], "Jump and switch stance, stick landing. Coach foot mechanics on every landing.", "Stick 3s; continuous flow for conditioning", ["quads", "glutes"], ["core", "hip-flexors"]),
        ex("sqt-34", "Split Squat Jump — Cycle Switch", 5, ["power"], "Jump, cycle through both stances, land in original. Advanced reactive power.", "Stick landing", ["quads", "glutes"], ["core", "hip-flexors"]),
        ex("sqt-35", "Depth Drop to Squat Hold", 4, ["power", "stability"], "Step off box, land in squat, hold. Reactive absorption. Prerequisite for depth jumps.", "Vary box height", ["quads", "glutes"], ["calves/ankles", "core"]),
        ex("sqt-36", "Depth Jump", 5, ["power"], "Step off box, land and immediately jump. Reactive strength. Only for athletes with a deep squat and landing base.", "Vary box height", ["quads", "glutes"], ["calves/ankles", "core"]),
        ex("sqt-37", "Sled Push", 3, ["power", "endurance"], "Loaded forward drive. Dynamic: ~10yd light/fast; Endurance: 25+yd; Strength: heavy 10-15yd.", "Vary load and distance", ["quads", "glutes"], ["core", "shoulders"]),
        ex("sqt-38", "Forward Lunge to Jump", 3, ["power"], "Step into lunge — do NOT exceed 50% eccentric depth before exploding into jump. Cue: catch and fire.", "Alternating legs; same leg consecutive; drive knee at top", ["quads", "glutes"], ["core", "calves/ankles"]),
        ex("sqt-39", "Multi-Directional Hop to Stick", 4, ["power", "stability"], "Single-leg hops in various directions. Stick every landing 3s. Coach foot position relentlessly.", "Forward, lateral, diagonal, rotational; coach calls direction (reactive); increase distance", ["quads", "glutes"], ["calves/ankles", "core", "proprioception"])
      ]
    }
  }
};

// ========== 2. HINGE ==========
const hinge = {
  label: "Hinge",
  subcategories: {
    "hinge-bilateral": {
      label: "Bilateral",
      exercises: [
        ex("hng-01", "Glute Bridge", 1, ["stability", "strength"], "Entry point for hip extension. Teaches glute activation without spinal load. Posterior chain starts here.", "Iso hold; banded at knees; heels-only for hamstring bias; tempo; feet elevated on bench; single-leg tap", ["glutes"], ["hamstrings", "core"]),
        ex("hng-02", "KB Deadlift (Sumo Stance)", 2, ["strength"], "Wide stance, KB between feet. Low technical demand, teaches hinge under light load.", "Offset (single KB); tempo; double KB", ["glutes", "hamstrings"], ["core", "quads"]),
        ex("hng-03", "45-Degree Back Extension", 2, ["strength", "hypertrophy"], "Controlled spinal extension under gravity. Teaches erector endurance and glute-driven hip extension.", "BW → DB at chest → barbell; tempo; iso hold at top; single-leg; offset hold", ["lower-back/lumbar", "glutes"], ["hamstrings"]),
        ex("hng-04", "Romanian Deadlift — DB/KB", 2, ["strength"], "Eccentric hamstring loading. Always coach slight knee bend first. Use sparingly bilateral — single-leg preferred.", "Tempo eccentric; offset (single DB suitcase); staggered stance; heel elevated", ["hamstrings", "glutes"], ["core", "lower-back/lumbar"]),
        ex("hng-05", "Trap Bar Deadlift", 3, ["strength"], "Safer entry to heavy barbell hinge. Handles at sides reduce low back moment arm. Not for all athletes.", "High handle → low handle; offset one side heavier", ["glutes", "hamstrings", "quads"], ["core", "lower-back/lumbar"]),
        ex("hng-06", "Sumo Barbell Deadlift", 4, ["strength"], "Preferred barbell deadlift. More hip dominant, upright torso. Often the terminal barbell version.", "Tempo; deficit; banded", ["glutes", "hamstrings", "adductors"], ["core", "lower-back/lumbar"]),
        ex("hng-07", "Conventional Barbell Deadlift", 4, ["strength"], "Full expression of hinge under max load. Only for athletes whose structure and goals warrant it beyond sumo.", "Tempo; deficit; banded", ["hamstrings", "glutes", "lower-back/lumbar"], ["core", "quads"]),
        ex("hng-08", "GHD Back Extension", 3, ["strength", "hypertrophy"], "Greater ROM than 45-degree. Higher hamstring and glute demand. Must own 45-degree first.", "BW → DB at chest; tempo; iso hold; offset", ["hamstrings", "glutes"], ["lower-back/lumbar"]),
        ex("hng-09", "GHD Raise (Full)", "4-5", ["strength"], "Full glute-ham raise. Extreme hamstring eccentric demand. The bodyweight nordic equivalent on the GHD.", "Band-assisted; slow eccentric; iso hold at parallel", ["hamstrings", "glutes"], ["core"])
      ]
    },
    "hinge-split-stance": {
      label: "Split Stance",
      exercises: [
        ex("hng-10", "Reverse Lunge", "2-4", ["strength", "stability"], "Major staple. Primary split stance hinge-dominant mover. Stepping back is safer for the knee.", "BW → goblet → DB at sides → front rack BB → back rack BB; deficit; offset; contralateral vs ipsilateral; heel elevated; tempo; iso hold at bottom", ["glutes", "hamstrings", "quads"], ["core", "hip-flexors"]),
        ex("hng-11", "Staggered Stance RDL — DB/KB", 2, ["stability", "strength"], "80/20 weight split. Bridge between bilateral and single-leg. Teaches weight shift.", "Offset load; heel elevated front foot; tempo", ["hamstrings", "glutes"], ["core", "lower-back/lumbar"]),
        ex("hng-12", "Staggered Stance RDL — Barbell", 3, ["strength"], "Same 80/20 split under barbell load.", "Tempo; deficit", ["hamstrings", "glutes"], ["core", "lower-back/lumbar"]),
        ex("hng-13", "Kickstand RDL — DB/KB", 3, ["strength", "stability"], "Back toe barely touching. Nearly single-leg demand with a safety net.", "Offset load; tempo; heel elevated", ["hamstrings", "glutes"], ["core"]),
        ex("hng-14", "B-Stance Hip Thrust", 2, ["strength", "hypertrophy"], "One foot working, other heel assists. Bridges bilateral to single-leg.", "Banded at knees; tempo; iso hold at top; back on bench", ["glutes"], ["hamstrings", "core"]),
        ex("hng-15", "Hip Thrust — Barbell", 3, ["strength", "hypertrophy"], "Back on bench, barbell across hips. Peak glute activation. Full hip extension without lumbar compensation.", "Banded at knees; single-leg; tempo; iso hold at top", ["glutes"], ["hamstrings", "core"])
      ]
    },
    "hinge-unilateral": {
      label: "Unilateral",
      exercises: [
        ex("hng-16", "Single-Leg Glute Bridge", 2, ["stability", "strength"], "Isolates one glute. Exposes asymmetries. Non-negotiable in any posterior chain program.", "Foot elevated on bench; banded at knees; tempo; iso hold at top; back on bench", ["glutes"], ["hamstrings", "core"]),
        ex("hng-17", "Single-Leg RDL — Bodyweight", 2, ["stability", "mobility"], "Balance + hinge simultaneously. The proprioceptive demand is the training.", "Hand on wall; eyes closed; offset KB hold for arch challenge; heel elevated", ["hamstrings", "glutes"], ["core", "feet/intrinsic"]),
        ex("hng-18", "Single-Leg RDL — DB/KB", 3, ["strength", "stability"], "Contralateral = anti-rotation. Ipsilateral = lateral stability. Preferred over bilateral RDL.", "Ipsilateral vs contralateral; offset; tempo; heel elevated", ["hamstrings", "glutes"], ["core", "lower-back/lumbar"]),
        ex("hng-19", "Single-Leg Hip Thrust", 3, ["strength", "hypertrophy"], "Back on bench, one leg working. Full glute isolation under hip extension.", "Banded; tempo; iso hold at top", ["glutes"], ["hamstrings", "core"]),
        ex("hng-20", "Single-Leg Swiss Ball Hamstring Curl", 4, ["strength", "stability"], "Hamstring as knee flexor AND hip extensor simultaneously. High stability demand.", "Iso hold at top; slow eccentric", ["hamstrings"], ["glutes", "core"]),
        ex("hng-21", "Single-Leg Deadlift to Row", 4, ["strength", "stability"], "Hinge + pull combo. Full posterior chain in one movement. Perfect for lighter days.", "Light load; tempo; contralateral vs ipsilateral", ["hamstrings", "glutes", "lats"], ["core", "rhomboids"])
      ]
    },
    "hinge-adjacent": {
      label: "Hinge-Adjacent",
      exercises: [
        ex("hng-22", "Pull-Through (Cable/Band)", 2, ["strength", "stability"], "Great hinge teacher. Band path forces hip extension, nearly impossible to cheat with low back.", "Staggered stance; tempo", ["glutes", "hamstrings"], ["core"]),
        ex("hng-23", "Swiss Ball Hamstring Curl", 2, ["strength", "stability"], "Hamstrings as knee flexors AND hip extensors. ACL's best friend.", "Single-leg; iso hold at top; slow eccentric", ["hamstrings"], ["glutes", "core"]),
        ex("hng-24", "Nordic Hamstring Curl (Eccentric)", 4, ["strength"], "Gold standard for hamstring injury prevention. Eccentric at long muscle lengths — where tears happen.", "Band-assisted; slow eccentric; partner-assisted", ["hamstrings"], ["glutes", "core"]),
        ex("hng-25", "Reverse Hyper", 3, ["strength", "hypertrophy"], "Posterior chain with traction on the spine. Decompression effect. Use when available.", "Light/tempo for rehab; heavy for strength", ["glutes", "hamstrings"], ["lower-back/lumbar"])
      ]
    },
    "hinge-plyometric": {
      label: "Plyometric / Dynamic",
      exercises: [
        ex("hng-26", "Broad Jump", 3, ["power"], "Horizontal power. Coach the hip hinge on the load-up — the jump starts from the hinge.", "Stick landing 3s; bounding (2-3 in a row); measure distance", ["glutes", "hamstrings", "quads"], ["core", "calves/ankles"]),
        ex("hng-27", "Max Height Skips", 3, ["power"], "Single-leg explosive vertical drive. Knee drive + arm drive. Primes nervous system.", "Alternating; same-leg consecutive", ["glutes", "quads", "hip-flexors"], ["core", "calves/ankles"]),
        ex("hng-28", "Single-Leg Broad Jump", 4, ["power", "stability"], "Demands single-leg deceleration — directly transfers to cutting and planting.", "Stick same vs opposite leg; bounding (2-3)", ["glutes", "hamstrings", "quads"], ["core", "calves/ankles"]),
        ex("hng-29", "Lateral Skater Jumps", 3, ["power", "stability"], "Lateral power + single-leg landing. Directly mimics cutting mechanics.", "Stick landing 3s; continuous flow; increase distance", ["glutes", "glute-medius", "quads"], ["adductors", "core"]),
        ex("hng-30", "Dynamic Straight-Leg Swiss Ball Hamstring Kicks", 3, ["power", "mobility"], "Dynamic hamstring lengthening under speed. Eccentric capacity at end range.", "Tempo variation; banded", ["hamstrings"], ["hip-flexors", "core"]),
        ex("hng-31", "Med Ball Slam", 2, ["power"], "Full hip extension → slam. Low technical demand, high power output. Teaches intent.", "Rotational; overhead vs side; single-arm", ["core", "lats", "glutes"], ["shoulders"]),
        ex("hng-32", "Sprints — Short (15yd)", 3, ["power"], "Pure speed expression. Most sport-transferable power exercise.", "Vary distance (10-20yd); standing start; 3-point; rolling; lateral start to sprint", ["glutes", "hamstrings", "quads"], ["calves/ankles", "core"]),
        ex("hng-33", "Sled Sprints", "3-4", ["power", "strength"], "Loaded sprinting. Forward lean and aggressive drive phase. No eccentric stress.", "Light/fast for speed; heavy for strength; vary distance", ["glutes", "hamstrings", "quads"], ["core", "calves/ankles"]),
        ex("hng-34", "Sled Pull (Forward Lean)", 3, ["power", "endurance"], "Hip extension dominant. Pure concentric — can be hammered for volume.", "Dynamic: light/fast ~10yd; Endurance: moderate 25+yd; Strength: heavy 10-15yd", ["glutes", "hamstrings"], ["core"])
      ]
    }
  }
};

// ========== 3. PUSH ==========
const push = {
  label: "Push",
  subcategories: {
    "push-horizontal": {
      label: "Bilateral — Horizontal",
      exercises: [
        ex("psh-01", "Push-Up (Iso Hold)", 1, ["stability"], "Bottom and top position holds. Core and scap position are the skill, not the chest.", "Elevated hands (regression); knees down; narrow/wide", ["chest", "shoulders", "triceps"], ["core", "scapular-stabilizers"]),
        ex("psh-02", "Push-Up", 1, ["stability", "strength"], "The foundational push. If low back sags, it's a plank failure, not a chest exercise.", "Tempo; elevated hands; deficit; feet elevated; band-resisted; offset (one hand elevated)", ["chest", "shoulders", "triceps"], ["core", "scapular-stabilizers"]),
        ex("psh-03", "DB Bench Press", 2, ["strength", "hypertrophy"], "Full ROM horizontal push. Natural arm path, each arm independent. Primary loaded push for most athletes.", "Incline (15-30°); single-arm (anti-rotation); neutral grip; tempo; iso hold at bottom; back on swiss ball", ["chest", "shoulders", "triceps"], ["core"]),
        ex("psh-04", "Dips (Assisted → Bodyweight → Weighted)", 3, ["strength", "hypertrophy"], "Major compound push. Prime mover, not accessory. Band-assisted first.", "Band-assisted; weighted (belt); tempo; iso hold at bottom; ring dips (Cx 5)", ["chest", "triceps", "shoulders"], ["core"]),
        ex("psh-05", "Landmine Press (Half-Kneeling)", 2, ["strength", "stability"], "Angled press between horizontal and vertical. Half-kneeling adds hip flexor stretch and core demand.", "Tall kneeling; standing; single-arm; split stance; iso lunge stance", ["shoulders", "chest", "triceps"], ["core", "hip-flexors"])
      ]
    },
    "push-vertical": {
      label: "Bilateral — Vertical",
      exercises: [
        ex("psh-06", "Half-Kneeling DB Press", 2, ["strength", "stability"], "Vertical press from stable, core-demanding position. Entry point to overhead work.", "Single-arm (offset/anti-lateral); tall kneeling; tempo; KB bottoms-up", ["shoulders", "triceps"], ["core"]),
        ex("psh-07", "Standing DB Overhead Press", 3, ["strength"], "Full body pressing. Demands full trunk stability under overhead load.", "Single-arm (offset); alternating; tempo", ["shoulders", "triceps"], ["core"]),
        ex("psh-08", "Bottom-Up KB Press", 3, ["stability", "strength"], "KB bottoms-up. Grip and rotator cuff fire reflexively. More stability tool than strength tool.", "Half-kneeling; tall kneeling; standing", ["shoulders", "rotator-cuff"], ["core", "grip"]),
        ex("psh-09", "Barbell Overhead Press", 4, ["strength"], "Reserved for athletes with demonstrated DB overhead competency and mobility.", "Push press (power); seated; tempo", ["shoulders", "triceps"], ["core"])
      ]
    },
    "push-single-arm": {
      label: "Single-Arm / Split Stance",
      exercises: [
        ex("psh-10", "Single-Arm DB Bench Press", 3, ["strength", "stability"], "One DB, full bench. Core fights rotation every rep. Strength + core simultaneously.", "Incline; neutral grip; tempo; iso hold at bottom; back on swiss ball", ["chest", "triceps"], ["core", "obliques"]),
        ex("psh-11", "Single-Arm DB Overhead Press (Standing)", 3, ["strength", "stability"], "Anti-lateral flexion under vertical pressing. Foot and arch fight the offset load.", "Half-kneeling; tall kneeling; split stance; tempo", ["shoulders", "triceps"], ["core", "feet/intrinsic"]),
        ex("psh-12", "Iso Lunge Single-Arm Cable Press (Horizontal)", 3, ["strength", "stability"], "Hold lunge, press one arm. Anti-rotation + pressing from a split base.", "Vary lunge depth; vary cable height", ["chest", "shoulders", "triceps"], ["core", "quads"]),
        ex("psh-13", "Split Stance Landmine Press", 2, ["strength", "stability"], "Landmine from split stance. Anti-rotation + pressing from athletic base.", "Offset by nature; vary stance width; front foot elevated; iso lunge stance", ["shoulders", "chest"], ["core"])
      ]
    },
    "push-adjacent": {
      label: "Push-Adjacent",
      exercises: [
        ex("psh-14", "Cable Tricep Pushdown", 2, ["hypertrophy", "strength"], "Tricep isolation. Supports lockout strength in all pressing.", "Rope; straight bar; single-arm; overhead extension; tempo; drop sets (advanced)", ["triceps"], []),
        ex("psh-15", "Cable/Band Chest Fly", 2, ["hypertrophy"], "Horizontal adduction isolation. Pec accessory without pressing demand.", "Incline angle; single-arm; low-to-high vs high-to-low", ["chest"], ["shoulders"]),
        ex("psh-16", "Lateral DB Fly", 2, ["hypertrophy", "stability"], "Medial delt isolation. Builds shoulder width and joint resilience.", "Seated; standing; single-arm; cable variation; leaning away for stretch", ["shoulders"], [])
      ]
    },
    "push-plyometric": {
      label: "Plyometric / Dynamic",
      exercises: [
        ex("psh-17", "Plyo Push-Up", 3, ["power"], "Explosive concentric push. Rate of force development through the push pattern.", "Clap; elevated hands for regression; alternating hand position", ["chest", "shoulders", "triceps"], ["core"]),
        ex("psh-18", "Med Ball Chest Pass", 2, ["power"], "Horizontal power expression. Low technical demand, high output. Teaches aggressive intent.", "Kneeling; standing; single-arm; rotational", ["chest", "shoulders", "triceps"], ["core"]),
        ex("psh-19", "Med Ball Overhead Throw (Forward)", 3, ["power"], "Full body — hips drive, core transfers, arms deliver.", "Kneeling; standing; step-into", ["shoulders", "core", "triceps"], ["glutes"]),
        ex("psh-20", "Landmine Push Press", 3, ["power"], "Lower body drives, upper body presses. Power transfer from ground through the push.", "Split stance; half-kneeling; single-arm", ["shoulders", "triceps"], ["core", "glutes"])
      ]
    }
  }
};

// ========== 4. PULL ==========
const pull = {
  label: "Pull",
  subcategories: {
    "pull-single-arm": {
      label: "Single-Arm / Split Stance",
      exercises: [
        ex("pul-01", "Single-Arm DB Row (Bird-Dog Position)", 2, ["strength", "stability"], "Row from 3-point with core engaged like bird-dog. Anti-rotation forces core to work as hard as the back. Default entry for loaded pulling.", "On bench; bird-dog (opposite leg extended); tempo; iso hold at top", ["lats", "rhomboids"], ["core", "posterior-deltoid"]),
        ex("pul-02", "Single-Arm DB Row (Bench-Supported)", 2, ["strength"], "One knee and hand on bench. The classic. Allows heavy loading with spinal support.", "Tempo; iso hold at top; neutral vs pronated grip", ["lats", "rhomboids"], ["posterior-deltoid", "biceps"]),
        ex("pul-03", "Iso Lunge Single-Arm DB Row", 3, ["strength", "stability"], "Hold iso lunge, row one arm. Full chain integration — no bench support.", "Vary lunge depth; tempo; contralateral vs ipsilateral", ["lats", "rhomboids"], ["core", "glutes", "quads"]),
        ex("pul-04", "Single-Arm Lat Pulldown", 3, ["strength", "stability"], "Anti-lateral flexion under vertical pulling. Exposes lat asymmetries.", "Half-kneeling; tempo; iso hold at contracted", ["lats"], ["core", "biceps"]),
        ex("pul-05", "Single-Leg RDL to Row", 4, ["strength", "stability"], "Full posterior chain in one movement. Perfect for lighter days, warm-ups, full-body accessory.", "Light load; tempo; contralateral vs ipsilateral", ["hamstrings", "glutes", "lats"], ["core", "rhomboids"])
      ]
    },
    "pull-horizontal": {
      label: "Bilateral — Horizontal",
      exercises: [
        ex("pul-06", "TRX/Ring Row (Inverted Row)", 1, ["stability", "strength"], "Bodyweight horizontal pull. Body angle is the progression lever.", "Feet elevated; single-arm; iso hold at top; tempo; offset (one hand lower)", ["lats", "rhomboids"], ["core", "posterior-deltoid"]),
        ex("pul-07", "Chest-Supported DB Row", 2, ["strength", "hypertrophy"], "Incline bench, face down. Removes low back. Pure back work.", "Single-arm; neutral grip; supinated; tempo; iso hold at top", ["lats", "rhomboids"], ["posterior-deltoid", "biceps"]),
        ex("pul-08", "Cable Row (Seated)", 2, ["strength", "hypertrophy"], "Constant tension throughout ROM. Teaches scap retraction → pull sequence.", "Single-arm; standing; rope handle; wide grip; close grip; tempo", ["lats", "rhomboids"], ["biceps", "core"]),
        ex("pul-09", "KB Gorilla Row", 3, ["strength", "stability"], "Two KBs on floor, hinge position, alternate rowing. Maintaining hinge while pulling.", "Tempo; double row; iso hold at top", ["lats", "rhomboids"], ["core", "hamstrings", "glutes"])
      ]
    },
    "pull-vertical": {
      label: "Bilateral — Vertical",
      exercises: [
        ex("pul-10", "Lat Pulldown", 2, ["strength", "hypertrophy"], "Machine vertical pull. Teaches scap depression → pull before pull-up demand.", "Wide; close; neutral grip; single-arm; tempo; iso hold", ["lats"], ["biceps", "rhomboids"]),
        ex("pul-11", "Assisted Pull-Up (Band)", 3, ["strength"], "Band takes percentage of bodyweight. Use lightest band possible — earn less help.", "Pronated; supinated (chin-up); neutral grip", ["lats"], ["biceps", "rhomboids", "core"]),
        ex("pul-12", "Pull-Up / Chin-Up", 4, ["strength"], "Bodyweight vertical pull. Chin-up is easier, more bicep. Pull-up is more lat. Both earned.", "Tempo eccentric (negatives); iso hold at top; weighted; neutral; wide", ["lats"], ["biceps", "rhomboids", "core"])
      ]
    },
    "pull-adjacent": {
      label: "Pull-Adjacent",
      exercises: [
        ex("pul-13", "Band Pull-Apart", 1, ["stability", "hypertrophy"], "Rear delt and scapular retraction. Daily maintenance — every session.", "Overhead; underhand; single-arm; tempo; high reps", ["posterior-deltoid", "rhomboids"], ["scapular-stabilizers"]),
        ex("pul-14", "Face Pull (Cable/Band)", 2, ["stability", "hypertrophy"], "External rotation + scapular retraction. Rear delt and rotator cuff. Daily maintenance.", "Rope; band; high vs low angle; single-arm; iso hold; tempo", ["posterior-deltoid", "rotator-cuff"], ["scapular-stabilizers", "rhomboids"]),
        ex("pul-15", "Prone Y-T-W Raises", 1, ["stability"], "Scapular stabilizer activation. Warm-up complex only.", "On incline bench with light DBs; tempo; iso hold at top", ["scapular-stabilizers"], ["posterior-deltoid", "rotator-cuff"]),
        ex("pul-16", "Scapular Pull-Up", 2, ["stability"], "Hang, depress and retract scaps without bending elbows. Warm-up complex only.", "Dead hang; active hang; single-arm hang", ["scapular-stabilizers", "lats"], []),
        ex("pul-17", "DB Bicep Curl", 2, ["hypertrophy", "strength"], "Bicep isolation. Supports all pulling. Healthy elbows need strong biceps.", "Incline bench; single-arm; concentration curl; tempo; cable variation; drop sets (advanced)", ["biceps"], []),
        ex("pul-18", "Reverse Cable/Band Fly", 2, ["hypertrophy", "stability"], "Rear delt isolation. Supports scapular health and posterior shoulder balance.", "High angle; low angle; single-arm; bent-over DB variation; tempo", ["posterior-deltoid"], ["rhomboids", "scapular-stabilizers"])
      ]
    },
    "pull-plyometric": {
      label: "Plyometric / Dynamic",
      exercises: [
        ex("pul-19", "Med Ball Slam", 2, ["power"], "Full lat engagement through hip extension → slam. Low technical demand, high output.", "Rotational; overhead vs side; single-arm", ["lats", "core"], ["glutes", "shoulders"]),
        ex("pul-20", "Cable/Band Speed Row", 3, ["power"], "Light load, max speed. Rate of force development through the pull.", "Single-arm; standing; split stance", ["lats", "rhomboids"], ["core"]),
        ex("pul-21", "Explosive TRX/Ring Row", 3, ["power"], "Inverted row with explosive concentric — hands release at top.", "Clap at top; vary body angle", ["lats", "rhomboids"], ["core"]),
        ex("pul-22", "Rope Climb / Towel Pull-Up", 4, ["strength", "power"], "Grip, lat, full upper body pull under high demand. Earned.", "Legless (Cx 5); thick rope vs thin", ["lats", "biceps", "grip"], ["core"])
      ]
    }
  }
};

// ========== 5. CORE 7a — ROTATIONAL ==========
const core7a = {
  label: "Core 7a — Rotational",
  subcategories: {
    "core-rotational": {
      label: "Rotation + Anti-Rotation",
      exercises: [
        ex("c7a-01", "Pallof Press (Band/Cable)", 2, ["stability"], "Foundational anti-rotation. Band tries to rotate you — resist it.", "Half-kneeling; tall kneeling; split stance; iso lunge; overhead reach (arc); single-leg", ["core", "obliques"], []),
        ex("c7a-02", "Cable/Band Chop (Horizontal)", 2, ["strength", "stability"], "Horizontal rotational pull. Trains producing AND decelerating controlled rotation. Keep horizontal.", "Half-kneeling; tall kneeling; split stance; tempo; iso hold; dynamic effort (fast/explosive)", ["obliques", "core"], ["shoulders"]),
        ex("c7a-03", "Med Ball Rotational Throw", 3, ["power"], "Explosive rotation. Hips drive, core transfers, arms deliver.", "Standing; split stance; step-into; scoop throw; side throw", ["obliques", "core"], ["glutes", "shoulders"]),
        ex("c7a-04", "Med Ball Slam (Rotational)", 3, ["power"], "Aggressive rotational slam. Full hip extension + rotation.", "Over-the-shoulder; side slam; kneeling", ["obliques", "core"], ["lats", "glutes"]),
        ex("c7a-05", "Turkish Get-Up", 4, ["stability", "strength"], "Multi-plane core stability under asymmetric loading. Gold standard of integrated stability.", "No weight → shoe → light KB → heavier KB; iso hold at each position", ["core", "obliques", "shoulders"], ["glutes", "hip-rotators"])
      ]
    }
  }
};

// ========== 6. CORE 7b — STABILITY ==========
const core7b = {
  label: "Core 7b — Stability",
  subcategories: {
    "core-anti-extension": {
      label: "Anti-Extension",
      exercises: [
        ex("c7b-01", "Dead Bug (Static → Movement)", 1, ["stability"], "Foundational anti-extension. Low back stays flat — moment it arches, set is over. Breathing through the brace.", "Arms only; contralateral; band-resisted; tempo; iso hold; KB in hands", ["core"], ["hip-flexors"]),
        ex("c7b-02", "Plank", "1-3", ["stability", "endurance"], "Isometric anti-extension. If low back sags, it's a failure. Complexity scales with wrinkles.", "On elbows; on hands; feet elevated; single-arm; single-leg; body saw; long lever; alternating hi-low (Cx 2); ball drop and catch (Cx 3); swiss ball plank (Cx 2); swiss ball stir-the-pot (Cx 3)", ["core"], ["shoulders", "glutes"]),
        ex("c7b-03", "Bear Crawl (Static Hold → Crawl)", "2-3", ["stability", "strength"], "Knees 1 inch off ground. Anti-extension under quadruped demand. Breathing through the brace.", "Static hold; contralateral lifts; slow crawl; forward/backward; lateral; perturbation; sit-outs (Cx 3)", ["core"], ["shoulders", "hip-flexors"]),
        ex("c7b-04", "Ab Wheel / Barbell Rollout", 3, ["strength", "stability"], "Progressive anti-extension under increasing lever arm. From knees first.", "From knees; from feet (Cx 5); tempo; band-assisted; single-arm; static hold at full extension (Cx 4-5)", ["core"], ["lats", "shoulders"]),
        ex("c7b-05", "Marinovich Swiss Ball Rotations", 3, ["stability", "strength"], "Hands on ground, knees on swiss ball. Rotate lower body side to side, shoulders stay planted. Video to be filmed by Max.", "Tempo; vary rotation range; pause at end range", ["core", "obliques"], ["shoulders"]),
        ex("c7b-06", "Swiss Ball Psoas March", 2, ["stability", "strength"], "Forearms on swiss ball in plank. Alternate driving knees toward chest. Anti-extension while hip flexors fire.", "Tempo; iso hold at top of each knee drive; band at feet", ["core", "hip-flexors"], ["shoulders"])
      ]
    },
    "core-anti-lateral": {
      label: "Anti-Lateral Flexion",
      exercises: [
        ex("c7b-07", "Side Plank", 2, ["stability"], "Foundational anti-lateral flexion. Common weakness in rotational athletes.", "On elbow; on hand; stacked vs staggered; top leg raised; hip dip; thread the needle", ["obliques", "core"], ["glute-medius"]),
        ex("c7b-08", "Copenhagen Side Plank", 3, ["stability", "strength"], "Top foot on bench. Adductors hold you up. ALWAYS start short lever (knee on bench). Progress very slowly.", "Short lever FIRST; full lever; hip dip; iso hold", ["adductors", "obliques"], ["core", "glute-medius"]),
        ex("c7b-09", "Farmer / Suitcase / Cross-Body Carry", "1-3", ["stability", "strength"], "The loaded carry. Position of weight determines core demand. Simplest and most effective loaded core exercise.", "Bilateral (farmer); single-arm at side (suitcase); goblet; single-arm rack; cross-body (rack + suitcase); heavy/short; light/long; tempo; offset; iso lunge stops", ["core", "obliques"], ["grip", "shoulders", "feet/intrinsic"])
      ]
    },
    "core-flexion": {
      label: "Flexion",
      exercises: [
        ex("c7b-10", "Hanging Knee Raise (Dip Bar)", 2, ["strength", "stability"], "Knee raise from dip bar. Posterior pelvic tilt at top is the skill.", "Straight leg raise (Cx 3); single-leg; tempo; iso hold at top; from dead hang bar (Cx 3)", ["core", "hip-flexors"], [])
      ]
    },
    "core-extension": {
      label: "Extension (Posterior Core)",
      exercises: [
        ex("c7b-11", "Bird-Dog", 1, ["stability"], "Contralateral arm and leg extension from quadruped. Anti-rotation + anti-extension simultaneously.", "Tempo; iso hold; from bear crawl (Cx 2); band-resisted; elbow-to-knee crunch", ["core", "lower-back/lumbar"], ["glutes"]),
        ex("c7b-12", "Superman / Prone Back Extension (Floor)", 2, ["stability", "strength"], "Floor-based spinal extension. Glute-driven, not lumbar-driven. BREATHE at the top.", "Arms by sides; arms overhead; alternating (swimming); iso hold at top with breath; tempo", ["lower-back/lumbar", "glutes"], ["hamstrings"])
      ]
    }
  }
};

// Add all new categories to the library
lib.categories["squat"] = squat;
lib.categories["hinge"] = hinge;
lib.categories["push"] = push;
lib.categories["pull"] = pull;
lib.categories["core-7a-rotational"] = core7a;
lib.categories["core-7b-stability"] = core7b;

// Update meta
const newMuscles = ["chest", "triceps", "biceps", "lats", "rhomboids", "grip"];
newMuscles.forEach(m => {
  if (!lib.meta.focusTags.includes(m)) lib.meta.focusTags.push(m);
});

// Add new meta fields
lib.meta.version = "2.0";
lib.meta.lastUpdated = "2026-03-31";
lib.meta.movementPatterns = ["squat", "hinge", "push", "pull", "core-7a-rotational", "core-7b-stability"];
lib.meta.trainingIntents = ["stability", "mobility", "strength", "power", "hypertrophy", "endurance"];
lib.meta.complexityScale = "1=foundational, 2=developing, 3=intermediate, 4=advanced, 5=elite";

// Count total
let total = 0;
Object.values(lib.categories).forEach(cat => {
  if (cat.exercises) {
    total += cat.exercises.length;
  }
  if (cat.subcategories) {
    Object.values(cat.subcategories).forEach(sub => {
      total += sub.exercises.length;
    });
  }
});
lib.meta.totalExercises = total;

fs.writeFileSync(libPath, JSON.stringify(lib, null, 2));
console.log('Library updated. Total exercises: ' + total);
