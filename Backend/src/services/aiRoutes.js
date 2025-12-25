import { aiService } from './services/aiService.js';


app.post('/api/generate-dialogue', async (req, res) => {
    const { textContent } = req.body; 
    try {
        const script = await aiService.generateDialogue(textContent);
        res.json({ script });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate script" });
    }
});


app.post('/api/generate-summary', async (req, res) => {
    const { transcript } = req.body;
    try {
        const summary = await aiService.generateSummary(transcript);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate summary" });
    }
});