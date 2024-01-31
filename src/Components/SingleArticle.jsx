import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, patchArticle, postComment } from "../api/api";
import Voter from "./Voter";
import AllComments from "./AllComents";
import "../single-article.css";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getArticleById(article_id)
      .then((body) => {
        if (body.msg === "item not found") {
          setError(body.msg);
        }
        setSingleArticle(body.article);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{<ErrorPage />}</p>;
  }
  return (
    <div className="single-article-page">
      <div className="single-article-container ">
        <div className="single-article">
        <h2>{article.title}</h2>
        <p>{formatISODateTime(article.created_at)}</p>
        <p>by {article.author}</p>
        <img className="article-img"
          src={article.article_img_url}
          alt={`an image of ${article.topic}`}
        />
        <p>Comment count {article.comment_count}</p>
        <p>{article.votes}</p>
       
        <p>Topics: {article.topic}</p>
        <Voter article={article} />
        <p>{article.body}</p>
        </div>
        <AllComments />
      </div>
    </div>
  );
}

export default SingleArticle;


