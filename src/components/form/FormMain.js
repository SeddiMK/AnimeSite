import './FormMain.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useInput } from '../Validate';

const FormMain = ({ openFormComent, setOpenFormComent }) => {
  const formRef = useRef(null);
  const form = document.querySelector('form.form');
  let postTwice = document.querySelector('.validate--textarea-duble-send>p');
  // const btnSendComment = document.querySelector(
  //   'button.main__btn-send-comment'
  // );

  const emailValidation = useInput('', {
    isEmpty: true,
    minLengthError: 3,
    isEmail: true,
  });
  const textAreaValidation = useInput('', {
    isEmpty: true,
    minLengthError: 1,
    // repeatMessage: false,
  });

  // ============ errors =================================================

  const validErrorMesageOutEmail = () => {
    if (emailValidation.isDirty && emailValidation.isEmpty) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Поле не может быть пустым
        </div>
      );
    }

    if (emailValidation.isDirty && emailValidation.minLengthError) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Длина email не корректна
        </div>
      );
    }
    if (emailValidation.isDirty && emailValidation.emailError) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Не корректен Email
        </div>
      );
    }
  };

  //===============================
  //  let searchArrayMessage = comment.indexOf(textAreaValidation.value) !== -1;

  let validErrorMesageOutTextarea = (comment) => {
    if (textAreaValidation.isDirty && textAreaValidation.isEmpty) {
      return (
        <div className="validate validate--textarea" style={{ color: 'red' }}>
          Поле не может быть пустым
        </div>
      );
    }

    if (textAreaValidation.isDirty && textAreaValidation.minLengthError) {
      return (
        <div className="validate validate--textarea" style={{ color: 'red' }}>
          Не корректная длина сообщения
        </div>
      );
    }
    // if (searchArrayMessage) {
    //   return (
    //     <div className="validate validate--textarea" style={{ color: 'red' }}>
    //       You cannot comment on the same post twice
    //     </div>
    //   );
    // }
  };
  // ======================================
  const [comment, setComment] = useState([]);
  const [email, setEmail] = useState('');
  let newDelArr = [];
  let formText = React.createRef();
  // =========noActivBtn== disabled={noActivBtn} =========================
  let noActivBtn = false;

  let addComment = (event) => {
    const formInpMail = document.querySelector('.form__inp-mail');
    let comments = [];
    let commentValue = formText.current.value;
    if (email && commentValue !== '' && comment.indexOf(commentValue) === -1) {
      comments = [...comment, commentValue];

      setOpenFormComent(false);

      noActivBtn =
        !emailValidation.inputValid || !textAreaValidation.inputValid;
    } else if (commentValue === '') {
      formInpMail.focus();
      comments = [...comment];
      formText = '';
    } else {
      formText = '';
      comments = [...comment];

      setOpenFormComent(true);
    }

    setComment(comments);
  };

  let delComment = (ind) => {
    newDelArr = comment.filter((el) => comment[ind] !== el);

    setComment(newDelArr);
  };

  let handleSubmit = (e) => {
    // e.preventDefault();
  };

  // close in window
  const handleClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setOpenFormComent(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  console.log(openFormComent, '----------openFormComent in formMain');

  return (
    <>
      {openFormComent && (
        <form action="#" className="form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form__top">
            <h1>Отзыв или комментарий</h1>
            <button
              className="form__btn-close"
              onClick={() => setOpenFormComent(false)}>
              &#10006;
            </button>
          </div>

          <div className="form__block">
            <label htmlFor="main-email">Ваш email:</label>
            <div className="form__block-mail">
              <input
                className="form__inp-mail"
                id="main-email"
                type="email"
                onChange={(e) => {
                  emailValidation.onChange(e);
                  setEmail(e.target.value);
                }}
                onBlur={(e) => emailValidation.onBlur(e)}
                value={emailValidation.value}
                placeholder="Введите email --------"
              />
              {validErrorMesageOutEmail()}
            </div>
          </div>

          <div className="form__block-inp">
            <label>
              <h4>Текст отзыва или комментария:</h4>
              {validErrorMesageOutTextarea()}
              <textarea
                ref={formText}
                onChange={(e) => textAreaValidation.onChange(e)}
                onBlur={(e) => textAreaValidation.onBlur(e)}
                value={textAreaValidation.value}
                placeholder="Текст..."
                rows="3"
                cols="33"
              />
            </label>
          </div>
          <div className="validate--textarea-duble-send">
            <p>Нельзя комментировать одно и то же сообщение дважды</p>
          </div>
          <div className="form__button">
            <button type="submit" disabled={noActivBtn} onClick={addComment}>
              Опубликовать
            </button>
          </div>
        </form>
      )}

      <div className="main__out">
        {comment.map((el, ind) => (
          <div key={el.toString + ind.toString()} className="main__out-message">
            <div className="main__out-text">{el}</div>
            <button onClick={() => delComment(ind)}>Удалить</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormMain;
