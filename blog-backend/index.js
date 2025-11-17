// server.js
import express from "express";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";   // ➜ Add this

import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profiles", profileRoutes);

// AI Route
app.use("/api/ai", aiRoutes);   // ➜ NEW

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome, you are authorized!", user: req.user });
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
