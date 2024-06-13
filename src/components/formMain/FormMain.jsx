import './FormMain.scss';
import React, { useEffect, useRef, createRef, useState } from 'react';

// validate
import { useInput } from '../validateForm/Validate';

// hooks
import { useAuth } from '../../hooks/useAuth';

const FormMain = ({
  setOpenFTop,
  setOpenFBut,
  openFormComent,
  setOpenFormComent,
  setLengthComment,
  formStyle,
}) => {
  const { displayName, photoUrl } = useAuth();
  const [comment, setComment] = useState([]);
  const [commentRepeat, setCommentRepeat] = useState(false);
  const [email, setEmail] = useState('');

  let newDelArr = useRef([]);
  let formText = createRef();

  // =========noActivBtn== disabled={noActivBtn} =========================
  let noActivBtn = false; //!!!!!!!!!!!!!!!!!!!!!!!!!!

  const formRef = useRef(null);
  const inpMail = useRef(null);

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

  //  validation =================================================
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
  };

  // addComment -------------------------
  const addComment = (e) => {
    let comments = [];
    let commentValue = formText.current.value;

    if (comment.indexOf(commentValue) !== -1) {
      setCommentRepeat(true);
      setLengthComment([]);
    }

    if (email && commentValue !== '' && comment.indexOf(commentValue) === -1) {
      comments = [...comment, commentValue];

      noActivBtn =
        !emailValidation.inputValid || !textAreaValidation.inputValid;

      setLengthComment([0]);

      setCommentRepeat(false);
      setOpenFormComent(false);
      setOpenFTop(false);
    } else if (commentValue === '') {
      inpMail.current.focus();
      comments = [...comment];
      formText = '';
    } else {
      formText = '';
      comments = [...comment];

      setOpenFormComent(true);
    }

    setComment(comments);
  };

  // delComment ---------------------------
  const delComment = (ind) => {
    newDelArr = comment.filter((el) => comment[ind] !== el);

    setComment(newDelArr);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
  };

  // close in window ----------------------------
  const handleClick = (e) => {
    // if (btnComTopRef === null) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setOpenFormComent(false);
      setOpenFTop(false);
      setOpenFBut(false);

      setLengthComment([]);
    }

    // if (btnComBRef === null) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setOpenFormComent(false);
      setOpenFBut(false);
      setLengthComment([]);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  //
  return (
    <>
      {openFormComent && (
        <form
          style={formStyle}
          action="#"
          className="form form-message-review"
          id="form-message-review"
          ref={formRef}
          // onSubmit={handleSubmit}
        >
          <div className="form__top">
            <h1>Отзыв или комментарий</h1>
            <button
              className="form__btn-close btn"
              onClick={() => setOpenFormComent(false)}>
              &#10006;
            </button>
          </div>

          <div className="form__block">
            <label htmlFor="main-email">Ваш email:</label>
            <div className="form__block-mail">
              <input
                ref={inpMail}
                className="form__inp-mail"
                id="main-email"
                type="email"
                onChange={(e) => {
                  emailValidation.onChange(e);
                  setEmail(e.target.value);
                }}
                onBlur={(e) => emailValidation.onBlur(e)}
                value={emailValidation.value}
                placeholder="Введите email"
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
            {commentRepeat && (
              <p>Нельзя комментировать одно и то же сообщение дважды!</p>
            )}
          </div>
          <div className="form__button">
            <button
              className="btn"
              type="button"
              disabled={noActivBtn}
              onClick={() => addComment()}>
              Опубликовать
            </button>
          </div>
        </form>
      )}

      <div className="comment__out">
        {comment.map((el, ind) => (
          <div key={el.toString + ind.toString()} className="comment__message">
            <div className="comment__avatar">
              <img
                id="#avatar"
                className="comment__img-avatar img"
                src={photoUrl}
                alt="аватар пользователя"
              />
            </div>
            <div className="comment__block-content">
              <h3 className="comment__nik-name">
                {displayName !== '' ? displayName : 'UserNikName'}
                <span>18 часа назад</span>
              </h3>
              <div className="comment__out-text">{el}</div>
              <button
                className="comment__btn-del btn"
                onClick={() => delComment(ind)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default FormMain;
