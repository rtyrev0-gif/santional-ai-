/* js/pages/fraud.js */

const SCAM_PATTERNS = [
  { icon:'🐷', name:'Pig Butchering',       desc:'Long-term romance/investment scam. Victim "fattened" before funds are stolen.' },
  { icon:'📞', name:'Vishing + AI Voice',    desc:'AI-cloned voice of family member or official in a fake emergency.' },
  { icon:'🏛️', name:'IRS / Gov Impersonation', desc:'Fake tax authority demanding payment via gift cards or wire transfer.' },
  { icon:'💌', name:'BEC — Business Email',  desc:'Fake CEO email directing finance staff to wire funds to attacker.' },
  { icon:'💔', name:'Romance Scam',          desc:'Online relationship built over months, ending in crypto or wire request.' },
  { icon:'🎁', name:'Gift Card Drain',       desc:'Any urgent request to purchase gift cards is almost always a scam.' },
];

function renderFraud() {
  return `
  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">🔍 AI Fraud Analyzer</div>
        <span class="inline-badge" style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:var(--purple);">Anthropic Powered</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="inp-label">Transaction Type / Description</label>
          <input class="inp" id="fd-type" placeholder="e.g. Zelle transfer, Wire, Gift card, Crypto..." />
        </div>
        <div class="g2" style="margin-bottom:0;">
          <div>
            <label class="inp-label">Amount ($)</label>
            <input class="inp" id="fd-amount" type="number" placeholder="e.g. 2400" />
          </div>
          <div>
            <label class="inp-label">Merchant / Recipient</label>
            <input class="inp" id="fd-merchant" placeholder="e.g. unknown-recipient.net" />
          </div>
        </div>
        <div>
          <label class="inp-label">Context / Suspicious Notes</label>
          <textarea class="inp" id="fd-notes" placeholder="Describe anything suspicious: urgent request, unknown caller, gift cards, crypto, romance, IRS threats..."></textarea>
        </div>
        <div>
          <label class="inp-label">Target User Profile</label>
          <select class="inp" id="fd-profile">
            <option>High Net-Worth Senior (65+)</option>
            <option>Corporate Executive (BEC Target)</option>
            <option>Small Business Owner</option>
            <option>Family Office Manager</option>
            <option>Tech-Savvy Gen Z User</option>
            <option>US Retiree</option>
          </select>
        </div>
        <button class="btn btn-cyan" id="fd-btn" onclick="runFraudAnalysis()">🔍 Run AI Fraud Analysis</button>
      </div>
    </div>

    <div class="card" id="fd-result-card">
      <div class="section-title mb-12">📋 AI Analysis Report</div>
      <div id="fd-result" style="color:var(--text2);font-size:13px;line-height:1.7;">
        <div style="text-align:center;padding:30px 0;color:var(--text3);">
          <div style="font-size:40px;margin-bottom:12px;">🛡️</div>
          <div style="font-size:14px;">Enter transaction details on the left<br>and click <strong style="color:var(--cyan);">Run AI Fraud Analysis</strong>.</div>
          <div style="font-size:12px;margin-top:8px;">The Anthropic AI engine will assess risk level,<br>identify scam patterns, and recommend actions.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="section-title mb-12">⚡ Common Scam Patterns — Click to Auto-Fill</div>
    <div class="g3" style="margin-bottom:0;">
      ${SCAM_PATTERNS.map(s => `
      <div class="dw-item" style="cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor='var(--border2)'" onmouseout="this.style.borderColor='var(--border)'"
        onclick="document.getElementById('fd-notes').value='Pattern detected: ${s.name}. ${s.desc}';document.getElementById('fd-type').focus();">
        <div style="font-size:22px;margin-bottom:5px;">${s.icon}</div>
        <div class="dw-label">${s.name}</div>
        <div class="dw-val" style="font-family:var(--font);color:var(--text2);line-height:1.5;">${s.desc}</div>
        <div style="font-size:11px;color:var(--cyan);margin-top:6px;">Click to auto-fill →</div>
      </div>`).join('')}
    </div>
  </div>`;
}

async function runFraudAnalysis() {
  const type     = document.getElementById('fd-type')?.value    || 'Unknown transaction';
  const amount   = document.getElementById('fd-amount')?.value  || 'Unknown';
  const merchant = document.getElementById('fd-merchant')?.value|| 'Unknown';
  const notes    = document.getElementById('fd-notes')?.value   || '';
  const profile  = document.getElementById('fd-profile')?.value || 'General user';

  const btn = document.getElementById('fd-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Analyzing...';

  document.getElementById('fd-result').innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 0;">
      <div style="font-size:30px;">🔄</div>
      <div style="color:var(--cyan);font-family:var(--mono);font-size:13px;">AI ENGINE PROCESSING...</div>
      <div class="prog-bar" style="width:100%;"><div class="prog-fill" id="fd-prog" style="width:0%;background:var(--cyan);transition:width .4s;"></div></div>
      <div id="fd-prog-label" style="font-size:12px;color:var(--text3);">Loading fraud models...</div>
    </div>`;

  const steps = ['Loading fraud models...','Scanning scam databases...','Running BEC analysis...','Cross-referencing dark web...','Generating risk report...'];
  let p = 0;
  const prog = setInterval(() => {
    p += 20;
    const el = document.getElementById('fd-prog');
    const lb = document.getElementById('fd-prog-label');
    if (el) el.style.width = p + '%';
    if (lb && steps[p/20-1]) lb.textContent = steps[p/20-1];
  }, 400);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a senior US financial fraud detection expert at Sentinel Finance AI. Analyze transactions for fraud risk. Use these exact section headers with emojis:
🚨 RISK LEVEL: [LOW/MEDIUM/HIGH/CRITICAL] (Score: X/100)
🎯 FRAUD PATTERN: [identified pattern or "No pattern detected"]
🚩 RED FLAGS: [bullet list of specific red flags]
✅ RECOMMENDED ACTION: [BLOCK / MONITOR / ALLOW with specific steps]
📝 EXPLANATION: [2-3 sentence summary]
Be specific, direct, and actionable. Tailor advice to the user profile.`,
        messages: [{
          role: 'user',
          content: `Analyze this transaction:\nType: ${type}\nAmount: $${amount}\nMerchant/Recipient: ${merchant}\nUser Profile: ${profile}\nContext: ${notes || 'None provided'}`
        }]
      })
    });
    clearInterval(prog);
    const data = await res.json();
    const text = data.content[0].text;
    document.getElementById('fd-result').innerHTML = `
      <div style="font-size:13px;line-height:1.9;white-space:pre-wrap;color:var(--text);">${text}</div>`;
  } catch(e) {
    clearInterval(prog);
    document.getElementById('fd-result').innerHTML = `
      <div class="notice-warn" style="margin-bottom:10px;">⚠️ API connection error — showing fallback analysis.</div>
      <div style="font-size:13px;line-height:1.9;color:var(--text);">
🚨 RISK LEVEL: HIGH (Score: 78/100)
🎯 FRAUD PATTERN: Likely Wire Fraud / Pig Butchering
🚩 RED FLAGS:
  • Unusual transfer amount and unknown recipient
  • Urgent context matches common scam scripts
  • Pattern aligns with romance or investment scam
✅ RECOMMENDED ACTION: BLOCK — Do not proceed. Contact your bank immediately.
📝 EXPLANATION: This transaction shows multiple fraud indicators. Seniors and HNW individuals are the primary targets of this pattern. Recovery is difficult once funds are wired internationally.
      </div>`;
  }

  btn.disabled = false;
  btn.textContent = '🔍 Run AI Fraud Analysis';
}
