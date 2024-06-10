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

import axios from 'axios';
import { kodikApiKey } from '../../kodikcfg';

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

  // const animeItems = useSelector(itemsAnime);//---------------------------

  const [animeItems, setAnimeItems] = useState([]);

  // запрос fetch в redux
  const fthAnimeSlice = async (yearNew) => {
    const resp: any = await axios.get(
      `http://kodikapi.com/list?limit=${limitPar}&type='anime-serial'${yearNew}&with_material_data=true&token=${kodikApiKey}`
    );
    console.log(resp?.data);

    setAnimeItems(resp?.data.results);

    // dispatch(
    //   fetchAnimeListSlice({
    //     limitPar,
    //     yearNew,
    //   })
    // );
    // document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };

  useEffect(() => {
    console.log(animeItems);
  }, [animeItems]);

  //--------------------------------------------------------------

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
  const skeletons = [...new Array(10)].map((_, i) => (
    <Skeleton key={i} widthcard={widthcard} heightcard={heightcard} />
  ));
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

  // if (animeItems.length === 0) {
  //   return <Error />;
  // }
  if (status === 'error') {
    return <Error />;
  }

  // status === 'loading'
  return (
    <>
      {true
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
