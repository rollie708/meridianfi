import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Compass, Menu, Plus, X } from 'lucide-react';
import { ArrowLink, Eyebrow, Mark, OrbitalArt, SocialLink, TelegramIcon, XIcon } from './components';
import { chapters, faqs, perspectives } from './content';
import { ArticlePage, BrandPage, GuidePage, NotFoundPage, PrivacyPage } from './pages';

const navigation = [
  { label: 'Vision', id: 'vision' },
  { label: 'Explore', id: 'explore' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'Journal', id: 'journal' },
];

function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (pathname === '/') document.title = 'MERIDIAN — A shared horizon';
  }, [pathname, hash, key]);
  return null;
}

function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') { setActive(''); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);
  useEffect(() => { dialog.current?.close(); }, [location]);
  return <>
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand" aria-label="MERIDIAN home"><Mark /><span>MERIDIAN</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(item => <Link key={item.id} className={active === item.id ? 'active' : ''} to={`/#${item.id}`}>{item.label}</Link>)}
        </nav>
        <Link to="/#community" className="button button-small header-cta">Find your people <ArrowUpRight size={15} /></Link>
        <button className="mobile-menu-toggle icon-button" onClick={() => dialog.current?.showModal()} aria-label="Open navigation"><Menu /></button>
      </div>
    </header>
    <dialog className="mobile-menu" ref={dialog} aria-label="Site navigation" onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="mobile-menu-header"><Link to="/" onClick={() => dialog.current?.close()} className="brand"><Mark /><span>MERIDIAN</span></Link><button className="icon-button" onClick={() => dialog.current?.close()} aria-label="Close navigation"><X /></button></div>
      <nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link to={`/#${item.id}`} key={item.id} onClick={() => dialog.current?.close()}><span className="mono">0{index + 1}</span>{item.label}<ArrowUpRight /></Link>)}<Link to="/#community" onClick={() => dialog.current?.close()}><span className="mono">05</span>Community<ArrowUpRight /></Link></nav>
      <div className="mobile-menu-bottom"><p>A new direction. A shared horizon.</p><div className="social-icons"><SocialLink type="telegram"><TelegramIcon /><span className="sr-only">Telegram</span></SocialLink><SocialLink type="x"><XIcon /><span className="sr-only">X</span></SocialLink></div></div>
    </dialog>
  </>;
}

export function Footer() {
  return <footer className="site-footer container">
    <div className="footer-top"><div><Link to="/" className="brand"><Mark /><span>MERIDIAN</span></Link><p>Different perspectives.<br />A shared direction.</p></div><div className="footer-link-group"><span className="mono">DISCOVER</span><Link to="/#vision">Our vision</Link><Link to="/#roadmap">The roadmap</Link><Link to="/#journal">Journal</Link></div><div className="footer-link-group"><span className="mono">RESOURCES</span><Link to="/guide">Getting started</Link><Link to="/brand">Brand kit</Link><Link to="/privacy">Privacy</Link></div><div className="footer-link-group"><span className="mono">STAY IN THE LOOP</span><SocialLink type="telegram"><ArrowLink>Telegram</ArrowLink></SocialLink><SocialLink type="x"><ArrowLink>X / Twitter</ArrowLink></SocialLink><span className="footer-handle">@meridianfii</span></div></div>
    <div className="footer-wordmark" aria-hidden="true">MERIDIAN<span>+</span></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} MERIDIAN. All rights reserved.</span><span className="footer-coordinate"><span className="status-dot" /> A NEW POINT OF VIEW</span><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Back to top <ArrowUp size={14} /></button></div>
  </footer>;
}

function Hero() {
  return <section className="hero container" id="top" aria-labelledby="hero-title">
    <div className="hero-copy"><div className="hero-badge mono"><span className="status-dot" /> A NEW POINT OF VIEW <span className="badge-divider" /> EST. TO CONNECT</div><h1 id="hero-title">A new direction.<br />A shared<br /><span>horizon.</span><span className="heading-period">↗</span></h1><p>A meeting point for curious minds.<br className="desktop-break" /> Explore new possibilities. Find your people.<br className="desktop-break" /> Move forward, together.</p><div className="hero-actions"><Link to="/#explore" className="button button-primary">Explore Meridian <ArrowUpRight size={18} /></Link><Link to="/#vision" className="text-link">Our perspective <ArrowRight size={17} /></Link></div><div className="hero-note"><span className="tiny-cross">+</span><span>OPEN MINDS. SHARED POSSIBILITIES.</span></div></div>
    <div className="hero-art"><OrbitalArt /></div>
    <div className="hero-bottom"><a href="#vision" className="scroll-link"><span className="scroll-icon"><ArrowDown size={13} /></span>SCROLL TO DISCOVER</a><span className="mono hero-bottom-right">INDEPENDENT MINDS <span>—</span> CONNECTED BY DESIGN</span></div>
  </section>;
}

