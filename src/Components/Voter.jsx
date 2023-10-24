import { useState } from "react";
import React from "react";

function Voter({ likes, update }) {
  function handleLike() {
    const newLikes = likes + 1;
    update(newLikes);
  }
  function handleDislike() {
    const newLikes = likes - 1;
    update(newLikes);
  }
  return (
    <div>
      <p>upvotes: {likes}</p>
      <button disabled={likes === 1} onClick={handleLike}>
        +
      </button>
      <button disabled={likes === -1} onClick={handleDislike}>
        -
      </button>
    </div>
  );
}

export default Voter;
