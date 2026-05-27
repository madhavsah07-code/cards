import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'The Couple', href: '#couple' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Family', href: '#family' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Venue', href: '#venue' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['couple', 'events', 'gallery', 'family', 'rsvp', 'venue'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop & Mobile Top Navbar Bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed z-[9999] transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'top-3 md:top-4 left-4 right-4 md:left-8 md:right-8 py-2.5 bg-white/35 backdrop-blur-[35px] backdrop-saturate-[180%] border border-white/55 rounded-3xl shadow-[0_12px_40px_rgba(92,45,52,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.75)]'
            : 'top-0 left-0 right-0 py-4 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Monogram Logo */}
          <a href="#hero" className="flex items-center gap-3 group" data-hover>
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, rgba(246,199,215,0.5), transparent 70%)',
                }}
              />

              {/* Logo container */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-[0_4px_16px_rgba(92,45,52,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <img
                  src="/images/du-logo.png"
                  alt="Durga & Ujjwal Logo"
                  className="w-9 h-9 object-contain rounded-full scale-110 drop-shadow-[0_0_10px_rgba(183,110,121,0.3)]"
                />
              </div>
            </motion.div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                data-hover
                className={`nav-link font-cinzel text-xs tracking-[0.2em] font-medium transition-all duration-300 relative py-2 ${
                  active === link.href.slice(1)
                    ? 'text-[#b76e79]'
                    : 'text-[#3c2f31]/75 hover:text-[#b76e79]'
                }`}
              >
                {link.label}
                
                {/* Underline for active link */}
                {active === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b76e79] to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Luxury CTA Button */}
          <a
            href="#rsvp"
            data-hover
            className="hidden md:flex items-center gap-2 font-cinzel text-xs tracking-[0.2em] font-bold px-6 py-2.5 rounded-xl border border-white/60 shadow-[0_6px_20px_rgba(92,45,52,0.04),inset_0_1px_1px_rgba(255,255,255,0.85)] transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.45)',
              color: '#b76e79',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(183,110,121,0.7)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(246,199,215,0.25), inset 0 1px 1px rgba(255,255,255,0.95)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.65)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.60)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(92,45,52,0.04), inset 0 1px 1px rgba(255,255,255,0.85)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)';
            }}
          >
            <span>RSVP</span>
            <span className="text-xs">🌸</span>
          </a>

          {/* Mobile menu Toggle */}
          <button
            className="md:hidden relative z-[700] flex items-center justify-center w-11 h-11 rounded-full bg-white/40 backdrop-blur-[30px] border border-white/60 text-[#b76e79] text-xl shadow-[0_4px_16px_rgba(92,45,52,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] focus:outline-none"
            data-hover
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? '✕' : '☰'}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay - Rendered outside navbar context to bypass boundary stacking */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Fullscreen iOS-style frosted glass overlay blurs all page content behind it */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="md:hidden fixed inset-0 z-[9997] bg-white/10 backdrop-blur-[30px] backdrop-saturate-[170%] backdrop-contrast-[95%]"
              onClick={() => setMobileOpen(false)}
            />

            {/* Translucent floating menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="md:hidden fixed inset-x-4 top-24 rounded-[32px] overflow-hidden z-[9998] border border-white/60 bg-[#fffdfc]/75 backdrop-blur-[40px] backdrop-saturate-[180%] shadow-[0_24px_60px_rgba(92,45,52,0.15),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
            >
              <div className="relative flex flex-col px-6 py-6 gap-3 max-h-[75vh] overflow-y-auto isolate">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative overflow-hidden rounded-2xl px-5 py-4 font-cinzel text-sm tracking-[0.22em] uppercase font-semibold transition-all duration-300 border ${
                      active === link.href.slice(1)
                        ? 'text-[#b76e79] bg-[#fffdfc]/90 border-[#e8c5c8] shadow-[0_4px_16px_rgba(183,110,121,0.08)]'
                        : 'text-[#3c2f31]/80 border-transparent hover:bg-white/40 hover:border-white/60'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="#rsvp"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 text-center font-cinzel text-xs tracking-[0.3em] uppercase font-bold py-4 rounded-2xl border border-[#e8c5c8] bg-gradient-to-r from-[#fffdfc] to-[#fff7fa] shadow-[0_8px_24px_rgba(183,110,121,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    color: '#b76e79',
                  }}
                >
                  RSVP 🌸
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
