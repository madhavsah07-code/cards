import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    Icon: FaInstagram,
    href: 'https://www.instagram.com/madhav_n05/',
    label: 'Instagram',
  },
  {
    Icon: FaWhatsapp,
    href: 'https://wa.me/916204760542',
    label: 'WhatsApp',
  },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-[#fffdfc]">
      {/* Background paisley overlay */}
      <div className="absolute inset-0 paisley-bg opacity-35 z-0" />
      
      {/* Top divider border with radial glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px] z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(183, 110, 121, 0.5), transparent)' }} 
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          {/* Row of Sequentially Swaying Floral Ornaments */}
          <div className="flex justify-center gap-6 md:gap-10 mb-12">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Custom Flower using soft sway and shadow */}
                <motion.span 
                  className="text-2xl md:text-3xl select-none filter drop-shadow-[0_0_8px_rgba(246,199,215,0.7)]"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  🌸
                </motion.span>
                
                {/* Rose gold thread cord */}
                <motion.div
                  className="w-[1px] h-10"
                  style={{ background: 'linear-gradient(180deg, rgba(183, 110, 121, 0.45), transparent)' }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Couple Names */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-cinzel font-black text-5xl md:text-7xl shimmer-gold-premium tracking-tight mb-2">
              Durga & Ujjwal
            </h2>
            <p className="font-dancing text-xl md:text-3xl text-[#b76e79] font-semibold mt-2 animate-pulse-glow">
              Forever begins June 25, 2026
            </p>
          </motion.div>

          {/* Rose Gold Ornament Line */}
          <div className="ornament-line mx-auto w-48 mb-10">
            <span className="text-[#b76e79]">❋</span>
          </div>

          {/* Redesigned Blessing Quote card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="relative rounded-3xl p-8 mb-14 max-w-2xl mx-auto w-full glass-strong"
            style={{
              border: '1.5px solid rgba(183, 110, 121, 0.3)',
              boxShadow: '0 10px 30px rgba(248, 220, 227, 0.15)',
            }}
          >
            {/* Double inner frame */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#b76e79]/10 pointer-events-none" />

            <div className="text-3xl mb-4 relative z-10 filter drop-shadow-sm select-none">🙏</div>
            
            <p className="font-playfair italic text-lg md:text-xl text-[#3c2f31] leading-relaxed mb-4 relative z-10">
              "May their union be as eternal as the sacred fire, as pure as the morning raga, and as joyful as the rain on parched earth."
            </p>
            
            <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#b76e79] font-black relative z-10">
              — A Divine Blessing —
            </p>
          </motion.div>

          {/* Social Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-col items-center gap-5 mb-14"
          >
            <div className="flex justify-center gap-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-hover
                  className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 shadow-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    borderColor: 'rgba(183, 110, 121, 0.35)',
                    color: '#b76e79',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(248, 220, 227, 0.35)';
                    e.currentTarget.style.borderColor = 'rgba(183, 110, 121, 0.7)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(248, 220, 227, 0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.65)';
                    e.currentTarget.style.borderColor = 'rgba(183, 110, 121, 0.35)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#b76e79] font-bold">
              Contact Host
            </p>
          </motion.div>

          {/* Bottom Divider line */}
          <div 
            className="h-[1px] mb-8 mx-auto w-64"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(183, 110, 121, 0.35), transparent)' }} 
          />

          <p className="font-inter text-[10px] tracking-[0.25em] text-[#3c2f31]/60 uppercase font-semibold">
            Made with ❤️ by Madhav for Durga & Ujjwal’s Wedding · 25 June 2026
          </p>

          {/* Stars Footer line */}
          <div className="flex justify-center gap-3.5 mt-4 text-[#b76e79]/30 text-xs">
            {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
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
