// Fast Fleet — interactions

// Hero "Fleet" toggle — crossfade between background images
const heroToggle = document.getElementById('heroToggle');
const heroEl = document.getElementById('home');
heroToggle?.addEventListener('click', () => {
  const on = heroEl.classList.toggle('is-on');
  heroToggle.setAttribute('aria-checked', String(on));
  heroToggle.setAttribute('aria-label', on ? 'Turn Fleet off' : 'Turn Fleet on');
});

// Sticky nav state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#navLinks a').forEach((a) =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Stagger within grouped reveals
['.feature-grid', '.team-grid', '.cases'].forEach((sel) => {
  document.querySelectorAll(`${sel} .reveal`).forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.07}s`);
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animate adoption chart when it scrolls into view
const chart = document.getElementById('chart');
if (chart) {
  const chartObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chart.classList.add('animate');
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  chartObserver.observe(chart);
}

// Feature flip cards — hover flips on desktop (CSS); tap flips on touch; keyboard toggles
const noHover = window.matchMedia('(hover: none)').matches;
document.querySelectorAll('.feature').forEach((f) => {
  if (noHover) f.addEventListener('click', () => f.classList.toggle('flipped'));
  f.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      f.classList.toggle('flipped');
    }
  });
});

// Case study — click a tile to expand it, others collapse to switchable chips; X closes
const cases = document.getElementById('cases');
if (cases) {
  const items = [...cases.querySelectorAll('.case')];
  const close = () => {
    cases.classList.remove('is-open');
    items.forEach((c) => c.classList.remove('active'));
  };
  items.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.case-close')) {
        e.stopPropagation();
        close();
        return;
      }
      cases.classList.add('is-open');
      items.forEach((c) => c.classList.toggle('active', c === el));
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cases.classList.contains('is-open')) close();
  });
}
