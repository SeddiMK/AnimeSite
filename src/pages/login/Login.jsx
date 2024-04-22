import './Login.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/index.ts';

import { FaVk, FaGoogle, FaEnvelope } from 'react-icons/fa';
import InputForm from '../../components/inputForm/LoginForm';
import { Link } from 'react-router-dom';

//state
import { fetchUserList, itemsUsers } from '../../store/userSlice.ts';

const Login = () => {
  const dispath = useAppDispatch();

  const usersItems = useSelector(itemsUsers);

  useEffect(() => {
    // dispath(fetchUserList(email, phonePass));
    dispath(fetchUserList());
  }, [dispath]);

  console.log(usersItems, 'itemsUserskjk');

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
                className="ls-media__link vk-link"
                to="https://vk.com"
                target="blank">
                <span>
                  <FaVk />
                </span>
                <span>Вконтакте</span>
              </Link>
              <Link
                className="ls-media__link google-link"
                to="https://www.google.com"
                target="blank">
                <span>
                  <FaGoogle />
                </span>
                <span>Google</span>
              </Link>
              <Link
                className="ls-media__link mail-link"
                to="https://mail.ru"
                target="blank">
                <span>
                  <FaEnvelope />
                </span>
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
