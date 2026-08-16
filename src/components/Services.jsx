'use client';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

const services = [
  {
    num: '/01',
    title: 'Front-End Development',
    desc: 'Pixel-precise, accessible interfaces that stay smooth under pressure. Component systems, animations and state that scale with your product — not against it.',
    chips: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    num: '/02',
    title: 'Back-End & Cloud APIs',
    desc: 'Resilient server architecture — REST APIs, Firebase & JWT authentication, database schemas, and media pipelines designed for high scalability.',
    chips: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'PostgreSQL', 'Cloudinary'],
  },
  {
    num: '/03',
    title: 'Full-Stack Products',
    desc: 'End-to-end delivery: from database schema to domain, I ship complete products — authentication, payments, real-time features, Google Workspace tools, and admin dashboards.',
    chips: ['MERN Stack', 'Firebase Auth', 'Stripe', 'Google Workspace', 'Vite', 'CI/CD'],
  },
  {
    num: '/04',
    title: 'SEO, Analytics & Care',
    desc: 'End-to-end telemetry and search optimization: Google Search Console indexing, Google Analytics 4 (GA4), Google Tag Manager event tracking, Core Web Vitals, and Lighthouse performance.',
    chips: ['Google Analytics', 'Search Console', 'Tag Manager', 'Lighthouse', 'SSR / SEO', 'Web Vitals'],
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll('#services .reveal');
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

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <p className="eyebrow">03 — Services</p>
            <h2 className="s-title">
              What I <em>do</em>
            </h2>
          </div>
          <span className="s-note">( Click to expand )</span>
        </div>
        <div className="svc-list reveal">
          {services.map((s, i) => (
            <div className={`svc${openIndex === i ? ' open' : ''}`} key={i}>
              <button
                className="svc-head"
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
              >
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <span className="svc-tog">
                  <span className="ico sm">
                    <Plus />
                  </span>
                </span>
              </button>
              <div className="svc-body">
                <div>
                  <div className="svc-inner">
                    <p>{s.desc}</p>
                    <div className="chips">
                      {s.chips.map((c) => (
                        <span key={c}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
