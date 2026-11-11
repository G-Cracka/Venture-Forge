/* Venture Forge — V2 Telescope: chrome, renderers, scroll scenes */
(function () {
  const VF = window.VF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  document.documentElement.classList.add('js');
  const page = location.pathname.split('/').pop() || 'index.html';

  /* ---------- Icons ---------- */
  const spark = () => {
    let rays = '';
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r1 = 17, r2 = i % 2 ? 40 : 47; rays += `<line x1="${(Math.cos(a) * r1).toFixed(2)}" y1="${(Math.sin(a) * r1).toFixed(2)}" x2="${(Math.cos(a) * r2).toFixed(2)}" y2="${(Math.sin(a) * r2).toFixed(2)}"/>`; }
    return `<svg viewBox="-50 -50 100 100" aria-hidden="true"><g stroke="currentColor" stroke-width="7.5" stroke-linecap="round">${rays}</g><circle r="17" fill="currentColor"/></svg>`;
  };
  const wordmark = (withSpark) => withSpark
    ? `<span class="wordmark" aria-label="Venture Forge">Venture&nbsp;F<span class="spark">${spark()}</span>rge</span>`
    : `<span class="wordmark">Venture Forge</span>`;
  const IC = {
    li: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21h-4z"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>',
    chev: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 6.5 6 6 6-6"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    chat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>',
    x: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13"/></svg>'
  };
  $$('[data-spark]').forEach((el) => { el.innerHTML = spark(); });

  /* ---------- Chrome ---------- */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="chrome-l mono">Inaugural Summit · Sept 23–24, 2026</div>
    <div class="chrome-r"><span class="mono">Scroll</span><button class="scroll-btn" aria-label="Scroll down">${IC.chev}</button></div>
    <div class="dock">
      <div class="panel" id="dock-panel" aria-hidden="true">
        <nav aria-label="Primary">${VF.nav.map(([h, l], i) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}><span>${l}</span><span class="mono">0${i + 1}</span></a>`).join('')}</nav>
        <div class="foot mono"><a href="${VF.links.chat}" target="_blank" rel="noopener">Event chat ↗</a><a href="${VF.links.email}">Contact</a></div>
      </div>
      <div class="pill">
        <a href="index.html" aria-label="Venture Forge — home">${wordmark(false)}</a>
        <div class="acts">
          <button class="menu-t" aria-expanded="false" aria-controls="dock-panel">Menu</button>
          <a class="cta" href="${VF.links.register}" target="_blank" rel="noopener">Register</a>
        </div>
      </div>
    </div>`);
  const menuT = $('.dock .menu-t');
  const setMenu = (open) => { document.body.classList.toggle('menu-open', open); menuT.setAttribute('aria-expanded', open); menuT.textContent = open ? 'Close' : 'Menu'; $('#dock-panel').setAttribute('aria-hidden', !open); };
  menuT.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { setMenu(false); closeDrawer?.(); } });
  document.addEventListener('click', (e) => { if (!e.target.closest('.dock')) setMenu(false); });

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="card">
      <div class="top">
        <div class="l mono">${VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}</div>
        <div class="c"><a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">${IC.li.replace('<svg ', '<svg width="16" height="16" ')}</a><a href="${VF.links.email}" aria-label="Email">${IC.mail}</a><a href="${VF.links.chat}" target="_blank" rel="noopener" aria-label="Event chat">${IC.chat}</a></div>
        <div class="r mono"><a href="partner.html">Partner</a><a class="btn-gold" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></div>
      </div>
      <div class="giant">${wordmark(true)}</div>
      <div class="small mono"><span>© 2026 Venture-Forge Austin</span><span>Riverbend Centre · Austin, Texas</span><span>Faith · Capital · Calling</span></div>
    </div>`;
  document.body.append(footer);

  /* ---------- Renderers ---------- */
  const person = (p) => `
    <article class="person" data-rise>
      <div class="ph">
        ${p.tag ? `<span class="badge">${esc(p.tag)}</span>` : ''}
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
        <a class="corner-btn li-btn" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${IC.li}</a>
      </div>
      <p class="t">${esc(p.name)}</p><p class="s mono">${esc(p.title)}</p>
    </article>`;
  $$('[data-render="network"]').forEach((el) => {
    const list = el.dataset.source === 'speakers' ? VF.speakers : VF.network;
    const n = innerWidth < 960 ? 2 : 4; const cols = Array.from({ length: n }, () => []);
    list.forEach((p, i) => cols[i % n].push(p));
    el.innerHTML = cols.map((c) => `<div class="col">${c.map(person).join('')}</div>`).join('');
  });
  $$('[data-render="speaker-cards"]').forEach((el) => {
    const n = innerWidth < 960 ? 2 : 4; const cols = Array.from({ length: n }, () => []);
    VF.speakers.forEach((p, i) => cols[i % n].push([p, i]));
    el.innerHTML = cols.map((c) => `<div class="col">${c.map(([p, i]) => `
      <article class="person" data-rise>
        <div class="ph">${p.tag ? `<span class="badge">${esc(p.tag)}</span>` : ''}
          <button class="open-bio" data-i="${i}" style="display:block;width:100%;height:100%" aria-label="Read ${esc(p.name)}'s bio"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"></button>
          <a class="corner-btn li-btn" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${IC.li}</a></div>
        <p class="t">${esc(p.name)}</p><p class="s mono">${esc(p.org)}</p>
      </article>`).join('')}</div>`).join('');
  });
  $$('[data-render="stream"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `
      <a class="p-card" href="${c.url}" target="_blank" rel="noopener">
        <div class="ph"><img src="${c.img}" alt="" loading="lazy"><span class="logo-chip"><img src="${c.logo}" alt=""></span><span class="corner-btn">${IC.arrow}</span></div>
        <p class="t">${esc(c.name)}</p><p class="s mono">${esc(c.people)}</p>
      </a>`).join('');
  });
  $$('[data-render="showcase-row"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `
      <a class="p-card" href="${c.url}" target="_blank" rel="noopener" data-rise>
        <div class="ph"><img src="${c.img}" alt="" loading="lazy"><span class="logo-chip"><img src="${c.logo}" alt=""></span><span class="corner-btn">${IC.arrow}</span></div>
        <p class="t">${esc(c.name)}</p><p class="s mono">${esc(c.people)}</p>
      </a>`).join('');
  });
  $$('[data-render="agenda"]').forEach((el) => {
    el.innerHTML = VF.schedule.flatMap((d) => d.items.map(([t, s]) => `<li><small>${d.day.split(',')[0].slice(0, 3)} ${t}</small>${esc(s.split(' — ')[0])}</li>`)).join('');
  });
  $$('[data-render="schedule"]').forEach((el) => {
    el.innerHTML = VF.schedule.map((d) => `
      <div class="day"><h3>${esc(d.day)}<small>${esc(d.theme)}</small></h3>
      <ol>${d.items.map(([t, s]) => `<li data-rise><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol></div>`).join('');
  });
  $$('[data-render="logos"]').forEach((el) => {
    el.innerHTML = VF.partners.map((p) => p.url ? `<a href="${p.url}" target="_blank" rel="noopener" data-rise><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></a>` : `<div data-rise><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>`).join('');
  });
  $$('[data-render="tiers"]').forEach((el) => {
    el.innerHTML = VF.tiers.map((t, i) => `
      <article class="tier2${i === 0 ? ' feat' : ''}" data-rise>
        ${t.reserved ? '<span class="tag mono">Reserved</span>' : ''}
        <p class="mono">${esc(t.name)}</p><p class="price">${t.price}</p>
        <ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <a class="btn-line" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship ${IC.arrow.replace('<svg ', '<svg width="12" height="12" ')}</a>
      </article>`).join('');
  });
  $$('[data-render="faith"]').forEach((el) => { el.innerHTML = VF.faith.map((f) => `<li data-rise>${esc(f)}</li>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => {
    el.innerHTML = VF.faq.map(([q, a], i) => `
      <div class="item${i === 0 ? ' open' : ''}" data-rise>
        <button type="button" aria-expanded="${i === 0}"><span class="mono">Q.0${i + 1}</span><h3>${esc(q)}</h3><span class="ic">${IC.plus.replace('<svg ', '<svg width="14" height="14" ')}</span></button>
        <div class="ans"><div><p>${esc(a)}</p></div></div>
      </div>`).join('');
    $$('.item button', el).forEach((b) => b.addEventListener('click', () => { const o = b.parentElement.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 650); }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* Speaker drawer */
  let closeDrawer;
  if ($('.open-bio')) {
    document.body.insertAdjacentHTML('beforeend', `<div class="drawer" aria-hidden="true"><div class="scrim"></div><aside class="sheet" role="dialog" aria-modal="true" aria-label="Speaker bio"><button class="close" aria-label="Close">${IC.x}</button><div class="ph"><img alt=""></div><div class="body"></div></aside></div>`);
    const d = $('.drawer');
    closeDrawer = () => { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); window.lenis?.start(); };
    $('.scrim', d).addEventListener('click', closeDrawer); $('.close', d).addEventListener('click', closeDrawer);
    $$('.open-bio').forEach((b) => b.addEventListener('click', () => {
      const s = VF.speakers[+b.dataset.i];
      $('.ph img', d).src = s.img; $('.ph img', d).alt = s.name;
      $('.body', d).innerHTML = `<p class="mono gray">${esc(s.org)}${s.tag ? ' · ' + esc(s.tag) : ''}</p><h3>${esc(s.name)}</h3><p>${esc(s.bio || (s.title + ' for the 2026 Venture-Forge Summit.'))}</p><div><a class="btn-dark" href="${s.linkedin}" target="_blank" rel="noopener">${IC.li.replace('<svg ', '<svg width="14" height="14" ')} Connect on LinkedIn</a></div>`;
      d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); window.lenis?.stop(); $('.close', d).focus();
    }));
  }

  /* ---------- Helpers ---------- */
  const splitWords = (el, cls) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => { if (!w) return; if (/^\s+$/.test(w)) { f.append(w); return; } const s = document.createElement('span'); s.className = cls; s.textContent = w; f.append(s); });
        n.replaceWith(f);
      } else if (n.nodeType === 1 && !n.classList.contains('inline-img')) walk(n);
    });
    walk(el); return $$('.' + cls, el);
  };
  const vw = () => innerWidth, vh = () => innerHeight;

  /* ---------- Motion ---------- */
  function motion() {
    const { gsap, ScrollTrigger } = window;
    const scrollBtn = $('.scroll-btn');
    if (!gsap || reduce) {
      $$('[data-rise]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; });
      scrollBtn.addEventListener('click', () => scrollBy({ top: innerHeight, behavior: 'smooth' }));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1.2, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); document.body.classList.toggle('at-end', e.scroll > e.limit - 40); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    scrollBtn.addEventListener('click', () => { const atEnd = lenis.scroll > lenis.limit - 40; lenis.scrollTo(atEnd ? 0 : lenis.scroll + innerHeight, { duration: atEnd ? 2.2 : 1.4 }); });

    // Pinned home scenes first, so every later trigger measures with their pin spacing
    if ($('#hero')) homeScenes(gsap, ScrollTrigger);

    // Generic rises
    ScrollTrigger.batch('[data-rise]', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .07, overwrite: 'auto' }) });

    // Word fill (scrubbed)
    $$('[data-fill]').forEach((el) => {
      const ws = splitWords(el, 'wf');
      const trig = el.closest('[data-fill-trigger]') || el;
      const sticky = trig !== el;
      ScrollTrigger.create({
        trigger: trig, start: sticky ? 'top 60%' : 'top 85%', end: sticky ? 'bottom 90%' : 'bottom 45%', scrub: true,
        onUpdate: (st) => { const n = Math.round(st.progress * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < n)); }
      });
    });

    // Inner page hero words + floaters
    $$('.p-hero h1').forEach((h) => { const ws = splitWords(h, 'w'); gsap.from(ws, { yPercent: 60, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: .06, delay: .1 }); });
    gsap.from('.p-hero .kicker, .p-hero .lead, .p-hero .cta-row', { opacity: 0, y: 20, duration: 1.2, ease: 'expo.out', delay: .5, stagger: .1 });
    $$('.floaters').forEach((f) => {
      $$('img', f).forEach((img, i) => {
        const d = +img.dataset.d || 1;
        gsap.fromTo(img, { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', delay: .2 + i * .06 });
        gsap.to(img, { y: () => -vh() * .35 * d, ease: 'none', scrollTrigger: { trigger: f.parentElement, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
      });
    });

    // Image bands parallax
    $$('.img-band img').forEach((img) => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('.img-band').forEach((b) => gsap.fromTo(b, { clipPath: 'inset(12% 18% 12% 18% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'top 15%', scrub: true } }));

    // Masonry column drift
    $$('.masonry').forEach((m) => $$('.col', m).forEach((c, i) => gsap.to(c, { y: () => -[0, 120, 40, 200][i % 4] * (vh() / 900), ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })));

    // Footer wordmark rise
    gsap.from('.site-footer .giant .wordmark', { yPercent: 40, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    ScrollTrigger.refresh();
  }

  /* ---------- Home: pinned scenes ---------- */
  function homeScenes(gsap, ScrollTrigger) {
    /* Scene 1 + 2: floating field → inline portrait → takeover → curator spotlight */
    const field = $('#hero .field');
    const pics = [
      ['speakers/caren-kelleher.jpg', 14, 26, 150, .9], ['photos/summit.jpg', 34, 15, 120, .6], ['speakers/jon-werner.jpg', 47, 13, 90, .4],
      ['photos/forge.jpg', 62, 18, 110, .7], ['speakers/renji-bijoy.jpg', 86, 12, 80, .3], ['speakers/derek-welborn.jpg', 76, 37, 150, 1],
      ['speakers/jake-thomsen.jpg', 93, 57, 70, .35], ['photos/hero-austin.jpg', 72, 80, 200, .85], ['speakers/rich-carney.jpg', 57, 89, 95, .5],
      ['speakers/jeff-johns.jpg', 37, 70, 120, .7], ['speakers/patrick-farrell.jpg', 22, 82, 100, .55], ['speakers/sean-riley.jpg', 7, 60, 65, .3],
      ['speakers/joel-trammell.jpg', 26, 46, 70, .25], ['speakers/todd-engstrom.jpg', 88, 85, 90, .6], ['speakers/wesley-fang.jpg', 45, 33, 60, .2],
      ['speakers/cameron-deike.jpg', 4, 12, 90, .5], ['speakers/luke-cochran.jpg', 66, 63, 55, .2]
    ];
    field.innerHTML = pics.map(([src, x, y, w], i) => `<div class="fi" data-i="${i}" style="width:${w}px;height:${Math.round(w * (i % 3 ? 1.15 : .8))}px"><img src="${VF.IMG}${src}" alt=""></div>`).join('');
    const fis = $$('.fi', field);
    const scaleK = () => Math.min(1.25, Math.max(.6, vw() / 1440));
    fis.forEach((el, i) => gsap.set(el, { xPercent: -50, yPercent: -50, x: () => (pics[i][1] - 50) / 100 * vw(), y: () => (pics[i][2] - 50) / 100 * vh(), scale: scaleK }));
    gsap.from(fis.map((f) => $('img', f)), { opacity: 0, scale: .2, duration: 1.6, ease: 'expo.out', stagger: { each: .04, from: 'random' }, delay: .1 });
    // Idle float
    fis.forEach((el, i) => gsap.to($('img', el), { y: (i % 2 ? 1 : -1) * (6 + (i % 4) * 3), duration: 3 + (i % 5) * .6, ease: 'sine.inOut', yoyo: true, repeat: -1 }));

    const l1 = $$('#hero .l1 .w'), l2w = $$('#hero .l2 .w'), inline = $('#hero .inline-img');
    gsap.from(l1, { yPercent: 80, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: .08, delay: .3 });
    gsap.set([...l2w, inline], { opacity: 0, yPercent: 60 });

    const frame = $('#hero .takeover .frame');
    const ir = () => { const r = inline.getBoundingClientRect(), h = $('#hero').getBoundingClientRect(); return { x: r.left - h.left + r.width / 2 - vw() / 2, y: r.top - h.top + r.height / 2 - vh() / 2, w: r.width, h: r.height }; };
    gsap.set(frame, { xPercent: -50, yPercent: -50, x: () => ir().x, y: () => ir().y, width: () => ir().w, height: () => ir().h, opacity: 0 });
    const slides = $$('#hero .curator .slide'), frames = $$('#hero .takeover .frame img'), dots = $$('#hero .curator .dots i');
    gsap.set(slides, { opacity: 0 }); gsap.set(frames.slice(1), { opacity: 0 });
    const lines = $$('#hero .curator line');
    lines.forEach((l) => { l.style.strokeDasharray = "none"; });
    gsap.set('#hero .curator .lines, #hero .curator .dots', { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=650%', pin: true, scrub: 1, invalidateOnRefresh: true } });
    fis.forEach((el, i) => {
      const [, x, y, , d] = pics[i];
      tl.to(el, { x: () => (x - 50) / 100 * vw() * (1 + d * 2.2), y: () => (y - 50) / 100 * vh() * (1 + d * 2.2), scale: () => scaleK() * (1 + d * 3), duration: .42 }, 0);
      tl.to(el, { opacity: 0, duration: .12 }, .26 + d * .06);
    });
    tl.to(l1, { yPercent: -80, opacity: 0, stagger: .015, duration: .06 }, .1)
      .to([l2w[0], inline, l2w[1]], { yPercent: 0, opacity: 1, stagger: .02, duration: .07 }, .15)
      .set(frame, { opacity: 1 }, .3)
      .set(inline, { opacity: 0 }, .3)
      .to(frame, { x: 0, y: 0, width: () => vw(), height: () => vh(), duration: .14, ease: 'power2.inOut' }, .3)
      .to(l2w, { opacity: 0, duration: .04 }, .31)
      .fromTo('#hero .feat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .05 }, .44)
      .to('#hero .feat', { opacity: 0, y: -30, duration: .05 }, .53)
      .to('#hero .curator .lines, #hero .curator .dots', { opacity: 1, duration: .02 }, .56)
      .to(lines, { strokeDashoffset: 0, duration: .08, stagger: .02 }, .56)
      .to(slides[0], { opacity: 1, duration: .04 }, .58);
    const steps = [.72, .86];
    steps.forEach((t, k) => {
      tl.to(slides[k], { opacity: 0, duration: .03 }, t)
        .to(frames[k + 1], { opacity: 1, duration: .04 }, t)
        .to(slides[k + 1], { opacity: 1, duration: .04 }, t + .02);
    });
    tl.to({}, { duration: .06 });
    tl.eventCallback('onUpdate', () => { const p = tl.progress(); const idx = p < .72 ? 0 : p < .86 ? 1 : 2; dots.forEach((d, i) => d.classList.toggle('on', i === idx)); });

    /* Scene 3: statement stream parallax */
    $$('.stream .p-card').forEach((c, i) => gsap.from(c, { y: 120, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 95%', once: true } }));

    /* Scene 4: collection unfolds */
    const coll = $('.collection');
    if (coll) {
      gsap.fromTo(coll, { clipPath: 'inset(8% 28% 0% 28% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'none', scrollTrigger: { trigger: coll, start: 'top 95%', end: 'top top', scrub: true } });
      gsap.to('.collection .head .cover', { yPercent: -60, scale: .55, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.collection .head', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.from('.collection .head h2, .collection .head .sub, .collection .head .kicker', { y: 50, opacity: 0, stagger: .08, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.collection .head', start: 'top 55%', once: true } });
    }

    /* Scene 5: giant letters */
    const giant = $('.s-giant');
    if (giant) {
      const words = $$('.word', giant);
      words.forEach((w) => { const t = w.dataset.text; w.innerHTML = `<span>${[...t].map((c) => `<i>${c}</i>`).join('')}</span>`; });
      const rnd = (a) => (Math.random() * 2 - 1) * a;
      const gt = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: giant, start: 'top top', end: '+=360%', pin: true, scrub: 1 } });
      words.forEach((w, k) => {
        const ls = $$('i', w), at = k * 1;
        gt.fromTo(ls, { x: () => rnd(vw() * .45), y: () => rnd(vh() * .55) + vh() * .3, rotation: () => rnd(70), opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: .45, stagger: .03, ease: 'power2.out' }, at);
        if (k < words.length - 1) gt.to(ls, { y: () => -vh() * .7 + rnd(60), rotation: () => rnd(40), opacity: 0, duration: .35, stagger: .02, ease: 'power2.in' }, at + .7);
      });
      gt.to('.s-giant .wash', { clipPath: 'polygon(0 0%, 100% -40%, 100% 100%, 0 100%)', duration: .9 }, 1.55);
      gt.to({}, { duration: .3 });
    }

    /* Scene 6 + 7: zoom into the forge → agenda list */
    const zoom = $('.s-zoom');
    if (zoom) {
      const grow = $('.grow', zoom), spacer = $('.spacer', zoom), [lt, rt] = $$('.line .txt', zoom);
      const bgs = $$('.bgs img', grow), list = $('.agenda ul', zoom), items = $$('li', list);
      const place = () => { const r = spacer.getBoundingClientRect(), z = zoom.getBoundingClientRect(); return { x: r.left - z.left + r.width / 2 - vw() / 2, y: r.top - z.top + r.height / 2 - vh() / 2, w: r.width, h: r.height }; };
      gsap.set(grow, { x: () => place().x, y: () => place().y, width: () => place().w, height: () => place().h, xPercent: -50, yPercent: -50 });
      const zl = $$('.agenda line', zoom);
      zl.forEach((l) => { l.style.strokeDasharray = "none"; });
      const zt = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: zoom, start: 'top top', end: '+=520%', pin: true, scrub: 1, invalidateOnRefresh: true } });
      zt.to(lt, { x: () => -vw() * .35, opacity: 0, duration: .2, ease: 'power2.in' }, .05)
        .to(rt, { x: () => vw() * .35, opacity: 0, duration: .2, ease: 'power2.in' }, .05)
        .to(grow, { x: 0, y: 0, width: () => vw(), height: () => vh(), duration: .22, ease: 'power2.inOut' }, .05)
        .to('.s-zoom .veil', { opacity: 1, duration: .06 }, .24)
        .to('.s-zoom .agenda', { opacity: 1, duration: .06 }, .27)
        .to(zl, { strokeDashoffset: 0, duration: .1, stagger: .03 }, .27)
        .fromTo(list, { y: 0 }, { y: () => -(list.scrollHeight - vh() * .7), duration: .68 }, .32);
      zt.eventCallback('onUpdate', () => {
        const p = zt.progress();
        const c = $('.agenda .list', zoom).getBoundingClientRect(); const mid = c.top + c.height / 2;
        let best = 0, bd = 1e9; items.forEach((li, i) => { const r = li.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
        items.forEach((li, i) => li.classList.toggle('on', i === best && p > .3));
        const b = p < .55 ? 0 : p < .8 ? 1 : 2; bgs.forEach((im, i) => im.classList.toggle('on', i === b));
      });
      $$('.agenda .thumbs img', zoom).forEach((im, i) => gsap.fromTo(im, { y: vh() * .6 }, { y: -vh() * .6, ease: 'none', scrollTrigger: { trigger: zoom, start: 'top top', end: '+=520%', scrub: true } }));
    }

    /* Scene 8: floaters drift across closing statement */
    $$('.s-close .floaters img').forEach((img) => { const d = +img.dataset.d || 1; gsap.fromTo(img, { y: vh() * .4 * d }, { y: -vh() * .6 * d, ease: 'none', scrollTrigger: { trigger: '.s-close', start: 'top bottom', end: 'bottom top', scrub: true } }); });
    gsap.from('.s-join h2, .s-join .btn-dark', { y: 40, opacity: 0, stagger: .1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.s-join', start: 'top 60%', once: true } });
  }

  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
