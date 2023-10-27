import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Route, Routes } from "react-router-dom";
import { getArticleById, patchArticle, postComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";
import Voter from "./Voter";
import "../article.css";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setSingleArticle] = useState();
  const [error, setError] = useState(null);
  const [comment, setCommentById] = useState();
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

  const updateVotes = (newLikes) => {
    console.log("grom votes");
    const displayVotes = article.votes + newLikes;
    setSingleArticle({ ...article, votes: displayVotes });
    patchArticle(article.article_id, newLikes)
      .then((response) => {
        if (response.status !== 200) setError(response.msg);
      })
      .catch((error) => {
        setError(error.msg);
      });
  };

  useEffect(() => {
    if (post) {
      postComment(article_id, authUser, comment)
        .then((response) => {
          if (response.status === 201) {
            alert("Your comment was posted succesfully");
            setPost(false);
            navigate("comments");
          }
        })
        .catch((error) => {
          setError(error.msg);
        });
    }
  }, [post]);

  function handleSubmit(e) {
    e.preventDefault();
    setPost(true);
  }

  function handleChange(e) {
    const comment = e.target.value;
    setCommentById(comment);
  }

  if (loading) {
    return <p>Loading...</p>;
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
          <input
            type="text"
            placeholder={
              logedIn ? "your comment goes here" : "Please log in to comment.."
            }
            onChange={handleChange}
          />

          <button disabled={!logedIn} onClick={handleSubmit}>
            Submit comment
          </button>
        </form>
      </div>
    </>
  );
}

export default SingleArticle;
