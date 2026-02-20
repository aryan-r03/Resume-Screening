import { scoreColor } from "../utils/scoring";

export default function DashboardView({ jobs, candidates }) {
  const total = candidates.length;
  const screened = candidates.filter((c) => c.aiAnalysis).length;
  const shortlisted = candidates.filter((c) => c.status === "shortlisted").length;
  const avgScore = screened
    ? Math.round(candidates.filter((c) => c.score).reduce((a, c) => a + c.score, 0) / screened)
    : 0;

  const topCandidates = [...candidates]
    .filter((c) => c.score)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div>
      <div className="page-title glow-text">Intelligence Dashboard</div>
      <div className="page-sub">Real-time recruitment analytics & AI-powered insights</div>

      <div className="stats-row">
        {[
          { label: "Total Applicants", val: total, trend: "+12 this week", cls: "c1", icon: "👥" },
          { label: "AI Screened", val: screened, trend: `${total > 0 ? Math.round((screened / total) * 100) : 0}% completion`, cls: "c2", icon: "🤖" },
          { label: "Shortlisted", val: shortlisted, trend: "Ready for interview", cls: "c3", icon: "⭐" },
          { label: "Avg Match Score", val: avgScore ? `${avgScore}%` : "—", trend: "Across screened", cls: "c4", icon: "📊" },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.cls}`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div className="stat-num">{s.val}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend text-muted">{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="section-row">
        <div className="card">
          <div className="card-title">Active Job Openings</div>
          <div className="jobs-list">
            {jobs.map((j) => {
              const cnt = candidates.filter((c) => c.jobId === j.id).length;
              return (
                <div key={j.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex-between">
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14 }}>{j.title}</div>
                      <div className="text-muted text-sm mt8">{j.department} · {j.location}</div>
                    </div>
                    <div className="score-badge score-high">{cnt} apps</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Top Candidates</div>
          {topCandidates.length === 0 ? (
            <div className="empty-state" style={{ padding: "30px 0" }}>
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No screened candidates yet</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {topCandidates.map((c, i) => (
                <div key={c.id} className="flex-between" style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex-gap">
                    <span className={`rank rank-${i < 3 ? i + 1 : "n"}`}>#{i + 1}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{c.title}</div>
                    </div>
                  </div>
                  <span className={`score-badge ${scoreColor(c.score)}`}>{c.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
