import React, { useRef, useEffect } from 'react';
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

/* ─── Trait Pill ──────────────────────────────────────────── */
function TraitPill({ icon, label, color, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.1, y: -3 }}
      className="flex flex-col items-center gap-2 cursor-default group"
      data-hover
    >
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: `rgba(255, 255, 255, 0.45)`,
          backdropFilter: 'blur(15px) saturate(130%)',
          WebkitBackdropFilter: 'blur(15px) saturate(130%)',
          border: `1.5px solid ${color}35`,
          boxShadow: `0 8px 24px rgba(92, 45, 52, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)`,
        }}
        whileHover={{
          boxShadow: `0 0 25px ${color}40, 0 0 45px ${color}15`,
          borderColor: `${color}90`,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle, ${color}20, transparent 70%)` }}
        />
        <span className="text-2xl relative z-10">{icon}</span>
      </motion.div>
      <span
        className="font-cinzel text-[9px] md:text-[10px] tracking-widest uppercase font-semibold text-center"
        style={{ color: `${color}` }}
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

  // Mouse-tilt 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [7, -7]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), { stiffness: 120, damping: 22 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 50 }}
      className="flex-1 min-w-0 flex flex-col items-center w-full"
    >
      {/* 3D tilted Card Wrapper */}
      <motion.div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glowing border ring */}
        <motion.div
          className="absolute -inset-[2px] rounded-3xl z-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${glowColor}, ${accentColor})`,
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Portrait container */}
        <div className="relative z-10 rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <motion.img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover object-top filter contrast-[1.05]"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Luxury bottom gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#fffdfc] via-[#fffdfc]/60 to-transparent opacity-95"
          />

          {/* Soft background aura */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${isLeft ? '80%' : '20%'} 30%, ${glowColor}15, transparent 65%)`,
            }}
          />

          {/* Title tag - Top center */}
          <motion.div
            className="absolute top-5 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.3 }}
          >
            <div
              className="px-5 py-1.5 rounded-full backdrop-blur-[20px] backdrop-saturate-[140%]"
              style={{
                background: 'rgba(255,255,255,0.65)',
                border: `1.5px solid rgba(255, 255, 255, 0.8)`,
                boxShadow: `0 8px 24px rgba(92,45,52,0.06), 0 0 15px ${accentColor}15, inset 0 1px 1px rgba(255,255,255,0.9)`,
              }}
            >
              <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: accentColor }}>
                {title}
              </p>
            </div>
          </motion.div>

          {/* Names Overlay - Bottom Center */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <motion.h3
              className="font-cinzel font-bold text-4xl shimmer-gold-premium mb-2 filter drop-shadow-md"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: delay + 0.45 }}
            >
              {name}
            </motion.h3>
            <motion.p
              className="font-cormorant italic text-base text-[#3c2f31]/80 leading-relaxed max-w-xs mx-auto font-medium"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.6 }}
            >
              {desc}
            </motion.p>
          </div>

          {/* Floating particle sparkles inside portrait */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-xs"
              style={{
                color: accentColor,
                left: `${30 + i * 25}%`,
                top: `${40 + i * 15}%`,
              }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: delay + i * 0.5 }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Trait descriptors */}
      <motion.div
        className="mt-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.65 }}
      >
        <div className="grid grid-cols-3 gap-4">
          {traits.map((t, i) => (
            <TraitPill key={t.label} {...t} delay={delay + 0.75 + i * 0.08} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Center Monogram ─────────────────────────────────────── */
function CenterMonogram() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      className="flex-shrink-0 relative z-10 flex items-center justify-center self-center lg:self-auto w-full lg:w-auto min-h-[140px] lg:min-h-[220px]"
    >
      {/* Decorative horizontal lines */}
      <motion.div
        className="absolute left-[-50px] lg:left-[-80px] top-1/2 -translate-y-1/2 h-[1px] w-12 lg:w-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(183,110,121,0.4))' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.div
        className="absolute right-[-50px] lg:right-[-80px] top-1/2 -translate-y-1/2 h-[1px] w-12 lg:w-20"
        style={{ background: 'linear-gradient(90deg, rgba(183,110,121,0.4), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Monogram logo with halo */}
      <motion.div
        className="relative flex items-center justify-center mx-auto"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow */}
        <motion.div
          className="absolute w-32 h-32 lg:w-36 lg:h-36 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(246,199,215,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Double-bordered container */}
        <div className="relative z-10 w-26 h-26 lg:w-28 lg:h-28 rounded-full bg-white/50 backdrop-blur-[30px] backdrop-saturate-[150%] border border-white/70 flex items-center justify-center shadow-[0_12px_40px_rgba(92,45,52,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.95)]">
          {/* Decorative spinning ring */}
          <motion.div
            className="absolute inset-1.5 rounded-full border border-[#b76e79]/20"
            style={{ borderStyle: 'dashed' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          <img
            src="/images/du-logo.png"
            alt="Durga & Ujjwal Logo"
            className="w-16 lg:w-20 object-contain rounded-full scale-105 drop-shadow-[0_0_10px_rgba(183,110,121,0.35)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function BrideGroomSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden bg-[#fffdfc]"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 15% 50%, rgba(246,199,215,0.15) 0%, transparent 60%),' +
              'radial-gradient(ellipse at 85% 50%, rgba(207,232,255,0.15) 0%, transparent 60%),' +
              'linear-gradient(180deg, #fffdfc 0%, #fff6ef 50%, #fffdfc 100%)',
          }}
        />
        {/* Pattern overlay */}
        <div className="absolute inset-0 paisley-bg opacity-35" />
      </motion.div>

      {/* Floating flower sparks background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#cfe8ff' : '#f6c7d7',
              boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2 text-[#b76e79]">Meet the</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold-premium mb-4">
            Bride &amp; Groom
          </h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-[#b76e79]">❋</span>
          </div>
          <p className="font-cormorant text-lg text-[#3c2f31]/60 mt-4 max-w-xl mx-auto italic">
            "Two beautiful souls, chosen by destiny, united by family, bound by love"
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8 justify-center">
          {/* Groom - Left (Pastel Blue/Rose Gold Theme) */}
          <PortraitPanel
            side="left"
            imgSrc="/images/groom_portrait.png"
            title="✦ The Groom ✦"
            name="Ujjwal Anand"
            desc="A visionary spirit — composed, ambitious, and ever so warm at heart."
            traits={groomTraits}
            accentColor="#b76e79"
            glowColor="#cfe8ff"
            delay={0}
          />

          {/* Center Monogram connector */}
          <CenterMonogram />

          {/* Bride - Right (Blush Pink/Rose Gold Theme) */}
          <PortraitPanel
            side="right"
            imgSrc="/images/bride_portrait.png"
            title="✦ The Bride ✦"
            name="Durga Sah"
            desc="A graceful soul — expressive, joyful, and radiant in every moment."
            traits={brideTraits}
            accentColor="#b76e79"
            glowColor="#f8dce3"
            delay={0.15}
          />
        </div>

        {/* Bottom Ornament decorative row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <div className="flex justify-center items-center gap-4">
            {['🌸', '🤍', '✦', '🤍', '🌸'].map((e, i) => (
              <motion.span
                key={i}
                className="text-xl md:text-2xl opacity-60"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <p className="font-dancing text-xl text-[#b76e79]/60 mt-4 italic">
            Blessed by the divine, united by family
          </p>
        </motion.div>
      </div>
    </section>
  );
}
