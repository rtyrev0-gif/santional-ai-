/* js/pages/settings.js */

const TOGGLES = [
  { id:'tg0', label:'Real-time Transaction Alerts',     sub:'Notify for every transaction flagged by AI engine',   on:true },
  { id:'tg1', label:'Dark Web Monitoring (24/7)',        sub:'Continuous monitoring of credentials on dark web',    on:true },
  { id:'tg2', label:'AI Voice Scam Detection',           sub:'Detect deepfake voices on incoming calls',            on:true },
  { id:'tg3', label:'Zelle / Wire Fraud Interception',   sub:'Auto-block suspicious wires above $500',              on:true },
  { id:'tg4', label:'Email Phishing Alerts',             sub:'Flag and quarantine phishing emails in real-time',    on:true },
  { id:'tg5', label:'Credit Score Monitoring',           sub:'Alert on any credit inquiry or score change',         on:true },
  { id:'tg6', label:'Weekly Security Report (PDF)',      sub:'Receive full security digest every Monday morning',   on:false },
  { id:'tg7', label:'SMS Critical Alerts',               sub:'Text message for CRITICAL alerts only',               on:false },
  { id:'tg8', label:'BEC / Business Email Protection',   sub:'Monitor outbound wires for CEO fraud patterns',       on:true },
  { id:'tg9', label:'Crypto Scam Watchlist',             sub:'Flag transactions to unverified crypto exchanges',    on:true },
];

function renderSettings() {
  return `
  <div class="g2">
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="card">
        <div class="section-title mb-12">🔔 Alert & Monitoring Preferences</div>
        ${TOGGLES.map(t => `
        <div class="toggle-wrap">
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">${t.label}</div>
            <div style="font-size:11px;color:var(--text3);margin-top:2px;">${t.sub}</div>
          </div>
          <div class="toggle ${t.on ? 'on' : 'off'}" id="${t.id}" onclick="flipToggle('${t.id}')">
            <div class="toggle-knob"></div>
          </div>
        </div>`).join('')}
        <button class="btn btn-cyan btn-full" style="margin-top:12px;" onclick="saveSettings()">💾 Save Preferences</button>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="card">
        <div class="section-title mb-12">🔐 Account Security</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div>
            <label class="inp-label">Full Name</label>
            <input class="inp" id="set-name" value="Aman Kumar Mahto" />
          </div>
          <div>
            <label class="inp-label">Email Address</label>
            <input class="inp" id="set-email" value="aman@adiviontech.com" />
          </div>
          <div>
            <label class="inp-label">Alert Phone Number</label>
            <input class="inp" id="set-phone" value="+91 9508919048" />
          </div>
          <div>
            <label class="inp-label">Current Password</label>
            <input class="inp" type="password" placeholder="Enter current password" />
          </div>
          <div>
            <label class="inp-label">New Password</label>
            <input class="inp" type="password" placeholder="Min 12 chars, mixed case + symbols" />
          </div>
          <button class="btn btn-cyan" onclick="saveAccount()">Save Account Changes</button>
        </div>
      </div>

      <div class="card">
        <div class="section-title mb-10">🛡️ Two-Factor Authentication</div>
        <div class="notice-success" style="margin-bottom:10px;font-size:12px;">
          2FA is currently <strong>ENABLED</strong> on your account.
        </div>
        ${[
          ['Authenticator App (Google Auth)', '✓ Active',          'green'],
          ['SMS Backup',                      '+1 (555) ***-**48', 'cyan'],
          ['Biometric (Face ID)',             'Not configured',    'text3'],
          ['Hardware Key (YubiKey)',          'Not configured',    'text3'],
        ].map(([l,v,c]) => `
        <div class="stat-row">
          <div class="stat-label">${l}</div>
          <div class="stat-val" style="color:var(--${c});font-size:12px;">${v}</div>
        </div>`).join('')}
        <button class="btn btn-outline btn-sm btn-full" style="margin-top:10px;" onclick="alert('📱 QR code generated. Scan with Google Authenticator.')">Add New 2FA Device</button>
      </div>

      <div class="card">
        <div class="section-title mb-10">🔑 API Keys & Integrations</div>
        ${[
          ['Anthropic AI API',    'Connected ✓',   'green'],
          ['AWS Financial Cloud', 'Connected ✓',   'green'],
          ['Jumio KYC',           'Connected ✓',   'green'],
          ['Stripe Payments',     'Connected ✓',   'green'],
          ['Twilio Alerts',       'Configure',     'amber'],
        ].map(([s,v,c]) => `
        <div class="stat-row">
          <div class="stat-label">${s}</div>
          <div class="stat-val" style="color:var(--${c});font-size:12px;">${v}</div>
        </div>`).join('')}
      </div>

      <div class="card danger-card">
        <div class="section-title mb-10" style="color:var(--red);">⚠️ Danger Zone</div>
        <button class="btn btn-sm danger-btn" onclick="freezeAccount()">🔒 Freeze Account (Emergency)</button>
        <button class="btn btn-sm danger-btn" onclick="exportData()">📦 Export All My Data</button>
        <button class="btn btn-sm danger-btn" onclick="if(confirm('Are you sure? This cannot be undone.'))alert('Account deletion request submitted. You will receive a confirmation email.')">🗑️ Delete Account</button>
      </div>
    </div>
  </div>`;
}

