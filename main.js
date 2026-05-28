// Fast Fleet — interactions

// Hero "Fleet" toggle — crossfade between background images
const heroToggle = document.getElementById('heroToggle');
const heroEl = document.getElementById('home');
heroToggle?.addEventListener('click', () => {
  const on = heroEl.classList.toggle('is-on');
  heroToggle.setAttribute('aria-checked', String(on));
  heroToggle.setAttribute('aria-label', on ? 'Turn Fast Fleet off' : 'Turn Fast Fleet on');
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
['.feature-grid', '.team-grid'].forEach((sel) => {
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

// Timeline — click a card to expand details over the timeline; X (or Escape) closes
const timeline = document.getElementById('timeline');
if (timeline) {
  const detail = timeline.querySelector('.t-detail');
  const detailTime = detail.querySelector('.t-detail-time');
  const detailTitle = detail.querySelector('.t-detail-title');
  const detailDesc = detail.querySelector('.t-detail-desc');
  const closeBtn = detail.querySelector('.t-detail-close');

  const open = (item) => {
    detailTime.textContent = item.dataset.time;
    detailTitle.textContent = item.dataset.title;
    detailDesc.textContent = item.dataset.desc;
    detail.hidden = false;
    timeline.classList.add('is-open');
  };
  const close = () => {
    timeline.classList.remove('is-open');
    detail.hidden = true;
  };

  timeline.querySelectorAll('.t-item').forEach((item) => {
    item.querySelector('.t-card').addEventListener('click', () => open(item));
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && timeline.classList.contains('is-open')) close();
  });
}
