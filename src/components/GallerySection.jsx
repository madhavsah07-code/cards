import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const photos = [
  { src: '/images/gallery_1.png', title: 'Sacred Mehndi', span: 'md:col-span-1 md:row-span-2' },
  { src: '/images/gallery_2.png', title: 'Sangeet Night', span: 'md:col-span-2 md:row-span-1' },
  { src: '/images/gallery_3.png', title: 'Sacred Pheras', span: 'md:col-span-1 md:row-span-1' },
  { src: '/images/gallery_4.png', title: 'Bridal Jewels', span: 'md:col-span-1 md:row-span-1' },
  { src: '/images/gallery_5.png', title: 'Flower Mandap', span: 'md:col-span-2 md:row-span-1' },
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
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="relative max-w-4xl max-h-[85vh] mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Gold border */}
        <div className="absolute -inset-0.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c, #f59e0b)', zIndex: -1 }} />
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full h-full object-contain rounded-2xl"
          style={{ maxHeight: '80vh' }}
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="font-playfair text-xl text-amber-200">{photo.title}</p>
        </div>
        {/* Close btn */}
        <button
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#0a0305] hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}
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
    <section id="gallery" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(120,53,15,0.08) 0%, transparent 60%)' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2">Glimpses of</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">Our Journey</h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-amber-500">❋</span>
          </div>
          <p className="font-cormorant text-lg text-amber-200/50 mt-4">
            Every picture tells a story of love
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`gallery-item gold-border-glow ${photo.span}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onClick={() => setSelected(photo)}
              data-hover
            >
              <img src={photo.src} alt={photo.title} />
              <div className="gallery-overlay">
                <div className="text-center">
                  <p className="font-playfair text-lg text-amber-100 font-semibold mb-1">{photo.title}</p>
                  <p className="font-inter text-xs text-amber-400/70 tracking-widest uppercase">Click to view</p>
                </div>
              </div>
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 30px rgba(245,158,11,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
