import './Login.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Link, useNavigate } from 'react-router-dom';

// firebase
import firebase from 'firebase/compat/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

//store
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/userSlice';
import { fetchUserList } from '../../store/userSlice';

import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration';
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // handleLogin -----------------------------------------------------------
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();

    // Define a function for signing in with email and password
    // const signinWithEmailAndPassword = async (
    //   email,
    //   password,
    //   rememberMe = false
    // ) => {
    //   // Determine the persistence type based on the 'rememberMe' option
    //   const persistence = rememberMe
    //     ? firebase.auth.Auth.Persistence.LOCAL
    //     : firebase.auth.Auth.Persistence.SESSION;

    //   // Set the persistence for the user's session
    //   await firebase.auth().setPersistence(persistence);

    //   // Sign in with the provided email and password
    //   return firebase.auth().signInWithEmailAndPassword(email, password);
    // };

    // =========================================================================
    // signInWithEmailAndPassword(auth, email, password)
    //   .then(({ user }) => {
    //     console.log(user);

    //     // firebase.auth.Auth.Persistence.LOCAL;
    //     console.log(
    //       user.auth.Auth.Persistence.LOCAL,
    //       'firebase.auth.Auth.Persistence.LOCAL'
    //     );

    //     // firebase.auth().setPersistence(this.remember.checked ? fireauth.Auth.Persistence.LOCAL : fireauth.Auth.Persistence.SESSION)
    //     // firebase.auth.Auth.Persistence.LOCAL

    //     // const user = FirebaseAuth.getInstance().getCurrentUser();
    //     // if (user != null) {
    //     //     // Показываем данные
    //     // } else {
    //     //     // Отправляем на авторизацию
    //     // }

    //     dispatch(
    //       setUser({
    //         email: user.email,
    //         token: user.refreshToken,
    //         id: user.uid,
    //       })
    //     );
    //     navigate(`/user:${user.uid}`);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //     if (email && password) alert('Такого пользователя не существует!');
    //   });
    // --------------------------------------------------------------------------
    setPersistence(auth, browserSessionPersistence).then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);

          // firebase.auth().setPersistence(this.remember.checked ? fireauth.Auth.Persistence.LOCAL : fireauth.Auth.Persistence.SESSION)
          // firebase.auth.Auth.Persistence.LOCAL

          dispatch(
            setUser({
              email: user.email,
              token: user.refreshToken,
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
