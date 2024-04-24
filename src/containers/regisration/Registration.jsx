import './Registration.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //Имя пользователя (с ограничением 2-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква):
const PWD_REGEX =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //Пароль (Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов):

const Registration = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // user name
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result, 'result');
    console.log(user, 'user');

    setValidName(result);
  }, [user]);

  // password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result, 'result');
    console.log(pwd, 'pwd');

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // err Mesage
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <main className="main registaration">
      <section className="registaration-block">
        <h2 className="ls-media__title">Регистрация</h2>
        <LinksSocialRegistration />
        {errMsg ? (
          <p ref={errRef} className="errmsg" aris-live="assertive">
            {errMsg}
          </p>
        ) : null}
        {/* <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aris-live="assertive">
        {errMsg}
      </p> */}
        <Form className="form-login-registration">
          {/* <input
          type="hidden"
          name="_csrf_token"
          value="jlcGrcjGHxymASFMVBE0Zx00LG3XA_c5R9V_OCD5hrQ"
        /> */}
          <div className="form__login form-group">
            <label className="form-group__login" htmlFor="username">
              Логин
              {validName && user ? (
                <span className="form-group__icon check">
                  <FaCheck />
                </span>
              ) : null}
              {/* <span className={validName ? 'valid' : 'hide'}>
              <FaCheck />
            </span>  */}
              {!validName && user ? (
                <span className="form-group__icon times">
                  <FaTimes />
                </span>
              ) : null}
              {/* <span className={validName || !user ? 'hide' : 'invalid'}>
              <FaTimes />
            </span> */}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              name="_username"
              ref={userRef}
              autoComplete="off"
              required="required"
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {userFocus && user && !validName ? (
              <p id="uidnote" className="instructions">
                <FaInfoCircle />
                2-20 символов, которыми могут быть буквы и цифры, первый символ
                обязательно буква.
              </p>
            ) : null}
            {/* <p
            id="uidnote"
            className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }>
            <FaInfoCircle />
            2-20 символов, которыми могут быть буквы и цифры, первый символ
            обязательно буква.
          </p> */}
          </div>
          <div className="form__pass form-group">
            <label className="form-group__pwd" htmlFor="password">
              Пароль{' '}
              {validPwd ? (
                <span className="form-group__icon check">
                  <FaCheck />
                </span>
              ) : null}
              {/* <span className={validPwd ? 'valid' : 'hide'}>
              <FaCheck />
            </span> */}
              {!validPwd || !pwd ? (
                <span className="form-group__icon times">
                  <FaTimes />
                </span>
              ) : null}
              {/* <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
              <FaTimes />
            </span> */}
            </label>
            <input
              type="text"
              className=" form-group__inp form-control form-control-lg"
              id="password"
              name="_password"
              required="required"
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {pwdFocus && !validPwd ? (
              <p id="pwdnote" className="instructions">
                <FaInfoCircle />
                Строчные и прописные латинские буквы, цифры, спецсимволы:{' '}
                <span aria-label="exclamation mark">!</span>{' '}
                <span aria-label="at symbol">@</span>{' '}
                <span aria-label="hashtag">#</span>{' '}
                <span aria-label="dollar sign">$</span>{' '}
                <span aria-label="percent">%</span>. Минимум 8 символов.
              </p>
            ) : null}
            {/* <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
            <FaInfoCircle />
            Строчные и прописные латинские буквы, цифры, спецсимволы:{' '}
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>. Минимум 8 символов.
          </p> */}
          </div>
        </Form>
      </section>
    </main>
  );
};

export default Registration;
