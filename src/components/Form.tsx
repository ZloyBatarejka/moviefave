import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchApiHandler } from "../redux/actions";
const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();
  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchApiHandler(title));
    setTitle("");
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
          <button className="btn genres__title purple darken-4">Боевик</button>
          <button className="btn genres__title orange accent-4">Комедия</button>
          <button className="btn genres__title purple darken-4">Ужасы</button>
        </div>
        <div className="genres__column">
          <button className="btn genres__title orange accent-4">
            Фантастика
          </button>
          <button className="btn genres__title purple darken-4">Драма</button>
          <button className="btn genres__title orange accent-4">Триллер</button>
        </div>
      </div>
    </>
  );
};

export default Form;
