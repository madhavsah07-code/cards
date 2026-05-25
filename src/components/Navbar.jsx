import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'The Couple', href: '#couple' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Family', href: '#family' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['couple', 'events', 'gallery', 'family', 'rsvp'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: scrolled ? 0 : -100,
        opacity: scrolled ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[rgba(8,2,5,0.85)] backdrop-blur-xl border-b border-amber-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] pointer-events-auto'
          : 'py-5 bg-transparent pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" data-hover>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-md opacity-70"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.35), transparent 70%)',
              }}
            />

            {/* Logo container */}
            <div className="relative z-10 w-11 h-11 rounded-full bg-black/20 backdrop-blur-md border border-amber-400/20 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.25)]">
              <img
                src="/images/du-logo.png"
                alt="Durga & Ujjwal Logo"
                className="w-8 object-contain rounded-full scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.75)]"
              />
            </div>
          </motion.div>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              data-hover
              className={`nav-link ${active === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#rsvp"
          data-hover
          className="hidden md:flex items-center gap-2 font-cinzel text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.15))',
            border: '1px solid rgba(245,158,11,0.4)',
            color: '#fde68a',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(234,88,12,0.3))';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(245,158,11,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.15))';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>RSVP</span>
        </a>

        {/* Mobile menu icon */}
        <button
          className="md:hidden text-amber-400 text-2xl z-[600]"
          data-hover
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          y: mobileOpen ? 0 : -20,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden absolute top-full left-0 right-0 bg-[rgba(8,2,5,0.96)] backdrop-blur-2xl border-b border-amber-900/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-cinzel text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                active === link.href.slice(1)
                  ? 'text-amber-300'
                  : 'text-amber-100/70'
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#rsvp"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center font-cinzel text-xs tracking-[0.2em] uppercase px-5 py-3 rounded-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(234,88,12,0.18))',
              border: '1px solid rgba(245,158,11,0.35)',
              color: '#fde68a',
            }}
          >
            RSVP
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
