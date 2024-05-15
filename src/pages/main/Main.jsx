import './Main.scss';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';

// ---------------------------------------------------------------------
// import { Client, VideoLinks } from 'kodikwrapper';
// import { API } from 'shikimori'; // ESM

// const videos: string[] = ['https://www.youtube.com/embed/ErgOZ5mZYho'];

const Main = () => {
  const [openFormComent, setOpenFormComent] = useState(false);
  const [formStyle, setFormStyle] = useState({});
  const [lengthComment, setLengthComment] = useState([]); // пока нет ни одного комментария

  const [linkVideo, setlinkVideo] = useState(''); //

  let aliImgMediaLeft =
    'постер аниме поднятие уровня в одиночку с главным героем'; // данные из бекенда --------------------

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

  const getLinksWithActualEndpoint = async (link) => {
    // const parsedLink = await VideoLinks.parseLink({
    //   link,
    //   extended: true,
    // });
    // const parsedLink =
    // if (!parsedLink.ex.playerSingleUrl)
    //   throw new Error('не могу получить ссылку на чанк с плеером');
    // const endpoint = await VideoLinks.videoInfoUrl(
    // const endpoint = await VideoLinks.getActualVideoInfoEndpoint(
    //   parsedLink.ex.playerSingleUrl
    // );
    // console.log(VideoLinks.videoInfoUrl);
    // const links = await VideoLinks.getLinks({
    //   link,
    //   videoInfoEndpoint: endpoint,
    // });
    // return links;
  };

  useEffect(() => {
    //     const ass = async () => {
    //       const graphQLFetcher = await () => {
    //       const url = 'https://graphql.anilist.co';
    //       const payload = {
    //         method: 'post',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(),
    //       };
    //       return fetch(url, payload)
    //         .then((response) => response.text())
    //         .then((responseBody) => {
    //           try {
    //             return JSON.parse(responseBody);
    //           } catch (error) {
    //             return responseBody;
    //           }
    //         });
    // };
    //   };
    // const Anidb = require('anidb');
    // const db = new Anidb('Lu46iJ', '1066048');
    // console.log(Anidb.request(), ' ---Anidb.request()');
    // ------------------------------------------------------------------kodik
    // const client = Client.token('45c53578f11ecfb74e31267b634cc6a8');
    // const client = new Client({
    //   token: '45c53578f11ecfb74e31267b634cc6a8',
    // });
    // client
    //   .search({
    //     limit: 1,
    //     title: 'ван пис',
    //   })
    //   .then((response) => response.results.shift())
    //   .then(async (material) => {
    //     if (!material) throw new Error('не найдено');
    //     // getLinksWithActualEndpoint(material.link).then(console.log);
    //     const links = await VideoLinks.getLinks({
    //       link: material.link,
    //     });
    //     console.log(links);
    //     // console.log(
    //     //   getLinksWithActualEndpoint(material.link).then(console.log)
    //     // );
    //     console.log(material);
    //     // setlinkVideo(links);
    //   });
    //----------------------------------------------------------------------shikimori
    // OR
    // const { API } = require('shikimori'); // CommonJS
    // // Create Shikimori API client, without auth
    //   const shikimori = new API();
    //   shikimori.animes;
    //   shikimori.animes
    //     .get({
    //       search: 'восхождение в тени',
    //     })
    //     .then((animes) => {
    //       console.log(animes);
    //       animes.map((anime) => `id: ${anime.id} | name: ${anime.name}`);
    //     });
    // ---------------------------------------------------------------------anidb
    var Anidb = require('anidb');
    var db = new Anidb('someclientid', 'someclientversion');
    console.log(db);
  }, []);

  return (
    <main className="main">
      <div className="main__wrap">
        <div className="main__content content">
          <div className="content__media media">
            <div className="media__left">
              <div className="media__left-image">
                <img
                  className="media__left-img img"
                  src={srcImg}
                  alt={aliImgMediaLeft}
                />
              </div>
              <div className="media__left-buttons">
                <button className="media__left-buttons-online btn">
                  Смотреть онлайн
                </button>
                <button
                  className="media__left-buttons-review btn"
                  onClick={() => openForm()}>
                  Написать отзыв
                </button>
                <button className="media__left-add-list btn">
                  Добавить в список
                </button>
              </div>
              <div className="media__left-add"></div>
            </div>
            <div className="media__right">
              <div className="media__rating-block rating">
                <div className="rating__stars">
                  <span className="rating__num">8,7</span>
                  <span> / 10</span>
                </div>
                <div className="rating__grade-user">
                  <div className="rating__user-star">
                    <RatingStar />
                  </div>
                  <span>Оцените аниме</span>
                </div>
              </div>

              <dl className="media__desc desc-media">
                <dt className="desc-media__dt">Тип</dt>
                <dd className="desc-media__dd">ТВ Сериал</dd>

                <dt className="desc-media__dt">Жанр</dt>
                <dd className="desc-media__dd">Приключения, Фэнтези, Экшен</dd>

                <dt className="desc-media__dt">Год</dt>
                <dd className="desc-media__dd">2024</dd>

                <dt className="desc-media__dt">Длительность</dt>
                <dd className="desc-media__dd">23 мин. ~ серия</dd>
                <dt className="desc-media__dt">Озвучка</dt>
                <dd className="desc-media__dd">
                  AniDUB, AniLibria, SHIZA Project, Студийная Банда, AnimeVost,
                  AniStar, AniRise, JAM CLUB, Amber, TVShows, Субтитры, Dream
                  Cast, КОМНАТА ДИДИ, AniDub Online
                </dd>

                <dt className="desc-media__dt">Главные герои</dt>
                <dd className="desc-media__dd">Джину Сон</dd>

                <dt className="desc-media__dt">Снят по манге</dt>
                <dd className="desc-media__dd">Поднятие уровня в одиночку</dd>

                <dt className="desc-media__dt">Возрастные ограничения</dt>
                <dd className="desc-media__dd">
                  <span>18+</span>
                </dd>
              </dl>
            </div>
          </div>
          <div className="content__media description">
            <div className="description__title">Здесь заголовок</div>
            <div className="description__text">
              Давно выяснено, что при оценке дизайна и композиции читаемый текст
              мешает сосредоточиться. Lorem Ipsum используют потому, что тот
              обеспечивает более или менее стандартное заполнение шаблона, а
              также реальное распределение букв и пробелов в абзацах, которое не
              получается при простой дубликации "Здесь ваш текст.. Здесь ваш
              текст.. Здесь ваш текст.." Многие программы электронной вёрстки и
              редакторы HTML используют Lorem Ipsum в качестве текста по
              умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
              показывает, как много веб-страниц всё ещё дожидаются своего
              настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
              много версий. Некоторые версии появились по ошибке, некоторые -
              намеренно (например, юмористические варианты).
            </div>
          </div>
          <div className="content__player player-block">
            <div className="player-block__title">
              <strong>
                Смотреть аниме «Поднятие уровня в одиночку» онлайн
              </strong>
              <span className="player-block__age-rating">18+</span>
            </div>
            <div className="player-block__player">
              <ReactPlayer
                light
                // playIcon={}
                // url={videos}
                url={linkVideo}
                width="100%"
                height="100%"
                playing
              />
            </div>
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

              {lengthComment.length === 0 && (
                <p>Пока нет ни одного комментария</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;
