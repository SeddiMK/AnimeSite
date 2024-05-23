import React, { useState, useEffect } from 'react';
import './VideoLink.scss';
import ReactPlayer from 'react-player';

import axios from 'axios';

// kodik---------------------------------------------------------------------
import { clientKodik } from '../../kodikcfg';
import { Client, VideoLinks } from 'kodikwrapper';

// const videos: string[] = ['https://www.youtube.com/embed/ErgOZ5mZYho'];

const VideoLink = ({ linkVideo }) => {
  const [animeData, setAnimeData] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState(null);
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeUrl, setAnimeUrl] = useState([]);
  const [relateds, setRelateds] = useState([]);
  const [titles, setTitles] = useState([]);
  const [origTitles, setOrigTitles] = useState([]);

  // const [linkVideo, setlinkVideo] = useState('');

  useEffect(() => {
    // ------------------------------------------------------------------kodik
    // clientKodik
    //   .search({
    //     limit: 4,
    //     // type: 'anime',
    //     // type: 'anime-serial',
    //     title: 'клевер',
    //     // id: 'serial-52991',
    //     // kinopoisk_id: '52991',
    //   })
    //   .then((response) => response.results)
    //   .then(async (material) => {
    //     if (!material) throw new Error('не найдено');
    //     console.log(material, '-------------------------materia  search');
    //     setAnimeData(material);
    //     const related = [],
    //       title = [],
    //       origTitle = [];
    //     if (material) {
    //       let f = [];
    //       for (let item of material) {
    //         if (
    //           f !== item.title &&
    //           (item.type === 'anime' || item.type === 'anime-serial')
    //         )
    //           related.push(item);
    //         if (item.type === 'anime' || item.type === 'anime-serial') {
    //           title.push(item.title);
    //           origTitle.push(item.title_orig);
    //         }
    //         f = item.title;
    //       }
    //     }
    //     setRelateds([...new Set(related)]);
    //     setTitles([...new Set(title)]);
    //     setOrigTitles([...new Set(origTitle)]);
    //     setAnimeUrl(material[3].link); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    //     setAnimeTitle(titles[0] + '. ' + origTitles[0]);
    //   });
    // clientKodik
    //   .list({
    //     limit: 7,
    //     // title: 'клевер',
    //     // types: 'anime',
    //     types: 'anime-serial',
    //   })
    //   .then((response) => response.results)
    //   .then(async (material) => {
    //     console.log(material, 'material list-----------');
    //   });
  }, []);

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
  console.log();
  //  ----------------------------------------------------------------MyAnimeList
  //   function generateCodeVerifier() {
  //     // Generate a random 32-octet sequence
  //     const codeVerifier = crypto.getRandomValues(new Uint8Array(32));

  //     // Base64URL encode the octet sequence
  //     const base64urlEncoded = btoa(String.fromCharCode.apply(null, codeVerifier))
  //       .replace(/\+/g, '-')
  //       .replace(/\//g, '_')
  //       .replace(/=/g, '');

  //     return base64urlEncoded;
  //   }
  //   function generateCodeChallenge() {
  //     const allowedCharacters =
  //       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  //     const codeChallenge = Array(43)
  //       .fill('')
  //       .map(() =>
  //         allowedCharacters.charAt(
  //           Math.floor(Math.random() * allowedCharacters.length)
  //         )
  //       )
  //       .join('');
  //     return codeChallenge;
  //   }
  //   const [codeVerifier, setCodeVerifier] = useState('');

  //   useEffect(() => {
  //     const verifier = generateCodeVerifier();
  //     setCodeVerifier(verifier);
  //   }, []);

  //   const [codeChallenge, setCodeChallenge] = useState('');

  //   useEffect(() => {
  //     const challenge = generateCodeChallenge();
  //     setCodeChallenge(challenge);
  //   }, []);

  //   useEffect(() => {
  //     const animeList = async () => {
  //       //  const aniData = axios.get()
  //     };
  //   }, []);

  //   console.log(codeVerifier, codeChallenge);
  //   -------------------------------------------------
  //   const API = require('@chris-kode/myanimelist-api-v2');

  //   const oauth = new API.OAUTH(
  //     '5bf6495461b871364475b51660e78124',
  //     'f71c7a2a62318d70f7e17f87ea82f433c49107413c021068422f8b279a023895'
  //   );
  //   const pkceChallenge = require('pkce-challenge');

  //   save this variable value that contains the code_challenge and code_verification in a database or something
  //   const pkce = pkceChallenge();

  //   const urlToRedirect = oauth.urlAuthorize(pkce.codeChallenge); // this generate the url that you need to redirect

  //   This example is for expressjs, but you only need to do a redirection to the url generated
  //   res.redirect(urlToRedirect);

  //   get the code that mal give us, and the code_challenge which we have generated before.
  //   oauth.accessToken(CODE, CODE_CHALLENGE).then(
  //     ((response) => {
  //       console.log(response, 'response');
  //       //PERFECT
  //       //save all the response at db or something, u will get something like this:
  //       /*{
  //         token_type: 'Bearer',
  //         expires_in: 2678400,
  //         access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4MWExNTIzYzBkZjI0MWNmNDlmZTg1Y2Y2MmQ5ZWU2ZDNjNDJlMGQ3ODIzN2I4ZjQ1NjkzMjUxZDdlYzhjZjIyYTVmNzdjZGY3MmJkMTkyIn0.e...,
  //         refresh_token: 'def502009f00fd0d08d50a7faca228bb4f88fa61df80e70aab290d6431115a16b44dc3e9215b3489a71caf9d594b8803129b6497619928025a420f107efd4560b45eb4e136bc4d0d72...'
  //     }*/
  //     }).catch((err) => {
  //       //ERROR
  //       //do something
  //       console.log(err, 'err accessToken in MAL');
  //     })
  //   );

  //   //REFRESH TOKEN that we generated before, when we create a Access Token
  //   oauth.refreshToken(REFRESH_TOKEN).then(
  //     ((response) => {
  //       console.log(response, 'response');

  //       //PERFECT
  //       //save all the response at db or something, u will get something like this:
  //       /*{
  //             token_type: 'Bearer',
  //             expires_in: 2678400,
  //             access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4MWExNTIzYzBkZjI0MWNmNDlmZTg1Y2Y2MmQ5ZWU2ZDNjNDJlMGQ3ODIzN2I4ZjQ1NjkzMjUxZDdlYzhjZjIyYTVmNzdjZGY3MmJkMTkyIn0.e...,
  //             refresh_token: 'def502009f00fd0d08d50a7faca228bb4f88fa61df80e70aab290d6431115a16b44dc3e9215b3489a71caf9d594b8803129b6497619928025a420f107efd4560b45eb4e136bc4d0d72...'
  //         }*/
  //     }).catch((err) => {
  //       //ERROR
  //       //do something
  //       console.log(err, 'err refreshToken in MAL');
  //     })
  //   );

  //   const pcke = async () => await pkceChallenge();
  //   //first parameter we need a code_challenge
  //   res.redirect(oauth.urlAuthorize(pcke.codeChallenge));
  console.log();
  // --------------------------------------${search}-------------api.jikan.moe

  const fetchData = async (search) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setAnimeData(data.data);
      //   console.log(data, 'api.jikan.moe fetchData');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEpisodes = async () => {
    //   /episodes
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setAnimeEpisodes(data.data);
      //   console.log(data.data, 'animeEpisodes api.jikan.moe');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (linkVideo) setAnimeUrl(linkVideo);
    // fetchData();
    // fetchEpisodes();
  }, [linkVideo]);
  //-----------------------------------------
  //   console.log(relateds, titles, origTitles, 'relateds + title + otherTitle');
  //   console.log(animeData, 'animeData');

  return (
    <>
      <div className="player-block__title">
        <strong>{animeTitle}</strong>
        <span className="player-block__age-rating">18+</span>
      </div>
      <div className="player-block__player">
        {/* <ReactPlayer
          light
          // playIcon={}
          // url={videos}
          url={linkVideo}
          width="100%"
          height="100%"
          playing
        />{' '} */}
        <iframe
          src={animeUrl}
          width="607"
          height="360"
          allowFullScreen
          allow="autoplay *; fullscreen *"
        />

        {/* <iframe
          src="https://www.funimation.com/shows/steinsgate"
          width="607"
          height="360"
          frameBorder="0"
          allowFullScreen
          allow="autoplay *; fullscreen *"></iframe> */}
      </div>
    </>
  );
};

export default VideoLink;
