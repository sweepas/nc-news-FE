import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../api/api";
import "../comments.css";

function AllComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id)
      .then((body) => {
        setComments(body.comments);
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
