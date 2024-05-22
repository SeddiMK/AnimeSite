import './SearchHeader.scss';
import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

// store
import { RootState } from '../../store';

// import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

import {
  fetchAnimeSearchSlice,
  searchInpHeader,
} from '../../store/searchSlice';

// type SearchProps = {
//   value: string,
// };

const SearchHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null); // const inputRef = (useRef < HTMLInputElement) | (null > null);
  const formSearchRef = useRef<HTMLFormElement>(null);
  const [limitPar, setLimitPar] = useState(10);

  const [valueSt, setValueSt] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const searchInpValStore = useSelector(
    (state: RootState) => state.searchSlice.searchInpVal
  );

  // кнопка очистки
  // const onClickClear = () => {
  //   setSearchValue('');
  //   setSearchInpVal('');
  // };

  // updateInpSearchValue --// сохраняет ссылку при перерендере----------------
  const updateInpSearchValue = useCallback(
    debounce((inp: string) => {
      setSearchValue(inp);
      dispatch(searchInpHeader(inp));
    }, 350),
    []
  );
  // fthAnimeSearchSlice -----------------------------
  const fthAnimeSearchSlice = () => {
    dispatch(fetchAnimeSearchSlice({ searchInpValStore, limitPar }));
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };
  // const handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // отправить данные в store для поиска
  //   dispatch(searchInpHeader(searchValue));
  // };.length === 0
  // console.log(id);
  // console.log(Boolean(id));

  // onChangeInput ----e: React.ChangeEvent<HTMLInputElement>------------------
  const onChangeInput = () => {
    if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setSearchInpVal(inputRef.current.value);
    }
    if (id && inputRef.current) navigate('/');

    // dispatch(setCurrentPage(1));
  };

  // close in window ----------------------------
  const handleClick = (e) => {
    if (inputRef.current && !formSearchRef.current?.contains(e.target)) {
      setSearchInpBtn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  // ----------------------------------------------
  useEffect(() => {
    if (searchInpVal === '') {
      setSearchInpVal(searchInpVal);
    } else if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setSearchInpVal(inputRef.current.value);
    }
  }, [searchInpVal, searchInpValStore, updateInpSearchValue]);

  // if (searchInpValStore && animeItems.length === 0) {
  //   return <p> Ничего не нашли... &#128524; Пожалуйста измените запрос.</p>;
  // }

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
            value={searchInpVal}
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
