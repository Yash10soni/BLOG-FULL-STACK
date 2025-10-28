import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBlogById, deleteBlog } from "../api"; // your API functions
import publicApi from "../apiPublic"; // for public blogs
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams(); // this is the blog id from backend
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [publicBlogs, setPublicBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // saved from login

  // Fetch your blog by id
  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await fetchBlogById(id); // must use id
        console.log("Blog fetched:", res.data);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        alert("Failed to fetch blog. Maybe the ID is invalid.");
      }
    };
    getBlog();
  }, [id]);

  // Fetch public blogs
  useEffect(() => {
    const getPublicBlogs = async () => {
      try {
        const res = await publicApi.get();
        setPublicBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getPublicBlogs();
  }, []);

  const handleDelete = async () => {
    if (!token) return alert("You must login first!");
    if (blog.userId !== userId) return alert("You cannot delete someone else's blog!");
    try {
      await deleteBlog(id, token); // backend expects id
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-detail-image" />}
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <div className="blog-meta">
        <span>Author: {blog.author || "Unknown"}</span>
        <span>Date: {new Date(blog.created_at).toLocaleDateString()}</span>
        <span>Time: {new Date(blog.created_at).toLocaleTimeString()}</span>
      </div>

      {token && blog.userId === userId && (
        <div className="blog-detail-buttons">
          <Link to={`/edit/${id}`} className="btn btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </div>
      )}

      <h2 className="public-blogs-title">Related Public Blogs</h2>
      <div className="public-blogs-container">
        {publicBlogs.length === 0 && <p>No public blogs found.</p>}
        {publicBlogs.map((pb, index) => (
          <div key={index} className="blog-card">
            {pb.cover_image && (
              <img src={pb.cover_image} alt={pb.title} className="blog-image" />
            )}
            <h3>
              <a href={pb.url} target="_blank" rel="noreferrer">{pb.title}</a>
            </h3>
            <p className="blog-meta">
              <strong>Author:</strong> {pb.user?.name || "Unknown"} |{" "}
              <strong>Date:</strong> {new Date(pb.published_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
