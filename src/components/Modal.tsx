import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/actions";
import { IAppReducer } from "../interfaces";
import { auth } from "../redux/actions";
const Modal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: IAppReducer) => state.auth.modal);
  const [inputLogin, setInputLogin] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const enterHandler = (): void => {
    dispatch(auth(inputLogin, inputPassword, true));
  };
  const closeModalHandler = (): void => {
    document.body.classList.remove("height");
    dispatch(closeModal());
  };
  const loginInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputLogin(event.target.value);
  };
  const passwordInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputPassword(event.target.value);
  };
  const overlayСloseModalHandler = (event: any): void => {
    if (event.target.dataset.exit) {
      closeModalHandler();
    }
  };
  const registerHandler = (): void => {
    dispatch(auth(inputLogin, inputPassword, false));
  };
  return (
    <div
      className="overlay"
      data-exit="true"
      onClick={(event) => {
        overlayСloseModalHandler(event);
      }}
    >
      <div className="mmodal">
        <div className="mmodal__title">
          <h2>Авотризация</h2>
        </div>
        <div className="mmodal__content">
          <form onSubmit={closeModalHandler}>
            <p className="mmodal__input">
              <input
                id="login"
                type="text"
                value={inputLogin}
                onChange={(event) => loginInputHandler(event)}
              />
              <label htmlFor="login">Email</label>
            </p>
            <p className="mmodal__input">
              <input
                id="password"
                type="password"
                onChange={(event) => passwordInputHandler(event)}
              />
              <label htmlFor="password">Password</label>
            </p>
          </form>
        </div>
        <div className="mmodal__footer">
          <button className="btn" onClick={enterHandler}>
            Войти
          </button>
          <button className="btn" onClick={registerHandler}>
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;