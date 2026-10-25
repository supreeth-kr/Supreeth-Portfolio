/* ==========================================================================
   SUPREETH K R — MAIN INTERACTIVE APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC TYPED ROLE ROTATION
  const typedEl = document.querySelector('.dynamic-typed-role');
  if (typedEl) {
    const roles = [
      'Software Developer',
      'Creative Designer',
      'UI/UX Enthusiast',
      'QA Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1600; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 350; // Pause before new word
      }

      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  }

  // 2. SCROLL PROGRESS INDICATOR & HEADER BLUR STATE
  const progressBar = document.querySelector('.scroll-progress-bar');
  const header = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playUiSound('pop');
    });
  }

  // 3. SOUND SYNTHESIS ENGINE (Web Audio API)
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiSound(type = 'click') {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.09); // A5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const soundIcon = soundToggleBtn.querySelector('i') || soundToggleBtn;
      if (soundEnabled) {
        soundToggleBtn.innerHTML = '<span>🔊</span> Sound: ON';
        showToast('UI Audio effects enabled', 'info');
        playUiSound('success');
      } else {
        soundToggleBtn.innerHTML = '<span>🔇</span> Sound: OFF';
        showToast('UI Audio muted', 'info');
      }
    });
  }

  // 4. THEME COLOR MANAGEMENT & SANDBOX SYNC
  const root = document.documentElement;
  const currentTheme = localStorage.getItem('supreeth_theme') || 'violet';
  applyTheme(currentTheme);

  function applyTheme(themeName) {
    if (themeName === 'violet') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', themeName);
    }
    localStorage.setItem('supreeth_theme', themeName);

    // Update active state in theme buttons
    document.querySelectorAll('.theme-option, .sandbox-color-btn').forEach(btn => {
      if (btn.getAttribute('data-theme-choice') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Theme Dropdown Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeDropdownPopup = document.getElementById('themeDropdownPopup');
  if (themeToggleBtn && themeDropdownPopup) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdownPopup.classList.toggle('open');
      playUiSound('click');
    });

    document.addEventListener('click', () => {
      themeDropdownPopup.classList.remove('open');
    });
  }

  // Theme Option Click Handlers
  document.querySelectorAll('.theme-option, .sandbox-color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const chosenTheme = e.currentTarget.getAttribute('data-theme-choice');
      if (chosenTheme) {
        applyTheme(chosenTheme);
        showToast(`Theme switched to ${chosenTheme.toUpperCase()}`, 'info');
        playUiSound('pop');
      }
    });
  });

  // 5. 3D CARD TILT INTERACTION
  const avatarCard = document.querySelector('.avatar-3d-wrapper');
  if (avatarCard) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      avatarCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 7. PROJECT FILTERING TABS
  const projectFilterTabs = document.querySelectorAll('.project-tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playUiSound('click');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'grid';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. SKILLS TAB FILTERING
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');
  const skillFilterTabs = document.querySelectorAll('.skill-filter-btn');

  if (skillFilterTabs.length > 0) {
    skillFilterTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        skillFilterTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playUiSound('click');

        const filter = btn.getAttribute('data-skill-filter');

        skillCategoryCards.forEach(card => {
          const type = card.getAttribute('data-skill-type');
          if (filter === 'all' || type === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 9. COPY TO CLIPBOARD BUTTONS
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text') || 'ssupreeth989@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        playUiSound('success');
      }).catch(() => {
        showToast('Unable to copy automatically.', 'info');
      });
    });
  });

  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');

  // 11. ATS RESUME MODAL HANDLER
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-modal');
  const printResumeBtn = document.getElementById('printResumeBtn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
      playUiSound('click');
    });
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      const resumeContent = document.getElementById('printableResumeArea');
      if (!resumeContent) return;

      const printWindow = window.open('', '', 'width=900,height=800');
      printWindow.document.write(`
        <html>
          <head>
            <title>SUPREETH_K_R_RESUME</title>
            <style>
              body { font-family: 'Arial', sans-serif; padding: 30px; color: #111; line-height: 1.5; }
              h1 { font-size: 22px; text-align: center; margin: 0 0 4px; }
              .contact { text-align: center; font-size: 12px; color: #444; border-bottom: 2px solid #222; padding-bottom: 8px; margin-bottom: 16px; }
              h2 { font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px; }
              p, li { font-size: 12px; color: #222; }
              ul { padding-left: 18px; margin: 4px 0 10px; }
              .row { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; }
              .sub { font-style: italic; color: #555; font-size: 11px; margin-bottom: 4px; }
            </style>
          </head>
          <body>
            ${resumeContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 350);
    });
  }

  // Resume Modal Tabs Switcher
  const resumeTabs = document.querySelectorAll('.resume-tab-btn');
  const atsPane = document.getElementById('atsResumeTabPane');
  const pdfPane = document.getElementById('pdfResumeTabPane');

  resumeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute('data-tab');
      resumeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (targetTab === 'ats-view') {
        if (atsPane) atsPane.classList.add('active');
        if (pdfPane) pdfPane.classList.remove('active');
      } else {
        if (pdfPane) pdfPane.classList.add('active');
        if (atsPane) atsPane.classList.remove('active');
      }
      playUiSound('click');
    });
  });

  // Resume Download Button Toast
  const downloadResumePdfBtn = document.getElementById('downloadResumePdfBtn');
  if (downloadResumePdfBtn) {
    downloadResumePdfBtn.addEventListener('click', () => {
      playUiSound('success');
      showToast('Downloading Supreeth_K_R_Resume.pdf...', 'success');
    });
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => closeModal(m));
      playUiSound('pop');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
        playUiSound('pop');
      }
    });
  });

  // 12. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      playUiSound('click');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 13. CLIPBOARD COPY & CONTACT ACTIONS
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy-text');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`, 'success');
          playUiSound('success');
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied: ${text}`, 'success');
          playUiSound('success');
        });
      }
    });
  });

  // 14. TOAST NOTIFICATION UTILITY
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';

    let icon = '✨';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Initial welcome greeting
  setTimeout(() => {
    showToast('Welcome to Supreeth K R\'s Portfolio!', 'info');
  }, 800);
});
