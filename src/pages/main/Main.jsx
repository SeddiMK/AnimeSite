import './Main.scss';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';
import axios from 'axios';

// ---------------------------------------------------------------------
import { Client, VideoLinks } from 'kodikwrapper';
import { client, auth } from 'node-shikimori';
import pkceChallenge from 'pkce-challenge';
// import { API } from 'shikimori'; // ESM
// import cors from 'cors';

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

  // const getLinksWithActualEndpoint = async (link) => {
  //   const cors = require('cors');
  //   // console.log(cors, '------------cors');

  //   // VideoLinks.parseLink.use(cors());

  //   const parsedLink = await VideoLinks.parseLink({
  //     link,
  //     extended: true,
  //   });

  //   if (!parsedLink.ex.playerSingleUrl)
  //     throw new Error('не могу получить ссылку на чанк с плеером');

  //   const endpoint = await VideoLinks.getActualVideoInfoEndpoint(
  //     parsedLink.ex.playerSingleUrl
  //   );

  //   const links = await VideoLinks.getLinks({
  //     link,
  //     videoInfoEndpoint: endpoint,
  //   });

  //   return links;
  // };

  // -----
  // function convert(input) {
  //   var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var b = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0123456789';
  //   var output = '';

  //   for (var i = 0; i < input.length; i++) {
  //     var char = input[i];
  //     var pos1 = a.indexOf(char);

  //     if (pos1 !== -1) {
  //       output += b[pos1];
  //     } else {
  //       output += char; // If the character is not found in 'a', just append it as is.
  //     }
  //   }

  //   return output;
  // }

  // -----
  const [animeData, setAnimeData] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState(null);
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeUrl, setAnimeUrl] = useState([]);
  const [relateds, setRelateds] = useState([]);
  const [titles, setTitles] = useState([]);
  const [origTitles, setOrigTitles] = useState([]);

  useEffect(() => {
    // ------------------------------------------------------------------kodik
    const client = new Client({
      token: '45c53578f11ecfb74e31267b634cc6a8',
    });

    client
      .search({
        limit: 8,
        title: 'фейри тейл',
        // id: 'serial-52991',
        // kinopoisk_id: '52991',
        // type: 'anime',
      })
      .then((response) => response.results)
      .then(async (material) => {
        // KODIK_API_KEY

        if (!material) throw new Error('не найдено');

        console.log(material, 'materia  search');
        setAnimeData(material);

        const related = [],
          title = [],
          origTitle = [];
        if (material) {
          let f = [];
          for (let item of material) {
            if (f !== item.title) related.push(item);
            title.push(item.title);
            origTitle.push(item.title_orig);
            f = item.title;
          }
        }

        setRelateds([...new Set(related)]);
        setTitles([...new Set(title)]);
        setOrigTitles([...new Set(origTitle)]);

        setAnimeUrl(material[0].link); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

        setAnimeTitle(titles[0] + '. ' + origTitles[0]);
      });

    client
      .list({
        limit: 7,
        title: 'фейри тейл',
        // types: "anime-serial",
      })
      .then((response) => response.results)
      .then(async (material) => {
        console.log(material, 'material list-----------');
      });

    //----------------------------------------------------------------------shikimori
    // OR
    // const { API } = require('shikimori'); // CommonJS
    // // Create Shikimori API client, without auth
    // const shikimori = new API();

    // // shikimori.animes;

    // shikimori.animes
    //   .get({
    //     search: 'восхождение в тени',
    //   })
    //   .then((animes) => {
    //     console.log(animes);

    //     animes.map((anime) => `id: ${anime.id} | name: ${anime.name}`);
    //   });
    // --------------------------------------------------------------------------

    // const shikimori = client();

    // const result = async () => {
    //   await shikimori.animes.byId({
    //     id: 1,
    //   });
    // };

    // console.log(result);
    // //------------------------------------------
    // const { getAccessToken, refreshAccessToken } = auth({
    //   clientId: 'YOUR_CLIENT_ID',
    //   clientSecret: 'YOUR_CLIENT_SECRET',
    // });

    // const accessToken = async () => {
    //   await getAccessToken('YOUR_AUTH_CODE');
    // };
    // console.log(accessToken, 'accessToken'); // действует 1 день
    // //------------------------------------------
    // shikimori.setAccessToken('YOUR_ACCESS_TOKEN');

    // const currentUser = async () => {
    //   await shikimori.users.whoami();
    // };
    // console.log(currentUser);

    // const newAccessToken = async () => {
    //   await refreshAccessToken('YOUR_REFRESH_TOKEN');
    // };
    // console.log(newAccessToken);

    // ---------------------------------------------------------------------anidb
    // var Anidb = require('anidb');
    // var db = new Anidb('someclientid', 'someclientversion');
    // console.log(db);
  }, []);

  // ----------------------------------------------------------------MyAnimeList

  // const [codeVerifier, setCodeVerifier] = useState('');

  // useEffect(() => {
  //   const verifier = generateCodeVerifier();
  //   setCodeVerifier(verifier);
  // }, []);

  // const [codeChallenge, setCodeChallenge] = useState('');

  // useEffect(() => {
  //   const challenge = generateCodeChallenge();
  //   setCodeChallenge(challenge);
  // }, []);

  // useEffect(() => {
  //   const animeList = async () => {
  //     //  const aniData = axios.get()
  //   };
  // }, []);

  // console.log(codeVerifier, codeChallenge);
  // -------------------------------------------------
  // const API = require('@chris-kode/myanimelist-api-v2');

  // const oauth = new API.OAUTH(
  //   '5bf6495461b871364475b51660e78124',
  //   'f71c7a2a62318d70f7e17f87ea82f433c49107413c021068422f8b279a023895'
  // );
  // const pkceChallenge = require('pkce-challenge');

  //save this variable value that contains the code_challenge and code_verification in a database or something
  // const pkce = pkceChallenge();

  // const urlToRedirect = oauth.urlAuthorize(pkce.codeChallenge); // this generate the url that you need to redirect

  //This example is for expressjs, but you only need to do a redirection to the url generated
  // res.redirect(urlToRedirect);

  //get the code that mal give us, and the code_challenge which we have generated before.
  // oauth.accessToken(CODE, CODE_CHALLENGE).then(
  //   ((response) => {
  //     console.log(response, 'response');
  //     //PERFECT
  //     //save all the response at db or something, u will get something like this:
  //     /*{
  //       token_type: 'Bearer',
  //       expires_in: 2678400,
  //       access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4MWExNTIzYzBkZjI0MWNmNDlmZTg1Y2Y2MmQ5ZWU2ZDNjNDJlMGQ3ODIzN2I4ZjQ1NjkzMjUxZDdlYzhjZjIyYTVmNzdjZGY3MmJkMTkyIn0.e...,
  //       refresh_token: 'def502009f00fd0d08d50a7faca228bb4f88fa61df80e70aab290d6431115a16b44dc3e9215b3489a71caf9d594b8803129b6497619928025a420f107efd4560b45eb4e136bc4d0d72...'
  //   }*/
  //   }).catch((err) => {
  //     //ERROR
  //     //do something
  //     console.log(err, 'err accessToken in MAL');
  //   })
  // );

  // //REFRESH TOKEN that we generated before, when we create a Access Token
  // oauth.refreshToken(REFRESH_TOKEN).then(
  //   ((response) => {
  //     console.log(response, 'response');

  //     //PERFECT
  //     //save all the response at db or something, u will get something like this:
  //     /*{
  //           token_type: 'Bearer',
  //           expires_in: 2678400,
  //           access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4MWExNTIzYzBkZjI0MWNmNDlmZTg1Y2Y2MmQ5ZWU2ZDNjNDJlMGQ3ODIzN2I4ZjQ1NjkzMjUxZDdlYzhjZjIyYTVmNzdjZGY3MmJkMTkyIn0.e...,
  //           refresh_token: 'def502009f00fd0d08d50a7faca228bb4f88fa61df80e70aab290d6431115a16b44dc3e9215b3489a71caf9d594b8803129b6497619928025a420f107efd4560b45eb4e136bc4d0d72...'
  //       }*/
  //   }).catch((err) => {
  //     //ERROR
  //     //do something
  //     console.log(err, 'err refreshToken in MAL');
  //   })
  // );

  // const pcke = async () => await pkceChallenge();
  // //first parameter we need a code_challenge
  // res.redirect(oauth.urlAuthorize(pcke.codeChallenge));

  // ---------------------------------------------------api.jikan.moe

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://api.jikan.moe/v4/top/anime');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();

  //     setAnimeData(data.data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const fetchEpisodes = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://api.jikan.moe/v4/anime/5114/episodes'
  //     );
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();

  //     setAnimeEpisodes(data.data);
  //     console.log(data.data, 'animeEpisodes');
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   fetchEpisodes();
  // }, []);
  //-----------------------------------------
  console.log(relateds, titles, origTitles, 'relateds + title + otherTitle');
  console.log(animeData, 'animeData');
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
              <strong>{animeTitle}</strong>
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
              <div className="video">
                <iframe
                  src={animeUrl}
                  width="607"
                  height="360"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay *; fullscreen *"></iframe>
                {/* <iframe
                  src="https://kodik.info/seria/1308704/1efbb47a0b7967370f87548a991f4456/720p"
                  width="607"
                  height="360"
                  frameborder="0"
                  // AllowFullScreen
                  allow="autoplay *; fullscreen *"></iframe> */}
              </div>
              <h1>Top Anime</h1>
              {animeData ? (
                <ul>
                  {/* {animeData.map((episode, index) => (
                    <li key={index}>
                      <strong>Episode {index}:</strong> {episode.title}
                      {episode.video_url && (
                        <div>
                          <iframe
                            width="560"
                            height="315"
                            src={episode.link}
                            title={`Episode ${episode.title}`}
                            frameBorder="0"
                            allowFullScreen></iframe>
                        </div>
                      )}
                    </li>
                  ))} */}
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
