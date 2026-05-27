import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const familyData = {
  bride: {
    label: "Bride's Family",
    name: 'Durga Sah',
    emoji:
      'https://imgproxy.attic.sh/insecure/f:webp/h:1940/q:90/w:1940/plain/https://attic.sh/bphyr5tf9a7b7ix0dbexmfji23wj',
    color: 'from-[#fff6ef]/80 to-white/75',
    border: 'rgba(183,110,121,0.35)',
    glow: 'rgba(246,199,215,0.15)',
    members: [
      { role: "Father of the Bride", name: "Shri Radhe Shyam Sah", emoji: "👨" },
      { role: "Mother of the Bride", name: "Smt. Rajni Devi", emoji: "👩" },
      { role: "Brothers", name: "Basudeo & Madhav", emoji: "👦" },
      { role: "Sister", name: "Meghawati", emoji: "👧" },
    ],
  },

  groom: {
    label: "Groom's Family",
    name: 'Ujjwal Anand',
    emoji: 'https://imgproxy.attic.sh/insecure/f:png/plain/https://attic.sh/ba19suu7fxzdsqnovxsb276gn32y',
    color: 'from-[#dceeff]/80 to-white/75',
    border: 'rgba(183,110,121,0.35)',
    glow: 'rgba(207,232,255,0.15)',
    members: [
      { role: "Father of the Groom", name: "Shri Dr. Upendra Prasad", emoji: "👨" },
      { role: "Mother of the Groom", name: "Smt. Sangeeta Kumari", emoji: "👩" },
      { role: "Brother", name: "Kumar Gautam", emoji: "👦" },
      { role: "Sister", name: "Sukanya Shree", emoji: "👩" },
    ],
  },
};

function FamilyCard({ data, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isImage = typeof data.emoji === 'string' && data.emoji.startsWith('http');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 50 }}
      className="relative w-full"
    >
      {/* Outer Glow behind card */}
      <div 
        className="absolute -inset-0.5 rounded-3xl opacity-40 blur-xl transition duration-500"
        style={{ background: `radial-gradient(circle, ${data.glow} 0%, transparent 70%)` }}
      />

      <div
        className={`relative overflow-hidden rounded-3xl p-8 md:p-10 backdrop-blur-[35px] backdrop-saturate-[150%] transition-all duration-500 hover:scale-[1.01] bg-gradient-to-br ${data.color}`}
        style={{
          border: `1.5px solid ${data.border}`,
          boxShadow: `0 16px 48px rgba(92, 45, 52, 0.06), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)`,
        }}
      >
        {/* Inner Border details */}
        <div className="absolute inset-2.5 rounded-2xl border border-[#f8dce3]/45 pointer-events-none" />

        {/* Card Header (Crest & Name) */}
        <div className="text-center mb-8 relative z-10">
          <motion.div
            className="mb-5 flex justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay }}
          >
            {isImage ? (
              <div className="relative">
                {/* Concentric spin rings for crest */}
                <motion.div 
                  className="absolute -inset-2.5 rounded-full border border-[#b76e79]/30"
                  style={{ borderStyle: 'double', borderWidth: '2px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <img
                  src={data.emoji}
                  alt={data.name}
                  className="w-22 h-22 object-cover rounded-full border-2 border-[#b76e79]/40 shadow-[0_4px_16px_rgba(92,45,52,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] bg-white/40"
                />
              </div>
            ) : (
              <div className="text-6xl drop-shadow-md">{data.emoji}</div>
            )}
          </motion.div>

          <p
            className="font-cinzel text-[10px] tracking-[0.4em] uppercase mb-2 font-bold"
            style={{ color: data.border }}
          >
            {data.label}
          </p>

          <h3 className="font-cinzel text-3xl font-black shimmer-gold-premium tracking-tight">
            {data.name}
          </h3>
        </div>

        {/* Divider */}
        <div
          className="h-[1.5px] mb-8 rounded-full relative z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.border}, transparent)`,
          }}
        />

        {/* Family Members list */}
        <div className="space-y-4 relative z-10">
          {data.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.08 * i + 0.25 }}
              className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-[#f8dce3]/60 hover:bg-[#fffdfc]/60 transition-all duration-300 group/member"
            >
              {/* Member Icon circle with golden border */}
              <div className="w-12 h-12 rounded-full border border-[#b76e79]/20 flex items-center justify-center bg-white/40 backdrop-blur-[15px] shadow-[0_4px_12px_rgba(92,45,52,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] group-hover/member:border-[#b76e79] transition-all">
                <span className="text-xl">{member.emoji}</span>
              </div>

              <div>
                <p className="font-cinzel text-[9px] tracking-widest text-[#b76e79]/80 uppercase font-semibold">
                  {member.role}
                </p>
                <p className="font-playfair text-lg text-[#3c2f31]/90 font-medium">
                  {member.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corner Decors */}
        <div className="absolute top-4 right-4 text-[#b76e79]/20 text-sm">✦</div>
        <div className="absolute bottom-4 left-4 text-[#b76e79]/20 text-sm">✦</div>
      </div>
    </motion.div>
  );
}

export default function FamilySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="family"
      className="relative py-24 md:py-36 overflow-hidden bg-[#fffdfc]"
    >
      <div className="absolute inset-0 paisley-bg opacity-35 z-0" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(246,199,215,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2 text-[#b76e79]">Blessed by</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold-premium mb-4">
            Our Families
          </h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-[#b76e79]">❋</span>
          </div>
          <p className="font-cormorant text-lg text-[#3c2f31]/60 mt-4 italic max-w-lg mx-auto font-medium">
            "The bond that links your true family is not one of blood, but of respect, joy, and laughter."
          </p>
        </motion.div>

        {/* Cards container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <FamilyCard data={familyData.bride} delay={0} />
            <FamilyCard data={familyData.groom} delay={0.2} />
          </div>

          {/* Center Heart Emblem separator */}
          <motion.div
            className="
              hidden
              md:flex
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-16
              h-16
              rounded-full
              items-center
              justify-center
              z-10
              shadow-[0_0_20px_rgba(246,199,215,0.2)]
            "
            style={{
              background: 'linear-gradient(135deg, #fffdfc 0%, #f8dce3 100%)',
              border: '2px solid rgba(183, 110, 121, 0.45)',
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-2xl filter drop-shadow-sm">❤️</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}