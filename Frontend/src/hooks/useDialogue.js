import { useState, useCallback } from 'react';

export const useDialogue = (script) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  const speakLine = useCallback((index) => {
    if (index >= script.length) {
      setCurrentLineIndex(-1);
      return;
    }

    setCurrentLineIndex(index);
    const { role, message } = script[index];
    const utterance = new SpeechSynthesisUtterance(message);

    // Senior Dev Trick: Adjusting pitch/rate to create "characters"
    if (role.toLowerCase().includes('teacher')) {
      utterance.pitch = 0.8; // Lower, authoritative
      utterance.rate = 0.9;  // Slightly slower for clarity
    } else {
      utterance.pitch = 1.3; // Higher, inquisitive
      utterance.rate = 1.1;  // Faster, energetic
    }

    utterance.onend = () => {
      if (!isPaused) speakLine(index + 1);
    };

    window.speechSynthesis.speak(utterance);
  }, [script, isPaused]);

  return { currentLineIndex, speakLine, setIsPaused };
};