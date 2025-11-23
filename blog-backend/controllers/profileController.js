import pool from "../db.js";

// =======================================================
// GET LOGGED-IN USER PROFILE
// =======================================================
export const getMyProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM profiles WHERE user_id=$1",
      [user_id]
    );

    if (result.rows.length === 0) {
      // Return default profile instead of null
      return res.json({
        user_id,
        name: "",
        email: "",
        bio: "",
        avatar_url: "",
        updated_at: null
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// =======================================================
// UPDATE OR CREATE LOGGED-IN USER PROFILE
// =======================================================
export const updateMyProfile = async (req, res) => {
  const user_id = req.user.id;
  const { name, email, bio, avatar_url } = req.body;

  try {
    const exists = await pool.query(
      "SELECT * FROM profiles WHERE user_id=$1",
      [user_id]
    );

    if (exists.rows.length === 0) {
      // CREATE NEW PROFILE
      const newProfile = await pool.query(
        `INSERT INTO profiles (user_id, name, email, bio, avatar_url, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [user_id, name, email, bio, avatar_url]
      );

      return res.status(201).json(newProfile.rows[0]);
    }

    // UPDATE PROFILE
    const updated = await pool.query(
      `UPDATE profiles 
       SET name=$1, email=$2, bio=$3, avatar_url=$4, updated_at=NOW()
       WHERE user_id=$5
       RETURNING *`,
      [name, email, bio, avatar_url, user_id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
