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

const InputFormRegistration = () => {
  const [valInpLog, setValInpLog] = useState('');
  const [valInpPass, setValInpPass] = useState('');

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
  return (
    <Form className="form-login-header">
      {/* <input
          type="hidden"
          name="_csrf_token"
          value="jlcGrcjGHxymASFMVBE0Zx00LG3XA_c5R9V_OCD5hrQ"
        /> */}
      <div className="form__login form-group">
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
          type="password"
          className="form-control form-control-lg"
          id="password"
          name="_password"
          required="required"
          onChange={changeInpValPass()}
        />
      </div>
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
      <div className="form__input form-group">
        <div className="form__btn-block">
          <div className="form__btn btn-inp">
            <button
              type="submit"
              className="btn btn-lg"
              id="_submit"
              name="_submit"
              value="Войти">
              Войти
            </button>
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
    </Form>
  );
};
export default InputFormRegistration;
