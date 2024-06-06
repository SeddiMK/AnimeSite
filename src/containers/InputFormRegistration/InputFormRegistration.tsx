import React, { FC, useState, useEffect, useRef } from 'react';
import './InputFormRegistration.scss';
// import { Form } from 'react-router-dom';

import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
  SpringValue,
} from 'react-spring';

// icons
import {
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

// validation ------------------------------------------------------------
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from '../validation/Validation';

interface FormProps {
  title: string;
  setEmailHadle: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (email: string, password: string) => void;
}

const InputFormRegistration: FC<FormProps> = ({
  title,
  handleClick,
  setEmailHadle,
}) => {
  const inpPassRef = useRef(null);
  const [showEye, setShowEye] = useState(true);

  // custom checkbox animated ---------------------------------------------
  const [isCheckedRemeberMe, setIsCheckedRemeberMe] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkmarkAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isCheckedRemeberMe ? 'var(--btn-send-com)' : '#fff',
    borderColor: isCheckedRemeberMe ? 'var(--btn-send-com)' : '#ddd',
    config: config.gentle,
    ref: checkboxAnimationRef,
  });
  const [checkmarkLength, setCheckmarkLength] = useState<number | null>(null);

  // validation ------------------------------------------------------------
  const emailRef = useRef(null);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  // check box animation ----------------------------------------------------------------
  const checkmarkAnimationStyle: {
    x: SpringValue<number | null>;
  } = useSpring({
    x: isCheckedRemeberMe ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });
  useChain(
    isCheckedRemeberMe
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1] // -> delay by 0.1 seconds
  );

  // email -------------------------------------------------------------------------------
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    // setValidUser(USER_REGEX.test(user));
    if (validEmail && email) setEmailHadle(email); // setEmailHadle,
  }, [email, validEmail]);

  // password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // err Mesage
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  // handleSubmit проверка введеных данных ------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Не правильный ввод');
      return;
    }
    // setSuccess(true);
  };

  // checkbox remember me
  useEffect(() => {
    localStorage.setItem(
      'remeberMe',
      JSON.stringify(Boolean(isCheckedRemeberMe))
    );
  }, [isCheckedRemeberMe]);

  return (
    <>
      <form className="form-login-header" onSubmit={handleSubmit} title="login">
        <div className="form__login form-group">
          <label className="form-group__login" htmlFor="username">
            Email: <br />
            Пример: asdf@gmail.com {'   '} qwer@gmail.com
            <br />
            {validEmail && email ? (
              <span className="form-group__icon check">
                <FaCheck />
              </span>
            ) : null}
            {!validEmail && email ? (
              <span className="form-group__icon times">
                <FaTimes />
              </span>
            ) : null}
          </label>
          <input
            value={email}
            type="text"
            // placeholder="логин или email"
            className="form-control form-control-lg"
            id="username"
            name="_username"
            ref={emailRef}
            autoFocus
            autoComplete="off"
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="uidnote"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          {emailFocus && email && !validEmail ? (
            <p id="uidnote" className="instructions">
              <span>
                <FaInfoCircle />
              </span>
              <span>
                Введите корректный email. В начале и конце пароля, без пробелов
                .
              </span>
              {/* 2-20 символов, которыми могут быть буквы и цифры, первый символ
              обязательно буква. */}
            </p>
          ) : null}
        </div>
        <div className="form__pass form-group">
          <label className="form-group__pwd" htmlFor="password">
            Пароль:
            <br />
            Пример: 123123Aa
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
            // placeholder="пароль"
            ref={inpPassRef}
            type={showEye ? 'password' : 'text'}
            className=" form-group__inp form-control inp-pass form-control-lg"
            id="password"
            name="_password"
            required
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
              <span aria-label="percent">%</span>. Минимум 8 символов. Пробелы
              нельзя.
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
      </div>  */}
        {/* ------------------------------------------------------------------------- */}{' '}
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
                setIsCheckedRemeberMe(!isCheckedRemeberMe);
              }}
            />
            <animated.svg
              style={checkboxAnimationStyle}
              className={`custom-control-indicator checkbox ${
                isCheckedRemeberMe ? 'checkbox--active' : ''
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
                strokeDasharray={
                  checkmarkLength != null ? `${checkmarkLength}` : undefined
                }
                strokeDashoffset={checkmarkAnimationStyle.x as any}
              />
            </animated.svg>
            <span className="custom-control-description">Запомнить меня</span>
          </label>
        </div>{' '}
        <div className="form__btn-block">
          <div className="form__btn btn-inp">
            <button
              className="btn btn-lg"
              id="_submit-login"
              name="_submit"
              value="Войти"
              onClick={() => handleClick(email, pwd)}>
              {title}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default InputFormRegistration;
