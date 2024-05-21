import './FullDescItem.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../../components/formMain/FormMain';
import RatingStar from '../../components/rating/RatingStar';
import VideoLink from '../../components/videoLink/VideoLink';
import { clientKodik } from '../../kodikcfg';
import { MaterialObject } from 'kodikwrapper';
import { useSelector } from 'react-redux';
import { itemsAnimeSearch } from '../../store/searchSlice';

// ---------------------------------------------------------------------
type FullDescItemProps = {
  elem: {
    link: string;
    title: string;
    title_orig: string;
  };
};

const FullDescItem: React.FC<FullDescItemProps> = () => {
  const { id } = useParams<{
    id: string;
  }>();

  let aliImgMediaLeft = 'постер аниме поднятвным героем'; // данные из бекенда ----------

  // запрос для одного аниме
  const itemsAnimeSlice = useSelector(itemsAnimeSearch);
  const [itemAnimeSearchId, setItemAnimeSearchId] = useState<MaterialObject[]>(
    []
  );
  const [itemAnimeLink, setItemAnimeLink] = useState('');
  const [itemAnimeTitle, setItemAnimeTitle] = useState('');
  const [itemAnimeTitleOrign, setItemAnimeTitleOrign] = useState('');

  useEffect(() => {
    const animeItem = async () => {
      await clientKodik
        .search({ id })
        .then((response) => response.results)
        .then(async (material) => {
          if (!material) throw new Error('не найдено');

          console.log(material, '---------- ----search id-------------');

          if (itemAnimeSearchId) {
            setItemAnimeSearchId(material);
            setItemAnimeLink(material[0].link);
            setItemAnimeTitle(material[0].title);
            setItemAnimeTitleOrign(material[0].title_orig);
          }
        });
    };

    animeItem();
  }, [id]);

  useEffect(() => {}, [itemAnimeSearchId]);

  console.log(itemAnimeSearchId, 'itemAnimeSearchId');
  console.log(itemsAnimeSlice, 'itemsAnimeSlice');

  if (!itemAnimeSearchId) {
    return <p>Download...</p>;
  }
  return (
    <main className="main full-desc-item">
      <div className="full-desc-item__wrap">
        <VideoLink linkVideo={itemAnimeLink} />
        <div className="item-anime__title">
          {itemAnimeTitle + '. ' + itemAnimeTitleOrign}
        </div>

        <div className="item-anime__rating">{/* {!!!!!!!!!!!!!!! */}</div>
        <div className="item-anime__rating">{/* {!!!!!!!!!!!!!!! */}</div>
        <div className="item-anime__translation translation">
          <ul className="translation__list">
            {/* <li className="translation__item"> {elem.translation.title}</li> */}
          </ul>
        </div>
        {/* <div className="main__content content">
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
            <VideoLink />
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
        </div> */}
      </div>
    </main>
  );
};
export default FullDescItem;
