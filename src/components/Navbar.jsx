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
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[rgba(8,2,5,0.85)] backdrop-blur-xl border-b border-amber-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" data-hover>
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🪔</span>
          <div>
            <p className="font-cinzel text-xs tracking-[0.3em] shimmer-gold uppercase">U & D</p>
          </div>
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
        <button className="md:hidden text-amber-400 text-xl" data-hover>
          ☰
        </button>
      </div>
    </motion.nav>
  );
}
