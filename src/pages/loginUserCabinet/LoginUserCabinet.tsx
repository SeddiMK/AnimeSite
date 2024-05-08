import './LoginUserCabinet.scss';
import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { getAuth } from 'firebase/auth';

//store -----------------------------------------------------------
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';

// type LoginUserCabinet = () => void | React.JSX.Element;

const LoginUserCabinet = () => {
  // const { id } = useParams();
  // console.log(id);
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(auth, 'auth in logUserCab');
  console.log(user?.displayName, 'user?.displayName in logUserCab');

  const [flagRenfer, setFlagRenfer] = useState(false);
  const { isAuth, email, id } = useAuth();

  useEffect(() => {
    if (isAuth) setFlagRenfer(isAuth);
  }, [isAuth]);

  console.log(user, 'user');

  return (
    <>
      {isAuth && (
        <section className="login-user-cabinet user-cab">
          <div className="user-cab__block-top">
            <h2>Кабинет id:{id}</h2>
            <button
              className="btn logout-btn"
              onClick={() => {
                dispatch(removeUser());
                navigate('/');
              }}>
              Выйти из кабинета <b>{email}</b>
            </button>
          </div>
          <div className="user-cab__block-avatar avatar-block">
            <div className="avatar-block__image">
              <img src="" alt="изображение автарки" className="img" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginUserCabinet;
