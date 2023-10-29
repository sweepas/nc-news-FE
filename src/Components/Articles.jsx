import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import ErrorPage from "./ErrorPage";
import Sortby from "./Sortby";
import Topics from "./Topics";
import "../articles.css";
import Voter from "./Voter";

function Articles() {
  const [allArticles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sortby = searchParams.get("sortby");

  const navigate = useNavigate();

  useEffect(() => {
    getArticles(topic, sortby)
      .then((body) => {
        setArticles(body.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [topic, sortby]);

  function handleSortby(sortby) {
    setSearchParams({ topic, sortby });
  }

  function handleTopics(topic) {
    if (topic === "All") navigate("articles");
    setSearchParams({ topic, sortby });
  }

  function formatISODateTime(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;
  return (
    <div>
      <div className="filter-container">
        <Sortby update={handleSortby} />
        <Topics update={handleTopics} />
      </div>
      <div className="articles-container">
        <ul>
          {allArticles.map((article) => (
            <li className="article-name" key={article.article_id}>
              <h4>{article.title}</h4>
              <p>{formatISODateTime(article.created_at)}</p>
              <div>
                <Voter />
              </div>
              <img
                src={article.article_img_url}
                alt={`an image of ${article.topic}`}
                className="article-img"
              />
              <div className="article-menu">
                <p>upvotes {article.votes}</p>
                <p>{article.topic}</p>
                <Link to={`/articles/${article.article_id}/id`}>Read More</Link>
                <Link to={`/articles/${article.article_id}/id/comments`}>
                  Comments
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Articles;
