import './Login.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/index.ts';

import { FaVk, FaGoogle, FaEnvelope } from 'react-icons/fa';
import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration.jsx';
import { Link } from 'react-router-dom';

//state
import { fetchUserList, itemsUsers } from '../../store/userSlice.ts';
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';

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
          <h2 className="ls-media__title">Вход</h2>
          <LinksSocialRegistration />
          <span>-ИЛИ-</span>
        </div>
        <div className="lr-form__inp-form inp-form">
          <InputFormRegistration />
          <div className="form__input form-group">
            <div className="form__btn-block">
              <div className="form__btn btn-inp">
                <Link
                  // to={}
                  type="submit"
                  className="btn btn-lg"
                  id="_submit-login"
                  name="_submit"
                  value="Войти">
                  Войти
                </Link>
              </div>
            </div>
          </div>
          <div className="form__pass-request form-group">
            <Link to="/resetting/request">Забыли пароль?</Link>
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
