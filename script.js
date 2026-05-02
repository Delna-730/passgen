/* ─── Character Sets ──────────────────────────────────── */
const CHARS = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/* ─── State ───────────────────────────────────────────── */
const state = { upper: true, lower: true, numbers: true, symbols: true };
let cur = '';
const hist = [];
let isDay = false;

/* ─── DOM ─────────────────────────────────────────────── */
const lenSlider = document.getElementById('len');

lenSlider.addEventListener('input', () => {
  document.getElementById('lenval').textContent = lenSlider.value;
  generate();
});

/* ─── Theme Toggle ────────────────────────────────────── */
function toggleTheme() {
  isDay = !isDay;
  document.body.classList.toggle('day', isDay);
  document.body.classList.toggle('night', !isDay);
  document.getElementById('theme-icon').textContent  = isDay ? '☀' : '☾';
  document.getElementById('theme-label').textContent = isDay ? 'Day' : 'Night';
}

/* ─── Toggle Character Set ────────────────────────────── */
function toggle(el) {
  const k = el.dataset.key;
  if (state[k] && Object.values(state).filter(v => v).length <= 1) return;
  state[k] = !state[k];
  el.classList.toggle('active', state[k]);
  document.getElementById('sw-' + k).classList.toggle('on', state[k]);
  generate();
}

/* ─── Generate Password ───────────────────────────────── */
function generate() {
  let pool = '';
  const guaranteed = [];

  for (const [k, v] of Object.entries(state)) {
    if (v) {
      pool += CHARS[k];
      guaranteed.push(CHARS[k][Math.floor(Math.random() * CHARS[k].length)]);
    }
  }

  if (!pool) return;

  const len = parseInt(lenSlider.value);
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);

  let pwd = guaranteed.slice(0, len).map(c => c);
  while (pwd.length < len) pwd.push(pool[arr[pwd.length] % pool.length]);

  // Fisher-Yates shuffle
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }

  cur = pwd.join('');
  const out = document.getElementById('output');
  out.textContent = cur;
  out.classList.remove('ph');

  updateStrength(cur);
  addHistory(cur);
}

/* ─── Strength Meter ──────────────────────────────────── */
function updateStrength(p) {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (p.length >= 20) s++;
  if (/[A-Z]/.test(p))        s++;
  if (/[a-z]/.test(p))        s++;
  if (/[0-9]/.test(p))        s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;

  const levels = [
    { m: 0, l: 'very weak',   w: '14%',  c: '#E24B4A' },
    { m: 2, l: 'weak',        w: '30%',  c: '#EF9F27' },
    { m: 4, l: 'fair',        w: '55%',  c: '#FAC775' },
    { m: 5, l: 'strong',      w: '75%',  c: '#5DCAA5' },
    { m: 6, l: 'very strong', w: '100%', c: '#1D9E75' },
  ];

  let lv = levels[0];
  for (const l of levels) if (s >= l.m) lv = l;

  document.getElementById('sfill').style.width      = lv.w;
  document.getElementById('sfill').style.background = lv.c;
  document.getElementById('slbl').textContent        = lv.l;
}

/* ─── History ─────────────────────────────────────────── */
function addHistory(p) {
  hist.unshift(p);
  if (hist.length > 5) hist.pop();
  renderHistory();
}

function renderHistory() {
  const el = document.getElementById('hlist');
  if (!hist.length) {
    el.innerHTML = '<div class="hempty">no history yet</div>';
    return;
  }
  el.innerHTML = hist.map((p, i) => `
    <div class="hi">
      <span class="hi-num">${i + 1}</span>
      <span class="hi-pwd">${p}</span>
      <button class="hi-cp" onclick="copyHistory(${i}, this)">copy</button>
    </div>
  `).join('');
}

function copyHistory(i, btn) {
  navigator.clipboard.writeText(hist[i]).then(() => {
    btn.textContent = 'done';
    setTimeout(() => btn.textContent = 'copy', 1200);
  });
}

/* ─── Copy Main Password ──────────────────────────────── */
function copyPwd() {
  if (!cur) return;
  navigator.clipboard.writeText(cur).then(() => {
    const b = document.getElementById('copybtn');
    b.textContent = 'Copied';
    b.classList.add('ok');
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('ok'); }, 1500);
  });
}