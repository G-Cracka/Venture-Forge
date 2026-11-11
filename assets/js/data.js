/* Venture Forge — shared content for all three site versions.
   Copy is taken from ventureforgeaustin.org. Edit here once; every version picks it up. */
(function () {
  const IMG = (window.VF_ROOT || '../') + 'assets/img/';

  const links = {
    register: 'https://www.eventmagic.ai/e/4d9177a1-bee9-4804-8bf6-e56efada41d8',
    chat: 'https://www.eventmagic.ai/communities/d9f22821-00c9-4804-b4a6-1e69f68dd692/channel/af067383-7b45-4b42-a197-8c57a0efcce8',
    sponsor: 'https://www.zeffy.com/en-US/ticketing/venture-forge-austin-sponsorship',
    give: 'https://www.zeffy.com/en-US/ticketing/venture-forge-austin-sponsorship',
    email: 'mailto:sponsor@ventureforgeaustin.org'
  };

  const li = (name) => 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(name);

  const speakers = [
    { slug: 'jenn-mazzola', name: 'Jenn Mazzola', org: 'Northpoint Austin', title: 'Master of Ceremonies', tag: 'MC', bio: '' },
    { slug: 'mark-mcclain', name: 'Mark McClain', org: 'SailPoint Technologies', title: 'Founder & CEO, SailPoint', bio: "Founder and CEO of SailPoint, a leader in unified identity security for enterprises with 2,645 employees. He's earned acclaim for the strength of SailPoint's culture — the backbone of the company's success — and now shares that people-first ethic with leaders everywhere to bring startup culture back from the brink." },
    { slug: 'rich-carney', name: 'Rich Carney', org: 'In the City for the City', title: 'Founder, In The City For The City', bio: 'Retired U.S. Army LTC and Green Beret who moved from State Department counterterrorism work to three decades of building Kingdom movements. He has led six citywide initiatives, helped catalyze 400+ new churches, and founded In The City For The City. Author of Walking Together.' },
    { slug: 'joel-trammell', name: 'Joel Trammell', org: 'XpertLoop.ai', title: 'CEO & Co-founder, XpertLoop', bio: 'CEO and co-founder of XpertLoop, the leading AI platform for the CEO role. A longtime Austin entrepreneur who has founded multiple successful startups, Joel focuses on helping leaders reach their full potential.' },
    { slug: 'jon-werner', name: 'Jon Werner', org: 'FIESTA', title: 'Co-founder, EventMagic & FIESTA', bio: "Co-founder of EventMagic and FIESTA, one of Austin's largest founder and investor communities. A technologist with 35+ years in software and 80+ U.S. patents, many from his decade at adidas, he now builds AI that strengthens real-world human connection." },
    { slug: 'renji-bijoy', name: 'Renji Bijoy', org: 'Immersed', title: 'Founder & CEO, Immersed', bio: "Founder & CEO of Immersed, building spatial computing and AI productivity tools including Visor. A former software architect with PhD work in computer vision at Georgia Tech, he's raised $40M+ and grown Immersed to 1.5M+ users worldwide." },
    { slug: 'jeff-johns', name: 'Jeff Johns', org: 'Impact Foundation', title: 'Co-founder & CEO, Impact Foundation', bio: 'Co-founder and CEO of Impact Foundation, with 30+ years in entrepreneurship, generosity, and impact investing. He previously led growth at National Christian Foundation, opening 30 offices in 12 years. He and his wife Jacqlyn also founded Acton Academy Albuquerque.' },
    { slug: 'ryan-streeter', name: 'Ryan Streeter', org: 'The Civitas Institute at the University of Austin', title: 'Executive Director, Civitas Institute', bio: 'Executive Director of the Civitas Institute at the University of Austin. Policy entrepreneurship, building think tanks, with a focus on cities, dynamism, and social mobility. We raised two now-adult kids on 2 continents in 5 cities where they never had a backyard or garage — and they have turned out great.' },
    { slug: 'cameron-deike', name: 'Cameron Deike', org: 'Prosper CFO', title: 'President & Founder, Prosper CFO', bio: "President and Founder of Prosper, providing accounting and finance for companies with $10–100M in revenue. Prosper has doubled in size four years running and made the Inc. 5000. Cameron believes how Christian owners run their businesses is their biggest Kingdom impact." },
    { slug: 'derek-welborn', name: 'Derek Welborn', org: 'Saints Western', title: 'Founder, Saints Western', bio: "After 15 years in full-time ministry, a battle with severe alopecia disrupted everything he thought he knew about calling and identity — and became the birthplace of Saints Western, a brand rooted in craftsmanship, legacy, and faith. He lives in Austin with his wife Jill and their daughters, Jaymes and Gray, telling redemptive stories through community, creativity, and a life surrendered to God's leading." },
    { slug: 'scott-harris', name: 'Scott Harris', org: 'Social Factor', title: 'Co-founder, Social Factor', bio: "Fractional CMO with Chief Outsiders, driving revenue growth across tech, healthcare, financial services, and nonprofits. He's also co-founder of Social Factor, a social media community management consultancy, and a founder, investor, and Christ follower." },
    { slug: 'noble-origins', name: 'Brett Ender & Harry Gray', org: 'Noble Origins', title: 'Founders, Noble Origins', bio: 'Harry Gray is Founder and CEO of Noble Origins, a wellness brand based in Austin, Texas.' },
    { slug: 'jake-thomsen', name: 'Jake Thomsen', org: "Sovereign's Capital", title: "Managing Partner, Sovereign's Capital", bio: "Managing Partner at Sovereign's Capital, where he leads venture investing in faith-driven founders from pre-seed to Series A, at a firm with $1.2B+ under management. He helped launch Faith Driven Entrepreneur in 2017 and is called to support founders through their loneliest years." },
    { slug: 'richard-cunningham', name: 'Richard Cunningham', org: "Faith Driven Investing at Sovereign's Capital", title: "VP & Investor, Sovereign's Capital", bio: "VP & investor at Sovereign's Capital, underwriting private equity, growth equity, and venture funds that promote human flourishing. He hosts the Faith Driven Investor Podcast and founded the Faith Driven Investor Fund Manager Gathering. Baylor finance and MBA grad, and former Bears centerfielder." },
    { slug: 'wesley-fang', name: 'Wesley Fang', org: 'Kingdom Capital Network', title: 'Executive Director, Kingdom Capital Network', bio: 'Executive Director at Kingdom Capital Network, a faith-based nonprofit helping underserved small-business owners gain access to meaningful capital, mentorship, and leadership development to scale their businesses for Kingdom impact. Previously Vice Chair at ForbesBooks, assisting founders and CEOs with book concept and go-to-market strategy, and leader of the due diligence team at an Austin-based venture capital firm, overseeing investor relations for 25+ companies and transacting over $20M. His greatest passion is helping entrepreneurs across all sectors steward their businesses well for the Kingdom.' },
    { slug: 'sean-riley', name: 'Sean Riley', org: 'The Stony Brook School', title: 'Chief Strategy Officer, The Stony Brook School', bio: 'Chief Strategy Officer at The Stony Brook School and founding Executive Director of Gravitas, now the No. 3-ranked online private school in America. He also founded EDified Strategies, helping Christian schools and mission-driven organizations with strategy, growth, and the wise use of AI.' },
    { slug: 'patrick-farrell', name: 'Patrick Farrell', org: 'Keystone Investing', title: 'Founder & Executive Director, Keystone Investing', bio: 'Founder and Executive Director of Keystone Investing, a community of faith-driven investors with chapters in DC, Austin, and St. Louis. Since 2022, Keystone has invested in 30+ companies and deployed nearly $7M. Previously on the founding executive team at Nehemiah Security.' },
    { slug: 'todd-engstrom', name: 'Todd Engstrom', org: 'Greater Austin Mission Society', title: 'Executive Director, Greater Austin Mission Society', bio: 'Executive Director of the Greater Austin Mission Society, leading strategy, research, citywide relationships, and organizational development. In Austin since 2004, he has spent two decades in church planting, leadership development, and global mission — previously as Executive Pastor of Ministry Strategies at The Austin Stone and a founding leader of the 100 UPG Cooperative. He and Olivia have five children.' },
    { slug: 'caren-kelleher', name: 'Caren Kelleher', org: 'Gold Rush Vinyl', title: 'Founder & CEO, Gold Rush Vinyl', bio: "Founder & CEO of Gold Rush Vinyl, the Austin pressing plant named one of Fast Company's Most Innovative Companies, and co-owner of Waterloo Records. A former Google Play and Songkick leader with a Harvard MBA, she was named Austin Business Journal's Best CEO of 2023." },
    { slug: 'ryan-okeefe', name: "Ryan O'Keefe", org: 'ATX Technology Prayer Breakfast', title: 'Co-founder & VP, ATX Tech Prayer Breakfast', bio: 'Co-founder and VP of the Austin Technology Prayer Breakfast, an annual gathering where Austin\'s tech community hears the gospel. Drawing on global missions, church staff leadership, and enterprise software sales, he inspires an "As You Go" faith at work.' },
    { slug: 'luke-cochran', name: 'Luke Cochran', org: 'PRAY ATX', title: 'Partner, Bovey & Cochran · Pray ATX', tag: 'Prayer Partner', bio: "Attorney and partner at Bovey & Cochran, PLLC, representing local governments across Texas. With his wife Haley, he stewards Pray ATX, a movement cultivating spaces across the city where people encounter God's presence in prayer." }
  ].map((s) => Object.assign(s, { img: IMG + 'speakers/' + s.slug + '.jpg', linkedin: li(s.name) }));

  /* Placeholder network members — swap for real attendees/alumni before launch. */
  const placeholders = [
    ['member-12', 'Jordan Ellis', 'Partner, Hill Country Ventures'],
    ['member-5', 'Avery Morales', 'Founder & CEO, Lantern Health'],
    ['member-17', 'Cameron Brooks', 'Principal, Cedar Capital'],
    ['member-16', 'Morgan Hale', 'Executive Director, Eastside Works'],
    ['member-59', 'Riley Okafor', 'Co-founder, Ironwood Robotics'],
    ['member-32', 'Taylor Nguyen', 'Angel Investor & Board Member'],
    ['member-51', 'Drew Castillo', 'Managing Director, Bluebonnet Partners'],
    ['member-36', 'Quinn Harper', 'Founder, Stillwater Coffee Co.'],
    ['member-69', 'Jamie Whitfield', 'VP Strategy, Covenant Bank'],
    ['member-45', 'Reese Adeyemi', 'Founder, Anvil Analytics'],
    ['member-68', 'Sam Delgado', 'Pastor & Marketplace Leader'],
    ['member-34', 'Casey Lindqvist', 'Operating Partner, Forge Fund I']
  ].map(([f, name, title]) => ({ name, title, img: IMG + 'network/' + f + '.jpg', linkedin: li(name), placeholder: true }));

  /* Mixed network: real speakers interleaved with placeholders */
  const network = [];
  const real = speakers.filter((s) => s.slug !== 'noble-origins');
  for (let i = 0; i < Math.max(real.length, placeholders.length); i++) {
    if (real[i]) network.push({ name: real[i].name, title: real[i].title, img: real[i].img, linkedin: real[i].linkedin });
    if (placeholders[i] && i % 2 === 1) network.push(placeholders[i]);
  }
  placeholders.forEach((p, i) => { if (i % 2 === 0) network.push(p); });

  const showcase = [
    { name: 'Noble Origins', people: 'Brett Ender & Harry Gray', url: 'https://nobleorigins.com/', logo: IMG + 'logos/noble-origins.png', img: IMG + 'speakers/noble-origins.jpg' },
    { name: 'Social Factor', people: 'Scott Harris', url: 'https://socialfactor.com/', logo: IMG + 'logos/social-factor.png', img: IMG + 'speakers/scott-harris.jpg' },
    { name: 'Prosper CFO', people: 'Cameron Deike', url: 'https://prospercfo.com/', logo: IMG + 'logos/prosper-cfo.png', img: IMG + 'speakers/cameron-deike.jpg' },
    { name: 'Sycamore Equity', people: "Jonathan Creath (Cooper Sotheby's)", url: 'https://sycamoreequity.com/austin-ministry-housing-fund', logo: IMG + 'logos/sycamore-equity.png', img: IMG + 'photos/hero-austin.jpg' },
    { name: 'Saints Western', people: 'Derek Welborn', url: 'https://saintswestern.com/', logo: IMG + 'logos/saints-western.png', img: IMG + 'speakers/derek-welborn.jpg' }
  ];

  const partners = [
    ['livingwater.png', 'Living Water'], ['immersed.png', 'Immersed', 'https://immersed.com/'], ['impact-foundation.png', 'Impact Foundation'],
    ['sovereigns.png', "Sovereign's Capital", 'https://sovereignscapital.com/'], ['orderly-ai.webp', 'Orderly AI', 'https://www.orderly-ai.com/'],
    ['concordia.png', 'Concordia University Texas'], ['acu.png', 'Abilene Christian University'], ['lamppost.png', 'Lamppost'],
    ['liftup.png', 'LiftUp'], ['fiesta.png', 'FIESTA'], ['svc.svg', 'SVC Community'], ['partner-lion.png', 'Partner']
  ].map(([f, name, url]) => ({ name, url: url || '', logo: IMG + 'logos/' + f }));

  const schedule = [
    { day: 'Wednesday, September 23', theme: 'Framing Kingdom Investing: General & Locally', items: [
      ['5:00 PM', 'Happy Hour & registration'], ['5:45 PM', 'Welcome word — setting expectations'], ['6:00 PM', 'Opening address: Kingdom Investing'],
      ['6:45 PM', 'Dinner / Panel: Faith capital and stewardship'], ['7:45 PM', 'Networking']] },
    { day: 'Thursday, September 24', theme: 'Execution as a Collaboration · Riverbend Centre', items: [
      ['8:30 AM', 'Registration & networking — coffee and light breakfast'], ['9:45 AM', 'Welcome message'], ['10:00 AM', 'Founders showcase'],
      ['11:15 AM', 'Lunch'], ['12:30 PM', 'Founders panel: What Christian Founders Wish Investors Understood'], ['1:15 PM', 'Investors Panel: Kingdom Due Diligence'],
      ['2:00 PM', 'Coffee & refreshments networking break'], ['2:45 PM', 'Keynote: Faith journey and taking on challenges with / for the Lord'],
      ['3:45 PM', 'Unity: myth or reality — Founders, Investors, Education and the Church'], ['5:00 PM', 'Dinner / closing remarks']] }
  ];

  const faq = [
    ['Who will be there?', 'The event is meant for faith-driven investors, founders, and local partners. The agenda is built to give each group a real place in the room through panels, networking, and founder presentations.'],
    ['Is this being put together with care?', 'First, we prioritize prayer and encourage all who participate as a speaker or attendee to do the same. The agenda includes a founder showcase, investor panel, founder panel, and sessions on stewardship, due diligence, and partnership — showing the event is planned around useful conversations, not just general inspiration.'],
    ['What should happen after the event?', 'The main expected outcomes are investor-founder meetings, follow-up conversations, new introductions, and stronger support for future Venture Forge events.'],
    ['How does this help beyond this year?', 'The goal is to build an event that can return each year and keep growing the local network of faith-driven founders, investors, and partners. We pray that new ways to serve this community in a practical manner come out of this event, working with local partners.'],
    ['What makes this different?', "This isn't just a startup event or a faith-and-work event. It is built to connect Christian founders and values-aligned investors in one place, with a clear focus on capital, stewardship, and partnership."]
  ];

  const tiers = [
    { name: 'Platinum Sponsor (Title)', price: '$25,000', reserved: true, perks: ['Naming rights: “[Event Name] presented by [Sponsor Name]”', 'Logo on all primary event branding and press releases', 'Official keynote/session sponsor', '10 VIP tickets with priority seating', 'Speaking opportunity during opening session', 'Dedicated e-blast & social media spotlight (pre & post-event)', 'Premier logo placement on website, signage, and stage', 'Option to include promo item in attendee gift bag', 'Full-page ad in digital and/or printed program', 'Opportunity to introduce keynote speaker', 'Follow-up email'] },
    { name: 'Gold Sponsor', price: '$10,000', perks: ['Recognition from stage during meal', 'Branded signage on all tables', '4 VIP tickets with priority seating', 'Half-page ad in program', 'Logo on event website and meal schedule', 'Social media thank you post', 'Option to include promo item in attendee gift bag'] },
    { name: 'Silver Sponsor', price: '$5,000', perks: ['Logo on event website', 'Quarter-page ad in program', '2 tickets', 'Social media thank you post', 'Logo on on-site signage (tiered)', 'Option to include promo item in attendee gift bag'] },
    { name: 'Friend of Venture-Forge', price: '$2,500', perks: ['2 tickets', 'Logo on shared “community partners” slide/signage', 'Logo on event website', 'Name listed in program', 'Social media thank you'] }
  ];

  const faith = [
    'We believe the Bible is the inspired and completely trustworthy Word of God — the ultimate authority for faith and life.',
    'We believe in one God, who exists eternally as three persons: the Father, the Son, and the Holy Spirit.',
    'We believe that Jesus Christ is fully God. He was born of a virgin, lived without sin, performed miracles, and died in our place to pay for our sins. He rose bodily from the dead, ascended to the Father, and will one day return in power and glory.',
    'We believe the Holy Spirit lives within every believer, giving them the strength and guidance to live a life that honors God.',
    'We believe in the spiritual unity of believers in our Lord Jesus Christ.'
  ];

  const photos = { forge: IMG + 'photos/forge.jpg', summit: IMG + 'photos/summit.jpg', austin: IMG + 'photos/hero-austin.jpg', video: (window.VF_ROOT || '../') + 'assets/video/hero-skyline.mp4' };

  const nav = [
    ['index.html', 'Home'], ['2026-event.html', '2026 Event'], ['speakers.html', 'Speakers'], ['vision.html', 'Vision'], ['partner.html', 'Partner'], ['faq.html', 'FAQ']
  ];

  window.VF = { links, speakers, network, showcase, partners, schedule, faq, tiers, faith, photos, nav, IMG };
})();
