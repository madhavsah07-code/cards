import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-6 justify-center flex-wrap">
      {[
        { val: timeLeft.days, label: 'Days' },
        { val: timeLeft.hours, label: 'Hours' },
        { val: timeLeft.minutes, label: 'Minutes' },
        { val: timeLeft.seconds, label: 'Seconds' },
      ].map(({ val, label }) => (
        <motion.div
          key={label}
          className="countdown-unit min-w-[70px] md:min-w-[90px]"
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            key={val}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-cinzel font-bold text-3xl md:text-4xl shimmer-gold leading-none"
          >
            {String(val ?? 0).padStart(2, '0')}
          </motion.div>
          <div className="font-inter text-xs tracking-widest text-amber-400/50 uppercase mt-1">{label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(8,2,5,0.55) 0%, rgba(8,2,5,0.3) 30%, rgba(8,2,5,0.7) 80%, rgba(8,2,5,0.98) 100%)'
        }} />
        {/* Radial glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(234,88,12,0.12) 0%, transparent 60%)'
        }} />
      </motion.div>

      {/* Floating decorative elements */}
      {/* Marigold emoji decorations */}
      {[
        { emoji: '🌸', x: '8%', y: '20%', delay: 0, duration: 5 },
        { emoji: '🌼', x: '90%', y: '25%', delay: 1, duration: 6 },
        { emoji: '🪷', x: '5%', y: '65%', delay: 2, duration: 7 },
        { emoji: '🌺', x: '92%', y: '70%', delay: 0.5, duration: 5.5 },
        { emoji: '✨', x: '15%', y: '45%', delay: 1.5, duration: 4 },
        { emoji: '✨', x: '85%', y: '50%', delay: 0.8, duration: 4.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none opacity-60"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -20, 0], rotate: [-5, 5, -5], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Diya lights */}
      {[
        { x: '20%', delay: 0 }, { x: '35%', delay: 0.5 },
        { x: '65%', delay: 1 }, { x: '80%', delay: 0.3 },
      ].map((d, i) => (
        <motion.div
          key={`diya-${i}`}
          className="absolute bottom-24 text-xl pointer-events-none diya-glow opacity-50"
          style={{ left: d.x }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: d.delay }}
        >
          🪔
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-cinzel text-xs tracking-[0.5em] uppercase text-amber-400/60 mb-6 flex items-center justify-center gap-3"
        >
          <span className="text-amber-500">✦</span>
          Together with their families
          <span className="text-amber-500">✦</span>
        </motion.p>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 50 }}
          className="mb-6"
        >
          <h1 className="font-cinzel font-black text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-none shimmer-gold tracking-tight">
            Durga
          </h1>
          <motion.div
            className="font-dancing text-4xl md:text-6xl text-amber-300/70 my-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            &amp; UJJWAL
          </motion.div>
        </motion.div>

        {/* Date & location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <div className="ornament-line mb-4 mx-auto max-w-sm">
            <span className="text-amber-500 text-lg">❋</span>
          </div>
          <p className="font-cormorant text-xl md:text-2xl tracking-[0.25em] text-amber-200/70 uppercase mb-2">
            25 June 2026
          </p>
          <p className="font-dancing text-lg text-amber-300/50">
            A day written in the stars...
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-10"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase text-amber-400/40 mb-4">
            Counting down to forever
          </p>
          <Countdown targetDate="2026-06-25T09:00:00+05:30" />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-inter text-xs tracking-widest text-amber-400/30 uppercase">Scroll to explore</p>
          <motion.div
            className="w-px h-12 mx-auto"
            style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.5), transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080205)' }} />
    </section>
  );
}
