/* js/pages/analytics.js */

function renderAnalytics() {
  return `
  <div class="g4">
    <div class="card">
      <div class="card-title">Total Users (Y1)</div>
      <div class="metric-big text-cyan">5,200</div>
      <div class="metric-up">↑ 23% MoM growth</div>
    </div>
    <div class="card">
      <div class="card-title">Monthly Recurring Revenue</div>
      <div class="metric-big text-green">$187K</div>
      <div class="metric-up">↑ $31K this month</div>
    </div>
    <div class="card">
      <div class="card-title">Churn Rate</div>
      <div class="metric-big text-amber">2.8%</div>
      <div class="metric-sub">Target: &lt;2%</div>
    </div>
    <div class="card">
      <div class="card-title">Fraud Prevented (Total)</div>
      <div class="metric-big text-green">$4.2M</div>
      <div class="metric-sub">All-time platform total</div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-header">
        <div class="section-title">📊 MRR vs Target (Monthly)</div>
        <div style="display:flex;gap:12px;">
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);">
            <div style="width:10px;height:2px;background:var(--cyan);border-radius:1px;"></div> Actual
          </div>
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);">
            <div style="width:10px;height:2px;background:var(--amber);border-radius:1px;border-top:2px dashed var(--amber);"></div> Target
          </div>
        </div>
      </div>
      <div style="position:relative;height:200px;">
        <canvas id="mrrChart" aria-label="Monthly recurring revenue chart"></canvas>
      </div>
    </div>
    <div class="card">
      <div class="section-header">
        <div class="section-title">👥 User Segment Breakdown</div>
        <span style="font-size:11px;color:var(--text3);">5,200 total users</span>
      </div>
      <div style="position:relative;height:200px;">
        <canvas id="segChart" aria-label="User segments doughnut chart"></canvas>
      </div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="section-title mb-10">🛡️ Fraud Type Distribution</div>
      <div style="position:relative;height:190px;">
        <canvas id="fraudTypeChart" aria-label="Fraud types bar chart"></canvas>
      </div>
    </div>
    <div class="card">
      <div class="section-title mb-12">📋 Key Business Metrics</div>
      ${[
        ['Guardian Basic Users',       '3,120 users',  '60% of base'],
        ['Protector Pro Users',        '1,720 users',  '33% of base'],
        ['Executive Elite Users',      '360 users',    '7% of base'],
        ['ARPU',                       '$35.96/mo',    '↑ $2.10 MoM'],
        ['Net Promoter Score (NPS)',   '72',           'Industry avg: 45'],
        ['Fraud Detection Accuracy',   '94.2%',        '↑ 1.1% this month'],
        ['Avg AI Response Time',       '< 1.8s',       'SLA target: 5s'],
        ['Customer Lifetime Value',    '$1,294',       '36-mo projection'],
        ['Cost of Acquisition (CAC)',  '$142',         'Payback: 4 months'],
        ['Uptime (30 days)',           '99.97%',       '4 min downtime'],
      ].map(([l,v,d]) => `
      <div class="stat-row">
        <div class="stat-label">${l}</div>
        <div style="text-align:right;">
          <div class="stat-val">${v}</div>
          <div style="font-size:10px;color:var(--text3);">${d}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div class="card">
    <div class="section-header">
      <div class="section-title">💰 5-Year Revenue Projections ($M)</div>
      <button class="btn btn-outline btn-sm" onclick="alert('📊 Analytics report exported:\\nsentinel_analytics_2026.xlsx')">Export Report</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Projected Revenue</th>
            <th>Operating Cost</th>
            <th>Gross Profit</th>
            <th>Margin</th>
            <th>Paying Users</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['Year 1', '$50M',  '$60M',  '-$10M', '-20%', '12,000'],
            ['Year 2', '$132M', '$80M',  '$52M',  '39%',  '31,000'],
            ['Year 3', '$291M', '$110M', '$181M', '62%',  '68,000'],
            ['Year 4', '$384M', '$140M', '$244M', '64%',  '90,000'],
            ['Year 5', '$500M', '$170M', '$330M', '66%',  '117,000'],
          ].map(([y,r,c,p,m,u]) => `
          <tr>
            <td style="color:var(--cyan);font-weight:700;">${y}</td>
            <td style="color:var(--green);font-weight:600;">${r}</td>
            <td>${c}</td>
            <td style="color:${p.includes('-')?'var(--red)':'var(--green)'};">${p}</td>
            <td style="color:${m.includes('-')?'var(--red)':'var(--amber)'};">${m}</td>
            <td>${u}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}
