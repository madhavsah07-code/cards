import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function OpeningScreen({ onOpen }) {
  useEffect(() => {
    // Fire confetti on mount
    const timer = setTimeout(() => {
      const colors = ['#f59e0b', '#ea580c', '#fcd34d', '#f97316', '#dc2626', '#fbbf24'];
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors,
          angle: 60,
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors,
          angle: 120,
        });
      }, 500);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 30%, #1a0505 0%, #080205 60%), radial-gradient(ellipse at 30% 80%, #1a0a02 0%, transparent 50%)',
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(/images/hero_bg1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080205]/70 via-transparent to-[#080205]/90" />

      {/* Animated border ornaments */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        {/* Corner pieces */}
        {[
          'top-0 left-0 origin-top-left',
          'top-0 right-0 origin-top-right rotate-90',
          'bottom-0 right-0 origin-bottom-right rotate-180',
          'bottom-0 left-0 origin-bottom-left -rotate-90',
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-16 h-16`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          >
            <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
              <path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="rgba(245,158,11,0.6)" />
              <circle cx="8" cy="8" r="3" fill="rgba(245,158,11,0.8)" />
              <circle cx="20" cy="2" r="1.5" fill="rgba(249,115,22,0.6)" />
              <circle cx="2" cy="20" r="1.5" fill="rgba(249,115,22,0.6)" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Seal/Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 60, delay: 0.2 }}
          className="relative mx-auto mb-8 w-32 h-32 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(245,158,11,0.4)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{ border: '1px solid rgba(249,115,22,0.3)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          {/* Dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-amber-400"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${deg}deg) translate(56px, -50%)`,
                boxShadow: '0 0 8px #f59e0b',
              }}
            />
          ))}
          <span className="text-5xl relative z-10 diya-glow">🪔</span>
        </motion.div>

        {/* You're Invited */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-cinzel text-xs md:text-sm tracking-[0.5em] uppercase text-amber-400/70 mb-4"
        >
          ✦ You Are Cordially Invited ✦
        </motion.p>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-2"
        >
          <h1 className="font-cinzel font-black text-5xl md:text-8xl shimmer-gold tracking-tight mb-2 leading-none">
            Ujjwal
          </h1>
          <p className="font-dancing text-3xl md:text-5xl text-amber-300/80 mb-2">&</p>
          <h1 className="font-cinzel font-black text-5xl md:text-8xl shimmer-gold tracking-tight leading-none">
            Durga
          </h1>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="font-cormorant text-lg md:text-xl text-amber-200/60 tracking-[0.3em] my-6 uppercase"
        >
          25 June 2026
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.6 }}
          className="ornament-line my-6 mx-auto max-w-xs"
        >
          <span className="text-amber-500 text-sm">❋</span>
        </motion.div>

        {/* Open Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 80 }}
          onClick={onOpen}
          data-hover
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-10 py-4 rounded-full font-cinzel text-sm tracking-[0.3em] uppercase overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #d97706 100%)',
            boxShadow: '0 0 30px rgba(245,158,11,0.4), 0 4px 20px rgba(0,0,0,0.5)',
            color: '#0a0305',
          }}
        >
          <span className="relative z-10 font-bold">Open Invitation</span>
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          {/* Sparkles */}
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </motion.button>

        {/* Floating diyas */}
        {[-120, -60, 60, 120].map((x, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-40 pointer-events-none"
            style={{ left: `calc(50% + ${x}px)`, bottom: '15%' }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
          >
            🪔
          </motion.span>
        ))}
      </div>

      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#f59e0b' : '#ea580c',
            boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>
  );
}
