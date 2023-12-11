import React from "react";
import { useAuth } from "../Context/LoginContext";
import { useEffect, useState } from "react";
import { postComment } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export function ComponentForm() {
  const [loading, setLoading] = useState(true);
  const { authUser, logedIn } = useAuth();
  const [post, setPost] = useState(false);
  const [comment, setCommentById] = useState("");
  const { article_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      postComment(article_id, authUser, comment)
        .then((response) => {
          if (response.status === 201) {
            alert("Your comment was posted succesfully");
            navigate("/refresh");
            navigate(-1);
            setPost(false);
          }
        })
        .catch((error) => {
          setError(error.msg);
        });
    }
  }, [post]);
  function handleChange(e) {
    const comment = e.target.value;
    setCommentById(comment);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setPost(true);
  }
  return (
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
  );
}
