import './Registration.scss';
import React, { useEffect, useRef, useState } from 'react';
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';
import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration';
import { Form, Link, useNavigate } from 'react-router-dom';

// store
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/userSlice';

// icons
import {
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

// animated checkbox
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from 'react-spring';

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

import Particles from '../../containers/particles/Particles';

// validation ------------------------------------------------------------
import { PWD_REGEX, EMAIL_REGEX } from '../../containers/validation/Validation';
// -----------------------------------------------------------------------

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [emailHadle, setEmailHadle] = useState('');

  const inpPassRef = useRef(null);
  const [valInpLog, setValInpLog] = useState('');
  const [valInpPass, setValInpPass] = useState('');
  const [showEye, setShowEye] = useState(true);

  // custom checkbox animated ------------------------------------------
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
  const wrapperRef = useRef(null);

  // validation -------------------перенести в !!!!-----------------------------------------
  const emailRef = useRef(null);
  const errRef = useRef(null);

  // const [user, setUser] = useState('');
  // const [validName, setValidName] = useState(false); //////// validEmail

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

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

  // email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

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

    setSuccess(true);
  };

  // проверка ввода, если email, то передать в setEmail и store ?????--------------

  // ---------------------------------------------------------------------------

  // handleLogin -----------------------------------------------------------
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);

        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        // sendEmailVerification(auth.currentUser).then(() => {
        //   // Email verification sent!
        //   // ...
        // });
        // userCredential.user.sendEmailVerification();
        // auth.signOut();
        // alert('Email отправлен на вашу почту. Письмо может быть в папке спам.');
        navigate(`../login/user/id:${user.uid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // if (errorCode === 'auth/missing-password') alert('Введите пароль!');
        if (errorCode === 'auth/email-already-in-use')
          alert(
            'Такой пользователь существует! Зайдите под своим email и пароль или восстановите пароль.'
          );
      });
  };

  return (
    <main ref={wrapperRef} className="main registaration">
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles wrapperRef={wrapperRef} />
      {/* import Particles from '../../containers/particles/Particles';
const wrapperRef = useRef(null); */}

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
          <InputFormRegistration
            setEmailHadle={setEmailHadle}
            title="Регистрация"
            handleClick={handleRegister}
          />
          {/* <Form
            className="form-login-header"
            // onSubmit={handleSubmit}
            title="register">
            <div className="form__login form-group login">
              <label
                className="form-group__login"
                htmlFor="username-registration">
                Email: <br />
                Прим: asdf@gmail.com
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
                type="email"
                // placeholder="логин или email"
                className="form-control form-control-lg"
                id="username-registration"
                name="_username-registration"
                ref={emailRef}
                autoComplete="off"
                required="required"
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
                  <span>Введите корректный email.</span>
                </p>
              ) : null}
            </div>
            <div className="form__pass form-group pwd">
              <label
                className="form-group__pwd"
                htmlFor="password-registration">
                Пароль: Прим: 123123Aa
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
                    Строчные и прописные латинские буквы(eng), цифры,
                    спецсимволы:{' '}
                  </span>
                  <span aria-label="exclamation mark">!</span>{' '}
                  <span aria-label="at symbol">@</span>{' '}
                  <span aria-label="hashtag">#</span>{' '}
                  <span aria-label="dollar sign">$</span>{' '}
                  <span aria-label="percent">%</span>. Минимум 8 символов.
                </p>
              ) : null}
            </div>
          </Form>  */}
          {/* <div className="form__btn-block">
            <div className="form__btn btn-inp">
              <button
                className="btn btn-lg"
                id="_submit-registration"
                name="_submit-registration"
                value="Войти"
                onClick={() => handleRegister(email, pwd)}>
                Регистрация
              </button>
            </div>
          </div>  */}
        </section>
      </section>
    </main>
  );
};

export default Registration;
