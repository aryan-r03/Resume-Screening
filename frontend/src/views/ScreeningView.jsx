import { useState } from "react";
import CandidateModal from "../components/CandidateModal";
import { scoreColor, barColor } from "../utils/scoring";
import { screenCandidate } from "../services/api";

const STATUS_FILTERS = ["all", "new", "screened", "shortlisted", "rejected"];

export default function ScreeningView({ jobs, candidates, setCandidates, setNotif }) {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewCandidate, setViewCandidate] = useState(null);
  const [screening, setScreening] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "", email: "", title: "", experience: "", skills: "", resumeText: "",
  });

  const jobCandidates = candidates
    .filter((c) => c.jobId === selectedJob?.id)
    .filter((c) => filterStatus === "all" || c.status === filterStatus)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  async function handleScreenCandidate(cid) {
    const c = candidates.find((x) => x.id === cid);
    const job = jobs.find((j) => j.id === c.jobId);
    if (!c || !job) return;

    setScreening((s) => ({ ...s, [cid]: true }));
    try {
      const result = await screenCandidate(c, job);
      setCandidates((prev) =>
        prev.map((x) =>
          x.id === cid
            ? { ...x, score: result.overallScore, status: "screened", aiAnalysis: result.aiAnalysis }
            : x
        )
      );
      setNotif({ type: "success", msg: `${c.name} screened — score: ${result.overallScore}%` });
    } catch (e) {
      setNotif({ type: "error", msg: "Screening failed: " + e.message });
    }
    setScreening((s) => ({ ...s, [cid]: false }));
  }

  async function screenAll() {
    const unscreened = jobCandidates.filter((c) => !c.aiAnalysis);
    for (const c of unscreened) await handleScreenCandidate(c.id);
  }

  function updateStatus(id, status) {
    setCandidates((p) => p.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  function addCandidate() {
    if (!addForm.name || !selectedJob) return;
    const newC = {
      id: Date.now(),
      jobId: selectedJob.id,
      name: addForm.name,
      email: addForm.email,
      title: addForm.title,
      experience: addForm.experience,
      skills: addForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
      resumeText: addForm.resumeText,
      status: "new",
      score: null,
      aiAnalysis: null,
    };
    setCandidates((p) => [...p, newC]);
    setAddForm({ name: "", email: "", title: "", experience: "", skills: "", resumeText: "" });
    setShowAdd(false);
    setNotif({ type: "success", msg: `${newC.name} added to pipeline` });
  }

  const unscreenedCount = jobCandidates.filter((c) => !c.aiAnalysis).length;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 32 }}>
        <div>
          <div className="page-title">AI Screening Engine</div>
          <div className="page-sub">Rank and evaluate candidates with machine learning</div>
        </div>
        <div className="flex-gap">
          {unscreenedCount > 0 && (
            <button className="btn btn-secondary" onClick={screenAll}>
              ⚡ Screen All ({unscreenedCount})
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Candidate</button>
        </div>
      </div>

      <div className="two-col">
        {/* Job Selector */}
        <div>
          <div className="card-title" style={{ marginBottom: 12 }}>Select Position</div>
          <div className="jobs-list">
            {jobs.map((j) => {
              const cnt = candidates.filter((c) => c.jobId === j.id).length;
              const scored = candidates.filter((c) => c.jobId === j.id && c.score).length;
              return (
                <div
                  key={j.id}
                  className={`job-card ${selectedJob?.id === j.id ? "selected" : ""}`}
                  onClick={() => setSelectedJob(j)}
                >
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{j.title}</div>
                  <div className="text-muted text-sm">{j.department} · {j.location}</div>
                  <div className="flex-gap mt8">
                    <span className="score-badge score-high">{cnt} candidates</span>
                    {scored > 0 && <span className="score-badge score-mid">{scored} screened</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate Table */}
        <div>
          <div className="filter-row">
            {STATUS_FILTERS.map((s) => (
              <button key={s} className={`filter-chip ${filterStatus === s ? "active" : ""}`} onClick={() => setFilterStatus(s)}>
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <div className="card">
            {jobCandidates.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <div className="empty-text">No candidates found</div>
                <div className="empty-sub">Add candidates or change the filter</div>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th><th>Candidate</th><th>Skills Match</th>
                      <th>Score</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobCandidates.map((c, i) => {
                      const matchCount = c.skills.filter((s) => selectedJob?.skills?.includes(s)).length;
                      const matchPct = selectedJob?.skills?.length
                        ? Math.round((matchCount / selectedJob.skills.length) * 100) : 0;
                      return (
                        <tr key={c.id}>
                          <td><span className={`rank rank-${i < 3 && c.score ? i + 1 : "n"}`}>#{i + 1}</span></td>
                          <td>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                            <div className="text-muted" style={{ fontSize: 11 }}>{c.title} · {c.experience}</div>
                          </td>
                          <td>
                            <div className="score-bar-wrap">
                              <div className="score-bar" style={{ width: 80 }}>
                                <div className="score-bar-fill" style={{ width: `${matchPct}%`, background: barColor(matchPct) }} />
                              </div>
                              <span className="text-sm text-muted">{matchPct}%</span>
                            </div>
                          </td>
                          <td>
                            {c.score
                              ? <span className={`score-badge ${scoreColor(c.score)}`}>{c.score}%</span>
                              : <span className="text-muted text-sm">—</span>}
                          </td>
                          <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                          <td>
                            <div className="flex-gap">
                              <button className="btn btn-ghost btn-sm" onClick={() => setViewCandidate(c)}>View</button>
                              {!c.aiAnalysis && (
                                <button className="btn btn-primary btn-sm" onClick={() => handleScreenCandidate(c.id)} disabled={screening[c.id]}>
                                  {screening[c.id] ? <span className="spinner" /> : "⚡ Screen"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewCandidate && (
        <CandidateModal
          candidate={candidates.find((c) => c.id === viewCandidate.id)}
          job={jobs.find((j) => j.id === viewCandidate.jobId)}
          onClose={() => setViewCandidate(null)}
          onStatusChange={updateStatus}
        />
      )}

      {showAdd && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Add Candidate</div>
              <button className="close-btn" onClick={() => setShowAdd(false)}>×</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" value={addForm.name} onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" value={addForm.email} onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))} placeholder="jane@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Current Title</label>
                <input className="form-input" value={addForm.title} onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))} placeholder="Software Engineer" />
              </div>
              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input className="form-input" value={addForm.experience} onChange={(e) => setAddForm((f) => ({ ...f, experience: e.target.value }))} placeholder="5 years" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Skills (comma-separated)</label>
              <input className="form-input" value={addForm.skills} onChange={(e) => setAddForm((f) => ({ ...f, skills: e.target.value }))} placeholder="Python, React, AWS, Docker" />
            </div>
            <div className="form-group">
              <label className="form-label">Resume / Profile Summary *</label>
              <textarea className="form-textarea" value={addForm.resumeText} onChange={(e) => setAddForm((f) => ({ ...f, resumeText: e.target.value }))} placeholder="Paste candidate's resume text or LinkedIn summary here..." style={{ minHeight: 160 }} />
            </div>
            <div className="flex-gap" style={{ justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addCandidate}>Add to Pipeline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
