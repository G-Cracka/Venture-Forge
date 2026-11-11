/* Venture Forge — V1 Refresh: chrome, renderers, motion */
(function () {
  const VF = window.VF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const page = location.pathname.split('/').pop() || 'index.html';
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Header / footer ---------- */
  const navLinks = VF.nav.filter(([h]) => h !== 'index.html')
    .map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="wrap bar">
      <a class="logo" href="index.html" aria-label="Venture Forge Austin — home"><img src="${VF.IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"></a>
      <nav class="nav" aria-label="Primary">${navLinks}<a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></nav>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    </div>`;
  document.body.prepend(header);
  const mnav = document.createElement('nav');
  mnav.className = 'mobile-nav'; mnav.setAttribute('aria-label', 'Mobile');
  mnav.innerHTML = VF.nav.map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('') +
    `<a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register <span class="arr">→</span></a>`;
  header.after(mnav);
  const mb = $('.menu-btn', header);
  mb.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    mb.setAttribute('aria-expanded', open);
    open ? window.lenis?.stop() : window.lenis?.start();
  });

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="brand">
          <img src="${VF.IMG}logos/vf-logo-white.png" alt="Venture Forge Austin">
          <p><b>Investing in innovation. <em>Forging</em> eternal impact.</b>An invitation-only summit convening investors, founders, and philanthropists in Austin, Texas.</p>
        </div>
        <div><h5>Explore</h5><ul>
          <li><a href="2026-event.html">2026 Event</a></li><li><a href="speakers.html">Speakers</a></li>
          <li><a href="vision.html">Vision</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
        <div><h5>Engage</h5><ul>
          <li><a href="partner.html">Partner</a></li>
          <li><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></li>
          <li><a href="${VF.links.chat}" target="_blank" rel="noopener">Event Chat</a></li></ul></div>
      </div>
      <div class="bottom"><span>© 2026 Venture-Forge Austin. All rights reserved.</span><span>Austin, Texas · September 23–24, 2026</span></div>
    </div>
    <div class="giant" aria-hidden="true">Venture Forge</div>`;
  document.body.append(footer);

  /* ---------- Renderers ---------- */
  const speakerCard = (s) => `
    <button class="speaker" type="button" aria-label="${esc(s.name)} — read bio">
      <div class="ph frame">
        ${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ''}
        <img src="${s.img}" alt="${esc(s.name)}" loading="lazy">
        ${s.bio ? `<div class="bio"><p>${esc(s.bio)}</p></div>` : ''}
      </div>
      <div class="meta"><div><h4>${esc(s.name)}</h4><p class="org">${esc(s.org)}</p></div>${s.bio ? '<span class="plus" aria-hidden="true">+</span>' : ''}</div>
    </button>`;

  $$('[data-render="speakers-rail"]').forEach((el) => { el.innerHTML = VF.speakers.map(speakerCard).join(''); });
  $$('[data-render="speakers-grid"]').forEach((el) => { el.innerHTML = VF.speakers.map(speakerCard).join(''); });
  $$('.speaker').forEach((b) => b.addEventListener('click', () => { if (b.closest('.rail.dragged')) return; b.classList.toggle('open'); }));

  $$('[data-render="showcase-logos"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `<a href="${c.url}" target="_blank" rel="noopener" aria-label="${esc(c.name)}"><img src="${c.logo}" alt="${esc(c.name)}" loading="lazy"></a>`).join('');
  });
  $$('[data-render="showcase-cards"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `
      <a class="sc-card" href="${c.url}" target="_blank" rel="noopener" data-reveal>
        <div class="lg"><img src="${c.logo}" alt="" loading="lazy"></div>
        <h4>${esc(c.name)}</h4><p>${esc(c.people)}</p><span class="link-arrow">Visit site <span>→</span></span>
      </a>`).join('');
  });
  $$('[data-render="partners-marquee"]').forEach((el) => {
    const row = VF.partners.map((p) => `<img src="${p.logo}" alt="${esc(p.name)}" loading="lazy">`).join('');
    el.innerHTML = `<div class="track">${row}${row.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"')}</div>`;
  });
  $$('[data-render="logo-wall"]').forEach((el) => {
    el.innerHTML = VF.partners.map((p) => p.url
      ? `<a href="${p.url}" target="_blank" rel="noopener"><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></a>`
      : `<div><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>`).join('');
  });
  $$('[data-render="schedule"]').forEach((el) => {
    el.innerHTML = VF.schedule.map((d) => `
      <div class="day" data-reveal><h3>${esc(d.day)}</h3><p class="theme">${esc(d.theme)}</p>
      <ol>${d.items.map(([t, s]) => `<li><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol></div>`).join('');
  });
  $$('[data-render="tiers"]').forEach((el) => {
    el.innerHTML = VF.tiers.map((t, i) => `
      <article class="tier${i === 0 ? ' featured' : ''}" data-reveal>
        ${t.reserved ? '<span class="badge">Reserved</span>' : ''}
        <h3>${esc(t.name)}</h3><div class="price">${t.price}</div>
        <ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <a class="btn${t.reserved ? ' btn--ghost' : ''}" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship</a>
      </article>`).join('');
  });
  $$('[data-render="faith"]').forEach((el) => { el.innerHTML = VF.faith.map((f) => `<li data-reveal>${esc(f)}</li>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => {
    el.innerHTML = VF.faq.map(([q, a], i) => `
      <div class="faq-item${i === 0 ? ' open' : ''}" data-reveal>
        <button type="button" aria-expanded="${i === 0}"><span class="n">0${i + 1}</span><h3>${esc(q)}</h3><span class="pm" aria-hidden="true"></span></button>
        <div class="ans"><div><p>${esc(a)}</p></div></div>
      </div>`).join('');
    $$('.faq-item button', el).forEach((b) => b.addEventListener('click', () => {
      const it = b.parentElement; const open = it.classList.toggle('open'); b.setAttribute('aria-expanded', open);
      setTimeout(() => window.ScrollTrigger?.refresh(), 650);
    }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* ---------- Rail (drag + arrows + progress) ---------- */
  $$('.rail').forEach((rail) => {
    let down = false, sx = 0, sl = 0, moved = 0;
    rail.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('dragging'); });
    window.addEventListener('pointerup', () => { if (!down) return; down = false; rail.classList.remove('dragging'); if (moved > 6) { rail.classList.add('dragged'); setTimeout(() => rail.classList.remove('dragged'), 50); } });
    window.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; moved = Math.abs(dx); rail.scrollLeft = sl - dx; });
    const wrap = rail.closest('section');
    const bar = $('.rail-progress i', wrap);
    const upd = () => { if (!bar) return; const max = rail.scrollWidth - rail.clientWidth; const vis = rail.clientWidth / rail.scrollWidth; bar.style.width = vis * 100 + '%'; bar.style.left = (max ? rail.scrollLeft / max : 0) * (100 - vis * 100) + '%'; };
    rail.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    $$('.rail-ctrl button', wrap).forEach((b) => b.addEventListener('click', () => {
      const card = rail.querySelector('.speaker'); const step = card ? card.offsetWidth + 20 : 300;
      rail.scrollBy({ left: b.dataset.dir === 'next' ? step * 2 : -step * 2, behavior: 'smooth' });
    }));
  });

  /* ---------- Embers ---------- */
  function embers(canvas, density = 1) {
    const ctx = canvas.getContext('2d'); let w, h, parts = [], dpr = Math.min(devicePixelRatio, 2), run = true;
    const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const spawn = (y) => ({ x: Math.random() * w, y: y ?? h + 10, r: Math.random() * 1.8 + .4, vy: -(Math.random() * .7 + .25), vx: (Math.random() - .5) * .3, life: 0, max: 300 + Math.random() * 400, ph: Math.random() * 6 });
    size(); addEventListener('resize', size);
    const N = Math.round((w * h) / 16000 * density);
    for (let i = 0; i < N; i++) parts.push(spawn(Math.random() * h));
    new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) loop(); }).observe(canvas);
    function loop() {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.life++; p.x += p.vx + Math.sin((p.life + p.ph * 50) / 40) * .25; p.y += p.vy;
        const a = Math.sin(Math.min(p.life / p.max, 1) * Math.PI);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(255,${170 + Math.round(p.r * 30)},80,${a * .85})`;
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,170,60,.9)'; ctx.fill();
        if (p.life > p.max || p.y < -10) Object.assign(p, spawn());
      }
      requestAnimationFrame(loop);
    }
  }
  if (!reduce) $$('canvas.embers').forEach((c) => embers(c, +c.dataset.density || 1));

  /* ---------- Header behaviour ---------- */
  let lastY = 0;
  const onScroll = (y) => {
    header.classList.toggle('scrolled', y > 40);
    header.classList.toggle('hide', y > 500 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
  };

  /* ---------- Motion ---------- */
  function motion() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('[data-reveal]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); addEventListener('scroll', () => onScroll(scrollY), { passive: true }); return; }
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

    // Hero headline: masked line rise
    const lines = $$('.hero h1 .line > span, .page-hero h1 .line > span');
    if (lines.length) gsap.from(lines, { yPercent: 110, rotate: 2, duration: 1.4, ease: 'expo.out', stagger: .12, delay: .15 });
    gsap.from('.hero .eyebrow, .page-hero .eyebrow', { opacity: 0, x: -20, duration: 1, delay: .1 });
    gsap.from('.hero .tagline, .hero .lede, .hero .btn-row, .page-hero .lede, .page-hero .btn-row', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .7 });
    // Hero video parallax + slight zoom out
    $$('.hero video, .hero .hero-img').forEach((v) => gsap.fromTo(v, { scale: 1.12 }, { scale: 1, yPercent: 12, ease: 'none', scrollTrigger: { trigger: v.parentElement, start: 'top top', end: 'bottom top', scrub: true } }));
    $$('.hero .wrap').forEach((w) => gsap.to(w, { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: w.parentElement, start: 'top top', end: 'bottom top', scrub: true } }));

    // Generic reveals (batched)
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08, overwrite: 'auto' })
    });

    // Section headings: split into words and rise
    $$('[data-split]').forEach((h) => {
      const html = h.innerHTML;
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      const wrapWords = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((w) => {
              if (!w) return;
              if (/^\s+$/.test(w)) { frag.append(w); return; }
              const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em';
              const i = document.createElement('span'); i.style.display = 'inline-block'; i.className = 'w'; i.textContent = w; o.append(i); frag.append(o);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== 'BR') wrapWords(n);
        });
      };
      wrapWords(tmp); h.innerHTML = tmp.innerHTML;
      gsap.from($$('.w', h), { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
    });

    // Eyebrow rules draw in
    $$('.sec .eyebrow, .partners-sec .eyebrow').forEach((e) => gsap.from(e, { opacity: 0, x: -16, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: e, start: 'top 90%', once: true } }));

    // Forge seams heat up across the page width
    $$('.seam').forEach((s) => gsap.fromTo(s, { '--seam': '0%' }, { '--seam': '100%', ease: 'none', scrollTrigger: { trigger: s, start: 'top 95%', end: 'top 35%', scrub: true } }));

    // Stat counters
    $$('[data-count]').forEach((el) => {
      const end = +el.dataset.count; const o = { v: 0 };
      gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ''); } });
    });

    // Movements underline
    $$('.movement').forEach((m) => ScrollTrigger.create({ trigger: m, start: 'top 80%', once: true, onEnter: () => m.classList.add('in') }));

    // Media parallax
    $$('.media img, .media video, .banner img').forEach((img) => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    // Media clip wipe
    $$('.media').forEach((m) => gsap.from(m, { clipPath: 'inset(100% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: m, start: 'top 80%', once: true } }));

    // Light sections: slide up over dark with angled edge
    $$('.cut-top').forEach((s) => gsap.fromTo(s, { clipPath: 'polygon(0 6vw, 50% 6vw, 100% 6vw, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 3.5vw, 50% 0vw, 100% 3.5vw, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 50%', scrub: true } }));

    // Big date letter stagger
    $$('.big-date').forEach((d) => gsap.from(d.children, { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: .15, scrollTrigger: { trigger: d, start: 'top 85%', once: true } }));

    // Footer giant wordmark slide
    gsap.from('.site-footer .giant', { yPercent: 60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    // Anchor links via Lenis
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); } }));
    addEventListener('load', () => ScrollTrigger.refresh());
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
