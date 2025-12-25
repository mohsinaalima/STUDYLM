import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateStudyContent = async (prompt, contextText) => {
    try {
        const fullPrompt = `
            You are a helpful study assistant. 
            Use the following context to answer: 
            ---
            ${contextText}
            ---
            User Request: ${prompt}
        `;

        const result = await model.generateContent(fullPrompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("AI failed to generate response.");
    }
};