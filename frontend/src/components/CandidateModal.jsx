import ScoreBar from "./ScoreBar";
import { scoreColor } from "../utils/scoring";

export default function CandidateModal({ candidate, job, onClose, onStatusChange }) {
  if (!candidate) return null;
  const a = candidate.aiAnalysis;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="modal-title">{candidate.name}</div>
            <div className="text-muted text-sm mt8">{candidate.title} · {candidate.experience}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="section-row">
          <div>
            <div className="form-label">Email</div>
            <div className="text-sm">{candidate.email}</div>
          </div>
          <div>
            <div className="form-label">Applied For</div>
            <div className="text-sm">{job?.title}</div>
          </div>
        </div>

        <div className="form-label">Skills</div>
        <div className="mb16">
          {candidate.skills.map((s) => (
            <span key={s} className={`skill-tag ${job?.skills?.includes(s) ? "match" : ""}`}>{s}</span>
          ))}
        </div>

        <div className="form-label">Resume Summary</div>
        <div className="text-sm" style={{ color: "#b0c0d8", lineHeight: 1.7, marginBottom: 16 }}>
          {candidate.resumeText}
        </div>

        {a ? (
          <>
            <div className="ai-section">
              <div className="ai-label">✦ AI Analysis</div>
              <div className="flex-between mb16">
                <span className="text-sm text-muted">Overall Match Score</span>
                <span className={`score-badge ${scoreColor(candidate.score)}`} style={{ fontSize: 16 }}>
                  {candidate.score}%
                </span>
              </div>
              <div className="criteria-row">
                <ScoreBar label="Technical Skills Match" value={a.technicalScore} />
                <ScoreBar label="Experience Alignment" value={a.experienceScore} />
                <ScoreBar label="Culture & Communication" value={a.cultureScore} />
                <ScoreBar label="Leadership & Impact" value={a.leadershipScore} />
              </div>
            </div>
            <div className="ai-section" style={{ marginTop: 12 }}>
              <div className="ai-label">✦ Strengths</div>
              <div className="ai-text">{a.strengths}</div>
            </div>
            <div className="ai-section" style={{ marginTop: 12 }}>
              <div className="ai-label">✦ Concerns</div>
              <div className="ai-text">{a.concerns}</div>
            </div>
            <div className="ai-section" style={{ marginTop: 12 }}>
              <div className="ai-label">✦ Recommendation</div>
              <div className="ai-text">{a.recommendation}</div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <div className="empty-text">No AI analysis yet</div>
            <div className="empty-sub">Screen this candidate from the dashboard</div>
          </div>
        )}

        <hr className="divider" />
        <div className="flex-between">
          <div className="flex-gap">
            <span className="form-label" style={{ margin: 0 }}>Status:</span>
            <select
              className="form-select"
              style={{ width: "auto", padding: "6px 12px", fontSize: 12 }}
              value={candidate.status}
              onChange={(e) => onStatusChange(candidate.id, e.target.value)}
            >
              <option value="new">New</option>
              <option value="screened">Screened</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
