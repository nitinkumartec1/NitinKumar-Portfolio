'use client';
import { useEffect, useRef, useState } from 'react';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 6 + Math.random() * 13;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setCount(100);
        setTimeout(() => {
          setDone(true);
          document.body.classList.add('loaded');
          setTimeout(() => setRemoved(true), 1100);
        }, 260);
        return;
      }
      setCount(Math.floor(p));
    }, 80);

    return () => clearInterval(intervalRef.current);
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader${done ? ' done' : ''}`} id="preloader">
      <div className="pre-inner">
        <p className="pre-tag">Portfolio © 2026</p>
        <div className="pre-name">Nitin <em>Kumar</em></div>
        <div className="pre-count">
          <span>{String(count).padStart(3, '0')}</span>
          <b>%</b>
        </div>
        <div className="pre-bar">
          <i style={{ width: `${count}%` }}></i>
        </div>
      </div>
    </div>
  );
}
