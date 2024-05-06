import './LoginUserCabinet.scss';
import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

//store -----------------------------------------------------------
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';

// type LoginUserCabinet = () => void | React.JSX.Element;

const LoginUserCabinet = () => {
  // const { id } = useParams();
  // console.log(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, email } = useAuth();

  console.log(isAuth, 'isAuth');

  return isAuth ? (
    <div className="login-user-cabinet">
      <h2>КАБИНЕТ sssssssssssssssssssssssssssss </h2>
      <button
        className="btn"
        onClick={() => {
          dispatch(removeUser());
          navigate('/');
        }}>
        Выйти из кабинета <b>{email}</b>
      </button>
    </div>
  ) : (
    navigate('/')
  );
};

export default LoginUserCabinet;
