import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs"; // We'll use this to ensure the folder exists

const app = express();
const PORT = process.env.PORT || 3000;


const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {

    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }

    const extractedText = await extractTextFromPDF(req.file.path);

    res.status(200).json({
      message: "File uploaded and processed!",
      textSnippet: extractedText.substring(0, 200) + "...", // Just a preview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("StudyLM Backend is running! ");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
