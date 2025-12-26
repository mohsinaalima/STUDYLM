import express from "express";
import multer from "multer";
import { extractTextFromPDF } from "../services/pdfService.js";
import { getTranscript } from "../services/youtubeService.js";
import { aiService } from "../services/aiService.js";

const router = express.Router();



import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ dest: path.join(__dirname, "../../uploads") });


router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const text = await extractTextFromPDF(req.file.path);
    res.json({ textContent: text });
  } catch (error) {
    console.error("PDF Upload Error:", error);
    res.status(500).json({ error: "PDF processing failed" });
  }
});

/* =======================
   YOUTUBE ROUTE
======================= */
router.post("/process-video", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "YouTube URL missing" });
    }

    const text = await getTranscript(url);
    res.json({ textContent: text });
  } catch (error) {
    console.error("YouTube Error:", error);
    res.status(500).json({ error: "Video processing failed" });
  }
});

/* =======================
   AI DIALOGUE ROUTE
======================= */
router.post("/generate-dialogue", async (req, res) => {
  try {
    const { textContent } = req.body;

    if (!textContent || textContent.length < 10) {
      return res.status(400).json({
        error: "Text content is empty or too short",
      });
    }

    const script = await aiService.generateDialogue(textContent);

    if (!script) {
      return res.status(500).json({
        error: "AI returned empty response",
      });
    }

    res.json({ script });
  } catch (error) {
    console.error("Generate Dialogue Error:", error);
    res.status(500).json({
      error: "AI processing failed",
    });
  }
});

export default router;