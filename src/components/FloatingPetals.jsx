import React, { useEffect, useState } from 'react';

const PETALS = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${Math.random() * 8 + 8}s`,
  delay: `${Math.random() * 10}s`,
  size: Math.random() * 12 + 10,
  drift: `${(Math.random() - 0.5) * 200}px`,
  spin: `${Math.random() * 720 - 360}deg`,
  emoji: ['🌸', '🌺', '✨', '🌼'][Math.floor(Math.random() * 4)],
}));

export default function FloatingPetals() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {PETALS.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            '--duration': petal.duration,
            '--delay': petal.delay,
            '--drift': petal.drift,
            '--spin': petal.spin,
            fontSize: petal.size,
            opacity: 0.5,
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
