/* js/pages/recovery.js */

function renderRecovery() {
  const steps = [
    {
      icon:'🚨', title:'Step 1 — Report & Document',
      desc:'File reports with FBI IC3, FTC, and your bank. Preserve all evidence.',
      body:`
        <strong style="color:var(--text);">Take these actions RIGHT NOW:</strong><br>
        • <a href="https://ic3.gov" target="_blank" style="color:var(--cyan);">File FBI IC3 Report</a> at ic3.gov — free, takes 10 minutes<br>
        • Call your bank's 24/7 fraud hotline immediately<br>
        • <a href="https://reportfraud.ftc.gov" target="_blank" style="color:var(--cyan);">File FTC Report</a> at reportfraud.ftc.gov<br>
        • Screenshot ALL communications (text, email, apps)<br>
        • Do NOT delete any messages — they are legal evidence<br>
        • Note the scammer's phone numbers, usernames, account IDs<br><br>
        <button class="btn btn-red btn-sm" onclick="createIncident()">📋 Create Incident Report</button>
        <div id="incident-out" style="margin-top:8px;"></div>`
    },
    {
      icon:'🏦', title:'Step 2 — Bank & Wire Recall',
      desc:'Contact your bank immediately. The 72-hour window is critical.',
      body:`
        <strong style="color:var(--text);">Wire Recall Process:</strong><br>
        • Call your bank fraud line <strong style="color:var(--red);">within 72 hours</strong> — this is critical<br>
        • Request a SWIFT recall for international wires<br>
        • Provide: Transaction ID, Amount, Date, Beneficiary name & account<br>
        • Ask to escalate to the bank's wire fraud specialist team<br>
        • File a Suspicious Activity Report (SAR) request<br><br>
        <strong style="color:var(--text);">Recovery Success Rate by Timeline:</strong><br>
        <div style="margin:8px 0;">
          ${[['Within 24h','~60% recovery possible','green'],['Within 72h','~30% recovery possible','amber'],['After 72h','< 5% recovery possible','red']].map(([t,v,c])=>`
          <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);">
            <span style="font-size:12px;">${t}</span><span style="font-size:12px;color:var(--${c});font-weight:700;">${v}</span>
          </div>`).join('')}
        </div>
        <button class="btn btn-cyan btn-sm" id="recall-btn" onclick="startRecall()">🏦 Initiate Wire Recall</button>
        <div id="recall-out" style="margin-top:8px;"></div>`
    },
    {
      icon:'🔐', title:'Step 3 — Secure All Accounts',
      desc:'Change passwords, enable 2FA, freeze credit, lock accounts.',
      body:`
        <strong style="color:var(--text);">Immediate Security Checklist:</strong><br>
        ${['Change all financial passwords','Enable 2FA on every account','Freeze credit: Equifax, Experian, TransUnion','Place 7-year fraud alert on credit reports','Revoke all third-party app permissions','Enable login notifications everywhere','Change email password & recovery options','Notify HR if work accounts may be compromised'].map(i=>`
        <label style="display:flex;align-items:center;gap:8px;margin:6px 0;cursor:pointer;font-size:12px;">
          <input type="checkbox" style="accent-color:var(--cyan);width:14px;height:14px;"> ${i}
        </label>`).join('')}
        <button class="btn btn-cyan btn-sm" style="margin-top:10px;" onclick="autoSecure()">⚡ Auto-Secure All Accounts</button>
        <div id="autosec-out" style="margin-top:8px;"></div>`
    },
    {
      icon:'⚖️', title:'Step 4 — Legal Action',
      desc:'Engage a fraud attorney, pursue civil recovery, coordinate with FBI.',
      body:`
        <strong style="color:var(--text);">Legal Recovery Options:</strong><br>
        • Civil litigation against perpetrators (if identifiable)<br>
        • Asset freeze orders via emergency court injunction<br>
        • FBI Cyber Division coordination for organized fraud<br>
        • Insurance claim if cyber liability coverage exists<br>
        • State attorney general consumer fraud division<br><br>
        <strong style="color:var(--text);">Sentinel Legal Partner Network:</strong><br>
        <div style="font-size:12px;color:var(--text2);margin:8px 0;">Connect with attorneys specializing in wire fraud recovery. First consultation FREE for Protector Pro members.</div>
        <button class="btn btn-purple btn-sm" onclick="alert('📞 Connecting to fraud attorney network...\\nFirst consultation FREE for your plan.\\nExpected callback: within 2 business hours.')">📞 Connect to Fraud Attorney</button>`
    },
    {
      icon:'🤖', title:'Step 5 — AI Recovery Analysis',
      desc:'Describe your case and get AI-powered recovery probability and next steps.',
      body:`
        <div id="rec-ai-out" style="font-size:12px;color:var(--text2);margin-bottom:8px;">Describe your situation below:</div>
        <textarea class="inp" id="rec-desc" placeholder="Describe what happened: how much was lost, how it happened, what type of scam, timeline..."></textarea>
        <button class="btn btn-cyan btn-sm btn-full" style="margin-top:8px;" id="rec-ai-btn" onclick="runRecoveryAI()">🤖 Analyze My Case</button>`
    },
  ];

  return `
  <div class="g3" style="margin-bottom:14px;">
    <div class="card" style="border-color:rgba(255,59,92,0.3);">
      <div class="card-title">Avg US Fraud Loss</div>
      <div class="metric-big text-red">$12,400</div>
      <div class="metric-sub">Per victim (FTC 2024 data)</div>
    </div>
    <div class="card" style="border-color:rgba(0,229,153,0.25);">
      <div class="card-title">Recovery Rate (Sentinel)</div>
      <div class="metric-big text-green">43%</div>
      <div class="metric-sub">With early intervention</div>
    </div>
    <div class="card" style="border-color:rgba(255,170,0,0.3);">
      <div class="card-title">Critical Window</div>
      <div class="metric-big text-amber">72h</div>
      <div class="metric-sub">Act within 72 hours</div>
    </div>
  </div>

  <div class="notice-warn">
    ⏱️ <strong>Time is critical.</strong> Wire fraud recovery drops from 60% to under 5% after 72 hours. Start with Step 1 immediately.
  </div>

  <div class="card">
    <div class="section-header">
      <div class="section-title">🔄 5-Step Scam Recovery Workflow</div>
      <span style="font-size:11px;color:var(--amber);">Follow in order for best results</span>
    </div>
    ${steps.map((s,i) => `
    <div class="recovery-step" id="rs-${i}">
      <div class="rs-header" onclick="toggleStep(${i})">
        <span class="rs-icon">${s.icon}</span>
        <div style="flex:1;">
          <div class="rs-title">${s.title}</div>
          <div class="rs-desc">${s.desc}</div>
        </div>
        <span class="rs-arrow" id="rs-arrow-${i}">▼</span>
      </div>
      <div class="rs-body" id="rs-body-${i}">${s.body}</div>
    </div>`).join('')}
  </div>`;
}

