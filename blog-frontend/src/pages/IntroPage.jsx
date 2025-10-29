import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./IntroPage.css";

const IntroPage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="intro-wrapper">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#ffffff" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            color: { value: "#ff4b2b" },
            move: { enable: true, speed: 1 },
            links: { enable: true, distance: 150, color: "#ff4b2b" },
          },
        }}
        className="particles"
      />

      <div className="intro-container">
        <div className="intro-content">
          <h1>
            Welcome to <span className="intro-logo">MyBlog</span>
          </h1>
          <p className="intro-text">
            Share your stories, read insightful blogs, and connect with a
            community of creators worldwide 🌍
          </p>

          <div className="intro-buttons">
            <Link to="/register" className="intro-btn intro-btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="intro-btn intro-btn-outline">
              Login
            </Link>
          </div>
        </div>

        <div className="intro-illustration">
          <img
            src="https://illustrations.popsy.co/gray/blogging.svg"
            alt="Blogging"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
