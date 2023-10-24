import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Route, Routes } from "react-router-dom";
import { getArticleById, patchArticle } from "../api/api";
import Voter from "./Voter";
import "../article.css";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState({});
  const [error, setError] = useState(null);
  const [comment, setCommentById] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getArticleById(article_id)
      .then((body) => {
        if (body.msg === "item not found") {
          setError(body.msg);
        }
        setSingleArticle(body.article);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const updateVotes = (newLikes) => {
    setSingleArticle({ ...article, votes: newLikes });
    patchArticle(article.article_id, newLikes).catch((error) => {
      setError(error.msg);
    });
  };

  function handleSubmit(e) {
    setCommentById("comment");
  }

  function handleChange(e) {
    setCommentById(e.target.value);
  }

  if (error) {
    return <p>Error</p>;
  }
  return (
    <>
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
        <Voter likes={article.votes} update={updateVotes} />
        <p>{article.body}</p>
        <form action="submit">
          <input type="text" onChange={handleChange} />
          <button onClick={handleSubmit}>Submit comment</button>
        </form>
      </div>
    </>
  );
}

export default SingleArticle;
