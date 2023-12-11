import { useEffect, useState } from "react";
import { getTopics } from "../api/api";

function Topics({ update }) {
  const [topics, setTopics] = useState([]);
  const [selectedOption, setSelectedOption] = useState("default");

  useEffect(() => {
    getTopics().then((body) => {
      setTopics(body);
    });
  }, []);
  function handleChange(value) {
    setSelectedOption(value);
    update(value);
  }

  return (
    <div>
      <p>Topic of choice: {selectedOption}</p>
      {topics.map((topic) => {
        return (
          <button key={topic.slug} onClick={() => handleChange(topic.slug)}>
            {topic.slug}
          </button>
        );
      })}
    </div>
  );
}

export default Topics;
