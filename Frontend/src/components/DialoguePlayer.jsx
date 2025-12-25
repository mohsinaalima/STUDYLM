import { motion } from "framer-motion";
import { useDialogueSpeech } from "../hooks/useDialogueSpeech";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function DialoguePlayer({ scriptLines }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { speak } = useDialogueSpeech();

  const startDialogue = (index = 0) => {
    if (index >= scriptLines.length) return;

    setCurrentIndex(index);
    const { role, message } = scriptLines[index];
    const utterance = speak(message, role);

    utterance.onend = () => {
      startDialogue(index + 1); // Move to next line automatically
    };
  };

  return (
    <div className='space-y-6 mt-12 max-w-2xl mx-auto'>
      <div className='flex justify-between items-center border-b border-primary pb-4'>
        <h2 className='text-xl font-bold tracking-tighter uppercase italic'>
          Audio Mode
        </h2>
        <button
          onClick={() => startDialogue()}
          className='bg-primary text-primary-foreground px-4 py-2 rounded-full flex gap-2 items-center hover:scale-105 transition-transform'
        >
          <Play size={16} fill='currentColor' /> Play Discussion
        </button>
      </div>

      <div className='space-y-4'>
        {scriptLines.map((line, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: currentIndex === idx ? 1 : 0.4,
              scale: currentIndex === idx ? 1.02 : 1,
              x: line.role === "Teacher" ? -10 : 10,
            }}
            className={`p-4 border ${
              line.role === "Teacher"
                ? "border-l-4 border-black"
                : "border-slate-200 text-right"
            }`}
          >
            <span className='text-[10px] font-black uppercase tracking-widest block mb-1'>
              {line.role}
            </span>
            <p className='text-sm italic'>"{line.message}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
