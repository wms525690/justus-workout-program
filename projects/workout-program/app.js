/* ================================================
   JUSTUS PLATTS — WORKOUT PROGRAM APP
   Firebase Firestore + localStorage fallback
   Date-aware daily reset + weekly analytics
   ================================================ */

(function () {
  'use strict';

  // ---------- Firebase Init ----------
  var firebaseConfig = {
    apiKey: "AIzaSyDuD9sL5mkmBKExepL0UZ_vpEH7J9ChocE",
    authDomain: "justus-workout-program.firebaseapp.com",
    projectId: "justus-workout-program",
    storageBucket: "justus-workout-program.firebasestorage.app",
    messagingSenderId: "704428705442",
    appId: "1:704428705442:web:6fb1c8262925068732b9fb"
  };

  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var DOC_REF = db.collection('athletes').doc('justus');
  var firestoreReady = false;

  // ---------- Date Helpers ----------
  function todayKey() {
    return new Date().toISOString().slice(0, 10); // "2026-03-29"
  }

  function getMonday(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var day = d.getDay();
    var diff = (day === 0 ? -6 : 1) - day; // Monday = 1
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
  }

  function addDays(dateStr, n) {
    var d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate();
  }

  function formatWeekRange(mondayStr) {
    var sunday = addDays(mondayStr, 6);
    var thisMon = getMonday(todayKey());
    if (mondayStr === thisMon) return 'This Week';
    return formatDate(mondayStr) + ' – ' + formatDate(sunday);
  }

  // ---------- State ----------
  var STORAGE_KEY = 'justus-workout-program';

  function emptyDay() {
    return { checks: {}, notes: {}, ratings: {}, actuals: {} };
  }

  function loadLocalState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  function saveLocalState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  // Migrate old flat state → date-keyed state
  function migrateIfNeeded(raw) {
    if (raw.checks || raw.notes || raw.ratings || raw.actuals) {
      var key = raw.lastUpdated ? raw.lastUpdated.slice(0, 10) : todayKey();
      var migrated = {};
      migrated[key] = {
        checks: raw.checks || {},
        notes: raw.notes || {},
        ratings: raw.ratings || {},
        actuals: raw.actuals || {}
      };
      saveLocalState(migrated);
      return migrated;
    }
    return raw;
  }

  var allState = migrateIfNeeded(loadLocalState());

  // Today's working state
  function getTodayState() {
    var key = todayKey();
    if (!allState[key]) allState[key] = emptyDay();
    return allState[key];
  }

  var state = getTodayState();

  // Sync to Firestore (full history)
  function syncToFirestore() {
    if (!firestoreReady) return;
    DOC_REF.set({
      days: allState,
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(function (err) {
      console.warn('Firestore sync failed, data saved locally:', err);
    });
  }

  // Load from Firestore
  function initFirestore() {
    DOC_REF.get().then(function (snapshot) {
      if (snapshot.exists) {
        var remote = snapshot.data();
        if (remote.days) {
          // Merge remote days with local
          Object.keys(remote.days).forEach(function (dateKey) {
            if (!allState[dateKey]) {
              allState[dateKey] = remote.days[dateKey];
            } else {
              // Merge each field
              var rd = remote.days[dateKey];
              var ld = allState[dateKey];
              ld.checks = Object.assign({}, ld.checks, rd.checks || {});
              ld.notes = Object.assign({}, ld.notes, rd.notes || {});
              ld.ratings = Object.assign({}, ld.ratings, rd.ratings || {});
              ld.actuals = Object.assign({}, ld.actuals, rd.actuals || {});
            }
          });
        } else if (remote.checks) {
          // Remote is still in old flat format — migrate it
          var key = remote.lastUpdated ? remote.lastUpdated.slice(0, 10) : todayKey();
          if (!allState[key]) allState[key] = emptyDay();
          allState[key].checks = Object.assign({}, allState[key].checks, remote.checks || {});
          allState[key].notes = Object.assign({}, allState[key].notes, remote.notes || {});
          allState[key].ratings = Object.assign({}, allState[key].ratings, remote.ratings || {});
          allState[key].actuals = Object.assign({}, allState[key].actuals, remote.actuals || {});
        }
        state = getTodayState();
        saveLocalState(allState);
        restoreUI();
      } else {
        DOC_REF.set({ days: allState, lastUpdated: new Date().toISOString() });
      }
      firestoreReady = true;

      // Real-time listener
      DOC_REF.onSnapshot(function (snap) {
        if (snap.exists && snap.data().days) {
          var remoteDays = snap.data().days;
          Object.keys(remoteDays).forEach(function (dk) {
            allState[dk] = remoteDays[dk];
          });
          state = getTodayState();
          saveLocalState(allState);
          restoreUI();
        }
      });

      console.log('Firebase connected');
    }).catch(function (err) {
      console.warn('Firebase unavailable, using localStorage:', err);
      firestoreReady = false;
    });
  }

  // ---------- Navigation ----------
  var navButtons = document.querySelectorAll('.nav-btn');
  var sections = document.querySelectorAll('.program-section');

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.section;

      navButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      sections.forEach(function (s) {
        s.classList.remove('active');
        if (s.id === 'section-' + target) {
          s.classList.add('active');
        }
      });

      if (target === 'stats') renderStats();
    });
  });

  // ---------- Checkboxes ----------
  var checkboxes = document.querySelectorAll('.exercise-card input[type="checkbox"]');

  function setupCheckboxes() {
    checkboxes.forEach(function (cb) {
      var card = cb.closest('.exercise-card');
      var id = card.dataset.id;

      if (state.checks[id]) {
        cb.checked = true;
        card.classList.add('completed');
      } else {
        cb.checked = false;
        card.classList.remove('completed');
      }
    });
  }

  checkboxes.forEach(function (cb) {
    var card = cb.closest('.exercise-card');
    var id = card.dataset.id;

    cb.addEventListener('change', function () {
      state.checks[id] = cb.checked;
      card.classList.toggle('completed', cb.checked);
      saveLocalState(allState);
      syncToFirestore();
      updateStats();
    });
  });

  setupCheckboxes();

  // ---------- Notes Modal ----------
  var modal = document.getElementById('notesModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalInput = document.getElementById('modalNoteInput');
  var modalClose = document.getElementById('modalClose');
  var modalSave = document.getElementById('modalSave');
  var ratingButtons = document.querySelectorAll('.rating-btn');
  var setRepsInputs = document.querySelectorAll('.set-reps');
  var setTimeInputs = document.querySelectorAll('.set-time');
  var activeExerciseId = null;
  var activeRating = null;

  document.querySelectorAll('.exercise-note-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.exercise-card');
      activeExerciseId = card.dataset.id;
      var exerciseName = card.querySelector('h4').textContent;

      modalTitle.textContent = exerciseName;
      modalInput.value = state.notes[activeExerciseId] || '';
      activeRating = state.ratings[activeExerciseId] || null;

      // Restore actuals per set
      var actual = state.actuals[activeExerciseId] || { sets: [] };
      var sets = actual.sets || [];
      setRepsInputs.forEach(function (input, i) { input.value = (sets[i] && sets[i].reps) || ''; });
      setTimeInputs.forEach(function (input, i) { input.value = (sets[i] && sets[i].time) || ''; });

      ratingButtons.forEach(function (rb) {
        rb.classList.toggle('selected', rb.dataset.rating === activeRating);
      });

      modal.classList.add('open');
    });
  });

  ratingButtons.forEach(function (rb) {
    rb.addEventListener('click', function () {
      if (activeRating === rb.dataset.rating) {
        activeRating = null;
        rb.classList.remove('selected');
      } else {
        activeRating = rb.dataset.rating;
        ratingButtons.forEach(function (b) { b.classList.remove('selected'); });
        rb.classList.add('selected');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    activeExerciseId = null;
    activeRating = null;
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  modalSave.addEventListener('click', function () {
    if (!activeExerciseId) return;

    var noteText = modalInput.value.trim();
    state.notes[activeExerciseId] = noteText;
    state.ratings[activeExerciseId] = activeRating;

    var sets = [];
    setRepsInputs.forEach(function (input, i) {
      var r = input.value ? parseInt(input.value, 10) : null;
      var t = setTimeInputs[i].value ? parseInt(setTimeInputs[i].value, 10) : null;
      sets.push({ reps: r, time: t });
    });
    state.actuals[activeExerciseId] = { sets: sets };

    saveLocalState(allState);
    syncToFirestore();

    var card = document.querySelector('[data-id="' + activeExerciseId + '"]');
    if (card) {
      var noteBtn = card.querySelector('.exercise-note-btn');
      var hasSetData = sets.some(function (s) { return s.reps || s.time; });
      noteBtn.classList.toggle('has-note', noteText.length > 0 || !!activeRating || hasSetData);
    }

    closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ---------- Restore UI ----------
  function restoreNoteButtons() {
    document.querySelectorAll('.exercise-card').forEach(function (card) {
      var id = card.dataset.id;
      if (id) {
        var noteBtn = card.querySelector('.exercise-note-btn');
        if (noteBtn) {
          var actualData = state.actuals[id];
          var hasActual = actualData && actualData.sets && actualData.sets.some(function (s) { return s && (s.reps || s.time); });
          noteBtn.classList.toggle('has-note', !!(state.notes[id] || state.ratings[id] || hasActual));
        }
      }
    });
  }

  function restoreUI() {
    setupCheckboxes();
    restoreNoteButtons();
    updateStats();
  }

  restoreNoteButtons();

  // ---------- Hero Stats ----------
  function updateStats() {
    var total = checkboxes.length;
    var done = Object.values(state.checks).filter(Boolean).length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    var completionEl = document.getElementById('completionRate');
    if (completionEl) completionEl.textContent = pct + '%';

    // Day streak
    var streakEl = document.getElementById('streakCount');
    if (streakEl) streakEl.textContent = calcStreak();
  }

  function calcStreak() {
    var streak = 0;
    var d = todayKey();
    // If today has at least 1 check, count it
    while (true) {
      var dayData = allState[d];
      if (dayData && dayData.checks) {
        var anyChecked = Object.values(dayData.checks).some(Boolean);
        if (anyChecked) {
          streak++;
          d = addDays(d, -1);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return streak;
  }

  updateStats();

  // ---------- Weekly Stats Page ----------
  var statsWeekOffset = 0; // 0 = this week, -1 = last week, etc.

  var prevWeekBtn = document.getElementById('statsPrevWeek');
  var nextWeekBtn = document.getElementById('statsNextWeek');

  if (prevWeekBtn) {
    prevWeekBtn.addEventListener('click', function () {
      statsWeekOffset--;
      renderStats();
    });
  }

  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', function () {
      if (statsWeekOffset < 0) {
        statsWeekOffset++;
        renderStats();
      }
    });
  }

  // Section metadata for breakdown
  var sectionMap = {
    'b3': 'The Big 3',
    'mob': 'Mobility',
    'ac': 'Arm Care',
    'rp': 'Rehab / Prehab'
  };

  function getSectionKey(exerciseId) {
    if (exerciseId.startsWith('b3-')) return 'b3';
    if (exerciseId.startsWith('mob-')) return 'mob';
    if (exerciseId.startsWith('ac-')) return 'ac';
    if (exerciseId.startsWith('rp-')) return 'rp';
    return 'other';
  }

  function getWeekDays(offset) {
    var thisMon = getMonday(todayKey());
    var monday = addDays(thisMon, offset * 7);
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push(addDays(monday, i));
    }
    return days;
  }

  function renderStats() {
    var weekDays = getWeekDays(statsWeekOffset);
    var monday = weekDays[0];

    // Week label
    var label = document.getElementById('statsWeekLabel');
    if (label) label.textContent = formatWeekRange(monday);

    // Disable next button if on current week
    if (nextWeekBtn) {
      nextWeekBtn.disabled = (statsWeekOffset >= 0);
      nextWeekBtn.style.opacity = statsWeekOffset >= 0 ? '0.3' : '1';
    }

    // Gather week data
    var totalExercises = checkboxes.length;
    var daysActive = 0;
    var totalChecksWeek = 0;
    var completionPerDay = [];
    var sectionTotals = {};
    var ratingCounts = { easy: 0, right: 0, hard: 0, pain: 0 };
    var painFlags = [];

    weekDays.forEach(function (dayStr) {
      var dayData = allState[dayStr];
      if (!dayData) {
        completionPerDay.push({ date: dayStr, count: 0, total: totalExercises });
        return;
      }

      var dayChecks = dayData.checks || {};
      var dayCount = Object.values(dayChecks).filter(Boolean).length;

      if (dayCount > 0) daysActive++;
      totalChecksWeek += dayCount;
      completionPerDay.push({ date: dayStr, count: dayCount, total: totalExercises });

      // Section breakdown
      Object.keys(dayChecks).forEach(function (exId) {
        if (dayChecks[exId]) {
          var sk = getSectionKey(exId);
          sectionTotals[sk] = (sectionTotals[sk] || 0) + 1;
        }
      });

      // Ratings
      var dayRatings = dayData.ratings || {};
      Object.keys(dayRatings).forEach(function (exId) {
        var r = dayRatings[exId];
        if (r && ratingCounts.hasOwnProperty(r)) ratingCounts[r]++;
      });

      // Pain flags
      Object.keys(dayRatings).forEach(function (exId) {
        if (dayRatings[exId] === 'pain') {
          var note = (dayData.notes || {})[exId] || '';
          var card = document.querySelector('[data-id="' + exId + '"]');
          var name = card ? card.querySelector('h4').textContent : exId;
          painFlags.push({ date: dayStr, exercise: name, note: note });
        }
      });
    });

    var avgCompletion = daysActive > 0 ? Math.round(totalChecksWeek / (daysActive * totalExercises) * 100) : 0;

    // Update summary cards
    setEl('statsDaysActive', daysActive + '/7');
    setEl('statsTotalChecks', totalChecksWeek);
    setEl('statsAvgCompletion', avgCompletion + '%');
    setEl('statsCurrentStreak', calcStreak());

    // Daily breakdown grid — per-tab bars for each day
    var sectionExCounts = {};
    checkboxes.forEach(function (cb) {
      var card = cb.closest('.exercise-card');
      var sk = getSectionKey(card.dataset.id);
      sectionExCounts[sk] = (sectionExCounts[sk] || 0) + 1;
    });

    var dayGrid = document.getElementById('statsDayGrid');
    if (dayGrid) {
      dayGrid.innerHTML = '';
      completionPerDay.forEach(function (day) {
        var isToday = day.date === todayKey();
        var isFuture = day.date > todayKey();
        var dayData = allState[day.date];
        var dayChecks = (dayData && dayData.checks) ? dayData.checks : {};

        // Count completed per section for this day
        var daySectionDone = {};
        Object.keys(dayChecks).forEach(function (exId) {
          if (dayChecks[exId]) {
            var sk = getSectionKey(exId);
            daySectionDone[sk] = (daySectionDone[sk] || 0) + 1;
          }
        });

        var div = document.createElement('div');
        div.className = 'stats-day-card' + (isToday ? ' today' : '') + (isFuture ? ' future' : '');

        var barsHtml = '<div class="stats-day-name">' + formatDate(day.date) + '</div>';
        var sectionOrder = ['b3', 'mob', 'ac', 'rp'];
        sectionOrder.forEach(function (sk) {
          var done = daySectionDone[sk] || 0;
          var total = sectionExCounts[sk] || 0;
          var pct = total > 0 ? Math.round((done / total) * 100) : 0;
          barsHtml +=
            '<div class="stats-day-section-row">' +
              '<div class="stats-day-section-label">' + sectionMap[sk] + '</div>' +
              '<div class="stats-day-bar-track"><div class="stats-day-bar-fill section-' + sk + '" style="width:' + (isFuture ? 0 : pct) + '%"></div></div>' +
              '<div class="stats-day-pct">' + (isFuture ? '—' : done + '/' + total) + '</div>' +
            '</div>';
        });

        div.innerHTML = barsHtml;
        dayGrid.appendChild(div);
      });
    }

    // Exercise volume by day
    activeVolumeDay = null;
    renderVolumeTabs(weekDays);

    // Section breakdown bars
    var sectionBars = document.getElementById('statsSectionBars');
    if (sectionBars) {
      sectionBars.innerHTML = '';
      // Max possible per section per week (section exercise count * 7 days)
      var sectionExCounts = {};
      checkboxes.forEach(function (cb) {
        var card = cb.closest('.exercise-card');
        var sk = getSectionKey(card.dataset.id);
        sectionExCounts[sk] = (sectionExCounts[sk] || 0) + 1;
      });

      Object.keys(sectionMap).forEach(function (sk) {
        var done = sectionTotals[sk] || 0;
        var maxWeek = (sectionExCounts[sk] || 0) * daysActive;
        var pct = maxWeek > 0 ? Math.round((done / maxWeek) * 100) : 0;
        var div = document.createElement('div');
        div.className = 'stats-bar-row';
        div.innerHTML =
          '<div class="stats-bar-label">' + sectionMap[sk] + '</div>' +
          '<div class="stats-bar-track"><div class="stats-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="stats-bar-value">' + done + ' done</div>';
        sectionBars.appendChild(div);
      });
    }

    // Rating summary
    var ratingSummary = document.getElementById('statsRatingSummary');
    if (ratingSummary) {
      var totalRatings = ratingCounts.easy + ratingCounts.right + ratingCounts.hard + ratingCounts.pain;
      if (totalRatings === 0) {
        ratingSummary.innerHTML = '<p class="stats-empty">No ratings logged this week.</p>';
      } else {
        ratingSummary.innerHTML =
          '<div class="stats-rating-row"><span class="stats-rating-dot easy"></span> Easy <strong>' + ratingCounts.easy + '</strong></div>' +
          '<div class="stats-rating-row"><span class="stats-rating-dot right"></span> Just Right <strong>' + ratingCounts.right + '</strong></div>' +
          '<div class="stats-rating-row"><span class="stats-rating-dot hard"></span> Hard <strong>' + ratingCounts.hard + '</strong></div>' +
          '<div class="stats-rating-row"><span class="stats-rating-dot pain"></span> Pain/Discomfort <strong>' + ratingCounts.pain + '</strong></div>';
      }
    }

    // Pain flags
    var flagList = document.getElementById('statsFlagList');
    if (flagList) {
      if (painFlags.length === 0) {
        flagList.innerHTML = '<p class="stats-empty">No pain flags this week. Keep it up.</p>';
      } else {
        flagList.innerHTML = '';
        painFlags.forEach(function (pf) {
          var div = document.createElement('div');
          div.className = 'stats-flag-item';
          div.innerHTML =
            '<div class="stats-flag-exercise">' + pf.exercise + '</div>' +
            '<div class="stats-flag-date">' + formatDate(pf.date) + '</div>' +
            (pf.note ? '<div class="stats-flag-note">' + pf.note + '</div>' : '');
          flagList.appendChild(div);
        });
      }
    }
  }

  // ---------- Stats: Exercise Volume by Day ----------
  var activeVolumeDay = null;

  function renderVolumeTabs(weekDays) {
    var tabsEl = document.getElementById('statsVolumeTabs');
    if (!tabsEl) return;
    tabsEl.innerHTML = '';

    weekDays.forEach(function (dayStr, i) {
      var dayData = allState[dayStr];
      var hasData = dayData && dayData.checks && Object.values(dayData.checks).some(Boolean);
      var isFuture = dayStr > todayKey();
      var btn = document.createElement('button');
      btn.className = 'stats-volume-tab' + (isFuture ? ' future' : '') + (!hasData && !isFuture ? ' empty' : '');
      btn.textContent = formatDate(dayStr).split(' ')[0]; // "Mon", "Tue", etc.
      btn.disabled = isFuture || !hasData;

      if (!isFuture && hasData) {
        btn.addEventListener('click', function () {
          activeVolumeDay = dayStr;
          tabsEl.querySelectorAll('.stats-volume-tab').forEach(function (t) { t.classList.remove('active'); });
          btn.classList.add('active');
          renderVolumeList(dayStr);
        });
      }

      // Auto-select most recent day with data
      if (!isFuture && hasData && activeVolumeDay === null) {
        activeVolumeDay = dayStr;
        btn.classList.add('active');
      }

      tabsEl.appendChild(btn);
    });

    // If we found an active day, render it; also try to re-select previous selection
    var found = false;
    if (activeVolumeDay) {
      weekDays.forEach(function (dayStr) {
        if (dayStr === activeVolumeDay) found = true;
      });
    }
    if (!found) activeVolumeDay = null;

    // Re-highlight
    if (activeVolumeDay) {
      renderVolumeList(activeVolumeDay);
    } else {
      var listEl = document.getElementById('statsVolumeList');
      if (listEl) listEl.innerHTML = '<p class="stats-empty">No completed exercises to show.</p>';
    }
  }

  function renderVolumeList(dayStr) {
    var listEl = document.getElementById('statsVolumeList');
    if (!listEl) return;
    listEl.innerHTML = '';

    var dayData = allState[dayStr];
    if (!dayData) return;

    var checks = dayData.checks || {};
    var actuals = dayData.actuals || {};
    var completedIds = Object.keys(checks).filter(function (id) { return checks[id]; });

    if (completedIds.length === 0) {
      listEl.innerHTML = '<p class="stats-empty">No completed exercises this day.</p>';
      return;
    }

    // Sort by section order
    var sectionOrder = ['b3', 'mob', 'ac', 'rp'];
    completedIds.sort(function (a, b) {
      return sectionOrder.indexOf(getSectionKey(a)) - sectionOrder.indexOf(getSectionKey(b));
    });

    completedIds.forEach(function (exId) {
      var card = document.querySelector('[data-id="' + exId + '"]');
      var name = card ? card.querySelector('h4').textContent : exId;
      var section = sectionMap[getSectionKey(exId)] || '';
      var actual = actuals[exId];
      var volumeStr = '';

      if (actual && actual.sets) {
        var totalReps = 0;
        var totalTime = 0;
        var setDetails = [];
        actual.sets.forEach(function (s, i) {
          if (s && (s.reps || s.time)) {
            var parts = [];
            if (s.reps) { totalReps += s.reps; parts.push(s.reps + ' reps'); }
            if (s.time) { totalTime += s.time; parts.push(s.time + 's'); }
            setDetails.push('S' + (i + 1) + ': ' + parts.join(', '));
          }
        });
        if (totalReps > 0 || totalTime > 0) {
          var totals = [];
          if (totalReps > 0) totals.push(totalReps + ' total reps');
          if (totalTime > 0) totals.push(totalTime + 's total');
          volumeStr = totals.join(' &middot; ');
        }
      }

      var row = document.createElement('div');
      row.className = 'stats-volume-row';
      row.innerHTML =
        '<div class="stats-volume-name">' + name + '</div>' +
        '<div class="stats-volume-section">' + section + '</div>' +
        '<div class="stats-volume-data">' + (volumeStr || '<span class="stats-muted">Completed (no volume logged)</span>') + '</div>';
      listEl.appendChild(row);
    });
  }

  function setEl(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ---------- Week Tracker Boxes (per exercise card) ----------
  var dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  function injectWeekTrackers() {
    document.querySelectorAll('.exercise-card').forEach(function (card) {
      var id = card.dataset.id;
      if (!id) return;

      // Only inject once
      if (card.querySelector('.week-tracker')) return;

      var tracker = document.createElement('div');
      tracker.className = 'week-tracker';
      for (var i = 0; i < 7; i++) {
        var box = document.createElement('div');
        box.className = 'week-tracker-day';
        box.setAttribute('data-day-index', i);
        box.innerHTML = '<span class="week-tracker-label">' + dayLabels[i] + '</span>';
        tracker.appendChild(box);
      }
      card.appendChild(tracker);
    });
  }

  function updateWeekTrackers() {
    var weekDays = getWeekDays(0); // Always current week

    document.querySelectorAll('.exercise-card').forEach(function (card) {
      var id = card.dataset.id;
      if (!id) return;
      var boxes = card.querySelectorAll('.week-tracker-day');

      boxes.forEach(function (box, i) {
        var dayStr = weekDays[i];
        var dayData = allState[dayStr];
        var completed = dayData && dayData.checks && dayData.checks[id];
        var isFuture = dayStr > todayKey();
        var isToday = dayStr === todayKey();

        box.classList.toggle('done', !!completed);
        box.classList.toggle('future', isFuture);
        box.classList.toggle('current', isToday);
      });
    });
  }

  injectWeekTrackers();
  updateWeekTrackers();

  // Patch restoreUI to also refresh trackers
  var _origRestoreUI = restoreUI;
  restoreUI = function () {
    _origRestoreUI();
    updateWeekTrackers();
  };

  // Also update trackers when a checkbox changes
  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      updateWeekTrackers();
    });
  });

  // ---------- Sticky Nav Shadow on Scroll ----------
  var nav = document.getElementById('programNav');

  if (nav) {
    var observer = new IntersectionObserver(
      function (entries) {
        nav.style.boxShadow = entries[0].isIntersecting ? 'none' : '0 4px 20px rgba(0,0,0,0.3)';
      },
      { threshold: 0, rootMargin: '-60px 0px 0px 0px' }
    );

    var hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
  }

  // ---------- Hero Photo Fallback ----------
  var heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    heroPhoto.addEventListener('error', function () {
      heroPhoto.style.display = 'none';
      var ring = document.querySelector('.hero-photo-ring');
      if (ring) ring.style.display = 'none';
      var container = document.querySelector('.hero-photo');
      if (container) {
        container.innerHTML = '<div style="width:100%;height:100%;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:3.5rem;font-weight:900;color:var(--red);">JP</div>';
      }
    });
  }

  // ---------- Boot ----------
  initFirestore();

})();
