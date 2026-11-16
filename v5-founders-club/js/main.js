/* Venture Forge — V4 Club: chrome, renderers, motion */
(function () {
  const VF = window.VF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LI = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21h-4z"/></svg>';
  document.documentElement.classList.add('js');
  const page = location.pathname.split('/').pop() || 'index.html';
  const IMG = VF.IMG;
  const sp = (slug) => VF.speakers.find((s) => s.slug === slug);

  /* ---------- Chrome ---------- */
  const links = VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="nav"><div class="wrap bar">
      <a class="logo" href="index.html" aria-label="Venture Forge Austin — home"><img src="${IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"></a>
      <nav class="links" aria-label="Primary">${links}</nav>
      <div class="cta"><a class="btn ghost" href="partner.html">Partner</a><a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></div>
      <button class="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>
    </div></header>
    <nav class="drawer" aria-label="Menu">${VF.nav.map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}<a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></nav>`);
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); o ? window.lenis?.stop() : window.lenis?.start(); });
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot"><div class="wrap">
      <div class="cols">
        <div class="brand"><img src="${IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"><p>Investing in innovation. Forging eternal impact. An invitation-only summit convening investors, founders, and philanthropists in Austin, Texas.</p></div>
        <div><h5>Explore</h5><ul><li><a href="2026-event.html">2026 Event</a></li><li><a href="speakers.html">Speakers</a></li><li><a href="vision.html">Vision</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
        <div><h5>Engage</h5><ul><li><a href="partner.html">Partner</a></li><li><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></li><li><a href="${VF.links.chat}" target="_blank" rel="noopener">Event Chat</a></li></ul></div>
        <div><h5>Gathering</h5><ul><li>Riverbend Centre</li><li>Austin, Texas</li><li>September 23–24, 2026</li></ul></div>
      </div>
      <div class="legal"><span>© 2026 Venture-Forge Austin. All rights reserved.</span><span>Faith · Capital · Calling</span></div>
    </div></footer>`);

  /* ---------- Renderers ---------- */
  const BENEFITS = {
    home: [
      ['photos/summit.jpg', 'Opening Night Reception', 'Wednesday, September 23'],
      ['speakers/noble-origins.jpg', 'Founders Showcase', 'Five Kingdom-minded companies'],
      ['speakers/jake-thomsen.jpg', 'Investors Panel', 'Kingdom Due Diligence'],
      ['speakers/derek-welborn.jpg', 'Founders Panel', 'What Christian Founders Wish Investors Understood'],
      ['photos/hero-austin.jpg', 'Networking', 'Curated introductions across sectors'],
      ['photos/forge.jpg', 'Keynotes', 'Faith journey and taking on challenges'],
    ]
  };
  $$('[data-render="benefits"]').forEach((el) => {
    el.innerHTML = BENEFITS[el.dataset.set || 'home'].map(([src, t, s]) => `<article class="bcard" data-up><img src="${IMG}${src}" alt="" loading="lazy"><div class="cap"><div><h3>${esc(t)}</h3><p>${esc(s)}</p></div></div></article>`).join('');
  });
  $$('[data-render="showcase"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `<a class="bcard" href="${c.url}" target="_blank" rel="noopener" data-up><img src="${c.img}" alt="" loading="lazy"><span class="logo"><img src="${c.logo}" alt=""></span><div class="cap"><div><h3>${esc(c.name)}</h3><p>${esc(c.people)}</p></div></div></a>`).join('');
  });
  const voice = (s) => `
    <article class="voice" data-up>
      <header><img src="${s.img}" alt="" loading="lazy"><div><b>${esc(s.name)}</b><span>${esc(s.org)}</span></div></header>
      ${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ''}
      ${s.bio ? `<p>${esc(s.bio)}</p>` : ''}
      <a class="li" href="${s.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(s.name)} on LinkedIn">${LI} Connect</a>
    </article>`;
  $$('[data-render="voices"]').forEach((el) => {
    const list = el.dataset.slugs ? el.dataset.slugs.split(',').map(sp) : VF.speakers;
    el.innerHTML = list.map(voice).join('');
  });
  $$('[data-render="net"]').forEach((el) => {
    el.innerHTML = VF.network.slice(0, +el.dataset.limit || 12).map((p) => `
      <article class="member" data-up><div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"><a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div><h4>${esc(p.name)}</h4><p>${esc(p.title)}</p></article>`).join('');
  });
  $$('[data-render="logos"]').forEach((el) => { el.innerHTML = VF.partners.map((p) => `<div><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>`).join(''); });
  $$('[data-render="sched"]').forEach((el) => {
    el.innerHTML = VF.schedule.map((d) => `<div data-up><h3>${esc(d.day)}</h3><p class="theme">${esc(d.theme)}</p><ol>${d.items.map(([t, s]) => `<li><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol></div>`).join('');
  });
  $$('[data-render="tiers"]').forEach((el) => {
    el.innerHTML = VF.tiers.map((t, i) => `<article class="tier${i === 0 ? ' feat' : ''}" data-up>${t.reserved ? '<span class="badge">Reserved</span>' : ''}<p class="name">${esc(t.name)}</p><p class="price">${t.price}</p><ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><a class="btn${t.reserved ? ' ghost' : ''}" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship</a></article>`).join('');
  });
  $$('[data-render="faith"]').forEach((el) => { el.innerHTML = VF.faith.map((f) => `<li data-up>${esc(f)}</li>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => {
    el.innerHTML = VF.faq.map(([q, a], i) => `<div class="it${i === 0 ? ' open' : ''}" data-up><button aria-expanded="${i === 0}">${esc(q)}<span aria-hidden="true">+</span></button><div class="a"><div><p>${esc(a)}</p></div></div></div>`).join('');
    $$('button', el).forEach((b) => b.addEventListener('click', () => { const o = b.parentElement.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 650); }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* Wax seal */
  $$('[data-seal]').forEach((el) => {
    const t = 'VENTURE FORGE · AUSTIN · MMXXVI · FAITH · CAPITAL · CALLING · ';
    let rays = ''; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r2 = i % 2 ? 15 : 19; rays += `<line x1="${50 + Math.cos(a) * 7}" y1="${50 + Math.sin(a) * 7}" x2="${50 + Math.cos(a) * r2}" y2="${50 + Math.sin(a) * r2}"/>`; }
    el.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id="wax" cx="40%" cy="35%"><stop offset="0" stop-color="oklch(0.86 0.11 88)"/><stop offset=".6" stop-color="oklch(0.72 0.13 80)"/><stop offset="1" stop-color="oklch(0.5 0.11 65)"/></radialGradient>
      <path id="circ" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"/></defs>
      <path d="M50 3 C62 4 70 2 78 9 C88 15 90 24 95 33 C99 44 96 52 97 61 C95 72 90 79 82 87 C74 94 64 96 52 97 C40 98 31 95 22 89 C13 82 6 74 4 62 C2 51 3 42 7 32 C11 21 17 13 28 7 C35 3 42 3 50 3Z" fill="url(#wax)"/>
      <circle cx="50" cy="50" r="27" fill="none" stroke="oklch(0.45 0.09 65 / .6)" stroke-width="1"/>
      <g class="txt"><text font-size="6.3" letter-spacing="1.6" fill="oklch(0.38 0.08 60)" font-family="Fira Sans, sans-serif"><textPath href="#circ">${t}</textPath></text></g>
      <g stroke="oklch(0.38 0.08 60)" stroke-width="2.2" stroke-linecap="round">${rays}</g><circle cx="50" cy="50" r="6.5" fill="oklch(0.38 0.08 60)"/>
    </svg>`;
  });

  /* Dot-matrix Texas map */
  $$('[data-dotmap]').forEach((el) => {
    const TX = [[-106.6,32],[-103.06,32],[-103.06,36.5],[-100,36.5],[-100,34.56],[-99.2,34.4],[-98.1,34.1],[-96.6,33.85],[-95.2,33.9],[-94.05,33.55],[-94.05,31],[-93.6,30],[-93.8,29.7],[-94.7,29.35],[-95.1,29.1],[-96.5,28.3],[-97.2,27.6],[-97.4,26.8],[-97.15,25.95],[-97.6,26],[-98.3,26.2],[-99.1,26.5],[-99.5,27.5],[-100.3,28.3],[-100.7,29.1],[-101.4,29.77],[-102.4,29.8],[-102.7,29.6],[-103.1,29],[-103.8,29.3],[-104.5,29.7],[-104.9,30.6],[-106,31.4]];
    const W = 600, k = Math.cos(31 * Math.PI / 180), x0 = -106.8, x1 = -93.4, y0 = 36.7, y1 = 25.7;
    const sx = W / ((x1 - x0) * k), H = Math.round((y0 - y1) * sx);
    const P = ([lon, lat]) => [(lon - x0) * k * sx, (y0 - lat) * sx];
    const poly = TX.map(P);
    const inside = (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
    const step = 11; let dots = '';
    const [ax, ay] = P([-97.74, 30.27]);
    for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) if (inside(x, y)) { const near = Math.hypot(x - ax, y - ay) < 34; dots += `<circle class="d${near ? ' lit' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`; }
    const cities = [['Dallas', -96.8, 32.78], ['Houston', -95.37, 29.76], ['San Antonio', -98.49, 29.42], ['El Paso', -106.44, 31.76]];
    const cityMarks = cities.map(([n, lo, la]) => { const [cx, cy] = P([lo, la]); return `<circle cx="${cx}" cy="${cy}" r="3" fill="oklch(1 0 0 / .7)"/><text class="sm" x="${cx + 8}" y="${cy + 3}">${n}</text>`; }).join('');
    el.innerHTML = `<svg class="dotmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of Texas with Austin highlighted">${dots}${cityMarks}
      <circle class="ring" cx="${ax}" cy="${ay}" r="7"/><circle class="ring r2" cx="${ax}" cy="${ay}" r="7"/><circle class="pin" cx="${ax}" cy="${ay}" r="6"/>
      <line x1="${ax}" y1="${ay}" x2="${ax + 70}" y2="${ay - 60}" stroke="oklch(0.78 0.13 85)" stroke-width="1"/>
      <text x="${ax + 76}" y="${ay - 66}">Austin</text><text class="sm" x="${ax + 76}" y="${ay - 52}">Riverbend Centre</text></svg>`;
  });

  /* ---------- Motion ---------- */
  const nav = $('.nav'); let lastY = 0;
  const onScroll = (y) => { nav.classList.toggle('solid', y > 60); nav.classList.toggle('hide', y > 400 && y > lastY && !document.body.classList.contains('menu-open')); lastY = y; };

  function motion() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('[data-up]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); $$('.lit .ln').forEach((l) => l.classList.add('on')); addEventListener('scroll', () => onScroll(scrollY), { passive: true }); return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1.2 }); window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    const vh = () => innerHeight, vw = () => innerWidth;

    // Hero
    $$('.hero h1').forEach((h) => {
      h.innerHTML = h.innerHTML.split('<br>').map((l) => `<span style="display:block;overflow:hidden;padding-bottom:.06em"><span style="display:inline-block">${l}</span></span>`).join('');
      gsap.from($$('span > span', h), { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: .12, delay: .2 });
    });
    gsap.from('.hero .kicker, .hero .side > *', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .6 });
    $$('.hero > video, .hero > img').forEach((v) => gsap.to(v, { yPercent: 14, scale: 1.08, ease: 'none', scrollTrigger: { trigger: v.parentElement, start: 'top top', end: 'bottom top', scrub: true } }));

    // Line-lit paragraphs: group words into rendered lines, light them as you scroll
    $$('.lit p.big').forEach((p) => {
      const words = p.textContent.trim().split(/\s+/);
      p.innerHTML = words.map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
      const ws = $$('.w', p); const lines = []; let top = null;
      ws.forEach((w) => { const t = w.offsetTop; if (t !== top) { lines.push([]); top = t; } lines[lines.length - 1].push(w.textContent); });
      p.innerHTML = lines.map((l) => `<span class="ln">${l.map(esc).join(' ')}</span>`).join(' ');
    });
    $$('.lit').forEach((s) => { const ls = $$('.ln', s); ScrollTrigger.create({ trigger: s, start: 'top 70%', end: 'bottom 70%', scrub: true, onUpdate: (st) => { const n = Math.ceil(st.progress * ls.length * 1.15); ls.forEach((l, i) => l.classList.toggle('on', i < n)); } }); });
    $$('.lit > img').forEach((img) => gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

    // Curtain: headline recedes as the next section covers it
    $$('.curtain').forEach((c) => {
      gsap.from($$('h2 > span', c), { y: 60, opacity: 0, stagger: .15, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 70%', once: true } });
      const cover = c.nextElementSibling;
      if (cover) gsap.to(c.firstElementChild, { scale: .88, opacity: .25, ease: 'none', scrollTrigger: { trigger: cover, start: 'top bottom', end: 'top top', scrub: true } });
    });

    // Generic rise
    ScrollTrigger.batch('[data-up]', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .08, overwrite: 'auto' }) });

    // Dot map: dots ignite in a wave from Austin
    $$('.dotmap').forEach((svg) => {
      const ds = $$('circle.d', svg); const pin = svg.querySelector('.pin'); const ax = +pin.getAttribute('cx'), ay = +pin.getAttribute('cy');
      gsap.set(ds, { opacity: 0 });
      ScrollTrigger.create({ trigger: svg, start: 'top 75%', once: true, onEnter: () => gsap.to(ds, { opacity: 1, duration: .6, ease: 'power2.out', delay: (i) => Math.hypot(+ds[i].getAttribute('cx') - ax, +ds[i].getAttribute('cy') - ay) / 420 }) });
    });

    // Counters
    $$('[data-count]').forEach((el) => { const end = +el.dataset.count, o = { v: 0 }; gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = (el.dataset.pre || '') + Math.round(o.v) + (el.dataset.suffix || ''); } }); });
    $$('.seal').forEach((s) => gsap.from(s, { scale: 2.2, opacity: 0, rotate: -40, duration: 1.1, ease: 'back.out(1.6)', scrollTrigger: { trigger: s, start: 'top 90%', once: true } }));

    // Flat-lay: items slide in from beyond the edges and settle at their angle
    $$('.flatlay').forEach((f) => {
      $$('.item', f).forEach((it) => {
        const r = +it.dataset.r || 0, fx = +it.dataset.fx || 0, fy = +it.dataset.fy || 0;
        gsap.fromTo(it, { x: () => fx * vw() * .5, y: () => fy * vh() * .6, rotation: r + (fx || 1) * 25 }, { x: 0, y: 0, rotation: r, ease: 'power2.out', scrollTrigger: { trigger: f, start: 'top bottom', end: 'center center', scrub: 1, invalidateOnRefresh: true } });
      });
      gsap.from($$('.copy > *', f), { y: 40, opacity: 0, stagger: .12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 45%', once: true } });
    });

    // Framed video grows to full width
    $$('.vframe .frame').forEach((fr) => gsap.fromTo(fr, { scale: .78, borderRadius: 28 }, { scale: 1, borderRadius: 18, ease: 'none', scrollTrigger: { trigger: fr, start: 'top bottom', end: 'center center', scrub: true } }));
    $$('.vframe .ov > *').forEach((o, i) => gsap.from(o, { y: 30, opacity: 0, duration: 1.2, delay: i * .15, ease: 'expo.out', scrollTrigger: { trigger: o, start: 'top 80%', once: true } }));

    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
