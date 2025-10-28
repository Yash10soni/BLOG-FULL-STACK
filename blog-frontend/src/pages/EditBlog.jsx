import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById, updateBlog } from "../api";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");
  const author = localStorage.getItem("username"); // optional: store author in localStorage

  // 🔹 Load existing blog data
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetchBlogById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image || "");
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    loadBlog();
  }, [id]);

  // 🔹 Handle blog update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first!");

    try {
      await updateBlog(id, { title, content, image, author }, token);
      navigate(`/blog/${id}`); // redirect to blog detail
    } catch (err) {
      console.error("Error updating blog:", err.response || err);
    }
  };

  return (
    <div className="page-container">
      <h1>Edit Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
