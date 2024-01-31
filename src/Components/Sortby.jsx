import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sortby({ update }) {
  const [selectedOption, setSelectedOption] = useState("default");
  const navigate = useNavigate();
  const handleButtonClick = (value) => {
    setSelectedOption(value);
    update(value);
  };
  const handleResetClick = () => {
    navigate("/articles");
    setSelectedOption('')
  };

  return (
    <div className="sorby-container">
      <p>Arranged by: {selectedOption}</p>
      <div className="sort-options">
        <button
          className={selectedOption === "created_at" ? "selected" : ""}
          onClick={() => handleButtonClick("created_at")}
        >
          date
        </button>
        <button
          className={selectedOption === "votes" ? "selected" : ""}
          onClick={() => handleButtonClick("votes")}
        >
          votes
        </button>
        <button
          className={selectedOption === "comment_count" ? "selected" : ""}
          onClick={() => handleButtonClick("comment_count")}
        >
          comments
        </button>
        <button
          type="reset"
          className={selectedOption === "null" ? "selected" : ""}
          onClick={() => handleResetClick("")}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default Sortby;
