import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "./cover.png";
const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Use state to track avatar
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar_url"));

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setAvatar(localStorage.getItem("avatar_url"));
    };

    // Add listener for storage changes (fires when localStorage is updated)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar_url");
    setToken(null);
    setAvatar(null); // update avatar state immediately
    navigate("/");
  };

  return (
    <nav className="navbar">

        <img src={logo} alt="MyBlog Logo" className="navbar-logo" />
      <div className="links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/create">Create</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>

            {/* Profile avatar/icon */}
            {avatar ? (
              <img
                src={avatar}
                alt="profile"
                className="navbar-avatar"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <FaUserCircle
                size={28}
                className="profile-icon"
                onClick={() => navigate("/profile")}
              />
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
