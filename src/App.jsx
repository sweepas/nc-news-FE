import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/About";
import Articles from "./Components/Articles";
import Nav from "./Components/Nav";
import SingleArticle from "./Components/SingleArticle";
import AllComments from "./Components/AllComents";
import AddArticle from "./Components/AddArticle";
import ErrorPage from "./Components/ErrorPage";
import AddTopic from "./Components/AddTopic";
import { LoginProvider } from "./Context/LoginContext";

function App() {
  return (
    <div>
      <LoginProvider>
        {/* <Header /> */}
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/articles/:topic/:sortby" element={<Articles />} />
          <Route
            path="/articles/:article_id/"
            element={<SingleArticle />}
          ></Route>
          <Route
            path="/articles/:article_id/comments"
            element={<AllComments />}
          ></Route>
          <Route path="/articles/add" element={<AddArticle />} />
          <Route path="/topics" element={<AddTopic />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