function Vision() {
  return <section id="vision" className="vision-section section container" aria-labelledby="vision-title">
    <div className="vision-intro"><Eyebrow number="01">THE MERIDIAN PERSPECTIVE</Eyebrow><div><h2 id="vision-title">Great things happen<br />where <span className="muted">perspectives meet.</span></h2><div className="vision-text"><p>A meridian is a point of reference. A line that helps you find your way. We see it as something more: a connection between where we are and what we could become.</p><p>We’re here for the curious. The forward-looking. The people who believe the next chapter is better when we shape it together.</p></div><Link to="/journal/a-shared-horizon" className="text-link">Get to know MERIDIAN <ArrowUpRight size={16} /></Link></div></div>
    <div className="principles"><div className="principle"><div className="principle-top"><span className="principle-icon connection-icon"><i /><i /><i /></span><span className="mono">01 / CONNECT</span></div><h3>People at the center.</h3><p>Real connections, different backgrounds, and a place for your perspective.</p></div><div className="principle"><div className="principle-top"><Compass size={28} strokeWidth={1} /><span className="mono">02 / EXPLORE</span></div><h3>Curiosity as a compass.</h3><p>Better questions. Open minds. The freedom to look beyond the obvious.</p></div><div className="principle"><div className="principle-top"><span className="principle-icon progress-icon"><i /><i /><i /></span><span className="mono">03 / MOVE FORWARD</span></div><h3>A horizon we share.</h3><p>Individual ideas become new possibilities when we move in a shared direction.</p></div></div>
  </section>;
}

const exploreItems = [
  { name: 'Connect', kicker: 'FIND COMMON GROUND', title: 'Your people are out there.', description: 'A new perspective starts with a conversation. Meet the community, introduce yourself, and find the ideas that bring us together.', action: 'Meet the community', to: '/#community', details: ['Different perspectives', 'Open conversation', 'A shared starting point'] },
  { name: 'Discover', kicker: 'FOLLOW YOUR CURIOSITY', title: 'Make room for a new idea.', description: 'Step back from the noise. Explore the thinking behind MERIDIAN and discover a different way to look at what comes next.', action: 'Explore the journal', to: '/#journal', details: ['Original perspectives', 'Thoughtful questions', 'Ideas worth exploring'] },
  { name: 'Participate', kicker: 'BRING YOUR PERSPECTIVE', title: 'The next step includes you.', description: 'You don’t need all the answers to add something meaningful. Start with a question, share a thought, or help someone find their bearings.', action: 'Find your starting point', to: '/guide', details: ['Introduce yourself', 'Share what you see', 'Help others connect'] },
];

