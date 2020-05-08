import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchApiHandler, genreSearch } from "../redux/actions";
import { genreButton } from "../genres";
const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();
  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchApiHandler(title));
    setTitle("");
  };
  const genreSearchHandler = (genre: string): void => {
    dispatch(genreSearch(genreButton[genre]));
  };
  const handlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  return (
    <>
      <form className="form" onSubmit={searchHandler}>
        <div className="input-field col s12">
          <input
            className="form__input"
            placeholder="Введите название фильма"
            type="text"
            value={title}
            onChange={handlInput}
          />
          <span className="helper-text" data-error="wrong" data-success="right">
            Нажмите "Enter"
          </span>
        </div>
      </form>
      <div className="genres">
        <div className="genres__column">
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              genreSearchHandler("action");
            }}
          >
            Боевик
          </button>
          <button
            className="btn genres__title orange accent-4"
            onClick={() => {
              genreSearchHandler("comedy");
            }}
          >
            Комедия
          </button>
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              genreSearchHandler("horror");
            }}
          >
            Ужасы
          </button>
        </div>
        <div className="genres__column">
          <button
            className="btn genres__title orange accent-4"
            onClick={() => {
              genreSearchHandler("fantasy");
            }}
          >
            Фантастика
          </button>
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              genreSearchHandler("drama");
            }}
          >
            Драма
          </button>
          <button
            className="btn genres__title orange accent-4"
            onClick={() => {
              genreSearchHandler("thriller");
            }}
          >
            Триллер
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
