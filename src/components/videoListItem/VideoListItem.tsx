import './VideoListItem.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Error from '../../pages/error/Error';

// skeleton
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from '../../containers/sceleton/Skeleton';

// store
import { RootState, useAppDispatch } from '../../store';
import { fetchAnimeListSlice, itemsAnime } from '../../store/animeSlice';
import { setIdFullDesc } from '../../store/searchSlice';

import { useSelector } from 'react-redux';

// ---------------------------------------------------------------------

type VideoListItemProps = {
  flagMain: boolean;
  flagNewList: boolean;
};

const VideoListItem: React.FC<VideoListItemProps> = ({
  flagNewList,
  flagMain,
}) => {
  const dispatch = useAppDispatch();

  const isMount = useRef(false); // флаг первого рендера

  let { status } = useSelector((state: RootState) => state.animeSlice);
  // search param ----------------------------------------------
  const [limitPar, setLimitPar] = useState(100);

  const animeItems = useSelector(itemsAnime);

  // запрос fetch в redux
  const fthAnimeSlice = (yearNew) => {
    dispatch(
      fetchAnimeListSlice({
        limitPar,
        yearNew,
      })
    );
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };

  //--------------------------------------------------------------

  //если был первый рендер, то запрашиваем данные
  // useEffect(() => {
  //   // console.log(!isMount.current, '!isMount.current');
  //   if (!isMount.current) {
  //     console.log('yearNew fetchAnimeSlice() ---- ANIME');
  //     setYearNew(new Date().getFullYear());
  //     fthAnimeSlice();

  //     // dispatch(setItemsSearch([]));
  //   }
  //   isMount.current = true; //isMount
  // }, []);

  useEffect(() => {
    if (flagMain) {
      fthAnimeSlice('');

      // dispatch(setItemsSearch([]));
    }

    if (flagNewList) {
      fthAnimeSlice(`&year=${new Date().getFullYear()}`);
    }
  }, [flagMain, flagNewList]);

  const [heightcard, setheightcard] = useState(0);
  const [widthcard, setwidthcard] = useState(0);
  // useRef allows us to "store" the div in a constant,
  // and to access it via observedDiv.current
  const refCard = useRef<any>(null);

  useEffect(() => {
    if (!refCard.current) {
      // we do not initialize the observer unless the ref has
      // been assigned
      return;
    }

    // we also instantiate the resizeObserver and we pass
    // the event handler to the constructor
    const resizeObserver = new ResizeObserver(() => {
      if (refCard.current?.offsetWidth !== widthcard) {
        setwidthcard(refCard.current?.offsetWidth);
      }
      if (refCard.current?.offsetHeight !== heightcard) {
        setheightcard(refCard.current?.offsetHeight);
      }
    });

    // the code in useEffect will be executed when the component
    // has mounted, so we are certain observedDiv.current will contain
    // the div we want to observe
    resizeObserver.observe(refCard.current);

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing
    // the div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [animeItems, refCard.current?.clientWidth]);

  // useEffect(() => {
  //   if (widthcard !== undefined) {
  //     // dispatch(sizeCardW(widthcard));
  //     // dispatch(sizeCardH(heightcard));
  //   }
  // }, [widthcard, heightcard]);

  const skeletons = [...new Array(10)].map((_, i) => (
    <Skeleton key={i} widthcard={widthcard} heightcard={heightcard} />
  ));

  // console.log(refCard, refCard.current?.clientWidth);
  // console.log(widthcard, heightcard);

  // fthAnimeSearchSlice -------------------------------------------------
  // useEffect(() => {
  //   // console.log(animeSearchItems, 'animeSearchItems');

  //   if (searchInpValStore) {
  //     console.log(
  //       searchInpValStore,
  //       'searchInpValStore in useEffect---------0000000000000000000000'
  //     ); // && animeSearchItems.length === 0
  //     // setTitlePar(searchInpValStore);
  //     fthAnimeSearchSlice();
  //   }
  // }, [searchInpValStore]);

  // useEffect(() => {
  //   // console.log(animeSearchItems, 'animeSearchItems');

  //   if (searchInpValStore) {
  //     console.log(
  //       searchInpValStore,
  //       'searchInpValStore in useEffect---------1111111111111111111111111'
  //     ); // && animeSearchItems.length === 0
  //     // setTitlePar(searchInpValStore);
  //     setItemsAnimeSlice(animeSearchItems);
  //   }
  // }, [searchInpValStore]);

  // fthAnimeSlice -------------------------------------------------
  // useEffect(() => {
  //   console.log(animeItems, 'animeItems шт useEffect');

  //   if (itemsAnimeSlice.length === 0) {
  //     console.log('setItemsAnimeSlice(animeItems);');

  //     // fthAnimeSlice();
  //     setItemsAnimeSlice(animeItems);
  //   }

  //   // if (searchInpValStore && animeSearchItems.length === 0) {
  //   //   console.log('setItemsAnimeSlice(animeItems)');

  //   //   fthAnimeSearchSlice();
  //   //   setItemsAnimeSlice(animeSearchItems);
  //   // }
  // }, [animeItems]);

  // console.log(animeItems, 'animeItems');
  // console.log(animeSearchItems, 'animeSearchItems');
  // console.log(itemsAnimeSlice, '------itemsAnimeSlice-------');

  if (status === 'error') {
    return <Error />;
  }
  return (
    <>
      {status === 'loading'
        ? skeletons
        : animeItems?.map((elem, ind) => (
            <div key={elem.id + ind} className="anime__item item-anime">
              <Link
                className="item-anime__link-full-desc"
                to={`/fullDescItem/${elem.id}`}
                onClick={() => dispatch(setIdFullDesc(elem.id))}>
                <div className="item-anime__card"></div>
                <div
                  className="item-anime__img-wrap wrap-img-anime"
                  ref={refCard}>
                  {/* {status === 'loading' && (
                    <Skeleton
                      // circle
                      // width="10rem"
                      // style={{
                      //   display: 'block',
                      // }}
                      // height="206px"
                      containerClassName="avatar-skeleton img"
                    />
                  )} */}
                  <img
                    src={
                      elem.material_data?.poster_url
                        ? elem.material_data?.poster_url
                        : elem.screenshots[0]
                    }
                    alt={'изображение аниме ' + elem.title}
                    className="item-anime__image img"
                    // style={{
                    //   display: status === 'loading' ? 'none' : undefined,
                    // }}
                  />
                </div>
                <div className="item-anime__bottom-desc">
                  <div className="item-anime__title">
                    {
                      // status === 'loading' ? (
                      //   <Skeleton
                      //     width="100%"
                      //     count={3}
                      //     containerClassName="avatar-skeleton-text"
                      //   />
                      // ) : (
                      elem.title
                      // )
                    }
                  </div>
                  <div className="item-anime__rating">
                    <span className="item-anime__star">&#9733;</span>
                    {elem.material_data?.shikimori_rating !== undefined ? (
                      <>
                        <span className="item-anime__num">
                          {elem.material_data.shikimori_rating}
                        </span>

                        <span className="item-anime__votes">
                          {' / '}
                          {elem.material_data.shikimori_votes}
                        </span>
                      </>
                    ) : (
                      <span>нет рейтинга</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
    </>
  );
};

export default VideoListItem;
