import './Main.css';
import React from 'react';
import FormMain from '../form/FormMain';

export default function Main() {
  const form = document.querySelector('form.form');
  let openForm = () => {
    form.style.display = 'block';
  };
  return (
    <main className="main">
      <button className="main__btn-send-comment" onClick={openForm}>
        Send comment.
      </button>

      <FormMain />
    </main>
  );
}
