import express from "express";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// ========================================
// ✅ CORS SETUP (WORKING FOR RENDER + VERCEL)
// ========================================
const allowedOrigins = [
  "https://blog-full-stack-kappa.vercel.app", // frontend deployed
  "http://localhost:3000",                    // local dev
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ❗ FIX FOR RENDER (Removes trailing slash issue)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://blog-full-stack-kappa.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// ========================================
// Middleware
// ========================================
app.use(express.json());

// ========================================
// Routes
// ========================================
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/ai", aiRoutes);

// ✔ Protected route (JWT required)
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome, you are authorized!", user: req.user });
});

// ✔ Health check for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// ========================================
// Global Error Handler
// ========================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message.includes("CORS")) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: "Something went wrong!" });
});

// ========================================
// Start Server
// ========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
