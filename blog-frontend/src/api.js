import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // use env variable
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Blogs
export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogById = (id) => API.get(`/blogs/${id}`);
export const createBlog = (blogData, token) =>
  API.post("/blogs", blogData, { headers: { Authorization: `Bearer ${token}` } });
export const updateBlog = (id, blogData, token) =>
  API.put(`/blogs/${id}`, blogData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteBlog = (id, token) =>
  API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
