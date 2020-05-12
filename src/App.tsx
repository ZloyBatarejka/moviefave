import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Favorite from "./pages/Favorite";
import InfoPage from "./pages/InfoPage";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { IAppReducer } from "./interfaces";
import { login } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    console.log(token);
    if (token) {
      dispatch(login(token));
    }
  }, []);
  const logging = useSelector((state: IAppReducer) => state.auth.modal);
  return (
    <>
      <Navbar />
      {logging ? <Modal /> : null}
      <div className="container">
        <Route exact path="/" component={Main} />
        <Route exact path="/info" component={InfoPage} />
        <Route exact path="/favorite" component={Favorite} />
      </div>
    </>
  );
}

export default App;
