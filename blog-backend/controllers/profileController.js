import pool from "../db.js";

// Get profile by user id
export const getProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM profiles WHERE user_id=$1", [user_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create profile
export const createProfile = async (req, res) => {
  const { user_id, name, email, bio, avatar_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO profiles (user_id, name, email, bio, avatar_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, name, email, bio || "", avatar_url || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  const { user_id } = req.params;
  const { name, email, bio, avatar_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE profiles
       SET name=$1, email=$2, bio=$3, avatar_url=$4, updated_at=NOW()
       WHERE user_id=$5 RETURNING *`,
      [name, email, bio || "", avatar_url || null, user_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query("DELETE FROM profiles WHERE user_id=$1 RETURNING *", [user_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
