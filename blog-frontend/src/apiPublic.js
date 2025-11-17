// blog-frontend/src/apiPublic.js
import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://dev.to/api/articles?per_page=40", // latest 5 articles
});

export default publicApi;
