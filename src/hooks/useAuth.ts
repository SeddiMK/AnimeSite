import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';

export function useAuth() {
  // const { itemsUsers } = useSelector((state) => state.itemsUsers);
  const { email, token, id, photoUrl } = useSelector(
    (state: RootState) => state.userSlice
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  auth.useDeviceLanguage(); // определение языка девайса

  // // остаться в сисеме без повторной аутентификации remeberMe
  useEffect(() => {
    const checkBoxRememberMe = localStorage.getItem('remeberMe');

    if (checkBoxRememberMe === 'true')
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!??????/
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          // photoUrl: user.photoURL,
          dispatch(
            setUser({
              email: user.email,
              token: user.refreshToken,
              id: user.uid,
            })
          );

          // ...
        } else {
          // User is signed out
          // ...
          // checkbox remember me
        }
      });
  }, [auth, dispatch]);

  // photoUrl,
  return {
    isAuth: !!id,
    email,
    token,
    id,
  };
}
