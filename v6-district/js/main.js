/* Venture Forge — V5 District: chrome, renderers, motion */
(function () {
  const VF = window.VF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LI = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21h-4z"/></svg>';
  const I = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 11V6a1.5 1.5 0 0 1 3 0v4m0-1V4.5a1.5 1.5 0 0 1 3 0V10m0-4a1.5 1.5 0 0 1 3 0v5m0-2a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 12.5 21h-.6a6.5 6.5 0 0 1-5.2-2.6L4 14.8a1.6 1.6 0 0 1 2.5-2L8 14"/></svg>',
    tick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 7h18v13H3zM3 11h18M8 3v4m8-4v4"/></svg>'
  };
  document.documentElement.classList.add('js');
  const page = location.pathname.split('/').pop() || 'index.html';
  const IMG = VF.IMG;
  const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Riverbend Centre, Austin, TX');

  /* Stamp badge (VF spark at center, circular text) */
  const stamp = (txt = 'VENTURE FORGE · AUSTIN, TEXAS · EST. 2026 · ') => {
    let rays = ''; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r2 = i % 2 ? 15 : 19; rays += `<line x1="${(50 + Math.cos(a) * 7).toFixed(2)}" y1="${(50 + Math.sin(a) * 7).toFixed(2)}" x2="${(50 + Math.cos(a) * r2).toFixed(2)}" y2="${(50 + Math.sin(a) * r2).toFixed(2)}"/>`; }
    const id = 'c' + Math.random().toString(36).slice(2, 7);
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="${id}" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/></defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" stroke-width="1"/>
      <g class="ring"><text font-size="7" font-weight="700" letter-spacing="2.2" fill="currentColor" font-family="Fira Sans, sans-serif"><textPath href="#${id}">${txt}${txt}</textPath></text></g>
      <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${rays}</g><circle cx="50" cy="50" r="5.5" fill="currentColor"/></svg>`;
  };
  $$('[data-stamp]').forEach((el) => { el.innerHTML = stamp(el.dataset.stamp || undefined); });

  /* ---------- Chrome ---------- */
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="nav"><div class="wrap bar">
      <a class="logo" href="index.html" aria-label="Venture Forge Austin — home"><img src="${IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"></a>
      <nav class="links" aria-label="Primary">${VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
      <div class="icons">
        <a href="${MAPS}" target="_blank" rel="noopener">${I.pin}Location</a>
        <a href="${VF.links.chat}" target="_blank" rel="noopener">${I.chat}Chat</a>
        <a href="partner.html">${I.hand}Partner</a>
        <a class="reg" href="${VF.links.register}" target="_blank" rel="noopener">${I.tick}Register</a>
      </div>
      <button class="burger" aria-label="Open menu" aria-expanded="false">☰</button>
    </div></header>
    <nav class="drawer" aria-label="Menu">${VF.nav.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}<a href="${VF.links.register}" target="_blank" rel="noopener">Register »</a></nav>`);
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); burger.textContent = o ? '×' : '☰'; o ? window.lenis?.stop() : window.lenis?.start(); });
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot topo"><div class="wrap">
      <div class="cols">
        <div class="brand"><div class="stamp">${stamp()}</div><p>Investing in innovation. Forging eternal impact. Meeting September 23–24, 2026 at Riverbend Centre in Austin, Texas.</p>
          <div class="row"><a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Register</a><a class="btn line" href="${MAPS}" target="_blank" rel="noopener">Get directions</a></div></div>
        <div><h5>Explore</h5><ul><li><a href="2026-event.html">2026 Event</a></li><li><a href="speakers.html">Speakers</a></li><li><a href="vision.html">Vision</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
        <div><h5>Engage</h5><ul><li><a href="partner.html">Partner</a></li><li><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></li><li><a href="${VF.links.chat}" target="_blank" rel="noopener">Event Chat</a></li></ul></div>
        <div><h5>Contact</h5><ul><li><a href="${VF.links.email}">sponsor@ventureforgeaustin.org</a></li><li>Riverbend Centre</li><li>Austin, Texas</li></ul></div>
      </div>
      <div class="legal"><span>© 2026 Venture-Forge Austin. All rights reserved.</span><span>Faith · Capital · Calling</span></div>
    </div></footer>`);

  /* ---------- Renderers ---------- */
  const person = (p, opts = {}) => `
    <article class="person" data-up>
      <div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy">${p.tag ? `<span class="badge">${esc(p.tag)}</span>` : ''}<a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div>
      <div class="b"><h3>${esc(p.name)}</h3><span class="org">${esc(opts.sub || p.org || p.title)}</span>${opts.bio && p.bio ? `<p class="bio">${esc(p.bio)}</p><button class="tog" type="button" aria-expanded="false">Read bio +</button>` : ''}</div>
    </article>`;
  $$('[data-render="speakers"]').forEach((el) => { const n = +el.dataset.limit || VF.speakers.length; el.innerHTML = VF.speakers.slice(0, n).map((s) => person(s, { bio: el.dataset.bio === 'true' })).join(''); });
  $$('[data-render="net"]').forEach((el) => { el.innerHTML = VF.network.slice(0, +el.dataset.limit || 8).map((p) => person(p, { sub: p.title })).join(''); });
  $$('.person .tog').forEach((b) => b.addEventListener('click', () => { const c = b.closest('.person'); const o = c.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.textContent = o ? 'Close bio −' : 'Read bio +'; setTimeout(() => window.ScrollTrigger?.refresh(), 60); }));

  const EVENTS = [
    ['23', 'photos/hero-austin.jpg', 'Happy Hour & Registration', 'Wednesday · 5:00 PM'],
    ['23', 'photos/summit.jpg', 'Opening Address: Kingdom Investing', 'Wednesday · 6:00 PM'],
    ['23', 'speakers/jeff-johns.jpg', 'Dinner / Panel: Faith Capital and Stewardship', 'Wednesday · 6:45 PM'],
    ['24', 'speakers/noble-origins.jpg', 'Founders Showcase', 'Thursday · 10:00 AM'],
    ['24', 'speakers/derek-welborn.jpg', 'Founders Panel: What Christian Founders Wish Investors Understood', 'Thursday · 12:30 PM'],
    ['24', 'speakers/jake-thomsen.jpg', 'Investors Panel: Kingdom Due Diligence', 'Thursday · 1:15 PM'],
    ['24', 'photos/forge.jpg', 'Keynote: Faith Journey and Taking on Challenges', 'Thursday · 2:45 PM'],
    ['24', 'speakers/todd-engstrom.jpg', 'Unity: Myth or Reality', 'Thursday · 3:45 PM']
  ];
  $$('[data-render="events"]').forEach((el) => { el.innerHTML = EVENTS.map(([d, , t, w]) => `<article class="ecard ev" data-up><div class="b"><h3>${esc(t)}</h3><p>${esc(w)}</p></div><span class="date"><b>${d}</b><span>SEPT</span></span></article>`).join(''); });
  $$('[data-render="showcase"]').forEach((el) => { el.innerHTML = VF.showcase.map((c) => `<a class="ecard" href="${c.url}" target="_blank" rel="noopener" data-up><div class="ph" style="background:#fff;display:grid;place-items:center"><img src="${c.logo}" alt="" style="width:62%;height:62%;object-fit:contain"></div><div class="b"><h3>${esc(c.name)}</h3><p>${esc(c.people)} · Visit site »</p></div></a>`).join(''); });
  $$('[data-render="logos"]').forEach((el) => { el.innerHTML = VF.partners.map((p) => `<div><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>`).join(''); });
  $$('[data-render="sched"]').forEach((el) => { el.innerHTML = VF.schedule.map((d) => `<div class="day" data-up><h3 class="caps">${esc(d.day)} <span class="script">${esc(d.theme)}</span></h3><ol>${d.items.map(([t, s]) => `<li><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol></div>`).join(''); });
  $$('[data-render="tiers"]').forEach((el) => { el.innerHTML = VF.tiers.map((t) => `<article class="tier" data-up>${t.reserved ? '<span class="flag">Reserved</span>' : ''}<p class="nm">${esc(t.name)}</p><p class="pr">${t.price}</p><ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><a class="btn${t.reserved ? ' line' : ''}" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship</a></article>`).join(''); });
  $$('[data-render="faith"]').forEach((el) => { el.innerHTML = VF.faith.map((f) => `<li data-up>${esc(f)}</li>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => {
    el.innerHTML = VF.faq.map(([q, a], i) => `<div class="it${i === 0 ? ' open' : ''}" data-up><button aria-expanded="${i === 0}">${esc(q)}<span aria-hidden="true">+</span></button><div class="a"><div><p>${esc(a)}</p></div></div></div>`).join('');
    $$('button', el).forEach((b) => b.addEventListener('click', () => { const o = b.parentElement.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 550); }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* Drag-to-scroll rows */
  $$('.events').forEach((row) => {
    let down = false, sx = 0, sl = 0;
    row.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = row.scrollLeft; row.classList.add('dragging'); });
    addEventListener('pointerup', () => { down = false; row.classList.remove('dragging'); });
    addEventListener('pointermove', (e) => { if (down) row.scrollLeft = sl - (e.clientX - sx); });
  });

  /* ---------- Motion ---------- */
  const nav = $('.nav'); let lastY = 0;
  const onScroll = (y) => { nav.classList.toggle('solid', y > 40); nav.classList.toggle('hide', y > 400 && y > lastY && !document.body.classList.contains('menu-open')); lastY = y; };

  function motion() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('[data-up]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); addEventListener('scroll', () => onScroll(scrollY), { passive: true }); return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1.1 }); window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

    // Hero: poster lines punch up with a slight skew
    gsap.from('.hero h1 .ln > span', { yPercent: 115, skewY: 6, duration: 1.3, ease: 'expo.out', stagger: .1, delay: .15 });
    gsap.from('.hero .row, .hero .sub, .hero .scroll', { opacity: 0, y: 20, duration: 1, ease: 'expo.out', delay: .7, stagger: .1 });
    $$('.hero > video, .hero > img').forEach((v) => gsap.fromTo(v, { scale: 1.15 }, { scale: 1, yPercent: 10, ease: 'none', scrollTrigger: { trigger: v.parentElement, start: 'top top', end: 'bottom top', scrub: true } }));

    // Section poster headings: words slam in
    $$('[data-slam]').forEach((h) => {
      const html = h.innerHTML; const tmp = document.createElement('div'); tmp.innerHTML = html;
      const walk = (n) => [...n.childNodes].forEach((c) => { if (c.nodeType === 3) { const f = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach((w) => { if (!w) return; if (/^\s+$/.test(w)) { f.append(w); return; } const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding:.04em 0'; const i = document.createElement('span'); i.className = 'sw'; i.style.display = 'inline-block'; i.textContent = w; o.append(i); f.append(o); }); c.replaceWith(f); } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c); });
      walk(tmp); h.innerHTML = tmp.innerHTML;
      gsap.from($$('.sw', h), { yPercent: 110, skewY: 5, duration: 1.1, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
    });

    // Gold band: cut-outs rise, stamp spins with scroll
    $$('.cutout').forEach((c, i) => gsap.fromTo(c, { yPercent: 35 + (i % 3) * 10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: c.closest('section'), start: 'top 80%', end: 'bottom bottom', scrub: true } }));
    $$('.goldband .stamp svg, .foot .stamp svg').forEach((s) => gsap.to(s, { rotate: 160, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true } }));

    // Counters
    $$('[data-count]').forEach((el) => { const end = +el.dataset.count, o = { v: 0 }; gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ''); } }); });

    // Bands parallax
    $$('.band > img').forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    // Event row nudges sideways as you scroll past
    $$('.events').forEach((r) => gsap.fromTo(r, { x: 80 }, { x: 0, ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'top 40%', scrub: true } }));

    ScrollTrigger.batch('[data-up]', { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .07, overwrite: 'auto' }) });
    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
