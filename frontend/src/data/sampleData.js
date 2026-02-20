export const SAMPLE_JOBS = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    description:
      "We are looking for a Senior Full-Stack Engineer to join our platform team. You'll architect scalable microservices, mentor junior developers, and ship features used by millions.",
    candidates: 0,
  },
  {
    id: 2,
    title: "ML Engineer",
    department: "AI/Research",
    location: "San Francisco",
    type: "Full-time",
    experience: "3+ years",
    skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "Kubernetes", "Spark", "SQL"],
    description:
      "Join our ML team to build and deploy production-grade machine learning models. Experience with large-scale data pipelines and model optimization required.",
    candidates: 0,
  },
  {
    id: 3,
    title: "DevSecOps Engineer",
    department: "Platform",
    location: "Hybrid – NYC",
    type: "Full-time",
    experience: "4+ years",
    skills: ["Terraform", "Kubernetes", "Vault", "Jenkins", "SIEM", "Python", "AWS"],
    description:
      "Build and secure our cloud infrastructure. You'll implement zero-trust security, manage secrets, and automate compliance checks across multi-cloud deployments.",
    candidates: 0,
  },
];

export const SAMPLE_CANDIDATES = [
  {
    id: 1,
    jobId: 1,
    name: "Priya Mehta",
    email: "priya.mehta@email.com",
    title: "Full Stack Developer",
    experience: "6 years",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    resumeText:
      "6 years of experience building scalable web applications. Led a team of 5 engineers at Fintech startup. React & Node.js expert with AWS certification. Built microservices serving 2M+ users.",
    status: "screened",
    score: null,
    aiAnalysis: null,
  },
  {
    id: 2,
    jobId: 1,
    name: "James Okonkwo",
    email: "james.o@email.com",
    title: "Backend Engineer",
    experience: "4 years",
    skills: ["Node.js", "TypeScript", "MongoDB", "GCP", "Redis"],
    resumeText:
      "Backend engineer with 4 years building REST APIs and microservices. Strong Node.js and TypeScript skills. Limited frontend React experience. GCP certified. Contributed to open-source projects.",
    status: "new",
    score: null,
    aiAnalysis: null,
  },
  {
    id: 3,
    jobId: 1,
    name: "Sofia Hernandez",
    email: "sofia.h@email.com",
    title: "Senior Software Engineer",
    experience: "7 years",
    skills: ["React", "Vue", "TypeScript", "GraphQL", "AWS", "Docker", "PostgreSQL"],
    resumeText:
      "7 years full-stack experience. Deep expertise in React ecosystem, GraphQL APIs, and cloud-native architecture on AWS. Previous Staff Engineer at FAANG. Strong system design background.",
    status: "new",
    score: null,
    aiAnalysis: null,
  },
];
