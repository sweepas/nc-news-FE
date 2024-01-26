import { useState } from "react";
import React from "react";
import { useAuth } from "../Context/LoginContext";
import { patchArticle } from "../api/api";

function Voter({ article }) {
  const [votes, setVotes] = useState(article.votes);
  const [userVote, setusUerVote] = useState(0);
  const [error, setError] = useState(null);

  const { logedIn } = useAuth();
  const updateVotes = (newLikes) => {
    patchArticle(article.article_id, newLikes)
      .then((response) => {
        if (response.status !== 200) setError(response.msg);
      })
      .catch((error) => {
        setError(error.msg);
      });
  };

  function handleClick(value) {
    console.log(article.votes, value);
    setVotes(votes + value);
    setusUerVote(userVote + value);
    updateVotes(value);
  }

  return (
    <div>
      <p>upvotes: {votes}</p>
      <div className="article-voter-btn-container">
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

export default Voter;
