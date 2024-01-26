import { useState } from "react";
import React from "react";
import { useAuth } from "../Context/LoginContext";
import { patchComment } from "../api/api";

function CommentVoter({ comment }) {
  const [votes, setVotes] = useState(comment.votes);
  const [userVote, setusUerVote] = useState(0);
  const [error, setError] = useState(null);

  const { logedIn } = useAuth();
  const updateVotes = (newLikes) => {
    patchComment(comment.article_id, newLikes)
      .then((response) => {
        console.log(response);
        if (response.status !== 200) setError(response.msg);
      })
      .catch((error) => {
        setError(error.msg);
      });
  };

  function handleClick(value) {
    console.log(comment.votes, value);
    setVotes(votes + value);
    setusUerVote(userVote + value);
    updateVotes(value);
  }

  return (
    <div className="comment-voter">
      <p>upvotes: {votes}</p>
      <div className="voter-btn-container">
      <button
        disabled={userVote === 1 || !logedIn}
        onClick={() => {
          handleClick(1);
        }}
      >
        +
      </button>
      <button
        disabled={userVote === -1 || !logedIn}
        onClick={() => {
          handleClick(-1);
        }}
      >
        -
      </button>
      </div>
    </div>
  );
}

export default CommentVoter;
