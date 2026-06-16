// Here's your fixed JS — replace your current script with this
/* ─── STARS ─── */
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top  = Math.random() * 100 + 'vh';
  star.style.setProperty('--dur',   (2 + Math.random() * 3) + 's');
  star.style.setProperty('--delay', (Math.random() * 4) + 's');
  starsContainer.appendChild(star);
}

/* ─── LOGIN ─── */
function enterSite() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainSite').classList.add('visible');
}

/* ─── NAVBAR TOGGLE ─── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.section-inner, .project-card, .link-card, .faq-item, .timeline-item');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ─── FAQ ─── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

/* ═══════════════════════════════════════════
   👤 CORNER PHOTO WIDGET
═══════════════════════════════════════════ */

const catStyle = document.createElement('style');
catStyle.textContent = `
  /* ─── CORNER PHOTO ─── */
  #corner-photo-wrap {
    position: fixed;
    bottom: 18px;
    right: 22px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    cursor: default;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  #corner-photo-bubble {
    background: rgba(15,15,18,0.92);
    border: 1px solid rgba(232,201,138,0.35);
    backdrop-filter: blur(12px);
    color: #e8c98a;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
    margin-bottom: 6px;
    position: relative;
  }

  #corner-photo-bubble::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(232,201,138,0.35);
  }

  #corner-photo-wrap:hover #corner-photo-bubble {
    opacity: 1;
    transform: translateY(0);
  }

  #corner-photo-img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid rgba(232,201,138,0.5);
    object-fit: cover;
    object-position: top center;
    transition: border-color 0.25s, transform 0.25s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.45);
    animation: cornerBob 4s ease-in-out infinite;
  }

  #corner-photo-wrap:hover #corner-photo-img {
    border-color: #e8c98a;
    transform: scale(1.07);
    animation: none;
  }

  @keyframes cornerBob {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-4px); }
  }

  /* ─── MUSIC PLAYER ─── */
  #music-player {
    position: fixed;
    bottom: 18px;
    left: 22px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(15,15,18,0.88);
    border: 1px solid rgba(232,201,138,0.25);
    backdrop-filter: blur(12px);
    padding: 0.5rem 0.9rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    color: #a09d96;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    user-select: none;
  }

  #music-player:hover {
    border-color: rgba(232,201,138,0.6);
    color: #e8c98a;
  }

  #music-player .music-icon {
    font-size: 0.85rem;
    color: #e8c98a;
    animation: musicPulse 1.5s ease-in-out infinite;
  }

  #music-player.paused .music-icon {
    animation: none;
    opacity: 0.5;
  }

  @keyframes musicPulse {
    0%, 100% { transform: scale(1);    opacity: 1; }
    50%       { transform: scale(1.2); opacity: 0.7; }
  }
`;
document.head.appendChild(catStyle);

/* ── CORNER PHOTO WIDGET ── */
const messages = [
  "one call away ☎",
  "hi, i'm zack 👋",
  "always one call away",
  "pisces energy ♓",
  "iskolar ng bayan",
  "PUP Parañaque · BSIT",
  "let's build something ↗",
];
let msgIndex = 0;

const cornerWrap = document.createElement('div');
cornerWrap.id = 'corner-photo-wrap';

const bubble = document.createElement('div');
bubble.id = 'corner-photo-bubble';
bubble.textContent = messages[0];

const cornerImg = document.createElement('img');
cornerImg.id = 'corner-photo-img';
cornerImg.src = 'images/Formal-Picture.jpg';
cornerImg.alt = 'zack';

cornerWrap.appendChild(bubble);
cornerWrap.appendChild(cornerImg);
document.body.appendChild(cornerWrap);

cornerWrap.addEventListener('mouseenter', () => {
  msgIndex = (msgIndex + 1) % messages.length;
  bubble.textContent = messages[msgIndex];
});

/* tap to cycle messages on mobile */
cornerWrap.addEventListener('click', () => {
  msgIndex = (msgIndex + 1) % messages.length;
  bubble.textContent = messages[msgIndex];
});

/* mobile only — hide when scrolled down, reappear when back near the top */
(function () {
  const THRESHOLD = 80;
  let hidden = false;

  window.addEventListener('scroll', () => {
    // do nothing on desktop (769px and above)
    if (window.innerWidth >= 769) return;

    if (window.scrollY > THRESHOLD && !hidden) {
      cornerWrap.style.opacity = '0';
      cornerWrap.style.transform = 'translateY(12px)';
      cornerWrap.style.pointerEvents = 'none';
      hidden = true;
    } else if (window.scrollY <= THRESHOLD && hidden) {
      cornerWrap.style.opacity = '1';
      cornerWrap.style.transform = 'translateY(0)';
      cornerWrap.style.pointerEvents = 'auto';
      hidden = false;
    }
  }, { passive: true });
})();

/* ═══════════════════════════════════════════
   🎵 MUSIC PLAYER
═══════════════════════════════════════════ */
const YOUTUBE_URL = '';

