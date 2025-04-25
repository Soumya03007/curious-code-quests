import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route to generate explanation and story
app.post("/api/explain", async (req, res) => {
  const { concept } = req.body;

  if (!concept) {
    return res.status(400).json({ error: "Concept is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model:"gemini-2.5-experimental" });

    const prompt = `
You are a friendly and creative AI tutor.
Your job is to:
1. Explain the concept of "${concept}" in simple, beginner-friendly language.
2. Create a short story or relatable analogy to help understand it better.

Respond with a JSON object like:
{
  "explanation": "...",
  "story": "..."
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to extract JSON object from AI response
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const jsonString = text.substring(start, end + 1);
    const parsed = JSON.parse(jsonString);

    res.json({
      term: concept,
      explanation: parsed.explanation,
      story: parsed.story,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate explanation from Gemini." });
  }
});

app.listen(port, () => {
  console.log(`✅ Gemini-powered backend running at http://localhost:${port}`);
});
