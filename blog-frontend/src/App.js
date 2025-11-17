import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomeBlogs from "./pages/HomeBlogs";
import Library from "./pages/sidebarPages/Library";
import Profile from "./pages/sidebarPages/Profile";
import Stats from "./pages/sidebarPages/Stats";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import IntroPage from "./pages/IntroPage";
import AIBox from "./components/AIBox";

import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔹 Keep token in sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar setToken={setToken} />
      <Routes>
        {/* Show IntroPage if logged out, HomeBlogs if logged in */}
        <Route path="/" element={token ? <HomeBlogs /> : <IntroPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        {/* Protected pages */}
        <Route element={<Layout />}>
          <Route
            path="library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Blog routes (protected) */}
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
  path="/ai"
  element={
    <ProtectedRoute>
      <AIBox />
    </ProtectedRoute>
  }
/>

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
