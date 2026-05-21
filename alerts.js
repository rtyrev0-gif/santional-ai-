/* js/pages/alerts.js */
function renderAlerts() {
  return `
  <div class="g3" style="margin-bottom:14px;">
    <div class="card" style="border-color:rgba(255,59,92,0.3);">
      <div class="card-title">Critical</div>
      <div class="metric-big text-red">${DATA.alerts.filter(a=>a.type==='critical').length}</div>
    </div>
    <div class="card" style="border-color:rgba(255,170,0,0.3);">
      <div class="card-title">Warnings</div>
      <div class="metric-big text-amber">${DATA.alerts.filter(a=>a.type==='warning').length}</div>
    </div>
    <div class="card">
      <div class="card-title">Informational</div>
      <div class="metric-big">${DATA.alerts.filter(a=>a.type==='info').length}</div>
    </div>
  </div>
  <div class="card">
    <div class="section-header">
      <div class="section-title">🚨 All Security Alerts</div>
      <button class="btn btn-outline btn-sm" onclick="document.querySelectorAll('.alert-item').forEach(e=>e.style.opacity='0.4')">Mark All Read</button>
    </div>
    ${DATA.alerts.map((a,i) => `
    <div class="alert-item alert-${a.type==='critical'?'critical':a.type==='warning'?'warning':'info'} fade-in" style="animation-delay:${i*0.05}s;">
      <span class="alert-icon">${a.icon}</span>
      <div style="flex:1;">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.desc}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
        <div class="alert-time">${a.time}</div>
        ${a.type==='critical' ? `<button class="btn btn-red btn-sm" onclick="this.textContent='✓ Resolved';this.style.background='var(--green)';this.style.color='#000';this.disabled=true;">Resolve</button>` : ''}
      </div>
    </div>`).join('')}
  </div>`;
}

/* js/pages/risk.js */
function renderRisk() {
  const riskColor = { CRITICAL:'var(--red)', HIGH:'var(--amber)', MEDIUM:'var(--purple)', LOW:'var(--green)' };
  return `
  <div class="g4">
    ${['CRITICAL','HIGH','MEDIUM','LOW'].map(l => `
    <div class="card" style="border-color:${riskColor[l]}33;">
      <div class="card-title">${l}</div>
      <div class="metric-big" style="color:${riskColor[l]};">${DATA.risks.filter(r=>r.level===l).length}</div>
    </div>`).join('')}
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">📊 Risk Matrix — ${DATA.risks.length} Identified Risks</div>
        <button class="btn btn-cyan btn-sm" onclick="alert('📄 Risk Matrix PDF downloaded:\\nsentinel_risk_matrix_2026.pdf')">Export PDF</button>
      </div>
      ${DATA.risks.map((r,i) => `
      <div class="risk-row fade-in" style="animation-delay:${i*0.04}s;">
        <div class="risk-icon-lg">${r.icon}</div>
        <div class="risk-info">
          <div class="risk-name">${r.name}</div>
          <div class="risk-mit">🛡️ ${r.mit}</div>
          <div class="prog-bar" style="margin-top:6px;">
            <div class="prog-fill" style="width:${r.score}%;background:${riskColor[r.level]};"></div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;margin-left:10px;">
          <span class="rb rb-${r.level.toLowerCase()}">${r.level}</span>
          <span style="font-size:11px;color:var(--text3);font-family:var(--mono);">${r.score}/100</span>
        </div>
      </div>`).join('')}
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="card">
        <div class="section-title mb-10">📉 Risk Score Trend (6 Months)</div>
        <div style="position:relative;height:170px;">
          <canvas id="riskTrendChart" aria-label="Risk trend chart"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="section-title mb-12">🤖 AI Risk Recommendations</div>
        <div id="risk-ai-out" style="font-size:12px;color:var(--text2);line-height:1.7;min-height:80px;">
          <div style="text-align:center;padding:16px;color:var(--text3);">
            <div style="font-size:24px;margin-bottom:6px;">🤖</div>
            Click below for AI mitigation advice.
          </div>
        </div>
        <button class="btn btn-cyan btn-full" style="margin-top:10px;" id="risk-ai-btn" onclick="getRiskAdvice()">🤖 Get AI Recommendations</button>
      </div>
    </div>
  </div>`;
}

