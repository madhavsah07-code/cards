import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const familyData = {
  bride: {
    label: "Bride's Family",
    name: 'Durga Sah',
    emoji:
      'https://imgproxy.attic.sh/insecure/f:webp/h:1940/q:90/w:1940/plain/https://attic.sh/bphyr5tf9a7b7ix0dbexmfji23wj',
    color: 'from-pink-900/30 to-rose-900/30',
    border: 'rgba(244,114,182,0.3)',
    glow: 'rgba(244,114,182,0.2)',
    members: [
      { role: "Father of the Bride", name: "Shri Radhe Shyam Sah", emoji: "👨" },
      { role: "Mother of the Bride", name: "Smt. Rajni Devi", emoji: "👩" },
      { role: "Brother's", name: "Basudeo & Madhav", emoji: "👦" },
      { role: "Sister", name: "Meghawati", emoji: "👧" },
    ],
  },

  groom: {
    label: "Groom's Family",
    name: 'Ujjwal Anand',
    emoji: 'https://imgproxy.attic.sh/insecure/f:png/plain/https://attic.sh/ba19suu7fxzdsqnovxsb276gn32y',
    color: 'from-amber-900/30 to-orange-900/30',
    border: 'rgba(251,146,60,0.3)',
    glow: 'rgba(251,146,60,0.2)',
    members: [
      { role: "Father of the Groom", name: "Shri Dr. Upendra Prasad", emoji: "👨" },
      { role: "Mother of the Groom", name: "Smt. Sangeeta Kumari", emoji: "👩" },
      { role: "Brother", name: "Kumar Gautam", emoji: "👦" },
      { role: "Sister", name: "Sukanya Shree", emoji: "👩" },
    ],
  },
};

function FamilyCard({ data, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isImage = typeof data.emoji === 'string' && data.emoji.startsWith('http');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 60,
      }}
      className="relative"
    >
      <div
        className="rounded-3xl p-8 md:p-10 relative overflow-hidden group transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: 'rgba(10,3,5,0.75)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${data.border}`,
          boxShadow: `0 0 30px ${data.glow}30`,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="mb-4 flex justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay }}
          >
            {isImage ? (
              <img
                src={data.emoji}
                alt={data.name}
                className="
                  w-20
                  h-20
                  object-cover
                  rounded-full
                  border
                  border-pink-400/30
                  shadow-lg
                "
              />
            ) : (
              <div className="text-6xl">{data.emoji}</div>
            )}
          </motion.div>

          <p
            className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: data.border }}
          >
            {data.label}
          </p>

          <h3 className="font-playfair text-3xl font-bold shimmer-gold">
            {data.name}
          </h3>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.border}, transparent)`,
          }}
        />

        {/* Members */}
        <div className="space-y-4">
          {data.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.1 * i + 0.3 }}
              className="
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                transition-all
                duration-300
                group/member
                hover:bg-white/3
              "
              style={{ border: '1px solid transparent' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = data.border)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'transparent')
              }
            >
              <div className="text-2xl">{member.emoji}</div>

              <div>
                <p className="font-cormorant text-xs tracking-widest text-amber-400/40 uppercase">
                  {member.role}
                </p>

                <p className="font-playfair text-lg text-amber-100/80">
                  {member.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corner decoration */}
        <div className="absolute top-4 right-4 text-2xl opacity-20">✦</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-20">✦</div>

        {/* Hover gradient */}
        <div
          className="
            absolute
            inset-0
            rounded-3xl
            pointer-events-none
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-500
          "
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${data.glow}10, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function FamilySection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="family"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 paisley-bg opacity-50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(61,12,17,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2">
            Blessed by
          </p>

          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">
            Our Families
          </h2>

          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-amber-500">❋</span>
          </div>

          <p className="font-cormorant text-lg text-amber-200/50 mt-4 italic max-w-lg mx-auto">
            "The bond that links your true family is not one of blood, but of
            respect, joy and laughter."
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <FamilyCard data={familyData.bride} delay={0} />
            <FamilyCard data={familyData.groom} delay={0.2} />
          </div>

          {/* Center heart */}
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
            "
            style={{
              background: 'linear-gradient(135deg, #080205, #1a0505)',
              border: '2px solid rgba(245,158,11,0.4)',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">❤️</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}