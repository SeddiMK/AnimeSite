import './Main.scss';
import React from 'react';
import FormMain from '../form/FormMain';
import RatingStar from '../rating/RatingStar';

const Main = () => {
  let srcImg = undefined;
  let aliImgMediaLeft;

  const openForm = () => {
    const form = document.querySelector('form.form');
    let postTwice = document.querySelector('.validate--textarea-duble-send>p');
    let formTextArea = form.querySelector('textarea');

    postTwice.style.display = 'none';
    form.style.cssText = 'display: block;';
    formTextArea.value = '';
  };
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
                <button className="media__left-buttons-online">
                  Смотреть онлайн
                </button>
                <button className="media__left-buttons-review">
                  Написать отзыв
                </button>
                <button className="media__left-add-list">
                  Добавить в список
                </button>
              </div>
              <div className="media__left-add"></div>
            </div>
            <div className="media__right">
              <div className="media__rating-block rating">
                <div className="rating__stars">
                  <span className="rating__num">8,7</span>
                  <span>/10</span>
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
                <dd className="desc-media__dd">Фильм</dd>

                <dt className="desc-media__dt">Жанр</dt>
                <dd className="desc-media__dd">Комедиа</dd>

                <dt className="desc-media__dt">Год</dt>
                <dd className="desc-media__dd">2019</dd>

                <dt className="desc-media__dt">Возрастные ограничения</dt>
                <dd className="desc-media__dd">16+</dd>
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
            <div class="player-block__title">
              <strong class="">
                Смотреть аниме «Поднятие уровня в одиночку» онлайн
              </strong>
              <span class="player-block__age-rating">18+</span>
            </div>
            <iframe
              src="https://www.youtube.com/embed/ErgOZ5mZYho"
              title="Поднятие уровня в одиночку | Официальный трейлер"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </div>
          <div className="content__coment">
            <button className="content__btn-send-comment" onClick={openForm}>
              Send comment
            </button>

            <FormMain />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;
