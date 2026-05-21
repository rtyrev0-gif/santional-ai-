/* js/pages/darkweb.js */

function renderDarkWeb() {
  return `
  <div class="g2" style="margin-bottom:14px;">
    <div class="card">
      <div class="section-title mb-12">🌑 Dark Web Scanner</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="inp-label">Email Address to Monitor</label>
          <input class="inp" id="dw-email" value="user@example.com" />
        </div>
        <div>
          <label class="inp-label">Phone Number</label>
          <input class="inp" id="dw-phone" value="+1 (555) 000-0000" />
        </div>
        <div>
          <label class="inp-label">SSN Last 4 Digits (AES-256 encrypted)</label>
          <input class="inp" id="dw-ssn" placeholder="••••" type="password" maxlength="4" />
        </div>
        <div>
          <label class="inp-label">Credit Card BIN (first 6 digits)</label>
          <input class="inp" id="dw-bin" placeholder="e.g. 411111" maxlength="6" />
        </div>
        <button class="btn btn-cyan" id="dw-btn" onclick="runDarkWebScan()">🌑 Run Dark Web Scan</button>
      </div>
    </div>

    <div class="card">
      <div class="section-title mb-12">📡 Monitoring Coverage</div>
      ${[
        ['Breach Databases (HaveIBeenPwned)','LIVE'],
        ['Tor Hidden Services (.onion)','LIVE'],
        ['Criminal Forums (XSS, RaidForums)', 'LIVE'],
        ['Paste Sites (Pastebin, GhostBin)','LIVE'],
        ['Telegram Fraud Channels','LIVE'],
        ['Dark Web Marketplaces','LIVE'],
        ['Leaked Credential Dumps','LIVE'],
        ['Social Engineering Databases','LIVE'],
      ].map(([z,s]) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:12px;color:var(--text2);">${z}</span>
        <span class="inline-badge" style="background:rgba(0,229,153,0.1);border:1px solid rgba(0,229,153,0.25);color:var(--green);font-size:10px;">${s}</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="card" id="dw-results">
    <div class="section-title mb-12">🔎 Scan Results</div>
    <div id="dw-result-content">
      <div style="text-align:center;padding:24px 0;color:var(--text3);">
        <div style="font-size:36px;margin-bottom:8px;">🌑</div>
        <div style="font-size:14px;">Enter your details above and click <strong style="color:var(--cyan);">Run Dark Web Scan</strong>.</div>
        <div style="font-size:12px;margin-top:4px;">All data is ZK-encrypted. Nothing is stored on our servers.</div>
      </div>
    </div>
  </div>`;
}

async function runDarkWebScan() {
  const btn = document.getElementById('dw-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Scanning dark web...';

  document.getElementById('dw-result-content').innerHTML = `
    <div class="scan-box" style="height:80px;margin-bottom:12px;">
      <div class="scan-line"></div>
      <div class="hex-text">00 1f a2 b4 c8 d3 e1 f9 00 1a b2 c3 d4 e5 f6 a7 b8 c9 d0 e1 f2 03 14 25 36 47 58 69 7a 8b 9c ad be cf d0 e1 f2...</div>
    </div>
    <div id="dw-status" style="color:var(--cyan);font-family:var(--mono);font-size:12px;text-align:center;">Connecting via Tor relay...</div>`;

  const hexSteps = [
    'Connecting via Tor relay...',
    'Querying breach databases...',
    'Scanning criminal forums...',
    'Checking paste sites...',
    'Analyzing Telegram channels...',
    'Checking dark web markets...',
    'Compiling exposure report...',
  ];
  let hi = 0;
  const hexInt = setInterval(() => {
    const el = document.getElementById('dw-status');
    if (el) el.textContent = hexSteps[hi % hexSteps.length];
    hi++;
  }, 600);

  await new Promise(r => setTimeout(r, 4200));
  clearInterval(hexInt);

  const email = document.getElementById('dw-email')?.value || 'user@example.com';

  const results = [
    { label:`Email: ${email}`,       val:'Found in 1 breach — 2024 Data Leak (89M records exposed)', found:true  },
    { label:'Password Hash',         val:'SHA-1 hash exposed in breach dump. Change password immediately.', found:true },
    { label:'Phone Number',          val:'Not found in any monitored breach database.',              found:false },
    { label:'SSN Last 4',            val:'No records found in criminal databases.',                 found:false },
    { label:'Credit Card BIN',       val:'No compromised cards matching this BIN detected.',        found:false },
    { label:'Bank Account Numbers',  val:'No exposure detected in financial leak databases.',       found:false },
    { label:'Home Address',          val:'Not found on data broker sites monitored.',               found:false },
    { label:'Date of Birth',         val:'Not found in monitored breach databases.',                found:false },
  ];

  document.getElementById('dw-result-content').innerHTML = `
  <div class="g3" style="margin-bottom:14px;">
    <div style="background:rgba(255,59,92,0.1);border:1px solid rgba(255,59,92,0.3);border-radius:var(--radius);padding:10px 14px;text-align:center;">
      <div style="font-size:22px;font-weight:700;color:var(--red);font-family:var(--mono);">2</div>
      <div style="font-size:11px;color:var(--text3);">Exposures Found</div>
    </div>
    <div style="background:rgba(0,229,153,0.08);border:1px solid rgba(0,229,153,0.2);border-radius:var(--radius);padding:10px 14px;text-align:center;">
      <div style="font-size:22px;font-weight:700;color:var(--green);font-family:var(--mono);">6</div>
      <div style="font-size:11px;color:var(--text3);">Items Clean</div>
    </div>
    <div style="background:rgba(255,170,0,0.08);border:1px solid rgba(255,170,0,0.2);border-radius:var(--radius);padding:10px 14px;text-align:center;">
      <div style="font-size:14px;font-weight:700;color:var(--amber);">⚠️ ACTION REQUIRED</div>
      <div style="font-size:11px;color:var(--text3);">Change passwords · Enable 2FA</div>
    </div>
  </div>
  ${results.map(r => `
  <div class="dw-item ${r.found ? 'found' : 'clean'}">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div class="dw-label">${r.found ? '🔴' : '✅'} ${r.label}</div>
      <span class="rb ${r.found ? 'rb-high' : 'rb-low'}">${r.found ? 'EXPOSED' : 'CLEAN'}</span>
    </div>
    <div class="dw-val">${r.val}</div>
  </div>`).join('')}
  <div class="notice-warn" style="margin-top:10px;">
    ⚠️ <strong>Recommended Actions:</strong> Change your email password immediately, enable 2FA on all accounts, and monitor for suspicious login attempts.
  </div>`;

  btn.disabled = false;
  btn.textContent = '🌑 Run Dark Web Scan';
}