function Explore() {
  const [selected, setSelected] = useState(0);
  const item = exploreItems[selected];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectByKey = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % exploreItems.length;
    else if (event.key === 'ArrowLeft') next = (index + exploreItems.length - 1) % exploreItems.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = exploreItems.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };
  return <section id="explore" className="explore-section section" aria-labelledby="explore-title"><div className="container">
    <div className="section-heading"><div><Eyebrow number="02">FIND YOUR ORBIT</Eyebrow><h2 id="explore-title">A place for<br /><span className="muted">what’s next.</span></h2></div><p>There’s more than one way to be part of it.<br />Start wherever your curiosity takes you.</p></div>
    <div className="explore-panel"><div className={`network-art network-art-${selected}`} aria-hidden="true"><div className="network-grid" /><div className="network-circle circle-one" /><div className="network-circle circle-two" /><div className="network-circle circle-three" /><div className="network-axis axis-one" /><div className="network-axis axis-two" /><div className="network-center"><Mark /></div><span className="network-node node-one" /><span className="network-node node-two" /><span className="network-node node-three" /><span className="network-node node-four" /><span className="network-coordinate mono">M / 00{selected + 1}</span><span className="network-caption mono">{['A NETWORK OF POSSIBILITIES', 'A DIFFERENT POINT OF VIEW', 'EVERY PERSPECTIVE COUNTS'][selected]}</span><span className="network-cross cross-one">+</span><span className="network-cross cross-two">+</span></div>
      <div className="explore-content"><div role="tablist" aria-label="Ways to explore" className="explore-tabs">{exploreItems.map((tab, index) => <button key={tab.name} ref={el => { tabs.current[index] = el; }} role="tab" id={`explore-tab-${index}`} aria-selected={selected === index} aria-controls="explore-tab-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => selectByKey(event, index)}>{tab.name}</button>)}</div><div id="explore-tab-panel" role="tabpanel" aria-labelledby={`explore-tab-${selected}`} tabIndex={0} className="explore-tab-panel"><span className="mono blue-text">{item.kicker}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.details.map(detail => <li key={detail}><Plus size={12} />{detail}</li>)}</ul><Link to={item.to} className="text-link">{item.action}<ArrowUpRight size={17} /></Link></div></div></div>
  </div></section>;
}

function Roadmap() {
  const [selected, setSelected] = useState(0);
  const chapter = chapters[selected];
  return <section id="roadmap" className="roadmap-section section container" aria-labelledby="roadmap-title"><div className="section-heading"><div><Eyebrow number="03">THE PATH FORWARD</Eyebrow><h2 id="roadmap-title">Direction, <span className="muted">with intention.</span></h2></div><p>A shared outlook. An open horizon.<br />The principles guiding our next chapter.</p></div><div className="roadmap-layout"><div className="roadmap-steps" aria-label="Explore roadmap chapters">{chapters.map((step, index) => <button key={step.number} className={`roadmap-step ${index === selected ? 'selected' : ''}`} onClick={() => setSelected(index)} aria-pressed={index === selected} aria-controls="roadmap-detail"><span className="step-number mono">{step.number}</span><span><span className="mono step-tag">{step.tag}</span><strong>{step.label}</strong></span><ArrowUpRight size={20} /></button>)}</div><div className="roadmap-detail" id="roadmap-detail" aria-live="polite"><span className="roadmap-detail-number" aria-hidden="true">{chapter.number}</span><span className="mono blue-text">CHAPTER {chapter.number}</span><h3>{chapter.heading}</h3><p>{chapter.description}</p><ul>{chapter.items.map(item => <li key={item}><span />{item}</li>)}</ul></div></div><div className="roadmap-footnote"><span className="status-dot" /><p>An evolving direction. These themes express our intentions, not a dated product-release schedule.</p></div></section>;
}

export function JournalArt({ type }: { type: string }) {
  return <div className={`journal-art journal-art-${type}`} aria-hidden="true"><div className="journal-art-grid" />{type === 'horizon' ? <><div className="horizon-planet" /><div className="horizon-line" /><span className="art-star star-one" /><span className="art-star star-two" /></> : type === 'connection' ? <><div className="connection-ring ring-one" /><div className="connection-ring ring-two" /><div className="connection-ring ring-three" /><span className="art-star star-one" /></> : <><div className="portal-frame frame-one" /><div className="portal-frame frame-two" /><div className="portal-frame frame-three" /><div className="portal-frame frame-four" /></>}<span className="journal-art-coordinate mono">M / {type === 'horizon' ? 'PERSPECTIVE' : type === 'connection' ? 'CONNECTION' : 'POSSIBILITY'}</span><ArrowUpRight className="journal-art-arrow" size={20} /></div>;
}

function Journal() {
  return <section id="journal" className="journal-section section container" aria-labelledby="journal-title"><div className="section-heading"><div><Eyebrow number="04">IDEAS IN ORBIT</Eyebrow><h2 id="journal-title">A little <span className="muted">perspective.</span></h2></div><Link to="/guide" className="text-link">New here? Start with the guide <ArrowUpRight size={16} /></Link></div><div className="journal-grid">{perspectives.map(article => <Link to={`/journal/${article.slug}`} className="journal-card" key={article.slug}><JournalArt type={article.art} /><div className="journal-card-meta mono"><span>{article.category}</span><span>{article.readTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="journal-read">Read the perspective <ArrowUpRight size={15} /></span></Link>)}</div></section>;
}

export function Community({ simple = false }: { simple?: boolean }) {
  return <section id="community" className={`community-section container ${simple ? 'community-simple' : ''}`} aria-labelledby="community-title"><div className="community-card"><div className="community-orbits" aria-hidden="true"><i /><i /><i /><i /></div><div className="community-content"><Eyebrow>YOUR NEXT CONNECTION STARTS HERE</Eyebrow><h2 id="community-title">Find your people.<br /><span>Expand your horizon.</span></h2><p>Bring your curiosity. Add your perspective.<br />There’s a place for you in the conversation.</p><div className="community-actions"><SocialLink type="telegram" className="button button-primary"><TelegramIcon size={18} />Join the conversation<ArrowUpRight size={16} /></SocialLink><SocialLink type="x" className="button button-outline"><XIcon size={16} />Follow on X<ArrowUpRight size={16} /></SocialLink></div><span className="community-handle mono">ONE COMMUNITY. MANY POSSIBILITIES. <span>@MERIDIANFII</span></span></div><div className="community-symbol" aria-hidden="true"><Mark /></div></div></section>;
}

function Faq() {
  return <section className="faq-section section container" aria-labelledby="faq-title"><div><Eyebrow number="05">A LITTLE CLARITY</Eyebrow><h2 id="faq-title">Good questions.<br /><span className="muted">Clear answers.</span></h2><p>A few things you might be wondering.</p><Link to="/guide" className="text-link">Explore the full guide <ArrowUpRight size={16} /></Link></div><div className="faq-list">{faqs.slice(0, 5).map(faq => <details className="faq-item" key={faq.question}><summary>{faq.question}<Plus size={18} /></summary><p>{faq.answer}</p></details>)}</div></section>;
}

function Home() {
  return <><Hero /><Vision /><Explore /><Roadmap /><Journal /><Community /><Faq /></>;
}

export default function App() {
  return <><RouteEffects /><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/journal/:slug" element={<ArticlePage />} /><Route path="/guide" element={<GuidePage />} /><Route path="/brand" element={<BrandPage />} /><Route path="/privacy" element={<PrivacyPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /></>;
}
