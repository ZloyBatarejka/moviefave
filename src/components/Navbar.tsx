import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal, logout } from "../redux/actions";
import { useSelector } from "react-redux";
import { IAppReducer } from "../interfaces";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const openModalHandler = (): void => {
    document.body.classList.add("height");
    dispatch(openModal());
  };
  const loggedIn = useSelector((state: IAppReducer) => state.auth.loggId);
  const logoutHandler = (): void => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="nav indigo darken-4">
        <div className="nav-wrapper ">
          <NavLink exact to="/" className="nav__logo">
            Batarejka
          </NavLink>
          <ul id="nav__list" className="right">
            <li className="nav__item">
              <NavLink exact to="/">
                Главная
              </NavLink>
            </li>
            {!loggedIn ? null : (
              <li className="nav__item">
                <NavLink to="/favorite">Закладки</NavLink>
              </li>
            )}
            <li className="nav__item">
              <NavLink to="/info">Информация</NavLink>
            </li>
            {loggedIn ? (
              <li className="nav__item">
                <button className="nav__login" onClick={logoutHandler}>
                  Выйти
                </button>
              </li>
            ) : (
              <li className="nav__item">
                <button className="nav__login" onClick={openModalHandler}>
                  Войти
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
