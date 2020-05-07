import React from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Favorite from "./pages/Favorite";
import InfoPage from "./pages/InfoPage";
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Route exact path="/" component={Main} />
        <Route exact path="/info" component={Favorite} />
        <Route exact path="/favorite" component={InfoPage} />
      </div>
    </>
  );
}

export default App;
