import { useAuth } from "../Context/LoginContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewTopic } from "../api/api";

import "../topics.css";

function AddTopic() {
  const { logedIn } = useAuth();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    addNewTopic(topic, description).then((response) => {
      if (response.status === 201) {
        alert("Your topic was posted succesfully");
        navigate("/articles");
      }
    });
  }
  function handleTopic(e) {
    setTopic(e.target.value);
  }
  function handleChange(e) {
    setDescription(e.target.value);
  }
  return (
    <div className="new-topic-container">
      <label htmlFor="new-topic-form">Add New Topic</label>
      <form className="new-topic-form">
        <input type="text" placeholder="new topic" onChange={handleTopic} />
        <br />
        <input
          type="text"
          className="topic-text-area"
          placeholder={
            logedIn
              ? "your topic description goes here"
              : "Please log in to add a topic.."
          }
          onChange={handleChange}
        />
        <button type="button" disabled={!logedIn} onClick={handleSubmit}>
          Submit topic
        </button>
      </form>
    </div>
  );
}
export default AddTopic;
