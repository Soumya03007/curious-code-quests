import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/explain", async (req, res) => {
  const { concept } = req.body;

  if (!concept) {
    return res.status(400).json({ error: "Concept is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });

    const prompt = `
    You are a friendly and creative AI tutor.
    Explain the concept of "${concept}" simply.
    Also, give a short story analogy.
    Respond strictly as JSON with fields "explanation" and "story".
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

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
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

//  Export as a serverless handler for Vercel
const handler = serverless(app);
export default handler;
