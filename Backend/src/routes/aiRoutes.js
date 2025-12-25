import express from "express";
import multer from "multer";
import { extractTextFromPDF } from "../services/pdfService.js";
import { getTranscript } from "../services/youtubeService.js";
import { aiService } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// PDF Ingestion
router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const text = await extractTextFromPDF(req.file.path);
    res.json({ textContent: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube Ingestion
router.post("/process-video", async (req, res) => {
  try {
    const text = await getTranscript(req.body.url);
    res.json({ textContent: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dialogue Generation
router.post("/generate-dialogue", async (req, res) => {
  const { textContent } = req.body;
  try {
    // 🧠 Here is the brain at work
    const script = await aiService.generateDialogue(textContent);
    res.json({ script });
  } catch (error) {
    res.status(500).json({ error: "Dialogue generation failed" });
  }
});

router.post("/generate-summary", async (req, res) => {
  const { textContent } = req.body;
  try {
    const summaryString = await aiService.generateSummary(textContent);
    
    // 💡 Pro Tip: We should ask Gemini to return JSON so the dashboard can read it
    // For now, let's assume it returns structured text we can parse
    res.json({ summary: summaryString });
  } catch (error) {
    res.status(500).json({ error: "Summary generation failed" });
  }
});



export default router;
