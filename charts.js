/* js/charts.js — Chart.js helpers */

const CHART_DEFAULTS = {
  xTick:  { color: '#4a6894' },
  yTick:  { color: '#4a6894' },
  grid:   { color: 'rgba(255,255,255,0.04)' },
  noGrid: { display: false },
};

function makeBar(id, labels, datasets, yCallback) {
  const el = document.getElementById(id);
  if (!el) return;
  return new Chart(el, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: CHART_DEFAULTS.xTick, grid: CHART_DEFAULTS.noGrid },
        y: { ticks: { color:'#4a6894', callback: yCallback || (v=>v) }, grid: CHART_DEFAULTS.grid },
      }
    }
  });
}

function makeLine(id, labels, data, color, fill=true) {
  const el = document.getElementById(id);
  if (!el) return;
  return new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data, borderColor: color,
        backgroundColor: fill ? color.replace(')',',0.1)').replace('rgb','rgba') : 'transparent',
        fill, tension: 0.4, pointRadius: 3, pointBackgroundColor: color,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: CHART_DEFAULTS.xTick, grid: CHART_DEFAULTS.noGrid },
        y: { ticks: CHART_DEFAULTS.yTick, grid: CHART_DEFAULTS.grid },
      }
    }
  });
}

function makeDoughnut(id, labels, data, colors) {
  const el = document.getElementById(id);
  if (!el) return;
  return new Chart(el, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position:'right', labels:{ color:'#7a9bc4', font:{size:11} } } },
      cutout: '65%',
    }
  });
}

function initDashboardCharts() {
  setTimeout(() => {
    makeBar('dashRevChart',
      DATA.revenue.map(r=>r.year),
      [
        { label:'Revenue ($M)',     data: DATA.revenue.map(r=>r.rev),  backgroundColor:'rgba(0,200,240,0.7)',  borderRadius:4 },
        { label:'Operating Cost',   data: DATA.revenue.map(r=>r.cost), backgroundColor:'rgba(255,170,0,0.5)',  borderRadius:4 },
      ],
      v => '$'+v+'M'
    );
    makeLine('dashThreatChart',
      ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      DATA.threats, '#00c8f0'
    );
  }, 120);
}

function initAnalyticsCharts() {
  setTimeout(() => {
    // MRR chart with target line
    const mrrEl = document.getElementById('mrrChart');
    if (mrrEl) new Chart(mrrEl, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          { label:'MRR',    data:[52,78,104,142,165,187], borderColor:'#00c8f0', backgroundColor:'rgba(0,200,240,0.1)', fill:true, tension:0.4, pointRadius:3 },
          { label:'Target', data:[60,85,110,140,170,200], borderColor:'#ffaa00', borderDash:[4,4], fill:false, tension:0.4, pointRadius:0 },
        ]
      },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ x:{ticks:{color:'#4a6894'},grid:{display:false}}, y:{ticks:{color:'#4a6894',callback:v=>'$'+v+'K'},grid:{color:'rgba(255,255,255,0.04)'}} } }
    });

    makeDoughnut('segChart',
      ['HNW Seniors','Corp Exec','Small Biz','Family Office','Tech Users'],
      [35,28,20,10,7],
      ['#00c8f0','#a855f7','#00e599','#ffaa00','#ff3b5c']
    );

    makeBar('fraudTypeChart',
      ['Phishing','Wire Fraud','Romance','BEC','Gift Card','Crypto','Vishing'],
      [{ data:[42,28,19,15,12,9,6], backgroundColor:['rgba(255,59,92,0.7)','rgba(255,170,0,0.7)','rgba(168,85,247,0.7)','rgba(0,200,240,0.7)','rgba(0,229,153,0.7)','rgba(59,130,246,0.7)','rgba(255,59,92,0.5)'], borderRadius:4 }]
    );
  }, 120);
}

function initRiskChart() {
  setTimeout(() => {
    const el = document.getElementById('riskTrendChart');
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
          data:[85,79,72,68,65,62], borderColor:'#ffaa00',
          backgroundColor:'rgba(255,170,0,0.1)', fill:true,
          tension:0.4, pointRadius:3, pointBackgroundColor:'#ffaa00'
        }]
      },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ x:{ticks:{color:'#4a6894'},grid:{display:false}}, y:{min:40,max:100,ticks:{color:'#4a6894'},grid:{color:'rgba(255,255,255,0.04)'}} } }
    });
  }, 120);
}
