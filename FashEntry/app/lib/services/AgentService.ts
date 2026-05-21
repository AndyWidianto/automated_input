import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function ChatAI(prompt: string) {
    if (!prompt) return console.log("Kosong");
    const model = genAI.getGenerativeModel({ model: "gemma-3-4b-it" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("Berikut index: ", text);
    return text;
}

export async function getModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Data model ada di dalam properti 'models'
        return data.models || [];
    } catch (error) {
        console.error("Error fetching models:", error);
        return [];
    }
}