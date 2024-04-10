import { useState, useEffect, useRef } from 'react';
import './Header.scss';

const Header = () => {
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef();

  const onChangeInput = () => {
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
            <li className="menu__item">
              <form className="menu__search" id="navbar-search">
                {searchInpBtn ? (
                  <div className="menu__search-inp">
                    <input
                      value={searchInpVal}
                      onChange={onChangeInput}
                      ref={inputRef}
                      className="search-inp form-control-reset"
                      name="searc-heder"
                      type="text"
                      placeholder="Поиск аниме, манги, людей и персонажей"
                    />

                    <button
                      id="close-menu-search"
                      className="material-symbols-outlined"
                      onClick={() => setSearchInpBtn(false)}>
                      close
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchInpBtn(true)}
                    className="material-symbols-outlined">
                    search
                  </button>
                )}
              </form>
            </li>
            <li className="menu__item">
              <a className="menu__link" id="navbar-login" href="/login">
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
