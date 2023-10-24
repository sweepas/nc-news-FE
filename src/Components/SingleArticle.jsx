import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import "../article.css";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState({});
  const [error, setError] = useState(null);
  const [comment, setCommentById] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://nc-news-be-project-lndv.onrender.com/api/articles/${article_id}`
      )
      .then((response) => {
        return response.data;
      })
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
