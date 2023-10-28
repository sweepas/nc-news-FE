import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-container">
      <h2>Ooops.. Something went wrong</h2>
      <p>lets try again</p>
      <Link to={`/articles`}></Link>
    </div>
  );
}

export default ErrorPage;
