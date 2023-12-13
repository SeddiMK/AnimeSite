import './FormMain.css';
import React, { useState } from 'react';
import { useInput } from '../Validate';

export default function FormMain() {
  const form = document.querySelector('form.form');
  const emailValidation = useInput('', {
    isEmpty: true,
    minLengthError: 3,
    isEmail: true,
  });
  const textAreaValidation = useInput('', {
    isEmpty: true,
    minLengthError: 3,
    // repeatMessage: false,
  });

  let noActivBtn =
    !emailValidation.inputValid || !textAreaValidation.inputValid;
  let postTwice = document.querySelector('.form__button>p');
  // ============ errors =================================================

  const validErrorMesageOutEmail = () => {
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

  let addComment = (event) => {
    let comments = [];
    let commentValue = formText.current.value;

    if (email && comment.indexOf(commentValue) === -1) {
      comments = [...comment, commentValue];
      postTwice.classList.remove('post-twice');
      postTwice.style.display = 'none';
    } else {
      comments = [...comment];
      postTwice.classList.add('post-twice');
      postTwice.style.display = 'block';
    }

    setComment(comments);

    event.preventDefault();
  };

  let delComment = (ind) => {
    newDelArr = comment.filter((el) => comment[ind] !== el);

    setComment(newDelArr);
    formText.current.value = ''; // !!!!
  };

  let handleSubmit = (e) => {
    // e.preventDefault();
  };

  let closeForm = () => {
    form.style.display = 'none';
  };

  return (
    <>
      <form action="#" className="form" onSubmit={handleSubmit}>
        <div className="form__top">
          <h1>Send comment</h1>
          <button className="form__btn-close" onClick={closeForm}>
            &#10006;
          </button>
        </div>

        <div className="form__block-">
          <label htmlFor="main-email">Enter your email:</label>

          {validErrorMesageOutEmail()}
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
        <div className="form__button">
          <button disabled={noActivBtn} type="submit" onClick={addComment}>
            Add comment
          </button>
          <p>You cannot comment on the same post twice</p>
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
