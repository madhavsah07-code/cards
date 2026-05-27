import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const startMusic = async () => {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio('/music/Sajna Darshan Raval Instrumental.mp3');
          audioRef.current.loop = true;
          audioRef.current.volume = 0.8;
          audioRef.current.preload = 'auto';
        }
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked:', error);
      }
    };
    startMusic();
  }, []);

  const toggle = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/music/Sajna Darshan Raval Instrumental.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.8;
        audioRef.current.preload = 'auto';
      }

      if (playing) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setPlaying(!playing);
    } catch (error) {
      console.log('Audio action error:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-4">
      {/* Audio Wave Visualizer on Left */}
      <AnimatePresence>
        {playing && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-end gap-1 px-3 py-2 rounded-xl bg-white/50 backdrop-blur-md border border-[#b76e79]/30 shadow-sm h-9"
          >
            {[
              { duration: 0.8, delay: 0 },
              { duration: 1.2, delay: 0.2 },
              { duration: 0.9, delay: 0.4 },
              { duration: 1.4, delay: 0.1 },
              { duration: 1.0, delay: 0.3 },
            ].map((bar, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{
                  background: 'linear-gradient(to top, #f8dce3, #b76e79)',
                  height: '4px',
                }}
                animate={{
                  height: ['4px', '22px', '4px'],
                }}
                transition={{
                  duration: bar.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: bar.delay,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-md border border-[#b76e79]/35 rounded-xl px-4 py-2 shadow-md"
          >
            <p className="font-cinzel text-[10px] tracking-widest text-[#b76e79] uppercase whitespace-nowrap font-bold">
              {playing ? '♫ Ambient Music ON' : 'Play Ambient Music'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sitar Medallion Music Button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white/45 backdrop-blur-md border border-[#b76e79]/40 shadow-[0_4px_20px_rgba(246,199,215,0.3)] focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Breathing background halo */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(246,199,215,0.25) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Concentric rotating coin ring */}
        <motion.div
          className="absolute inset-1 rounded-full border border-[#b76e79]/25"
          style={{ borderStyle: 'double', borderWidth: '2px' }}
          animate={playing ? { rotate: 360 } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Central Music/Mute Emoji Icon */}
        <motion.span
          className="text-xl relative z-10 select-none"
          animate={playing ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {playing ? '🪕' : '🔇'}
        </motion.span>
      </motion.button>
    </div>
  );
}