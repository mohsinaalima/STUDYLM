import { useState, useEffect } from 'react';

export const useDialogueSpeech = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Chrome and Safari load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = (text, role) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Simple logic to change the "character"
    if (role === 'Teacher') {
      utterance.pitch = 0.9; // Deeper, more authoritative
      utterance.rate = 0.9;  // Slightly slower
    } else {
      utterance.pitch = 1.2; // Higher, more youthful
      utterance.rate = 1.1;  // Slightly faster
    }

    window.speechSynthesis.speak(utterance);
    return utterance;
  };

  return { speak, voices };
};