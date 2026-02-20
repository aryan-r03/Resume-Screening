export default function ArchView() {
  return (
    <div>
      <div className="page-title">Architecture Diagram</div>
      <div className="page-sub">Cloud-native, scalable, secure infrastructure design</div>

      <div className="arch-wrap">
        <svg viewBox="0 0 900 620" style={{ width: "100%", fontFamily: "'DM Mono', monospace" }}>
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00c9a7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5a41d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd166" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e8b84b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d63250" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow-f">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(0,245,212,0.5)" />
            </marker>
            <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(123,97,255,0.5)" />
            </marker>
          </defs>

          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="900" height="620" fill="url(#grid)" />

          {/* CLIENT LAYER */}
          <text x="20" y="35" fill="#5a6a80" fontSize="10" letterSpacing="2">CLIENT LAYER</text>
          <rect x="20" y="45" width="860" height="80" rx="10" fill="none" stroke="rgba(0,245,212,0.1)" strokeDasharray="5,4" />
          {[
            { x: 40, label: "Web App", sub: "React SPA", icon: "🌐" },
            { x: 200, label: "Mobile", sub: "React Native", icon: "📱" },
            { x: 360, label: "CLI Tool", sub: "Node.js", icon: "⌨️" },
            { x: 520, label: "Recruiter Portal", sub: "Next.js", icon: "🖥️" },
          ].map((item) => (
            <g key={item.x}>
              <rect x={item.x} y={55} width={120} height={58} rx="8" fill="rgba(0,245,212,0.07)" stroke="rgba(0,245,212,0.2)" strokeWidth="1" />
              <text x={item.x + 18} y={75} fontSize="14">{item.icon}</text>
              <text x={item.x + 38} y={76} fill="#e0eaff" fontSize="11" fontWeight="600">{item.label}</text>
              <text x={item.x + 38} y={90} fill="#5a6a80" fontSize="9">{item.sub}</text>
            </g>
          ))}

          {/* ARROWS to API GW */}
          {[100, 260, 420, 580].map((x) => (
            <line key={x} x1={x} y1="123" x2={x} y2="158" stroke="rgba(0,245,212,0.3)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr)" />
          ))}

          {/* API GATEWAY & AUTH */}
          <text x="20" y="152" fill="#5a6a80" fontSize="10" letterSpacing="2">API GATEWAY & AUTH</text>
          <rect x="20" y="162" width="860" height="68" rx="10" fill="none" stroke="rgba(123,97,255,0.15)" strokeDasharray="5,4" />
          {[
            { x: 40, label: "API Gateway", sub: "Rate Limiting", icon: "🔀" },
            { x: 200, label: "Auth Service", sub: "JWT / OAuth2", icon: "🔐" },
            { x: 360, label: "Load Balancer", sub: "Auto-scaling", icon: "⚖️" },
            { x: 520, label: "CDN / Edge", sub: "CloudFront", icon: "🌍" },
            { x: 680, label: "WAF", sub: "DDoS Protection", icon: "🛡️" },
          ].map((item) => (
            <g key={item.x}>
              <rect x={item.x} y={170} width={130} height={50} rx="8" fill="rgba(123,97,255,0.08)" stroke="rgba(123,97,255,0.25)" strokeWidth="1" />
              <text x={item.x + 12} y={190} fontSize="12">{item.icon}</text>
              <text x={item.x + 30} y={190} fill="#e0eaff" fontSize="10" fontWeight="600">{item.label}</text>
              <text x={item.x + 30} y={203} fill="#5a6a80" fontSize="8">{item.sub}</text>
            </g>
          ))}

          {/* ARROWS to MICROSERVICES */}
          {[200, 380, 560, 700].map((x) => (
            <line key={x} x1={x} y1="230" x2={x} y2="268" stroke="rgba(123,97,255,0.3)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr2)" />
          ))}

          {/* MICROSERVICES LAYER */}
          <text x="20" y="262" fill="#5a6a80" fontSize="10" letterSpacing="2">MICROSERVICES LAYER</text>
          <rect x="20" y="272" width="860" height="90" rx="10" fill="none" stroke="rgba(255,209,102,0.1)" strokeDasharray="5,4" />
          {[
            { x: 30, label: "Resume Parser", sub: "NLP + OCR", icon: "📄", col: "g1" },
            { x: 185, label: "Job Matcher", sub: "ML Ranking", icon: "🎯", col: "g2" },
            { x: 340, label: "AI Screener", sub: "Claude API", icon: "🤖", col: "g1" },
            { x: 495, label: "Notification", sub: "Email / SMS", icon: "📬", col: "g3" },
            { x: 650, label: "Analytics", sub: "Real-time", icon: "📊", col: "g3" },
            { x: 785, label: "Report Gen", sub: "PDF / XLSX", icon: "📑", col: "g2" },
          ].map((item) => (
            <g key={item.x}>
              <rect x={item.x} y={282} width={140} height={68} rx="10" fill={`url(#${item.col})`} opacity="0.15" />
              <rect x={item.x} y={282} width={140} height={68} rx="10" fill="none" stroke={`url(#${item.col})`} strokeWidth="1.5" />
              <text x={item.x + 12} y={306} fontSize="16">{item.icon}</text>
              <text x={item.x + 36} y={306} fill="#e0eaff" fontSize="11" fontWeight="700">{item.label}</text>
              <text x={item.x + 36} y={320} fill="#7a8aaa" fontSize="9">{item.sub}</text>
            </g>
          ))}

          {/* ARROWS to DB/AI */}
          {[105, 340, 520, 720].map((x) => (
            <line key={x} x1={x} y1="362" x2={x} y2="400" stroke="rgba(255,209,102,0.25)" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arr)" />
          ))}

          {/* DATA & AI LAYER */}
          <text x="20" y="394" fill="#5a6a80" fontSize="10" letterSpacing="2">DATA & AI LAYER</text>
          <rect x="20" y="404" width="860" height="78" rx="10" fill="none" stroke="rgba(255,77,109,0.1)" strokeDasharray="5,4" />
          {[
            { x: 30, label: "PostgreSQL", sub: "Primary DB", icon: "🗄️" },
            { x: 185, label: "Redis Cache", sub: "Session/Cache", icon: "⚡" },
            { x: 340, label: "S3 / Blob", sub: "Resume Files", icon: "☁️" },
            { x: 495, label: "Elasticsearch", sub: "Search Index", icon: "🔍" },
            { x: 650, label: "Anthropic API", sub: "Claude Sonnet", icon: "✦" },
            { x: 785, label: "Vector DB", sub: "Embeddings", icon: "🧬" },
          ].map((item) => (
            <g key={item.x}>
              <rect x={item.x} y={414} width={140} height={56} rx="8" fill="rgba(255,77,109,0.07)" stroke="rgba(255,77,109,0.2)" strokeWidth="1" />
              <text x={item.x + 12} y={436} fontSize="13">{item.icon}</text>
              <text x={item.x + 32} y={436} fill="#e0eaff" fontSize="10" fontWeight="600">{item.label}</text>
              <text x={item.x + 32} y={449} fill="#5a6a80" fontSize="8">{item.sub}</text>
            </g>
          ))}

          {/* INFRASTRUCTURE & OBSERVABILITY */}
          <text x="20" y="502" fill="#5a6a80" fontSize="10" letterSpacing="2">INFRASTRUCTURE & OBSERVABILITY</text>
          <rect x="20" y="512" width="860" height="90" rx="10" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,4" />
          {[
            { x: 30, label: "Kubernetes", sub: "Container Orch.", icon: "☸️" },
            { x: 185, label: "Terraform IaC", sub: "Cloud Infra", icon: "🏗️" },
            { x: 340, label: "Prometheus", sub: "Metrics", icon: "📈" },
            { x: 495, label: "Grafana", sub: "Dashboards", icon: "🔭" },
            { x: 650, label: "CI/CD Pipeline", sub: "GitHub Actions", icon: "🔄" },
            { x: 785, label: "Vault Secrets", sub: "Key Mgmt", icon: "🔒" },
          ].map((item) => (
            <g key={item.x}>
              <rect x={item.x} y={522} width={140} height={68} rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x={item.x + 12} y={546} fontSize="13">{item.icon}</text>
              <text x={item.x + 34} y={546} fill="#7a8aaa" fontSize="10" fontWeight="600">{item.label}</text>
              <text x={item.x + 34} y={559} fill="#3a4a60" fontSize="8">{item.sub}</text>
            </g>
          ))}

          <text x="450" y="612" fill="#3a4a60" fontSize="9" textAnchor="middle" letterSpacing="1">
            AI RESUME SCREENING PORTAL — CLOUD ARCHITECTURE v1.0
          </text>
        </svg>
      </div>

      <div className="section-row" style={{ marginTop: 24 }}>
        {[
          { title: "Frontend", items: ["React / Next.js", "TypeScript", "TailwindCSS", "Recharts"] },
          { title: "Backend", items: ["Node.js / Express", "Python FastAPI", "GraphQL", "gRPC"] },
          { title: "AI / ML", items: ["Claude API (Sonnet)", "LangChain", "Hugging Face", "Vector Embeddings"] },
          { title: "Cloud / Infra", items: ["AWS EKS", "Terraform", "GitHub Actions", "HashiCorp Vault"] },
        ].map((col) => (
          <div key={col.title} className="card">
            <div className="card-title">{col.title}</div>
            <div>
              {col.items.map((i) => (
                <div key={i} className="flex-gap" style={{ marginBottom: 8 }}>
                  <span style={{ color: "#00f5d4", fontSize: 10 }}>▸</span>
                  <span style={{ fontSize: 12 }}>{i}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
