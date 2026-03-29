/* ================================================
   JUSTUS PLATTS — WORKOUT PROGRAM APP
   Firebase Firestore + localStorage fallback
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

  // ---------- State ----------
  var STORAGE_KEY = 'justus-workout-program';

  function loadLocalState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { checks: {}, notes: {}, ratings: {} };
    } catch (e) {
      return { checks: {}, notes: {}, ratings: {} };
    }
  }

  function saveLocalState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  var state = loadLocalState();

  // Sync to Firestore
  function syncToFirestore() {
    if (!firestoreReady) return;
    DOC_REF.set({
      checks: state.checks,
      notes: state.notes,
      ratings: state.ratings,
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(function (err) {
      console.warn('Firestore sync failed, data saved locally:', err);
    });
  }

  // Load from Firestore then listen for changes
  function initFirestore() {
    DOC_REF.get().then(function (snapshot) {
      if (snapshot.exists) {
        var remote = snapshot.data();
        state.checks = Object.assign({}, state.checks, remote.checks || {});
        state.notes = Object.assign({}, state.notes, remote.notes || {});
        state.ratings = Object.assign({}, state.ratings, remote.ratings || {});
        saveLocalState(state);
        restoreUI();
      } else {
        DOC_REF.set({
          checks: state.checks,
          notes: state.notes,
          ratings: state.ratings,
          lastUpdated: new Date().toISOString()
        });
      }
      firestoreReady = true;

      // Real-time listener
      DOC_REF.onSnapshot(function (snap) {
        if (snap.exists) {
          var remote = snap.data();
          state.checks = remote.checks || {};
          state.notes = remote.notes || {};
          state.ratings = remote.ratings || {};
          saveLocalState(state);
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
      saveLocalState(state);
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

      ratingButtons.forEach(function (rb) {
        rb.classList.toggle('selected', rb.dataset.rating === activeRating);
      });

      modal.classList.add('open');
      modalInput.focus();
    });
  });

  ratingButtons.forEach(function (rb) {
    rb.addEventListener('click', function () {
      activeRating = rb.dataset.rating;
      ratingButtons.forEach(function (b) { b.classList.remove('selected'); });
      rb.classList.add('selected');
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
    if (activeRating) {
      state.ratings[activeExerciseId] = activeRating;
    }
    saveLocalState(state);
    syncToFirestore();

    var card = document.querySelector('[data-id="' + activeExerciseId + '"]');
    if (card) {
      var noteBtn = card.querySelector('.exercise-note-btn');
      noteBtn.classList.toggle('has-note', noteText.length > 0 || !!activeRating);
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
          noteBtn.classList.toggle('has-note', !!(state.notes[id] || state.ratings[id]));
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

  // ---------- Stats ----------
  function updateStats() {
    var total = checkboxes.length;
    var done = Object.values(state.checks).filter(Boolean).length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    var completionEl = document.getElementById('completionRate');
    if (completionEl) completionEl.textContent = pct + '%';
  }

  updateStats();

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
