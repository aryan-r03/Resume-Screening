import { Router } from "express";
import { screenCandidateWithAI } from "../services/anthropic.js";

const router = Router();

/**
 * POST /api/screen
 * Body: { candidate, job }
 * Returns AI analysis object
 */
router.post("/", async (req, res) => {
  const { candidate, job } = req.body;

  if (!candidate || !job) {
    return res.status(400).json({ error: "candidate and job are required" });
  }

  try {
    const result = await screenCandidateWithAI(candidate, job);
    res.json({
      overallScore: result.overallScore,
      aiAnalysis: {
        technicalScore: result.technicalScore,
        experienceScore: result.experienceScore,
        cultureScore: result.cultureScore,
        leadershipScore: result.leadershipScore,
        strengths: result.strengths,
        concerns: result.concerns,
        recommendation: result.recommendation,
      },
    });
  } catch (err) {
    console.error("Screening error:", err);
    res.status(500).json({ error: "AI screening failed: " + err.message });
  }
});

export default router;
