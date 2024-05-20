import './Main.scss';
import React, { useEffect, useRef, useState } from 'react';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';
import VideoLink from 'components/videoLink/VideoLink';

// store
import { RootState, useAppDispatch } from '../../store';
import { itemsAnime, fetchAnimeListSlice } from '../../store/animeSlice';
import { useSelector } from 'react-redux';
// ---------------------------------------------------------------------

const Main = () => {
  const dispatch = useAppDispatch();
  const [openFormComent, setOpenFormComent] = useState(false);
  const [formStyle, setFormStyle] = useState({});
  const [lengthComment, setLengthComment] = useState([]); // пока нет ни одного комментария
  let { status } = useSelector((state: RootState) => state.animeSlice);
  const isSearch = useRef(false); // флаг первого рендера
  // const skeletons = [...new Array(10)].map((_, i) => <Skeleton key={i} />);

  const itemsAnimeSlice = useSelector(itemsAnime);
  let aliImgMediaLeft =
    'постер аниме поднятие уровня в одиночку с главным героем'; // данные из бекенда --------------------

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const fetchAnimeSlice = () => dispatch(fetchAnimeListSlice());
  // open form напротив кнопки
  const openForm = () => {
    setOpenFormComent(true);
    setFormStyle({
      left: '38%',
      top: '24rem',
    });
  };
  const openFormComment = () => {
    setOpenFormComent(true);
    setFormStyle({
      left: '33%',
      top: '77rem',
    });
  };

  useEffect(() => {
    //если был первый рендер, то запрашиваем данные
    console.log(!isSearch.current, 'isSearch');
    if (!isSearch) {
      fetchAnimeSlice();
    }
    fetchAnimeSlice();
    isSearch.current = false;
  }, [isSearch]);

  console.log(itemsAnimeSlice, '------itemsAnimeSlice-------');

  const uy = itemsAnimeSlice.map((elem, ind) => {
    console.log(elem, '------elem-------');
  });

  return (
    <main className="main anime">
      <div className="anime__wrap">
        <div className="anime__title"></div>
        <div className="anime__sort"></div>
        <div className="anime__list-items">
          {status === 'loading' ? (
            <p className="loading">Загрузка...</p>
          ) : (
            itemsAnimeSlice.map(
              (
                elem,
                ind // console.log(elem);
              ) => (
                <div key={elem.id + ind} className="anime__item item-anime">
                  <div className="item-anime__img-wrap wrap-img-anime">
                    <img
                      src={elem.screenshots[0]}
                      alt={'изображение аниме ' + elem.screenshots}
                      className="item-anime__image img"
                    />
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </main>
  );
};
export default Main;
