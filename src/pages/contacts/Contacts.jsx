import './Contacts.scss';
import { FaSkype, FaGithub, FaEnvelope, FaLink } from 'react-icons/fa';

// import mailLogo from '../../assets/image/icon/gmail.png';
// import githubLogo from '../../assets/image/icon/gitHub.png';
// import skypeLogo from '../../assets/image/icon/skype.png';

const Contacts = () => {
  return (
    <main className="main contacts">
      <div className="description-contacts">
        <div className="description">
          <p className="description__skils"></p>
          <p className="description__steck"></p>
          <p>
            Данное приложение разаработано с применением библиотеки React, а так
            же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, БЭМ, SCSS,
            Mobile-First. Backend реализован в mockapi.io.
          </p>{' '}
          <p>
            Технологии: - **ReactJS 18** - **TypeScript** - **Redux Toolkit**
            (хранение данных) - **React Router v6** (навигация) - **Axios +
            Fetch** (отправка запроса на бэкенд) - React Hooks (хуки) - Prettier
            (форматирование кода) - CSS-Modules / SCSS (стилизация) - React
            Content Loader (скелетон) - React Pagination (пагинация) -
            Lodash.Debounce - Code Splitting, React Loadable, useWhyDidYouUpdate
          </p>
          <p>
            <b>Здесь реализовано:</b> мгновенный поиск, категории товаров,
            сортировка товаров,skeletons(показывает образ товаров во время
            запроса с бекенда), preloader, lasy-loading.
          </p>
        </div>
        <div className="contacts">
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
                  href="https://github.com/SeddiMK"
                  target="_blank"
                  rel="noreferrer">
                  <span className="contact__icon icon-wrp">
                    <FaLink />
                  </span>
                  <span>React-cart_shop_redux</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
