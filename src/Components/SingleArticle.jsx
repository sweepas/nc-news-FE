import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../aticle.css";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState({});
  const [error, setError] = useState(null);
  console.log(article_id);

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
        console.log(body.article);
        setSingleArticle(body.article);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="single-article-container ">
      <h2>{article.title}</h2>
      <p>{article.created_at}</p>
      <p>by {article.author}</p>
      <img src={article.article_img_url} alt={`an image of ${article.topic}`} />
      <p>Comment count {article.comment_count}</p>
      <p>{article.votes}</p>
      <p>Read comments</p>
      <p>Topics: {article.topic}</p>
      <p>{article.body}</p>
      <form action="submit">
        <input type="text" />
        <button>Submit comment</button>
      </form>
    </div>
  );
}

export default SingleArticle;
