// /api/explain.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/explain
app.post("/api/explain", async (req, res) => {
  const { concept } = req.body;

  if (!concept) {
    return res.status(400).json({ error: "Concept is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-experimental" });

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

    // Extract JSON from AI response
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


export const handler = serverless(app);
