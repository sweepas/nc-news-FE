import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { getArticles, removeArticle } from "../api/api";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";
import Sortby from "./Sortby";
import Topics from "./Topics";
import { useAuth } from "../Context/LoginContext";
import useIntersectionObserver from "./useIntersectionObserver";

import "../articles.css";

function Articles() {
  const [allArticles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser, logedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sortby = searchParams.get("sortby");

  const articleRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Refs before assignment:", articleRefs.current);
    getArticles(topic, sortby)
      .then((body) => {
        console.log(body.articles);
        setArticles(body.articles);
        setLoading(false);
        articleRefs.current = body.articles.map(() => React.createRef());
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

  function handleDeleteArticle(article_id) {
    removeArticle(article_id);
    navigate("/refresh");
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

  useIntersectionObserver(articleRefs, allArticles, 0.8);

  if (error) return <ErrorPage />;
  return (
    <>
      {loading ? (
        <p className="loading-tab">Loading...</p>
      ) : (
        <>
          <div className="filter-container">
            <Sortby update={handleSortby} />
            <Topics update={handleTopics} />
          </div>
          <div className="articles-container">
            <ul>
              {allArticles.map((article, i) => (
                <li
                  className="article-name"
                  id={article.article_id}
                  ref={articleRefs.current[i]}
                >
                  <div className="img-div">
                    <img
                      src={article.article_img_url}
                      alt={`an image of ${article.topic}`}
                      className="article-img"
                    />
                  </div>
                  <h4>{article.title}</h4>

                  <div className="voter-date">
                    <span>{formatISODateTime(article.created_at)}</span>
                    <Voter article={article} />
                  </div>

                  {logedIn && authUser === article.author && (
                    <button
                      onClick={() => handleDeleteArticle(article.article_id)}
                      className="delete-btn"
                    >
                      Delete Article
                    </button>
                  )}
                  {/* <p>{article.votes}</p> */}

                  <div className="article-menu">
                    <p className="article-p">
                      comments: {article.comment_count}
                    </p>
                    <p className="article-p"> topic: {article.topic}</p>
                    <Link to={`/articles/${article.article_id}/`}>
                      Read More
                    </Link>
                    <Link to={`/articles/${article.article_id}/comments`}>
                      Comments
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Articles;
