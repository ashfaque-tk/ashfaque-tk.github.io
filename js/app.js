/**
 * =========================================================================
 * APPLICATION EVENT HANDLERS & MODAL MANAGEMENT
 * =========================================================================
 * Manages Theme toggling, Filtering, Modal popups, Clipboard actions,
 * and Mailto generation dynamically.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.innerHTML = `
          <svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        `;
      } else {
        themeIcon.innerHTML = `
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        `;
      }
    }

    if (window.renderSimulators) {
      window.renderSimulators();
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // =========================================================================
  // 2. Project Category Filtering
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 3. Dynamic Case Study Modal
  // =========================================================================
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalTagline = document.getElementById('modalTagline');
  const modalContext = document.getElementById('modalContext');
  const modalFormulation = document.getElementById('modalFormulation');
  const modalMethodology = document.getElementById('modalMethodology');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalTechStack = document.getElementById('modalTechStack');

  function openCaseStudyModal(studyId) {
    if (typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.projects) return;
    const project = SITE_CONFIG.projects.find(p => p.id === studyId);
    if (!project || !modalBackdrop) return;

    const modalData = project.modal || {
      tagline: project.summary,
      context: project.summary,
      formulation: project.mathSnippet || 'N/A',
      methodology: ['Formulated mathematical models and implemented in Python.'],
      deliverables: ['Documented code, analysis notebooks, and interactive tools.'],
      techStack: project.tech.split(' • ')
    };

    modalTitle.textContent = project.title;
    modalBadge.textContent = project.badge;
    modalTagline.textContent = modalData.tagline || '';
    modalContext.textContent = modalData.context || '';
    modalFormulation.textContent = modalData.formulation || 'N/A';

    modalMethodology.innerHTML = (modalData.methodology || [])
      .map(item => `<li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">›</span><span>${item}</span></li>`)
      .join('');

    modalDeliverables.innerHTML = (modalData.deliverables || [])
      .map(item => `<li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span><span>${item}</span></li>`)
      .join('');

    modalTechStack.innerHTML = (modalData.techStack || [])
      .map(tech => `<span class="badge-mono">${tech}</span>`)
      .join('');

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudyModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Delegate click for dynamically rendered case study buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-case-study');
    if (btn) {
      e.preventDefault();
      const studyId = btn.getAttribute('data-study-id');
      openCaseStudyModal(studyId);
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudyModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudyModal();
      }
    });
  }

  // =========================================================================
  // 4. Client Freelance Inquiry Modal & Contact Actions
  // =========================================================================
  const inquiryModal = document.getElementById('inquiryModal');
  const inquiryCloseBtn = document.getElementById('inquiryCloseBtn');
  const inquiryForm = document.getElementById('inquiryForm');

  function openInquiryModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-inquiry-modal')) {
      e.preventDefault();
      openInquiryModal();
    }
  });

  if (inquiryCloseBtn) {
    inquiryCloseBtn.addEventListener('click', closeInquiryModal);
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        closeInquiryModal();
      }
    });
  }

  // Handle Inquiry Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName').value.trim();
      const org = document.getElementById('inqOrg').value.trim();
      const email = document.getElementById('inqEmail').value.trim();
      const service = document.getElementById('inqService').value;
      const timeline = document.getElementById('inqTimeline').value;
      const details = document.getElementById('inqDetails').value.trim();

      const recipientEmail = SITE_CONFIG?.profile?.email || 'ashfaquetk.dev@gmail.com';
      const subject = encodeURIComponent(`[Project Inquiry] ${service} - ${org || name}`);
      const body = encodeURIComponent(
        `Hi Ashfaque,\n\n` +
        `Name: ${name}\n` +
        `Organization: ${org || 'N/A'}\n` +
        `Email: ${email}\n` +
        `Area of Interest: ${service}\n` +
        `Timeline: ${timeline}\n\n` +
        `Project / Problem Description:\n${details}\n\n` +
        `Looking forward to connecting!`
      );

      const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      showToast('Opening your email client with inquiry template...');
      closeInquiryModal();
    });
  }

  // =========================================================================
  // 5. Clipboard Action & Toast Notification
  // =========================================================================
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-email-btn');
    if (btn) {
      const emailToCopy = btn.getAttribute('data-email') || SITE_CONFIG?.profile?.email || 'ashfaquetk.dev@gmail.com';
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`Copied ${emailToCopy} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${emailToCopy}`);
      });
    }
  });

  // =========================================================================
  // 6. Mobile Navigation Menu Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
    });

    mobileNavMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
      });
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudyModal();
      closeInquiryModal();
    }
  });

  // Smooth scroll offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
