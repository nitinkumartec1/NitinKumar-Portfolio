'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* scroll spy */
  useEffect(() => {
    const sections = ['about', 'work', 'services', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setActiveSection(en.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const handleNavClick = (e, href) => {
    if (href === '#contact') {
      e.preventDefault();
      closeMenu();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }
    if (href === '#top') {
      e.preventDefault();
      closeMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    closeMenu();
  };

  /* magnetic effect for nav CTA */
  const onMagnetic = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.3}px,${y * 0.35}px)`;
  };
  const offMagnetic = (e) => {
    e.currentTarget.style.transform = 'translate(0,0)';
  };

  const navlinks = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  const mobileLinks = [
    { href: '#top', label: 'Home', num: '01', delay: '.12s' },
    { href: '#about', label: 'About', num: '02', delay: '.19s' },
    { href: '#work', label: 'Work', num: '03', delay: '.26s' },
    { href: '#services', label: 'Services', num: '04', delay: '.33s' },
    { href: '#contact', label: 'Contact', num: '05', delay: '.40s' },
  ];

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav" ref={navRef}>
        <a href="#top" className="brand" onClick={(e) => handleNavClick(e, '#top')}>
          <span className="brand-badge">
            <svg viewBox="0 0 512 512" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="20" y="20" width="472" height="472" rx="112" fill="#121216" stroke="rgba(255,46,46,0.65)" strokeWidth="18" />
              <path d="M 114 134 L 158 134 L 158 378 L 114 378 Z" fill="#ffffff" />
              <path d="M 158 142 L 250 362 L 250 392 L 222 392 L 140 186 L 140 142 Z" fill="#ff2e2e" />
              <path d="M 238 134 L 282 134 L 282 378 L 238 378 Z" fill="#ffffff" />
              <path d="M 276 270 L 374 134 L 428 134 L 330 286 Z" fill="#ff2e2e" />
              <path d="M 314 262 L 422 378 L 368 378 L 268 288 Z" fill="#ffffff" />
              <circle cx="396" cy="98" r="15" fill="#ff2e2e" />
            </svg>
          </span>
          <span className="brand-text">Nitin<em>©</em></span>
        </a>
        <nav className="navlinks" id="navlinks">
          {navlinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={activeSection === l.href.slice(1) ? 'active' : ''}
              onClick={(e) => handleNavClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a
            href="#contact"
            className="nav-cta magnetic"
            onClick={(e) => handleNavClick(e, '#contact')}
            onMouseMove={onMagnetic}
            onMouseLeave={offMagnetic}
          >
            Let&apos;s Talk{' '}
            <span className="ico sm">
              <ArrowUpRight />
            </span>
          </a>
          <button
            className={`menu-btn${menuOpen ? ' open' : ''}`}
            id="menuBtn"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <span className="ic m">
              <Menu />
            </span>
            <span className="ic c">
              <X />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <nav>
          {mobileLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: l.delay }}
              onClick={(e) => handleNavClick(e, l.href)}
            >
              <small>{l.num}</small>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mm-foot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="mailto:nitinkumartec1@gmail.com">nitinkumartec1@gmail.com</a>
            <a href="tel:+919193538808" style={{ fontSize: '15px', color: 'var(--muted)' }}>+91 9193538808</a>
          </div>
          <div className="mm-socials">
            <a href="https://github.com/nitinkumartec1" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nitin-kumar-tec" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://leetcode.com/u/nitinkumartec1" target="_blank" rel="noopener noreferrer">
              LeetCode
            </a>
            <a href="https://www.instagram.com/nitinyadav_____/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
