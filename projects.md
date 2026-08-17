---
layout: default
title: Projects
---

# Projects

Organized by theme. Each project includes code and documentation.

---

## Forecasting & Time Series

### Demand Forecasting & Inventory Risk (Walmart M5 casestudy)
*End-to-end retail demand forecasting with inventory cost simulation*

**Business questions:** How can large-scale retailers accurately forecast item-level demand without data leakage—and handle the cold-start problem for newly launching SKUs—while translating probabilistic quantiles (Q10/Q90) into optimal safety stock buffers?

**Approach:**
- Recursive LightGBM forecasts evaluated with rolling walk-forward backtesting
- Tested training window length vs. forecast horizon; ~2 years of history balances recency against sample size, with degradation showing up at longer recursive horizons
- Extended point forecasts to quantile (probabilistic) forecasts to size safety stock and simulate holding/stockout costs

**Status:** Deployed as a FastAPI inference service for reproducible training and evaluation.

**Tech:** Python, LightGBM, pandas, FastAPI
**Code:** [GitHub](https://github.com/ashfaque-tk/retail-demand-forecast/tree/master) <!-- replace with repo link once public -->

---

<!-- ### Transportation Wait Time Prediction (QRT Challenge)
*Real-time platform waiting time forecasting for SNCF*

**Problem:** Predict train platform wait times to improve passenger experience.

**Approach:**
- Time series analysis with hourly/daily seasonality
- Feature engineering: time of day, day of week, historical patterns
- Regression models with uncertainty quantification

**Status:** In progress

**Tech:** Python, pandas, scikit-learn
**Code:** [GitHub](#) -->

---

## Optimization & Operations Research

### Role-Aware Squad Optimization
*Constrained squad selection using Mixed Integer Linear Programming*

**Problem:** Select an optimal 11-player squad under formation constraints, positional role hierarchies, budget caps, and age-range bounds.

**Approach:**
- MILP formulation solved to optimality with PuLP
- PCA reduces 10+ correlated performance metrics into 3 interpretable style components (attacking influence, midfield control, wide play), used as role-weighted objective coefficients
- Player data in a relational SQL database; modular Python classes separate variable construction, constraints, and solution extraction
- Extended with locking constraints (pre-selected players), style-dependent formation rules, and multi-role assignment

**Status:** Complete

**Tech:** Python, SQL, PuLP, scikit-learn (PCA)
**Code:** [GitHub](https://github.com/ashfaque-tk)

---
<!-- 
### Last-Mile Route Optimization
*Vehicle routing with time windows for delivery optimization*

**Problem:** Minimize delivery distance/time while meeting customer time windows.

**Approach:**
- VRPTW (Vehicle Routing Problem with Time Windows) formulation
- Solver: Google OR-Tools with constraint programming
- Benchmarking planned: exact methods vs heuristics (Clarke-Wright, Nearest Neighbor)

**Status:** In progress

**Tech:** Python, OR-Tools, Folium (visualization)
**Code:** [GitHub](#) -->

---
<!-- 
### Inventory Optimization with Forecast Uncertainty
*Safety stock and reorder point optimization under demand uncertainty*

**Problem:** Balance inventory costs (holding, ordering, stockout) under uncertain demand.

**Approach (planned):**
- Forecast uncertainty quantification (prediction intervals)
- MILP optimization: minimize total cost subject to service level constraints
- Monte Carlo simulation to test policies
- Compare (s,S) policy, (s,Q) policy, EOQ

**Status:** Planned

**Tech:** Python, PuLP, NumPy, simulation
**Code:** [GitHub](#)

--- -->

## Production ML Systems

### Hate Speech Monitoring System
*Confidence-based content moderation with production deployment*

**Problem:** Classify 800k text records with under 10% minority class (hate speech).

**Approach:**
- Benchmarked SMOTE, oversampling, TF-IDF+LinearSVC, and embeddings; selected TF-IDF+LinearSVC for the best speed-accuracy tradeoff
- Platt scaling for probability calibration
- 3-tier confidence routing: high-confidence auto-decisions, uncertain cases to human review, low-confidence routed for retraining

**Results:** 85% recall, 61% precision on hate speech class. <!-- confirm these are your actual measured numbers before publishing -->

**Deployment:** Dockerized FastAPI service with structured JSONL logging for drift detection and failure mode analysis.

**Tech:** Python, scikit-learn, FastAPI, Docker, Platt scaling
**Code:** [GitHub](https://github.com/ashfaque-tk) | **Blog:** [Medium post](https://medium.com/@cmtwskb) <!-- link the actual post once you confirm title/URL -->

---

## Research Work

### Micromagnetic Simulations & Data Processing
*Large-scale scientific computing and data pipeline development*

**Context:** PhD research in computational physics (IPCMS, University of Strasbourg).

**Technical contributions:**
- Processed large-scale data from Finite Element simulations
- Developed automated Python pipelines for data extraction and analysis
- Implemented spatial interpolation and FFT for spectral analysis
- Optimized computational workflows for 3D topological structures (Möbius-strip geometries)

**Publication:** "Rotating Spin Wave Modes in Nanoscale Möbius Strips" (npj Spintronics, 2026)

**Transferable skills:** Large-scale data processing, automation, algorithm optimization, scientific computing.

---

[← Back to Home](/) | [View CV/Resume](/cv)