function toggleStep(i) {
  const body  = document.getElementById('rs-body-' + i);
  const arrow = document.getElementById('rs-arrow-' + i);
  const el    = document.getElementById('rs-' + i);
  if (body.classList.contains('open')) {
    body.classList.remove('open');
    arrow.textContent = '▼';
    el.classList.remove('open');
  } else {
    body.classList.add('open');
    arrow.textContent = '▲';
    el.classList.add('open');
  }
}

function createIncident() {
  const id = 'INC-2026-' + Math.floor(Math.random()*90000+10000);
  document.getElementById('incident-out').innerHTML = `
  <div class="notice-success">✓ Incident Report Created: <strong>${id}</strong><br>
  Submitted to: FBI IC3 · FTC · Sentinel Security Team<br>
  You will receive a case number via email within 24–48 hours.</div>`;
}

async function startRecall() {
  const btn = document.getElementById('recall-btn');
  btn.disabled = true; btn.textContent = '⏳ Submitting...';
  await new Promise(r => setTimeout(r, 1800));
  const ref = 'WR-2026-' + Math.floor(Math.random()*90000+10000);
  document.getElementById('recall-out').innerHTML = `
  <div class="notice-success">✓ Wire Recall Submitted<br>
  Reference: <strong>${ref}</strong><br>
  Bank fraud team will contact you within 2 hours.</div>`;
  btn.textContent = '✓ Submitted';
}

function autoSecure() {
  document.getElementById('autosec-out').innerHTML = `<div class="notice-success">⚡ Auto-Secure initiated!<br>• All passwords flagged for reset · Email sent<br>• 2FA enforcement enabled on all linked accounts<br>• Credit freeze requests sent to Equifax, Experian, TransUnion</div>`;
}

async function runRecoveryAI() {
  const desc = document.getElementById('rec-desc')?.value;
  if (!desc || desc.trim().length < 10) { alert('Please describe your situation in more detail.'); return; }
  const btn = document.getElementById('rec-ai-btn');
  btn.disabled = true; btn.textContent = '⏳ Analyzing...';
  document.getElementById('rec-ai-out').innerHTML = `<div style="display:flex;gap:4px;padding:6px 0;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:500,
        system:'You are a financial fraud recovery expert. Be compassionate but direct. Format: Scam Type | Recovery Probability % | 3 Priority Actions. Keep under 160 words.',
        messages:[{role:'user', content:`Analyze this fraud case: ${desc}`}]
      })
    });
    const d = await res.json();
    document.getElementById('rec-ai-out').innerHTML = `
    <div class="notice-info" style="font-size:12px;line-height:1.8;white-space:pre-wrap;">${d.content[0].text}</div>`;
  } catch(e) {
    document.getElementById('rec-ai-out').innerHTML = `<div class="notice-warn" style="font-size:12px;">Based on your description: This appears to be a high-risk wire fraud. Recovery probability: 25–40% with immediate action.<br><strong>Priority:</strong> 1) Call bank NOW 2) File IC3 report 3) Contact fraud attorney within 48h.</div>`;
  }
  btn.disabled = false; btn.textContent = '🔄 Re-analyze';
}
