/**
 * =========================================================================
 * SIMULATION & VISUALIZATION ENGINE
 * =========================================================================
 * Supports both:
 * 1. Custom Data Mode (Directly rendering your M5 predictions from config.js)
 * 2. Interactive Parameter Sandbox (Sliders for what-if scenarios)
 * =========================================================================
 */

(function () {
  'use strict';

  function getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  function setupCanvas(canvas) {
    if (!canvas) return null;
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
      optimalPoint: '#10b981',
      costCurve: isDark ? '#818cf8' : '#4f46e5'
    };
  }

  // Inverse normal CDF approximation
  function getZScore(serviceLevel) {
    const sl = serviceLevel / 100;
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
  // 1. Demand Forecast & Safety Stock Renderer
  // =========================================================================
  const forecastCanvas = document.getElementById('forecastCanvas');
  const sliderVolatility = document.getElementById('sliderVolatility');
  const sliderTrend = document.getElementById('sliderTrend');
  const sliderPromo = document.getElementById('sliderPromo');
  const sliderServiceLevel = document.getElementById('sliderServiceLevel');
  const sliderLeadTime = document.getElementById('sliderLeadTime');

  const valVolatility = document.getElementById('valVolatility');
  const valTrend = document.getElementById('valTrend');
  const valPromo = document.getElementById('valPromo');
  const valServiceLevel = document.getElementById('valServiceLevel');
  const valLeadTime = document.getElementById('valLeadTime');

  const kpiExpectedDemand = document.getElementById('kpiExpectedDemand');
  const kpiSafetyStock = document.getElementById('kpiSafetyStock');
  const kpiReorderPoint = document.getElementById('kpiReorderPoint');
  const kpiServiceLevelZ = document.getElementById('kpiServiceLevelZ');

  const historicalBaseline = [
    115, 122, 118, 128, 138, 132, 126, 130, 137, 145,
    142, 135, 146, 151, 158, 154, 148, 156, 164, 171,
    166, 161, 168, 176, 188, 184, 178, 186, 194, 201
  ];

  function renderForecastChart() {
    if (!forecastCanvas) return;
    const canvasSetup = setupCanvas(forecastCanvas);
    if (!canvasSetup) return;
    const { ctx, width, height } = canvasSetup;
    const colors = getThemeColors();

    const config = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.forecastDataConfig) ? SITE_CONFIG.forecastDataConfig : null;
    const useCustom = config && config.useCustomData && config.customData;

    let histData = [];
    let forecastP10 = [];
    let forecastP50 = [];
    let forecastP90 = [];
    let leadTime = 7;
    let serviceLevel = 95;

    if (useCustom) {
      // Use Custom Data directly from config.js
      const cd = config.customData;
      histData = cd.historical || historicalBaseline;
      forecastP10 = cd.forecastP10;
      forecastP50 = cd.forecastP50;
      forecastP90 = cd.forecastP90;
      leadTime = cd.leadTimeDays || 7;
      serviceLevel = cd.serviceLevelPercent || 95;
    } else {
      // Interactive Mode with Sliders
      const volatility = sliderVolatility ? parseFloat(sliderVolatility.value) : 18;
      const trend = sliderTrend ? parseFloat(sliderTrend.value) : 8;
      const promo = sliderPromo ? parseFloat(sliderPromo.value) : 25;
      serviceLevel = sliderServiceLevel ? parseFloat(sliderServiceLevel.value) : 95;
      leadTime = sliderLeadTime ? parseFloat(sliderLeadTime.value) : 7;

      if (valVolatility) valVolatility.textContent = `${volatility}%`;
      if (valTrend) valTrend.textContent = `${trend > 0 ? '+' : ''}${trend}%/mo`;
      if (valPromo) valPromo.textContent = `${promo > 0 ? '+' : ''}${promo}%`;
      if (valServiceLevel) valServiceLevel.textContent = `${serviceLevel}%`;
      if (valLeadTime) valLeadTime.textContent = `${leadTime} days`;

      histData = historicalBaseline.map((base, idx) => {
        const noise = Math.sin(idx * 0.8) * (volatility * 0.6);
        return Math.max(10, Math.round(base + noise));
      });

      const lastVal = histData[histData.length - 1];
      const dailySigma = (lastVal * (volatility / 100)) / Math.sqrt(30);

      for (let i = 1; i <= 30; i++) {
        const trendComp = lastVal * (1 + (trend / 100) * (i / 30));
        const seasonComp = Math.sin((i / 7) * Math.PI * 2) * (lastVal * 0.08);
        const promoMult = (i >= 12 && i <= 18) ? (1 + (promo / 100)) : 1.0;
        const expected = (trendComp + seasonComp) * promoMult;
        const uncertainty = dailySigma * Math.sqrt(i) * 1.5;

        forecastP50.push(expected);
        forecastP90.push(expected + 1.28 * uncertainty);
        forecastP10.push(Math.max(10, expected - 1.28 * uncertainty));
      }
    }

    const histLen = histData.length;
    const forecastLen = forecastP50.length;
    const totalPoints = histLen + forecastLen;
    const lastHistVal = histData[histLen - 1];

    // Compute Safety Stock & Reorder Points
    const zScore = Math.max(0.5, getZScore(serviceLevel));
    const totalForecast = forecastP50.reduce((a, b) => a + b, 0);
    const avgDailyDemand = totalForecast / forecastLen;
    const dailySpreadSigma = forecastP90.reduce((acc, val, i) => acc + (val - forecastP10[i]), 0) / (forecastLen * 2.56);
    const safetyStock = Math.round(zScore * dailySpreadSigma * Math.sqrt(leadTime));
    const reorderPoint = Math.round((avgDailyDemand * leadTime) + safetyStock);

    if (kpiExpectedDemand) kpiExpectedDemand.textContent = `${Math.round(totalForecast).toLocaleString()} units`;
    if (kpiSafetyStock) kpiSafetyStock.textContent = `${safetyStock.toLocaleString()} units`;
    if (kpiReorderPoint) kpiReorderPoint.textContent = `${reorderPoint.toLocaleString()} units`;
    if (kpiServiceLevelZ) kpiServiceLevelZ.textContent = `z = ${zScore.toFixed(2)}`;

    // Draw Chart
    const padding = { top: 25, right: 30, bottom: 35, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const allVals = [...histData, ...forecastP90, ...forecastP10];
    const maxVal = Math.max(...allVals) * 1.1;
    const minVal = Math.max(0, Math.min(...allVals) * 0.85);

    function getX(idx) {
      return padding.left + (idx / (totalPoints - 1)) * chartW;
    }

    function getY(val) {
      return padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    }

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.grid;
    for (let i = 0; i <= 4; i++) {
      const yVal = minVal + (i / 4) * (maxVal - minVal);
      const y = getY(yVal);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = colors.text;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(yVal), padding.left - 10, y + 4);
    }

    // Split Line
    const splitX = getX(histLen - 1);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = colors.isDark ? '#475569' : '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(splitX, padding.top);
    ctx.lineTo(splitX, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Zone labels
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'right';
    ctx.fillText('HISTORICAL ACTUALS', splitX - 10, padding.top + 14);
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.lineForecast;
    ctx.fillText('FORECAST QUANTILE (P10 - P90)', splitX + 10, padding.top + 14);

    // Confidence Band
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

    // Historical line
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.lineHist;
    ctx.beginPath();
    for (let i = 0; i < histLen; i++) {
      const x = getX(i);
      const y = getY(histData[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Forecast P50 line
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = colors.lineForecast;
    ctx.beginPath();
    ctx.moveTo(splitX, getY(lastHistVal));
    for (let i = 0; i < forecastLen; i++) {
      ctx.lineTo(getX(histLen + i), getY(forecastP50[i]));
    }
    ctx.stroke();

    // Node Marker
    ctx.beginPath();
    ctx.arc(splitX, getY(lastHistVal), 4, 0, Math.PI * 2);
    ctx.fillStyle = colors.lineForecast;
    ctx.fill();
    ctx.strokeStyle = colors.bg;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // =========================================================================
  // 2. Cost Frontier Optimization Renderer
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

  function renderOptimizationChart() {
    if (!optCanvas) return;
    const canvasSetup = setupCanvas(optCanvas);
    if (!canvasSetup) return;
    const { ctx, width, height } = canvasSetup;
    const colors = getThemeColors();

    const D = sliderDemandRate ? parseFloat(sliderDemandRate.value) : 12000;
    const S = sliderOrderCost ? parseFloat(sliderOrderCost.value) : 120;
    const H = sliderHoldingCost ? parseFloat(sliderHoldingCost.value) : 3.50;
    const P = sliderPenaltyCost ? parseFloat(sliderPenaltyCost.value) : 15;

    if (valDemandRate) valDemandRate.textContent = `${D.toLocaleString()} units/yr`;
    if (valOrderCost) valOrderCost.textContent = `$${S} / order`;
    if (valHoldingCost) valHoldingCost.textContent = `$${H.toFixed(2)} / unit`;
    if (valPenaltyCost) valPenaltyCost.textContent = `$${P} / unit`;

    const eoqBase = Math.sqrt((2 * D * S) / H);
    const shortageFactor = Math.sqrt((P + H) / P);
    const optimalQ = Math.round(eoqBase * shortageFactor);
    const numOrders = D / optimalQ;
    const cycleDays = Math.round(365 / numOrders);
    
    const totalOrderCost = (D / optimalQ) * S;
    const totalHoldCost = ((optimalQ * P) / (2 * (P + H))) * H;
    const totalPenalty = (D / optimalQ) * ((optimalQ * H) / (2 * (P + H))) * P;
    const minCost = Math.round(totalOrderCost + totalHoldCost + totalPenalty);
    const fillRate = ((1 - ((optimalQ * H) / (2 * (P + H) * optimalQ))) * 100).toFixed(1);

    if (kpiOptimalBatch) kpiOptimalBatch.textContent = `${optimalQ.toLocaleString()} units`;
    if (kpiAnnualCost) kpiAnnualCost.textContent = `$${minCost.toLocaleString()}`;
    if (kpiFillRate) kpiFillRate.textContent = `${fillRate}%`;
    if (kpiOrderCycle) kpiOrderCycle.textContent = `${cycleDays} days`;

    const padding = { top: 25, right: 30, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const qMin = Math.max(10, Math.round(optimalQ * 0.25));
    const qMax = Math.round(optimalQ * 2.5);
    const steps = 50;

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

    function getX(qVal) {
      return padding.left + ((qVal - qMin) / (qMax - qMin)) * chartW;
    }

    function getY(cVal) {
      return padding.top + chartH - (cVal / maxCost) * chartH;
    }

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.grid;
    for (let i = 0; i <= 4; i++) {
      const costVal = (i / 4) * maxCost;
      const y = getY(costVal);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = colors.text;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`$${Math.round(costVal).toLocaleString()}`, padding.left - 10, y + 4);
    }

    // Total Cost Curve
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = colors.costCurve;
    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.q);
      const y = getY(pt.cTotal);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Optimal Point Demarcation
    const optX = getX(optimalQ);
    const optY = getY(minCost);

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = colors.optimalPoint;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(optX, padding.top);
    ctx.lineTo(optX, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(optX, optY, 5, 0, Math.PI * 2);
    ctx.fillStyle = colors.optimalPoint;
    ctx.fill();
    ctx.strokeStyle = colors.bg;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = colors.optimalPoint;
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Optimal Q* = ${optimalQ.toLocaleString()}`, optX, optY - 12);
  }

  // Attach slider event listeners
  [sliderVolatility, sliderTrend, sliderPromo, sliderServiceLevel, sliderLeadTime].forEach(s => {
    if (s) s.addEventListener('input', renderForecastChart);
  });

  [sliderDemandRate, sliderOrderCost, sliderHoldingCost, sliderPenaltyCost].forEach(s => {
    if (s) s.addEventListener('input', renderOptimizationChart);
  });

  // Simulator Tab Switcher
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
      setTimeout(renderForecastChart, 20);
    });

    simTabOpt.addEventListener('click', () => {
      simTabOpt.classList.add('active');
      simTabForecast.classList.remove('active');
      panelOpt.classList.remove('hidden');
      panelForecast.classList.add('hidden');
      setTimeout(renderOptimizationChart, 20);
    });
  }

  // Window Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderForecastChart();
      renderOptimizationChart();
    }, 100);
  });

  window.renderSimulators = function () {
    renderForecastChart();
    renderOptimizationChart();
  };

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(window.renderSimulators, 100);
  });
})();
