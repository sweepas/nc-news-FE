import { useEffect, useState } from "react";
import { getTopics } from "../api/api";
import { useNavigate } from "react-router-dom";

import "../articles.css";
function Topics({ update }) {
  const [topics, setTopics] = useState([]);
  const [selectedOption, setSelectedOption] = useState("default");

  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((body) => {
      setTopics(body);
    });
  }, []);
  function handleChange(value) {
    setSelectedOption(value);
    update(value);
  }
  const handleResetClick = () => {
    navigate("/articles");
    setSelectedOption("");
  };

  return (
    <div className="topic-container-div">
      <p>Topic of choice: {selectedOption}</p>
      <button className="topic-btn" type="reset" onClick={() => handleResetClick("")}>
        All topics
      </button>
      {topics.map((topic) => {
        return (
          <button
          className={`topic-btn ${selectedOption === topic.slug ? "selected" : ""}`}
            key={topic.slug}
            onClick={() => handleChange(topic.slug)}
        
          >
            {topic.slug}
          </button>
        );
      })}
    </div>
  );
}

export default Topics;
