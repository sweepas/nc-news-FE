import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, deleteComment } from "../api/api";
import { useAuth } from "../Context/LoginContext";

import "../comments.css";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser, logedIn } = useAuth();

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
    console.log(deleteId);
    deleteComment(deleteId);
  }, [deleteId]);

  function handleDeleteComment(commentId) {
    setDeleteId(commentId);
  }

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error..</p>;

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
