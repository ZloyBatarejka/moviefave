import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IAppReducer } from "../interfaces";
import { setMovieFromStorage } from "../redux/actions";
const Movie = () => {
  const dispatch = useDispatch();
  const movie =
    useSelector((state: IAppReducer) => state.movie.movie) ||
    JSON.parse(localStorage.getItem("movie") || "undefined");
  dispatch(setMovieFromStorage(movie));
  return (
    <>
      <NavLink to="/">
        <button className="btn">Нозад</button>
      </NavLink>
    </>
  );
};

export default Movie;
