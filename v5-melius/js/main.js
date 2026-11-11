/* Venture Forge — V5 Canvas: chrome, node graph, carousel, motion */
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
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="top">
      <div class="announce"><span>New: the 2026 lineup is live — 21 voices on the forge floor.</span><a class="l" href="speakers.html">See speakers</a><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></div>
      <header class="nav"><div class="wrap bar">
        <a class="logo" href="index.html" aria-label="Venture Forge Austin — home"><img src="${IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"></a>
        <nav class="links" aria-label="Primary">${VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
        <div class="acts"><a class="p" href="partner.html">Partner</a><a class="r" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></div>
        <button class="burger" aria-label="Open menu" aria-expanded="false">☰</button>
      </div></header>
    </div>
    <nav class="sheet" aria-label="Menu"><button class="x" aria-label="Close menu">×</button>${VF.nav.map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}<a href="${VF.links.register}" target="_blank" rel="noopener" style="color:var(--gold)">Register →</a></nav>`);
  const setMenu = (o) => { document.body.classList.toggle('menu-open', o); $('.burger').setAttribute('aria-expanded', o); o ? window.lenis?.stop() : window.lenis?.start(); };
  $('.burger').addEventListener('click', () => setMenu(true)); $('.sheet .x').addEventListener('click', () => setMenu(false));

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot"><div class="wrap">
      <div class="top-row">
        <div class="nl"><h3>Don't miss <em>out.</em></h3><p>Registration is opening soon. Be the first to know.</p><a class="btn" href="${VF.links.register}" target="_blank" rel="noopener">Get notified</a></div>
        <div class="cols">
          <div><h5>Summit</h5><ul><li><a href="2026-event.html">2026 Event</a></li><li><a href="speakers.html">Speakers</a></li><li><a href="vision.html">Vision</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
          <div><h5>Engage</h5><ul><li><a href="partner.html">Partner</a></li><li><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></li><li><a href="${VF.links.chat}" target="_blank" rel="noopener">Event Chat</a></li></ul></div>
          <div><h5>Gathering</h5><ul><li>Riverbend Centre</li><li>Austin, Texas</li><li>Sept 23–24, 2026</li></ul></div>
        </div>
      </div>
      <div class="bottom"><img src="${IMG}logos/vf-logo-white.png" alt="Venture Forge Austin"><span>© 2026 Venture-Forge Austin. All rights reserved.</span><span>Investing in innovation. Forging eternal impact.</span></div>
    </div></footer>`);

  /* ---------- Renderers ---------- */
  const pcard = (p, opts = {}) => `
    <article class="pcard" data-up>
      <div class="nl"><span>${esc(p.name)}</span><i>${esc(opts.chip || p.org || 'Network')}</i></div>
      <div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"><a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div>
      <p class="t">${esc(p.title)}</p>
      ${opts.bio && p.bio ? `<p class="more">${esc(p.bio)}</p><button class="toggle" type="button" aria-expanded="false">Read bio +</button>` : ''}
    </article>`;
  $$('[data-render="speakers"]').forEach((el) => { const n = +el.dataset.limit || VF.speakers.length; el.innerHTML = VF.speakers.slice(0, n).map((s) => pcard(s, { bio: el.dataset.bio === 'true', chip: s.tag || s.org })).join(''); });
  $$('[data-render="net"]').forEach((el) => { el.innerHTML = VF.network.slice(0, +el.dataset.limit || 12).map((p) => pcard(p, { chip: p.placeholder ? 'Network' : 'Speaker' })).join(''); });
  $$('.pcard .toggle').forEach((b) => b.addEventListener('click', () => { const c = b.closest('.pcard'); const o = c.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.textContent = o ? 'Close bio −' : 'Read bio +'; setTimeout(() => window.ScrollTrigger?.refresh(), 50); }));
  $$('[data-render="marq"]').forEach((el) => { const r = VF.partners.map((p) => `<img src="${p.logo}" alt="${esc(p.name)}" loading="lazy">`).join(''); el.innerHTML = `<div class="track">${r}${r.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"')}</div>`; });
  $$('[data-render="showcase"]').forEach((el) => {
    el.innerHTML = VF.showcase.map((c) => `<a class="pcard" href="${c.url}" target="_blank" rel="noopener" data-up><div class="nl"><span>${esc(c.name)}</span><i>Showcase</i></div><div class="ph" style="background:#fff;display:grid;place-items:center"><img src="${c.logo}" alt="" style="width:70%;height:60%;object-fit:contain"></div><p class="t">${esc(c.people)} · Visit site ↗</p></a>`).join('');
  });
  $$('[data-render="timeline"]').forEach((el) => { el.innerHTML = VF.schedule.map((d) => `<div class="tl" data-up><h3>${esc(d.day)}</h3><p class="th">${esc(d.theme)}</p><ol>${d.items.map(([t, s]) => `<li><time>${t}</time><span>${esc(s)}</span></li>`).join('')}</ol></div>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => {
    const items = el.dataset.set === 'faith' ? VF.faith.map((f, i) => [['The Scriptures', 'God', 'Jesus Christ', 'The Holy Spirit', 'Unity'][i], f]) : VF.faq;
    el.innerHTML = items.map(([q, a], i) => `<div class="it${i === 0 ? ' open' : ''}"><button aria-expanded="${i === 0}">${esc(q)}</button><div class="a"><div><p>${esc(a)}</p></div></div></div>`).join('');
    $$('button', el).forEach((b) => b.addEventListener('click', () => { const o = b.parentElement.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 550); }));
  });
  $$('[data-render="plans"]').forEach((el) => {
    const sponsor = VF.tiers.map((t, i) => `<article class="plan${i === 1 ? ' hl' : ''}">${t.reserved ? '<span class="badge">Reserved</span>' : i === 1 ? '<span class="badge">Available</span>' : ''}<p class="nm">${esc(t.name)}</p><p class="pr">${t.price}<small>one-time</small></p><ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><a class="btn${i === 1 ? '' : ' white'}" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship</a></article>`).join('');
    const give = [['Founders', 'Underwrite scholarships that help Christ-centered entrepreneurs move from vision to action at the summit.'], ['Programs', 'Fund the roundtables, working sessions, and year-round convenings that equip founders and galvanize the ecosystem.'], ['Impact', 'Direct catalytic capital toward ventures that transform lives, strengthen communities, and advance the common good.']]
      .map(([n, d], i) => `<article class="plan${i === 2 ? ' hl' : ''}"><p class="nm">${n}</p><p class="pr">Any<small>amount</small></p><ul><li>${d}</li></ul><a class="btn${i === 2 ? '' : ' white'}" href="${VF.links.give}" target="_blank" rel="noopener">Give today</a></article>`).join('');
    el.innerHTML = sponsor;
    const tg = document.querySelector('[data-plan-toggle]');
    if (tg) $$('button', tg).forEach((b) => b.addEventListener('click', () => { $$('button', tg).forEach((x) => x.classList.toggle('on', x === b)); el.innerHTML = b.dataset.v === 'give' ? give : sponsor; el.style.gridTemplateColumns = b.dataset.v === 'give' ? 'repeat(auto-fit, minmax(16rem, 1fr))' : ''; window.gsap?.from($$('.plan', el), { y: 20, opacity: 0, stagger: .06, duration: .6, ease: 'expo.out' }); }));
  });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  /* ---------- Node graph ---------- */
  const node = (src, label, chip, x, y, cls = '') => `<div class="node ${cls}" style="left:${x}%;top:${y}%"><span class="port l"></span><span class="port r"></span><div class="nl"><span>${esc(label)}</span><i>${esc(chip)}</i></div><img src="${IMG}${src}" alt=""></div>`;
  const SCENES = {
    audience: [
      { tab: 'For Investors', left: 'photos/summit.jpg', prompt: 'Investors gain access to curated, faith-driven businesses and strategies for mission-aligned investing.',
        nodes: [['speakers/jake-thomsen.jpg', 'Jake Thomsen', "Sovereign's", 6, 30], ['speakers/patrick-farrell.jpg', 'Patrick Farrell', 'Keystone', 6, 62], ['photos/summit.jpg', 'Kingdom Due Diligence', 'Panel', 37, 44, 'wide'], ['speakers/noble-origins.jpg', 'Founders Showcase', 'Output', 70, 36, 'wide out']], wires: [[0, 2], [1, 2], [2, 3]] },
      { tab: 'For Leaders', left: 'photos/hero-austin.jpg', prompt: 'Connect with innovators shaping markets and discover how faith is fueling entrepreneurship.',
        nodes: [['speakers/mark-mcclain.jpg', 'Mark McClain', 'SailPoint', 6, 28], ['speakers/caren-kelleher.jpg', 'Caren Kelleher', 'Gold Rush', 6, 60], ['speakers/renji-bijoy.jpg', 'Renji Bijoy', 'Immersed', 38, 64], ['photos/forge.jpg', 'Faith-fueled ventures', 'Output', 68, 34, 'wide out']], wires: [[0, 3], [1, 2], [2, 3]] },
      { tab: 'For Supporting Organizations', left: 'photos/forge.jpg', prompt: 'Showcase your vision and expertise with the faith-driven business leaders who navigate their God-given mandate in the marketplace.',
        nodes: [['speakers/todd-engstrom.jpg', 'Todd Engstrom', 'Mission Society', 6, 30], ['speakers/wesley-fang.jpg', 'Wesley Fang', 'Kingdom Capital', 6, 62], ['speakers/jeff-johns.jpg', 'Jeff Johns', 'Impact Fdn.', 38, 46], ['photos/hero-austin.jpg', 'The Kingdom economy', 'Output', 69, 38, 'wide out']], wires: [[0, 2], [1, 2], [2, 3]] }
    ],
    vision: [
      { nodes: [['speakers/jon-werner.jpg', 'Entrepreneurs', 'Input', 2, 4], ['speakers/rich-carney.jpg', 'Mentors', 'Input', 2, 54], ['speakers/jake-thomsen.jpg', 'Investors', 'Input', 26, 70], ['photos/summit.jpg', 'Community of faith', 'Input', 26, 0], ['photos/forge.jpg', 'The Forge', 'Heat · Pressure · Craft', 50, 30, 'wide'], ['speakers/noble-origins.jpg', 'Lasting value', 'Output', 78, 26, 'wide out']], wires: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 5]] }
    ]
  };
  function drawWires(graph, wires) {
    const svg = $('svg.wires', graph); const g = graph.getBoundingClientRect(); const ns = $$('.scene.on .node, .scene:only-of-type .node', graph);
    svg.innerHTML = wires.map(([a, b]) => {
      const A = ns[a]?.getBoundingClientRect(), B = ns[b]?.getBoundingClientRect(); if (!A || !B) return '';
      const x1 = A.right - g.left, y1 = A.top + A.height / 2 - g.top, x2 = B.left - g.left, y2 = B.top + B.height / 2 - g.top, dx = Math.max(40, (x2 - x1) * .5);
      return `<path d="M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}"/>`;
    }).join('');
    return $$('path', svg);
  }
  function buildGraph(el, scenes) {
    el.innerHTML = `<svg class="wires" aria-hidden="true"></svg>` + scenes.map((s, i) => `<div class="scene${i === 0 ? ' on' : ''}" style="${i ? 'visibility:hidden' : ''}">${s.nodes.map((n) => node(...n)).join('')}</div>`).join('');
  }
  $$('[data-graph]').forEach((el) => buildGraph(el, SCENES[el.dataset.graph]));

  /* ---------- Hero scramble ---------- */
  function scramble(el, words, every = 2600) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'; let i = 0;
    const to = (w) => { const from = el.textContent; const len = Math.max(from.length, w.length); let f = 0; const tick = () => { f++; let out = ''; for (let k = 0; k < len; k++) { const done = f > k * 1.6 + 6; out += done ? (w[k] || '') : (k < len ? `<span class="g">${chars[(Math.random() * 26) | 0]}</span>` : ''); } el.innerHTML = out; if (f < len * 1.6 + 8) requestAnimationFrame(tick); else el.textContent = w; }; tick(); };
    setInterval(() => { i = (i + 1) % words.length; to(words[i]); }, every);
  }
  if (!reduce) $$('[data-scramble]').forEach((el) => scramble(el, el.dataset.scramble.split('|')));

  /* ---------- Motion ---------- */
  function motion() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || reduce) { $$('[data-up]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); $$('[data-graph]').forEach((g) => drawWires(g, SCENES[g.dataset.graph][0].wires)); return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1.1 }); window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

    // Hero
    gsap.from('.hero h1, .hero .blob-wrap, .hero .sub, .hero .row', { y: 30, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .1 });
    $$('.hero .tag').forEach((t, i) => { gsap.from(t, { scale: .6, opacity: 0, duration: .9, ease: 'back.out(1.8)', delay: .6 + i * .12 }); gsap.to(t, { y: i % 2 ? 10 : -10, duration: 3 + i * .4, ease: 'sine.inOut', yoyo: true, repeat: -1 }); });
    $$('.page-hero > *').forEach((e, i) => gsap.from(e, { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', delay: .1 + i * .08 }));

    // Pinned node-canvas showcase
    $$('.show').forEach((show) => {
      const key = show.dataset.show; const scenes = SCENES[key];
      const graph = $('[data-graph]', show), tabs = $$('.tabs button', show), lefts = $$('.left img', show), caps = $('.left .cap h3', show), prompt = $('.prompt p', show);
      let cur = -1, typer;
      const type = (txt) => { clearInterval(typer); let i = 0; prompt.textContent = ''; typer = setInterval(() => { prompt.textContent = txt.slice(0, ++i); if (i >= txt.length) clearInterval(typer); }, 18); };
      const go = (i) => {
        if (i === cur) return; cur = i;
        tabs.forEach((t, k) => t.classList.toggle('on', k === i)); lefts.forEach((im, k) => im.classList.toggle('on', k === i));
        caps.textContent = scenes[i].tab; type(scenes[i].prompt);
        const sc = $$('.scene', graph); sc.forEach((s, k) => { s.classList.toggle('on', k === i); s.style.visibility = k === i ? 'visible' : 'hidden'; });
        const ns = $$('.node', sc[i]);
        gsap.fromTo(ns, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(1.7)', stagger: .12 });
        setTimeout(() => { const ps = drawWires(graph, scenes[i].wires); ps.forEach((p, k) => { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: .7, delay: k * .15, ease: 'power2.inOut' }); }); }, 450);
      };
      const hh = $('.top').offsetHeight; document.documentElement.style.setProperty('--top-h', hh + 'px');
      const st = ScrollTrigger.create({ trigger: show, start: () => 'top ' + $('.top').offsetHeight + 'px', end: '+=' + (scenes.length * 90) + '%', pin: $('.stage', show), onUpdate: (s) => go(Math.min(scenes.length - 1, Math.floor(s.progress * scenes.length * .999))), onEnter: () => go(0) });
      tabs.forEach((t, k) => t.addEventListener('click', () => lenis.scrollTo(st.start + (st.end - st.start) * ((k + .5) / scenes.length), { duration: 1 })));
      go(0);
      addEventListener('resize', () => drawWires(graph, scenes[cur].wires));
    });
    // Static graphs (e.g. vision flow)
    $$('.flow [data-graph]').forEach((graph) => {
      const sc = SCENES[graph.dataset.graph][0]; const ns = $$('.node', graph);
      gsap.set(ns, { scale: .6, opacity: 0 });
      ScrollTrigger.create({ trigger: graph, start: 'top 70%', once: true, onEnter: () => {
        gsap.to(ns, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(1.7)', stagger: .12 });
        setTimeout(() => drawWires(graph, sc.wires).forEach((p, k) => { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: .8, delay: k * .12, ease: 'power2.inOut' }); }), 800);
      } });
      addEventListener('resize', () => drawWires(graph, sc.wires));
    });

    // Carousel with floating tags
    $$('.solutions').forEach((sol) => {
      const data = JSON.parse($('script[type="application/json"]', sol).textContent);
      const card = $('.sol-card', sol), floats = $$('.floatie', sol), pills = $$('.pills button', sol); let i = 0, timer;
      const show = (k, anim = true) => {
        i = k; const d = data[k];
        pills.forEach((p, n) => p.classList.toggle('on', n === k));
        const apply = () => { $('img', card).src = IMG + d.img; $('.ph span', card).textContent = d.kicker; $('h3', card).textContent = d.title; $('p', card).textContent = d.text; d.floats.forEach(([src, tag], n) => { if (floats[n]) { $('img', floats[n]).src = IMG + src; $('b', floats[n]).textContent = tag; } }); };
        if (!anim) return apply();
        gsap.timeline().to(card, { y: 20, opacity: 0, rotate: -2, duration: .3, ease: 'power2.in' }).to(floats, { scale: .7, opacity: 0, duration: .25, stagger: .03 }, 0).call(apply)
          .to(card, { y: 0, opacity: 1, rotate: 0, duration: .6, ease: 'back.out(1.6)' }).to(floats, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(2)', stagger: .05 }, '-=.4');
      };
      const auto = () => { clearInterval(timer); timer = setInterval(() => show((i + 1) % data.length), 5000); };
      pills.forEach((p, k) => p.addEventListener('click', () => { show(k); auto(); }));
      show(0, false);
      ScrollTrigger.create({ trigger: sol, start: 'top 70%', end: 'bottom top', onToggle: (s) => s.isActive ? auto() : clearInterval(timer) });
      floats.forEach((f, n) => gsap.to(f, { y: n % 2 ? 12 : -12, duration: 2.6 + n * .3, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
    });

    ScrollTrigger.batch('[data-up]', { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .06, overwrite: 'auto' }) });
    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
