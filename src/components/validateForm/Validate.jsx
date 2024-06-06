import { useState, useEffect } from 'react';

// ======= useValidation =============================================
export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'minLengthError':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLengthError':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isEmail':
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        // case 'repeatMessage':
        //     comment.indexOf(value) === -1
        //     ? setRepeatMessage(true)
        //     : setRepeatMessage(false);
        //   break;
        default:
        //   console.log(`Sorry, we are out of ${validation}.`);
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
  };
};
// ======= useValidation end =========================================
// ======= useInput ==================================================
export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(true);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

// ========= useInput end ================================================

// export default function Validate() {
//   const emailValidation = useInput('', {
//     isEmpty: true,
//     minLengthError: 3,
//     isEmail: true,
//   });
//   const password = useInput('', {
//     isEmpty: true,
//     minLengthError: 5,
//     maxLengthError: 10,
//   });
//   const textAreaValidation = useInput('', {
//     isEmpty: true,
//     minLengthError: 3,
//   });
//   // =====================================================================
//   const validErrorMesageOutEmail = () => {
//     if (emailValidation.isDirty && emailValidation.isEmpty) {
//       return (
//         <div className="validate validate--email" style={{ color: 'red' }}>
//           Field cannot be empty
//         </div>
//       );
//     }

//     if (emailValidation.isDirty && emailValidation.minLengthError) {
//       return (
//         <div className="validate validate--email" style={{ color: 'red' }}>
//           Incorrect length
//         </div>
//       );
//     }
//     if (emailValidation.isDirty && emailValidation.emailError) {
//       return (
//         <div className="validate validate--email" style={{ color: 'red' }}>
//           Incorrect Email
//         </div>
//       );
//     }
//   };
//   const validErrorMesageOutPassword = () => {
//     if (password.isDirty && password.isEmpty) {
//       return (
//         <div className="validate validate--pqssword" style={{ color: 'red' }}>
//           Field cannot be empty
//         </div>
//       );
//     }

//     if (password.isDirty && password.maxLengthError) {
//       return (
//         <div className="validate validate--pqssword" style={{ color: 'red' }}>
//           Password is too long
//         </div>
//       );
//     }
//     if (password.isDirty && password.minLengthError) {
//       return (
//         <div className="validate validate--pqssword" style={{ color: 'red' }}>
//           Incorrect length
//         </div>
//       );
//     }
//   };
//   const validErrorMesageOutTextarea = () => {
//     if (textAreaValidation.isDirty && textAreaValidation.isEmpty) {
//       return (
//         <div className="validate validate--textarea" style={{ color: 'red' }}>
//           Field cannot be empty
//         </div>
//       );
//     }

//     if (textAreaValidation.isDirty && textAreaValidation.minLengthError) {
//       return (
//         <div className="validate validate--textarea" style={{ color: 'red' }}>
//           Incorrect length message
//         </div>
//       );
//     }
//   };
//   return (
//     <>
//       {validErrorMesageOutEmail()}
//       {/* {emailValidation.isDirty && emailValidation.isEmpty && (
//         <div className="validate validate--email" style={{ color: 'red' }}>
//           Field cannot be empty
//         </div>
//       )}
//       {emailValidation.isDirty && emailValidation.minLengthError && (
//         <div style={{ color: 'red' }}>Incorrect length</div>
//       )}
//       {emailValidation.isDirty && emailValidation.emailError && (
//         <div style={{ color: 'red' }}>Incorrect Email</div>
//       )} */}

//       {/* <input
//             onChange={(e) => emailValidation.onChange(e)}
//             onBlur={(e) => emailValidation.onBlur(e)}
//             value={emailValidation.value}
//             name="email"
//             type="email"
//             placeholder="Write email"
//           /> */}

//       {validErrorMesageOutPassword()}
//       {/* {password.isDirty && password.isEmpty && (
//         <div style={{ color: 'red' }}>Field cannot be empty</div>
//       )}
//       {password.isDirty && password.maxLengthError && (
//         <div style={{ color: 'red' }}>Password is too long</div>
//       )}
//       {password.isDirty && password.minLengthError && (
//         <div style={{ color: 'red' }}>Incorrect length</div>
//       )} */}
//       {/* <input
//         onChange={(e) => password.onChange(e)}
//         onBlur={(e) => password.onBlur(e)}
//         value={password.value}
//         name="password"
//         type="password"
//         placeholder="Write password"
//       />
//       <button
//         disabled={!emailValidation.inputValid || !password.inputValid}
//         type="submit">
//         Registration
//       </button> */}
//     </>
//   );
// }
