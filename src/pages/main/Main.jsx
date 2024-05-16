import './Main.scss';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';
import axios from 'axios';

// ---------------------------------------------------------------------
import { Client, VideoLinks } from 'kodikwrapper';
// import { API } from 'shikimori'; // ESM
import cors from 'cors';

// const videos: string[] = ['https://www.youtube.com/embed/ErgOZ5mZYho'];

// ---------------------------------------------------------------------
function generateCodeVerifier() {
  // Generate a random 32-octet sequence
  const codeVerifier = crypto.getRandomValues(new Uint8Array(32));

  // Base64URL encode the octet sequence
  const base64urlEncoded = btoa(String.fromCharCode.apply(null, codeVerifier))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return base64urlEncoded;
}
function generateCodeChallenge() {
  const allowedCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const codeChallenge = Array(43)
    .fill('')
    .map(() =>
      allowedCharacters.charAt(
        Math.floor(Math.random() * allowedCharacters.length)
      )
    )
    .join('');
  return codeChallenge;
}

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
    const parsedLink = await VideoLinks.parseLink({
      link,
      extended: true,
    });
    console.log('0000000000');
    if (!parsedLink.ex.playerSingleUrl)
      throw new Error('не могу получить ссылку на чанк с плеером');

    const endpoint = await VideoLinks.getActualVideoInfoEndpoint(
      parsedLink.ex.playerSingleUrl
    );

    const links = await VideoLinks.getLinks({
      link,
      videoInfoEndpoint: endpoint,
    });

    return links;
  };

  // const [animeUrl, setAnimeUrl] = useState([]);

  useEffect(() => {
    // ------------------------------------------------------------------anidb
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
    const client = new Client({
      token: '45c53578f11ecfb74e31267b634cc6a8',
    });
    client
      .search({
        limit: 3,
        title: 'ван пис',
      })
      .then((response) => response.results.shift())
      .then(async (material) => {
        console.log(material, 'material');

        if (!material) throw new Error('не найдено');

        setAnimeUrl(material.link);

        // getLinksWithActualEndpoint(material.link);

        // console.log(
        //   getLinksWithActualEndpoint(material.link),
        //   'getLinksWithActualEndpoint(material.link'
        // );

        // const links = getLinksWithActualEndpoint(material.link).then(
        //   console.log
        // );

        // const links = await VideoLinks.getLinks({
        //   link: material.link,
        // });
        // const endpoint = await VideoLinks.getActualVideoInfoEndpoint(
        //   parsedLink.ex.playerSingleUrl
        // );

        // const links = await VideoLinks.getLinks({
        //   link,
        //   videoInfoEndpoint: endpoint,
        // });
        // console.log(links);
        // console.log(
        //   getLinksWithActualEndpoint(material.link).then(console.log)
        // );

        // setlinkVideo(links);

        // const animeapi = require('@justalk/anime-api');
        // const download = await animeapi.download('naruto shippuden', 387);
        // const streamsa = await animeapi.stream('naruto shippuden', 387); // options
        // console.log(streamsa);
      });

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
    // var Anidb = require('anidb');
    // var db = new Anidb('someclientid', 'someclientversion');
    // console.log(db);
  }, []);
  // ----------------------------------------------------------------MyAnimeList
  //    const code-verifier = 43*128unreserved
  //  unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
  //  ALPHA = %x41-5A / %x61-7A
  //  DIGIT = %x30-39
  const [codeVerifier, setCodeVerifier] = useState('');

  useEffect(() => {
    const verifier = generateCodeVerifier();
    setCodeVerifier(verifier);
  }, []);

  const [codeChallenge, setCodeChallenge] = useState('');

  useEffect(() => {
    const challenge = generateCodeChallenge();
    setCodeChallenge(challenge);
  }, []);

  useEffect(() => {
    const animeList = async () => {
      //  const aniData = axios.get()
    };
  }, []);

  console.log(codeVerifier, codeChallenge);
  // ---------------------------------------------------api.jikan.moe
  const [animeData, setAnimeData] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimeData(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchEpisodes = async () => {
    try {
      const response = await fetch(
        'https://api.jikan.moe/v4/anime/5114/episodes'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimeEpisodes(data.data);
      console.log(data.data, 'animeEpisodes');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEpisodes();
  }, []);
  //-----------------------------------------
  // const anime = require('anime-dl');

  // const name = 'one piece';
  // const chapter = '732';

  // const animeURL = anime
  //   .getLinksByNameAndChapter(name, chapter)
  //   .then(console.log);
  // console.log(animeURL, 'animeURL');

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

            <div>
              <h1>Top Anime</h1>
              {animeEpisodes ? (
                <ul>
                  {animeEpisodes.map((episode, index) => (
                    <li key={index}>
                      <strong>Episode {episode.mal_id}:</strong> {episode.title}
                      {episode.video_url && (
                        <div>
                          <iframe
                            width="560"
                            height="315"
                            src={episode.video_url}
                            title={`Episode ${episode.number}`}
                            frameBorder="0"
                            allowFullScreen></iframe>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
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
