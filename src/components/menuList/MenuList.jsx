import React, { useState, useEffect } from 'react';
import './MenuList.scss';

import { NavLink } from 'react-router-dom';

// store
import { useAppDispatch } from '../../store';
import { clickRandomHeder } from '../../store/searchSlice';

const MenuList = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

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
