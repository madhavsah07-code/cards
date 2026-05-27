import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import BrideGroomSection from './components/BrideGroomSection';
import EventTimeline from './components/EventTimeline';
import GallerySection from './components/GallerySection';
import FamilySection from './components/FamilySection';
import RSVPSection from './components/RSVPSection';
import VenueSection from './components/VenueSection';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import MusicToggle from './components/MusicToggle';
import { AudioProvider, useAudio } from './context/AudioContext';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [showOpening, setShowOpening] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const { play } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowOpening(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = () => {
    // Attempt play on direct button click interaction
    play().catch((err) => console.log('Audio playback rejected on open button:', err));
    setShowOpening(false);
    setTimeout(() => setShowMain(true), 600);
  };

  return (
    <div className="relative min-h-screen bg-[#fffdfc] overflow-x-hidden">
      <Cursor />
      <FloatingPetals />

      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {showOpening && !loading && (
          <OpeningScreen key="opening" onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMain && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Navbar />
            <HeroSection />
            <BrideGroomSection />
            <EventTimeline />
            <GallerySection />
            <FamilySection />
            <RSVPSection />
            <VenueSection />
            <Footer />
            <MusicToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;

