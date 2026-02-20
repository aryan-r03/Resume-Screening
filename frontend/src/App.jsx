import { useState } from "react";
import "./styles/globals.css";
import Notification from "./components/Notification";
import DashboardView from "./views/DashboardView";
import JobsView from "./views/JobsView";
import ScreeningView from "./views/ScreeningView";
import ArchView from "./views/ArchView";
import { SAMPLE_JOBS, SAMPLE_CANDIDATES } from "./data/sampleData";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "jobs", label: "Job Postings" },
  { id: "screening", label: "AI Screening" },
  { id: "arch", label: "Architecture" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [candidates, setCandidates] = useState(SAMPLE_CANDIDATES);
  const [notif, setNotif] = useState(null);

  return (
    <div className="portal-root">
      <nav className="nav">
        <div className="nav-logo">
          <div className="logo-icon">✦</div>
          TalentIQ
        </div>
        <div className="nav-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="nav-badge">AI POWERED</div>
      </nav>

      <main className="main">
        {tab === "dashboard" && <DashboardView jobs={jobs} candidates={candidates} />}
        {tab === "jobs" && <JobsView jobs={jobs} onAddJob={(j) => setJobs((p) => [...p, j])} />}
        {tab === "screening" && (
          <ScreeningView
            jobs={jobs}
            candidates={candidates}
            setCandidates={setCandidates}
            setNotif={setNotif}
          />
        )}
        {tab === "arch" && <ArchView />}
      </main>

      <Notification notif={notif} onClose={() => setNotif(null)} />
    </div>
  );
}
