// Fast Fleet — interactions

// Sticky nav state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
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

// Scroll reveal + staggering within groups
const groups = ['.feature-grid', '.team-grid', '.timeline'];
groups.forEach((sel) => {
  document.querySelectorAll(`${sel} .reveal`).forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.08}s`);
  });
});

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

// Animate the adoption chart when it enters view
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
    { threshold: 0.35 }
  );
  chartObserver.observe(chart);
}

// Subtle parallax on ambient glows
const glowA = document.querySelector('.glow-a');
const glowB = document.querySelector('.glow-b');
if (glowA && glowB && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      glowA.style.transform = `translateY(${y * 0.08}px)`;
      glowB.style.transform = `translateY(${y * -0.06}px)`;
    },
    { passive: true }
  );
}
