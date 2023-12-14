import { useEffect, useState } from "react";
import { useAuth } from "../Context/LoginContext";
import { getTopics, addNewArticle } from "../api/api";
import { useNavigate } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import "../addArticle.css";

function AddArticle() {
  const [post, setPost] = useState(false);
  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState("");
  const [articleTopics, setArticleTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [url, SetUrl] = useState("");

  const { authUser, logedIn } = useAuth();

  useEffect(() => {
    getTopics().then((body) => {
      setTopics(body);
    });
  }, []);
  const navigate = useNavigate();

  function handleSubmit() {
    addNewArticle(article, articleTopics, title, authUser, url).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Your comment was posted succesfully");
          navigate("articles");
        }
      }
    );
  }
  function handleTopic(e) {
    console.log(e.target.value, "topic");
    setArticleTopics(e.target.value);
  }
  function handleTitle(e) {
    const articleTitle = e.target.value;
    setTitle(articleTitle);
  }
  function handleChange(e) {
    const article = e.target.value;

    setArticle(article);
  }
  function handleUrl(e) {
    const imgUrl = e.target.value;

    SetUrl(imgUrl);
  }

  return (
    <div className="add-article-container">
      <label htmlFor="article-form">Add New Article</label>
      <form className="article-form">
        <br />
        <input type="text" placeholder="your image url" onChange={handleUrl} />
        <br />

        <input type="text" placeholder="title" onChange={handleTitle} />
        <br />
        <select
          name="select-topic"
          id="select-topic"
          defaultValue=""
          required
          onChange={handleTopic}
        >
          <option value="" disabled hidden>
            Select a topic
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="text-area"
          placeholder={
            logedIn
              ? "your article text goes here"
              : "Please log in to add an article.."
          }
          onChange={handleChange}
        ></textarea>
        <p className="author-p">article by {authUser}</p>
        <button type="button" disabled={!logedIn} onClick={handleSubmit}>
          Submit article
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
