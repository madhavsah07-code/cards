import React, { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';

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
    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      {[
        { val: timeLeft.days, label: 'Days' },
        { val: timeLeft.hours, label: 'Hours' },
        { val: timeLeft.minutes, label: 'Minutes' },
        { val: timeLeft.seconds, label: 'Seconds' },
      ].map(({ val, label }) => (
        <motion.div
          key={label}
          className="
            relative
            min-w-[72px]
            sm:min-w-[90px]
            md:min-w-[110px]

            px-3
            sm:px-4

            py-3
            sm:py-5

            rounded-2xl

            border border-white/60

            bg-white/32
            backdrop-blur-[18px]

            shadow-[0_12px_30px_rgba(92,45,52,0.12),inset_0_1px_1px_rgba(255,255,255,0.85)]

            overflow-hidden
          "
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 220, damping: 15 }}
        >
          <div className="absolute inset-px rounded-2xl border border-white/25" />

          <motion.div
            key={val}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="
              font-cinzel
              font-bold

              text-2xl
              sm:text-3xl
              md:text-4xl

              text-[#5c2d34]

              text-center
              leading-none
            "
            style={{
              textShadow:
                '0 2px 10px rgba(255,255,255,0.8)',
            }}
          >
            {String(val ?? 0).padStart(2, '0')}
          </motion.div>

          <div
            className="
              font-inter

              text-[8px]
              sm:text-[9px]

              tracking-[0.22em]

              text-[#8c5c63]

              uppercase
              text-center

              mt-2

              font-bold
            "
          >
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 60,
    damping: 15,
  });

  const springY = useSpring(mouseY, {
    stiffness: 60,
    damping: 15,
  });

  const leftPillarX = useTransform(
    springX,
    [-300, 300],
    [-10, 10]
  );

  const rightPillarX = useTransform(
    springX,
    [-300, 300],
    [10, -10]
  );

  const pillarY = useTransform(
    springY,
    [-300, 300],
    [-5, 5]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      mouseX.set(clientX - window.innerWidth / 2);
      mouseY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () =>
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen

        flex
        flex-col
        items-center
        justify-center

        overflow-hidden

        bg-[#fffdfc]

        pt-28
        pb-20

        sm:pt-32
        md:pt-24
      "
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(/images/hero_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#fffdfc]/35 backdrop-blur-[2px]" />

        {/* Soft cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3c2f31]/20 via-[#fffdfc]/10 to-[#fffdfc]/75" />

        {/* Glow effects */}
        <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] bg-[#f8dce3]/30 blur-[120px]" />

        <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-[#fae4d9]/30 blur-[130px]" />
      </motion.div>

      {/* Left Pillar */}
      <motion.div
        className="
          absolute
          left-0
          top-0
          bottom-0

          w-16
          md:w-24

          z-10

          opacity-25

          hidden
          md:block
        "
        style={{
          x: leftPillarX,
          y: pillarY,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-[#f8dce3]/20 via-[#fffdfc]/10 to-[#fae4d9]/20" />
      </motion.div>

      {/* Right Pillar */}
      <motion.div
        className="
          absolute
          right-0
          top-0
          bottom-0

          w-16
          md:w-24

          z-10

          opacity-25

          hidden
          md:block
        "
        style={{
          x: rightPillarX,
          y: pillarY,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-[#f8dce3]/20 via-[#fffdfc]/10 to-[#fae4d9]/20" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="
          relative
          z-20

          w-full
          max-w-5xl

          px-4
          sm:px-6

          flex
          flex-col
          items-center
          text-center

          mt-8
          sm:mt-0
        "
        style={{
          y: textY,
          opacity,
        }}
      >
        {/* Glass Card */}
        <div
          className="
            relative

            w-full
            max-w-[92%]
            sm:max-w-3xl

            px-5
            py-7

            sm:px-8
            sm:py-9

            md:px-12
            md:py-12

            rounded-[32px]
            md:rounded-[38px]

            border border-white/50

            bg-white/18
            backdrop-blur-[24px]

            shadow-[0_25px_70px_rgba(92,45,52,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)]

            overflow-hidden
          "
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-[#fffdfc]/20 to-white/40 z-0" />

          {/* Glow */}
          <div className="absolute -left-20 top-10 w-44 h-44 bg-[#f8dce3]/25 blur-[100px]" />

          <div className="absolute -right-20 bottom-10 w-44 h-44 bg-[#fae4d9]/25 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="
                font-cinzel

                text-[8px]
                sm:text-[10px]
                md:text-xs

                tracking-[0.25em]
                md:tracking-[0.45em]

                uppercase

                text-[#8a4f58]

                mb-4

                font-bold

                flex
                items-center
                justify-center
                gap-2
              "
              style={{
                textShadow:
                  '0 2px 10px rgba(255,255,255,0.95)',
              }}
            >
              <span>✦</span>
              Together with their families
              <span>✦</span>
            </motion.p>

            {/* Couple Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
              }}
              className="relative mb-4"
            >
              <h1
                className="
                  font-cinzel
                  font-black

                  text-[13vw]
                  xs:text-[12vw]
                  sm:text-6xl
                  md:text-[5.5rem]
                  lg:text-[6.5rem]

                  leading-[0.92]

                  tracking-tight
                  sm:tracking-wide

                  text-[#5c2d34]
                "
                style={{
                  textShadow:
                    `
                    0 3px 20px rgba(255,255,255,0.95),
                    0 2px 12px rgba(92,45,52,0.16),
                    0 0 35px rgba(255,255,255,0.6)
                  `,
                }}
              >
                Durga & Ujjwal
              </h1>

              <p
                className="
                  font-dancing

                  text-base
                  sm:text-xl
                  md:text-3xl

                  text-[#8c5c63]

                  mt-2

                  italic
                  font-semibold
                "
                style={{
                  textShadow:
                    '0 2px 10px rgba(255,255,255,0.95)',
                }}
              >
                "A union blessed by the divine..."
              </p>
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="
                mb-7
                md:mb-10

                flex
                flex-col
                items-center
              "
            >
              <div className="mb-3">
                <span className="text-[#b76e79]/80 text-xs">
                  ❋
                </span>
              </div>

              <p
                className="
                  font-cormorant

                  text-lg
                  sm:text-2xl
                  md:text-3xl

                  tracking-[0.22em]
                  md:tracking-[0.3em]

                  uppercase

                  text-[#4e252c]

                  font-bold
                "
                style={{
                  textShadow:
                    '0 2px 10px rgba(255,255,255,0.95)',
                }}
              >
                25 June 2026
              </p>

              <p
                className="
                  font-dancing

                  text-sm
                  sm:text-lg
                  md:text-xl

                  text-[#8c5c63]

                  mt-1.5

                  italic
                  font-semibold
                "
                style={{
                  textShadow:
                    '0 2px 8px rgba(255,255,255,0.95)',
                }}
              >
                A day written in the stars...
              </p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="
                w-full
                flex
                flex-col
                items-center
              "
            >
              <p
                className="
                  font-cinzel

                  text-[8px]
                  sm:text-[10px]
                  md:text-xs

                  tracking-[0.25em]

                  uppercase

                  text-[#5c2d34]

                  mb-5

                  font-bold
                "
              >
                Counting down to forever
              </p>

              <Countdown targetDate="2026-06-25T22:00:00+05:30" />
            </motion.div>
          </div>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="
            flex
            flex-col
            items-center

            gap-2

            mt-8
            md:mt-10
          "
        >
          <p
            className="
              font-inter

              text-[8px]
              sm:text-[9px]

              tracking-[0.25em]

              uppercase

              text-[#8c5c63]

              font-bold
            "
            style={{
              textShadow:
                '0 2px 8px rgba(255,255,255,0.95)',
            }}
          >
            Scroll to explore
          </p>

          <motion.div
            className="w-[1.5px] h-10 md:h-12"
            style={{
              background:
                'linear-gradient(180deg, #b76e79 0%, transparent 100%)',
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fffdfc] to-transparent z-20 pointer-events-none" />
    </section>
  );
}