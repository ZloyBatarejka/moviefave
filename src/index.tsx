import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import searchReducer from "./redux/searchReducer";
import ReduxThunk from "redux-thunk";

const store = createStore(searchReducer, compose(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
