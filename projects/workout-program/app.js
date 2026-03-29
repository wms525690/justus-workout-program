/* ================================================
   JUSTUS PLATTS — WORKOUT PROGRAM APP
   Local-first with localStorage (Firebase later)
   ================================================ */

(function () {
  'use strict';

  // ---------- State ----------
  const STORAGE_KEY = 'justus-workout-program';

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { checks: {}, notes: {}, ratings: {} };
    } catch {
      return { checks: {}, notes: {}, ratings: {} };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  const state = loadState();

  // ---------- Navigation ----------
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.program-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(s => {
        s.classList.remove('active');
        if (s.id === 'section-' + target) {
          s.classList.add('active');
        }
      });
    });
  });

  // ---------- Checkboxes ----------
  const checkboxes = document.querySelectorAll('.exercise-card input[type="checkbox"]');

  checkboxes.forEach(cb => {
    const card = cb.closest('.exercise-card');
    const id = card.dataset.id;

    // Restore saved state
    if (state.checks[id]) {
      cb.checked = true;
      card.classList.add('completed');
    }

    cb.addEventListener('change', () => {
      state.checks[id] = cb.checked;
      card.classList.toggle('completed', cb.checked);
      saveState(state);
      updateStats();
    });
  });

  // ---------- Notes Modal ----------
  const modal = document.getElementById('notesModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalInput = document.getElementById('modalNoteInput');
  const modalClose = document.getElementById('modalClose');
  const modalSave = document.getElementById('modalSave');
  const ratingButtons = document.querySelectorAll('.rating-btn');
  let activeExerciseId = null;
  let activeRating = null;

  document.querySelectorAll('.exercise-note-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.exercise-card');
      activeExerciseId = card.dataset.id;
      const exerciseName = card.querySelector('h4').textContent;

      modalTitle.textContent = exerciseName;
      modalInput.value = state.notes[activeExerciseId] || '';
      activeRating = state.ratings[activeExerciseId] || null;

      ratingButtons.forEach(rb => {
        rb.classList.toggle('selected', rb.dataset.rating === activeRating);
      });

      modal.classList.add('open');
      modalInput.focus();
    });
  });

  ratingButtons.forEach(rb => {
    rb.addEventListener('click', () => {
      activeRating = rb.dataset.rating;
      ratingButtons.forEach(b => b.classList.remove('selected'));
      rb.classList.add('selected');
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    activeExerciseId = null;
    activeRating = null;
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  modalSave.addEventListener('click', () => {
    if (!activeExerciseId) return;

    const noteText = modalInput.value.trim();
    state.notes[activeExerciseId] = noteText;
    if (activeRating) {
      state.ratings[activeExerciseId] = activeRating;
    }
    saveState(state);

    // Update note button visual
    const card = document.querySelector(`[data-id="${activeExerciseId}"]`);
    if (card) {
      const noteBtn = card.querySelector('.exercise-note-btn');
      noteBtn.classList.toggle('has-note', noteText.length > 0 || activeRating);
    }

    closeModal();
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ---------- Restore note button states ----------
  document.querySelectorAll('.exercise-card').forEach(card => {
    const id = card.dataset.id;
    if (id && (state.notes[id] || state.ratings[id])) {
      const noteBtn = card.querySelector('.exercise-note-btn');
      if (noteBtn) noteBtn.classList.add('has-note');
    }
  });

  // ---------- Stats ----------
  function updateStats() {
    const total = checkboxes.length;
    const done = Object.values(state.checks).filter(Boolean).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const completionEl = document.getElementById('completionRate');
    if (completionEl) completionEl.textContent = pct + '%';
  }

  updateStats();

  // ---------- Sticky Nav Shadow on Scroll ----------
  const nav = document.getElementById('programNav');

  if (nav) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        nav.style.boxShadow = entry.isIntersecting ? 'none' : '0 4px 20px rgba(0,0,0,0.3)';
      },
      { threshold: 0, rootMargin: '-60px 0px 0px 0px' }
    );

    const hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
  }

  // ---------- Hero Photo Fallback ----------
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    heroPhoto.addEventListener('error', () => {
      heroPhoto.style.display = 'none';
      const ring = document.querySelector('.hero-photo-ring');
      if (ring) ring.style.display = 'none';
      const container = document.querySelector('.hero-photo');
      if (container) {
        container.innerHTML = '<div style="width:100%;height:100%;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:3.5rem;font-weight:900;color:var(--red);">JP</div>';
      }
    });
  }

})();
