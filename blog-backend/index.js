// server.js (if using "type": "module") or server.mjs

import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js"; // Add `.js` extension when importing local files
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Routes
app.use("/api/blogs", blogRoutes);


// New
app.use("/api/profiles", profileRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome, you are authorized!", user: req.user });
});
// Start server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
