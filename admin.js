/* js/pages/admin.js */

function renderAdmin() {
  return `
  <div class="g4">
    <div class="card">
      <div class="card-title">Total Headcount</div>
      <div class="metric-big">32</div>
      <div class="metric-sub">Target Year 5: 200+</div>
    </div>
    <div class="card">
      <div class="card-title">Open Positions</div>
      <div class="metric-big text-amber">14</div>
      <div class="metric-sub">Hiring active now</div>
    </div>
    <div class="card">
      <div class="card-title">Monthly Burn Rate</div>
      <div class="metric-big text-red">$420K</div>
      <div class="metric-sub">Runway: 11 months</div>
    </div>
    <div class="card">
      <div class="card-title">Funding Secured</div>
      <div class="metric-big text-green">$500K</div>
      <div class="metric-sub">Seed round closed ✓</div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">👥 Team Directory</div>
        <button class="btn btn-cyan btn-sm" onclick="alert('📧 Hiring blast sent to LinkedIn, Indeed, Glassdoor for 14 open roles.')">+ Post 14 Roles</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Role</th><th>Location</th><th>Dept</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${DATA.staff.map(s => `
            <tr>
              <td style="color:var(--text);font-weight:600;">${s.name}</td>
              <td>${s.role}</td>
              <td>${s.loc}</td>
              <td style="color:var(--cyan);">${s.dept}</td>
              <td><span class="rb ${s.status==='Active'?'rb-low':'rb-medium'}">${s.status}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div style="margin-top:14px;">
        <div class="section-title mb-10">🏢 Hiring Plan (Year 1–3)</div>
        ${[
          ['Engineering (Palo Alto)',  '25 AI/ML Engineers',  'cyan'],
          ['Advisory (New York)',      '50 US Fraud Analysts','amber'],
          ['Support (Global)',         '100+ CS Agents',      'purple'],
          ['Governance (New York)',    '5 Compliance Officers','green'],
        ].map(([t,v,c]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);">
          <div style="font-size:12px;color:var(--text2);">${t}</div>
          <div style="font-size:12px;font-weight:600;color:var(--${c});">${v}</div>
        </div>`).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="card">
        <div class="section-title mb-12">💰 $10M Series A — Funding Allocation</div>
        ${DATA.fundingAlloc.map(f => `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
            <span style="font-size:12px;color:var(--text2);">${f.label}</span>
            <span style="font-size:12px;font-weight:700;font-family:var(--mono);color:${f.color};">${f.amount}</span>
          </div>
          <div class="prog-bar">
            <div class="prog-fill" style="width:${f.pct}%;background:${f.color};"></div>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px;">${f.pct}% of total</div>
        </div>`).join('')}
        <button class="btn btn-cyan btn-full btn-sm" style="margin-top:4px;" onclick="APP.go('plans')">Request Investor Deck →</button>
      </div>

      <div class="card">
        <div class="section-title mb-10">🖥️ Live System Status</div>
        ${[
          ['ML Fraud Engine',          '99.8% uptime',    'green'],
          ['AWS Financial Cloud',      'Operational',     'green'],
          ['Anthropic AI API',         'Connected',       'green'],
          ['Dark Web Scanner',         'Active (24/7)',   'green'],
          ['ZK Encryption Layer',      'Active',          'green'],
          ['SMTP / Alert System',      'Operational',     'green'],
          ['KYC / Jumio Integration',  'Active',          'green'],
          ['Compliance Monitor',       'In Setup',        'amber'],
        ].map(([s,v,c]) => `
        <div class="stat-row">
          <div class="stat-label">${s}</div>
          <div class="stat-val" style="color:var(--${c});font-size:11px;">
            ${c==='green'?'✓':c==='amber'?'⚠':'✗'} ${v}
          </div>
        </div>`).join('')}
      </div>

      <div class="card">
        <div class="section-title mb-10">📊 Revenue Milestone Tracker</div>
        ${[
          ['Seed Round Closed',    '$500K',  true ],
          ['First 1,000 Users',   'Done',   true ],
          ['MRR $100K',           'Done',   true ],
          ['MRR $200K',           'Q3 2026',false],
          ['Series A Close',      '$10M',   false],
          ['10,000 Users',        'Q4 2026',false],
          ['MRR $1M',             'Year 2', false],
        ].map(([m,v,done]) => `
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(26,45,85,0.4);">
          <div style="font-size:12px;color:${done?'var(--text2)':'var(--text3)'};">${done?'✅':'○'} ${m}</div>
          <div style="font-size:12px;font-weight:600;color:${done?'var(--green)':'var(--text3)'};">${v}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}