let musicPlaying = false;
let ytPlayer = null;

if (YOUTUBE_URL) {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}
window.onYouTubeIframeAPIReady = function () {
  const videoId = YOUTUBE_URL.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
  if (!videoId) return;

  const ytDiv = document.createElement('div');
  ytDiv.id = 'yt-hidden';
  ytDiv.style.cssText = 'position:fixed;bottom:-9999px;left:-9999px;width:1px;height:1px;';
  document.body.appendChild(ytDiv);

  ytPlayer = new YT.Player('yt-hidden', {
    videoId,
    playerVars: { autoplay: 0, loop: 1, playlist: videoId },
    events: {
      onReady: () => { ytPlayer.setVolume(40); }
    }
  });
}

/* ═══════════════════════════════════════════
   NEW FEATURES JS
═══════════════════════════════════════════ */

/* ─── LOGIN with username/password ─── */
// Each entry below is one valid way to log in.
// Add as many as you want — one row each.
const VALID_LOGINS = [
  { user: 'zack',      pass: 'pisces' },     // your own login
  { user: 'professor', pass: 'guest2026' },  // give this one to your prof
];

const loginForm = document.getElementById('loginForm');
const loginUser = document.getElementById('loginUser');
const loginPass = document.getElementById('loginPass');
const loginError = document.getElementById('loginError');
const loginBox = document.querySelector('.login-box');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = loginUser.value.trim().toLowerCase();
  const p = loginPass.value;

  const isValid = VALID_LOGINS.some(cred => cred.user === u && cred.pass === p);

  if (isValid) {
    enterSite();
  } else {
    loginError.classList.add('show');
    loginBox.classList.remove('shake');
    requestAnimationFrame(() => loginBox.classList.add('shake'));
    setTimeout(() => loginBox.classList.remove('shake'), 400);
  }
});

/* ─── THEME TOGGLE ─── */
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☾';
  } else {
    document.body.classList.remove('light');
    themeToggle.textContent = '☼';
  }
}

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

applyTheme('dark');

/* ─── TYPING ANIMATION ─── */
const typingPhrases = [
  'iskolar ng bayan',
  'team leader',
  'qa tester',
  'pisces ♓'
];

const typingEl = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = typingPhrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = phrase.slice(0, charIndex) + (phraseIndex < typingPhrases.length - 1 ? ' · ' : '');
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

typeLoop();

/* ─── PROJECT FILTER BAR ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const filterEmpty = document.getElementById('filterEmpty');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    projectCards.forEach(card => {
      const tags = card.dataset.tags;
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hide');
        visibleCount++;
      } else {
        card.classList.add('hide');
      }
    });

    filterEmpty.classList.toggle('show', visibleCount === 0);
  });
});

/* ─── COPY EMAIL ─── */
const copyEmailBtn = document.getElementById('copyEmail');
const copyHint = document.getElementById('copyHint');

copyEmailBtn.addEventListener('click', () => {
  const email = copyEmailBtn.dataset.email;
  navigator.clipboard.writeText(email).then(() => {
    copyEmailBtn.classList.add('copied');
    copyHint.textContent = 'copied! ✓';
    setTimeout(() => {
      copyEmailBtn.classList.remove('copied');
      copyHint.textContent = 'click to copy ↗';
    }, 1800);
  }).catch(() => {
    copyHint.textContent = 'copy failed — try manually';
  });
});

/* ─── BACK TO TOP ─── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ═══════════════════════════════════════════
   V2 FEATURES JS
═══════════════════════════════════════════ */

/* ─── INTRO TYPING ─── */
const introTyping = document.getElementById('introTyping');
const introScreen = document.getElementById('introScreen');
const introFullText = "hi, i'm zack.";
let introIndex = 0;

function introTypeStep() {
  if (introIndex <= introFullText.length) {
    introTyping.textContent = introFullText.slice(0, introIndex);
    introIndex++;
    setTimeout(introTypeStep, 80);
  } else {
    setTimeout(() => {
      introScreen.classList.add('hidden');
    }, 500);
  }
}
introTypeStep();

/* ─── CURSOR GLOW ─── */
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  cursorGlow.classList.add('show');
});

document.addEventListener('mouseleave', () => {
  cursorGlow.classList.remove('show');
});

/* ─── ACTIVE NAV HIGHLIGHT (scroll-spy) ─── */
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(sec => navObserver.observe(sec));

/* ─── SKILL BARS (animate on scroll) ─── */
const skillBars = document.querySelectorAll('.skill-bar');

