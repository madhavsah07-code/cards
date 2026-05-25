import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ─── Data ────────────────────────────────────────────────── */
const groomTraits = [
  
];

const brideTraits = [
  
];

/* ─── Mandala SVG ─────────────────────────────────────────── */
function MandalaSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      {/* Outer decorative circles */}
      {[90, 75, 60, 45, 30].map((r, i) => (
        <circle
          key={i}
          cx="100" cy="100" r={r}
          stroke={`rgba(245,158,11,${0.08 + i * 0.05})`}
          strokeWidth="0.8"
          strokeDasharray={i % 2 === 0 ? '4 4' : 'none'}
        />
      ))}
      {/* Petals – 8 directions */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 100 + 65 * Math.cos(angle);
        const y = 100 + 65 * Math.sin(angle);
        return (
          <ellipse
            key={i}
            cx={x} cy={y}
            rx="9" ry="5"
            fill="rgba(245,158,11,0.12)"
            transform={`rotate(${i * 45} ${x} ${y})`}
          />
        );
      })}
      {/* Inner star points */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 38 * Math.cos(angle);
        const y1 = 100 + 38 * Math.sin(angle);
        const x2 = 100 + 52 * Math.cos(angle);
        const y2 = 100 + 52 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(245,158,11,0.35)" strokeWidth="1" />
        );
      })}
      {/* Dot accents */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <circle key={i}
            cx={100 + 78 * Math.cos(angle)}
            cy={100 + 78 * Math.sin(angle)}
            r="2.5" fill="rgba(245,158,11,0.5)" />
        );
      })}
      {/* Center */}
      <circle cx="100" cy="100" r="18" fill="rgba(8,2,5,0.9)"
        stroke="rgba(245,158,11,0.6)" strokeWidth="1" />
      <circle cx="100" cy="100" r="10" fill="rgba(245,158,11,0.12)"
        stroke="rgba(249,115,22,0.5)" strokeWidth="0.8" />
    </svg>
  );
}

