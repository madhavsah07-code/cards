/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Helper to initialize the audio singleton
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/xxx.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.8;
      audioRef.current.preload = 'auto';
    }
    return audioRef.current;
  }, []);

  const play = useCallback(async () => {
    const audio = initAudio();
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Audio playback failed or was blocked by browser autoplay policy:', error);
      setIsPlaying(false);
      throw error;
    }
  }, [initAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (audioRef.current && !audioRef.current.paused) {
      pause();
    } else {
      await play();
    }
  }, [play, pause]);

  useEffect(() => {
    let interactionDone = false;

    const handleFirstInteraction = async (event) => {
      if (interactionDone) return;
      console.log(`First interaction event detected: ${event.type}. Initializing and starting background music.`);
      interactionDone = true;
      
      removeListeners();
      
      try {
        await play();
      } catch (err) {
        console.warn('Autoplay blocked on first interaction. Awaiting direct user button action:', err);
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstInteraction, { capture: true });
      window.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
      window.removeEventListener('pointerdown', handleFirstInteraction, { capture: true });
      window.removeEventListener('keydown', handleFirstInteraction, { capture: true });
    };

    // Use capture phase to catch interaction as early as possible
    window.addEventListener('click', handleFirstInteraction, { once: true, capture: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, capture: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true, capture: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, capture: true });

    return () => {
      removeListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [play]);

  return (
    <AudioContext.Provider value={{ isPlaying, play, pause, toggle, audioRef }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
