import React, { useEffect, useState } from "react";
import { ICardProps, IAppReducer } from "../interfaces";
import { genres } from "../genres";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavotire, setMovie, showMovie } from "../redux/actions";
import axios from "axios";
const Card: React.FC<ICardProps> = ({ movie }) => {
    const [favotited, setFavotited] = useState<boolean>(movie.favorited);
    const faveIds = useSelector((state: IAppReducer) => state.fave.faveIds);
    const loggedIn = useSelector((state: IAppReducer) => state.auth.loggId);
    const favorites = useSelector((state: IAppReducer) => state.fave.movieList);
    const dispatch = useDispatch();
    useEffect(() => {
        setFavotited(faveIds.includes(movie.id));
    }, []);
    const classes = [movie.rating > 7 ? "good" : movie.rating > 4 ? "med" : "bad"];
    const genresList = movie.genresIds.map((id, index) => {
        if (index < 1) {
            return genres[id] + ", ";
        }
        if (index === 1) {
            return genres[id];
        }
        return null;
    });
    const showMovieHandler = (): void => {
        document.body.classList.add("height");
    };
    const addFavoriteHandler = (): void => {
        if (loggedIn) {
            movie.favorited = true;
            setFavotited(true);
            dispatch(addFavorite(movie));
            axios.post(`https://moviefave-56a11.firebaseio.com/${loggedIn}.json`, movie);
            return;
        }
        alert("Авторизуйтесь");
    };

    const removeFavoriteHandler = (): void => {
        const newList = favorites.filter((item) => item.id !== movie.id);
        loggedIn && dispatch(removeFavotire(loggedIn, movie.url, newList));
        setFavotited(false);
    };
    const setMovieHandler = (): void => {
        dispatch(setMovie(movie.id));
        showMovieHandler();
    };

    return (
        <div className="card">
            <div className="card__image">
                <img src={movie.imgUrl} alt="poster" />
            </div>
            <div className="card__content">
                <h3 className="card__title">{movie.title}</h3>
                <p className="card__desc">{movie.genresIds.length ? genresList : null} </p>
                <p>{movie.date ? movie.date.slice(0, 4) : null}</p>
                <p className="card__rating">
                    Оценка: <span className={classes.join(" ")}>{movie.rating}</span>
                </p>
            </div>
            <div className="card__footer">
                <button className="btn orange accent-4" onClick={setMovieHandler}>
                    О фильме
                </button>
                {!favotited ? (
                    <button className="btn purple darken-4" onClick={addFavoriteHandler}>
                        В закладки
                    </button>
                ) : (
                    <button className="btn purple darken-4" onClick={removeFavoriteHandler}>
                        Удалить
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
