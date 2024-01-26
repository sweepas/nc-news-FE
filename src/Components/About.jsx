import "../home.css";

function About() {
  return (
    <div className="home-container">
      <h1>Northcoders News</h1>
      <h3>Project Description</h3>
      <p>
        This project is a web App that allows us to access and manipulate data
        stored in an SQL database served utilising a custom API. User can create
        an account, add or remove new articles, comments, topics. Vote for
        favorite comments and topics if signed in. Sort articles by topic, date
        added or by other users interactions with an article(most voted, comment
        count).
      </p>
      <h3>Requirements</h3>
      <p>node.js v20.5.1</p>
      <h3>Installation</h3>
      <p>To get started with this project, follow these steps:</p>
      <p>Clone the Repository:</p>
      <a href="https://github.com/sweepas/nc-news-FE">
        https://github.com/sweepas/nc-news-FE
      </a>
      <ol>
        <li>
          1. Clone the project repository from GitHub using the following
          command: $git clone repository_url
        </li>
        <li>2. Navigate to project folder using $cd project-name</li>
        <li>3. Install the project dependencies using npm: $npm install</li>
        <li>4. To run the app in dev enviroment: $npm run dev</li>
      </ol>
    </div>
  );
}
export default About;