function flipToggle(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('on');
  el.classList.toggle('off');
}

function saveSettings() {
  alert('✓ Preferences saved successfully!\nAll monitoring settings updated.');
}

function saveAccount() {
  alert('✓ Account details updated.\nVerification email sent to your address.');
}

function freezeAccount() {
  if (confirm('FREEZE ACCOUNT? All transactions will be blocked for 24 hours.')) {
    alert('🔒 Account frozen!\nAll transactions blocked for 24h.\nCall 1-800-SENTINEL to unfreeze.');
  }
}

function exportData() {
  alert('📦 Data export requested.\nYou will receive a download link within 24 hours at your registered email.');
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* js/pages/plans.js                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

function renderPlans() {
  const plans = [
    {
      name: 'Guardian Basic', price: 19, color: 'var(--text2)',
      features: [
        'Scam bond monitoring',
        'Real-time transaction alerts',
        'Basic AI fraud detection',
        'Email dark web monitoring',
        'Monthly security digest',
        'Cancel anytime',
      ],
      btn: 'btn-outline', label: 'Start Free Trial',
    },
    {
      name: 'Protector Pro', price: 49, color: 'var(--cyan)',
      features: [
        'Everything in Guardian Basic',
        'Risk recovery assistance',
        'Scam recovery support',
        'Investment safety analysis',
        'Priority AI advisor (24/7)',
        '50 US Fraud Analysts on call',
        'Weekly PDF security report',
        'BEC email protection',
      ],
      btn: 'btn-cyan', label: 'Upgrade Now', featured: true,
    },
    {
      name: 'Executive Elite', price: 99, color: 'var(--purple)',
      features: [
        'Everything in Protector Pro',
        'Dedicated wealth advisor',
        'Revenue suite & fraud guide',
        'SOC2/SOC1 compliance shield',
        'Emergency response (24/7)',
        'Custom fraud reports',
        'Family office protection',
        'White-glove onboarding',
      ],
      btn: 'btn-sm', label: 'Contact Sales', pc: 'var(--purple)',
    },
  ];

  return `
  <div style="text-align:center;margin-bottom:22px;">
    <div style="font-size:22px;font-weight:700;color:var(--text);margin-bottom:5px;">Choose Your Protection Level</div>
    <div style="font-size:13px;color:var(--text2);">AI-powered fraud detection · Cancel anytime · US-based expert support</div>
  </div>

  <div class="g3" style="align-items:start;margin-bottom:20px;">
    ${plans.map(p => `
    <div class="card plan-card ${p.featured ? 'featured' : ''}" style="${p.pc ? 'border-color:'+p.pc+';' : ''}">
      ${p.featured ? '<div class="plan-popular">★ MOST POPULAR</div>' : ''}
      <div style="margin-top:${p.featured ? '12px' : '0'};margin-bottom:14px;">
        <div style="font-size:11px;color:${p.color};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;">${p.name}</div>
        <div>
          <span style="font-size:34px;font-weight:700;color:${p.color};font-family:var(--mono);">$${p.price}</span>
          <span style="font-size:13px;color:var(--text2);">/month</span>
        </div>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:12px;margin-bottom:16px;">
        ${p.features.map(f => `
        <div class="feat-item">
          <span class="feat-check" style="color:${p.color};">✓</span>
          <span>${f}</span>
        </div>`).join('')}
      </div>
      <button class="btn ${p.btn} btn-full" 
        style="${p.pc ? 'background:'+p.pc+';color:white;border:none;' : ''}"
        onclick="selectPlan('${p.name}', ${p.price})">
        ${p.label}
      </button>
    </div>`).join('')}
  </div>

  <div class="card" style="margin-bottom:14px;border-color:rgba(0,200,240,0.3);background:rgba(0,200,240,0.04);">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <div style="font-size:16px;font-weight:700;color:var(--cyan);margin-bottom:4px;">🏆 Series A — $10M Funding Round Now Open</div>
        <div style="font-size:12px;color:var(--text2);">Sentinel Finance AI is raising from accredited US investors. Protecting $3.8T in high-exposure wealth across seniors, executives, and family offices.</div>
      </div>
      <button class="btn btn-cyan" onclick="requestDeck()">Request Investor Deck →</button>
    </div>
  </div>

  <div class="card">
    <div class="section-title mb-12">📊 Plan Comparison</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th style="color:var(--text2);">Guardian $19</th>
            <th style="color:var(--cyan);">Pro $49 ★</th>
            <th style="color:var(--purple);">Elite $99</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['AI Fraud Detection',       '✓','✓','✓'],
            ['Real-time Alerts',         '✓','✓','✓'],
            ['Dark Web Monitoring',       '✓','✓','✓'],
            ['Risk Recovery Support',    '—','✓','✓'],
            ['Scam Recovery Workflow',   '—','✓','✓'],
            ['Investment Safety AI',     '—','✓','✓'],
            ['Priority Advisor (24/7)',  '—','✓','✓'],
            ['50 Fraud Analysts',        '—','✓','✓'],
            ['BEC Email Protection',     '—','✓','✓'],
            ['SOC2 Compliance Shield',   '—','—','✓'],
            ['Dedicated Advisor',        '—','—','✓'],
            ['White-Glove Onboarding',   '—','—','✓'],
            ['Custom Fraud Reports',     '—','—','✓'],
          ].map(([f,g,p,e]) => `
          <tr>
            <td style="color:var(--text);">${f}</td>
            <td style="text-align:center;color:${g==='✓'?'var(--green)':'var(--text3)'};">${g}</td>
            <td style="text-align:center;color:${p==='✓'?'var(--cyan)':'var(--text3)'};">${p}</td>
            <td style="text-align:center;color:${e==='✓'?'var(--purple)':'var(--text3)'};">${e}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function selectPlan(name, price) {
  if (name === 'Executive Elite') {
    alert('📞 Sales team contact request submitted!\nA Sentinel advisor will call you within 1 business day.\nFounder: Aman Kumar Mahto\nEmail: investors@sentinelfinance.ai');
  } else {
    alert(`💳 Redirecting to secure checkout...\nPlan: ${name} — $${price}/month\nSecured by Stripe · Cancel anytime\n\nYour protection starts immediately after payment.`);
  }
}

function requestDeck() {
  alert('📧 Investor Deck Request Submitted!\n\nYou will receive the Sentinel Finance AI Series A deck at your registered email within 24 hours.\n\nFounder: Aman Kumar Mahto\nContact: investors@sentinelfinance.ai\nSeries A Target: $10,000,000');
}
