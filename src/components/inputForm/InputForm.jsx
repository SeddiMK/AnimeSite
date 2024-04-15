import React from 'react';
import './InputForm.scss';
import { Form } from 'react-router-dom';

const InputForm = () => {
  return (
    <>
      <Form action="/login_check" method="post">
        <input
          type="hidden"
          name="_csrf_token"
          value="jlcGrcjGHxymASFMVBE0Zx00LG3XA_c5R9V_OCD5hrQ"
        />
        <div class="form-group">
          <label for="username">Логин</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="username"
            name="_username"
            value=""
            required="required"
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            class="form-control form-control-lg"
            id="password"
            name="_password"
            required="required"
          />
        </div>
        <div class="mb-2">
          <label class="custom-control custom-checkbox" for="remember_me">
            <input
              class="custom-control-input mr-1"
              type="checkbox"
              id="remember_me"
              name="_remember_me"
              value="on"
            />
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Запомнить меня</span>
          </label>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-5 col-ul-4">
              <button
                type="submit"
                class="btn btn-lg btn-block btn-primary"
                id="_submit"
                name="_submit"
                value="Войти">
                Войти
              </button>
            </div>
          </div>
        </div>
        <div class="form-group text-center">
          <a href="/resetting/request">Забыли пароль?</a>
        </div>
        <div>
          <div class="row justify-content-center">
            <div class="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-ul-6">
              <a class="btn btn-block btn-review" href="/register/">
                Зарегистрировать Аккаунт
              </a>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default InputForm;
