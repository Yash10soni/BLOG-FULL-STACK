import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_API_URL;

      // Register user
      await axios.post(`${BASE_URL}/auth/register`, { name, email, password });

      // Auto-login
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
