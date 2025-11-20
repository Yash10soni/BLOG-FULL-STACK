// blog-backend/controllers/blogController.js
import pool from "../db.js";

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO blogs (title, content, image, author) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, content, image || null, author || "Anonymous"]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, author } = req.body;
  try {
    const result = await pool.query(
      `UPDATE blogs 
       SET title=$1, content=$2, image=$3, author=$4 
       WHERE id=$5 RETURNING *`,
      [title, content, image || null, author || "Anonymous", id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM blogs WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};