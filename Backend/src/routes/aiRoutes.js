import express from "express";
import multer from "multer";
import fs from "fs"; // Required for file cleanup
import path from "path";
import { fileURLToPath } from "url";
import { extractTextFromPDF } from "../services/pdfService.js";
import { getTranscript } from "../services/youtubeService.js";
import { aiService } from "../services/aiService.js";

const router = express.Router();

// --- SETUP UPLOADS DIRECTORY ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../../uploads");

// Automatically create the 'uploads' folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

/* =======================
   PDF ROUTE
======================= */
router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const text = await extractTextFromPDF(req.file.path);

    // ✅ CHANGE: Delete the file after processing to save disk space
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Ensure we are sending the exact key 'textContent' that IngestionZone needs
    res.json({ textContent: text });
  } catch (error) {
    console.error("PDF Upload Error:", error);

    // Clean up file even if extraction fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: "PDF processing failed: " + error.message });
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
    res
      .status(500)
      .json({
        error: "Video processing failed. Ensure the video has captions.",
      });
  }
});

/* =======================
   AI DIALOGUE ROUTE
======================= */
router.post("/generate-dialogue", async (req, res) => {
  try {
    const { textContent } = req.body;

    if (!textContent || textContent.trim().length < 10) {
      return res.status(400).json({
        error: "Text content is empty or too short for AI analysis",
      });
    }

    const script = await aiService.generateDialogue(textContent);

    if (!script) {
      return res.status(500).json({
        error: "AI failed to generate a response",
      });
    }

    res.json({ script });
  } catch (error) {
    console.error("Generate Dialogue Error:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
});

export default router;
