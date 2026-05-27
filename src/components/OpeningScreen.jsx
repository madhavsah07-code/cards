import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function OpeningScreen({ onOpen }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const colors = ['#f8dce3', '#f6c7d7', '#dceeff', '#cfe8ff', '#b76e79', '#e8c5c8'];

      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { x: 0.15, y: 0.75 },
          colors,
          angle: 55,
        });

        confetti({
          particleCount: 70,
          spread: 70,
          origin: { x: 0.85, y: 0.75 },
          colors,
          angle: 125,
        });
      }, 400);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const garlands = [
    { delay: '0s', desktopLength: 6, mobileLength: 3, mobileHidden: false },  // Left edge
    { delay: '0.4s', desktopLength: 8, mobileLength: 0, mobileHidden: true }, // Left-mid
    { delay: '0.2s', desktopLength: 4, mobileLength: 0, mobileHidden: true }, // Center (short & hidden on mobile)
    { delay: '0.6s', desktopLength: 8, mobileLength: 0, mobileHidden: true }, // Right-mid
    { delay: '0.3s', desktopLength: 6, mobileLength: 3, mobileHidden: false }, // Right edge
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden flex flex-col items-center px-4 py-6 md:py-12"
      style={{
        background:
          'radial-gradient(circle at 50% 40%, #fffdfc 0%, #f6d1d9 52%, #c4e0f9 100%)',
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Background artwork overlay (faded sepia watermark of couple) */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'url(/images/hero_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(0.15) contrast(1.15)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffdfc]/20 via-transparent to-[#fffdfc]/55 pointer-events-none" />

      {/* Royal Temple Canopy (Toran) Header */}
      <div className="absolute top-0 left-0 right-0 w-full z-20 pointer-events-none">
        {/* Arch Shadow */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f8dce3]/35 to-transparent" />
        
        {/* SVG Toran Arch & Swaying Garlands */}
        <svg viewBox="0 0 1440 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_4px_12px_rgba(183,110,121,0.08)]">
          {/* Temple Arch Outline */}
          <path d="M0 0 H1440 V70 C1340 70 1260 110 1200 130 C1140 150 1080 150 1020 130 C960 110 880 70 720 70 C560 70 480 110 420 130 C360 150 300 150 240 130 C180 110 100 70 0 70 V0Z" fill="url(#archGrad)" />
          
          {/* Decorative Rose Gold & Silver Borders for Arch */}
          <path d="M0 70 C100 70 180 110 240 130 C300 150 360 150 420 130 C480 110 560 70 720 70 C880 70 960 110 1020 130 C1080 150 1140 150 1200 130 C1260 110 1340 70 1440 70" stroke="#b76e79" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M0 75 C100 75 180 115 240 135 C300 155 360 155 420 135 C480 115 560 75 720 75 C880 75 960 115 1020 135 C1080 155 1140 155 1200 135 C1260 115 1340 75 1440 75" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 7" strokeLinecap="round" opacity="0.8" />

          {/* Gradients */}
          <defs>
            <linearGradient id="archGrad" x1="720" y1="0" x2="720" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fffdfc" />
              <stop offset="0.6" stopColor="#f8dce3" />
              <stop offset="1" stopColor="#e8c5c8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Swaying Floral Garlands Hanging at key coordinates */}
        <div className="absolute top-2 left-0 right-0 w-full flex justify-between px-[8%] opacity-90">
          {garlands.map((item, i) => (
            <div key={i} className={`flex flex-col items-center sway-garland ${item.mobileHidden ? 'hidden md:flex' : 'flex'}`} style={{ animationDelay: item.delay }}>
              {/* Thread */}
              <div className="w-[1px] bg-[#b76e79]/20 h-6 md:h-10" />
              
              {/* Sakura and Rose Petals */}
              <div className="flex flex-col items-center select-none">
                {/* Mobile version */}
                <div className="flex flex-col items-center md:hidden">
                  {Array.from({ length: item.mobileLength }).map((_, j) => (
                    <span
                      key={j}
                      className="text-xs filter drop-shadow-sm leading-none mt-[-2px]"
                    >
                      {j % 2 === 0 ? '🌸' : '🤍'}
                    </span>
                  ))}
                </div>
                {/* Desktop version */}
                <div className="flex flex-col items-center hidden md:flex">
                  {Array.from({ length: item.desktopLength }).map((_, j) => (
                    <span
                      key={j}
                      className="text-sm md:text-base filter drop-shadow-sm leading-none mt-[-2px]"
                    >
                      {j % 2 === 0 ? '🌸' : '🤍'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hanging Silver/Rose-Gold Temple Bell */}
              <motion.div 
                className="swing-bell mt-1" 
                style={{ animationDelay: item.delay }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <svg width="12" height="18" viewBox="0 0 20 28" fill="none" className="w-3 h-4 md:w-4.5 md:h-6 drop-shadow-[0_2px_4px_rgba(183,110,121,0.12)]">
                  <path d="M10 2C7 2 5 4 5 7V13H15V7C15 4 13 2 10 2Z" fill="#cbd5e1" />
                  <path d="M2 13C2 13 1 14 1 16H19C19 14 18 13 18 13H2Z" fill="#b76e79" />
                  <rect x="3" y="16" width="14" height="3" fill="#cbd5e1" />
                  <circle cx="10" cy="22" r="3" fill="#b76e79" />
                  <circle cx="10" cy="25" r="2" fill="#cbd5e1" />
                </svg>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl text-center my-auto pt-28 md:pt-24 pb-4 select-none">
        {/* Monogram */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 50 }}
          className="relative mb-5 md:mb-7 flex items-center justify-center cursor-pointer scale-[0.7] sm:scale-[0.8] md:scale-95"
          whileHover={{ scale: 0.97 }}
        >
          {/* Breathing Divine Aura */}
          <motion.div
            className="absolute w-44 h-44 md:w-60 md:h-60 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(246,199,215,0.2) 0%, rgba(207,232,255,0.06) 50%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Rose Gold Outer Decorative Arch Ring */}
          <motion.div
            className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#b76e79]/25"
            style={{ borderStyle: 'double', borderWidth: '3px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />

          {/* Soft Silver Inner Rotating Mandala Ring */}
          <motion.div
            className="absolute w-32 h-32 md:w-46 md:h-46 rounded-full border-t border-b border-[#cbd5e1]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />

          {/* Central Logo Container (Frosted Glass) */}
          <div className="relative z-10 w-28 h-28 md:w-40 md:h-40 rounded-full bg-white/35 backdrop-blur-[30px] border border-white/55 flex items-center justify-center shadow-[0_12px_36px_rgba(92,45,52,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.9)] transition-all duration-300 hover:border-[#b76e79]/30">
            <img
              src="/images/du-logo.png"
              alt="Durga & Ujjwal Monogram"
              className="w-20 md:w-30 object-contain rounded-full p-1.5 scale-105 drop-shadow-[0_0_10px_rgba(183,110,121,0.2)]"
            />
          </div>
        </motion.div>

        {/* You Are Cordially Invited */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-2"
        >
          <p className="font-cinzel text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase text-[#b76e79] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
            ✦ You Are Cordially Invited ✦
          </p>
        </motion.div>

        {/* Couple Name Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mb-2 px-2"
        >
          <h1 className="font-cinzel font-extrabold text-[9.5vw] xs:text-[9.5vw] sm:text-5xl md:text-7.5xl tracking-wide mb-2 md:mb-3 leading-none text-[#5c2d34] filter drop-shadow-[0_2px_4px_rgba(92,45,52,0.15)] select-text">
            Durga & Ujjwal
          </h1>
          <p className="font-dancing text-lg sm:text-2xl md:text-3xl text-[#8c5c63] mt-2 italic drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-semibold">
            "A union blessed by the divine..."
          </p>
        </motion.div>

        {/* Date Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-40 md:w-52 h-px bg-gradient-to-r from-transparent via-[#b76e79]/35 to-transparent flex items-center justify-center my-2 md:my-4"
        >
          <span className="px-3 text-[#b76e79] text-xs">❋</span>
        </motion.div>

        {/* Wedding Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-cormorant text-sm md:text-xl text-[#3c2f31]/85 tracking-[0.25em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 font-bold"
        >
          25 June 2026
        </motion.p>

        {/* Luxury "Open Invitation" Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 70 }}
          className="w-full flex justify-center px-4"
        >
          <button
            onClick={onOpen}
            data-hover
            className="relative group px-9 py-4 md:px-11 md:py-4.5 rounded-2xl font-cinzel text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase overflow-hidden border border-[#b76e79]/25 bg-white/45 backdrop-blur-md shadow-[0_8px_30px_rgba(92,45,52,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-[1.03] hover:border-[#b76e79]/60 hover:shadow-[0_12px_36px_rgba(183,110,121,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
            style={{
              color: '#3c2f31',
            }}
          >
            {/* Subtle gradient border overlay */}
            <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#f8dce3] to-[#cfe8ff] opacity-20 pointer-events-none group-hover:opacity-60 transition-opacity duration-300" style={{ margin: '-1px' }} />

            {/* Glitter sparkles */}
            <span className="absolute left-2 top-2 text-[9px] opacity-75 animate-pulse">✨</span>
            <span className="absolute right-2 bottom-2 text-[9px] opacity-75 animate-pulse">✨</span>

            <span className="relative z-10 font-bold tracking-[0.3em] text-[#3c2f31] group-hover:text-[#5c2d34] transition-colors duration-300">Open Invitation</span>

            {/* Light sweep animation */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </button>
        </motion.div>
      </div>

      {/* Floating Flowers and Sparks background layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 16 }).map((_, i) => {
          const delay = Math.random() * 5;
          const duration = Math.random() * 5 + 5;
          const size = Math.random() * 6 + 3;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? '#f8dce3' : i % 3 === 1 ? '#dceeff' : '#e8c5c8',
                boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`,
              }}
              animate={{
                y: [0, -35, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