async function getRiskAdvice() {
  const btn = document.getElementById('risk-ai-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Analyzing...';
  document.getElementById('risk-ai-out').innerHTML = `<div style="display:flex;gap:5px;padding:10px;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:500,
        system:'You are a risk management expert for fintech startups. Give 5 specific, actionable bullet-point recommendations. Be direct and concise.',
        messages:[{role:'user',content:'Top 3 risks for Sentinel Finance AI (US fintech, Series A, protecting seniors from fraud): 1) CCPA/GLBA compliance 2) Cyber attacks 3) AI false positives. Give 5 specific mitigation steps. Max 180 words.'}]
      })
    });
    const d = await res.json();
    document.getElementById('risk-ai-out').innerHTML = `<div style="font-size:12px;line-height:1.8;white-space:pre-wrap;">${d.content[0].text}</div>`;
  } catch(e) {
    document.getElementById('risk-ai-out').innerHTML = `<div style="font-size:12px;line-height:1.8;">• Hire CCPA/GLBA attorney before Series A close<br>• Implement SOC2 Type II audit with Deloitte<br>• Launch bug bounty on HackerOne ($50K pool)<br>• Build human review queue for AI flags >$1,000<br>• Purchase $5M cyber liability policy (Chubb/AIG)</div>`;
  }
  btn.disabled = false;
  btn.textContent = '🔄 Refresh Recommendations';
}

/* js/pages/compliance.js */
function renderCompliance() {
  const phases = [
    { n:1, label:'Phase 1 — SEC/FINRA Compliance & Beta',    status:'active',  items:['File Form ADV with SEC','Hire Chief Compliance Officer','Beta launch to 500 users','Build full compliance docs'] },
    { n:2, label:'Phase 2 — AI Training & Nationwide Launch', status:'pending', items:['SOC2 Type II certification','US Bank API integrations','Nationwide marketing launch','Achieve 10,000 paying users'] },
    { n:3, label:'Phase 3 — IPO Roadmap',                    status:'pending', items:['Revenue milestone $50M ARR','Series B fundraise','SEC IPO registration','NASDAQ/NYSE listing'] },
  ];
  return `
  <div class="g3" style="margin-bottom:14px;">
    <div class="card" style="border-color:rgba(0,229,153,0.25);">
      <div class="card-title">Compliant</div>
      <div class="metric-big text-green">${DATA.regulations.filter(r=>r.status==='PASS').length}</div>
      <div class="metric-sub">Regulations passed</div>
    </div>
    <div class="card" style="border-color:rgba(255,170,0,0.25);">
      <div class="card-title">Pending</div>
      <div class="metric-big text-amber">${DATA.regulations.filter(r=>r.status==='PENDING').length}</div>
      <div class="metric-sub">In progress</div>
    </div>
    <div class="card" style="border-color:rgba(255,59,92,0.25);">
      <div class="card-title">Action Required</div>
      <div class="metric-big text-red">${DATA.regulations.filter(r=>r.status==='FAIL').length}</div>
      <div class="metric-sub">Immediate attention</div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">📋 Regulatory Compliance Status</div>
        <button class="btn btn-outline btn-sm" onclick="alert('📧 Compliance report sent to legal@sentinel.ai')">Email Report</button>
      </div>
      ${DATA.regulations.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(26,45,85,0.5);">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text);">${r.name}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px;">${r.detail}</div>
        </div>
        <span class="comp-badge comp-${r.status.toLowerCase()}">${r.status==='PASS'?'✓ PASS':r.status==='FAIL'?'✗ FAIL':'⏳ PENDING'}</span>
      </div>`).join('')}
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="card">
        <div class="section-title mb-12">🗺️ Implementation Roadmap</div>
        ${phases.map(p => `
        <div class="step-item">
          <div class="step-num step-${p.status}">${p.status==='active'?'▶':p.status==='done'?'✓':'○'}</div>
          <div style="flex:1;">
            <div style="font-size:12px;font-weight:700;color:${p.status==='active'?'var(--cyan)':'var(--text2)'};">${p.label}</div>
            ${p.status==='active' ? p.items.map(i=>`<div style="font-size:11px;color:var(--text3);margin-top:2px;">• ${i}</div>`).join('') : `<div style="font-size:11px;color:var(--text3);margin-top:2px;">${p.items.length} milestones planned</div>`}
          </div>
        </div>`).join('')}
      </div>

      <div class="card">
        <div class="section-title mb-10">🔐 Active Security Certifications</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${['ZK Encryption','AES-256 Storage','SOC2 In Progress','PCI DSS Compliant','2FA Enforced','AWS GovCloud','FinCEN AML','Jumio KYC'].map(b =>
            `<span class="inline-badge" style="background:rgba(0,200,240,0.1);border:1px solid rgba(0,200,240,0.2);color:var(--cyan);">${b}</span>`
          ).join('')}
        </div>
      </div>
    </div>
  </div>`;
}
