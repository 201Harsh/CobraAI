const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.CODEASTRA_AI_API_KEY });

async function main({ prompt , User }) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction:
        "You are CodeAstra AI. Your name is Harsh. You help users with coding.",
    },
  });
  return response.text;
}
module.exports = main;
