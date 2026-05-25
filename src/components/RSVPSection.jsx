import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RSVPSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: '',
    ceremony: [],
    message: '',
  });

  const ceremonies = ['Matkor (23 June)', 'Sangeet (24 June)', 'Wedding (25 June)'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'ceremony') {
      setForm(prev => ({
        ...prev,
        ceremony: checked
          ? [...prev.ceremony, value]
          : prev.ceremony.filter(c => c !== value),
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_RSVP_API_URL;

    if (!apiUrl) {
      setError("Google Apps Script URL is missing. Please create a .env file and set VITE_RSVP_API_URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          guests: '1',
          attending: '',
          ceremony: [],
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit RSVP.');
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setError(err.message || 'Unable to submit RSVP. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(61,12,17,0.3) 0%, rgba(8,2,5,0.95) 70%)',
      }} />
      <div className="absolute inset-0 paisley-bg opacity-30" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle text-3xl md:text-4xl mb-2">Join us on our</p>
          <h2 className="section-title text-4xl md:text-6xl font-bold shimmer-gold mb-4">Special Day</h2>
          <div className="ornament-line mx-auto max-w-xs">
            <span className="text-amber-500">❋</span>
          </div>
          <p className="font-cormorant text-lg text-amber-200/50 mt-4">
Please RSVP at your earliest convenience.          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(10,3,5,0.8)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(245,158,11,0.2)',
            boxShadow: '0 0 60px rgba(245,158,11,0.1), 0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b)' }} />

          <div className="p-8 md:p-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your beautiful name..."
                    required
                    className="rsvp-input"
                    id="rsvp-name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="rsvp-input"
                    id="rsvp-email"
                  />
                </div>

                {/* Guests + attending row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-2">
                      Guests
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="rsvp-input"
                      id="rsvp-guests"
                    >
                      {[1,2,3,4,5,'6+'].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-2">
                      Attending?
                    </label>
                    <select
                      name="attending"
                      value={form.attending}
                      onChange={handleChange}
                      required
                      className="rsvp-input"
                      id="rsvp-attending"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes, with joy! 🎉</option>
                      <option value="no">Sadly, no</option>
                      <option value="maybe">Might attend</option>
                    </select>
                  </div>
                </div>

                {/* Ceremonies */}
                <div>
                  <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-3">
                    Ceremonies Attending
                  </label>
                  <div className="space-y-2">
                    {ceremonies.map(c => (
                      <label key={c} className="flex items-center gap-3 cursor-pointer group" data-hover>
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="ceremony"
                            value={c}
                            checked={form.ceremony.includes(c)}
                            onChange={handleChange}
                            className="sr-only"
                            id={`ceremony-${c}`}
                          />
                          <div
                            className={`w-5 h-5 rounded border transition-all duration-300 flex items-center justify-center ${
                              form.ceremony.includes(c)
                                ? 'border-amber-500 bg-amber-500/20'
                                : 'border-amber-500/30 bg-transparent'
                            }`}
                          >
                            {form.ceremony.includes(c) && (
                              <span className="text-amber-400 text-xs">✓</span>
                            )}
                          </div>
                        </div>
                        <span className="font-cormorant text-lg text-amber-100/70 group-hover:text-amber-100 transition-colors">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-cinzel text-xs tracking-widest uppercase text-amber-400/60 mb-2">
                    Message for the Couple
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Share your blessings and wishes..."
                    rows={4}
                    className="rsvp-input resize-none"
                    id="rsvp-message"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-cormorant text-center"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  id="rsvp-submit"
                  data-hover
                  disabled={loading}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-cinzel text-sm tracking-[0.3em] uppercase font-bold relative overflow-hidden transition-all duration-300"
                  style={{
                    background: loading
                      ? 'rgba(245,158,11,0.3)'
                      : 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: '#0a0305',
                    boxShadow: loading ? 'none' : '0 0 30px rgba(245,158,11,0.4)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ✦
                      </motion.span>
                      Sending with love...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Send RSVP</span>
                      <span>🪔</span>
                    </span>
                  )}
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </form>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-center py-10"
              >
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  🪔
                </motion.div>
                <h3 className="font-cinzel text-3xl font-bold shimmer-gold mb-4">
                  Thank You!
                </h3>
                <p className="font-cormorant text-xl text-amber-200/70 mb-2">
                  Your presence means the world to us.
                </p>
                <p className="font-dancing text-2xl text-amber-400/60 mt-4">
                  See you on the 25th! 🌺
                </p>
                <div className="flex justify-center gap-3 mt-6 text-2xl">
                  {['🌸', '🌺', '🌼', '🌸', '🌺'].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom gradient bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #ea580c, #f59e0b, #ea580c)' }} />
        </motion.div>
      </div>
    </section>
  );
}
