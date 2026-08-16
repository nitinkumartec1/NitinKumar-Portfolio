'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!finePointer) return;

    document.body.classList.add('has-cursor');
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    let animId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      animId = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      if (e.target.closest('a,button,.project,.svc-head,[data-toast]'))
        document.body.classList.add('cursor-hover');
    };
    const onOut = (e) => {
      if (e.target.closest('a,button,.project,.svc-head,[data-toast]'))
        document.body.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(animId);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
