import { motion } from "framer-motion";
import { Lightbulb, Target, BookOpen } from "lucide-react";

export default function SummaryDashboard({ summaryData }) {
  // Assuming summaryData has { overview, keyConcepts: [], examTips: [] }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-4xl mx-auto my-12 space-y-8'
    >
      {/* 1. Executive Overview */}
      <section className='bg-black text-white p-8 border-2 border-black'>
        <div className='flex items-center gap-2 mb-4'>
          <BookOpen size={20} />
          <h2 className='text-xs font-black uppercase tracking-[0.2em]'>
            Neural Overview
          </h2>
        </div>
        <p className='text-lg leading-relaxed italic'>
          "{summaryData.overview}"
        </p>
      </section>

      <div className='grid md:grid-cols-2 gap-8'>
        {/* 2. Key Concepts */}
        <div className='border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
          <h3 className='flex items-center gap-2 font-black uppercase text-sm mb-4'>
            <Lightbulb size={18} /> Key Concepts
          </h3>
          <ul className='space-y-3'>
            {summaryData.keyConcepts.map((concept, i) => (
              <li
                key={i}
                className='text-sm border-b border-gray-100 pb-2 last:border-0'
              >
                {concept}
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Exam Tips */}
        <div className='border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
          <h3 className='flex items-center gap-2 font-black uppercase text-sm mb-4'>
            <Target size={18} /> Exam Strategy
          </h3>
          <ul className='space-y-3'>
            {summaryData.examTips.map((tip, i) => (
              <li
                key={i}
                className='text-sm font-bold border-l-4 border-black pl-3'
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
