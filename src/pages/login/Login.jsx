import './Login.scss';
import React from 'react';
import InputForm from '../../components/inputForm/loginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className="main login">
      <div className="form-login-registaration lr-form">
        <div className="lr-form__social-media login-social-media">
          <div className="ls-media__block">
            <div className="ls-media__top">
              <h2 className="ls-media__title">Вход</h2>
              <h3 className="ls-media__text">Через социальные сети</h3>
            </div>
            <div className="ls-media__links">
              <Link
                className="ls-media__link"
                to="https://vk.com"
                target="blank">
                <span>IconVK</span>
                <span>Вконтакте</span>
              </Link>
              <Link
                className="ls-media__link"
                to="https://www.google.com"
                target="blank">
                <span>IconGoogle</span>
                <span>Google</span>
              </Link>
              <Link
                className="ls-media__link"
                to="https://mail.ru"
                target="blank">
                <span>IconMail</span>
                <span>Mail</span>
              </Link>
            </div>
          </div>
          <span>-ИЛИ-</span>
        </div>
        <div className="lr-form__inp-form inp-form">
          <InputForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
