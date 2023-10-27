import { useState } from "react";
import "../sortby.css";

function Sortby({ update }) {
  const [selectedOption, setSelectedOption] = useState("default");

  const handleButtonClick = (value) => {
    setSelectedOption(value);
    update(value);
  };

  return (
    <div className="sorby-container">
      <h2>Sort by:</h2>
      <div className="sort-options">
        <button
          className={selectedOption === "default" ? "selected" : ""}
          onClick={() => handleButtonClick("default")}
        >
          All Articles
        </button>
        <button
          className={selectedOption === "created_at" ? "selected" : ""}
          onClick={() => handleButtonClick("created_at")}
        >
          Most Recent
        </button>
        <button
          className={selectedOption === "votes" ? "selected" : ""}
          onClick={() => handleButtonClick("votes")}
        >
          Most Voted
        </button>
        <button
          className={selectedOption === "comment_count" ? "selected" : ""}
          onClick={() => handleButtonClick("comment_count")}
        >
          Comment Count
        </button>
        <button
          className={selectedOption === "topic" ? "selected" : ""}
          onClick={() => handleButtonClick("topic")}
        >
          Topic
        </button>
      </div>
      <p>Arranged by: {selectedOption}</p>
    </div>
  );
}

export default Sortby;
