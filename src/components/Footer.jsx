'use client';
import { useEffect, useState, useRef } from 'react';
import { Copy, ArrowUp, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from './Toast';

const EMAIL = 'nitinkumartec1@gmail.com';
const PHONE = '+91 9193538808';
const PHONE_TEL = 'tel:+919193538808';
const WHATSAPP_URL = 'https://wa.me/919193538808';

const socials = [
  { label: 'GitHub', href: 'https://github.com/nitinkumartec1' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nitin-kumar-tec' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/nitinkumartec1' },
  { label: 'Instagram', href: 'https://www.instagram.com/nitinyadav_____/' },
];

export default function Footer() {
  const toast = useToast();
  const [clock, setClock] = useState('--:--:--');
  const fmt = useRef(null);

  useEffect(() => {
    fmt.current = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setClock(fmt.current.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('#contact .reveal');
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

  const copyEmail = (e) => {
    if (e) e.preventDefault();
    const done = () => toast('Email copied to clipboard ✓');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => toast(EMAIL));
    } else {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch {
        toast(EMAIL);
      }
      ta.remove();
    }
  };

  const copyPhone = (e) => {
    if (e) e.preventDefault();
    const done = () => toast('Phone number copied to clipboard ✓');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PHONE).then(done).catch(() => toast(PHONE));
    } else {
      const ta = document.createElement('textarea');
      ta.value = PHONE;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch {
        toast(PHONE);
      }
      ta.remove();
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
    <footer className="footer" id="contact">
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <p className="eyebrow reveal">04 — Contact</p>
        <h2 className="f-title reveal">
          <span>Let&apos;s Work</span>
          <span className="fill">
            Together<em>!</em>
          </span>
        </h2>

        {/* CONTACT CHANNELS */}
        <div className="f-contacts reveal">
          {/* Email Row */}
          <div className="f-row">
            <div className="f-row-left">
              <span className="f-tag">Email</span>
              <a href={`mailto:${EMAIL}`} className="f-val">
                {EMAIL}
              </a>
            </div>
            <div className="f-row-right">
              <a
                href={`mailto:${EMAIL}`}
                className="f-btn magnetic"
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                <Mail size={14} /> Send Mail
              </a>
              <button
                className="copy-btn magnetic"
                aria-label="Copy email"
                onClick={copyEmail}
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                <span className="ico sm">
                  <Copy size={16} />
                </span>
              </button>
            </div>
          </div>

          {/* Phone & WhatsApp Row */}
          <div className="f-row">
            <div className="f-row-left">
              <span className="f-tag">Phone</span>
              <a href={PHONE_TEL} className="f-val">
                {PHONE}
              </a>
            </div>
            <div className="f-row-right">
              <a
                href={PHONE_TEL}
                className="f-btn magnetic"
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                <Phone size={14} /> Call
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="f-btn f-btn-whatsapp magnetic"
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <button
                className="copy-btn magnetic"
                aria-label="Copy phone number"
                onClick={copyPhone}
                onMouseMove={onMagnetic}
                onMouseLeave={offMagnetic}
              >
                <span className="ico sm">
                  <Copy size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="socials reveal">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label} <span className="arrow-icon">↗</span>
            </a>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="f-bottom">
          <span>© 2025–2026 Nitin Kumar — All rights reserved</span>
          <span className="f-time">
            <span>{clock}</span> IST · Delhi NCR, India
          </span>
          <button
            className="to-top magnetic"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseMove={onMagnetic}
            onMouseLeave={offMagnetic}
          >
            <span className="ico sm">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
