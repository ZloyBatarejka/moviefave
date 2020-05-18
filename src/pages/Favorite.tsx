import React from "react";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";
import Card from "../components/Card";
import MoviePage from "../pages/Movie";
const Favorite: React.FC = () => {
    const movies = useSelector((state: IAppReducer) => state.fave.movieList);
    const movieToShow = useSelector((state: IAppReducer) => state.movie.show);
    const favoriteList = movies.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
    });
    return (
        <div className="cards">
            {movieToShow ? <MoviePage /> : null}
            {favoriteList}
        </div>
    );
};

export default Favorite;
