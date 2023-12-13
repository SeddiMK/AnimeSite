import './FormMain.css';
import React, { useEffect, useRef, useState } from 'react';
import { useInput } from '../Validate';

export default function FormMain() {
  const form = document.querySelector('form.form');
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

  let postTwice = document.querySelector('.validate--textarea-duble-send>p');
  // ============ errors =================================================

  const validErrorMesageOutEmail = () => {
    console.log('validErrorMesageOutEmail');
    console.log(emailValidation.isDirty);

    if (emailValidation.isDirty && emailValidation.isEmpty) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Field cannot be empty
        </div>
      );
    }

    if (emailValidation.isDirty && emailValidation.minLengthError) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Incorrect length
        </div>
      );
    }
    if (emailValidation.isDirty && emailValidation.emailError) {
      return (
        <div className="validate validate--email" style={{ color: 'red' }}>
          Incorrect Email
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
          Field cannot be empty
        </div>
      );
    }

    if (textAreaValidation.isDirty && textAreaValidation.minLengthError) {
      return (
        <div className="validate validate--textarea" style={{ color: 'red' }}>
          Incorrect length message
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
    console.log('add-comment');

    const formInpMail = document.querySelector('.form__inp-mail');
    let comments = [];
    let commentValue = formText.current.value;
    console.log(commentValue);
    if (email && commentValue !== '' && comment.indexOf(commentValue) === -1) {
      console.log('noActivBtn--- job');

      comments = [...comment, commentValue];
      postTwice.classList.remove('post-twice');
      postTwice.style.display = 'none';
      noActivBtn =
        !emailValidation.inputValid || !textAreaValidation.inputValid;
    } else if (commentValue === '') {
      console.log('commentValue zero  ---------------------------');

      formInpMail.focus();
      comments = [...comment];
      formText = '';
    } else {
      formText = '';
      comments = [...comment];

      postTwice.classList.add('post-twice');
      postTwice.style.display = 'block';
    }

    console.log(comments);
    setComment(comments);
  };

  let delComment = (ind) => {
    newDelArr = comment.filter((el) => comment[ind] !== el);

    setComment(newDelArr);
  };

  let handleSubmit = (e) => {
    // e.preventDefault();
  };

  const closeForm = () => {
    let formTextArea = form.querySelector('textarea');
    postTwice.style.display = 'none';
    formTextArea.value = '';
    form.style.cssText = 'display: none;';
  };

  const formRef = useRef(null);

  const handleClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      closeForm();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <>
      <form action="#" className="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form__top">
          <h1>Send comment</h1>
          <button className="form__btn-close" onClick={closeForm}>
            &#10006;
          </button>
        </div>

        <div className="form__block">
          <label htmlFor="main-email">Enter your email:</label>
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
              placeholder="Write email --------"
            />
            {validErrorMesageOutEmail()}
          </div>
        </div>

        <div className="form__block-inp">
          <label>
            <h4>Enter your message:</h4>
            {validErrorMesageOutTextarea()}
            <textarea
              ref={formText}
              onChange={(e) => textAreaValidation.onChange(e)}
              onBlur={(e) => textAreaValidation.onBlur(e)}
              value={textAreaValidation.value}
              placeholder="Comment text..."
              rows="3"
              cols="33"
            />
          </label>
        </div>
        <div className="validate--textarea-duble-send">
          <p>You cannot comment on the same post twice</p>
        </div>
        <div className="form__button">
          <button type="submit" disabled={noActivBtn} onClick={addComment}>
            Add comment
          </button>
        </div>
      </form>

      <div className="main__out">
        {comment.map((el, ind) => (
          <div key={el.toString + ind.toString()} className="main__out-message">
            <div className="main__out-text">{el}</div>
            <button onClick={() => delComment(ind)}>Delete comment</button>
          </div>
        ))}
      </div>
    </>
  );
}
