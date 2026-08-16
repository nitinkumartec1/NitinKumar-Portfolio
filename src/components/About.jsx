'use client';
import { useEffect, useRef } from 'react';

const statementText =
  'I build scalable, human-centered web applications — from resilient back-ends to interfaces that feel effortless. Clean code, honest craft, zero shortcuts.';
const accentWords = new Set(['scalable', 'human-centered', 'effortless', 'craft']);

const stats = [
  { count: 3, pad: 2, suffix: '+', label: 'Years of Coding' },
  { count: 20, pad: 2, suffix: '+', label: 'Projects Shipped' },
  { count: 18, pad: 2, suffix: '+', label: 'Technologies' },
  { count: 100, pad: 0, suffix: '%', label: 'Commitment' },
];

const journey = [
  {
    time: '2024 — Present',
    title: 'Full-Stack Web Developer & Engineer',
    desc: 'Building full-stack MERN & Next.js platforms, resilient REST APIs, and interactive UI systems — deploy to iterate.',
  },
  {
    time: '2023 — 2027',
    title: 'B.Tech, CSE (Artificial Intelligence)',
    desc: 'KIET Group of Institutions (AKTU), Delhi NCR — algorithms, system design, databases, and AI-driven workflows.',
  },
];

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function About() {
  const statementRef = useRef(null);
  const statsRef = useRef(null);

  /* word reveal on scroll */
  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.w');
    const onScroll = () => {
      words.forEach((w) => w.classList.remove('on'));
      const sr = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = sr.height + vh * 0.35;
      const passed = clamp((vh * 0.88 - sr.top) / total, 0, 1);
      const idx = Math.floor(passed * words.length);
      words.forEach((w, i) => {
        if (i < idx) w.classList.add('on');
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll('#about .reveal');
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

  /* counter animation */
  useEffect(() => {
    const counters = document.querySelectorAll('.count');
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          cio.unobserve(en.target);
          const el = en.target;
          const target = +el.dataset.count;
          const pad = +(el.dataset.pad || 0);
          const t0 = performance.now();
          const dur = 1500;
          const step = (now) => {
            const p = clamp((now - t0) / dur, 0, 1);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * e)).padStart(pad, '0');
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
    return () => cio.disconnect();
  }, []);

  /* build word spans */
  const wordSpans = statementText
    .trim()
    .split(/\s+/)
    .map((word, i) => {
      const clean = word.replace(/[^\w-]/g, '').toLowerCase();
      const acc = accentWords.has(clean) ? ' acc' : '';
      return (
        <span key={i} className={`w${acc}`}>
          {word}{' '}
        </span>
      );
    });

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <p className="eyebrow">01 — About</p>
            <h2 className="s-title">
              Code &amp; <em>craft</em>
            </h2>
          </div>
          <span className="s-note">( The human behind the commits )</span>
        </div>
        <div className="about-grid">
          <div className="portrait reveal">
            <div className="portrait-card">
              <span className="p-label pl-1">MERN + AI Stack</span>
              <span className="p-label pl-2">KIET &apos;27</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.jpg"
                alt="Portrait of Nitin Kumar"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <p className="statement" ref={statementRef}>
              {wordSpans}
            </p>
            <p className="about-more reveal">
              Pursuing B.Tech in CSE (Artificial Intelligence) at{' '}
              <strong>KIET Group of Institutions</strong>, I build production-grade web applications
              like <strong>InkWell</strong> and <strong>Visdy</strong> — owning everything from MongoDB &amp; Firebase architectures,
              REST APIs, and Google Analytics / Search Console telemetry, to responsive, human-centered UI design.
            </p>
            <div className="stats reveal" ref={statsRef}>
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <b>
                    <span
                      className="count"
                      data-count={s.count}
                      data-pad={s.pad || undefined}
                    >
                      {s.pad ? '00' : '0'}
                    </span>
                    <i>{s.suffix}</i>
                  </b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="reveal">
              <p className="journey-label">Journey &amp; Education</p>
              <div className="journey">
                {journey.map((j, i) => (
                  <div className="j-row" key={i}>
                    <time>{j.time}</time>
                    <div>
                      <b>{j.title}</b>
                      <p>{j.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
