import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../comments.css";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://nc-news-be-project-lndv.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        return response.data.comments;
      })
      .then((body) => {
        setComments(body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="comment-container">
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <div>
                <p>{comment.created_at}</p>
                <p>{comment.article_id}</p>
                <p>upvotes: {comment.votes}</p>
              </div>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllComments;
