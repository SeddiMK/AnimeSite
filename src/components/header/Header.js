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
                <span className="material-symbols-outlined">search</span>
                {/* не рендерить если не нужно -------------------------------- */}
                {/* <input
                  className="menu__search form-control-reset"
                  name="q"
                  type="text"
                  placeholder="Поиск аниме, манги, людей и персонажей"
                  autocomplete="off"
                  data-search="true"
                  data-search-id="searchsuggestions"
                  data-ajax-url="/search/all?type=small"
                  data-search-min-query-len="3"
                  data-search-target=".form-control"></input>
                <span id="close-menu-search" className="material-symbols-outlined">
                  close
                </span> */}
              </a>
            </li>
            <li className="menu__item">
              <a className="meny__link" id="navbar-login" href="/login">
                <span className="material-symbols-outlined">logout</span> Войти
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
