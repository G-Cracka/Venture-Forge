/* Venture Forge — V3 Hybrid: brand chrome + Telescope-style scenes */
(function () {
  const VF = window.VF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const page = location.pathname.split('/').pop() || 'index.html';
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LI = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21h-4z"/></svg>';
  const spark = () => {
    let r = '';
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r1 = 17, r2 = i % 2 ? 40 : 47; r += `<line x1="${(Math.cos(a) * r1).toFixed(2)}" y1="${(Math.sin(a) * r1).toFixed(2)}" x2="${(Math.cos(a) * r2).toFixed(2)}" y2="${(Math.sin(a) * r2).toFixed(2)}"/>`; }
    return `<span class="spark"><svg viewBox="-50 -50 100 100" aria-hidden="true"><g stroke="currentColor" stroke-width="7.5" stroke-linecap="round">${r}</g><circle r="17" fill="currentColor"/></svg></span>`;
  };

  /* ---------- Header / mobile nav / dock / footer ---------- */
  const navLinks = VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('');
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
  mnav.className = 'mobile-nav'; mnav.setAttribute('aria-label', 'Site menu');
  mnav.innerHTML = VF.nav.map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('') + `<a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register <span class="arr">→</span></a>`;
  header.after(mnav);
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    $$('[data-menu]').forEach((b) => { b.setAttribute('aria-expanded', open); if (b.tagName === 'BUTTON' && b.dataset.menu === 'dock') b.textContent = open ? 'Close' : 'Menu'; });
    open ? window.lenis?.stop() : window.lenis?.start();
  };
  $('.menu-btn', header).dataset.menu = 'top';
  document.body.insertAdjacentHTML('beforeend', `
    <div class="dock3" role="navigation" aria-label="Quick">
      <a class="wm" href="index.html">Venture <em>Forge</em></a>
      <button data-menu="dock" aria-expanded="false">Menu</button>
      <a class="reg" href="${VF.links.register}" target="_blank" rel="noopener">Register</a>
    </div>
    <div class="corner-mono l">Sept 23–24, 2026 · Austin</div>
    <div class="corner-mono r">Faith · Capital · Calling</div>`);
  $$('[data-menu]').forEach((b) => b.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open'))));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

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
    <div class="giant" aria-hidden="true"><span class="ve">Venture</span> F${spark()}rge</div>`;
  document.body.append(footer);

  /* ---------- Renderers ---------- */
  const speakerCard = (s) => `
    <article class="speaker" tabindex="0" aria-label="${esc(s.name)} — show bio">
      <div class="ph frame">
        ${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ''}
        <img src="${s.img}" alt="${esc(s.name)}" loading="lazy">
        ${s.bio ? `<div class="bio"><p>${esc(s.bio)}</p></div>` : ''}
        <a class="li" href="${s.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(s.name)} on LinkedIn">${LI}</a>
      </div>
      <div class="meta"><div><h4>${esc(s.name)}</h4><p class="org">${esc(s.org)}</p></div>${s.bio ? '<span class="plus" aria-hidden="true">+</span>' : ''}</div>
    </article>`;
  $$('[data-render="speakers-rail"], [data-render="speakers-grid"], [data-render="speakers-track"]').forEach((el) => { el.innerHTML = VF.speakers.map(speakerCard).join(''); });
  $$('.speaker').forEach((c) => {
    const tog = (e) => { if (e.target.closest('.li')) return; c.classList.toggle('open'); };
    c.addEventListener('click', tog);
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(e); } });
  });
  $$('[data-render="net"]').forEach((el) => {
    const list = VF.network.slice(0, +el.dataset.limit || 16);
    const n = innerWidth < 860 ? 2 : 4; const cols = Array.from({ length: n }, () => []);
    list.forEach((p, i) => cols[i % n].push(p));
    el.innerHTML = cols.map((c) => `<div class="col">${c.map((p) => `
      <article class="member" data-reveal>
        <div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"><a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div>
        <h4>${esc(p.name)}</h4><p>${esc(p.title)}</p>
      </article>`).join('')}</div>`).join('');
  });
  $$('[data-render="showcase-logos"]').forEach((el) => { el.innerHTML = VF.showcase.map((c) => `<a href="${c.url}" target="_blank" rel="noopener" aria-label="${esc(c.name)}"><img src="${c.logo}" alt="${esc(c.name)}" loading="lazy"></a>`).join(''); });
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
    el.innerHTML = VF.partners.map((p) => p.url ? `<a href="${p.url}" target="_blank" rel="noopener"><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></a>` : `<div><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>`).join('');
  });
  $$('[data-render="agenda3"]').forEach((el) => {
    el.innerHTML = VF.schedule.map((d) => `<p class="day-h">${esc(d.day)} — ${esc(d.theme)}</p><ol>${d.items.map(([t, s]) => `<li><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol>`).join('');
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
    $$('.faq-item button', el).forEach((b) => b.addEventListener('click', () => { const it = b.parentElement; const o = it.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 650); }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* ---------- Embers ---------- */
  function embers(canvas, density = 1) {
    const ctx = canvas.getContext('2d'); let w, h, parts = [], dpr = Math.min(devicePixelRatio, 2), run = true;
    const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const spawn = (y) => ({ x: Math.random() * w, y: y ?? h + 10, r: Math.random() * 1.8 + .4, vy: -(Math.random() * .7 + .25), vx: (Math.random() - .5) * .3, life: 0, max: 300 + Math.random() * 400, ph: Math.random() * 6 });
    size(); addEventListener('resize', size);
    for (let i = 0; i < Math.round((w * h) / 16000 * density); i++) parts.push(spawn(Math.random() * h));
    new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) loop(); }).observe(canvas);
    function loop() {
      if (!run) return; ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.life++; p.x += p.vx + Math.sin((p.life + p.ph * 50) / 40) * .25; p.y += p.vy;
        const a = Math.sin(Math.min(p.life / p.max, 1) * Math.PI);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = `rgba(255,${170 + Math.round(p.r * 30)},80,${a * .85})`;
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,170,60,.9)'; ctx.fill();
        if (p.life > p.max || p.y < -10) Object.assign(p, spawn());
      }
      requestAnimationFrame(loop);
    }
  }
  if (!reduce) $$('canvas.embers').forEach((c) => embers(c, +c.dataset.density || 1));

  /* ---------- Scroll chrome ---------- */
  const dock = $('.dock3');
  let lastY = 0;
  const onScroll = (y) => {
    header.classList.toggle('scrolled', y > 40);
    const past = y > innerHeight * 1.1;
    header.classList.toggle('hide', past || (y > 300 && y > lastY && !document.body.classList.contains('menu-open')));
    dock.classList.toggle('show', past); document.body.classList.toggle('dock-on', past);
    lastY = y;
  };

  const splitWords = (el, cls) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach((w) => { if (!w) return; if (/^\s+$/.test(w)) { f.append(w); return; } const s = document.createElement('span'); s.className = cls; s.textContent = w; f.append(s); }); n.replaceWith(f); }
      else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el); return $$('.' + cls, el);
  };

  /* ---------- Motion ---------- */
  function motion() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('[data-reveal]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); addEventListener('scroll', () => onScroll(scrollY), { passive: true }); $$('.agenda3 li').forEach((l) => l.classList.add('on')); $$('.agenda3 .pic img').forEach((i, k) => k || i.classList.add('on')); return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    const vw = () => innerWidth, vh = () => innerHeight;

    /* --- Pinned scenes first --- */
    const sh = $('.shrink-hero');
    if (sh) {
      const lines = $$('h1 .line > span', sh);
      gsap.from(lines, { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: .12, delay: .15 });
      gsap.from($$('.eyebrow, .tagline, .lede, .btn-row', sh), { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: .08, delay: .6 });
      const orbit = $$('.orbit img', sh);
      const t = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: sh, start: 'top top', end: '+=140%', pin: true, scrub: 1 } });
      t.fromTo($('.vid', sh), { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: () => `inset(${vh() * .16}px ${vw() * .22}px ${vh() * .16}px ${vw() * .22}px round 14px)`, duration: 1 }, 0)
        .to($('.vid video', sh), { scale: 1.15, duration: 1 }, 0)
        .to($('.copy', sh), { opacity: 0, y: -60, duration: .45 }, 0)
        .fromTo(orbit, { opacity: 0, scale: .6, y: (i) => (i % 2 ? 80 : -80) }, { opacity: 1, scale: 1, y: 0, duration: .55, stagger: .04 }, .35)
        .to($('.card-cap', sh), { opacity: 1, duration: .2 }, .75);
    }
    const hs = $('.hscroll');
    if (hs) {
      const track = $('.track', hs); const cnt = $('.count', hs.closest('section'));
      const dist = () => Math.max(0, track.scrollWidth - vw() + 40);
      gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: hs.closest('section'), start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: (s) => { if (cnt) cnt.textContent = String(Math.min(VF.speakers.length, Math.max(1, Math.round(s.progress * (VF.speakers.length - 1)) + 1))).padStart(2, '0') + ' / ' + VF.speakers.length; } } });
    }

    /* --- Reveals --- */
    ScrollTrigger.batch('[data-reveal]', { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08, overwrite: 'auto' }) });
    $$('.page-hero h1 .line > span').forEach((l, i) => gsap.from(l, { yPercent: 110, duration: 1.4, ease: 'expo.out', delay: .15 + i * .12 }));
    gsap.from('.page-hero .eyebrow, .page-hero .lede', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .5 });

    $$('[data-split]').forEach((h) => {
      const ws = splitWords(h, 'w');
      ws.forEach((w) => { const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em'; w.replaceWith(o); o.append(w); w.style.display = 'inline-block'; });
      gsap.from(ws, { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
    });
    $$('[data-fill]').forEach((el) => {
      const ws = splitWords(el, 'wf');
      ScrollTrigger.create({ trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true, onUpdate: (st) => { const n = Math.round(st.progress * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < n)); } });
    });
    $$('.seam').forEach((s) => gsap.fromTo(s, { '--seam': '0%' }, { '--seam': '100%', ease: 'none', scrollTrigger: { trigger: s, start: 'top 95%', end: 'top 35%', scrub: true } }));
    $$('[data-count]').forEach((el) => { const end = +el.dataset.count, o = { v: 0 }; gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ''); } }); });
    $$('.movement').forEach((m) => ScrollTrigger.create({ trigger: m, start: 'top 80%', once: true, onEnter: () => m.classList.add('in') }));
    $$('.media img, .media video, .banner img').forEach((img) => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('.media').forEach((m) => gsap.from(m, { clipPath: 'inset(18% 18% 18% 18% round 14px)', ease: 'none', scrollTrigger: { trigger: m, start: 'top 95%', end: 'top 35%', scrub: true } }));
    $$('.cut-top').forEach((s) => gsap.fromTo(s, { clipPath: 'polygon(0 6vw, 50% 6vw, 100% 6vw, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 3.5vw, 50% 0vw, 100% 3.5vw, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 50%', scrub: true } }));
    $$('.big-date').forEach((d) => gsap.from(d.children, { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: .15, scrollTrigger: { trigger: d, start: 'top 85%', once: true } }));
    $$('.net').forEach((n) => $$('.col', n).forEach((c, i) => gsap.to(c, { y: () => -[0, 90, 30, 140][i % 4], ease: 'none', scrollTrigger: { trigger: n, start: 'top bottom', end: 'bottom top', scrub: true } })));
    $$('.drifters img').forEach((img) => { const d = +img.dataset.d || 1; gsap.fromTo(img, { y: 120 * d }, { y: -160 * d, ease: 'none', scrollTrigger: { trigger: img.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } }); });

    // Agenda highlight + image swap
    $$('.agenda3').forEach((a) => {
      const items = $$('li', a), pics = $$('.pic img', a);
      if (pics[0]) pics[0].classList.add('on');
      items.forEach((li, i) => ScrollTrigger.create({ trigger: li, start: 'top 60%', end: 'bottom 60%', onToggle: (s) => {
        if (!s.isActive) return;
        items.forEach((x, k) => x.classList.toggle('on', k <= i && k > i - 3));
        const p = Math.min(pics.length - 1, Math.floor(i / items.length * pics.length)); pics.forEach((im, k) => im.classList.toggle('on', k === p));
      } }));
    });

    gsap.from('.site-footer .giant', { yPercent: 50, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); } }));
    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
