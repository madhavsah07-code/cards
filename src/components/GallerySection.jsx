import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const photos = [
  {
    src: '/images/gallery_1.png',
    title: 'Cherished Moments',
    span: 'sm:col-span-1 lg:col-span-1',
  },
  {
    src: '/images/gallery_2.png',
    title: 'A Beautiful Smile',
    span: 'sm:col-span-1 lg:col-span-1',
  },
  {
    src: '/images/gallery_3.png',
    title: 'Hand in Hand',
    span: 'sm:col-span-1 lg:col-span-1',
  },
  {
    src: '/images/gallery_4.png',
    title: 'A Lifetime Ahead',
    span: 'sm:col-span-1 lg:col-span-2',
  },
  {
    src: '/videos/gallery_video.mp4',
    title: 'Pre-Wedding Glimpses',
    span: 'sm:col-span-1 lg:col-span-1',
    isVideo: true,
  },
];

function Lightbox({ photo, onClose }) {
  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Background overlay blur */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[35px] backdrop-saturate-[160%]" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="relative max-w-4xl max-h-[85vh] mx-4 z-10 w-full md:w-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Double outline box */}
        <div 
          className="absolute -inset-1 rounded-2xl pointer-events-none" 
          style={{
            background: 'linear-gradient(135deg, #f6c7d7, #b76e79, #cfe8ff)',
            zIndex: -1
          }} 
        />

        <div className="bg-[#fffdfc] p-3 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(246,199,215,0.15)]">
          {photo.isVideo ? (
            <video
              src={photo.src}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain rounded-xl bg-black max-h-[75vh]"
            />
          ) : (
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-contain rounded-xl max-h-[75vh] mx-auto"
            />
          )}
          
          <div className="pt-4 text-center">
            <h4 className="font-cinzel text-lg md:text-xl text-[#b76e79] font-bold tracking-widest uppercase">
              {photo.title}
            </h4>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#fffdfc] hover:scale-110 active:scale-95 transition-transform shadow-[0_4px_12px_rgba(183,110,121,0.25)] border border-[#f8dce3]"
          style={{ background: 'linear-gradient(135deg, #e8c5c8 0%, #b76e79 100%)' }}
          onClick={onClose}
          data-hover
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [selected, setSelected] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="gallery" className="relative py-24 md:py-36 overflow-hidden bg-[#fffdfc]">
      {/* Background gradients and details */}
      <div className="absolute inset-0 paisley-bg opacity-35 z-0" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(246,199,215,0.15) 0%, transparent 60%)',
        }}
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
          <p className="section-subtitle text-3xl md:text-4xl mb-2 text-[#b76e79]">Glimpses of</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold-premium mb-4">
            Our Journey
          </h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-[#b76e79]">❋</span>
          </div>
          <p className="font-cormorant text-lg text-[#3c2f31]/60 mt-4 font-medium">
            Every picture tells a story of love
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[360px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-3xl cursor-pointer group ${photo.span} bg-[#fffdfc]/60 backdrop-blur-[25px] backdrop-saturate-[140%] p-3 pb-6 border border-white/75 shadow-[0_12px_32px_rgba(92,45,52,0.05),inset_0_1px_1px_rgba(255,255,255,0.85)] hover:shadow-[0_20px_48px_rgba(92,45,52,0.1)] transition-all duration-500`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
              onClick={() => setSelected(photo)}
              data-hover
            >
              {/* Polaroid Photo Frame container */}
              <div className="relative overflow-hidden rounded-2xl w-full h-[80%] aspect-[4/3] md:aspect-auto md:h-[240px]">
                {/* Inner border */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 z-20 pointer-events-none" />

                {photo.isVideo ? (
                  <video
                    src={photo.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover bg-black/5 transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.02]"
                  />
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover bg-black/5 transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.02]"
                  />
                )}
                
                {/* Dreamy glow overlay */}
                <div className="absolute inset-0 bg-[#fff6ef]/10 pointer-events-none mix-blend-color-burn" />
              </div>

              {/* Polaroid bottom caption */}
              <div className="text-center pt-4">
                <p className="font-cinzel text-xs text-[#b76e79] tracking-[0.2em] uppercase font-bold mb-1">
                  {photo.title}
                </p>
                <p className="font-dancing text-sm text-[#3c2f31]/50 tracking-wider">
                  View Glimpse
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Rendering */}
      <AnimatePresence>
        {selected && (
          <Lightbox
            photo={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
