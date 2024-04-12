import { useState, useEffect, useRef } from 'react';
import './Header.scss';

const Header = () => {
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef();

  const onChangeInput = () => {
    console.log(inputRef.current.value, '-----------onChangeInput');
    if (inputRef.current) {
      setSearchInpVal(inputRef.current.value);
    }
  };
  // useEffect(() => {
  //   console.log(searchInpVal, 'searchInpVal');
  //   console.log(inputRef.current, '-----------inputRef.current.value');
  //   // if (inputRef.current.value === '') {
  //   //   setSearchInpVal(inputRef.current.value);
  //   // }
  // }, [searchInpVal]);

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
            <li className="menu__item search">
              <form className="search__form" id="navbar-search">
                <button
                  onClick={() => setSearchInpBtn(true)}
                  className="menu__btn material-symbols-outlined">
                  search
                </button>
                {searchInpBtn && (
                  <div className="search__search-inp">
                    <button
                      id="close-menu-search"
                      className="menu__btn material-symbols-outlined"
                      onClick={() => setSearchInpBtn(false)}>
                      close
                    </button>
                    <input
                      value={searchInpVal}
                      onChange={onChangeInput}
                      ref={inputRef}
                      className="search__inp form-control-reset"
                      name="searc-heder"
                      type="search"
                      placeholder="Поиск аниме, манги, людей и персонажей"
                    />
                  </div>
                )}
              </form>
            </li>
            <li className="menu__item login">
              <a className="menu__link" id="navbar-login" href="/login">
                <span className="material-symbols-outlined">login</span> Войти
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
