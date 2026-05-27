import React from 'react';
import { motion } from 'framer-motion';

export default function VenueSection() {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Fusion+Retreat+Resort+Darbhanga";

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Fusion+Retreat+Resort+Darbhanga";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  return (
    <section
      id="venue"
      className="
        relative
        py-16
        sm:py-20
        md:py-28
        px-2
        sm:px-4
        md:px-6
        overflow-hidden
        bg-[#fffdfc]
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffdfc] via-[#f8dce3]/20 to-[#fffdfc] pointer-events-none z-0" />

      <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-[#cfe8ff]/20 blur-[100px] pointer-events-none" />

      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 rounded-full bg-[#fae4d9]/25 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              font-cinzel
              text-xs
              tracking-[0.4em]
              uppercase
              text-[#b76e79]
              font-bold
              block
              mb-3
            "
          >
            ✦ The Wedding Venue ✦
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              font-cinzel
              font-black
              text-3xl
              md:text-5xl
              text-[#5c2d34]
              tracking-wide
            "
          >
            Fusion Retreat Resort
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="
              font-dancing
              text-lg
              md:text-2xl
              text-[#8c5c63]
              mt-3
              italic
              font-semibold
            "
          >
            "A destination of love and celebration..."
          </motion.p>
        </div>

        {/* Layout */}
        <div className="relative w-full flex flex-col lg:block">

          {/* MAP CONTAINER */}
          <motion.div
            variants={mapVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            className="
              relative
              w-full
              min-h-[420px]
              sm:min-h-[520px]
              lg:h-[720px]
              rounded-[28px]
              sm:rounded-[40px]
              overflow-hidden
              border
              border-white/60
              bg-[#fffdfc]
              shadow-[0_20px_60px_rgba(92,45,52,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]
              group
              z-10
              order-2
              lg:order-none
              mt-6
              lg:mt-0
            "
          >
            {/* Zoom Layer */}
            <motion.div
              className="absolute inset-0 z-0 w-full h-full"
              variants={{
                hover: {
                  scale: 1.015,
                },
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            >

              {/* MAP SVG */}
              <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full object-cover"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background */}
                <rect width="1000" height="600" fill="#f9f7f5" />
                <path d="M0,0 H1000 V600 H0 Z" fill="url(#mapGrad)" />

                {/* River */}
                <path
                  d="M-50,500 C200,480 350,380 500,320 C650,260 800,120 1050,80"
                  stroke="#cfe8ff"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                <path
                  d="M-50,500 C200,480 350,380 500,320 C650,260 800,120 1050,80"
                  stroke="#bde0fe"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Highway */}
                <path
                  d="M-50,200 L1050,280"
                  stroke="#cbd5e1"
                  strokeWidth="10"
                  strokeLinecap="round"
                />

                <path
                  d="M-50,200 L1050,280"
                  stroke="#e8c5c8"
                  strokeWidth="5"
                  strokeDasharray="12 8"
                  strokeLinecap="round"
                />

                {/* Roads */}
                <path
                  d="M150,-50 C180,200 120,400 200,650"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <path
                  d="M350,-50 C300,150 400,380 420,650"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <path
                  d="M680,-50 C650,250 720,450 700,650"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Venue Marker */}
                <g transform="translate(480,310)">

                  <motion.circle
                    r="32"
                    fill="none"
                    stroke="#b76e79"
                    strokeWidth="1"
                    animate={{
                      scale: [0.8, 2.2, 0.8],
                      opacity: [0.35, 0, 0.35],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                    }}
                  />

                  <motion.g
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <path
                      d="M0,-24 C-10,-24 -11,-14 0,0 C11,-14 10,-24 0,-24 Z"
                      fill="url(#pinGrad)"
                      stroke="#fff"
                      strokeWidth="1.5"
                    />

                    <circle cx="0" cy="-15" r="4.5" fill="#fff" />

                    <circle cx="0" cy="-15" r="2" fill="#b76e79" />
                  </motion.g>

                  <text
                    x="0"
                    y="20"
                    fill="#5c2d34"
                    fontSize="14"
                    fontFamily="Cinzel"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Fusion Retreat Resort
                  </text>
                </g>

                {/* Airport */}
                <g transform="translate(720,100) rotate(15)">
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="24"
                    rx="4"
                    fill="#cbd5e1"
                  />

                  <line
                    x1="10"
                    y1="12"
                    x2="170"
                    y2="12"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />

                  <text
                    x="90"
                    y="-12"
                    fill="#8c5c63"
                    fontSize="11"
                    fontFamily="Cinzel"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Darbhanga Airport
                  </text>
                </g>

                {/* Gradient */}
                <defs>
                  <linearGradient
                    id="mapGrad"
                    x1="500"
                    y1="0"
                    x2="500"
                    y2="600"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#faf8f6" />
                    <stop offset="0.5" stopColor="#f7f3ef" />
                    <stop offset="1" stopColor="#f3eee9" />
                  </linearGradient>

                  <linearGradient
                    id="pinGrad"
                    x1="0"
                    y1="-24"
                    x2="0"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#e8c5c8" />
                    <stop offset="0.5" stopColor="#b76e79" />
                    <stop offset="1" stopColor="#8c535c" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none z-10" />
          </motion.div>

          {/* VENUE CARD */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              w-full
              lg:w-[430px]
              rounded-[28px]
              sm:rounded-[32px]
              overflow-hidden
              border
              border-white/60
              bg-white/55
              backdrop-blur-[24px]
              shadow-[0_24px_60px_rgba(92,45,52,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)]
              z-20
              order-1
              lg:order-none
              lg:absolute
              lg:top-1/2
              lg:-translate-y-1/2
              lg:left-10
              relative
              mx-auto
              lg:mx-0
              -mb-10
              lg:mb-0
            "
          >
            <div className="p-5 sm:p-7 md:p-9 flex flex-col gap-6">

              {/* Header */}
              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-2xl bg-white/50 border border-white/80 flex items-center justify-center text-lg">
                  📍
                </div>

                <div>
                  <h3 className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#b76e79] font-bold">
                    Wedding Venue
                  </h3>

                  <p className="font-cormorant text-2xl font-bold text-[#5c2d34]">
                    Fusion Retreat
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-4">

                <div className="flex items-start gap-4">
                  <span className="text-[#b76e79]">🗺️</span>

                  <div>
                    <h4 className="font-cinzel text-[10px] uppercase tracking-wider text-[#8c5c63] font-bold">
                      Address
                    </h4>

                    <p className="font-inter text-xs text-[#3c2f31]/85 mt-1">
                      Ranipur, NH 27, Darbhanga, Bihar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-[#b76e79]">✈️</span>

                  <div>
                    <h4 className="font-cinzel text-[10px] uppercase tracking-wider text-[#8c5c63] font-bold">
                      Landmark
                    </h4>

                    <p className="font-inter text-xs text-[#3c2f31]/85 mt-1">
                      Near Darbhanga Airport
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-[#b76e79]">📅</span>

                  <div>
                    <h4 className="font-cinzel text-[10px] uppercase tracking-wider text-[#8c5c63] font-bold">
                      Date & Timing
                    </h4>

                    <p className="font-inter text-xs text-[#3c2f31]/85 mt-1">
                      25 June 2026
                      <br />
                      10:00 PM onwards
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-[#b76e79]/15" />

              {/* Quote */}
              <p className="font-dancing text-base sm:text-lg text-[#8c5c63] text-center italic font-semibold">
                “Join us as we celebrate a night of love,
                blessings, and forever memories.”
              </p>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-4
                    rounded-2xl
                    border
                    border-white/60
                    bg-white/40
                    backdrop-blur-sm
                    text-xs
                    font-cinzel
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#3c2f31]
                    hover:text-[#b76e79]
                    transition-all
                    duration-300
                  "
                >
                  Map View 🗺️
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-4
                    rounded-2xl
                    border
                    border-[#b76e79]/20
                    bg-gradient-to-r
                    from-[#fffdfc]
                    to-[#fff7fa]
                    text-xs
                    font-cinzel
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#b76e79]
                    hover:border-[#b76e79]/65
                    transition-all
                    duration-300
                  "
                >
                  Directions 🚗
                </a>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}