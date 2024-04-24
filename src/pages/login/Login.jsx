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
        </div>
      </div>
    </main>
  );
};

export default Login;
