/* Venture Forge — V6 homepage extras: steel heats up, seams draw, cards ignite */
(function () {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('.mv-card').forEach((c) => c.classList.add('in')); return; }

    // "When steel grows cold" — lines rise from a mask
    $$('.steel-h .ln').forEach((l) => { l.style.display = 'block'; l.style.overflow = 'hidden'; l.style.paddingBottom = '.08em'; });
    gsap.from('.steel-h .ln > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: .15, scrollTrigger: { trigger: '.steel-h', start: 'top 85%', once: true } });

    // The forge photo starts cold and grey, and heats to full colour as it scrolls in
    $$('.anvil img').forEach((img) => {
      gsap.fromTo(img, { filter: 'grayscale(1) brightness(.45) contrast(1.1)' }, { filter: 'grayscale(0) brightness(1) contrast(1)', ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top 90%', end: 'center 50%', scrub: true } });
      gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    // Gold seam under "Venture Forge built that environment."
    $$('.steel .built').forEach((b) => gsap.fromTo(b, { '--seam': '0%' }, { '--seam': '100%', ease: 'none', scrollTrigger: { trigger: b, start: 'top 90%', end: 'top 55%', scrub: true } }));

    // Movement cards ignite their gold top bar on entry
    $$('.mv-card').forEach((c) => ScrollTrigger.create({ trigger: c, start: 'top 82%', once: true, onEnter: () => c.classList.add('in') }));

    // Vision image drifts
    $$('.vsplit .pic img').forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') setTimeout(run, 0); else addEventListener('load', () => setTimeout(run, 0));
})();
