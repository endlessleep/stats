// Initialize Lucide Icons & KaTeX Auto-Render
document.addEventListener('DOMContentLoaded', () => {
  // 1. Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. KaTeX Auto-Render for LaTeX Math
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }

  // 3. Sidebar Interactivity
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-sidebar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('micro_sidebar_collapsed', sidebar.classList.contains('collapsed'));
    });

    if (localStorage.getItem('micro_sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }

  if (mobileToggle && sidebar && sidebarOverlay) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // 4. Toggle Solution Buttons (English labels)
  const toggleButtons = document.querySelectorAll('.btn-toggle-solution');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const solutionContainer = document.getElementById(targetId);
      const icon = btn.querySelector('.toggle-icon');
      const label = btn.querySelector('.toggle-label');

      if (!solutionContainer) return;

      const isHidden = solutionContainer.classList.contains('hidden');

      if (isHidden) {
        solutionContainer.classList.remove('hidden');
        if (targetId === 'solution-q1') {
          label.textContent = 'Hide Solution (Q1)';
        } else if (targetId === 'solution-q2') {
          label.textContent = 'Hide Solution (Q2)';
        } else {
          label.textContent = 'Hide Solution';
        }
        icon.setAttribute('data-lucide', 'eye-off');
      } else {
        solutionContainer.classList.add('hidden');
        if (targetId === 'solution-q1') {
          label.textContent = 'Show Solution (Q1)';
        } else if (targetId === 'solution-q2') {
          label.textContent = 'Show Solution (Q2)';
        } else {
          label.textContent = 'Show Solution';
        }
        icon.setAttribute('data-lucide', 'eye');
      }

      // Re-render updated Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  // 5. Collapse / Expand Lesson Card
  const toggleLesson = document.getElementById('toggle-lesson');
  const lessonBody = document.getElementById('lesson-body');
  const lessonChevron = document.getElementById('lesson-chevron');

  if (toggleLesson && lessonBody) {
    const savedLesson = localStorage.getItem('micro_lesson_collapsed');
    if (savedLesson === 'true') {
      lessonBody.style.display = 'none';
      toggleLesson.classList.add('collapsed');
    }

    toggleLesson.addEventListener('click', () => {
      const isCollapsed = lessonBody.style.display === 'none';
      if (isCollapsed) {
        lessonBody.style.display = '';
        toggleLesson.classList.remove('collapsed');
        localStorage.setItem('micro_lesson_collapsed', 'false');
      } else {
        lessonBody.style.display = 'none';
        toggleLesson.classList.add('collapsed');
        localStorage.setItem('micro_lesson_collapsed', 'true');
      }
    });
  }

  // 6. Cmd+K Search Focus Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-box input');
      if (searchInput) searchInput.focus();
    }
  });
});
