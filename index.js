import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "https://in-shorts-news.web.app/" }));
const PORT = process.env.PORT || 5000;

//
app.get("/", (req, res) => {
  res.send("This is Homepage");
});

const fetchData = async (req, res) => {
  const category = req.params.category;
  const pages = req.params.pages;
  const query = req.query.q;
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.API_KEY}&pageSize=${pages}`;
  const url_all = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.API_KEY}&pageSize=100`;

  try {
    if (query) url = url_all;
    const response = await axios.get(url);
    const news = response.data;
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
  }
};

app.get("/news/:category/:pages", fetchData);
app.get("/news", fetchData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
