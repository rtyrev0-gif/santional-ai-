/* js/app.js — Main application controller */

const PAGE_TITLES = {
  dashboard:    'Security Dashboard',
  transactions: 'Transaction Monitor',
  fraud:        'AI Fraud Analyzer',
  darkweb:      'Dark Web Monitor',
  alerts:       'Alert Center',
  risk:         'Risk Analysis & Mitigation',
  compliance:   'Compliance Dashboard',
  recovery:     'Scam Recovery Center',
  analytics:    'Analytics & Reports',
  chat:         'AI Financial Advisor',
  admin:        'Admin Control Panel',
  settings:     'Security Settings',
  plans:        'Upgrade Plan',
};

const PAGE_RENDERERS = {
  dashboard:    renderDashboard,
  transactions: renderTransactions,
  fraud:        renderFraud,
  darkweb:      renderDarkWeb,
  alerts:       renderAlerts,
  risk:         renderRisk,
  compliance:   renderCompliance,
  recovery:     renderRecovery,
  analytics:    renderAnalytics,
  chat:         renderChat,
  admin:        renderAdmin,
  settings:     renderSettings,
  plans:        renderPlans,
};

const APP = {
  currentPage: null,

  go(page) {
    if (!PAGE_RENDERERS[page]) { console.warn('Unknown page:', page); return; }

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Update title
    document.getElementById('page-title').textContent = PAGE_TITLES[page] || page;

    // Render content
    const content = document.getElementById('content');
    content.innerHTML = PAGE_RENDERERS[page]();
    content.scrollTop = 0;

    this.currentPage = page;

    // Post-render hooks
    setTimeout(() => {
      if (page === 'dashboard')  initDashboardCharts();
      if (page === 'analytics')  initAnalyticsCharts();
      if (page === 'risk')       initRiskChart();
    }, 100);
  },
};

// ── NAV CLICK HANDLERS ────────────────────────────────────────────────────────
document.getElementById('nav').addEventListener('click', e => {
  const item = e.target.closest('.nav-item');
  if (item && item.dataset.page) APP.go(item.dataset.page);
});

// Alert pill click
document.getElementById('alert-pill').addEventListener('click', () => APP.go('alerts'));

// ── LIVE TX COUNTER ───────────────────────────────────────────────────────────
let txNum = 48291;
setInterval(() => {
  txNum++;
  const el = document.getElementById('tx-count');
  if (el) el.textContent = txNum.toLocaleString();
  const d = document.getElementById('dash-tx');
  if (d) d.textContent = txNum.toLocaleString();
}, 2000);

// ── TICKER ROTATION ───────────────────────────────────────────────────────────
const TICKER_MSGS = [
  'Scanning TX-48291 · No anomaly · $14.99 Netflix subscription...',
  'AI Voice Clone detected on incoming call from +1-800-555-fake · BLOCKED...',
  'Wire alert TX-9817: $8,500 to UAE account flagged and stopped...',
  'Dark web scan complete · 1 credential exposure found...',
  'BEC email intercepted targeting CFO account · Quarantined...',
  'Pig Butchering pattern detected in TX-48295 · User notified...',
  'Zelle transfer $2,400 flagged · Unknown recipient · Under review...',
  'All systems nominal · ' + txNum.toLocaleString() + ' transactions scanned today...',
  'SEC FINRA compliance check passed for new advisory feature...',
  'IRS impersonation call blocked · Deepfake voice score: 97%...',
];
let tickerIdx = 0;

setInterval(() => {
  const el = document.getElementById('ticker-text');
  if (!el) return;
  el.style.transition = 'opacity 0.3s';
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = TICKER_MSGS[tickerIdx % TICKER_MSGS.length];
    el.style.opacity = '1';
    tickerIdx++;
  }, 300);
}, 4500);

// ── BOOT ──────────────────────────────────────────────────────────────────────
APP.go('dashboard');
