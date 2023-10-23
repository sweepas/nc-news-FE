import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Articles() {
  const [allArticles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-be-project-lndv.onrender.com/api/articles")
      .then((response) => {
        return response.data;
      })
      .then((body) => {
        setArticles(body.articles);
      });
  });
  return (
    <div className="articles-container">
      <ul>
        {allArticles.map((article) => {
          return (
            <li className="article-name" key={article.article_id}>
              <h4>{article.title}</h4>
              <img
                src={article.article_img_url}
                alt={`an image of ${article.topic}`}
                className="article-img"
              />
              <div className="article-menu">
                <p>upvotes {article.votes}</p>
                <p>{article.topic}</p>
                <p>Comments</p>
                <p>Read article</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;
