import './SearchHeader.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

// store
import { RootState } from '../../store';

// import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

// type SearchProps = {
//   value: string,
// };

const SearchHeader = () => {
  const dispatch = useDispatch();
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef(null); // const inputRef = (useRef < HTMLInputElement) | (null > null);
  const formSearchRef = useRef(null);

  const [valueSt, setValueSt] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // const searchInpValStore = useSelector(
  //   (state: RootState) => state.filter.searchInpVal
  // );
  // кнопка очистки
  // const onClickClear = () => {
  //     setSearchValue('');
  //     setValueSt('');
  // }

  // updateInpSearchValue ------------------------------------------------
  // const updateInpSearchValue = useCallback(
  //   debounce((inp: string) => {
  //     setSearchValue(inp);
  //     dispatch(searchInpHeader(inp));
  //   }, 250),
  //   []
  // );

  // const handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // отправить данные в store для поиска
  //   dispatch(searchInpHeader(searchValue));
  // };

  // useEffect(() => {
  //   if (value === '') {
  //     setValueSt(value);
  //   } else if (inputRef.current) {
  //     updateInpSearchValue(inputRef.current.value);
  //     setValueSt(inputRef.current.value);
  //   }
  // }, [value, searchInpValStore, updateInpSearchValue]);

  // onChangeInput -------------------------------------------------------
  // const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (inputRef.current) {
  //     updateInpSearchValue(inputRef.current.value);
  //     setValueSt(inputRef.current.value);
  //   }

  //   dispatch(setCurrentPage(1));
  // };
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
