/**
 * =========================================================================
 * DYNAMIC UI RENDERER
 * =========================================================================
 * Reads data from SITE_CONFIG (js/config.js) and dynamically populates
 * all sections of the portfolio website automatically.
 * =========================================================================
 */

(function () {
  'use strict';

  function renderProfile() {
    const p = SITE_CONFIG.profile;
    if (!p) return;

    // Badges Container in Hero
    const heroBadgesContainer = document.getElementById('heroBadges');
    if (heroBadgesContainer && p.badges) {
      heroBadgesContainer.innerHTML = p.badges
        .map(b => `<span class="badge badge-outline">${b}</span>`)
        .join('');
    }
  }

  function getServiceIconSvg(type) {
    switch (type) {
      case 'chart':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>`;
      case 'inventory':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>`;
      case 'optimization':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>`;
      default:
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`;
    }
  }

  function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container || !SITE_CONFIG.services) return;

    container.innerHTML = SITE_CONFIG.services.map(s => `
      <div class="card card-hover p-7 space-y-4">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-400">
          ${getServiceIconSvg(s.icon)}
        </div>
        <h3 class="text-base font-bold" style="color: var(--text-primary);">${s.title}</h3>
        <p class="text-sm leading-relaxed" style="color: var(--text-muted);">${s.description}</p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${s.tags.map(t => `<span class="badge-mono">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container || !SITE_CONFIG.projects) return;

    container.innerHTML = SITE_CONFIG.projects.map(item => `
      <div class="card card-hover p-6 flex flex-col justify-between project-card" data-category="${item.category}">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="badge ${item.badge.includes('Medium') ? 'badge-emerald' : 'badge-outline'}">${item.badge}</span>
            <span class="font-mono text-xs" style="color: var(--text-faint);">${item.tech}</span>
          </div>
          <h3 class="text-lg font-bold" style="color: var(--text-primary);">
            ${item.title}
          </h3>
          <p class="text-sm leading-relaxed" style="color: var(--text-secondary);">
            ${item.summary}
          </p>
          ${item.mathSnippet ? `
            <div class="p-3 rounded-lg font-mono text-xs overflow-x-auto" style="background-color: var(--bg-canvas); border: 1px solid var(--border-subtle); color: var(--text-secondary);">
              ${item.mathSnippet}
            </div>
          ` : ''}
        </div>

        <div class="pt-6 border-t mt-6 flex items-center justify-between" style="border-color: var(--border-subtle);">
          <span class="text-xs" style="color: var(--text-muted);">${item.type}</span>
          <button type="button" class="open-case-study text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1" data-study-id="${item.id}">
            <span>View Details & Notes</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderPublications() {
    const academicContainer = document.getElementById('academicPubsContainer');
    const articlesContainer = document.getElementById('articlesContainer');

    if (academicContainer && SITE_CONFIG.publications && SITE_CONFIG.publications.academic) {
      academicContainer.innerHTML = SITE_CONFIG.publications.academic.map(pub => `
        <div class="card p-5 space-y-3">
          <span class="badge-mono text-[11px]">${pub.badge}</span>
          <h4 class="font-bold text-sm" style="color: var(--text-primary);">${pub.title}</h4>
          <p class="text-xs leading-relaxed" style="color: var(--text-muted);">${pub.authors ? `${pub.authors} • ` : ''}${pub.description}</p>
          <div class="pt-2 flex items-center gap-3 text-xs">
            <a href="${pub.linkUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline flex items-center gap-1 font-medium">
              <span>${pub.linkText}</span>
            </a>
          </div>
        </div>
      `).join('');
    }

    if (articlesContainer && SITE_CONFIG.publications && SITE_CONFIG.publications.articles) {
      articlesContainer.innerHTML = SITE_CONFIG.publications.articles.map(art => `
        <a href="${art.linkUrl}" target="_blank" rel="noopener noreferrer" class="card card-hover p-5 block space-y-2 group">
          <div class="flex items-center justify-between">
            <span class="badge-mono text-[11px]">${art.badge}</span>
            <span class="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">${art.linkText}</span>
          </div>
          <h4 class="font-bold text-sm group-hover:text-cyan-400 transition-colors" style="color: var(--text-primary);">
            ${art.title}
          </h4>
          <p class="text-xs leading-relaxed" style="color: var(--text-muted);">
            ${art.description}
          </p>
        </a>
      `).join('');
    }
  }

  function renderWorkSteps() {
    const container = document.getElementById('workStepsContainer');
    if (!container || !SITE_CONFIG.workSteps) return;

    const colors = ['text-cyan-500/20', 'text-indigo-500/20', 'text-emerald-500/20', 'text-amber-500/20'];

    container.innerHTML = SITE_CONFIG.workSteps.map((step, idx) => `
      <div class="p-6 rounded-xl border relative" style="background-color: var(--bg-surface); border-color: var(--border-subtle);">
        <div class="text-3xl font-mono font-extrabold ${colors[idx % colors.length]} mb-3">${step.num}</div>
        <h3 class="text-base font-bold mb-2" style="color: var(--text-primary);">${step.title}</h3>
        <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">${step.description}</p>
      </div>
    `).join('');
  }

  // Initialize Rendering on load
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof SITE_CONFIG === 'undefined') {
      console.error('SITE_CONFIG not found. Please ensure js/config.js is loaded.');
      return;
    }
    renderProfile();
    renderServices();
    renderProjects();
    renderPublications();
    renderWorkSteps();
  });
})();
