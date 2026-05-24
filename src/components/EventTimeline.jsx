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
    venue: 'Sha Family Residence',
    location: 'Darbhanga, Bihar',
    mapLink: 'https://maps.app.goo.gl/HU1w43GKGfZoNccB9',
    desc: 'A sacred pre-wedding ceremony where the bride and groom are blessed with turmeric and oil, celebrating the beginning of a divine journey.',
    emoji: '🌿',
    icon: '🏺',
    color: 'from-emerald-900/40 to-amber-900/40',
    borderColor: 'rgba(16,185,129,0.4)',
    glowColor: 'rgba(16,185,129,0.3)',
    delay: 0,
  },
  {
    name: 'Haldi & Mehedi',
    hindi: 'हल्दी और मेहंदी',
    date: '24 June 2026',
    day: 'Wednesday',
    time: '5:00 PM to 11:00 PM',
    venue: 'Fusion Retreat Resort',
    location: 'Ranipur, NH 27, Darbhanga (near the Darbhanga Airport terminal)',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fusion+Retreat+Resort+Darbhanga',
    desc: 'An enchanting night of music, dance, and celebration as both families come together to sing, laugh, and create memories eternal.',
    emoji: '🎶',
    icon: '🎵',
    color: 'from-purple-900/40 to-pink-900/40',
    borderColor: 'rgba(168,85,247,0.4)',
    glowColor: 'rgba(168,85,247,0.3)',
    delay: 0.15,
  },
  {
    name: 'Wedding',
    hindi: 'विवाह',
    date: '25 June 2026',
    day: 'Thursday',
    time: '10:00 PM — Auspicious Muhurat',
    venue: 'Fusion Retreat Resort',
    location: 'Ranipur, NH 27, Darbhanga (near the Darbhanga Airport terminal)',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fusion+Retreat+Resort+Darbhanga',
    desc: 'The divine union of two souls, blessed by sacred fire and the eternal vows of saat pheras. A celebration of love, tradition, and new beginnings.',
    emoji: '🪔',
    icon: '💍',
    color: 'from-amber-900/40 to-red-900/40',
    borderColor: 'rgba(245,158,11,0.5)',
    glowColor: 'rgba(245,158,11,0.4)',
    delay: 0.3,
    featured: true,
  },
];

function EventCard({ event, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: event.delay, type: 'spring', stiffness: 60 }}
      className="relative group"
    >
      <div
        className={`event-card bg-gradient-to-br ${event.color} backdrop-blur-xl`}
        style={{
          background: 'rgba(10,3,5,0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${event.borderColor}`,
          boxShadow: event.featured
            ? `0 0 40px ${event.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
            : `0 0 20px ${event.glowColor}30, 0 10px 40px rgba(0,0,0,0.4)`,
        }}
      >
        {event.featured && (
          <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-20">
            <span className="font-cinzel text-xs tracking-widest uppercase px-4 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', color: '#0a0305' }}>
              ✦ Main Event ✦
            </span>
          </div>
        )}

        <div className="relative z-10 p-6 md:p-8">
          {/* Icon + date */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <motion.div
                className="text-4xl mb-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index }}
              >
                {event.icon}
              </motion.div>
              <p className="font-cinzel text-xs tracking-[0.35em] uppercase" style={{ color: event.borderColor }}>
                {event.day}
              </p>
            </div>
            <div className="text-right">
              <p className="font-dancing text-5xl text-amber-400/20">{event.hindi}</p>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-cinzel text-3xl font-bold mb-1 shimmer-gold">{event.name}</h3>
          
          {/* Date */}
          <p className="font-cormorant text-lg text-amber-200/70 mb-5">{event.date}</p>

          {/* Divider */}
          <div className="h-px mb-5 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${event.borderColor}, transparent)` }} />

          {/* Details */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-lg">⏰</span>
              <p className="font-cormorant text-base text-amber-100/70">{event.time}</p>
            </div>
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group/location cursor-pointer"
            >
              <span className="text-lg">📍</span>

              <div>
                <p className="font-cormorant text-base text-amber-100/80 group-hover/location:text-amber-300 transition-colors duration-300">
                  {event.venue}
                </p>

                <p className="font-inter text-xs text-amber-400/50 group-hover/location:text-amber-400/80 transition-colors duration-300">
                  {event.location}
                </p>
              </div>
            </a>
          </div>

          {/* Desc */}
          <p className="font-cormorant text-base md:text-lg text-amber-100/50 leading-relaxed italic">
            "{event.desc}"
          </p>

          {/* Bottom decoration */}
          <div className="flex justify-center mt-6 gap-2 text-sm opacity-40">
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
        </div>

        {/* Hover glow overlay */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${event.glowColor}15, transparent 60%)` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function EventTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="events" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 paisley-bg" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(234,88,12,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2">Celebration</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">Events</h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-amber-500">❋</span>
          </div>
          <p className="font-cormorant text-lg text-amber-200/50 mt-4 max-w-lg mx-auto">
            Three days of celebrations, rituals, and eternal memories
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {events.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} />
          ))}
        </div>

        {/* Decoration below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex justify-center gap-4 text-3xl">
            {['🪔', '🌺', '🪔', '🌺', '🪔'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                className="opacity-60"
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
