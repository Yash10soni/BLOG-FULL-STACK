import React from "react";
import { Link } from "react-router-dom";
import "./IntroPage.css";

const IntroPage = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1>Welcome to <span className="intro-logo">MyBlog</span></h1>
        <p className="intro-text">
          Share your stories, read insightful blogs, and connect with a growing
          community of thinkers and creators. 🌍  
          MyBlog is a platform for voices that matter — from tech to lifestyle, 
          from beginners to pros.
        </p>

        <div className="intro-buttons">
          <Link to="/register" className="intro-btn intro-btn-primary">Get Started</Link>
          <Link to="/login" className="intro-btn intro-btn-outline">Login</Link>
        </div>
      </div>

      <div className="intro-illustration">
        <img
          src="https://illustrations.popsy.co/gray/blogging.svg"
          alt="Blogging illustration"
        />
      </div>
    </div>
  );
};

export default IntroPage;
