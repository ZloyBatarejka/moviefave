import React from "react";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";
import Card from "../components/Card";
import MoviePage from "../pages/Movie";

const Main: React.FC = () => {
  const movies = useSelector((state: IAppReducer) => state.search.movies);
  const movieToShow = useSelector((state: IAppReducer) => state.movie.show);
  const moviesList = movies.map((movie) => {
    return <Card key={movie.id} movie={movie} />;
  });

  return (
    <>
      {movieToShow ? <MoviePage /> : null}
      <Form />
      <div className="cards">{moviesList}</div>
    </>
  );
};

export default Main;
