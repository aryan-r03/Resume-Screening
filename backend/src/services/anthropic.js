import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Calls Claude to screen a candidate against a job.
 * Returns a parsed JSON result with scoring and analysis.
 */
export async function screenCandidateWithAI(candidate, job) {
  const prompt = `You are an expert recruiter AI. Analyze this candidate against the job requirements and return ONLY valid JSON.

JOB: ${job.title}
Requirements: ${job.skills.join(", ")}
Description: ${job.description}

CANDIDATE: ${candidate.name}
Title: ${candidate.title}, Experience: ${candidate.experience}
Skills: ${candidate.skills.join(", ")}
Resume: ${candidate.resumeText}

Return JSON with these exact fields (no markdown, no backticks, just raw JSON):
{
  "overallScore": <integer 0-100>,
  "technicalScore": <integer 0-100>,
  "experienceScore": <integer 0-100>,
  "cultureScore": <integer 0-100>,
  "leadershipScore": <integer 0-100>,
  "strengths": "<2-3 sentence summary of candidate strengths>",
  "concerns": "<2-3 sentence summary of potential gaps or concerns>",
  "recommendation": "<clear recommendation: Strongly Recommend / Recommend / Consider / Pass, with 1-2 sentence justification>"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.content.map((b) => b.text || "").join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
