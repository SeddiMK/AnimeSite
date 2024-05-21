import './VideoListItem.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../formMain/FormMain';
import RatingStar from '../rating/RatingStar';
import Skeleton from '../../containers/sceleton/Skeleton';
import Error from '../../pages/error/Error';

// store
import { RootState, useAppDispatch } from '../../store';
import {
  fetchAnimeSearchSlice,
  itemsAnimeSearch,
  setItemsSearch,
} from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import VideoListPage from './VideoListItem';
// ---------------------------------------------------------------------

const VideoListItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const [openFormComent, setOpenFormComent] = useState(false);
  const [formStyle, setFormStyle] = useState({});
  const [lengthComment, setLengthComment] = useState([]); // пока нет ни одного комментария

  const isMount = useRef(false); // флаг первого рендера
  const skeletons = [...new Array(10)].map((_, i) => <Skeleton key={i} />); //!!!!!!!!!!!!!!!!!!!
  let { status } = useSelector((state: RootState) => state.animeSlice);

  // search param ----------------------------------------------
  const [titlePar, setTitlePar] = useState('Выпивая в одиночку');
  const [limitPar, setLimitPar] = useState(20);
  // setTitlePar('провожающая');
  const itemsAnimeSlice = useSelector(itemsAnimeSearch);
  // запрос fetch в redux
  const fetchAnimeSlice = () => {
    dispatch(fetchAnimeSearchSlice({ titlePar, limitPar }));
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };

  //--------------------------------------------------------------

  let aliImgMediaLeft = 'постер аниме поднятс главным героем'; // данные из бекенда ------------

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

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
    console.log(!isMount.current, '!isMount.current');
    if (!isMount.current) {
      console.log('fetchAnimeSlice()');
      fetchAnimeSlice();
    }
    isMount.current = true;
  }, [isMount]);

  console.log(itemsAnimeSlice, '------itemsAnimeSlice-------');

  if (itemsAnimeSlice.length === 0) {
    return <p> Ничего не нашли... &#128524; Пожалуйста измените запрос.</p>;
  }

  return (
    <div>
      {status === 'error' ? (
        <Error />
      ) : (
        <>
          {status === 'loading' || itemsAnimeSlice.length === 0 ? (
            <p className="loading-anime-page">Загрузка...</p>
          ) : (
            itemsAnimeSlice?.map((elem, ind) => (
              <div key={elem.id + ind} className="anime__item item-anime">
                <Link to={`/fullDescItem/${elem.id}`}>
                  <div className="item-anime__img-wrap wrap-img-anime">
                    <img
                      src={elem.screenshots[0]}
                      alt={'изображение аниме ' + elem.title}
                      className="item-anime__image img"
                    />
                  </div>
                  <div className="item-anime__title">
                    {elem.title + '. ' + elem.title_orig}{' '}
                  </div>
                  <div className="item-anime__rating">
                    {/* {!!!!!!!!!!!!!!! */}
                  </div>
                  <div className="item-anime__rating">
                    {/* {!!!!!!!!!!!!!!! */}
                  </div>
                </Link>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default VideoListItem;
