// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const storyItems = [
//   {
//     year: '2019',
//     title: 'First Meeting',
//     desc: 'Two souls crossed paths at a mutual friend\'s celebration in Mumbai. A glance, a smile — and the universe conspired.',
//     emoji: '💫',
//     side: 'left',
//   },
//   {
//     year: '2020',
//     title: 'Friendship Blooms',
//     desc: 'Late night conversations, shared dreams, and endless laughter turned strangers into confidants.',
//     emoji: '🌸',
//     side: 'right',
//   },
//   {
//     year: '2022',
//     title: 'A Trip to Remember',
//     desc: 'Under the golden skies of Rajasthan, Ujjwal realized — she was the one. Every monument whispered their love story.',
//     emoji: '🏰',
//     side: 'left',
//   },
//   {
//     year: '2023',
//     title: 'He Asked, She Said Yes',
//     desc: 'On a rooftop adorned with marigolds and fairy lights, under a thousand stars, he asked. She said yes.',
//     emoji: '💍',
//     side: 'right',
//   },
//   {
//     year: '2026',
//     title: 'Forever Begins',
//     desc: 'Now, surrounded by family and love, they take the sacred saat pheras and write their forever.',
//     emoji: '🪔',
//     side: 'left',
//   },
// ];

// function StoryCard({ item, index }) {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
//   const isLeft = item.side === 'left';

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 60 }}
//       className={`relative flex items-center gap-6 md:gap-12 ${isLeft ? 'flex-row md:flex-row' : 'flex-row md:flex-row-reverse'} mb-16`}
//     >
//       {/* Card */}
//       <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
//         <motion.div
//           className="glass-strong rounded-2xl p-6 md:p-8 gold-border-glow relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]"
//           whileHover={{ y: -4 }}
//         >
//           {/* Year badge */}
//           <div className="inline-flex items-center gap-2 mb-4">
//             <span className="font-cinzel text-xs tracking-[0.3em] text-amber-500/60 uppercase">{item.year}</span>
//           </div>
          
//           {/* Emoji */}
//           <div className="text-4xl mb-3">{item.emoji}</div>
          
//           <h3 className="font-playfair text-2xl font-bold text-amber-200 mb-3">{item.title}</h3>
//           <p className="font-cormorant text-lg text-amber-100/60 leading-relaxed">{item.desc}</p>

//           {/* Gradient overlay */}
//           <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//             style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.03) 0%, transparent 50%, rgba(234,88,12,0.03) 100%)' }}
//           />
//         </motion.div>
//       </div>

//       {/* Center dot */}
//       <div className="hidden md:flex flex-col items-center flex-shrink-0">
//         <motion.div
//           className="w-5 h-5 rounded-full relative z-10"
//           style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 0 20px rgba(245,158,11,0.6)' }}
//           animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 20px rgba(245,158,11,0.4)', '0 0 40px rgba(245,158,11,0.8)', '0 0 20px rgba(245,158,11,0.4)'] }}
//           transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
//         />
//       </div>

//       {/* Mobile dot */}
//       <div className="md:hidden flex-shrink-0 w-5 h-5 rounded-full relative z-10"
//         style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 0 20px rgba(245,158,11,0.6)' }}
//       />

//       {/* Spacer */}
//       <div className="flex-1 hidden md:block" />
//     </motion.div>
//   );
// }

// export default function StorySection() {
//   const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.5 });

//   return (
//     <section id="story" className="relative py-24 md:py-36 overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: 'url(/images/story_bg.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'blur(2px)',
//           }}
//         />
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #080205 0%, rgba(8,2,5,0.85) 20%, rgba(8,2,5,0.85) 80%, #080205 100%)' }} />
//         {/* Paisley pattern */}
//         <div className="absolute inset-0 paisley-bg opacity-60" />
//       </div>

//       <div className="relative z-10 max-w-5xl mx-auto px-6">
//         {/* Section header */}
//         <motion.div
//           ref={titleRef}
//           initial={{ opacity: 0, y: 40 }}
//           animate={titleInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <p className="section-subtitle text-3xl md:text-4xl mb-2">Our</p>
//           <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">Love Story</h2>
//           <div className="ornament-line mx-auto max-w-xs">
//             <span className="text-amber-500">❋</span>
//           </div>
//           <p className="font-cormorant text-lg text-amber-200/50 mt-4 max-w-lg mx-auto">
//             Every love story is beautiful, but ours is our favourite...
//           </p>
//         </motion.div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Center line */}
//           <div
//             className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
//             style={{
//               background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.3) 10%, rgba(245,158,11,0.3) 90%, transparent)',
//               transform: 'translateX(-50%)',
//             }}
//           />

//           {storyItems.map((item, i) => (
//             <StoryCard key={i} item={item} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
