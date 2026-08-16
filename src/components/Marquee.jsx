'use client';
import { useEffect, useRef } from 'react';

const items = [
  'React', 'Node.js', 'Next.js', 'TypeScript', 'MongoDB',
  'Firebase', 'Express.js', 'Google Analytics', 'Search Console',
  'Tag Manager', 'Google Workspace', 'PostgreSQL', 'Tailwind CSS',
  'Docker', 'AWS', 'Cloudinary',
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    /* duplicate track for seamless loop */
    if (trackRef.current) {
      trackRef.current.innerHTML += trackRef.current.innerHTML;
    }
  }, []);

  return (
    <div className="band-wrap">
      <div className="band" aria-hidden="true">
        <div className="track" ref={trackRef}>
          {items.map((item, i) => (
            <span className="m-item" key={i}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
