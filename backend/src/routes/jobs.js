import { Router } from "express";

const router = Router();

/**
 * Placeholder routes for job postings.
 * Wire to your database for persistence.
 */

// GET /api/jobs
router.get("/", (_req, res) => {
  res.json({ message: "Wire to your database — job state is currently managed client-side." });
});

// POST /api/jobs
router.post("/", (req, res) => {
  const { title, department, location, type, experience, skills, description } = req.body;
  if (!title || !skills?.length) {
    return res.status(400).json({ error: "title and skills are required" });
  }
  // TODO: persist to DB
  res.status(201).json({ message: "Job created (DB not yet wired)" });
});

export default router;
