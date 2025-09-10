// /api/explain.js
import express from "express";
import serverless from "serverless-http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/explain", async (req, res) => {
  const { concept } = req.body;

  if (!concept) {
    return res.status(400).json({ error: "Concept is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a friendly AI tutor.
Explain the concept of "${concept}" in simple language and give a short story.
Respond ONLY as JSON:
{
  "explanation": "...",
  "story": "..."
}
`;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();

    console.log("Raw Gemini response:", text);

    let parsed;
    try {
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start === -1 || end === -1) {
        throw new Error("No JSON found in Gemini response");
      }
      parsed = JSON.parse(text.substring(start, end + 1));
    } catch (err) {
      console.error("Failed to parse Gemini response:", text, err);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    res.json({
      term: concept,
      explanation: parsed.explanation,
      story: parsed.story,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Gemini API failed" });
  }
});

export const handler = serverless(app);
