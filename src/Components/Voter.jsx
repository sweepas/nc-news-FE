import { useState } from "react";
import React from "react";
import { useAuth } from "../Context/LoginContext";

function Voter({ likes, update }) {
  const [votes, setVotes] = useState(0);
  const { logedIn } = useAuth();

  function handleClick(value) {
    setVotes(votes + value);
    update(value);
  }

  return (
    <div>
      <p>upvotes: {likes}</p>
      <button
        disabled={votes === 1 || !logedIn}
        onClick={() => {
          handleClick(1);
        }}
      >
        +
      </button>
      <button
        disabled={votes === -1 || !logedIn}
        onClick={() => {
          handleClick(-1);
        }}
      >
        -
      </button>
    </div>
  );
}

export default Voter;
