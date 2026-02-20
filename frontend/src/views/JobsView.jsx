import { useState } from "react";

export default function JobsView({ jobs, onAddJob }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", department: "", location: "", type: "Full-time",
    experience: "", skills: "", description: "",
  });

  const up = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit() {
    if (!form.title || !form.skills) return;
    onAddJob({
      ...form,
      id: Date.now(),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      candidates: 0,
    });
    setShowForm(false);
    setForm({ title: "", department: "", location: "", type: "Full-time", experience: "", skills: "", description: "" });
  }

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 32 }}>
        <div>
          <div className="page-title">Job Postings</div>
          <div className="page-sub">Manage open positions and requirements</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New Position</button>
      </div>

      <div className="three-col">
        {jobs.map((j) => (
          <div key={j.id} className="job-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span className="status-badge status-screened">{j.type}</span>
              <span className="text-muted text-sm">{j.experience}</span>
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{j.title}</div>
            <div className="text-muted text-sm" style={{ marginBottom: 12 }}>{j.department} · {j.location}</div>
            <p style={{ fontSize: 12, color: "#7a8aaa", lineHeight: 1.6, marginBottom: 14 }}>
              {j.description?.slice(0, 100)}...
            </p>
            <div className="flex wrap">
              {j.skills.slice(0, 5).map((s) => <span key={s} className="skill-tag">{s}</span>)}
              {j.skills.length > 5 && <span className="skill-tag">+{j.skills.length - 5}</span>}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Create Job Posting</div>
              <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input className="form-input" value={form.title} onChange={up("title")} placeholder="e.g. Senior React Developer" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-input" value={form.department} onChange={up("department")} placeholder="Engineering" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" value={form.location} onChange={up("location")} placeholder="Remote / City" />
              </div>
              <div className="form-group">
                <label className="form-label">Experience Required</label>
                <input className="form-input" value={form.experience} onChange={up("experience")} placeholder="3+ years" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Required Skills * (comma-separated)</label>
              <input className="form-input" value={form.skills} onChange={up("skills")} placeholder="React, TypeScript, Node.js, AWS" />
            </div>
            <div className="form-group">
              <label className="form-label">Job Description</label>
              <textarea className="form-textarea" value={form.description} onChange={up("description")} placeholder="Describe the role, responsibilities, and ideal candidate..." />
            </div>
            <div className="flex-gap" style={{ justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submit}>Create Position</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
