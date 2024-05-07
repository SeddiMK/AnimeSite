import './LoginUserCabinet.scss';
import React, { FC, useEffect, useState } from 'react';
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

  const [flagRenfer, setFlagRenfer] = useState(false);
  const { isAuth, email } = useAuth();

  console.log(isAuth, 'isAuth');

  useEffect(() => {
    if (isAuth) setFlagRenfer(isAuth);
  }, [isAuth]);

  return (
    <>
      {isAuth && (
        <section className="login-user-cabinet luc">
          <h2>КАБИНЕТ sssssssssssssssssssssssssssss </h2>
          <button
            className="btn logout-btn"
            onClick={() => {
              dispatch(removeUser());
              navigate('/');
            }}>
            Выйти из кабинета <b>{email}</b>
          </button>
        </section>
      )}
    </>
  );
};

export default LoginUserCabinet;
