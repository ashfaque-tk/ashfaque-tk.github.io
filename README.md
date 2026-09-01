# Ashfaque Thonikkadavan, PhD — Portfolio Website

A clean, aesthetic, and quantitative portfolio website tailored for freelance consulting in **Demand Forecasting**, **Mathematical Optimization (OR/MILP)**, and **Computational Science**.

---

## 🌟 Key Features

1. **Design & Aesthetic**:
   - Modern, editorial quantitative aesthetic with Dark and Light mode options.
   - Clean typography using *Plus Jakarta Sans*, *Newsreader*, and *JetBrains Mono*.
   - Responsive across mobile, tablet, and widescreen desktops.

2. **Interactive Decision Engines (Simulators)**:
   - **Probabilistic Demand Forecaster & Safety Stock Engine**: Interactive time series with P10/P50/P90 prediction bands, promotional shock parameters, lead-time variance, and dynamic safety stock calculation.
   - **Supply Chain Optimization & Cost Frontier Simulator**: Visualizes the convex inventory holding cost vs order setup and shortage penalty curves with real-time optimal batch size ($Q^*$) calculations.

3. **Client-Focused Conversion Architecture**:
   - Structured consulting service offerings (Demand Forecasting, Multi-Echelon Inventory, Mixed-Integer Linear Programming, Decision APIs).
   - Filterable Selected Works & Case Studies with interactive modal drawers showing mathematical formulations and business deliverables.
   - 4-step consulting workflow (*Discovery → Mathematical Modeling → Backtesting → Deployment*).
   - Academic publications & Medium technical articles showcase.
   - Inquiry modal and one-click email copying.

4. **Zero-Build & Fast**:
   - Built with modern HTML5, CSS, and pure vanilla JavaScript.
   - Zero compilation or build step required.
   - 100% compatible with GitHub Pages.

---

## 🚀 How to Test Locally

You can test the website immediately on your computer using Python's built-in HTTP server:

```bash
# Navigate to the project directory
cd /home/ashfaque/.gemini/antigravity/scratch/portfolio-website

# Start local server
python3 -m http.server 8000
```

Then open your browser at: `http://localhost:8000`

---

## 📦 How to Deploy to Your GitHub Pages (`ashfaque-tk.github.io`)

Because this project is built as a static web application without heavy dependencies, deploying it to your existing GitHub Pages repository is as simple as copying the files:

### Step 1: Clone or Open your `ashfaque-tk.github.io` repository
```bash
git clone https://github.com/ashfaque-tk/ashfaque-tk.github.io.git my-site
cd my-site
```

### Step 2: Copy the portfolio files into the repository root
```bash
# Copy all files from the scratch project directory
cp -r /home/ashfaque/.gemini/antigravity/scratch/portfolio-website/* .
```

### Step 3: Commit and Push to GitHub
```bash
git add .
git commit -m "Deploy modern aesthetic portfolio website with interactive simulators"
git push origin main
```

Within 1–2 minutes, GitHub Pages will automatically serve your new site at **`https://ashfaque-tk.github.io/`**.

---

## 📁 File Structure

```
portfolio-website/
├── index.html              # Main semantic HTML structure & sections
├── css/
│   └── styles.css          # Custom styling, dark/light themes, typography, modals
├── js/
│   ├── app.js              # Theme manager, project filters, modals, clipboard
│   └── simulators.js       # Pure vanilla Canvas simulation engines (Forecasting & Optimization)
└── README.md               # Documentation & deployment guide
```
