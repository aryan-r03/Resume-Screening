# TalentIQ — AI Resume Screening Portal


## Project Structure

```
resume-screening-portal/
├── frontend/                        # React + Vite SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                 # Entry point
│       ├── App.jsx                  # Root component + routing
│       ├── styles/
│       │   └── globals.css          # All global styles
│       ├── data/
│       │   └── sampleData.js        # Sample jobs & candidates
│       ├── services/
│       │   └── api.js               # HTTP calls to backend
│       ├── utils/
│       │   └── scoring.js           # scoreColor, barColor helpers
│       ├── components/
│       │   ├── Notification.jsx     # Toast notification
│       │   ├── ScoreBar.jsx         # Score progress bar
│       │   └── CandidateModal.jsx   # Candidate detail modal
│       └── views/
│           ├── DashboardView.jsx    # Stats & top candidates
│           ├── JobsView.jsx         # Job postings management
│           ├── ScreeningView.jsx    # AI screening engine
│           └── ArchView.jsx         # Architecture diagram
│
└── backend/                         # Node.js + Express API
    ├── package.json
    ├── .env.example
    └── src/
        ├── index.js                 # Server entry point
        ├── services/
        │   └── anthropic.js         # Claude API integration
        └── routes/
            ├── screening.js         # POST /api/screen
            ├── candidates.js        # CRUD /api/candidates
            └── jobs.js              # CRUD /api/jobs
```

## Key Changes from Monolith

| Before | After |
|--------|-------|
| Anthropic API key exposed in browser | API key secured server-side in `.env` |
| Direct `fetch` to `api.anthropic.com` from frontend | Frontend calls `/api/screen` on backend |
| All logic in one 1300-line file | Separated into 14 focused files |
| No separation of concerns | Clear `views/`, `components/`, `services/`, `utils/` |

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env          # Add your ANTHROPIC_API_KEY
npm install
npm run dev                   # Runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev                   # Runs on http://localhost:5173
```

Vite's proxy config forwards `/api/*` requests to `localhost:3001` automatically.
