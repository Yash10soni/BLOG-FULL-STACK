import express from "express";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// ========================================
// ✅ SINGLE CLEAN CORS CONFIG
// ========================================
const allowedOrigins = [
  "https://blog-full-stack-kappa.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ========================================
// Routes
// ========================================
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/ai", aiRoutes);

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Authorized", user: req.user });
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ error: err.message || "Server error" });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
