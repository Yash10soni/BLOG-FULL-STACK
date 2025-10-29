import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // ✅ update app state immediately
    navigate("/"); // ✅ go back to intro page
  };

  return (
    <nav className="navbar">
      <div className="logo">MyBlog🔮</div>

      <div className="links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/create">Create</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
