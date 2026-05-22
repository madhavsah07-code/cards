import React, { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let raf;
    let targetX = -100, targetY = -100;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setDotPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      setPos(prev => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => setExpanded(true);
    const onLeave = () => setExpanded(false);

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-glow ${expanded ? 'cursor-expanded' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="cursor-dot"
        style={{ left: dotPos.x, top: dotPos.y }}
      />
    </>
  );
}
