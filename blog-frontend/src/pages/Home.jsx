import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { fetchDevTo, fetchNewsAPI } from "../publicApis";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [publicBlogs, setPublicBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllPublicBlogs = async () => {
    try {
      const devto = await fetchDevTo();
      const news = await fetchNewsAPI();
      setPublicBlogs([...devto, ...news]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchAllPublicBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <h1>Your Blogs</h1>
      {blogs.length === 0 && <p>No blogs yet.</p>}

      {blogs.map((blog) => (
        <div key={blog.id} className="home-blog-card">
          <div className="home-blog-card-inner">
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="home-blog-image" />
            )}
            <div className="home-blog-content">
              <h2>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p>{blog.content.substring(0,400 )}...</p>
              <p className="home-blog-meta">
                <strong>Author:</strong> {blog.author || "Unknown"} |{" "}
                <strong>Date:</strong>{" "}
                {new Date(blog.created_at).toLocaleDateString()} |{" "}
                <strong>Time:</strong>{" "}
                {new Date(blog.created_at).toLocaleTimeString()}
              </p>
              <div className="home-blog-buttons">
                <Link to={`/edit/${blog.id}`} className="home-btn home-btn-edit">Edit</Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="home-btn home-btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h1>Latest Public Blogs</h1>
      {publicBlogs.length === 0 && <p>No public blogs found.</p>}

      {publicBlogs.map((blog, index) => (
        <div key={index} className="home-blog-card">
          <div className="home-blog-card-inner">
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="home-public-blog-image" />
            )}
            <div className="home-blog-content">
              <h2>
                <a href={blog.url} target="_blank" rel="noreferrer">
                  {blog.title}
                </a>
              </h2>
              <p className="home-blog-meta">
                <strong>Author:</strong> {blog.author || "Unknown"} |{" "}
                <strong>Date:</strong> {blog.date || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
