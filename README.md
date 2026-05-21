# 🛡️ Sentinel Finance AI — Prototype v1.0

**AI-Driven Financial Security & Wealth Advisory**  
Founder: Aman Kumar Mahto | Series A — $10M US Proposal  
Business Type: C-Corp (Delaware) | Location: NY/Hybrid

---

## 🚀 Quick Start

1. **Unzip** `sentinel-finance-ai.zip`
2. **Open** `index.html` in any modern browser (Chrome, Edge, Firefox, Safari)
3. **No server required** — runs fully client-side
4. The AI features (Fraud Analyzer, Advisory Chat) call the **Anthropic API** automatically

> ✅ Works offline for all UI. Anthropic API calls require internet.

---

## 📁 Project Structure

```
sentinel-finance-ai/
├── index.html              ← Main entry point (open this)
├── README.md               ← This file
├── css/
│   └── styles.css          ← Full dark theme stylesheet
├── js/
│   ├── data.js             ← Shared application data
│   ├── charts.js           ← Chart.js helpers
│   ├── app.js              ← Router & app controller
│   └── pages/
│       ├── dashboard.js    ← Security dashboard
│       ├── transactions.js ← Transaction monitor
│       ├── fraud.js        ← AI Fraud Analyzer (Anthropic API)
│       ├── darkweb.js      ← Dark web scanner
│       ├── alerts.js       ← Alert center + Risk + Compliance
│       ├── recovery.js     ← Scam recovery workflow
│       ├── analytics.js    ← Business analytics
│       ├── chat.js         ← AI advisor chat (Anthropic API)
│       ├── admin.js        ← Admin panel
│       └── settings.js     ← Settings + Plans
└── assets/                 ← (logos, icons — add here)
```

---

## 🎯 Features

### Core Security
| Feature | Description |
|---|---|
| 📊 **Dashboard** | Live fraud stats, revenue forecast, threat heatmap, alerts |
| 💳 **Transaction Monitor** | 10 sample transactions with risk scoring, filter, block & analyze |
| 🔍 **AI Fraud Analyzer** | Anthropic-powered analysis with progress indicator & scam pattern library |
| 🌑 **Dark Web Monitor** | Simulated scan across Tor, breach databases, criminal forums |
| 🚨 **Alert Center** | Categorised critical/warning/info alerts with resolve workflow |

### Phase 2 — Business Modules
| Feature | Description |
|---|---|
| ⚠️ **Risk Analysis** | 8-risk matrix with scores, mitigation plans, AI recommendations |
| 🏛️ **Compliance** | 10 regulations (CCPA, GLBA, SEC, FINRA, SOC2, AML, KYC, PCI DSS) |
| 🔄 **Scam Recovery** | 5-step guided recovery workflow with wire recall & AI case analysis |
| 📈 **Analytics** | MRR charts, user segments, fraud type distribution, KPI table |

### System
| Feature | Description |
|---|---|
| 🤖 **AI Advisor Chat** | Anthropic API-powered financial fraud expert chat |
| ⚙️ **Admin Panel** | Team directory, funding allocation, system status, milestones |
| 🔧 **Settings** | 10-toggle preferences, 2FA, account security, danger zone |
| ⭐ **Plans** | 3-tier pricing (Guardian $19 / Pro $49 / Elite $99) + investor CTA |

---

## 🤖 AI Integration

Two features use the **Anthropic API** (`claude-sonnet-4-20250514`):

### Fraud Analyzer
- Enter transaction details → AI assesses risk level (LOW/MEDIUM/HIGH/CRITICAL)
- Identifies scam pattern, red flags, and recommended action
- Endpoint: `POST https://api.anthropic.com/v1/messages`

### AI Advisor Chat
- Full conversational financial fraud expert
- Maintains 12-message context window
- System-prompted as US-certified fraud specialist

---

## 💰 Business Model (from Project Report)

| Plan | Price | Key Features |
|---|---|---|
| Guardian Basic | $19/mo | Scam bond, monitoring, basic fraud detection |
| Protector Pro | $49/mo | Risk recovery, scam recovery, 50 fraud analysts |
| Executive Elite | $99/mo | Dedicated advisor, BEC shield, SOC2 compliance |

---

## 📊 5-Year Revenue Projections

| Year | Revenue | Operating Cost |
|---|---|---|
| Year 1 | $50M | $60M |
| Year 2 | $132M | $80M |
| Year 3 | $291M | $110M |
| Year 4 | $384M | $140M |
| Year 5 | $500M | $170M |

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (no framework — zero dependencies to install)
- **Charts**: Chart.js 4.4.1 (CDN)
- **Fonts**: Google Fonts (Rajdhani + Share Tech Mono)
- **AI**: Anthropic Claude Sonnet (API)
- **Security Design**: ZK Encryption concept, AES-256, SOC2 roadmap

---

## 🚀 Deployment Options

### Static Hosting (Recommended)
Upload the entire folder to any static host:
- **Netlify**: Drag & drop the folder at netlify.com/drop
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Push to repo, enable Pages
- **AWS S3**: Upload as static website

### Local Server (Optional)
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# Then open: http://localhost:8080
```

---

## 📧 Contact & Investment

**Founder**: Aman Kumar Mahto  
**Company**: Sentinel Finance AI (AdivionInfotech)  
**Series A**: $10,000,000 USD  
**Email**: investors@sentinelfinance.ai  
**WhatsApp**: +91 9508919048

---

## ⚖️ Legal Notice

This is a **prototype** for demonstration and investor presentation purposes.  
All transaction data, user data, and scan results are **simulated**.  
Real deployment requires SEC/FINRA registration, SOC2 certification, and full legal compliance.

© 2026 Sentinel Finance AI — All Rights Reserved
