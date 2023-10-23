import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Articles from "./Components/Articles";
import Nav from "./Components/Nav";


function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route patch="/nav"></Route>
        <Route path="/articles" element={<Articles />}></Route>
      </Routes>
    </div>
  );
}

export default App;
