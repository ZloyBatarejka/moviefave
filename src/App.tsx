import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Favorite from "./pages/Favorite";
import InfoPage from "./pages/InfoPage";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { IAppReducer } from "./interfaces";
import { login, setFavorites } from "./redux/actions";
import Movie from "./pages/Movie";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      dispatch(login(token));
    }
  }, []);
  const logging = useSelector((state: IAppReducer) => state.auth.modal);
  const logged = useSelector((state: IAppReducer) => state.auth.loggId);
  useEffect(() => {
    if (logged) {
      dispatch(setFavorites(logged));
    }
  }, [logged]);
  return (
    <>
      <Navbar />
      {logging ? <Modal /> : null}
      <div className="container">
        <Route exact path="/" component={Main} />
        <Route exact path="/info" component={InfoPage} />
        <Route exact path="/favorite" component={Favorite} />
        <Route exact path="/movie/:name" component={Movie} />
      </div>
    </>
  );
}

export default App;
