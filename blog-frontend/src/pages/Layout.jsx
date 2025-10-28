import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaBook, FaUser, FaChartBar } from "react-icons/fa";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li><Link to="/"><FaHome className="icon" /> Home</Link></li>
            <li><Link to="/library"><FaBook className="icon" /> Library</Link></li>
            <li><Link to="/profile"><FaUser className="icon" /> Profile</Link></li>
            <li><Link to="/stats"><FaChartBar className="icon" /> Stats</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
