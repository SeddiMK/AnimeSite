import React from 'react';
import style from './Error.module.scss';

const Error: React.FC = () => {
  return (
    <>
      <div></div>
      <div className={style.root}>
        <h1>Ой... 404 такой страницы не существует. </h1>
        <p>Либо вы ввели недопустимое значение в строку поиска.</p>
        <h3>На данный момент есть страницы: Home, About us, Contacts </h3>
      </div>
    </>
  );
};

export default Error;
