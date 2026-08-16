'use client';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useToast } from './Toast';

const GITHUB_PROFILE = 'https://github.com/nitinkumartec1';

const projects = [
  {
    index: '01',
    year: '2025 — 2026',
    title: ['Ink', 'Well'],
    desc: 'A full-stack storytelling & publishing platform for poets and authors — supporting draft, scheduled & unlisted stories, Firebase Authentication, Cloudinary media lifecycles, TipTap rich text editing, and reader analytics.',
    chips: ['React.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Cloudinary', 'TipTap Editor'],
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    alt: 'InkWell — Storytelling Platform for Poets & Authors',
    demoUrl: 'https://inkwell-frontend-rho.vercel.app/',
    codeUrl: 'https://github.com/nitinkumartec1',
  },
  {
    index: '02',
    year: '2025',
    title: ['Vis', 'dy'],
    desc: 'A full-stack video sharing and social platform delivering 10+ REST API modules, 7+ Mongoose models, JWT & Firebase auth, Cloudinary media storage, watch history, subscriptions, tweets, and MongoDB aggregation pipelines.',
    chips: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Cloudinary', 'Vite'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    alt: 'Visdy — Video Sharing & Social Platform',
    demoUrl: 'https://visdy-frontend.vercel.app/',
    codeUrl: 'https://github.com/nitinkumartec1',
  },
  {
    index: '03',
    year: '2026',
    title: ['Trip', 'Brother'],
    desc: 'A collaborative travel planner — interactive Mapbox routing, shared group itineraries, real-time budget calculation, and collaborative travel management.',
    chips: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'Socket.io'],
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    alt: 'TripBrother — travel planning platform',
    demoUrl: 'https://trip-brother-frontend.vercel.app/',
    codeUrl: 'https://github.com/nitinkumartec1',
  },
  {
    index: '04',
    year: '2026',
    title: ['B2B ', 'Holidays'],
    desc: 'A corporate travel-booking suite with dynamic pricing engines, multi-role agency dashboards, and Stripe-powered automated invoicing for agency partners.',
    chips: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe', 'JWT'],
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'B2B Holidays — corporate travel suite',
    demoUrl: 'https://theb2bholidays.com/',
    codeUrl: 'https://github.com/nitinkumartec1',
  },
];

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function Work() {
  const toast = useToast();
  const sectionRef = useRef(null);

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll('#work .reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('on');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* card tilt + parallax */
  useEffect(() => {
    const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!finePointer) return;

    const cards = document.querySelectorAll('[data-tilt]');
    const handlers = [];
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-5px)`;
      };
      const onLeave = () => {
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    /* parallax on project images */
    const plxImgs = document.querySelectorAll('.p-media img');
    const onScroll = () => {
      const vh = window.innerHeight;
      plxImgs.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        const prog = clamp(
          (vh / 2 - (r.top + r.height / 2)) / (vh / 2),
          -1,
          1
        );
        img.style.transform = `translateY(${prog * 6}%) scale(1.06)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleDemoClick = (e, p) => {
    if (!p.demoUrl) {
      e.preventDefault();
      toast(`Please provide the live link for ${p.title.join('')} to open demo`);
    }
  };

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

  return (
    <section className="section work" id="work" ref={sectionRef}>
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <p className="eyebrow">02 — Selected Work</p>
            <h2 className="s-title">
              Featured <em>projects</em>
            </h2>
          </div>
          <span className="s-note">( 2025 — 2026 )</span>
        </div>
        <div className="projects">
          {projects.map((p, i) => (
            <article className="project reveal" data-tilt="" key={i}>
              <a
                className="p-media"
                href={p.demoUrl || p.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleDemoClick(e, p)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.alt} loading="lazy" />
                <span className="p-veil"></span>
                <span className="p-index">{p.index}</span>
                <span className="p-year">{p.year}</span>
                <span className="p-view">
                  View Project{' '}
                  <span className="ico sm">
                    <ArrowUpRight />
                  </span>
                </span>
              </a>
              <div className="p-meta">
                <div className="p-row">
                  <h3>
                    {p.title[0]}
                    <em>{p.title[1]}</em>
                  </h3>
                </div>
                <p>{p.desc}</p>
                <div className="chips">
                  {p.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <div className="p-links">
                  <a
                    className="p-link"
                    href={p.demoUrl || '#'}
                    target={p.demoUrl ? '_blank' : '_self'}
                    rel={p.demoUrl ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleDemoClick(e, p)}
                  >
                    <span className="ico sm">
                      <ArrowUpRight />
                    </span>
                    Live Demo
                  </a>
                  <a
                    className="p-link"
                    href={p.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ico sm">
                      <ArrowUpRight />
                    </span>
                    GitHub Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="work-more reveal">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost magnetic"
            onMouseMove={onMagnetic}
            onMouseLeave={offMagnetic}
          >
            More on GitHub{' '}
            <span className="ico sm">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
