import { useEffect, useState } from "react";
import { getTopics } from "../api/api";
import { NavLink } from "react-router-dom";

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((body) => {
      setTopics(body);
    });
  }, []);

  return (
    <div>
      <div>
        {topics.map((topic) => {
          return (
            <NavLink
              className="nav-link"
              to={`/articles/${topic.slug}`}
              key={topic.slug}
            >
              {" "}
              | {topic.slug} |{" "}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Topics;
