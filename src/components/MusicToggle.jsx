import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioRef = useRef(null);

  const toggle = async () => {
    try {
      // Audio create only once
      if (!audioRef.current) {
        audioRef.current = new Audio('/music/Sajna Darshan Raval Instrumental.mp3');

        // Important settings
        audioRef.current.loop = true;
        audioRef.current.volume = 1.0; // Full volume
        audioRef.current.preload = 'auto';
      }

      if (playing) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

      setPlaying(!playing);

    } catch (error) {
      console.log('Audio play error:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2">

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="glass-strong rounded-xl px-4 py-2 text-right"
            style={{
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <p className="font-cinzel text-xs tracking-widest text-amber-400 uppercase whitespace-nowrap">
              {playing ? '♫ Music Playing' : 'Play Music'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="music-toggle relative w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >

        {/* Animated Waves */}
        {playing && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  border: '1px solid rgba(245,158,11,0.4)',
                  inset: -(i * 8),
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </>
        )}

        {/* Icon */}
        <motion.span
          className="text-2xl relative z-10"
          animate={
            playing
              ? { scale: [1, 1.15, 1] }
              : {}
          }
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          {playing ? '🎵' : '🔇'}
        </motion.span>

      </motion.button>
    </div>
  );
}