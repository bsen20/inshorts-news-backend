import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 5000;
// const API_KEY = "89a4fe43466c4b6595adc53c77ee1f21";

//
app.get("/", (req, res) => {
  res.send("This is Homepage");
});

const fetchData = async (req, res) => {
  const category = req.params.category;
  const pages = req.params.pages;
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.API_KEY}&pageSize=${pages}`;
  try {
    const response = await axios.get(url);
    const news = response.data;
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
  }
};

app.get("/news/:category/:pages", fetchData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
