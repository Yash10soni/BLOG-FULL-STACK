import express from "express";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/ai", aiRoutes);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome, you are authorized!", user: req.user });
});

// Health check route for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Dynamic Port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
