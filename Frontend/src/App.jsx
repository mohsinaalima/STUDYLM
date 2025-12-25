import { useState } from "react";
import IngestionZone from "./components/IngestionZone";

function App() {
  const [extractedText, setExtractedText] = useState("");

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <header className='max-w-4xl mx-auto text-center mb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900'>
          StudyLM 🎓
        </h1>
        <p className='text-slate-500 mt-2 text-lg'>
          Your AI-powered study companion for Economics.
        </p>
      </header>

      <main>
        <IngestionZone onDataLoaded={(text) => setExtractedText(text)} />

        {extractedText && (
          <div className='max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm'>
            <h3 className='font-semibold text-slate-700 mb-2'>
              Content Preview:
            </h3>
            <p className='text-slate-500 text-sm line-clamp-3'>
              {extractedText}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
