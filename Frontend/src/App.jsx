import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IngestionZone from "./components/IngestionZone";

function App() {
  const [extractedText, setExtractedText] = useState("");

  return (
    // The "dark" class here enables the Black theme. Remove it for the White theme.
    <div className='dark min-h-screen bg-background text-foreground font-sans transition-colors duration-500'>
      {/* 1. Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-4xl mx-auto text-center py-16'
      >
        <h1 className='text-6xl font-black tracking-tighter uppercase italic'>
          Study<span className='text-outline'>LM</span> 🎓
        </h1>
        <p className='text-muted-foreground mt-4 tracking-widest uppercase text-xs'>
          Economics Neural Processing Engine
        </p>
      </motion.header>

      {/* 2. Main Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='container mx-auto px-4 pb-20'
      >
        <IngestionZone onDataLoaded={(text) => setExtractedText(text)} />

        {/* 3. Animated Result Preview */}
        <AnimatePresence>
          {extractedText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='max-w-2xl mx-auto mt-12 border-l-4 border-primary p-6 bg-card'
            >
              <h3 className='text-xs font-bold uppercase tracking-widest mb-4'>
                Neural Extraction Successful:
              </h3>
              <p className='text-sm leading-relaxed opacity-70'>
                {extractedText.substring(0, 300)}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Subtle Background Animation */}
      <div className='fixed inset-0 -z-10 opacity-20 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#333_1px,transparent_1px)] bg-[size:40px_40px]'></div>
      </div>
    </div>
  );
}

export default App;
