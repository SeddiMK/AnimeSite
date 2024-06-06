import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './Error.module.scss';

import Particles from '../../containers/particles/Particles';

const Error: React.FC = () => {
  const wrapperRef = useRef(null);
  return (
    <main ref={wrapperRef} className="main error">
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles wrapperRef={wrapperRef} />

      <section className={style.error}>
        <div className={style.root}>
          <h1>Ой... 404 такой страницы не существует. </h1>
          <p>Либо вы ввели недопустимое значение в строку поиска.</p>
          {/* <h3>На данный момент есть страницы: Home, About us, Contacts </h3> */}
        </div>
        <div className={style.buttonBack}>
          <Link to="/" className="btn">
            Вернуться на домашнюю страницу
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Error;
