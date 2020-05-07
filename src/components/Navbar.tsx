import React from "react";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
  const login = (): void => {
    console.log("hello");
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
            <li className="nav__item">
              <NavLink to="/favorite">Закладки</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/info">Информация</NavLink>
            </li>
            <li className="nav__item">
              <button className="nav__login" onClick={login}>
                Войти
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
