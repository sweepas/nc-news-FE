import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, deleteComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";
import { ComponentForm } from "./CommentForm";

import "../comments.css";
import ErrorPage from "./ErrorPage";
import CommentVoter from "./CommentVoter";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setreLoad] = useState("");
  const [error, setError] = useState(null);
  const { authUser, logedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getComments(article_id)
      .then((body) => {
        setComments(body.comments);
        setreLoad("");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.msg);
      });
  }, [reload]);

  useEffect(() => {
    if (deleteId) {
      deleteComment(deleteId)
        .then((response) => {
          if (response.status === 204) {
            alert("your comment was deleted succesfully");
            setreLoad("t");
          }
        })
        .catch((error) => {
          if (error) {
            alert("something went wrong. please try again");
            setreLoad("t");
          }
        });
    }
  }, [deleteId]);

  function handleDeleteComment(commentId) {
    setDeleteId(commentId);
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

  if (error)
    return (
      <p>
        <ErrorPage />
      </p>
    );

  return (
    <>
      {loading ? (
        <p className="loading-tab">Loading...</p>
      ) : (
        <div className="comment-container">
          <ComponentForm />
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <h4>{comment.author}</h4>
                  <div>
                    <p>{formatISODateTime(comment.created_at)}</p>
                    <p>{comment.article_id}</p>
                    <CommentVoter comment={comment} />
                  </div>
                  <p>{comment.body}</p>
                  {logedIn && authUser === comment.author && (
                    <button
                      onClick={() => handleDeleteComment(comment.comment_id)}
                      className="delete-btn"
                    >
                      Delete Comment
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default AllComments;
