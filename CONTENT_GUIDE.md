# 📝 Website Content & M5 Data Guide

Your portfolio website is **100% data-driven**. You can edit everything by opening **[`js/config.js`](file:///home/ashfaque/.gemini/antigravity/scratch/portfolio-website/js/config.js)**.

---

## 📊 How to Plug in Your Real M5 Dataset Numbers

In `js/config.js`, find the `forecastDataConfig` section:

```javascript
forecastDataConfig: {
  useCustomData: true, // 👈 CHANGE TO TRUE when you are ready to show your M5 data!
  customData: {
    skuName: "FOODS_3_090_CA_1 (Walmart M5)",
    leadTimeDays: 7,
    serviceLevelPercent: 95,

    // Paste your 30-day historical actuals array:
    historical: [105, 112, 108, 120, 132, 125, ...],

    // Paste your LightGBM quantile predictions:
    forecastP10: [170, 172, 171, 174, ...],
    forecastP50: [196, 198, 197, 201, ...],
    forecastP90: [222, 225, 224, 229, ...]
  }
}
```

- When `useCustomData: true`, the website will **directly graph your real model outputs** and calculate dynamic safety stock and reorder points from your actual numbers.
- When `useCustomData: false`, it allows visitors to play with the interactive sliders.

---

## 📂 Layout Flow of Your Portfolio

The website now follows the standard layout used by top quantitative scientists and industry consultants:

1. **Executive Bio & Background**: PhD credentials, focus on Demand Forecasting, Mathematical Optimization, and Applied ML.
2. **Core Services / Capabilities**: Clear cards for Forecasting, Inventory Policies, Mathematical Programming, and ML.
3. **Selected Works & Case Studies**: Filterable project cards (M5 Forecaster, TF-IDF vs Embeddings, Sentiment Analysis, Spintronics FEM) with mathematical formulas and popup modals.
4. **Research & Publications**: Peer-reviewed academic papers & Medium articles.
5. **Interactive Demonstration Sandbox**: Clean modular section for forecasting & inventory cost curve visualization.
6. **Collaboration Process**: 4 clear steps showing how you work with clients.
7. **Contact / Hire Me CTA**: One-click email copying and direct project inquiry modal.
