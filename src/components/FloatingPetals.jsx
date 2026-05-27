import React, { useEffect, useState } from 'react';

// Custom SVGs for Petals
function RosePetalSVG({ color }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M15 4 C9 1, 1 8, 4 18 C6 24, 15 28, 15 28 C15 28, 24 24, 26 18 C29 8, 21 1, 15 4 Z"
        fill={color || '#e11d48'}
        opacity="0.75"
      />
      <path
        d="M15 4 C11 5, 5 10, 7 17"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function MarigoldPetalSVG() {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M15 2 C18 2, 20 5, 18 8 C21 6, 25 8, 23 12 C26 11, 28 15, 25 18 C27 21, 24 25, 20 23 C21 26, 17 28, 15 25 C13 28, 9 26, 10 23 C6 25, 3 21, 5 18 C2 15, 4 11, 7 12 C5 8, 9 6, 12 8 C10 5, 12 2, 15 2 Z"
        fill="url(#marigoldGrad)"
        opacity="0.85"
      />
      <defs>
        <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffdfc" />
          <stop offset="60%" stopColor="#f8dce3" />
          <stop offset="100%" stopColor="#f6c7d7" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function GoldSparkleSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">
      <path
        d="M12 2 C12.5 7, 17 11.5, 22 12 C17 12.5, 12.5 17, 12 22 C11.5 17, 7 12.5, 2 12 C7 11.5, 11.5 7, 12 2 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

const PETAL_ITEMS = Array.from({ length: 20 }).map((_, i) => {
  const type = ['marigold', 'rose-pink', 'rose-red', 'sparkle'][i % 4];
  const size = type === 'sparkle' ? Math.random() * 8 + 6 : Math.random() * 12 + 14;
  const drift = `${(Math.random() - 0.5) * 160}px`;
  const rotateAngle = `${Math.random() * 720 - 360}deg`;
  const duration = `${Math.random() * 8 + 9}s`;
  const delay = `${Math.random() * 10}s`;

  return {
    id: i,
    left: `${Math.random() * 100}%`,
    duration,
    delay,
    size,
    drift,
    rotateAngle,
    type,
  };
});

export default function FloatingPetals() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reveal petals shortly after the invitation is loaded
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {PETAL_ITEMS.map(petal => (
        <div
          key={petal.id}
          className="petal-premium"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            '--duration-fall': petal.duration,
            '--delay-fall': petal.delay,
            '--drift-x': petal.drift,
            '--rotate-angle': petal.rotateAngle,
          }}
        >
          {petal.type === 'marigold' && <MarigoldPetalSVG />}
          {petal.type === 'rose-pink' && <RosePetalSVG color="#f8dce3" />}
          {petal.type === 'rose-red' && <RosePetalSVG color="#cfe8ff" />}
          {petal.type === 'sparkle' && <GoldSparkleSVG />}
        </div>
      ))}
    </div>
  );
}
