import React, { useState, useEffect, useRef } from 'react';
import './InputFormRegistration.scss';
import { Form, Link } from 'react-router-dom';
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from 'react-spring';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';

// validation ------------------------------------------------------------
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //Имя пользователя (с ограничением 2-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква):
const PWD_REGEX =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //Пароль (Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов):
// -----------------------------------------------------------------------

const InputFormRegistration = () => {
  const inpPassRef = useRef(null);
  const [valInpLog, setValInpLog] = useState('');
  const [valInpPass, setValInpPass] = useState('');
  const [showEye, setShowEye] = useState(true);

  // custom checkbox animated
  const [isChecked, setIsChecked] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkmarkAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? 'var(--btn-send-com)' : '#fff',
    borderColor: isChecked ? 'var(--btn-send-com)' : '#ddd',
    config: config.gentle,
    ref: checkboxAnimationRef,
  });
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });
  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1] // -> delay by 0.1 seconds
  );

  const changeInpValLogin = (e) => {
    // console.log(e.current, 'e.current');
  };
  const changeInpValPass = (e) => {
    // console.log(e.current, 'e.current');
  };

  // validation ------------------------------------------------------------
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState('');

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
    // userRef.current.focus(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }, []);

  // user name
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // err Mesage
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);
  // -----------------------------------------------------------------------

  return (
    <Form className="form-login-header">
      <div className="form__login form-group">
        <label className="form-group__login" htmlFor="username">
          Логин
          {validName && user ? (
            <span className="form-group__icon check">
              <FaCheck />
            </span>
          ) : null}
          {!validName && user ? (
            <span className="form-group__icon times">
              <FaTimes />
            </span>
          ) : null}
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          id="username"
          name="_username"
          value={email}
          ref={userRef}
          autoComplete="off"
          required="required"
          onChange={(e) => setUser(e.target.value)}
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          onChange={(e) => setEmail(e.target.value)}
        />
        {userFocus && user && !validName ? (
          <p id="uidnote" className="instructions">
            <span>
              <FaInfoCircle />
            </span>
            <span>
              2-20 символов, которыми могут быть буквы и цифры, первый символ
              обязательно буква.
            </span>
          </p>
        ) : null}
      </div>
      <div className="form__pass form-group">
        <label className="form-group__pwd" htmlFor="password">
          Пароль{' '}
          {validPwd ? (
            <span className="form-group__icon check">
              <FaCheck />
            </span>
          ) : null}
          {!validPwd && pwd ? (
            <span className="form-group__icon times">
              <FaTimes />
            </span>
          ) : null}
        </label>
        <input
          value={pwd}
          ref={inpPassRef}
          type={showEye ? 'password' : 'text'}
          className=" form-group__inp form-control inp-pass form-control-lg"
          id="password"
          name="_password"
          required="required"
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby="pwdnote"
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <span className="form__eye" onClick={() => setShowEye(!showEye)}>
          {showEye ? <FaEye /> : <FaEyeSlash />}
        </span>
        {pwdFocus && !validPwd ? (
          <p id="pwdnote" className="instructions">
            <span>
              <FaInfoCircle />
            </span>
            <span>
              Строчные и прописные латинские буквы(eng), цифры, спецсимволы:{' '}
            </span>
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>. Минимум 8 символов.
          </p>
        ) : null}
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* <input
          type="hidden"
          name="_csrf_token"
          value="jlcGrcjGHxymASFMVBE0Zx00LG3XA_c5R9V_OCD5hrQ"
        /> */}
      {/* <div className="form__login form-group">
        <label htmlFor="username">Логин</label>
        <input
          type="text"
          className="form-control form-control-lg"
          id="username"
          name="_username"
          // ref={userRef}
          autoComplete="off"
          required="required"
          // onChange={(e) => setUser(e.target.value)}
          // aria-invalid={validName ? 'false' : 'true'}
          aria-describedby="unidnote"
          // onFocus={() => setUserFocus(true)}
          // onBlur={() => setUserFocus(false)}
        />
      </div>
      <div className="form__pass form-group">
        <label htmlFor="password">Пароль</label>
        <input
          ref={inpPassRef}
          type={showEye ? 'password' : 'text'}
          className="form-control form-control-lg"
          id="password"
          name="_password"
          required="required"
          onChange={changeInpValPass()}
        />
        <span className="form__eye" onClick={() => setShowEye(!showEye)}>
          {showEye ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div> */}
      {/* ------------------------------------------------------------------------- */}

      <div className="remember-checkbox">
        <label
          id="custom-checkbox-login"
          className="custom-control custom-checkbox"
          htmlFor="remember_me">
          <input
            className="custom-control-input"
            type="checkbox"
            id="remember_me"
            name="_remember_me"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          {/* <span
            // className="custom-control-indicator"
            className={`custom-control-indicator checkbox ${
              isChecked ? 'checkbox--active' : ''
            }`}
            // we hide it for screen readers
            aria-hidden="true"></span> */}

          <animated.svg
            style={checkboxAnimationStyle}
            className={`custom-control-indicator checkbox ${
              isChecked ? 'checkbox--active' : ''
            }`}
            // This element is purely decorative so
            // we hide it for screen readers
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none">
            <animated.path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              // stroke={isChecked ? '#fff' : 'none'} // only show the checkmark when `isCheck` is `true`
              ref={(ref) => {
                if (ref) {
                  setCheckmarkLength(ref.getTotalLength());
                }
              }}
              stroke="#fff"
              strokeDasharray={checkmarkLength}
              strokeDashoffset={checkmarkAnimationStyle.x}
            />
          </animated.svg>
          <span className="custom-control-description">Запомнить меня</span>
        </label>
      </div>
    </Form>
  );
};
export default InputFormRegistration;
