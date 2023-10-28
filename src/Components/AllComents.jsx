import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, deleteComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";

import "../comments.css";
import ErrorPage from "./ErrorPage";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser, logedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getComments(article_id)
      .then((body) => {
        setComments(body.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.msg);
      });
  }, []);

  useEffect(() => {
    if (deleteId) {
      deleteComment(deleteId)
        .then((response) => {
          if (response.status === 204) {
            alert("your comment was deleted succesfully");
            setLoading(true);
          }
        })
        .catch((error) => {
          if (error) {
            alert("something went wrong. please try again");
            navigate(0);
            setError;
          }
        });
    }
  }, [deleteId]);

  function handleDeleteComment(commentId) {
    setDeleteId(commentId);
  }

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <p>
        <ErrorPage />
      </p>
    );

  return (
    <div className="comment-container">
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <div>
                <p>{comment.created_at}</p>
                <p>{comment.article_id}</p>
                <p>upvotes: {comment.votes}</p>
              </div>
              <p>{comment.body}</p>
              {logedIn && authUser === comment.author && (
                <button onClick={() => handleDeleteComment(comment.comment_id)}>
                  Delete Comment
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllComments;
