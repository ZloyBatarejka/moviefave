import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";
const Movie = () => {
  const movie =
    useSelector((state: IAppReducer) => state.movie.movie) ||
    JSON.parse(localStorage.getItem("movie") || "undefined");
  return (
    <div>
      {movie ? movie.title : <p>Загрузка</p>}
      <NavLink to="/">
        <button className="btn">Нозад</button>
      </NavLink>
    </div>
  );
};

export default Movie;
