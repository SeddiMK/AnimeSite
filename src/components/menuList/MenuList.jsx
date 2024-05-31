import React, { useState, useEffect, useRef } from 'react';
import './MenuList.scss';

import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, RootState } from '../../store';
import { clickRandomHeder } from '../../store/searchSlice';

const MenuList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [toggleRandom, setToggleRandom] = useState(true);

  useEffect(() => {
    dispatch(clickRandomHeder(toggleRandom));
  }, [toggleRandom]);

  return (
    <>
      <li className="menu__item">
        <NavLink to="/" className="menu__link">
          Аниме
        </NavLink>
      </li>
      {/* <li className="menu__item">
    <NavLink to="/manga" className="menu__link">
      Манга
    </NavLink>
  </li> */}
      <li className="menu__item">
        <NavLink to="/new" className="menu__link">
          New!
        </NavLink>
      </li>

      <li className="menu__item">
        {/* to="/random-anime" */}
        <NavLink
          to="/random-anime"
          className="menu__link"
          onClick={() => setToggleRandom(!toggleRandom)}>
          Случайное аниме
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink to="/contacts" className="menu__link">
          Контакты
        </NavLink>
      </li>
    </>
  );
};

export default MenuList;
