import './FullDescItem.scss';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';
import VideoLink from '../../components/videoLink/VideoLink';
import { clientKodik, kodikApiKey } from '../../kodikcfg';
import { MaterialObject } from 'kodikwrapper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  AnimeItems,
  fetchAnimeListSlice,
  itemsAnime,
} from '../../store/animeSlice';
import { RootState, useAppDispatch } from '../../store';
import {
  fetchAnimeSearchSlice,
  itemsAnimeSearch,
  AnimeSearch,
  setItemsSearch,
} from '../../store/searchSlice';
import { addListAnime } from '../../store/userSlice';
import { Observable } from 'redux';
// import { itemsAnimeSearch } from '../../store/searchSlice';

// ---------------------------------------------------------------------
type FullDescItemProps = {
  flagRandomAnime: boolean;
  elem: {
    link: string;
    title: string;
    title_orig: string;
  };
};

const FullDescItem: React.FC<FullDescItemProps> = ({ flagRandomAnime }) => {
  const { id } = useParams<{
    id;
  }>();

  const dispatch = useAppDispatch();
  const [limitPar, setLimitPar] = useState(100);
  const [searchInpVal, setSearchInpVal] = useState<any>(''); //: string | undefined;

  const playerRef = useRef<null | HTMLDivElement>(null);

  const animeItems = useSelector(itemsAnime);
  const [itemRandomAnime, setItemRandomAnime] = useState('');

  const [idAnime, setIdAnime] = useState('');
  let aliImgMediaLeft = 'постер аниме поднятвным героем'; // данные из бекенда ----------

  // openComment ---------------------------------------------------
  const [openFormComent, setOpenFormComent] = useState(false);
  const [lengthComment, setLengthComment] = useState([]);
  const [formStyle, setFormStyle] = useState({});

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
      top: '58rem',
    });
  };

  // запрос для одного аниме
  // const itemsAnimeSlice = useSelector(itemsAnimeSearch);

  const [itemAnimeSearchId, setItemAnimeSearchId] = useState<MaterialObject[]>(
    []
  );
  const [itemAnimeLink, setItemAnimeLink] = useState('');
  const [itemAnimeTitle, setItemAnimeTitle] = useState('');
  const [itemAnimeTitleOrign, setItemAnimeTitleOrign] = useState('');
  const [itemAnimeOtherTitle, setItemAnimeOtherTitle] = useState('');

  const animeSearchItems = useSelector(itemsAnimeSearch);
  // const animeSearchItems = useRef<AnimeSearch[]>(useSelector(itemsAnimeSearch));
  // const [animeSearchItems, setAnimeSearchItems] = useState(
  //   useSelector(itemsAnimeSearch)
  // );

  const [itemsAnmSch, setItemsAnmSch] = useState([]);

  // const searchInpVal = useSelector(
  //   (state: RootState) => state.searchSlice.idFullDesc
  // );
  const itemAnime = animeSearchItems[0]?.material_data;

  // fthAnimeSearchSlice -----------------------------
  const fthAnimeSearchSlice = (idAnime) => {
    dispatch(fetchAnimeSearchSlice({ searchInpVal, limitPar, idAnime }));
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };
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

  // добавляем данные в redux при первом рендере -----------
  useEffect(() => {
    console.log('11111111111111111111111111 ---------- первый рендер');
    // fthAnimeSlice('');
    // fthAnimeSearchSlice('');
  }, []);
  // -------------------------------------------------------

  useEffect(() => {
    console.log(id, '!!!!!!!!!!!     id--------------------------');

    // // setSearchInpVal(id);
    // setIdAnime(`id=${id}`);

    if (id) fthAnimeSearchSlice(`&id=${id}`);
  }, [id]);

  useEffect(() => {
    // console.log(flagRandomAnime, '----------flagRandomAnime');
    // console.log(animeItems, '----------animeItems');
    // console.log(
    //   flagRandomAnime && animeItems.length !== 0,
    //   '----------flagRandomAnime && animeItems.length !== 0'
    // );

    if (flagRandomAnime && animeItems.length !== 0) {
      const randomItem = [
        ...itemsAnmSch,
        animeItems[Math.floor(Math.random() * animeItems.length)],
      ];
      console.log(randomItem, '----------------------randomItem');

      dispatch(setItemsSearch(randomItem as []));
    }
  }, [flagRandomAnime, animeItems]);

  console.log(itemRandomAnime, 'itemRandomAnime');
  // console.log(flagRandomAnime, 'flagRandomAnime');
  console.log(animeItems, 'animeItems');
  console.log(animeSearchItems, 'animeSearchItems');
  // console.log(itemAnimeSearchId, 'itemAnimeSearchId');
  // console.log(itemAnimeLink, 'itemAnimeLink');

  // --- format date ------------------------------------------------------
  // Input date string
  const dateString = itemAnime?.aired_at;

  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract the month, day, and year
  const month = date.toLocaleString('default', { month: 'long' }); // "April"
  const day = date.getDate().toString().padStart(2, '0'); // "04"
  const year = date.getFullYear(); // 2024

  // Combine the parts into the desired format
  const formattedDate = `${day} ${month} ${year}`; // Output: "04 April 2024"

  // ---------------------------------------------------------

  if (!animeSearchItems) {
    return <p>Загрузка аниме...</p>;
  }
  return (
    <main className="main full-desc-item">
      {animeSearchItems.length !== 0 && animeSearchItems[0] !== undefined ? (
        <>
          <div className="full-desc-item__wrap">
            {/* <VideoLink linkVideo={animeSearchItems[0]?.link} />

            <div className="item-anime__title">
              {animeSearchItems[0]?.other_title}
            </div>

            <div className="item-anime__rating">
              {animeSearchItems[0]?.material_data.shikimori_rating}
              {'/ '}
              {animeSearchItems[0]?.material_data.shikimori_votes}
            </div>
            <div className="item-anime__kljkhkj"></div>
            <div className="item-anime__translation translation">
              <ul className="translation__list">
                {/* <li className="translation__item"> {elem.translation.title}</li>
              </ul>
            </div> */}

            <div className="main__content content">
              <div className="content__media media">
                <div className="media__left">
                  <div className="media__left-image wrap-img-media">
                    <img
                      className="media__left-img img"
                      src={
                        itemAnime?.poster_url
                          ? itemAnime.poster_url
                          : animeSearchItems[0]?.screenshots[0]
                      }
                      alt={`изображение постера аниме ${animeSearchItems[0]?.title}`}
                    />
                  </div>
                  <div className="media__left-buttons">
                    <button
                      className="media__left-buttons-online btn"
                      onClick={() =>
                        playerRef.current?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }>
                      Смотреть онлайн
                    </button>
                    <button
                      className="media__left-buttons-review btn"
                      onClick={() => openForm()}>
                      Написать отзыв
                    </button>
                    <button
                      className="media__left-add-list btn"
                      onClick={() => dispatch(addListAnime(id))}>
                      Добавить в список
                    </button>
                  </div>
                  <div className="media__left-add"></div>
                </div>
                <div className="media__right">
                  <div className="media__rating-block rating">
                    <div className="rating__stars">
                      <span className="rating__star">&#9733;</span>
                      <span className="rating__num">
                        {itemAnime?.shikimori_rating}
                      </span>
                      <span className="rating__votes">
                        {' / '}
                        {itemAnime?.shikimori_votes}
                      </span>
                    </div>
                    <div className="rating__grade-user">
                      <div className="rating__user-star">
                        <RatingStar />
                      </div>
                      <span>Оцените аниме</span>
                    </div>
                  </div>
                  <div className="media__title title-top">
                    <h1 className="title-top__orign">
                      {animeSearchItems[0]?.title}
                    </h1>
                    <ul className="title-top__other-titles">
                      <li>
                        <h4>{itemAnime?.other_titles_en}</h4>
                      </li>
                      <li>
                        <h4>{itemAnime?.other_titles_jp}</h4>
                      </li>
                    </ul>
                  </div>
                  <dl className="media__desc desc-media">
                    <dt className="desc-media__dt">Тип</dt>
                    <dd className="desc-media__dd">{itemAnime?.anime_kind}</dd>

                    <dt className="desc-media__dt">Жанр</dt>
                    <dd className="desc-media__dd">
                      {/* itemAnime.anime_genres.length !== 0 && */}
                      {itemAnime?.anime_genres?.map((el, ind) => (
                        <span key={el + ind}>{el} </span>
                      ))}
                    </dd>

                    <dt className="desc-media__dt">Год</dt>
                    <dd className="desc-media__dd">
                      {animeSearchItems[0]?.year}
                    </dd>

                    <dt className="desc-media__dt">Выпуск</dt>
                    <dd className="desc-media__dd">{formattedDate}</dd>

                    <dt className="desc-media__dt">Длительность</dt>
                    <dd className="desc-media__dd">
                      {itemAnime?.duration ? itemAnime.duration : '23'} мин. ~
                      серия
                    </dd>

                    {/* <dt className="desc-media__dt">Озвучка</dt>
                    <dd className="desc-media__dd">
                      AniDUB, AniLibria, SHIZA Project, Студийная Банда,
                      AnimeVost, AniStar, AniRise, JAM CLUB, Amber, TVShows,
                      Субтитры, Dream Cast, КОМНАТА ДИДИ, AniDub Online
                    </dd> */}

                    <dt className="desc-media__dt">Актеры</dt>
                    <dd className="desc-media__dd">
                      {itemAnime?.actors?.map((el, ind) => (
                        <span key={el + ind}>{el} </span>
                      ))}
                    </dd>

                    <dt className="desc-media__dt">Снят по манге</dt>
                    <dd className="desc-media__dd">
                      {itemAnime?.anime_license_name}
                    </dd>

                    <dt className="desc-media__dt">Рейтинг MPAA</dt>
                    <dd className="desc-media__dd">
                      <span>{itemAnime?.rating_mpaa}</span>
                    </dd>
                    <dt className="desc-media__dt">Возрастные ограничения</dt>
                    <dd className="desc-media__dd">
                      <span>
                        {itemAnime?.minimal_age ? itemAnime.minimal_age : 0}+
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="content__media description">
                <div className="description__text">
                  {itemAnime?.anime_description}
                </div>
              </div>

              <div className="content__screnshots screnshots-fulldesc">
                <h3 className="screnshots-fulldesc__title">Кадры</h3>
                <div className="screnshots-fulldesc__wrp">
                  {animeSearchItems[0]?.screenshots.map((el, ind) => (
                    <div
                      key={el + ind}
                      className="screnshots-fulldesc__wrap-img wrap-img-full-desc">
                      <img
                        className="screnshots-fulldesc img"
                        src={el}
                        alt={`картинка кадра из аниме ${animeSearchItems[0]?.title}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div ref={playerRef} className="content__player player-block">
                <VideoLink linkVideo={animeSearchItems[0]?.link} />
              </div>
              <div className="content__coment comment">
                <div className="comment__add">
                  <button
                    className="comment__btn-send-comment btn"
                    onClick={() => openFormComment()}>
                    Написать комментарий
                  </button>
                </div>
                <div className="comment__body">
                  <h2>Комментарии</h2>

                  <FormMain
                    openFormComent={openFormComent}
                    setOpenFormComent={setOpenFormComent}
                    setLengthComment={setLengthComment}
                    formStyle={formStyle}
                  />

                  {/* {lengthComment.length === 0 && (
                    <p>Пока нет ни одного комментария</p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Загрузка контента... Еще минуту. </div>
        </>
      )}
    </main>
  );
};
export default FullDescItem;
