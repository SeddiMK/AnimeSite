import './Contacts.scss';
import React, { useRef } from 'react';
import { FaSkype, FaGithub, FaEnvelope, FaLink } from 'react-icons/fa';

import Particles from '../../containers/particles/Particles';

const Contacts = () => {
  const wrapperRef = useRef(null);
  return (
    <main ref={wrapperRef} className="main contacts">
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles wrapperRef={wrapperRef} />

      <div className="contacts__description">
        <div className="contacts__desc-block desc-block">
          {/* <p className="desc-block__skils"></p> */}
          <p className="desc-block__steck">
            <b>Описание проекта:</b>
          </p>
          <p>
            Данное приложение разаработано с применением библиотеки React, а так
            же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, БЭМ, SCSS,
            адаптивная верстка, local-storage.
            <br />
            Данные пользователя, аутентификация реализовано с помощью
            firebase.google, firebase-storage.
            {/* Backend реализован в mockapi.io. */}
          </p>{' '}
          <p>
            <b>Технологии:</b> - **ReactJS 18** - **TypeScript** - **Redux
            Toolkit** (хранение данных) - **Firebase.Google** (хранение данных о
            пользователе, регистрация)- **React Router** (навигация) - **Axios +
            Fetch** (отправка запроса на бэкенд) - React Hooks (хуки) - Prettier
            (форматирование кода) - CSS-Modules / SCSS (стилизация) - React
            Content Loader (скелетон) - Code Splitting - React Loadable -
            Particles.js (анимированный background) - React Transition Group
            (плавный popup добавления в список) - Hamburger React (анимированный
            бургер) - useAuth.ts (свой хук) - Use Resize Observer (динамическое
            отслеживание высоты, ширины блока) - Kodik (база аниме контента).
          </p>
          <p>
            <b>Здесь реализовано:</b> мгновенный поиск, skeletons(показывает
            образ карточек аниме во время запроса с бекенда), preloader.
            Работают все страницы. На странице выбора аниме кнопка "Написать
            отзыв" оставит коментарии ниже. Кнопка "Добавить в список" добавляет
            в redux уникальные id anime. Личный кабинет: валидация логина и
            пароля, кнопка показать пароль, чек бокс- запомнить меня. При
            нажатии на "Забыли пароль" придет автоматическое письмо на указанный
            email при регистрации. Страница регистрации. Вход и регистрация
            через социальные сети пока не реализованно.
          </p>
        </div>

        <div className="contact">
          <p className="contact__text">
            Связь со мной: нажмите на ссылку внизу &darr;
          </p>
          <div className="contact__link">
            <div className="contact__my-contact-block mail-my-contact">
              <b>Mail:</b>{' '}
              <a
                className="my-contact__link"
                href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
                target="_blank"
                rel="noreferrer">
                <span className="contact__icon icon-wrp">
                  {/* <img className="contact__icon img" src={mailLogo} alt="mail" /> */}
                  <FaEnvelope />
                </span>
                <span>web.egorovm@gmail.com</span>
              </a>
            </div>
            <div className="contact__my-contact-block git-hub-my-contact">
              <b>GitHub:</b>{' '}
              <a
                className="my-contact__link"
                href="https://github.com/SeddiMK"
                target="_blank"
                rel="noreferrer">
                <span className="contact__icon icon-wrp">
                  {/* <img
                  className="contact__icon img"
                  src={githubLogo}
                  alt="gitHub"
                /> */}
                  <FaGithub />
                </span>
                <span>SeddiMK</span>
              </a>
            </div>
            <div className="contact__my-contact-block skype-my-contact">
              <b>Skype:</b>{' '}
              <a
                className="my-contact__link"
                href="skype:live:.cid.985f030235657018?add"
                target="_blank"
                rel="noreferrer">
                <span className="contact__icon icon-wrp">
                  {/* <img
                  className="contact__icon img"
                  src={skypeLogo}
                  alt="gitHub"
                /> */}
                  <FaSkype />
                </span>
                <span>Maksim Egorov</span>
              </a>
            </div>
            <div className="contact__my-contact-block link-project-my-contact">
              <b>Link to project from github:</b>{' '}
              <a
                className="my-contact__link"
                href="https://github.com/SeddiMK/React--Send_comment"
                target="_blank"
                rel="noreferrer">
                <span className="contact__icon icon-wrp">
                  <FaLink />
                </span>
                <span>React--Send_comment</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
