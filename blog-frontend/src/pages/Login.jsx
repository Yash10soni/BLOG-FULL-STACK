import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_API_URL;

      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Enter email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
