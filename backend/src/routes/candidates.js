import { Router } from "express";

const router = Router();

/**
 * These routes are placeholders for database integration.
 * Currently, candidate state is managed on the frontend.
 * Wire these up to PostgreSQL / your preferred DB when adding persistence.
 */

// GET /api/candidates
router.get("/", (_req, res) => {
  res.json({ message: "Wire to your database — candidate state is currently managed client-side." });
});

// POST /api/candidates
router.post("/", (req, res) => {
  const { name, email, title, experience, skills, resumeText, jobId } = req.body;
  if (!name || !jobId) {
    return res.status(400).json({ error: "name and jobId are required" });
  }
  // TODO: persist to DB
  res.status(201).json({ message: "Candidate created (DB not yet wired)" });
});

// PATCH /api/candidates/:id/status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "screened", "shortlisted", "rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  // TODO: update in DB
  res.json({ message: `Status updated to ${status} (DB not yet wired)` });
});

export default router;
