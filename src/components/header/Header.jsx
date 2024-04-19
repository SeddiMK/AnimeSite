import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import LoginUserCabinet from '../../pages/loginUserCabinet/LoginUserCabinet';
import SearchHeader from '../searchHeader/SearchHeader';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </Link>
        <nav className="header__nav menu">
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink to="/" className="menu__link">
                Аниме
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/manga" className="menu__link">
                Манга
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/new" className="menu__link">
                New!
              </NavLink>
            </li>

            <li className="menu__item">
              <NavLink to="/random-anime" className="menu__link">
                Случайное аниме
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/contacts" className="menu__link">
                Контакты
              </NavLink>
            </li>
            <li className="menu__item search-header">
              <SearchHeader />
            </li>
            <li className="menu__item login-btn">
              <Link to={`/login`} className="menu__link" id="navbar-login">
                <span className="material-symbols-outlined">login</span> Войти
              </Link>
            </li>
          </ul>
        </nav>

        {/* <div className="menu__authentication">
      
          <button href="#" className="menu__btn">
            Войти
          </button>
          <button href="#" className="menu__btn">
            Регистрация
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
