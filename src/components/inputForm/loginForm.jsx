import React from 'react';
import './loginForm.scss';
import { Form, Link } from 'react-router-dom';

const loginForm = () => {
  return (
    <main className="main">
      <Form className="form-login-header" action="/login_check" method="post">
        {/* <input
          type="hidden"
          name="_csrf_token"
          value="jlcGrcjGHxymASFMVBE0Zx00LG3XA_c5R9V_OCD5hrQ"
        /> */}
        <div className="form__login form-group">
          <label for="username">Логин</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="username"
            name="_username"
            value=""
            required="required"
          />
        </div>
        <div className="form__pass form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="password"
            name="_password"
            required="required"
          />
        </div>
        <div className="remember-checkbox">
          <label className="custom-control custom-checkbox" for="remember_me">
            <input
              className="custom-control-input mr-1"
              type="checkbox"
              id="remember_me"
              name="_remember_me"
              value="on"
            />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Запомнить меня</span>
          </label>
        </div>
        <div className="form__input form-group">
          <div className="form__btn-block">
            <div className="form__btn btn-inp">
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
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
              <Link to="/register/">Зарегистрировать Аккаунт</Link>
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
};
export default loginForm;
