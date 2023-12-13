import { ComponentForm } from "./CommentForm";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleById, patchArticle, postComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";
import Voter from "./Voter";
import "../single-article.css";
import ErrorPage from "./ErrorPage";

function SingleArticle({ update }) {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(false);
  const { authUser, logedIn } = useAuth();

  const navigate = useNavigate();

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{<ErrorPage />}</p>;
  }
  return (
    <div className="single-article-page">
      <div className="single-article-container ">
        <h2>{article.title}</h2>
        <p>{article.created_at}</p>
        <p>by {article.author}</p>
        <img
          src={article.article_img_url}
          alt={`an image of ${article.topic}`}
        />
        <p>Comment count {article.comment_count}</p>
        <p>{article.votes}</p>
        <Link to={`/articles/${article_id}/comments`}>All comments</Link>
        <p>Topics: {article.topic}</p>
        <Voter article={article} />
        <p>{article.body}</p>

        <ComponentForm />
      </div>
    </div>
  );
}

export default SingleArticle;


