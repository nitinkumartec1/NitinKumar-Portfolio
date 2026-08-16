'use client';
import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  /* letter split for hover micro-interaction */
  useEffect(() => {
    [line1Ref, line2Ref].forEach((ref) => {
      if (!ref.current) return;
      const el = ref.current;
      el.innerHTML = [...el.textContent]
        .map((c) => `<span class="ch">${c}</span>`)
        .join('');
    });
  }, []);

  /* magnetic effect */
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
    <section className="hero">
      <div className="hero-wrap">
        <div className="hero-top fade-el d1">
          <span className="status">
            <span className="dot"></span>Available for new projects
          </span>
          <span className="hero-loc">Full-Stack Dev (MERN / AI) — Delhi NCR, India</span>
        </div>
        <h1 className="hero-title">
          <span className="hl">
            <span className="hl-in">
              <span className="split" ref={line1Ref}>
                NITIN
              </span>
              <span className="h-tag">full-stack</span>
            </span>
          </span>
          <span className="hl">
            <span className="hl-in top">
              <span className="split outline" ref={line2Ref}>
                KUMAR
              </span>
              <span className="h-reg">©</span>
            </span>
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-left">
            <p className="hero-desc fade-el d3">
              I&apos;m Nitin — a full-stack developer who turns complex problems into{' '}
              <strong>fast, elegant products</strong>. From resilient APIs to interfaces
              that feel effortless, I build with the MERN stack and modern tooling, one
              commit at a time.
            </p>
            <div className="hero-cta fade-el d4">
              <a
                href="#work"
                className="btn btn-red magnetic"
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                View Projects{' '}
                <span className="ico sm">
                  <ArrowDown />
                </span>
              </a>
              <a
                href="#contact"
                className="btn btn-ghost magnetic"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  });
                }}
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                Get in Touch{' '}
                <span className="ico sm">
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </div>
          <div className="badge-wrap fade-el d5">
            <a
              href="#work"
              className="badge magnetic"
              aria-label="Scroll to work"
              onMouseMove={onMagnetic}
              onMouseLeave={offMagnetic}
            >
              <svg className="text-ring" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="circ"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  />
                </defs>
                <text>
                  <textPath href="#circ">
                    ✦ OPEN TO WORK ✦ FULL-STACK DEVELOPER
                  </textPath>
                </text>
              </svg>
              <span className="badge-core">
                <span className="ico">
                  <ArrowDown />
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
