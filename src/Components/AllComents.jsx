// AllComments.js
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getComments, deleteComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";
import { CommentForm } from "./CommentForm";
import CommentVoter from "./CommentVoter";
import ErrorPage from "./ErrorPage";
import "../comments.css";
import useIntersectionObserver from "./useIntersectionObserver";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState("");
  const [error, setError] = useState(null);
  const { authUser, logedIn } = useAuth();

  const commentRefs = useRef([]);

  useEffect(() => {
    getComments(article_id)
      .then((body) => {
        setComments(body.comments);
        setReLoad("");
        setLoading(false);
        commentRefs.current = body.comments.map(() => React.createRef());
      })
      .catch((error) => {
        setError(error.msg);
      });
  }, [reload, article_id]);

  useEffect(() => {
    if (deleteId) {
      deleteComment(deleteId)
        .then((response) => {
          if (response.status === 204) {
            alert("Your comment was deleted successfully");
            setReLoad("t");
          }
        })
        .catch(() => {
          alert("Something went wrong. Please try again.");
          setReLoad("t");
        });
    }
  }, [deleteId]);

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

  useIntersectionObserver(commentRefs, comments);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
   <div className="form-container">
   <CommentForm key="key-2" />
   </div>
      {loading ? (
        <p className="loading-tab">Loading...</p>
      ) : (
        <div className="comment-container">
          
          <ul>
            {comments.map((comment, index) => (
              <li key={comment.comment_id} ref={commentRefs.current[index]}>
                
                <div>
                <h4>{comment.author}</h4>
                  <div>
                    <p className="date-time">
                      {formatISODateTime(comment.created_at)}
                    </p>
                  </div>
                  <CommentVoter comment={comment} />
                </div>
                <p>{comment.body}</p>
                {logedIn && authUser === comment.author && (
                  <button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default AllComments;