/* ─── Trait Pill ──────────────────────────────────────────── */
function TraitPill({ icon, label, color, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.12, y: -4 }}
      className="flex flex-col items-center gap-1.5 cursor-default group"
      data-hover
    >
      <motion.div
        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: `rgba(8,2,5,0.7)`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 14px ${color}20`,
        }}
        whileHover={{
          boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}20`,
          borderColor: `${color}99`,
        }}
        transition={{ duration: 0.2 }}
        animate={{ y: [0, -4, 0] }}
      >
        {/* Glow bg */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle, ${color}15, transparent)` }}
        />
        <span className="text-2xl relative z-10">{icon}</span>
      </motion.div>
      <span
        className="font-cinzel text-[10px] tracking-widest uppercase"
        style={{ color: `${color}99` }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Portrait Panel ──────────────────────────────────────── */
function PortraitPanel({ side, imgSrc, title, name, desc, traits, accentColor, glowColor, delay }) {
  const isLeft = side === 'left';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // Mouse-tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), { stiffness: 120, damping: 20 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, type: 'spring', stiffness: 50, damping: 18 }}
      className="flex-1 min-w-0 flex flex-col items-center"
    >
      {/* Portrait card */}
      <motion.div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden cursor-default"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer glow ring – animated */}
        <motion.div
          className="absolute -inset-1 rounded-3xl z-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}80, ${glowColor}40, ${accentColor}80)`,
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Portrait image */}
        <div className="relative z-10 rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <motion.img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover object-top"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: isLeft
                ? `linear-gradient(to top, rgba(8,2,5,0.95) 0%, rgba(8,2,5,0.4) 40%, rgba(8,2,5,0.1) 70%, transparent 100%)`
                : `linear-gradient(to top, rgba(8,2,5,0.95) 0%, rgba(8,2,5,0.4) 40%, rgba(8,2,5,0.1) 70%, transparent 100%)`,
            }}
          />

          {/* Side glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${isLeft ? '80%' : '20%'} 30%, ${glowColor}20, transparent 60%)`,
            }}
          />

          {/* Title badge – top */}
          <motion.div
            className="absolute top-5 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.4 }}
          >
            <div
              className="px-5 py-1.5 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(8,2,5,0.6)',
                border: `1px solid ${accentColor}50`,
              }}
            >
              <p className="font-cinzel text-xs tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                {title}
              </p>
            </div>
          </motion.div>

          {/* Name + desc – bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3
              className="font-cinzel font-bold text-3xl md:text-4xl shimmer-gold mb-1 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: delay + 0.5 }}
            >
              {name}
            </motion.h3>
            <motion.p
              className="font-cormorant italic text-base text-amber-100/60 leading-snug"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.65 }}
            >
              {desc}
            </motion.p>
          </div>

          {/* Corner sparkles */}
          {[
            { pos: 'top-3 right-3', delay: delay + 0.6 },
            { pos: 'top-14 right-5', delay: delay + 0.9 },
          ].map(({ pos, delay: d }, i) => (
            <motion.span
              key={i}
              className={`absolute ${pos} text-xs`}
              style={{ color: accentColor }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: d }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Traits grid */}
      <motion.div
        className="mt-7 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.7 }}
      >
        <p
          className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-center mb-4"
          style={{ color: `${accentColor}60` }}
        >
          
        </p>
        <div className="grid grid-cols-3 gap-3">
          {traits.map((t, i) => (
            <TraitPill key={t.label} {...t} delay={delay + 0.8 + i * 0.07} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Center Monogram ─────────────────────────────────────── */
function CenterMonogram() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 1,
        delay: 0.3,
        type: 'spring',
        stiffness: 60,
      }}
      className="flex-shrink-0 relative z-10 flex items-center justify-center self-center lg:self-auto w-full lg:w-auto min-h-[120px] lg:min-h-[180px]"
    >
      {/* Left line */}
      <motion.div
        className="absolute left-[-45px] lg:left-[-70px] top-1/2 -translate-y-1/2 h-px w-10 lg:w-16"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(245,158,11,0.5))',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Right line */}
      <motion.div
        className="absolute right-[-45px] lg:right-[-70px] top-1/2 -translate-y-1/2 h-px w-10 lg:w-16"
        style={{
          background:
            'linear-gradient(90deg, rgba(245,158,11,0.5), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Center logo */}
      <motion.div
        className="relative flex items-center justify-center mx-auto"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Glow */}
        <motion.div
          className="absolute w-28 h-28 lg:w-32 lg:h-32 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.22), transparent 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />

        {/* Logo container */}
        <div className="relative z-10 w-24 h-24 lg:w-24 lg:h-24 rounded-full bg-black/20 backdrop-blur-md border border-amber-400/20 flex items-center justify-center shadow-[0_0_45px_rgba(251,191,36,0.28)]">
          
          <img
            src="/images/du-logo.png"
            alt="Durga & Ujjwal Logo"
            className="w-16 lg:w-[72px] object-contain rounded-full p-1 scale-110 drop-shadow-[0_0_20px_rgba(251,191,36,0.75)]"
          />

        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Ambient Particles ───────────────────────────────────── */
function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#ea580c' : '#fcd34d',
            boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`,
          }}
          animate={{
            y: [0, -(Math.random() * 60 + 20), 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function BrideGroomSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(120,53,15,0.12) 0%, transparent 50%),' +
              'radial-gradient(ellipse at 80% 50%, rgba(61,12,17,0.15) 0%, transparent 50%),' +
              'linear-gradient(180deg, #080205 0%, #0d0308 50%, #080205 100%)',
          }}
        />
        <div className="absolute inset-0 paisley-bg opacity-40" />
      </motion.div>

      {/* Ambient particles */}
      <AmbientParticles />

      {/* Horizontal glow bars */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(249,115,22,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(249,115,22,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2">Meet the</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">
            Bride &amp; Groom
          </h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-amber-500">❋</span>
          </div>
          <p className="font-cormorant text-lg text-amber-200/50 mt-4 max-w-xl mx-auto italic">
            Two beautiful souls, chosen by destiny, united by family, bound by love
          </p>
        </motion.div>

        {/* ── Split Layout ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-6">
          {/* Groom – Left */}
          <PortraitPanel
            side="left"
            imgSrc="/images/groom_portrait.png"
            title="✦ The Groom ✦"
            name="Ujjwal"
            desc="A visionary spirit — composed, ambitious, and ever so warm at heart."
            traits={groomTraits}
            accentColor="#f59e0b"
            glowColor="#f97316"
            delay={0}
          />

          {/* Center monogram */}
          <CenterMonogram />

          {/* Bride – Right */}
          <PortraitPanel
            side="right"
            imgSrc="/images/bride_portrait.png"
            title="✦ The Bride ✦"
            name="Durga"
            desc="A graceful soul — expressive, joyful, and radiant in every moment."
            traits={brideTraits}
            accentColor="#f43f5e"
            glowColor="#fb923c"
            delay={0.15}
          />
        </div>

        {/* ── Bottom ornament ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="flex justify-center items-center gap-4">
            {['🪔', '🌺', '✦', '🌺', '🪔'].map((e, i) => (
              <motion.span
                key={i}
                className="text-xl md:text-2xl opacity-50"
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="font-dancing text-xl text-amber-400/40 mt-4 italic"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Blessed by the divine, united by family
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
