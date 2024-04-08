import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </a>
        <nav className="header__nav menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="/" className="menu__link">
                Аниме
              </a>
            </li>
            <li className="menu__item">
              <a href="/" className="menu__link">
                Манга
              </a>
            </li>
            <li className="menu__item">
              <a href="/" className="menu__link">
                New!
              </a>
            </li>

            <li className="menu__item">
              <a href="/" className="menu__link">
                Случайное аниме
              </a>
            </li>
            <li className="menu__item">
              <a href="/" className="menu__link">
                Контакты
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__search" id="navbar-search" href="/">
                <svg class="icon icon-lg icon-search">
                  <use href="/"></use>
                </svg>
                <svg class="icon icon-lg icon-close">
                  <use href="/"></use>
                </svg>
                <span>&nbsp;</span>
              </a>
            </li>
            <li className="menu__item">
              <a className="meny__link" href="/login">
                <svg class="icon icon-login ">
                  <use href="#icon-login"></use>
                </svg>
                Войти
              </a>
            </li>
          </ul>
        </nav>

        {/* <div className="menu__authentication">
      
          <button href="#" className="menu__btn">
            Войти
          </button>
          <button href="#" className="menu__btn">
            Регистрация
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
