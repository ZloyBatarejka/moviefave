import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReducer, IMovie } from "../interfaces";
import { setMovieFromStorage, removeMovie } from "../redux/actions";
const Movie: React.FC = () => {
    const dispatch = useDispatch();
    const movie: IMovie =
        useSelector((state: IAppReducer) => state.movie.movie) ||
        JSON.parse(localStorage.getItem("movie") || "undefined");
    dispatch(setMovieFromStorage(movie));
    const genres = movie.genres.map((item, index) =>
        index !== movie.genres.length - 1 ? (
            <span key={item.id}>
                {item.name[0].toUpperCase() + item.name.slice(1)}
                {", "}
            </span>
        ) : (
            <span key={item.id}>{item.name[0].toUpperCase() + item.name.slice(1)}</span>
        ),
    );

    const runtime = `${Math.floor(movie.runtime / 60)} часа ${movie.runtime % 60} минут `;
    const classes = ["rating", movie.rating > 7 ? "good" : movie.rating > 4 ? "med" : "bad"];
    const removeMovieHandler = (): void => {
        document.body.classList.remove("height");
        dispatch(removeMovie());
    };
    const overlayСloseModalHandler = (event: any): void => {
        if (event.target.dataset.exit) {
            document.body.classList.remove("height");
            dispatch(removeMovie());
        }
    };
    const style = {
        top: `${window.pageYOffset}px`,
        bot: `100px`,
        height: `100%`,
    };
    const revenue = movie.revenue.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    return (
        <div className="overlay" style={style} data-exit="true" onClick={overlayСloseModalHandler}>
            <div className="movie">
                <div className="movie__image">
                    <img src={movie.posterImg} alt="postet" />

                    <button className="btn back" onClick={removeMovieHandler}>
                        Закрыть
                    </button>
                </div>
                <div className="movie__content">
                    <h2 className="movie__title">{movie.title}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Дата выхода</td>
                                <td>{movie.date}</td>
                            </tr>
                            {movie.tagline.length ? (
                                <tr>
                                    <td>Слоган</td>
                                    <td>{movie.tagline}</td>
                                </tr>
                            ) : null}
                            <tr>
                                <td>Рэйтинг</td>
                                <td className={classes.join(" ")}>{movie.rating}</td>
                            </tr>
                            <tr>
                                <td>Сборы</td>
                                <td>{revenue}$</td>
                            </tr>
                            <tr>
                                <td>Жанры</td>
                                <td>{genres}</td>
                            </tr>
                            <tr>
                                <td>Продолжительность </td>
                                <td>{runtime}</td>
                            </tr>
                            <tr>
                                <td>Описание </td>
                                <td>{movie.overview}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Movie;
