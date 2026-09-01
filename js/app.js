/**
 * Ashfaque Thonikkadavan Portfolio - Main Application Logic
 * Grounded in actual research, technical publications, and core capabilities.
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
  // 2. Real Works, Blogs & Research Data
  // =========================================================================
  const caseStudiesData = {
    'tfidf-vs-embeddings': {
      title: 'Why TF-IDF Still Beats Embeddings on Imbalanced Text Classification',
      category: 'Data Science & NLP',
      badge: 'Medium Article & Benchmarks',
      tagline: 'An empirical evaluation comparing sparse lexical representations with dense transformer embeddings under heavy class imbalance.',
      clientContext: 'Published technical study exploring the performance, training overhead, and inference latency trade-offs between TF-IDF + linear models versus pretrained sentence embeddings on skewed datasets.',
      formulation: `\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\log\\left(\\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|}\\right) + 1
Evaluated alongside cosine similarity and linear classifier hyperplanes for minority classes.`,
      methodology: [
        'Benchmarked TF-IDF + Linear SVM/Logistic Regression against transformer embeddings across varying degrees of class imbalance.',
        'Analyzed why sparse, high-dimensional n-gram representations often retain high-signal discriminative words that dense embeddings blur in low-sample regimes.',
        'Evaluated F1-score, Precision-Recall AUC, and compute latency for real-time inference requirements.'
      ],
      deliverables: [
        'Full empirical study published on Medium.',
        'Open-source Jupyter notebooks with reproducible evaluation pipelines.',
        'Practical decision framework for choosing between lightweight baselines and heavy embeddings.'
      ],
      techStack: ['Python', 'Scikit-learn', 'Sentence Transformers', 'Pandas', 'Matplotlib', 'Jupyter']
    },
    'imbalanced-sentiment': {
      title: 'Sentiment Analysis on Imbalanced Datasets: Strategies & Augmentation',
      category: 'Data Science & NLP',
      badge: 'Medium Series',
      tagline: 'A comprehensive multi-part guide on handling class imbalance, threshold tuning, and data augmentation in text classification.',
      clientContext: 'Authored a multi-part series addressing the real-world friction of classification models failing to detect critical minority-class instances.',
      formulation: `\\text{Cost-Sensitive Loss: } \\mathcal{L} = - \\sum_{i=1}^N w_{y_i} \\log(P(y_i | x_i)) \\quad \\text{where } w_c \\propto \\frac{1}{N_c}`,
      methodology: [
        'Explored baseline challenges of naive classification with skewed sentiment distributions.',
        'Implemented and compared downsampling, SMOTE, class-weight calibration, and text augmentation techniques.',
        'Demonstrated effective threshold-moving strategies on validation curves to maximize minority class recall without destroying precision.'
      ],
      deliverables: [
        'Multi-part tutorial series published on Medium.',
        'Clean, documented GitHub repository with complete experimental code.',
        'Reusable evaluation helper functions for imbalanced metrics (PR-AUC, Balanced Accuracy).'
      ],
      techStack: ['Python', 'Scikit-learn', 'NLP', 'Imbalanced-Learn', 'NumPy']
    },
    'spintronics-fem': {
      title: 'Finite-Element Modal Methods for Spin-Wave Dynamics in Curved Nanostructures',
      category: 'Scientific Research',
      badge: 'PhD Research (IPCMS Strasbourg)',
      tagline: 'Computational modeling and numerical eigenvalue solvers for spin-wave dynamics in topologically complex geometries (npj Spintronics).',
      clientContext: 'Doctoral research at IPCMS (Université de Strasbourg) investigating magnetic excitations and geometric curvature effects in nanoscale Möbius strips and curved films.',
      formulation: `\\frac{\\partial \\mathbf{m}}{\\partial t} = -\\gamma \\mathbf{m} \\times \\mathbf{H}_{\\text{eff}} + \\alpha \\mathbf{m} \\times \\frac{\\partial \\mathbf{m}}{\\partial t}
Landau-Lifshitz-Gilbert (LLG) dynamics formulated over 3D finite-element meshes.`,
      methodology: [
        'Developed finite-element frequency-domain modal methods to directly compute eigenfrequencies and spatial profiles of magnetic modes.',
        'Modeled geometric phase shifts and boundary effects resulting from non-trivial topology (Möbius geometry).',
        'Compared frequency-domain modal predictions with full time-domain micromagnetic simulations for validation.'
      ],
      deliverables: [
        'Peer-reviewed journal publication in npj Spintronics and preprints on arXiv.',
        'High-performance numerical simulation code and mesh generation pipelines.',
        'Doctoral dissertation defended at Université de Strasbourg (IPCMS).'
      ],
      techStack: ['C++', 'Python', 'Finite Element Analysis (FEA)', 'NumPy/SciPy', 'Numerical PDEs']
    },
    'demand-forecasting-model': {
      title: 'Probabilistic Time-Series Forecasting & Uncertainty Quantification',
      category: 'Forecasting',
      badge: 'Forecasting & Time Series',
      tagline: 'Probabilistic forecasting models generating prediction intervals (P10/P50/P90) for non-stationary demand signals.',
      clientContext: 'Forecasting workflow applying statistical and machine learning models to demand time-series with seasonality, calendar features, and uncertainty bounds.',
      formulation: `\\mathcal{L}_{q}(y, \\hat{y}) = \\max\\left(q(y - \\hat{y}), (1 - q)(\\hat{y} - y)\\right)
Quantile loss optimization across target percentiles q \\in \\{0.1, 0.5, 0.9\\}.`,
      methodology: [
        'Engineered temporal feature pipelines: calendar lags, rolling window aggregations, holiday indicators, and seasonal decomposition.',
        'Trained gradient boosted trees (LightGBM) with pinball loss and compared against statistical baselines (Exponential Smoothing, ARIMA).',
        'Computed confidence intervals to inform downstream safety stock sizing.'
      ],
      deliverables: [
        'Modular Python forecasting scripts and pipeline templates.',
        'Backtesting framework using rolling-origin cross-validation.',
        'Interactive simulation dashboard illustrating confidence bounds.'
      ],
      techStack: ['Python', 'LightGBM', 'Statsmodels', 'Scikit-learn', 'Pandas', 'Matplotlib']
    },
    'inventory-optimization': {
      title: 'Stochastic Inventory Policy & Cost Frontier Modeling',
      category: 'Optimization',
      badge: 'Operations Research',
      tagline: 'Mathematical modeling of (s, S) replenishment policies and safety stock sizing under demand and lead-time variance.',
      clientContext: 'Operations research model analyzing the cost trade-offs between inventory holding expenses, ordering setup costs, and stockout risk.',
      formulation: `\\text{SS} = z_{\\text{SL}} \\cdot \\sqrt{\\bar{L} \\sigma_D^2 + \\bar{D}^2 \\sigma_L^2} \\quad \\Big| \\quad \\text{ROP} = \\bar{D} \\cdot \\bar{L} + \\text{SS}`,
      methodology: [
        'Formulated inventory policy equations incorporating both demand volatility and supplier lead-time uncertainty.',
        'Constructed Pareto cost frontiers illustrating the nonlinear holding cost penalty of moving from 90% to 99% service levels.',
        'Simulated replenishment scenarios across historical distributions to stress-test policy stability.'
      ],
      deliverables: [
        'Python simulation scripts for inventory policy parameter tuning.',
        'Interactive web-based cost curve calculator.',
        'Clear documentation on formula derivation and parameter sensitivity.'
      ],
      techStack: ['Python', 'SciPy', 'PuLP', 'NumPy', 'Matplotlib']
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

      const subject = encodeURIComponent(`[Freelance / Consulting Inquiry] ${service} - ${org || name}`);
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

      const mailtoUrl = `mailto:ashfaquetk.dev@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      showToast('Opening your email client with inquiry template...');
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

    mobileNavMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
      });
    });
  }

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
