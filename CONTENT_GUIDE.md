# 📝 Website Content Editing Guide

Your website is now **100% data-driven**. You can edit, add, or remove any project, blog post, service, or bio detail by editing a single file: **[`js/config.js`](file:///home/ashfaque/.gemini/antigravity/scratch/portfolio-website/js/config.js)**.

You never have to touch HTML or CSS to change your content!

---

## 🚀 Quick Examples

### 1. How to Add a New Project / Blog Post
Open `js/config.js`, scroll to the `projects` section, and copy-paste this block:

```javascript
{
  id: "my-new-project-id",                 // Unique ID (lowercase, no spaces)
  title: "Your Project Title Here",
  category: "forecasting",                 // 'forecasting', 'optimization', or 'research'
  badge: "Kaggle / Project",               // Badge text shown on card
  type: "Demand Forecasting",              // Small footer type
  tech: "Python • LightGBM • Statsmodels", // Tech stack line
  summary: "A 2-sentence summary of the problem, dataset, and results achieved.",
  mathSnippet: "L_q(y, ŷ) = max(q(y - ŷ), (1 - q)(ŷ - y))", // Optional formula (or leave empty "")
  linkText: "View Code on GitHub",
  linkUrl: "https://github.com/ashfaque-tk/your-repo",
  
  // Detailed popup modal when someone clicks "View Details"
  modal: {
    tagline: "Short 1-line impact statement.",
    context: "Detailed explanation of the problem, dataset, and business challenge.",
    formulation: "Mathematical equations, loss functions, or optimization constraints.",
    methodology: [
      "Step 1: Data preprocessing and feature engineering.",
      "Step 2: Model training and hyperparameter tuning.",
      "Step 3: Evaluation using backtesting metrics."
    ],
    deliverables: [
      "Automated Python inference script.",
      "Documented Jupyter notebook with charts.",
      "Reusable evaluation functions."
    ],
    techStack: ["Python", "LightGBM", "Pandas", "Scikit-learn"]
  }
}
```

### 2. How to Update Your Bio or Social Links
In `js/config.js`, simply edit the `profile` object:

```javascript
profile: {
  name: "Ashfaque Thonikkadavan",
  role: "Demand Forecaster & Optimization Scientist",
  tagline: "Your custom bio text...",
  email: "ashfaquetk.dev@gmail.com",
  availability: "Available for Freelance Projects & Consulting",
  
  socials: {
    github: "https://github.com/ashfaque-tk",
    medium: "https://medium.com/@ashfaquetk",
    scholar: "https://scholar.google.com"
  }
}
```

### 3. How to Add or Edit a Service Offering
In `js/config.js`, edit the `services` array:

```javascript
{
  id: "custom-forecasting",
  title: "Custom Time Series Models",
  icon: "chart", // choose from: 'chart', 'inventory', 'optimization', or 'code'
  description: "What you do for clients and how it helps their business...",
  tags: ["Time Series", "LightGBM", "Feature Engineering"]
}
```

---

## ⚡ How Changes Show Up
Whenever you edit `js/config.js`, simply refresh your browser (or push to GitHub) — the website will automatically regenerate all cards, badges, filters, and modal popups!
