/* js/data.js — Shared application data */

const DATA = {
  transactions: [
    { id:'TX-9821', name:'Zelle Transfer',     merchant:'Unknown Recipient',    amount:2400,   risk:'HIGH',   time:'2m ago',  type:'wire',   flag:'Pig Butchering Pattern',   icon:'💸' },
    { id:'TX-9820', name:'Amazon Prime',        merchant:'amazon.com',           amount:14.99,  risk:'LOW',    time:'5m ago',  type:'sub',    flag:'',                         icon:'📦' },
    { id:'TX-9819', name:'IRS Tax Refund',      merchant:'irs.gov-refund.net',   amount:3200,   risk:'HIGH',   time:'12m ago', type:'inbound',flag:'Fake IRS Domain',          icon:'⚠️' },
    { id:'TX-9818', name:'Chase ATM',           merchant:'Chase Bank #4421',     amount:200,    risk:'LOW',    time:'1h ago',  type:'atm',    flag:'',                         icon:'🏧' },
    { id:'TX-9817', name:'Wire to Dubai',       merchant:'Intl Wire Transfer',   amount:8500,   risk:'HIGH',   time:'1h ago',  type:'wire',   flag:'Unusual Geography',        icon:'🌍' },
    { id:'TX-9816', name:'Netflix',             merchant:'netflix.com',          amount:15.99,  risk:'LOW',    time:'2h ago',  type:'sub',    flag:'',                         icon:'🎬' },
    { id:'TX-9815', name:'Crypto Exchange',     merchant:'CoinPlatform-XYZ',     amount:12000,  risk:'MEDIUM', time:'3h ago',  type:'crypto', flag:'Unverified Exchange',      icon:'₿'  },
    { id:'TX-9814', name:'Gift Card Purchase',  merchant:'Best Buy',             amount:500,    risk:'MEDIUM', time:'6h ago',  type:'gift',   flag:'Gift Card Scam Pattern',   icon:'🎁' },
    { id:'TX-9813', name:'Grocery Store',       merchant:'Whole Foods #88',      amount:87.40,  risk:'LOW',    time:'8h ago',  type:'purchase',flag:'',                        icon:'🛒' },
    { id:'TX-9812', name:'Romance Transfer',    merchant:'Overseas Account',     amount:5000,   risk:'HIGH',   time:'10h ago', type:'wire',   flag:'Romance Scam Pattern',     icon:'💔' },
  ],

  alerts: [
    { type:'critical', icon:'🚨', title:'Deepfake Voice Scam Detected',    desc:'AI voice clone of Chase Bank agent. Call blocked.',             time:'2m ago' },
    { type:'critical', icon:'🔴', title:'Wire Fraud Attempt Blocked',       desc:'$8,500 wire to flagged UAE account stopped automatically.',     time:'1h ago' },
    { type:'critical', icon:'🔐', title:'Account Takeover Attempt',         desc:'3 failed logins from Tor exit node 185.220.x.x.',              time:'3h ago' },
    { type:'warning',  icon:'⚠️', title:'Dark Web Credential Leak',         desc:'Email address found in 2024 breach database (89M records).',   time:'5h ago' },
    { type:'warning',  icon:'🎣', title:'Phishing Email Intercepted',        desc:'Fake IRS refund domain irs.gov-refund.net flagged.',           time:'8h ago' },
    { type:'info',     icon:'ℹ️', title:'New Device Login',                 desc:'iPhone 15 logged in from Chicago, IL. Verify if this was you.', time:'12h ago' },
    { type:'info',     icon:'📱', title:'SMS OTP Requested',                desc:'One-time password requested for account change.',              time:'1d ago' },
  ],

  risks: [
    { icon:'⚖️', name:'Regulatory Non-Compliance (CCPA/GLBA)',        level:'CRITICAL', mit:'Zero-Knowledge Architecture + Compliance Legal Team',          score:88 },
    { icon:'💻', name:'Cyber Attacks / Data Breach',                   level:'HIGH',     mit:'$5M Cyber Liability Insurance + SOC Monitoring 24/7',          score:72 },
    { icon:'🤖', name:'AI Model Accuracy / False Positives',           level:'HIGH',     mit:'Human-in-loop review + Continuous model retraining',           score:65 },
    { icon:'🏦', name:'Banking Partner Integration Failure',           level:'MEDIUM',   mit:'Multi-bank API redundancy + Fallback protocols',               score:48 },
    { icon:'💰', name:'Series A Funding Gap',                          level:'MEDIUM',   mit:'Bridge funding + Revenue milestone gating',                    score:42 },
    { icon:'👥', name:'Key Talent Retention (AI/ML Engineers)',        level:'MEDIUM',   mit:'Equity packages + Competitive Palo Alto market salaries',      score:38 },
    { icon:'🌐', name:'Market Adoption / Competition (LifeLock etc.)', level:'LOW',      mit:'First-mover advantage + Patent applications on AI models',     score:25 },
    { icon:'📡', name:'AWS Financial Cloud Outage',                    level:'LOW',      mit:'Multi-region failover + 99.99% SLA commitment',                score:18 },
  ],

  staff: [
    { name:'Priya Nair',       role:'Head of AI/ML Engineering',      loc:'Palo Alto, CA',  status:'Active',     dept:'Engineering' },
    { name:'James Williams',   role:'US Fraud Analyst Lead',           loc:'New York, NY',   status:'Active',     dept:'Advisory' },
    { name:'Sunita Patel',     role:'Chief Compliance Officer',        loc:'New York, NY',   status:'Active',     dept:'Compliance' },
    { name:'Marcus Chen',      role:'Customer Success Manager',        loc:'Remote',         status:'Active',     dept:'Support' },
    { name:'Dr. Lisa Torres',  role:'ML Research Engineer',            loc:'Palo Alto, CA',  status:'Onboarding', dept:'Engineering' },
    { name:'Robert Kim',       role:'Senior Backend Engineer',         loc:'Palo Alto, CA',  status:'Active',     dept:'Engineering' },
    { name:'Angela Brooks',    role:'US Fraud Analyst',                loc:'New York, NY',   status:'Active',     dept:'Advisory' },
  ],

  regulations: [
    { name:'CCPA (California Consumer Privacy Act)',       status:'PASS',    detail:'Data deletion, opt-out, transparency notices implemented' },
    { name:'GLBA (Gramm-Leach-Bliley Act)',                status:'PASS',    detail:'Financial data safeguards and privacy notices active' },
    { name:'SEC Regulation — Investment Advisor',          status:'PENDING', detail:'Form ADV filing in progress — Target: Q3 2026' },
    { name:'FINRA — Broker-Dealer Compliance',             status:'PENDING', detail:'Compliance officer hired, documentation phase underway' },
    { name:'SOC 2 Type II Certification',                  status:'PENDING', detail:'Audit scheduled with Deloitte — Q4 2026' },
    { name:'SOC 1 Certification',                          status:'FAIL',    detail:'Not yet initiated — Required for bank integrations' },
    { name:'AML (Anti-Money Laundering / FinCEN)',         status:'PASS',    detail:'FinCEN-compliant transaction monitoring active' },
    { name:'KYC (Know Your Customer — Jumio)',             status:'PASS',    detail:'Identity verification via Jumio biometric integration' },
    { name:'GDPR (for future EU expansion)',               status:'PENDING', detail:'Data Processing Agreements templates prepared' },
    { name:'PCI DSS (Payment Card Industry)',              status:'PASS',    detail:'Tokenization via Stripe — zero raw card data stored' },
  ],

  revenue: [
    { year:'Y1', rev:50,  cost:60 },
    { year:'Y2', rev:132, cost:80 },
    { year:'Y3', rev:291, cost:110 },
    { year:'Y4', rev:384, cost:140 },
    { year:'Y5', rev:500, cost:170 },
  ],

  threats: [22, 31, 18, 45, 38, 29, 52, 41, 33, 28, 44, 60],

  mrr: [52, 78, 104, 142, 165, 187],

  fundingAlloc: [
    { label:'AI & ML R&D',             amount:'$4,000,000', pct:40, color:'#00c8f0' },
    { label:'Growth Marketing & UA',   amount:'$2,500,000', pct:25, color:'#a855f7' },
    { label:'US Advisory/Support',     amount:'$1,500,000', pct:15, color:'#00e599' },
    { label:'US Operations/Legal',     amount:'$1,000,000', pct:10, color:'#ffaa00' },
    { label:'Data Center/Compliance',  amount:'$1,000,000', pct:10, color:'#ff3b5c' },
  ],
};
