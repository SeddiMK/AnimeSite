import './Registration.scss';
import React, { useEffect, useRef, useState } from 'react';
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';
import InputFormRegistration from '../InputFormRegistration/InputFormRegistration';
import { Link } from 'react-router-dom';

const Registration = () => {
  // const userRef = useRef(null);
  const errRef = useRef(null);

  // const [user, setUser] = useState('');
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState('');
  // const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState('');
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  return (
    <main className="main registaration">
      <section className="registaration-block">
        <h2 className="ls-media__title">Регистрация</h2>
        <section className="lr-form__social-reg-icon">
          <LinksSocialRegistration />
          {errMsg ? (
            <p ref={errRef} className="errmsg" aris-live="assertive">
              {errMsg}
            </p>
          ) : null}
        </section>
        <section className="lr-form__inp-form inp-form">
          <InputFormRegistration />
        </section>
        <div className="form__btn-block">
          <div className="form__btn btn-inp">
            <Link
              // to={`/user:${idUser}`}
              type="submit"
              className="btn btn-lg"
              id="_submit"
              name="_submit"
              value="Войти">
              Регестрация
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
