import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </a>
        <nav className="header__nav menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#" className="menu__link">
                Home
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Info
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                New
              </a>
            </li>

            <li className="menu__item">
              <a href="#" className="menu__link">
                Products
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                About us
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Contacts
              </a>
            </li>
            <li className="menu__item">
              <button href="#" className="menu__btn">
                BUY
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
