/* js/pages/transactions.js */

function renderTransactions() {
  return `
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
    <input class="inp" id="txn-search" placeholder="🔍  Search transactions, merchant, ID..." style="flex:1;min-width:200px;" oninput="filterTxns()" />
    <select class="inp" id="txn-risk" style="width:150px;" onchange="filterTxns()">
      <option value="">All Risk Levels</option>
      <option value="HIGH">HIGH Risk</option>
      <option value="MEDIUM">MEDIUM Risk</option>
      <option value="LOW">LOW Risk</option>
    </select>
    <select class="inp" id="txn-type" style="width:140px;" onchange="filterTxns()">
      <option value="">All Types</option>
      <option value="wire">Wire Transfer</option>
      <option value="crypto">Crypto</option>
      <option value="gift">Gift Card</option>
      <option value="sub">Subscription</option>
    </select>
  </div>

  <div class="card" style="margin-bottom:14px;">
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;">
      <div><div class="card-title">High Risk</div><div style="font-size:20px;font-weight:700;color:var(--red);font-family:var(--mono);">${DATA.transactions.filter(t=>t.risk==='HIGH').length}</div></div>
      <div style="width:1px;height:36px;background:var(--border);"></div>
      <div><div class="card-title">Medium Risk</div><div style="font-size:20px;font-weight:700;color:var(--amber);font-family:var(--mono);">${DATA.transactions.filter(t=>t.risk==='MEDIUM').length}</div></div>
      <div style="width:1px;height:36px;background:var(--border);"></div>
      <div><div class="card-title">Low Risk</div><div style="font-size:20px;font-weight:700;color:var(--green);font-family:var(--mono);">${DATA.transactions.filter(t=>t.risk==='LOW').length}</div></div>
      <div style="width:1px;height:36px;background:var(--border);"></div>
      <div><div class="card-title">Total Volume</div><div style="font-size:20px;font-weight:700;color:var(--text);font-family:var(--mono);">$${DATA.transactions.reduce((s,t)=>s+t.amount,0).toLocaleString()}</div></div>
      <button class="btn btn-cyan btn-sm" style="margin-left:auto;" onclick="APP.go('fraud')">🔍 AI Fraud Analyzer →</button>
    </div>
  </div>

  <div id="txn-list">
    ${txnListHTML(DATA.transactions)}
  </div>`;
}

function txnListHTML(list) {
  if (!list.length) return `<div style="text-align:center;padding:40px;color:var(--text3);">No transactions match your filter.</div>`;
  return list.map(t => `
  <div class="txn-item card fade-in" data-risk="${t.risk}" data-type="${t.type}">
    <div class="txn-icon" style="background:${t.risk==='HIGH'?'rgba(255,59,92,0.15)':t.risk==='MEDIUM'?'rgba(255,170,0,0.12)':'rgba(0,229,153,0.1)'};">${t.icon}</div>
    <div style="flex:1;">
      <div class="txn-name">${t.name} &nbsp;<span class="rb rb-${t.risk.toLowerCase()}">${t.risk}</span></div>
      <div class="txn-detail">${t.id} · ${t.merchant} · ${t.time}</div>
      ${t.flag ? `<div class="txn-flag">⚑ ${t.flag}</div>` : ''}
    </div>
    <div style="text-align:right;">
      <div class="txn-amount" style="color:${t.risk==='HIGH'?'var(--red)':t.risk==='MEDIUM'?'var(--amber)':'var(--text)'};">$${t.amount.toLocaleString()}</div>
      <div style="display:flex;gap:5px;justify-content:flex-end;margin-top:6px;">
        ${t.risk==='HIGH' ? `<button class="btn btn-red btn-sm" onclick="event.stopPropagation();blockTxn('${t.id}',this)">🚫 Block</button>` : ''}
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();prefillFraud('${t.name}','${t.amount}','${t.merchant}','${t.flag}')">🔍 Analyze</button>
      </div>
    </div>
  </div>`).join('');
}

function filterTxns() {
  const q    = (document.getElementById('txn-search')?.value || '').toLowerCase();
  const risk = document.getElementById('txn-risk')?.value || '';
  const type = document.getElementById('txn-type')?.value || '';
  const filtered = DATA.transactions.filter(t => {
    const matchQ    = !q    || t.name.toLowerCase().includes(q) || t.merchant.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    const matchRisk = !risk || t.risk === risk;
    const matchType = !type || t.type === type;
    return matchQ && matchRisk && matchType;
  });
  document.getElementById('txn-list').innerHTML = txnListHTML(filtered);
}

function blockTxn(id, btn) {
  btn.textContent = '✓ Blocked';
  btn.style.background = 'var(--green)';
  btn.style.color = '#000';
  btn.disabled = true;
  alert(`Transaction ${id} has been BLOCKED.\nYour bank fraud team has been notified.\nCase #: BLK-${Date.now().toString().slice(-6)}`);
}

function prefillFraud(name, amount, merchant, flag) {
  APP.go('fraud');
  setTimeout(() => {
    const t = document.getElementById('fd-type');
    const a = document.getElementById('fd-amount');
    const m = document.getElementById('fd-merchant');
    const n = document.getElementById('fd-notes');
    if (t) t.value = name;
    if (a) a.value = amount;
    if (m) m.value = merchant;
    if (n) n.value = flag ? `Red flag detected: ${flag}` : '';
  }, 100);
}
