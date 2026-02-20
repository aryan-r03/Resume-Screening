import "dotenv/config";
import express from "express";
import cors from "cors";
import screeningRoutes from "./routes/screening.js";
import candidatesRoutes from "./routes/candidates.js";
import jobsRoutes from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({origin: process.env.FRONTEND_URL || 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use("/api/screen", screeningRoutes);
app.use("/api/candidates", candidatesRoutes);
app.use("/api/jobs", jobsRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
