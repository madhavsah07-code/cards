import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();

      if (diff <= 0) {
        return setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calc();
    const id = setInterval(calc, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-5 justify-center flex-wrap">
      {[
        { val: timeLeft.days, label: 'Days' },
        { val: timeLeft.hours, label: 'Hours' },
        { val: timeLeft.minutes, label: 'Minutes' },
        { val: timeLeft.seconds, label: 'Seconds' },
      ].map(({ val, label }) => (
        <motion.div
          key={label}
          className="
            countdown-unit
            min-w-[72px]
            md:min-w-[90px]
            px-4
            py-4
            rounded-2xl
            backdrop-blur-md
            border
            border-[#6b4715]/30
            bg-black/35
          "
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            key={val}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="
              font-cinzel
              font-bold
              text-3xl
              md:text-4xl
              text-[#d4af5a]
              leading-none
            "
            style={{
              textShadow: `
                0 0 5px rgba(180,120,30,0.18),
                0 0 12px rgba(120,70,10,0.12),
                0 3px 10px rgba(0,0,0,0.96),
                0 6px 18px rgba(0,0,0,0.88)
              `,
            }}
          >
            {String(val ?? 0).padStart(2, '0')}
          </motion.div>

          <div className="font-inter text-xs tracking-widest text-[#b88630]/80 uppercase mt-2">
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* DARK OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.72) 0%,
                rgba(0,0,0,0.48) 30%,
                rgba(0,0,0,0.78) 75%,
                rgba(0,0,0,0.96) 100%
              )
            `,
          }}
        />

        {/* Reduced golden glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(180,120,30,0.08) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      {[
        { emoji: '🌸', x: '8%', y: '20%', delay: 0, duration: 5 },
        { emoji: '🌼', x: '90%', y: '25%', delay: 1, duration: 6 },
        { emoji: '🪷', x: '5%', y: '65%', delay: 2, duration: 7 },
        { emoji: '🌺', x: '92%', y: '70%', delay: 0.5, duration: 5.5 },
        { emoji: '✨', x: '15%', y: '45%', delay: 1.5, duration: 4 },
        { emoji: '✨', x: '85%', y: '50%', delay: 0.8, duration: 4.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none opacity-40"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Top text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            font-cinzel
            text-xs
            tracking-[0.45em]
            uppercase
            text-[#c89b45]/80
            mb-5
            flex
            items-center
            justify-center
            gap-3
          "
          style={{
            textShadow: `
              0 3px 10px rgba(0,0,0,0.96)
            `,
          }}
        >
          <span className="text-[#8b5e1a]">✦</span>
          Together with their families
          <span className="text-[#8b5e1a]">✦</span>
        </motion.p>

        {/* NAMES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 1,
            type: 'spring',
            stiffness: 50,
          }}
          className="mb-6"
        >
          {/* DURGA */}
          <h1
            className="
              font-cinzel
              font-black
              text-5xl
              sm:text-6xl
              md:text-[6rem]
              lg:text-[7rem]
              leading-none
              tracking-tight
              text-[#d4af5a]
            "
            style={{
              textShadow: `
                0 0 5px rgba(180,120,30,0.18),
                0 0 12px rgba(120,70,10,0.12),
                0 3px 10px rgba(0,0,0,0.96),
                0 6px 18px rgba(0,0,0,0.88)
              `,
              WebkitTextStroke: '1px rgba(120,70,20,0.25)',
            }}
          >
            DURGA
          </h1>

          {/* & */}
          <motion.div
            className="
              font-dancing
              text-2xl
              md:text-4xl
              text-[#b88630]
              my-1
            "
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              textShadow: `
                0 3px 10px rgba(0,0,0,0.96)
              `,
            }}
          >
            &
          </motion.div>

          {/* UJJWAL */}
          <motion.h1
            className="
              font-cinzel
              font-black
              text-5xl
              sm:text-6xl
              md:text-[6rem]
              lg:text-[7rem]
              leading-none
              tracking-tight
              text-[#d4af5a]
            "
            style={{
              textShadow: `
                0 0 5px rgba(180,120,30,0.18),
                0 0 12px rgba(120,70,10,0.12),
                0 3px 10px rgba(0,0,0,0.96),
                0 6px 18px rgba(0,0,0,0.88)
              `,
              WebkitTextStroke: '1px rgba(120,70,20,0.25)',
            }}
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            UJJWAL
          </motion.h1>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <div className="ornament-line mb-4 mx-auto max-w-sm">
            <span className="text-[#8b5e1a] text-lg">❋</span>
          </div>

          <p
            className="
              font-cormorant
              text-lg
              md:text-xl
              tracking-[0.25em]
              text-[#d4af5a]
              uppercase
              mb-2
            "
            style={{
              textShadow: `
                0 3px 10px rgba(0,0,0,0.96)
              `,
            }}
          >
            25 June 2026
          </p>

          <p
            className="font-dancing text-lg text-[#c89b45]/90"
            style={{
              textShadow: `
                0 3px 10px rgba(0,0,0,0.96)
              `,
            }}
          >
            A day written in the stars...
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8"
        >
          <p
            className="
              font-cinzel
              text-xs
              tracking-[0.35em]
              uppercase
              text-[#c89b45]/70
              mb-5
            "
          >
            Counting down to forever
          </p>

          <Countdown targetDate="2026-06-25T09:00:00+05:30" />
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-inter text-xs tracking-widest text-[#b88630]/50 uppercase">
            Scroll to explore
          </p>

          <motion.div
            className="w-px h-12 mx-auto"
            style={{
              background:
                'linear-gradient(180deg, rgba(139,94,26,0.7), transparent)',
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #050202)',
        }}
      />
    </section>
  );
}