skillBars.forEach(bar => {
  bar.style.setProperty('--fill', bar.dataset.level + '%');
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ─── PROJECT MODAL ─── */
const projectData = {
  pupet: {
    img: 'images/PUPET TASK MANAGER.png',
    num: '01',
    title: 'PUPET Task Manager',
    desc: 'A task management system designed to help students organize tasks, monitor deadlines, and manage workloads efficiently. Improves productivity through structured task tracking and a user-friendly interface.',
    tags: ['student tool', 'productivity'],
    extra: '<strong>role:</strong> team leader, QA tester<br><strong>focus:</strong> task tracking, deadline reminders, workload views<br><strong>stack:</strong> built as part of group coursework'
  },
  attendance: {
    img: 'images/PROJECT.png',
    num: '02',
    title: 'Attendance Checker System',
    desc: 'A digital attendance monitoring system that records student time-in and time-out automatically. Includes authentication features and accurate attendance tracking for better monitoring and record keeping.',
    tags: ['automation', 'authentication'],
    extra: '<strong>role:</strong> QA tester<br><strong>focus:</strong> automated time-in/time-out logging, login authentication<br><strong>stack:</strong> built as part of group coursework'
  },
  prefix: {
    img: 'images/PREFIX-TO-INFIX-CONVERSION-PROJECT.png',
    num: '03',
    title: 'Prefix to Infix Conversion',
    desc: 'A program that converts prefix expressions into infix expressions using stack data structures. Demonstrates knowledge in algorithms, expression parsing, and data structure implementation.',
    tags: ['algorithms', 'data structures'],
    extra: '<strong>focus:</strong> expression parsing, stack-based evaluation<br><strong>concepts:</strong> algorithms, data structures'
  },
  jeepney: {
    img: 'images/JEEPNEY-SIMULATOR.png',
    num: '04',
    title: 'PUJ Fuel Consumption Simulator',
    desc: 'A physics-based simulation of fuel consumption across driving behaviors (Aggressive, Moderate, Eco) for Public Utility Jeepneys in Parañaque City. Models an Isuzu 4JB1 diesel engine across four real routes with a Streamlit-connected web frontend.',
    tags: ['simulation', 'python'],
    extra: '<strong>role:</strong> team leader<br><strong>focus:</strong> fuel consumption modeling, driving behavior analysis, route simulation<br><strong>stack:</strong> Python, Streamlit, HTML/CSS/JS<br><strong>routes:</strong> 4 PUJ routes in Parañaque City<br><strong>engine model:</strong> Isuzu 4JB1 diesel'
  }
};

const projectModal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalNum = document.getElementById('modalNum');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalExtra = document.getElementById('modalExtra');

document.querySelectorAll('.project-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.open;
    const data = projectData[key];
    if (!data) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalNum.textContent = data.num;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalTags.innerHTML = data.tags.map(t => `<span class="ptag">${t}</span>`).join('');
    modalExtra.innerHTML = data.extra;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('open')) {
    closeModal();
  }
});

/* ─── KEYBOARD SHORTCUTS (1-7 to jump sections) ─── */
const sectionOrder = ['home', 'about', 'skills', 'journey', 'projects', 'links', 'faq', 'contact'];

document.addEventListener('keydown', (e) => {
  // ignore if typing in an input or modal open
  const active = document.activeElement;
  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
  if (projectModal.classList.contains('open')) return;

  const num = parseInt(e.key, 10);
  if (num >= 1 && num <= 8) {
    const target = document.getElementById(sectionOrder[num - 1]);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

/* ═══════════════════════════════════════════
   V3 FEATURES JS
═══════════════════════════════════════════ */

/* ─── REALTIME PH CLOCK ─── */
const navClock = document.getElementById('navClock');

function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  navClock.textContent = formatted + ' PHT';
}

updateClock();
setInterval(updateClock, 1000);

/* ─── STATS COUNTER (animate on scroll) ─── */
const statCounts = document.querySelectorAll('.stat-count');

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const noFormat = el.dataset.noFormat === 'true';
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = (noFormat ? value : value.toLocaleString()) + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statCounts.forEach(el => animateCount(el));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsStrip = document.getElementById('statsStrip');
if (statsStrip) statsObserver.observe(statsStrip);

/* ─── PROJECT IMAGE CLICK: POP SOUND + ZOOM ─── */
let audioCtx = null;

function playPop() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(820, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (err) {
    // audio not supported / blocked — fail silently
  }
}

document.querySelectorAll('.project-img').forEach(imgWrap => {
  imgWrap.addEventListener('click', () => {
    playPop();
    imgWrap.classList.remove('pop-effect');
    requestAnimationFrame(() => imgWrap.classList.add('pop-effect'));
    setTimeout(() => imgWrap.classList.remove('pop-effect'), 400);
  });
});
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const bgMusic = document.getElementById('bgMusic');
let musicOn = false;

musicToggle.addEventListener('click', () => {
  if (musicOn) {
    bgMusic.pause();
    musicLabel.textContent = 'play music';
    musicToggle.classList.remove('playing');
  } else {
    bgMusic.play();
    musicLabel.textContent = 'now playing ♪';
    musicToggle.classList.add('playing');
  }
  musicOn = !musicOn;
});