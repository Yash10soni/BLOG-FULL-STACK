// blog-frontend/src/publicApis.js
import axios from "axios";

export const fetchDevTo = async () => {
  try {
    const res = await axios.get("https://dev.to/api/articles?per_page=100");
    return res.data.map((item) => ({
      title: item.title,
      image: item.cover_image || "https://via.placeholder.com/400x200",
      author: item.user.name,
      date: new Date(item.published_at).toLocaleDateString(),
      url: item.url,
    }));
  } catch (err) {
    console.error("Dev.to API error", err);
    return [];
  }
};

export const fetchNewsAPI = async () => {
  const apiKey = "YOUR_NEWSAPI_KEY"; // get free key from https://newsapi.org/
  try {
   const res = await axios.get(
  `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${apiKey}`
);

    return res.data.articles.map((item) => ({
      title: item.title,
      image: item.urlToImage || "https://via.placeholder.com/400x200",
      author: item.author || "Unknown",
      date: new Date(item.publishedAt).toLocaleDateString(),
      url: item.url,
    }));
  } catch (err) {
    console.error("NewsAPI error", err);
    return [];
  }
};
