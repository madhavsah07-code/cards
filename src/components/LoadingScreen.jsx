import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1a0505 0%, #080205 70%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Rotating mandala */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer ring */}
        <motion.div
          className="absolute w-48 h-48 rounded-full"
          style={{ border: '1px solid rgba(245,158,11,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute w-36 h-36 rounded-full"
          style={{ border: '1px solid rgba(249,115,22,0.4)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{ border: '1px solid rgba(245,158,11,0.5)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Decorative dots on outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: '#f59e0b',
              left: '50%',
              top: '50%',
              transform: `rotate(${deg}deg) translate(90px, -50%)`,
              boxShadow: '0 0 6px #f59e0b',
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        {/* Center diya SVG */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          className="relative z-10 text-5xl"
        >
          🪔
        </motion.div>

        {/* Flame glow */}
        <motion.div
          className="absolute w-10 h-10 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.6), transparent)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <h1 className="font-cinzel text-xl md:text-2xl tracking-[0.4em] uppercase mb-3 shimmer-gold">
          Ujjwal & Durga
        </h1>
        <p className="font-dancing text-lg text-amber-400/70 mb-8">
          A union blessed by the divine...
        </p>
        
        {/* Loading bar */}
        <div className="w-64 h-0.5 bg-white/5 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b)' }}
            initial={{ width: '0%', backgroundPosition: '0% center' }}
            animate={{ width: '100%', backgroundPosition: '200% center' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </div>
        
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#f59e0b' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Corner ornaments */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-2xl opacity-30`}
          animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  );
}
