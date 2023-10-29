import { useState } from "react";

function Sortby({ update }) {
  const [selectedOption, setSelectedOption] = useState("default");

  const handleButtonClick = (value) => {
    setSelectedOption(value);
    update(value);
  };

  return (
    <div className="sorby-container">
      <p>Arranged by: {selectedOption}</p>
      <div className="sort-options">
        <button
          className={selectedOption === "created_at" ? "selected" : ""}
          onClick={() => handleButtonClick("created_at")}
        >
          most recent
        </button>
        <button
          className={selectedOption === "votes" ? "selected" : ""}
          onClick={() => handleButtonClick("votes")}
        >
          most voted
        </button>
        <button
          className={selectedOption === "comment_count" ? "selected" : ""}
          onClick={() => handleButtonClick("comment_count")}
        >
          comment count
        </button>
      </div>
    </div>
  );
}

export default Sortby;
