const BASE = import.meta.env.VITE_API_URL || '/api';
/**
 * Screens a candidate against a job via the backend.
 * The backend holds the Anthropic API key securely.
 */
export async function screenCandidate(candidate, job) {
  const res = await fetch(`${BASE}/screen`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidate, job }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Screening failed");
  return data; // { overallScore, aiAnalysis }
}
