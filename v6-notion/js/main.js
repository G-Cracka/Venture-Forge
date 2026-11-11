/* Venture Forge — V6 Workspace: chrome, workspace mock, docs, motion */
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

  /* ---------- Chrome ---------- */
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="nav"><div class="wrap bar">
      <a class="logo" href="index.html" aria-label="Venture Forge Austin — home"><img src="${IMG}logos/vf-logo.png" alt="Venture Forge Austin"></a>
      <nav class="links" aria-label="Primary">${VF.nav.filter(([h]) => h !== 'index.html').map(([h, l]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
      <div class="acts"><a class="t" href="partner.html">Partner</a><a class="btn gold" href="${VF.links.register}" target="_blank" rel="noopener">Register</a></div>
      <button class="burger" aria-label="Open menu" aria-expanded="false">☰</button>
    </div></header>
    <nav class="msheet" aria-label="Menu">${VF.nav.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}</nav>`);
  $('.burger').addEventListener('click', () => { const o = document.body.classList.toggle('menu-open'); $('.burger').setAttribute('aria-expanded', o); });
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot"><div class="wrap">
      <div class="cols">
        <div class="brand"><img src="${IMG}logos/vf-logo.png" alt="Venture Forge Austin"><blockquote>“The goal is not spectacle; it is partnership.”<cite>Venture Forge Austin</cite></blockquote></div>
        <div><h5>Summit</h5><ul><li><a href="2026-event.html">2026 Event</a></li><li><a href="speakers.html">Speakers</a></li><li><a href="vision.html">Vision</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
        <div><h5>Engage</h5><ul><li><a href="partner.html">Partner</a></li><li><a href="${VF.links.register}" target="_blank" rel="noopener">Register</a></li><li><a href="${VF.links.chat}" target="_blank" rel="noopener">Event Chat</a></li></ul></div>
        <div><h5>Gathering</h5><ul><li>Riverbend Centre</li><li>Austin, Texas</li><li>Sept 23–24, 2026</li></ul></div>
      </div>
      <div class="legal"><span>© 2026 Venture-Forge Austin. All rights reserved.</span><span>Investing in innovation. Forging eternal impact.</span></div>
    </div></footer>`);

  /* ---------- Data helpers ---------- */
  const typeOf = (s) => /panel/i.test(s) ? ['Panel', 'g'] : /keynote|address/i.test(s) ? ['Keynote', 'd'] : /network|happy|break|coffee/i.test(s) ? ['Networking', 'b'] : /showcase/i.test(s) ? ['Showcase', 'r'] : ['Program', ''];
  const agendaRows = (limit) => VF.schedule.flatMap((d) => d.items.map(([t, s]) => ({ day: d.day.split(',')[0], t, s }))).slice(0, limit);
  const tableHTML = (limit) => `<table class="dbt"><thead><tr><th>Aa Session</th><th>Time</th><th class="hide-sm">Day</th><th>Type</th></tr></thead><tbody>${agendaRows(limit).map((r) => { const [ty, c] = typeOf(r.s); return `<tr><td>${esc(r.s)}</td><td style="white-space:nowrap">${r.t}</td><td class="hide-sm">${r.day}</td><td><span class="tag ${c}">${ty}</span></td></tr>`; }).join('')}</tbody></table>`;
  const galleryHTML = (n) => `<div class="gal">${VF.speakers.slice(0, n).map((s) => `<div class="c"><img src="${s.img}" alt=""><b>${esc(s.name)}</b><span>${esc(s.org)}</span></div>`).join('')}</div>`;
  const timelineHTML = () => `<div class="tline">${[['Wed 5:00 PM', 'Happy Hour & registration', ''], ['Wed 6:00 PM', 'Opening address: Kingdom Investing', 'd'], ['Wed 6:45 PM', 'Dinner / Panel: Faith capital and stewardship', ''], ['Thu 10:00 AM', 'Founders showcase', 'd'], ['Thu 12:30 PM', 'Founders panel', ''], ['Thu 1:15 PM', 'Investors Panel: Kingdom Due Diligence', ''], ['Thu 2:45 PM', 'Keynote: Faith journey', 'd'], ['Thu 3:45 PM', 'Unity: myth or reality', '']].map(([l, s, c], i) => `<div class="lane"><span>${l}</span><span class="bar ${c}" style="width:${38 + (i * 23) % 55}%;margin-left:${(i * 9) % 30}%">${esc(s)}</span></div>`).join('')}</div>`;

  /* Workspace mock */
  $$('[data-mock]').forEach((m) => {
    const views = { overview: tableHTML(8), speakers: galleryHTML(8), timeline: timelineHTML() };
    $('.main .view[data-v="overview"]', m).innerHTML = views.overview;
    $('.main .view[data-v="speakers"]', m).innerHTML = views.speakers;
    $('.main .view[data-v="timeline"]', m).innerHTML = views.timeline;
    const btns = $$('[data-to]', m); let idx = 0, timer, touched = false;
    const order = ['overview', 'speakers', 'timeline'];
    const go = (v) => { idx = order.indexOf(v); btns.forEach((b) => b.classList.toggle('on', b.dataset.to === v)); $$('.view', m).forEach((x) => x.classList.toggle('on', x.dataset.v === v)); if (v === 'timeline' && window.gsap && !reduce) gsap.from($$('.tline .bar', m), { scaleX: 0, duration: .8, ease: 'expo.out', stagger: .06 }); };
    btns.forEach((b) => b.addEventListener('click', () => { touched = true; clearInterval(timer); go(b.dataset.to); }));
    go('overview');
    if (!reduce) timer = setInterval(() => { if (!touched) go(order[(idx + 1) % 3]); }, 4200);
  });

  /* Renderers */
  $$('[data-render="mini-net"]').forEach((el) => { el.innerHTML = VF.network.slice(0, +el.dataset.limit || 6).map((p) => `<div><img src="${p.img}" alt=""><span>${esc(p.name)}<span class="sub">${esc(p.title)}</span></span><a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div>`).join(''); });
  $$('[data-render="logostrip"]').forEach((el) => { el.innerHTML = VF.partners.slice(0, 10).map((p) => `<img src="${p.logo}" alt="${esc(p.name)}" loading="lazy">`).join(''); });
  const person = (p, i, peek) => `
    <${peek ? 'button type="button"' : 'article'} class="person" data-up ${peek ? `data-peek="${i}" aria-label="Open ${esc(p.name)}"` : ''}>
      <div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"><a class="li" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="Connect with ${esc(p.name)} on LinkedIn">${LI}</a></div>
      <div class="b"><b>${esc(p.name)}</b><div class="props">${p.tag ? `<span class="tag d">${esc(p.tag)}</span>` : ''}<span class="tag ${p.placeholder ? 'b' : 'g'}">${esc(p.org || (p.placeholder ? 'Network' : 'Speaker'))}</span></div></div>
    </${peek ? 'button' : 'article'}>`;
  $$('[data-render="people"]').forEach((el) => { el.innerHTML = VF.speakers.map((p, i) => person(p, i, true)).join(''); });
  $$('[data-render="net"]').forEach((el) => { el.innerHTML = VF.network.slice(0, +el.dataset.limit || 12).map((p, i) => person({ ...p, org: p.title }, i, false)).join(''); });
  $$('[data-render="agenda-table"]').forEach((el) => { el.innerHTML = tableHTML(99); });
  $$('[data-render="agenda-board"]').forEach((el) => { el.style.setProperty('--cols', 2); el.innerHTML = VF.schedule.map((d) => `<div><p class="colh"><span class="tag g">${esc(d.day)}</span> ${d.items.length}</p>${d.items.map(([t, s]) => { const [ty, c] = typeOf(s); return `<div class="card"><b>${esc(s)}</b><span class="tag">${t}</span> <span class="tag ${c}">${ty}</span></div>`; }).join('')}</div>`).join(''); });
  $$('[data-render="showcase-gal"]').forEach((el) => { el.innerHTML = VF.showcase.map((c) => `<a class="c" href="${c.url}" target="_blank" rel="noopener"><img src="${c.img}" alt=""><b>${esc(c.name)}</b><span>${esc(c.people)}</span></a>`).join(''); });
  $$('[data-render="tiers"]').forEach((el) => { el.style.setProperty('--cols', 4); el.innerHTML = VF.tiers.map((t) => `<div><p class="colh"><span class="tag ${t.reserved ? 'd' : 'g'}">${t.reserved ? 'Reserved' : 'Available'}</span></p><div class="card"><b>${esc(t.name)}</b><span class="tag g">${t.price}</span><ul>${t.perks.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><a class="btn${t.reserved ? ' soft' : ' gold'}" href="${VF.links.sponsor}" target="_blank" rel="noopener">Register for sponsorship</a></div></div>`).join(''); });
  $$('[data-render="faith"]').forEach((el) => { el.innerHTML = VF.faith.map((f) => `<li>${esc(f)}</li>`).join(''); });
  $$('[data-render="faq"]').forEach((el) => { el.innerHTML = VF.faq.map(([q, a], i) => `<div class="toggle${i === 0 ? ' open' : ''}"><button aria-expanded="${i === 0}">${esc(q)}</button><div class="body"><div><p>${esc(a)}</p></div></div></div>`).join(''); });
  $$('[data-href]').forEach((a) => { a.href = VF.links[a.dataset.href]; });

  // Toggles
  document.addEventListener('click', (e) => { const b = e.target.closest('.toggle > button'); if (!b) return; const t = b.parentElement; const o = t.classList.toggle('open'); b.setAttribute('aria-expanded', o); setTimeout(() => window.ScrollTrigger?.refresh(), 500); });
  // DB view switchers
  $$('[data-dbviews]').forEach((g) => { const btns = $$('button', g); const scope = g.closest('[data-db]'); btns.forEach((b) => b.addEventListener('click', () => { btns.forEach((x) => x.classList.toggle('on', x === b)); $$('[data-dbv]', scope).forEach((v) => { v.hidden = v.dataset.dbv !== b.dataset.v; }); setTimeout(() => window.ScrollTrigger?.refresh(), 50); })); });

  // Side peek
  if ($('[data-peek]')) {
    document.body.insertAdjacentHTML('beforeend', `<div class="peek" aria-hidden="true"><div class="scrim"></div><aside class="panel" role="dialog" aria-modal="true" aria-label="Speaker"><div class="bar"><span>Speakers / <b class="nm"></b></span><button aria-label="Close">×</button></div><div class="pcover"><img alt=""></div><div class="pb"></div></aside></div>`);
    const pk = $('.peek'); const close = () => { pk.classList.remove('open'); pk.setAttribute('aria-hidden', 'true'); window.lenis?.start(); };
    $('.scrim', pk).addEventListener('click', close); $('.bar button', pk).addEventListener('click', close); addEventListener('keydown', (e) => e.key === 'Escape' && close());
    document.addEventListener('click', (e) => {
      const c = e.target.closest('[data-peek]'); if (!c || e.target.closest('.li')) return;
      const s = VF.speakers[+c.dataset.peek];
      $('.nm', pk).textContent = s.name; $('.pcover img', pk).src = s.img;
      $('.pb', pk).innerHTML = `<h3>${esc(s.name)}</h3><dl class="props-t"><dt>Organization</dt><dd>${esc(s.org)}</dd><dt>Role</dt><dd>${esc(s.title)}</dd>${s.tag ? `<dt>Program</dt><dd><span class="tag d">${esc(s.tag)}</span></dd>` : ''}<dt>Event</dt><dd><span class="tag g">Sept 23–24, 2026</span></dd></dl><p style="line-height:1.7">${esc(s.bio || s.title + ' for the 2026 Venture-Forge Summit.')}</p><div style="margin-top:1.5rem"><a class="btn" href="${s.linkedin}" target="_blank" rel="noopener">Connect on LinkedIn</a></div>`;
      pk.classList.add('open'); pk.setAttribute('aria-hidden', 'false'); window.lenis?.stop(); $('.bar button', pk).focus();
    });
  }

  /* Pill typing: types the word, holds, erases, retypes */
  $$('[data-type]').forEach((el) => {
    const w = el.dataset.type, txt = $('.txt', el); if (reduce) { txt.textContent = w; return; }
    let i = w.length, dir = -1;
    const step = () => { i += dir; txt.textContent = w.slice(0, i); let d = 90; if (i <= 0) { dir = 1; d = 420; } else if (i >= w.length) { dir = -1; d = 3400; } setTimeout(step, d); };
    setTimeout(step, 3000);
  });

  /* ---------- Motion ---------- */
  function motion() {
    const { gsap, ScrollTrigger } = window;
    const nav = $('.nav');
    if (!gsap || reduce) { $$('[data-up]').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); addEventListener('scroll', () => nav.classList.toggle('shadow', scrollY > 8), { passive: true }); return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new window.Lenis({ duration: 1 }); window.lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); nav.classList.toggle('shadow', e.scroll > 8); });
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

    gsap.from('.hero h1, .hero .sub, .hero .row', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08 });
    gsap.from('.mock', { y: 60, opacity: 0, duration: 1.4, ease: 'expo.out', delay: .3 });
    gsap.fromTo('.mock-wrap', { rotateX: 8, transformPerspective: 1400 }, { rotateX: 0, ease: 'none', scrollTrigger: { trigger: '.mock-wrap', start: 'top 90%', end: 'top 20%', scrub: true } });
    // Doodles draw themselves
    $$('.doodle').forEach((d) => {
      const ps = $$('path, line, circle', d).filter((p) => !p.classList.contains('f'));
      ps.forEach((p) => { const L = p.getTotalLength ? p.getTotalLength() : 100; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
      gsap.to(ps, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: .08, delay: .8 });
      gsap.to(d, { y: -8, rotate: 2, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    // Doc covers parallax
    $$('.cover img').forEach((img) => gsap.to(img, { yPercent: -15, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top top', end: 'bottom top', scrub: true } }));
    gsap.from('.doc > .icon, .doc > .crumbs, .doc > h1, .doc > .props-t', { y: 20, opacity: 0, duration: .9, ease: 'expo.out', stagger: .06, delay: .1 });

    ScrollTrigger.batch('[data-up]', { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .06, overwrite: 'auto' }) });
    $$('.qcard').forEach((q, i) => gsap.from(q, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', delay: i * .1, scrollTrigger: { trigger: q, start: 'top 90%', once: true } }));
    $$('.bcard .ui').forEach((u) => gsap.from(u, { y: 50, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: u, start: 'top 95%', once: true } }));
    ScrollTrigger.refresh();
  }
  if (document.readyState === 'complete') motion(); else addEventListener('load', motion);
})();
