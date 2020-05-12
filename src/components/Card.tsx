import React from "react";
import { ICardProps } from "../interfaces";
import { genres } from "../genres";
const Card: React.FC<ICardProps> = ({ movie }) => {
  const classes = [
    movie.rating > 7 ? "good" : movie.rating > 4 ? "med" : "bad",
  ];
  const genresList = movie.genresIds.map((id, index) => {
    if (index < 1) {
      return genres[id] + ", ";
    }
    if (index === 1) {
      return genres[id];
    }
  });
  return (
    <div className="card">
      <div className="card__image">
        <img src={movie.imgUrl} alt="poster" />
      </div>
      <div className="card__content">
        <h3 className="card__title">{movie.title}</h3>
        <p className="card__desc">
          {movie.genresIds.length ? genresList : null}{" "}
        </p>
        <p>{movie.date ? movie.date.slice(0, 4) : null}</p>
        <p className="card__rating">
          Оценка: <span className={classes.join(" ")}>{movie.rating}</span>
        </p>
      </div>
      <div className="card__footer">
        <button className="btn orange accent-4 ">О фильме</button>
        <button className="btn purple darken-4">В закладки</button>
      </div>
    </div>
  );
};

export default Card;
