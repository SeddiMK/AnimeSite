import './Main.css';
import React from 'react';
import FormMain from '../form/FormMain';

export default function Main() {
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
      <button className="main__btn-send-comment" onClick={openForm}>
        Send comment
      </button>

      <FormMain />
    </main>
  );
}
