import './Login.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Link, useNavigate } from 'react-router-dom';

// firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//store
import { useAppDispatch } from '../../store/index.ts';
import { setUser } from '../../store/userSlice';
import { fetchUserList } from '../../store/userSlice.ts';

import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration.jsx';

import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // handleLogin -----------------------------------------------------------
  const handleLogin = (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);

        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        navigate(`/user:${user.uid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (email && password) alert('Такого пользователя не существует!');
      });
  };

  return (
    <main className="main login">
      <div className="form-login-registaration lr-form">
        <div className="lr-form__social-media login-social-media">
          <h2 className="ls-media__title">Вход</h2>
          <LinksSocialRegistration />
          <span>-ИЛИ-</span>
        </div>
        <div className="lr-form__inp-form inp-form">
          <InputFormRegistration title="Войти" handleClick={handleLogin} />
          <div className="form__input form-group"></div>
          <div className="form__pass-request form-group">
            <Link to="/resetting">Забыли пароль?</Link>
          </div>
          <div className="form__regisration-account">
            <div className="form__regisration-account-block">
              <div className="form__registration-link">
                <Link to="/registration">Зарегистрировать Аккаунт</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
