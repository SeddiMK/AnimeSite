import './Header.scss';
import React, { FC, useState, useEffect } from 'react';
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

  // const { isAuth, id } = useAuth();
  const [toggleRandom, setToggleRandom] = useState(true);

  useEffect(() => {
    dispatch(clickRandomHeder(toggleRandom));
  }, [toggleRandom]);

  // const { email, token, id } = useSelector(
  //   (state: RootState) => state.userSlice
  // );
  // const [burgerClick, setBurgerClick] = useState<boolean>(true);

  return <header className="header"></header>;
};

export default Header;
