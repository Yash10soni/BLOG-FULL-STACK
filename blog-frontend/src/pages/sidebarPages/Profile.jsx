import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar_url: ""
  });

  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  console.log("BASE_URL =", BASE_URL);
  console.log("TOKEN =", token);

  // ==========================================
  // FETCH PROFILE
  // ==========================================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profiles/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("PROFILE FETCH RESPONSE:", res.data);

      if (res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.error("GET PROFILE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); // dependency warning is OK for now

  // ==========================================
  // HANDLE INPUTS
  // ==========================================
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ==========================================
  // SAVE / UPDATE PROFILE
  // ==========================================
  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.put(
  //       `${BASE_URL}/api/profiles/me`,
  //       profile,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",  // ADD THIS ✔
  //           Authorization: `Bearer ${token}`     // REQUIRED ✔
  //         }
  //       }
  //     );

  //     console.log("PROFILE UPDATED:", res.data);
  //     alert("Profile updated successfully!");
  //   } catch (err) {
  //     console.error("UPDATE PROFILE ERROR:", err);
  //     alert("Failed to update profile!");
  //   }
  // };

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(
      `${BASE_URL}/api/profiles/me`,
      profile,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("PROFILE UPDATED:", res.data);

    // Save avatar to localStorage so Navbar can read it
    localStorage.setItem("avatar_url", res.data.avatar_url);

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    alert("Failed to update profile!");
  }
};

  if (loading) return <p>Loading profile...</p>;

  return (
  <div className="page-container">

      {profile.avatar_url && (
        <img
          src={profile.avatar_url}
          alt="avatar"
          className="avatar-preview-top"
        />
      )}

      <h1>👤 Profile</h1>

      <form className="profile-form" onSubmit={handleSave}>
        <input
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
        />

        <input
          name="avatar_url"
          placeholder="Avatar URL"
          value={profile.avatar_url}
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
      </form>

  </div>
);

};

export default Profile;
