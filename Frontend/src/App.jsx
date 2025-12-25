import { useState } from "react";
import IngestionZone from "./components/IngestionZone";
import DialoguePlayer from "./components/DialoguePlayer";

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [studyData, setStudyData] = useState(null);

  // 🏃‍♂️ This function handles the "Relay"
  const processToDialogue = async (text) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/generate-dialogue",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ textContent: text }),
        }
      );
      const data = await response.json();

      // Parse the "Teacher: [Text]" format into objects
      const script = data.script
        .split("\n")
        .filter((l) => l.includes(":"))
        .map((l) => ({
          role: l.split(":")[0].trim(),
          message: l.split(":")[1].trim(),
        }));

      setStudyData(script);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <IngestionZone onDataLoaded={(text) => processToDialogue(text)} />

      {isProcessing && (
        <div className='animate-pulse text-center mt-8'>
          Neural Engine Thinking...
        </div>
      )}

      {studyData && <DialoguePlayer scriptLines={studyData} />}
    </div>
  );
}
export default App;
