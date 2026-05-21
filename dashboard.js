/* js/pages/dashboard.js */

function renderDashboard() {
  return `
  <div class="g4">
    <div class="card">
      <div class="card-title">Fraud Blocked Today</div>
      <div class="metric-big text-green">$14,200</div>
      <div class="metric-up">↑ 3 attempts stopped</div>
    </div>
    <div class="card">
      <div class="card-title">Transactions Scanned</div>
      <div class="metric-big" id="dash-tx">48,291</div>
      <div class="metric-sub">Real-time AI analysis</div>
    </div>
    <div class="card">
      <div class="card-title">Account Risk Score</div>
      <div class="metric-big text-amber">62/100</div>
      <div class="metric-sub">MEDIUM · 3 open risks</div>
    </div>
    <div class="card">
      <div class="card-title">Compliance Status</div>
      <div class="metric-big text-cyan">7/10</div>
      <div class="metric-sub">FINRA pending · CCPA ✓</div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">📈 5-Year Revenue Forecast</div>
        <span style="font-size:11px;color:var(--text3);">Series A — $10M Model</span>
      </div>
      <div style="display:flex;gap:14px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);">
          <div style="width:10px;height:10px;border-radius:2px;background:rgba(0,200,240,0.7);"></div>Revenue ($M)
        </div>
        <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);">
          <div style="width:10px;height:10px;border-radius:2px;background:rgba(255,170,0,0.5);"></div>Op. Cost ($M)
        </div>
      </div>
      <div style="position:relative;height:190px;">
        <canvas id="dashRevChart" aria-label="5-year revenue projection"></canvas>
      </div>
    </div>
    <div class="card">
      <div class="section-header">
        <div class="section-title">🌡️ Threat Detection (12 Months)</div>
        <span class="inline-badge" style="background:rgba(0,229,153,0.1);border:1px solid rgba(0,229,153,0.25);color:var(--green);">AI Active</span>
      </div>
      <div style="position:relative;height:190px;">
        <canvas id="dashThreatChart" aria-label="12-month threat detection"></canvas>
      </div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">🚨 Live Security Alerts</div>
        <button class="btn btn-outline btn-sm" onclick="APP.go('alerts')">View All →</button>
      </div>
      ${DATA.alerts.slice(0,3).map(a => `
      <div class="alert-item alert-${a.type === 'critical' ? 'critical' : a.type === 'warning' ? 'warning' : 'info'}">
        <span class="alert-icon">${a.icon}</span>
        <div style="flex:1;">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
        </div>
        <div class="alert-time">${a.time}</div>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="section-header">
        <div class="section-title">⚠️ Top Risk Factors</div>
        <button class="btn btn-outline btn-sm" onclick="APP.go('risk')">Full Matrix →</button>
      </div>
      ${DATA.risks.slice(0,4).map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:12px;color:var(--text2);">${r.icon} ${r.name.split('(')[0].trim().substring(0,36)}</div>
        <span class="rb rb-${r.level.toLowerCase()}">${r.level}</span>
      </div>`).join('')}
      <button class="btn btn-outline btn-sm" style="width:100%;margin-top:10px;" onclick="APP.go('risk')">Manage All Risks →</button>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">💳 Recent Transactions</div>
        <button class="btn btn-outline btn-sm" onclick="APP.go('transactions')">Monitor →</button>
      </div>
      ${DATA.transactions.slice(0,4).map(t => `
      <div class="txn-item" onclick="APP.go('transactions')">
        <div class="txn-icon" style="background:${t.risk==='HIGH'?'rgba(255,59,92,0.15)':t.risk==='MEDIUM'?'rgba(255,170,0,0.12)':'rgba(0,229,153,0.1)'};">${t.icon}</div>
        <div style="flex:1;">
          <div class="txn-name">${t.name} ${t.flag?`<span style="font-size:10px;color:var(--red);">⚑</span>`:''}</div>
          <div class="txn-detail">${t.id} · ${t.time}</div>
        </div>
        <div>
          <div class="txn-amount" style="color:${t.risk==='HIGH'?'var(--red)':t.risk==='MEDIUM'?'var(--amber)':'var(--text)'};">$${t.amount.toLocaleString()}</div>
          <div style="text-align:right;margin-top:3px;"><span class="rb rb-${t.risk.toLowerCase()}">${t.risk}</span></div>
        </div>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="section-header">
        <div class="section-title">🛡️ Protection Summary</div>
      </div>
      ${[
        ['AI Fraud Engine',       '94.2% accuracy',   'green'],
        ['Transactions Today',    '48,291 scanned',   'cyan'],
        ['Threats Neutralised',   '3 today',          'green'],
        ['Dark Web Monitoring',   '1 leak found',     'red'],
        ['Compliance Score',      '70% — 7/10',       'amber'],
        ['Plan',                  'Protector Pro',    'cyan'],
      ].map(([l,v,c])=>`
      <div class="stat-row">
        <div class="stat-label">${l}</div>
        <div class="stat-val" style="color:var(--${c});">${v}</div>
      </div>`).join('')}
      <button class="btn btn-cyan btn-full" style="margin-top:12px;" onclick="APP.go('plans')">⬆ Upgrade to Executive Elite</button>
    </div>
  </div>

  <div class="card" style="margin-bottom:0;">
    <div class="section-title mb-8">🌐 Live Threat Feed</div>
    <div class="live-ticker">
      <span class="ticker-tag">LIVE</span>
      <span id="ticker-text">Scanning TX-48291 · No anomaly detected... Deepfake voice call blocked 2:14 PM · Wire fraud TX-9817 intercepted · Dark web scan complete · BEC pattern detected in email...</span>
    </div>
  </div>`;
}
