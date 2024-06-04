import React, { FC, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';
import LoginUserCabinet from '../../pages/loginUserCabinet/LoginUserCabinet';
import SearchHeader from '../searchHeader/SearchHeader';

//
import { animateScroll as scroll } from 'react-scroll';
import { ScrollRestoration } from 'react-router-dom';

// store -----------------------------------------------------------------
import { useAppDispatch, RootState } from '../../store';
import { removeUser } from '../../store/userSlice';
// hooks -----------------------------------------------------------------
import { useAuth } from '../../hooks/useAuth';
import { clickRandomHeder } from '../../store/searchSlice';
import MenuList from '../menuList/MenuList';
import NavMobile from '../navMobile/NavMobile';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, email, id } = useAuth();
  const [toggleRandom, setToggleRandom] = useState(true);

  useEffect(() => {
    dispatch(clickRandomHeder(toggleRandom));
  }, [toggleRandom]);

  // const { email, token, id } = useSelector(
  //   (state: RootState) => state.userSlice
  // );
  const [burgerClick, setBurgerClick] = useState<boolean>(true);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </Link>
        <nav className="header__nav menu">
          <ul className="nav-mobile">
            <NavMobile />
          </ul>
          {/* {false ? <MenuList /> : <NavMobile />} */}
          <ul className="menu__list active">
            <MenuList />
          </ul>
          <ul className="menu__list-r">
            <li className="menu__list-r search-header">
              <SearchHeader />
            </li>
            <li
              className="menu__list-r login-btn"
              onClick={() => {
                if (isAuth) {
                  dispatch(removeUser());
                  navigate('/');
                }
              }}>
              <Link
                to={`/login`}
                preventScrollReset={true}
                className="menu__link"
                id="navbar-login"
                onClick={() => {
                  localStorage.setItem(
                    'remeberMe',
                    JSON.stringify(Boolean(false))
                  );

                  // scroll.scrollToTop();
                }}>
                <span className="material-symbols-outlined">
                  {isAuth ? 'logout' : 'login'}
                </span>
                <span>{isAuth ? 'Выйти' : 'Войти'}</span>
              </Link>
            </li>
            {isAuth && (
              <li className="menu__list-r log-user-cab">
                <Link
                  to={`login/user/id:${id}`}
                  className="menu__link"
                  id="cabinet">
                  Кабинет
                </Link>
              </li>
            )}
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
function toggler(): any {
  throw new Error('Function not implemented.');
}
