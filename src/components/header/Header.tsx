import './Header.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchHeader from '../searchHeader/SearchHeader';
import MenuList from '../menuList/MenuList';
import NavMobile from '../navMobile/NavMobile';
import ErrorBoundary from '../../pages/ErrorBoundary/ErrorBoundary';

// store -----------------------------------------------------------------
import { useAppDispatch } from '../../store';
import { removeUser } from '../../store/userSlice';
import { clickRandomHeder } from '../../store/searchSlice';

// hooks -----------------------------------------------------------------
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, id } = useAuth();
  const [toggleRandom, setToggleRandom] = useState(true);

  useEffect(() => {
    dispatch(clickRandomHeder(toggleRandom));
  }, [toggleRandom]);

  // const { email, token, id } = useSelector(
  //   (state: RootState) => state.userSlice
  // );
  // const [burgerClick, setBurgerClick] = useState<boolean>(true);

  return (
    <header className="header">
      {/* <ErrorBoundary fallback={<p>Something went wrong</p>}> */}{' '}
      {/* </ErrorBoundary> */}
      <div className="header__container">
        <Link to="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" />  */}
        </Link>
        <nav className="header__nav menu">
          <ul className="nav-mobile">
            <NavMobile />
          </ul>
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
                onClick={() =>
                  localStorage.setItem(
                    'remeberMe',
                    JSON.stringify(Boolean(false))
                  )
                }
                id="navbar-login">
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
      </div>
    </header>
  );
};

export default Header;
