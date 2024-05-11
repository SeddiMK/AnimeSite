import './SearchHeader.scss';
import React, { useState, useRef, useEffect } from 'react';

const SearchHeader = () => {
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef(null);
  const formSearchRef = useRef(null);

  // const id = 2; //  <Link to={`/login/${id}`} !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const onChangeInput = () => {
    // console.log(inputRef.current.value, '-----------onChangeInput');
    if (inputRef.current) {
      setSearchInpVal(inputRef.current.value);
    }
  };

  // close in window ----------------------------
  const handleClick = (e) => {
    if (inputRef.current && !formSearchRef.current.contains(e.target)) {
      setSearchInpBtn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <form
      className="search-header__form"
      ref={formSearchRef}
      id="navbar-search">
      <button
        onClick={() => setSearchInpBtn(!searchInpBtn)}
        type="button"
        className="menu__btn search-header material-symbols-outlined">
        {searchInpBtn ? 'close' : 'search'}
      </button>
      {searchInpBtn && (
        <div className="search-header__search-inp">
          <input
            defaultValue={searchInpVal}
            onChange={() => onChangeInput()}
            ref={inputRef}
            className="search-header__inp form-control-reset"
            name="search-header"
            type="search"
            placeholder="Поиск аниме, манги, людей и персонажей"
          />
        </div>
      )}
    </form>
  );
};

export default SearchHeader;
