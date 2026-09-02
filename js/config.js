/**
 * =========================================================================
 * SITE CONFIGURATION & CONTENT DATA
 * =========================================================================
 * Edit this single file to update your bio, projects, Medium blogs, services,
 * research papers, links, and contact information!
 * 
 * No need to touch HTML or CSS when adding or editing content.
 * =========================================================================
 */

const SITE_CONFIG = {
  // -----------------------------------------------------------------------
  // 1. Personal & Profile Information
  // -----------------------------------------------------------------------
  profile: {
    name: "Ashfaque Thonikkadavan",
    titleSuffix: ", PhD",
    role: "Demand Forecaster & Optimization Scientist",
    tagline: "Applying computational physics, mathematical modeling, and machine learning to solve practical demand forecasting, inventory policy, and optimization problems.",
    location: "Strasbourg, France",
    email: "ashfaquetk.dev@gmail.com",
    availability: "Available for Freelance Projects & Consulting",
    
    // Quick highlight badges displayed in the Hero section
    badges: [
      "📍 Strasbourg, France",
      "🎓 PhD in Physics (IPCMS)",
      "📈 Time Series & Demand Forecasting",
      "⚡ Mathematical Optimization (SciPy / PuLP)",
      "✍️ Technical Writer on Medium"
    ],

    // Social & Academic Profile URLs
    socials: {
      github: "https://github.com/ashfaque-tk",
      medium: "https://medium.com/@ashfaquetk",
      scholar: "https://scholar.google.com",
      email: "mailto:ashfaquetk.dev@gmail.com"
    }
  },

  // -----------------------------------------------------------------------
  // 2. Freelance & Consulting Services
  // -----------------------------------------------------------------------
  services: [
    {
      id: "forecasting",
      title: "Demand Forecasting & Time Series Models",
      icon: "chart", // 'chart', 'inventory', 'optimization', 'code'
      description: "Developing custom statistical and ML forecasting pipelines that capture seasonal patterns, calendar shifts, and provide prediction intervals (P10/P50/P90) rather than naive point forecasts.",
      tags: ["Time Series", "Quantile Loss", "LightGBM", "Feature Engineering"]
    },
    {
      id: "inventory",
      title: "Inventory Policy & Safety Stock Modeling",
      icon: "inventory",
      description: "Calibrating safety stock equations and (s, S) reorder policies based on empirical demand and lead-time volatility, helping you quantify stockout risk and holding cost trade-offs.",
      tags: ["Safety Stock", "Reorder Points", "Lead-Time Uncertainty", "(s, S) Policies"]
    },
    {
      id: "optimization",
      title: "Mathematical Optimization & Operations Research",
      icon: "optimization",
      description: "Translating business constraints into clean mathematical optimization models (linear programming, integer programming, parameter tuning) using Python, SciPy, and PuLP.",
      tags: ["Linear Programming", "PuLP / SciPy", "Constraint Modeling", "Cost Frontiers"]
    },
    {
      id: "ml-nlp",
      title: "Applied Machine Learning & NLP Pipelines",
      icon: "code",
      description: "Building reliable data processing, feature extraction, text classification, and predictive modeling pipelines in Python, with special attention to imbalanced datasets and metric selection.",
      tags: ["Python / Scikit-learn", "NLP", "Imbalanced Learning", "Evaluation Metrics"]
    }
  ],

  // -----------------------------------------------------------------------
  // 3. Projects, Articles & Selected Works
  // -----------------------------------------------------------------------
  // Categories: 'forecasting', 'optimization', 'research'
  projects: [
    {
      id: "tfidf-vs-embeddings",
      title: "Why TF-IDF Still Beats Embeddings on Imbalanced Text",
      category: "research",
      badge: "Medium Article",
      type: "Data Science & NLP",
      tech: "Python • Scikit-learn",
      summary: "An empirical evaluation comparing sparse lexical representations with dense sentence embeddings under heavy class imbalance, highlighting sample efficiency and inference latency.",
      mathSnippet: "TF-IDF(t, d, D) = TF(t, d) × log((1 + |D|) / (1 + |{d ∈ D : t ∈ d}|)) + 1",
      linkText: "Read Article & Code",
      linkUrl: "https://medium.com/@ashfaquetk",
      
      // Modal Details
      modal: {
        tagline: "An empirical evaluation comparing sparse lexical representations with dense transformer embeddings under heavy class imbalance.",
        context: "Published technical study exploring the performance, training overhead, and inference latency trade-offs between TF-IDF + linear models versus pretrained sentence embeddings on skewed datasets.",
        formulation: "TF-IDF(t, d, D) = TF(t, d) * log((1 + |D|) / (1 + |{d in D : t in d}|)) + 1\nEvaluated alongside cosine similarity and linear classifier hyperplanes for minority classes.",
        methodology: [
          "Benchmarked TF-IDF + Linear SVM/Logistic Regression against transformer embeddings across varying degrees of class imbalance.",
          "Analyzed why sparse, high-dimensional n-gram representations often retain high-signal discriminative words that dense embeddings blur in low-sample regimes.",
          "Evaluated F1-score, Precision-Recall AUC, and compute latency for real-time inference requirements."
        ],
        deliverables: [
          "Full empirical study published on Medium.",
          "Open-source Jupyter notebooks with reproducible evaluation pipelines.",
          "Practical decision framework for choosing between lightweight baselines and heavy embeddings."
        ],
        techStack: ["Python", "Scikit-learn", "Sentence Transformers", "Pandas", "Matplotlib", "Jupyter"]
      }
    },
    {
      id: "imbalanced-sentiment",
      title: "Sentiment Analysis on Imbalanced Datasets",
      category: "research",
      badge: "Medium Series",
      type: "Machine Learning Guide",
      tech: "Python • Imbalanced-Learn",
      summary: "A multi-part guide covering practical techniques for skewed datasets: minority oversampling (SMOTE), class-weighted loss, threshold moving, and data augmentation.",
      mathSnippet: "Cost-Sensitive Loss: L = - Σ w_y log(P(y|x)) where w_c ∝ 1 / N_c",
      linkText: "Read Series on Medium",
      linkUrl: "https://medium.com/@ashfaquetk",
      
      modal: {
        tagline: "A comprehensive multi-part guide on handling class imbalance, threshold tuning, and data augmentation in text classification.",
        context: "Authored a multi-part series addressing the real-world friction of classification models failing to detect critical minority-class instances.",
        formulation: "Cost-Sensitive Loss: L = - sum(w_{y_i} * log(P(y_i | x_i))) where w_c proportional to 1 / N_c",
        methodology: [
          "Explored baseline challenges of naive classification with skewed sentiment distributions.",
          "Implemented and compared downsampling, SMOTE, class-weight calibration, and text augmentation techniques.",
          "Demonstrated effective threshold-moving strategies on validation curves to maximize minority class recall without destroying precision."
        ],
        deliverables: [
          "Multi-part tutorial series published on Medium.",
          "Clean, documented GitHub repository with complete experimental code.",
          "Reusable evaluation helper functions for imbalanced metrics (PR-AUC, Balanced Accuracy)."
        ],
        techStack: ["Python", "Scikit-learn", "NLP", "Imbalanced-Learn", "NumPy"]
      }
    },
    {
      id: "spintronics-fem",
      title: "Finite-Element Modal Methods for Spin-Wave Dynamics",
      category: "research",
      badge: "PhD Research (IPCMS)",
      type: "Computational Physics",
      tech: "C++ • Python • FEA",
      summary: "Doctoral research at IPCMS: developing numerical eigenvalue solvers to model spin-wave dynamics and geometric phase effects in curved magnetic nanostructures.",
      mathSnippet: "∂m/∂t = -γ (m × H_eff) + α (m × ∂m/∂t)",
      linkText: "View on Google Scholar",
      linkUrl: "https://scholar.google.com",
      
      modal: {
        tagline: "Computational modeling and numerical eigenvalue solvers for spin-wave dynamics in topologically complex geometries (npj Spintronics).",
        context: "Doctoral research at IPCMS (Université de Strasbourg) investigating magnetic excitations and geometric curvature effects in nanoscale Möbius strips and curved films.",
        formulation: "dm/dt = -gamma * (m x H_eff) + alpha * (m x dm/dt)\nLandau-Lifshitz-Gilbert (LLG) dynamics formulated over 3D finite-element meshes.",
        methodology: [
          "Developed finite-element frequency-domain modal methods to directly compute eigenfrequencies and spatial profiles of magnetic modes.",
          "Modeled geometric phase shifts and boundary effects resulting from non-trivial topology (Möbius geometry).",
          "Compared frequency-domain modal predictions with full time-domain micromagnetic simulations for validation."
        ],
        deliverables: [
          "Peer-reviewed journal publication in npj Spintronics and preprints on arXiv.",
          "High-performance numerical simulation code and mesh generation pipelines.",
          "Doctoral dissertation defended at Université de Strasbourg (IPCMS)."
        ],
        techStack: ["C++", "Python", "Finite Element Analysis (FEA)", "NumPy/SciPy", "Numerical PDEs"]
      }
    },
    {
      id: "m5-demand-forecast",
      title: "Probabilistic Demand Forecasting on Walmart M5 Data",
      category: "forecasting",
      badge: "Time Series Project",
      type: "Demand Forecasting",
      tech: "Python • LightGBM • Statsmodels",
      summary: "End-to-end forecasting pipeline generating P10/P50/P90 quantile predictions with seasonal lags, calendar event shifts, and dynamic safety stock calibration.",
      mathSnippet: "L_q(y, ŷ) = max(q(y - ŷ), (1 - q)(ŷ - y)) for q ∈ {0.1, 0.5, 0.9}",
      linkText: "View Formulation & Code",
      linkUrl: "#",
      
      modal: {
        tagline: "Probabilistic forecasting models generating prediction intervals (P10/P50/P90) on retail sales data.",
        context: "Automated pipeline trained on historical sales to provide probabilistic demand bounds rather than vulnerable single-point averages.",
        formulation: "Quantile Loss: L_q(y, y_hat) = max(q * (y - y_hat), (1 - q) * (y_hat - y))\nSafety Stock: SS = z_SL * sqrt(L * sigma_d^2 + d_bar^2 * sigma_L^2)",
        methodology: [
          "Engineered temporal feature pipelines: calendar lags (7, 14, 28 days), rolling mean/std, holiday indicators, and SNAP benefit flags.",
          "Trained LightGBM Quantile Regressors for P10, P50, and P90 demand bounds.",
          "Derived dynamic safety stock and Reorder Points (ROP) directly from forecast quantile spread."
        ],
        deliverables: [
          "Modular Python forecasting scripts and pipeline templates.",
          "Backtesting framework using rolling-origin cross-validation.",
          "Interactive simulation dashboard illustrating confidence bounds."
        ],
        techStack: ["Python", "LightGBM", "Statsmodels", "Scikit-learn", "Pandas", "Matplotlib"]
      }
    },
    {
      id: "inventory-cost-opt",
      title: "Stochastic Inventory Policy & Cost Frontier Modeling",
      category: "optimization",
      badge: "Operations Research",
      type: "Inventory Optimization",
      tech: "Python • SciPy • PuLP",
      summary: "Analyzing stochastic (s, S) replenishment policies, holding cost trade-offs, and safety stock sizing under both demand and lead-time variance.",
      mathSnippet: "SS = z_SL × √(L̄ σ_D² + D̄² σ_L²) | ROP = D̄ L̄ + SS",
      linkText: "View Model Details",
      linkUrl: "#",
      
      modal: {
        tagline: "Mathematical modeling of (s, S) replenishment policies and safety stock sizing under demand and lead-time variance.",
        context: "Operations research model analyzing the cost trade-offs between inventory holding expenses, ordering setup costs, and stockout risk.",
        formulation: "SS = z_SL * sqrt(L_bar * sigma_D^2 + D_bar^2 * sigma_L^2)\nROP = D_bar * L_bar + SS\nQ* = sqrt((2 * D * S) / H) * sqrt((P + H) / P)",
        methodology: [
          "Formulated inventory policy equations incorporating both demand volatility and supplier lead-time uncertainty.",
          "Constructed Pareto cost frontiers illustrating the nonlinear holding cost penalty of moving from 90% to 99% service levels.",
          "Simulated replenishment scenarios across historical distributions to stress-test policy stability."
        ],
        deliverables: [
          "Python simulation scripts for inventory policy parameter tuning.",
          "Interactive web-based cost curve calculator.",
          "Clear documentation on formula derivation and parameter sensitivity."
        ],
        techStack: ["Python", "SciPy", "PuLP", "NumPy", "Matplotlib"]
      }
    }
  ],

  // -----------------------------------------------------------------------
  // 4. Academic Research & Publications
  // -----------------------------------------------------------------------
  publications: {
    academic: [
      {
        badge: "Journal Article • Spintronics",
        title: "Finite-Element Modal Methods for Spin-Wave Dynamics in Curved Magnetic Nanostructures",
        authors: "A. Thonikkadavan, et al.",
        venue: "npj Spintronics / arXiv",
        description: "Research on frequency-domain numerical methods for modeling spin-wave dynamics in curved 3D geometries and Möbius strips.",
        linkUrl: "https://scholar.google.com",
        linkText: "View on Google Scholar ↗"
      },
      {
        badge: "PhD Dissertation • IPCMS",
        title: "Doctoral Research in Condensed Matter Physics",
        authors: "Ashfaque Thonikkadavan (Supervised by Dr. Riccardo Hertel)",
        venue: "Institut de Physique et Chimie des Matériaux de Strasbourg (IPCMS), Université de Strasbourg",
        description: "Numerical modeling, finite element simulation, and magnetization dynamics in topologically non-trivial nanostructures.",
        linkUrl: "https://www.ipcms.fr",
        linkText: "IPCMS Strasbourg"
      }
    ],
    articles: [
      {
        badge: "NLP & Embeddings",
        title: "Why TF-IDF Still Beats Embeddings on Imbalanced Text",
        description: "An empirical comparison of TF-IDF versus dense sentence embeddings for sentiment classification on imbalanced datasets.",
        linkUrl: "https://medium.com/@ashfaquetk",
        linkText: "Read on Medium ↗"
      },
      {
        badge: "Machine Learning Series",
        title: "Sentiment Analysis on Imbalanced Datasets: A Practical Guide",
        description: "Discussing sampling techniques, class-weighted loss, threshold adjustments, and data augmentation for skewed distributions.",
        linkUrl: "https://medium.com/@ashfaquetk",
        linkText: "Read on Medium ↗"
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 5. "How We Work" Collaboration Steps
  // -----------------------------------------------------------------------
  workSteps: [
    {
      num: "01",
      title: "Problem & Data Scoping",
      description: "Understanding your data, business objectives, operational constraints, and defining appropriate evaluation metrics."
    },
    {
      num: "02",
      title: "Mathematical Modeling",
      description: "Formulating the model, engineering features, and writing clean, reproducible Python scripts."
    },
    {
      num: "03",
      title: "Validation & Tuning",
      description: "Backtesting models against historical data and baseline benchmarks to verify robustness and interpretability."
    },
    {
      num: "04",
      title: "Delivery & Handover",
      description: "Providing documented code, reproducible notebooks, and clear walkthroughs for you and your team."
    }
  ]
};
