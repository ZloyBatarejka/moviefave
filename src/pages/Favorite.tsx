import React from "react";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";
import Card from "../components/Card";
const Favorite: React.FC = () => {
  const movies = useSelector((state: IAppReducer) => state.fave.movieList);
  const favoriteList = movies.map((movie) => {
    return <Card key={movie.id} movie={movie} />;
  });
  console.log(movies);
  return <div className="cards">{favoriteList}</div>;
};

export default Favorite;
