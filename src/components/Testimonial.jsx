'use client';
import { useEffect } from 'react';

export default function Testimonial() {
  useEffect(() => {
    const el = document.querySelector('.quote.reveal');
    if (!el) return;
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
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" style={{ paddingTop: '20px' }}>
      <div className="wrap">
        <figure className="quote reveal">
          <span className="q-mark">&ldquo;</span>
          <blockquote>
            Nitin rebuilt our entire platform in six weeks — faster, cleaner and
            beyond what we imagined. A rare mix of{' '}
            <mark>engineering depth</mark> and <mark>design taste</mark>.
          </blockquote>
          <figcaption>
            — <b>Founder</b>, B2B Holidays
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
