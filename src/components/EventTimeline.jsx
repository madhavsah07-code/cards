import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const events = [
  {
    name: 'Matkor',
    hindi: 'मटकोर',
    date: '23 June 2026',
    day: 'Tuesday',
    time: '7:00 PM onwards',
    venue: 'Sah Family Residence',
    location: 'Darbhanga, Bihar',
    mapLink: 'https://maps.app.goo.gl/HU1w43GKGfZoNccB9',
    desc: 'A sacred pre-wedding ceremony where the bride and groom are blessed with turmeric and oil, celebrating the beginning of a divine journey.',
    icon: '🏺',
    color: 'from-[#f3e8ff]/80 to-white/70',
    borderColor: 'rgba(168,85,247,0.35)',
    glowColor: 'rgba(168,85,247,0.15)',
    delay: 0,
  },
  {
    name: 'Haldi & Mehendi',
    hindi: 'हल्दी और मेहंदी',
    date: '24 June 2026',
    day: 'Wednesday',
    time: '5:00 PM to 11:00 PM',
    venue: 'Fusion Retreat Resort',
    location: 'Ranipur, NH 27, Darbhanga (near the Darbhanga Airport)',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fusion+Retreat+Resort+Darbhanga',
    desc: 'An enchanting night of music, dance, and celebration as both families come together to sing, laugh, and create memories eternal.',
    icon: '🎵',
    color: 'from-[#fff6ef]/80 to-white/70',
    borderColor: 'rgba(183,110,121,0.35)',
    glowColor: 'rgba(183,110,121,0.15)',
    delay: 0.15,
  },
  {
    name: 'Wedding',
    hindi: 'विवाह',
    date: '25 June 2026',
    day: 'Thursday',
    time: '10:00 PM — Auspicious Muhurat',
    venue: 'Fusion Retreat Resort',
    location: 'Ranipur, NH 27, Darbhanga (near the Darbhanga Airport)',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fusion+Retreat+Resort+Darbhanga',
    desc: 'The divine union of two souls, blessed by sacred fire and the eternal vows of saat pheras. A celebration of love, tradition, and new beginnings.',
    icon: '🪔',
    color: 'from-[#dceeff]/85 to-white/75',
    borderColor: 'rgba(183,110,121,0.55)',
    glowColor: 'rgba(207,232,255,0.3)',
    delay: 0.3,
    featured: true,
  },
];

function EventCard({ event, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: event.delay, type: 'spring', stiffness: 50 }}
      className="relative w-full group"
    >
      {/* Background Glow */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-50 group-hover:opacity-100 blur-xl transition duration-500"
        style={{
          background: event.featured
            ? 'radial-gradient(circle, rgba(212,175,90,0.2) 0%, transparent 70%)'
            : `radial-gradient(circle, ${event.glowColor} 0%, transparent 70%)`,
        }}
      />

      <div
        className={`relative overflow-hidden rounded-3xl p-6 md:p-8 backdrop-blur-[35px] backdrop-saturate-[150%] transition-all duration-500 hover:scale-[1.01] bg-gradient-to-br ${event.color}`}
        style={{
          border: `1.5px solid ${event.borderColor}`,
          boxShadow: event.featured
            ? `0 16px 40px rgba(92, 45, 52, 0.07), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)`
            : `0 12px 30px rgba(92, 45, 52, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.9)`,
        }}
      >
        {/* Double Inner Frame Accent */}
        <div className="absolute inset-2.5 rounded-2xl border border-[#f8dce3]/40 pointer-events-none" />

        {/* Featured Tag */}
        {event.featured && (
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-20">
            <span 
              className="font-cinzel text-[10px] tracking-[0.25em] uppercase px-5 py-1.5 rounded-b-xl font-bold shadow-md"
              style={{
                background: 'linear-gradient(135deg, #e8c5c8 0%, #b76e79 100%)',
                color: '#fffdfc',
              }}
            >
              ✦ MAIN EVENT ✦
            </span>
          </div>
        )}

        <div className="relative z-10">
          {/* Header row: Icon & Hindi Name */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <motion.div
                className="text-4xl md:text-5xl mb-3 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-[20px] border border-white/70 shadow-sm"
                animate={event.name === 'Wedding' ? { scale: [1, 1.08, 1], y: [0, -3, 0] } : { y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
              >
                <span className={event.name === 'Wedding' ? 'flicker-diya' : ''}>{event.icon}</span>
              </motion.div>
              <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: event.featured ? '#b76e79' : '#3c2f31' }}>
                {event.day}
              </p>
            </div>
            
            <div className="text-right">
              <span className="font-dancing text-4xl md:text-5xl text-[#b76e79]/15 font-bold block select-none">
                {event.hindi}
              </span>
            </div>
          </div>

          {/* Event Title */}
          <h3 className="font-cinzel text-3xl font-black mb-1 shimmer-gold-premium tracking-tight">
            {event.name}
          </h3>
          
          {/* Event Date */}
          <p className="font-cormorant text-lg text-[#3c2f31]/60 mb-5 font-semibold">{event.date}</p>

          {/* Divider Line */}
          <div 
            className="h-[1px] mb-6 rounded-full" 
            style={{
              background: `linear-gradient(90deg, transparent, ${event.borderColor}, transparent)`
            }} 
          />

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg opacity-70">⏰</span>
              <p className="font-cormorant text-base text-[#3c2f31]/80 font-medium">{event.time}</p>
            </div>
            
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group/location cursor-pointer"
            >
              <span className="text-lg mt-0.5 opacity-70 group-hover/location:scale-110 transition-transform">📍</span>
              <div>
                <p className="font-cormorant text-base text-[#3c2f31]/90 font-medium group-hover/location:text-[#b76e79] transition-colors duration-300">
                  {event.venue}
                </p>
                <p className="font-inter text-xs text-[#3c2f31]/50 group-hover/location:text-[#3c2f31]/70 transition-colors duration-300 mt-0.5 leading-snug">
                  {event.location}
                </p>
                <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-[#b76e79] mt-2 inline-flex items-center gap-1 group-hover/location:translate-x-1 transition-transform duration-300 font-bold">
                  View Map Direction ➔
                </p>
              </div>
            </a>
          </div>

          {/* Description Quote */}
          <p className="font-cormorant text-base md:text-lg text-[#3c2f31]/60 leading-relaxed italic border-l border-[#b76e79]/20 pl-4 py-1 font-medium">
            "{event.desc}"
          </p>

          {/* Mini Accent stars */}
          <div className="flex justify-center mt-7 gap-2 text-[#b76e79]/20 text-xs">
            <span>✦</span>
            <span>❋</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="events" className="relative py-24 md:py-36 overflow-hidden bg-[#fffdfc]">
      {/* Background paisley patterns and gradients */}
      <div className="absolute inset-0 paisley-bg opacity-30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffdfc] via-[#f8dce3]/25 to-[#fffdfc] z-0" />
      
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(246,199,215,0.15) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2 text-[#b76e79]">Celebration</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold-premium mb-4">Events</h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-[#b76e79]">❋</span>
          </div>
          <p className="font-cormorant text-lg text-[#3c2f31]/60 mt-4 max-w-lg mx-auto font-medium">
            Three days of celebrations, rituals, and eternal memories
          </p>
        </motion.div>

        {/* Cards Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {events.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} />
          ))}
        </div>

        {/* Bottom decorative Garlands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-20"
        >
          <div className="flex justify-center gap-5 text-2xl">
            {['🌸', '🤍', '🌸', '🤍', '🌸'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                className="opacity-70 text-[#b76e79]"
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
