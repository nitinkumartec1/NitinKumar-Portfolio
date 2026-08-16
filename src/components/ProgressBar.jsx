'use client';
import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${dh ? y / dh : 0})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="progress">
      <span ref={barRef}></span>
    </div>
  );
}
