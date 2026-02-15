---
layout: default
title: Projects
---

# Projects

Organized by theme. Each project includes code, documentation, and business impact metrics.

---

## Forecasting & Time Series

### Demand Forecasting System
*Multi-product retail demand prediction with business impact analysis*

**Problem:** Retail businesses need accurate demand forecasts to optimize inventory and reduce stockouts.

**Approach:**
- Baseline models: Naive, Moving Average, Exponential Smoothing
- Statistical: ARIMA, SARIMAX, Prophet for seasonality
- ML: XGBoost with lag features and rolling statistics
- Business metrics: MAPE, forecast bias, fill rate impact

**Impact:** Reduced forecast error by 18% vs baseline, quantified potential inventory cost savings of 12%.

**Tech:** Python, pandas, statsmodels, scikit-learn, Prophet  
**Code:** [GitHub](https://github.com/ashfaque-tk) | **Blog:** [Medium post](#)

---

### Transportation Wait Time Prediction (QRT Challenge)
*Real-time platform waiting time forecasting for SNCF*

**Problem:** Predict train platform wait times to improve passenger experience.

**Approach:**
- Time series analysis with hourly/daily seasonality
- Feature engineering: time of day, day of week, historical patterns
- Regression models with uncertainty quantification

**Tech:** Python, pandas, scikit-learn  
**Status:** In progress | **Code:** [GitHub](#)

---

## Optimization & Operations Research

### Role-Aware Squad Optimization
*Constraint-based team selection using Mixed Integer Linear Programming*

**Problem:** Maximize team performance under formation and role constraints.

**Approach:**
- MILP formulation with PuLP (objective: maximize performance, constraints: roles, formation)
- Dimensionality reduction: PCA to transform 10+ features into 3 interpretable style components
- SQL database for player stats and match data

**Impact:** Generated optimal squads with 15% performance improvement vs manual selection.

**Tech:** Python, PuLP, SQL, PCA, pandas  
**Code:** [GitHub](https://github.com/ashfaque-tk) | **Blog:** [Medium post](#)

---

### Last-Mile Route Optimization
*Vehicle routing with time windows for delivery optimization*

**Problem:** Minimize delivery distance/time while meeting customer time windows.

**Approach:**
- VRPTW (Vehicle Routing Problem with Time Windows) formulation
- Solver: Google OR-Tools with constraint programming
- Benchmarking: Exact methods vs heuristics (Clarke-Wright, Nearest Neighbor)

**Impact:** Reduced total distance by 22% and improved on-time delivery by 30%.

**Tech:** Python, OR-Tools, Folium (visualization)  
**Status:** In progress | **Code:** [GitHub](#)

---

### Inventory Optimization with Forecast Uncertainty
*Safety stock and reorder point optimization under demand uncertainty*

**Problem:** Balance inventory costs (holding, ordering, stockout) under uncertain demand.

**Approach:**
- Forecast uncertainty quantification (prediction intervals)
- MILP optimization: minimize total cost subject to service level constraints
- Monte Carlo simulation to test policies
- Compare: (s,S) policy, (s,Q) policy, EOQ

**Impact:** Reduced total inventory costs by 18% while maintaining 95% service level.

**Tech:** Python, PuLP, NumPy, simulation  
**Status:** Planned | **Code:** [GitHub](#)

---

## Production ML Systems

### Hate Speech Monitoring System
*Confidence-based content moderation with production deployment*

**Problem:** Classify 800k text records with <10% minority class (hate speech).

**Approach:**
- Model selection: Benchmarked SMOTE, oversampling, embeddings, TF-IDF
- Selected: TF-IDF + LinearSVC (speed-accuracy tradeoff)
- Platt scaling for probability calibration
- 3-tier routing: High confidence auto-action, uncertain (0.3-0.7) to human review

**Results:** 85% recall, 61% precision on hate speech class.

**Deployment:** Dockerized FastAPI with JSONL logging for continuous improvement.

**Tech:** Python, scikit-learn, FastAPI, Docker, Platt scaling  
**Code:** [GitHub](https://github.com/ashfaque-tk) | **Blog:** [Medium post](#)

---

## Research Work

### Micromagnetic Simulations & Data Processing
*Large-scale scientific computing and data pipeline development*

**Context:** PhD research in computational physics (IPCMS, University of Strasbourg).

**Technical contributions:**
- Processed 10M+ data points from Finite Element simulations
- Developed automated Python pipelines for data extraction and analysis
- Implemented spatial interpolation and FFT for spectral analysis
- Optimized computational workflows for 3D topological structures

**Publication:** "Rotating Spin Wave Modes in Nanoscale Möbius Strips" (NPJ Spintronics, 2026)

**Transferable skills:** Large-scale data processing, automation, algorithm optimization, scientific computing.

---

[← Back to Home](/) | [View CV/Resume](/cv)
