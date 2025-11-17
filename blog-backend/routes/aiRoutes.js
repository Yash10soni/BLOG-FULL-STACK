// routes/aiRoutes.js
import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      response: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Groq API Error" });
  }
});

export default router;
