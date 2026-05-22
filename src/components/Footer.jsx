import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
  { Icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #080205 0%, #0d0308 50%, #080205 100%)',
      }} />
      <div className="absolute inset-0 paisley-bg opacity-40" />

      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Animated diya row */}
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
              >
                <span className="text-xl md:text-2xl diya-glow opacity-70">🪔</span>
                <motion.div
                  className="w-px h-8"
                  style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.3), transparent)' }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Names */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-cinzel font-black text-5xl md:text-7xl shimmer-gold mb-2">
              Ujjwal & Durga
            </h2>
            <p className="font-dancing text-2xl text-amber-400/60 mb-8">Forever begins June 25, 2026</p>
          </motion.div>

          {/* Ornament */}
          <div className="ornament-line mx-auto max-w-sm mb-10">
            <span className="text-amber-500">❋</span>
          </div>

          {/* Blessing quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-2xl p-8 mb-12 max-w-2xl mx-auto"
            style={{ border: '1px solid rgba(245,158,11,0.15)' }}
          >
            <div className="text-3xl mb-4">🙏</div>
            <p className="font-playfair italic text-xl md:text-2xl text-amber-200/80 leading-relaxed mb-4">
              "May their union be as eternal as the sacred fire, as pure as the morning raga, and as joyful as the rain on parched earth."
            </p>
            <p className="font-cinzel text-xs tracking-widest uppercase text-amber-500/50">
              — A Divine Blessing —
            </p>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-5 mb-12"
          >
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-hover
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: '#fde68a',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.2)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Bottom line */}
          <div className="h-px mb-8 mx-auto max-w-xs rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }} />

          <p className="font-inter text-xs tracking-widest text-amber-400/30 uppercase">
            Made with ❤️ by Madhav for Ujjwal & Durga’s Wedding · 25 June 2026          </p>

          {/* Bottom decorative stars */}
          <div className="flex justify-center gap-2 mt-4 text-amber-500/20 text-xs">
            {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
