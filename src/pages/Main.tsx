import React from "react";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { IInitialSearchState, IMovieSearchCard } from "../interfaces";
import Card from "../components/Card";
const Main: React.FC = () => {
  const movies = useSelector((state: IInitialSearchState) => state.movies);
  return (
    <>
      <Form />
      <div className="cards">
        {movies.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })}
      </div>
    </>
  );
};

export default Main;
