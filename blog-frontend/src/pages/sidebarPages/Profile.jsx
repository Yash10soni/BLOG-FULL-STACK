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

  const userId = 1; // replace with actual logged-in user id
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profiles/${userId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error("GET profile error:", err));
  }, [BASE_URL]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/profiles/${userId}`, profile)
      .then(res => alert("Profile updated!"))
      .catch(err => console.error("PUT update error:", err));
  };

  return (
    <div className="page-container">
      <h1>👤 Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
        <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio" />
        <input name="avatar_url" value={profile.avatar_url} onChange={handleChange} placeholder="Avatar URL" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
