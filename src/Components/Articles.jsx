import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../api/api";

function Articles() {
  const [allArticles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((body) => {
      setArticles(body.articles);
    });
  }, []);

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
                <Link to={`/articles/${article.article_id}`}>Read More..</Link>
                <p>Comments</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;
