import "dotenv/config";
import express from "express";
import cors from "cors";
import screeningRoutes from "./routes/screening.js";
import candidatesRoutes from "./routes/candidates.js";
import jobsRoutes from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/screen", screeningRoutes);
app.use("/api/candidates", candidatesRoutes);
app.use("/api/jobs", jobsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.send("Backend is live 🚀");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
