/**
 * Interactive Simulation Engine for Ashfaque's Portfolio
 * 1. Probabilistic Demand Forecasting & Safety Stock Simulator
 * 2. Supply Chain Optimization & Cost Frontier Simulator
 */

(function () {
  'use strict';

  // --- Helper Functions ---
  function getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  function setupCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = getDevicePixelRatio();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width: rect.width, height: rect.height };
  }

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      isDark,
      bg: isDark ? '#0b111e' : '#f8fafc',
      grid: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      text: isDark ? '#94a3b8' : '#64748b',
      textActive: isDark ? '#f8fafc' : '#0f172a',
      lineHist: isDark ? '#cbd5e1' : '#334155',
      lineForecast: '#38bdf8',
      bandOuter: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.09)',
      bandInner: isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(2, 132, 199, 0.18)',
      pointDot: '#38bdf8',
      optimalPoint: '#10b981',
      costCurve: isDark ? '#818cf8' : '#4f46e5',
      stockoutCurve: isDark ? '#f43f5e' : '#e11d48'
    };
  }

  // Standard normal quantile approximation for service level z-score
  function getZScore(serviceLevel) {
    const sl = serviceLevel / 100;
    // Rational approximation for inverse normal CDF
    const a1 = -3.969683028665376e+01, a2 = 2.209460984245205e+02, a3 = -2.759285104469687e+02;
    const a4 = 1.383577518672690e+02, a5 = -3.066479806614716e+01, a6 = 2.506628277459239e+00;
    const b1 = -5.447609879822406e+01, b2 = 1.615858368580409e+02, b3 = -1.556989798598866e+02;
    const b4 = 6.680131188771972e+01, b5 = -1.328068155288572e+01;
    const c1 = -7.784894002430293e-03, c2 = -3.223964580411365e-01, c3 = -2.400758277161838e+00;
    const c4 = -2.549732539343734e+00, c5 = 4.374664141464968e+00, c6 = 2.938163982698783e+00;
    const d1 = 7.784695709041462e-03, d2 = 3.224671290700398e-01, d3 = 2.445134137142996e+00;
    const d4 = 3.754408661907416e+00;
    const p_low = 0.02425, p_high = 1 - p_low;

    let q, r;
    if (sl < p_low) {
      q = Math.sqrt(-2 * Math.log(sl));
      return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
             ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (sl <= p_high) {
      q = sl - 0.5;
      r = q * q;
      return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
             (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - sl));
      return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
              ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
  }

  // =========================================================================
  // SIMULATOR 1: Probabilistic Demand Forecasting & Safety Stock
  // =========================================================================
  const forecastCanvas = document.getElementById('forecastCanvas');
  const sliderVolatility = document.getElementById('sliderVolatility');
  const sliderTrend = document.getElementById('sliderTrend');
  const sliderPromo = document.getElementById('sliderPromo');
  const sliderServiceLevel = document.getElementById('sliderServiceLevel');
  const sliderLeadTime = document.getElementById('sliderLeadTime');

  // Value Display Elements
  const valVolatility = document.getElementById('valVolatility');
  const valTrend = document.getElementById('valTrend');
  const valPromo = document.getElementById('valPromo');
  const valServiceLevel = document.getElementById('valServiceLevel');
  const valLeadTime = document.getElementById('valLeadTime');

  // KPI Output Badges
  const kpiExpectedDemand = document.getElementById('kpiExpectedDemand');
  const kpiSafetyStock = document.getElementById('kpiSafetyStock');
  const kpiReorderPoint = document.getElementById('kpiReorderPoint');
  const kpiServiceLevelZ = document.getElementById('kpiServiceLevelZ');

  // Static Seed Data for reproducible historical baseline
  const historicalBaseline = [
    120, 125, 118, 130, 142, 135, 128, 132, 139, 148,
    145, 138, 150, 155, 162, 158, 152, 160, 168, 175,
    170, 165, 172, 180, 192, 188, 182, 190, 198, 205
  ];

  function renderForecastSimulator() {
    if (!forecastCanvas) return;
    const { ctx, width, height } = setupCanvas(forecastCanvas);
    const colors = getThemeColors();

    const volatility = parseFloat(sliderVolatility.value);
    const trend = parseFloat(sliderTrend.value);
    const promo = parseFloat(sliderPromo.value);
    const serviceLevel = parseFloat(sliderServiceLevel.value);
    const leadTime = parseFloat(sliderLeadTime.value);

    // Update text labels
    if (valVolatility) valVolatility.textContent = `${volatility}%`;
    if (valTrend) valTrend.textContent = `${trend > 0 ? '+' : ''}${trend}%/mo`;
    if (valPromo) valPromo.textContent = `${promo > 0 ? '+' : ''}${promo}%`;
    if (valServiceLevel) valServiceLevel.textContent = `${serviceLevel}%`;
    if (valLeadTime) valLeadTime.textContent = `${leadTime} days`;

    // Compute synthetic data points
    const histLen = historicalBaseline.length;
    const forecastLen = 30;
    const totalPoints = histLen + forecastLen;

    const histData = historicalBaseline.map((base, idx) => {
      const noise = Math.sin(idx * 0.8) * (volatility * 0.6);
      return Math.max(10, Math.round(base + noise));
    });

    const lastHistVal = histData[histLen - 1];
    const forecastP50 = [];
    const forecastP90 = [];
    const forecastP10 = [];
    const forecastP95 = [];
    const forecastP05 = [];

    const zScore = Math.max(0.5, getZScore(serviceLevel));
    const dailySigma = (lastHistVal * (volatility / 100)) / Math.sqrt(30);

    let totalForecastDemand = 0;

    for (let i = 1; i <= forecastLen; i++) {
      const trendComponent = lastHistVal * (1 + (trend / 100) * (i / 30));
      const seasonality = Math.sin((i / 7) * Math.PI * 2) * (lastHistVal * 0.08);
      // Promotional uplift spike around day 12-18
      const promoMultiplier = (i >= 12 && i <= 18) ? (1 + (promo / 100)) : 1.0;
      
      const expected = (trendComponent + seasonality) * promoMultiplier;
      totalForecastDemand += expected;

      const horizonUncertainty = dailySigma * Math.sqrt(i) * 1.5;
      
      forecastP50.push(expected);
      forecastP90.push(expected + 1.28 * horizonUncertainty);
      forecastP10.push(Math.max(10, expected - 1.28 * horizonUncertainty));
      forecastP95.push(expected + 1.645 * horizonUncertainty);
      forecastP05.push(Math.max(5, expected - 1.645 * horizonUncertainty));
    }

    // Safety Stock & Reorder Point Calculations
    const avgDailyDemand = totalForecastDemand / forecastLen;
    const leadTimeSigma = dailySigma * Math.sqrt(leadTime);
    const safetyStock = Math.round(zScore * leadTimeSigma);
    const reorderPoint = Math.round((avgDailyDemand * leadTime) + safetyStock);

    if (kpiExpectedDemand) kpiExpectedDemand.textContent = `${Math.round(totalForecastDemand).toLocaleString()} units`;
    if (kpiSafetyStock) kpiSafetyStock.textContent = `${safetyStock.toLocaleString()} units`;
    if (kpiReorderPoint) kpiReorderPoint.textContent = `${reorderPoint.toLocaleString()} units`;
    if (kpiServiceLevelZ) kpiServiceLevelZ.textContent = `z = ${zScore.toFixed(2)}`;

    // Draw Chart on Canvas
    const padding = { top: 30, right: 35, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Find min and max for scaling
    const allVals = [
      ...histData,
      ...forecastP95,
      ...forecastP05
    ];
    const maxVal = Math.max(...allVals) * 1.1;
    const minVal = Math.max(0, Math.min(...allVals) * 0.85);

    function getX(idx) {
      return padding.left + (idx / (totalPoints - 1)) * chartW;
    }

    function getY(val) {
      return padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    }

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Background Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.grid;
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const yVal = minVal + (i / yTicks) * (maxVal - minVal);
      const y = getY(yVal);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = colors.text;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(yVal), padding.left - 10, y + 4);
    }

    // X-axis demarcation (Historical vs Forecast Split)
    const splitX = getX(histLen - 1);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.isDark ? '#475569' : '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(splitX, padding.top);
    ctx.lineTo(splitX, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels for zones
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'right';
    ctx.fillText('HISTORICAL (30D)', splitX - 10, padding.top + 16);
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.lineForecast;
    ctx.fillText('PROBABILISTIC FORECAST (T+30D)', splitX + 10, padding.top + 16);

    // Draw Outer Prediction Interval (P05 - P95)
    ctx.beginPath();
    ctx.moveTo(splitX, getY(lastHistVal));
    for (let i = 0; i < forecastLen; i++) {
      ctx.lineTo(getX(histLen + i), getY(forecastP95[i]));
    }
    for (let i = forecastLen - 1; i >= 0; i--) {
      ctx.lineTo(getX(histLen + i), getY(forecastP05[i]));
    }
    ctx.closePath();
    ctx.fillStyle = colors.bandOuter;
    ctx.fill();

    // Draw Inner Prediction Interval (P10 - P90)
    ctx.beginPath();
    ctx.moveTo(splitX, getY(lastHistVal));
    for (let i = 0; i < forecastLen; i++) {
      ctx.lineTo(getX(histLen + i), getY(forecastP90[i]));
    }
    for (let i = forecastLen - 1; i >= 0; i--) {
      ctx.lineTo(getX(histLen + i), getY(forecastP10[i]));
    }
    ctx.closePath();
    ctx.fillStyle = colors.bandInner;
    ctx.fill();

    // Draw Historical Actuals Line
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = colors.lineHist;
    ctx.beginPath();
    for (let i = 0; i < histLen; i++) {
      const x = getX(i);
      const y = getY(histData[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Forecast Median (P50) Line
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = colors.lineForecast;
    ctx.beginPath();
    ctx.moveTo(splitX, getY(lastHistVal));
    for (let i = 0; i < forecastLen; i++) {
      ctx.lineTo(getX(histLen + i), getY(forecastP50[i]));
    }
    ctx.stroke();

    // Draw split marker node
    ctx.beginPath();
    ctx.arc(splitX, getY(lastHistVal), 4.5, 0, Math.PI * 2);
    ctx.fillStyle = colors.lineForecast;
    ctx.fill();
    ctx.strokeStyle = colors.bg;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Promotion Marker Callout if promo > 0
    if (promo > 0) {
      const promoX = getX(histLen + 14);
      const promoY = getY(forecastP50[14]);
      ctx.beginPath();
      ctx.arc(promoX, promoY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Promo Lift (+${promo}%)`, promoX, promoY - 12);
    }

    // X-axis Bottom Labels
    ctx.fillStyle = colors.text;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Day 1', padding.left, height - padding.bottom + 20);
    ctx.textAlign = 'center';
    ctx.fillText('Day 30 (Today)', splitX, height - padding.bottom + 20);
    ctx.textAlign = 'right';
    ctx.fillText('Day 60 (Horizon)', width - padding.right, height - padding.bottom + 20);
  }

  // =========================================================================
  // SIMULATOR 2: Supply Chain Optimization & Cost Frontier
  // =========================================================================
  const optCanvas = document.getElementById('optCanvas');
  const sliderDemandRate = document.getElementById('sliderDemandRate');
  const sliderOrderCost = document.getElementById('sliderOrderCost');
  const sliderHoldingCost = document.getElementById('sliderHoldingCost');
  const sliderPenaltyCost = document.getElementById('sliderPenaltyCost');

  const valDemandRate = document.getElementById('valDemandRate');
  const valOrderCost = document.getElementById('valOrderCost');
  const valHoldingCost = document.getElementById('valHoldingCost');
  const valPenaltyCost = document.getElementById('valPenaltyCost');

  const kpiOptimalBatch = document.getElementById('kpiOptimalBatch');
  const kpiAnnualCost = document.getElementById('kpiAnnualCost');
  const kpiFillRate = document.getElementById('kpiFillRate');
  const kpiOrderCycle = document.getElementById('kpiOrderCycle');

  function renderOptimizationSimulator() {
    if (!optCanvas) return;
    const { ctx, width, height } = setupCanvas(optCanvas);
    const colors = getThemeColors();

    const D = parseFloat(sliderDemandRate.value); // Annual Demand
    const S = parseFloat(sliderOrderCost.value);  // Order Setup Cost ($/order)
    const H = parseFloat(sliderHoldingCost.value);// Annual Holding Cost ($/unit/year)
    const P = parseFloat(sliderPenaltyCost.value);// Stockout penalty ($/unit)

    if (valDemandRate) valDemandRate.textContent = `${D.toLocaleString()} units/yr`;
    if (valOrderCost) valOrderCost.textContent = `$${S} / order`;
    if (valHoldingCost) valHoldingCost.textContent = `$${H.toFixed(2)} / unit`;
    if (valPenaltyCost) valPenaltyCost.textContent = `$${P} / unit`;

    // Economic Order Quantity (EOQ with planned shortage penalty adjustment)
    // EOQ formula: Q* = sqrt((2*D*S)/H) * sqrt((P + H) / P)
    const eoqBase = Math.sqrt((2 * D * S) / H);
    const shortageFactor = Math.sqrt((P + H) / P);
    const optimalQ = Math.round(eoqBase * shortageFactor);
    
    // Optimal order cycle time in days
    const numOrdersPerYear = D / optimalQ;
    const cycleDays = Math.round(365 / numOrdersPerYear);
    
    // Minimized Total Cost
    const totalOrderingCost = (D / optimalQ) * S;
    const avgInventory = (optimalQ * P) / (2 * (P + H));
    const totalHoldingCost = avgInventory * H;
    const expectedStockoutUnits = Math.round((optimalQ * H) / (2 * (P + H)));
    const totalPenaltyCost = (D / optimalQ) * expectedStockoutUnits * P;
    const minTotalCost = Math.round(totalOrderingCost + totalHoldingCost + totalPenaltyCost);
    const optimalFillRate = ((1 - (expectedStockoutUnits / optimalQ)) * 100).toFixed(1);

    if (kpiOptimalBatch) kpiOptimalBatch.textContent = `${optimalQ.toLocaleString()} units`;
    if (kpiAnnualCost) kpiAnnualCost.textContent = `$${minTotalCost.toLocaleString()}`;
    if (kpiFillRate) kpiFillRate.textContent = `${optimalFillRate}%`;
    if (kpiOrderCycle) kpiOrderCycle.textContent = `${cycleDays} days (${numOrdersPerYear.toFixed(1)}x/yr)`;

    // Draw Cost Curves on Canvas
    const padding = { top: 30, right: 35, bottom: 45, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Generate curve points for Q ranging from 0.2*optimalQ to 2.5*optimalQ
    const qMin = Math.max(10, Math.round(optimalQ * 0.25));
    const qMax = Math.round(optimalQ * 2.5);
    const steps = 60;

    const curveData = [];
    for (let i = 0; i <= steps; i++) {
      const q = qMin + (i / steps) * (qMax - qMin);
      const cOrder = (D / q) * S;
      const cHold = ((q * P) / (2 * (P + H))) * H;
      const cPenalty = (D / q) * ((q * H) / (2 * (P + H))) * P;
      const cTotal = cOrder + cHold + cPenalty;
      curveData.push({ q, cOrder, cHold, cTotal });
    }

    const maxCost = Math.max(...curveData.map(d => d.cTotal)) * 1.08;
    const minCost = 0;

    function getX(qVal) {
      return padding.left + ((qVal - qMin) / (qMax - qMin)) * chartW;
    }

    function getY(cVal) {
      return padding.top + chartH - ((cVal - minCost) / (maxCost - minCost)) * chartH;
    }

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.grid;
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const costVal = minCost + (i / yTicks) * (maxCost - minCost);
      const y = getY(costVal);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = colors.text;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`$${Math.round(costVal).toLocaleString()}`, padding.left - 10, y + 4);
    }

    // Draw Ordering Cost Curve (Dash)
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = colors.isDark ? '#94a3b8' : '#64748b';
    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.q);
      const y = getY(pt.cOrder);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Holding Cost Curve (Dash)
    ctx.strokeStyle = colors.isDark ? '#38bdf8' : '#0284c7';
    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.q);
      const y = getY(pt.cHold);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Total Cost Curve (Bold Convex Frontier)
    ctx.lineWidth = 2.8;
    ctx.strokeStyle = colors.costCurve;
    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.q);
      const y = getY(pt.cTotal);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Optimal Operating Point Demarcation
    const optX = getX(optimalQ);
    const optY = getY(minTotalCost);

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.optimalPoint;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(optX, padding.top);
    ctx.lineTo(optX, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Optimal Point Node
    ctx.beginPath();
    ctx.arc(optX, optY, 6, 0, Math.PI * 2);
    ctx.fillStyle = colors.optimalPoint;
    ctx.fill();
    ctx.strokeStyle = colors.bg;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Callout Label on Optimal Point
    ctx.fillStyle = colors.optimalPoint;
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Optimal Q* = ${optimalQ.toLocaleString()}`, optX, optY - 14);

    // Legend
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    
    // Total Cost legend
    ctx.fillStyle = colors.costCurve;
    ctx.fillRect(padding.left + 10, padding.top + 10, 12, 3);
    ctx.fillStyle = colors.textActive;
    ctx.fillText('Total Cost Frontier', padding.left + 28, padding.top + 14);

    // Holding legend
    ctx.fillStyle = colors.isDark ? '#38bdf8' : '#0284c7';
    ctx.fillRect(padding.left + 160, padding.top + 10, 12, 3);
    ctx.fillStyle = colors.text;
    ctx.fillText('Inventory Holding', padding.left + 178, padding.top + 14);

    // Order Cost legend
    ctx.fillStyle = colors.isDark ? '#94a3b8' : '#64748b';
    ctx.fillRect(padding.left + 290, padding.top + 10, 12, 3);
    ctx.fillStyle = colors.text;
    ctx.fillText('Ordering Setup', padding.left + 308, padding.top + 14);

    // X-axis Bottom Labels
    ctx.fillStyle = colors.text;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Q = ${qMin}`, padding.left, height - padding.bottom + 22);
    ctx.textAlign = 'center';
    ctx.fillText(`Order Batch Size (Units)`, padding.left + chartW / 2, height - padding.bottom + 25);
    ctx.textAlign = 'right';
    ctx.fillText(`Q = ${qMax}`, width - padding.right, height - padding.bottom + 22);
  }

  // =========================================================================
  // Attach Event Listeners
  // =========================================================================
  const forecastSliders = [sliderVolatility, sliderTrend, sliderPromo, sliderServiceLevel, sliderLeadTime];
  forecastSliders.forEach(slider => {
    if (slider) {
      slider.addEventListener('input', renderForecastSimulator);
    }
  });

  const optSliders = [sliderDemandRate, sliderOrderCost, sliderHoldingCost, sliderPenaltyCost];
  optSliders.forEach(slider => {
    if (slider) {
      slider.addEventListener('input', renderOptimizationSimulator);
    }
  });

  // Simulator Tab Switching
  const simTabForecast = document.getElementById('simTabForecast');
  const simTabOpt = document.getElementById('simTabOpt');
  const panelForecast = document.getElementById('panelForecast');
  const panelOpt = document.getElementById('panelOpt');

  if (simTabForecast && simTabOpt && panelForecast && panelOpt) {
    simTabForecast.addEventListener('click', () => {
      simTabForecast.classList.add('active');
      simTabOpt.classList.remove('active');
      panelForecast.classList.remove('hidden');
      panelOpt.classList.add('hidden');
      setTimeout(renderForecastSimulator, 20);
    });

    simTabOpt.addEventListener('click', () => {
      simTabOpt.classList.add('active');
      simTabForecast.classList.remove('active');
      panelOpt.classList.remove('hidden');
      panelForecast.classList.add('hidden');
      setTimeout(renderOptimizationSimulator, 20);
    });
  }

  // Resize Handler with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderForecastSimulator();
      renderOptimizationSimulator();
    }, 100);
  });

  // Expose global render hooks
  window.renderSimulators = function () {
    renderForecastSimulator();
    renderOptimizationSimulator();
  };

  // Initial render when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(window.renderSimulators, 50);
  });
})();
