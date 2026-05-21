/* js/pages/chat.js */

let chatHistory = [];

const QUICK_ASKS = [
  'Is this wire transfer safe?',
  'How to spot pig butchering?',
  'What are BEC red flags?',
  'How to freeze my credit?',
  'Romance scam warning signs',
  'Recover from wire fraud',
  'What is vishing?',
  'Crypto investment scam signs',
];

function renderChat() {
  chatHistory = [{
    role: 'assistant',
    content: `Hello! I'm your Sentinel Finance AI advisor — a US-certified fraud prevention specialist.

I can help you with:
• Identifying and avoiding financial scams
• Analyzing suspicious transactions or communications  
• Understanding fraud patterns (BEC, pig butchering, romance scams)
• Wire fraud recovery guidance
• Credit protection and dark web monitoring

How can I protect you today?`
  }];

  return `
  <div class="chat-wrap">
    <div class="card chat-panel">
      <div class="chat-header">
        <div class="chat-avatar">🤖</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text);">Sentinel AI Advisor</div>
          <div style="font-size:10px;color:var(--green);display:flex;align-items:center;gap:4px;">
            <span class="status-dot" style="width:5px;height:5px;"></span> Online · US-Certified Fraud Expert
          </div>
        </div>
        <div style="margin-left:auto;">
          <button class="btn btn-outline btn-sm" onclick="clearChat()">Clear Chat</button>
        </div>
      </div>

      <div class="chat-msgs" id="chat-msgs">
        <div class="chat-bubble chat-ai">
          <div class="chat-sender">SENTINEL AI</div>
          Hello! I'm your Sentinel Finance AI advisor — a US-certified fraud prevention specialist.<br><br>
          I can help you with:<br>
          • Identifying and avoiding financial scams<br>
          • Analyzing suspicious transactions or communications<br>
          • Understanding fraud patterns (BEC, pig butchering, romance scams)<br>
          • Wire fraud recovery guidance<br>
          • Credit protection and dark web monitoring<br><br>
          How can I protect you today?
        </div>
      </div>

      <div class="chat-footer">
        <input class="inp" id="chat-input"
          placeholder="Ask about fraud, scams, security, recovery..."
          onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();sendChat();}"
          style="flex:1;" />
        <button class="btn btn-cyan" onclick="sendChat()" id="chat-send">Send ➤</button>
      </div>
    </div>

    <div class="chat-sidebar">
      <div class="card">
        <div class="section-title mb-10">💡 Quick Questions</div>
        ${QUICK_ASKS.map(q => `
        <div class="quick-ask-item" onclick="askQuick('${q}')">${q}</div>`).join('')}
      </div>

      <div class="card">
        <div class="section-title mb-10">🛡️ Your Protection Status</div>
        ${[
          ['Real-time Monitoring', '✓ Active',   'green'],
          ['AI Fraud Engine',      '✓ Active',   'green'],
          ['Dark Web Monitor',     '⚠ 1 Leak',  'amber'],
          ['Risk Recovery',        '✓ Included', 'cyan'],
          ['Scam Recovery',        '✓ Included', 'cyan'],
          ['Investment Safety',    '✓ Active',   'cyan'],
        ].map(([l,v,c]) => `
        <div class="stat-row">
          <div class="stat-label" style="font-size:11px;">${l}</div>
          <div class="stat-val" style="color:var(--${c});font-size:11px;">${v}</div>
        </div>`).join('')}
        <button class="btn btn-cyan btn-full btn-sm" style="margin-top:10px;" onclick="APP.go('plans')">⬆ Upgrade Plan</button>
      </div>
    </div>
  </div>`;
}

function askQuick(q) {
  const inp = document.getElementById('chat-input');
  if (inp) { inp.value = q; sendChat(); }
}

function clearChat() {
  chatHistory = [];
  const msgs = document.getElementById('chat-msgs');
  if (msgs) msgs.innerHTML = `<div class="chat-bubble chat-ai"><div class="chat-sender">SENTINEL AI</div>Chat cleared. How can I help you?</div>`;
}

async function sendChat() {
  const inp = document.getElementById('chat-input');
  const msg = inp?.value?.trim();
  if (!msg) return;
  inp.value = '';

  const btn = document.getElementById('chat-send');
  if (btn) btn.disabled = true;

  const msgs = document.getElementById('chat-msgs');
  msgs.innerHTML += `
  <div class="chat-bubble chat-user fade-in">
    <div class="chat-sender">YOU</div>${msg}
  </div>`;

  const typingId = 'typing-' + Date.now();
  msgs.innerHTML += `
  <div class="chat-bubble chat-ai fade-in" id="${typingId}">
    <div class="chat-sender">SENTINEL AI</div>
    <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
  </div>`;
  msgs.scrollTop = msgs.scrollHeight;

  chatHistory.push({ role: 'user', content: msg });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 700,
        system: `You are a US-certified senior financial fraud expert and AI advisor at Sentinel Finance AI. 
You help wealthy individuals and seniors protect their assets from scams, wire fraud, BEC attacks, and cybercrime.
Be concise, professional, warm, and specific. Use bullet points for lists. Max 200 words.
Always end with a practical next step the user can take today.`,
        messages: chatHistory.slice(-12)
      })
    });
    const data = await res.json();
    const reply = data.content[0].text;
    chatHistory.push({ role: 'assistant', content: reply });

    const bubble = document.getElementById(typingId);
    if (bubble) bubble.innerHTML = `<div class="chat-sender">SENTINEL AI</div>${reply.replace(/\n/g, '<br>')}`;
  } catch(e) {
    const bubble = document.getElementById(typingId);
    if (bubble) bubble.innerHTML = `<div class="chat-sender">SENTINEL AI</div>
I'm ready to help! Key fraud protection rules:<br>
• <strong>Never</strong> wire money to someone you haven't met in person<br>
• <strong>Never</strong> buy gift cards when asked by anyone over the phone<br>
• <strong>Always</strong> call back on the official number to verify requests<br>
• Any investment promising guaranteed returns is a scam<br><br>
What specific situation can I help you with?`;
  }

  msgs.scrollTop = msgs.scrollHeight;
  if (btn) btn.disabled = false;
}
