// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// === API endpoint ===
app.post("/api/explain", async (req, res) => {
  const { concept } = req.body;
  if (!concept) return res.status(400).json({ error: "Concept is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-experimental" });

    const prompt = `
You are a friendly AI tutor.
Explain "${concept}" in beginner-friendly language
and create a short story/analogy.

Respond as JSON: { "explanation": "...", "story": "..." }
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON block from response
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const parsed = JSON.parse(text.substring(start, end + 1));

    res.json({
      term: concept,
      explanation: parsed.explanation,
      story: parsed.story,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate explanation." });
  }
});

// === Serve Vite build ===
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// === Start server ===
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
