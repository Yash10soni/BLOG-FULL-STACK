import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api";
import "./CreateBlog.css";

const CreateBlog = ({ token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login properly
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return alert("Please login first!");

    try {
      const blogData = { title, author, image, content };

      await createBlog(blogData, authToken);

      navigate("/"); // redirect
    } catch (err) {
      console.error("Error creating blog:", err.response || err);
      alert("Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <h2>Create Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="blog-input"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="blog-input"
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="blog-input"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={8}
        className="blog-textarea"
      />

      <button type="submit" className="blog-btn">Submit</button>
    </form>
  );
};

export default CreateBlog;
