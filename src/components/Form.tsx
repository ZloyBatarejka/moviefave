import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchApiHandler, genreSearch, sort } from "../redux/actions";
import { genreButton } from "../genres";
import { IAppReducer } from "../interfaces";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [range, setRange] = useState<string>("1900-2020");
  const [page, setPage] = useState<number>(1);
  const [flag, setFlag] = useState<string>("");
  const max = useSelector((state: IAppReducer) => state.search.pages);
  const movies = useSelector((state: IAppReducer) => state.search.movies);
  const classes = ["controllers", movies.length ? null : "hide"];

  const dispatch = useDispatch();
  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setFlag("");
    dispatch(searchApiHandler(title, 1));
  };
  const rangeSelectionHandler = (str: string): void => {
    setRange(str);
  };
  const genreSearchHandler = (genre: string): void => {
    setPage(1);
    dispatch(genreSearch(genreButton[genre], 1, range));
  };
  const handlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const nextHandler = (): void => {
    setPage(page + 1);
    let next: number = 1;
    if (max) {
      max > 1 ? (next = page + 1) : (next = 1);
    }
    flag.length
      ? dispatch(genreSearch(genreButton[flag], next, range))
      : dispatch(searchApiHandler(title, next));
  };
  const prevHandler = (): void => {
    setPage(page - 1);
    flag.length
      ? dispatch(genreSearch(genreButton[flag], page - 1, range))
      : dispatch(searchApiHandler(title, page - 1));
  };
  const ratingSortHandler = () => {
    dispatch(sort(movies, "rating"));
  };
  const yearSortHandler = () => {
    dispatch(sort(movies, "year"));
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
      <div className="input-field col s12">
        <select
          data-title="Только для жанров"
          className="date"
          onChange={(event) => {
            rangeSelectionHandler(event.target.value);
          }}
        >
          <option value="1900-2020">Все даты</option>
          <option>2019-2020</option>
          <option>2010-2018</option>
          <option>2000-2010</option>
          <option>1990-2000</option>
          <option>1950-1990</option>
        </select>
        <span className="helper-text" data-error="wrong" data-success="right">
          Даты для поиска по жарнам
        </span>
      </div>
      <div className="genres">
        <div className="genres__column">
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              setFlag("action");
              genreSearchHandler("action");
            }}
          >
            Боевик
          </button>
          <button
            className="btn genres__title orange accent-4"
            onClick={() => {
              setFlag("comedy");
              genreSearchHandler("comedy");
            }}
          >
            Комедия
          </button>
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              setFlag("horror");
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
              setFlag("fantasy");
              genreSearchHandler("fantasy");
            }}
          >
            Фантастика
          </button>
          <button
            className="btn genres__title purple darken-4"
            onClick={() => {
              setFlag("drama");
              genreSearchHandler("drama");
            }}
          >
            Драма
          </button>
          <button
            className="btn genres__title orange accent-4"
            onClick={() => {
              setFlag("thriller");
              genreSearchHandler("thriller");
            }}
          >
            Триллер
          </button>
        </div>
      </div>
      <div className={classes.join(" ")}>
        {page === 1 ? null : (
          <button className="btn page" onClick={prevHandler}>
            Назад
          </button>
        )}
        {page === max ? null : (
          <button className="btn page2" onClick={nextHandler}>
            Вперед
          </button>
        )}
        <div className="filters">
          <button className="btn  orange accent-4" onClick={ratingSortHandler}>
            По рейтингу
          </button>
          <button className="btn purple darken-4" onClick={yearSortHandler}>
            По дате
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
