/**
 * Ashfaque Thonikkadavan Portfolio - Main Application Logic
 * Manages Theme toggling, Case study filters, Modals, Clipboard actions, and Navigation.
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
        // Moon to Sun icon
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

    // Re-render simulator canvas with new palette
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
  // 2. Case Studies Data & Interactive Modal
  // =========================================================================
  const caseStudiesData = {
    'retail-hierarchical': {
      title: 'Multi-Echelon Hierarchical Demand Forecasting',
      category: 'Demand Forecasting',
      badge: 'Time Series & ML',
      tagline: 'Coherent probabilistic forecast reconciliation across 10,000+ SKUs and nationwide distribution centers.',
      clientContext: 'An enterprise omni-channel retail distribution network faced high forecast variance across store-level SKUs and aggregate regional distribution centers.',
      formulation: `Hierarchical Reconciliation: \\hat{y}_t = S (S^T W^{-1} S)^{-1} S^T W^{-1} \\tilde{y}_t
Where S is the structural aggregation matrix and W is the covariance matrix of base forecast errors.`,
      methodology: [
        'Built a bottom-up and top-down MinT (Minimum Trace) reconciliation pipeline combining LightGBM, CatBoost, and DeepAR temporal models.',
        'Engineered promotional uplift features incorporating calendar holidays, lead-lag promotional effects, and price elasticities.',
        'Quantified uncertainty with asymmetric pinball loss functions to generate probabilistic quantiles (P10, P50, P90).'
      ],
      deliverables: [
        'Automated Python/PyTorch batch forecasting pipeline scheduled via Airflow.',
        'Interactive Streamlit executive dashboard for exception handling and forecast override tracking.',
        'Production REST API containerized with Docker.'
      ],
      techStack: ['Python', 'PyTorch Forecasting', 'LightGBM', 'Scikit-learn', 'PostgreSQL', 'FastAPI']
    },
    'inventory-milp': {
      title: 'Stochastic Inventory Optimization & Multi-Facility Reordering',
      category: 'Optimization (OR/MILP)',
      badge: 'Mixed-Integer Programming',
      tagline: 'Dynamic (s, S) policy parameterization with mixed-integer linear programming under non-stationary demand.',
      clientContext: 'A precision component supplier with volatile lead times and high customer penalties needed to eliminate recurring stockouts without ballooning warehouse holding costs.',
      formulation: `\\min \\sum_{t=1}^T \\sum_{i \\in I} \\left( h_i I_{i,t}^+ + p_i I_{i,t}^- + K_i Y_{i,t} + c_i X_{i,t} \\right)
\\text{s.t.} \\quad I_{i,t} = I_{i,t-1} + X_{i,t - L_i} - D_{i,t}, \\quad X_{i,t} \\le M Y_{i,t}, \\quad Y_{i,t} \\in \\{0, 1\\}`,
      methodology: [
        'Formulated a Mixed-Integer Linear Program (MILP) taking into account supplier minimum order quantities (MOQ), volume tier discounts, and lead time variance.',
        'Solved multi-period stochastic lot-sizing problems using Branch-and-Cut algorithms in Gurobi and open-source CBC / HiGHS solvers.',
        'Implemented Monte Carlo stress-testing across 500 supply disruption scenarios.'
      ],
      deliverables: [
        'Mathematical formulation document and reproducible PuLP/Pyomo optimization models.',
        'Automated replenishment recommendation engine feeding daily orders to ERP.',
        'Scenario simulation toolkit for testing supplier lead time shocks.'
      ],
      techStack: ['Python', 'Gurobi', 'PuLP / HiGHS', 'Pyomo', 'Pandas', 'Monte Carlo Simulation']
    },
    'spintronics-simulation': {
      title: 'Physics-Informed Numerical Simulation & Magnonic Mode Modeling',
      category: 'Research & ML',
      badge: 'PhD Research / IPCMS',
      tagline: 'Finite-element numerical methods & eigenfrequency predictive modeling in curved magnetic nanostructures.',
      clientContext: 'Academic & Industrial physics research at IPCMS (Strasbourg) investigating spin-wave dynamics in topologically complex geometries (Möbius nanostrips).',
      formulation: `\\frac{\\partial \\mathbf{m}}{\\partial t} = -\\gamma \\mathbf{m} \\times \\mathbf{H}_{\\text{eff}} + \\alpha \\mathbf{m} \\times \\frac{\\partial \\mathbf{m}}{\\partial t}
Landau-Lifshitz-Gilbert (LLG) Equation discretized over unstructured tetrahedral meshes.`,
      methodology: [
        'Developed custom finite-element frequency-domain modal solvers that accelerate resonance mode predictions compared to brute-force time-domain integration.',
        'Implemented mesh generation algorithms and numerical solvers for boundary-value partial differential equations (PDEs).',
        'Authored peer-reviewed research publications in top international journals (npj Spintronics, ACS).'
      ],
      deliverables: [
        'Scientific publications in peer-reviewed physics journals.',
        'High-performance C++/Python numerical simulation codebase.',
        'Open reproducible datasets and analysis scripts.'
      ],
      techStack: ['C++', 'Python', 'NumPy/SciPy', 'Finite Element Analysis', 'LLG Solvers']
    },
    'nlp-imbalanced': {
      title: 'Machine Learning on Highly Imbalanced Text Datasets',
      category: 'Applied ML',
      badge: 'Data Science & NLP',
      tagline: 'Advanced text classification, embedding comparisons, and synthetic sampling strategies for skewed datasets.',
      clientContext: 'Published technical articles and open-source benchmarks on solving severe class imbalance in real-world classification pipelines.',
      formulation: `\\mathcal{L}_{\\text{Focal}} = -\\alpha_t (1 - p_t)^\\gamma \\log(p_t)
Focal loss and cost-sensitive weighting applied to sparse feature representations.`,
      methodology: [
        'Systematically benchmarked classical TF-IDF + Support Vector Machines (SVM) against dense transformer embeddings under heavy 95:5 class skew.',
        'Evaluated synthetic minority over-sampling (SMOTE) and contextual text augmentation.',
        'Published practical, practitioner-focused technical guides on Medium.'
      ],
      deliverables: [
        'Medium technical series with open-source GitHub code repositories.',
        'Benchmarking scripts and diagnostic evaluation toolkits.'
      ],
      techStack: ['Python', 'Scikit-learn', 'HuggingFace', 'PyTorch', 'NLP', 'Jupyter']
    }
  };

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Trigger Handlers
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
    const data = caseStudiesData[studyId];
    if (!data || !modalBackdrop) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalTagline.textContent = data.tagline;
    modalContext.textContent = data.clientContext;
    modalFormulation.textContent = data.formulation;

    modalMethodology.innerHTML = data.methodology
      .map(item => `<li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">›</span><span>${item}</span></li>`)
      .join('');

    modalDeliverables.innerHTML = data.deliverables
      .map(item => `<li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span><span>${item}</span></li>`)
      .join('');

    modalTechStack.innerHTML = data.techStack
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

  document.querySelectorAll('.open-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyId = btn.getAttribute('data-study-id');
      openCaseStudyModal(studyId);
    });
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

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudyModal();
      closeInquiryModal();
    }
  });

  // =========================================================================
  // 3. Client Freelance Inquiry Modal & Contact Actions
  // =========================================================================
  const inquiryModal = document.getElementById('inquiryModal');
  const openInquiryBtns = document.querySelectorAll('.open-inquiry-modal');
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

  openInquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openInquiryModal();
    });
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

  // Handle Inquiry Form Submission -> Pre-populated Mailto
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName').value.trim();
      const org = document.getElementById('inqOrg').value.trim();
      const email = document.getElementById('inqEmail').value.trim();
      const service = document.getElementById('inqService').value;
      const timeline = document.getElementById('inqTimeline').value;
      const details = document.getElementById('inqDetails').value.trim();

      const subject = encodeURIComponent(`[Consulting Inquiry] ${service} - ${org || name}`);
      const body = encodeURIComponent(
        `Hi Ashfaque,\n\n` +
        `Name: ${name}\n` +
        `Organization: ${org || 'N/A'}\n` +
        `Email: ${email}\n` +
        `Project Area: ${service}\n` +
        `Expected Timeline: ${timeline}\n\n` +
        `Project Overview / Problem Description:\n${details}\n\n` +
        `Looking forward to hearing from you!`
      );

      // Primary email
      const mailtoUrl = `mailto:ashfaquetk.dev@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      showToast('Opening your email client with pre-filled inquiry...');
      closeInquiryModal();
    });
  }

  // =========================================================================
  // 4. Clipboard Action & Toast Notification
  // =========================================================================
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
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

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const emailToCopy = btn.getAttribute('data-email') || 'ashfaquetk.dev@gmail.com';
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`Copied ${emailToCopy} to clipboard!`);
      }).catch(() => {
        // Fallback
        showToast(`Email: ${emailToCopy}`);
      });
    });
  });

  // =========================================================================
  // 5. Mobile Navigation Menu Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
    });

    // Close mobile nav when clicking a link
    mobileNavMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
      });
    });
  }

  // Smooth scroll offset adjustment for fixed navbar
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
