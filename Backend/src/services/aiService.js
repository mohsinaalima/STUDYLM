import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



const getAIResponse = async (systemPrompt, userContent) => {
    const fullPrompt = `${systemPrompt}\n\nContent to analyze:\n${userContent}`;
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
};

export const aiService = {
    
    generateDialogue: async (context) => {
        const prompt = `
            Create a natural, engaging 2-minute dialogue between a 'Teacher' and a 'Student' based on the text provided. 
            The Teacher should explain complex concepts simply, and the Student should ask clarifying questions.
            Format the output strictly as:
            Teacher: [Text]
            Student: [Text]
        `;
        return await getAIResponse(prompt, context);
    },

    
    generateSummary: async (context) => {
        const prompt = `
            Provide a concise summary of this video transcript. 
            Include a section for 'Key Concepts' and a section for 'Top 3 Exam Tips' based on the content.
        `;
        return await getAIResponse(prompt, context);
    }
};