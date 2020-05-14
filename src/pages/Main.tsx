import React from "react";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";
import Card from "../components/Card";
const Main: React.FC = () => {
  const movies = useSelector((state: IAppReducer) => state.search.movies);
  const moviesList = movies.map((movie) => {
    return <Card key={movie.id} movie={movie} />;
  });
  return (
    <>
      <Form />
      <div className="cards">{moviesList}</div>
    </>
  );
};

export default Main;
