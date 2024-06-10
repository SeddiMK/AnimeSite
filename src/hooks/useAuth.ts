import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../store/userSlice';

export const useAuth = () => {
  // const { itemsUsers } = useSelector((state) => state.itemsUsers);
  const { email, token, id, displayName, photoUrl } = useSelector(
    (state: RootState) => state.userSlice
  );

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const auth = getAuth();//--------------------------------------------------
  // auth.useDeviceLanguage(); // определение языка девайса ---------------------------
  // const user: User | null = auth.currentUser;
  // // остаться в сисеме без повторной аутентификации remeberMe
  // useEffect(() => { ------------------------------------------------------------
  //   const checkBoxRememberMe = localStorage.getItem('remeberMe');

  //   if (checkBoxRememberMe === 'true')
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // console.log(user);

  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/auth.user
  //         // photoUrl: user.photoURL,
  //         dispatch(
  //           setUser({
  //             email: user.email,
  //             token: user.refreshToken,
  //             id: user.uid,
  //             displayName: user.displayName,
  //             photoUrl: user.photoURL,
  //           })
  //         );
  //       } else {
  //         // User is signed out
  //         // ...
  //         // checkbox remember me
  //       }
  //     });
  // }, [auth, dispatch]);

  // photoUrl,
  return {
    isAuth: !!id,
    email,
    token,
    id,
    displayName,
    photoUrl,
  };
};
