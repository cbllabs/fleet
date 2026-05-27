// Fast Fleet — interactions

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
['.feature-grid', '.team-grid', '.timeline'].forEach((sel) => {
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
