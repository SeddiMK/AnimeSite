import './LoginUserCabinet.scss';
import React, {
  FC,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// hooks
import { useAuth } from '../../hooks/useAuth';

import fallbackUrlImg from '../../assets/image/avatar/notAvatar.jpg';

// firebase
import { User, getAuth, updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

//store -----------------------------------------------------------
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';

// type LoginUserCabinet = () => void | React.JSX.Element;
type Props = {
  src?: string | null | undefined;
};

const LoginUserCabinet: FC<Props> = () => {
  // const { id } = useParams();
  // console.log(id);

  const [flagRender, setFlagRender] = useState(false);
  const { isAuth, email, id } = useAuth(); //, photoUrl
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // avatar image profile
  const avatarRef = useRef(null);
  const storageFb = getStorage();
  // const storageFbRef = ref(storageFb);
  // const imagesRef = ref(storageFb, 'images');
  const [avatarSize, setAvatarSize] = useState('size image');
  const [avatarUrlFlag, setAvatarUrlFlag] = useState(false);
  // const [avatarLocStor, setAvatarLocStor] = useState(''); ///local store
  const avatarFbRef = ref(storageFb, `images/avatar/${id}`);
  // const updProfile =

  // загрузить аватар
  const changeHandler = (e: any) => {
    const file = e.target.files[0];

    uploadBytes(avatarFbRef, file).then((avatar) => {
      console.log(avatar, '--------avatar--------');
      console.log('Файл загружен');
    });

    getDownloadURL(avatarFbRef)
      .then((url) => {
        // url загрузки для "images/avatar/id"
        console.log(user, 'user download url');
        console.log(url, 'url download url');

        if (user)
          updateProfile(user, {
            // displayName: 'Jane Q. User',
            photoURL: url,
          })
            .then(() => {
              // Profile updated!
              console.log('avatar обновлен!');
              console.log(file);

              // setAvatarSize(file.size);
              setAvatarUrlFlag(true);
              // dispatch(setAvatarUrlUser(url));
            })
            .catch((error: string) => {
              // An error occurred
              console.log(error);
              setAvatarUrlFlag(false);
            });
      })
      .catch((error) => {
        // Handle any errors
        console.log(error, 'error getDownloadURL');
        setAvatarUrlFlag(false);
      });
  };
  const deleteAvatar = () => {
    deleteObject(avatarFbRef)
      .then(() => {
        console.log('Аватар удален');
        // if (user?.photoURL) setAvatarUrl(user?.photoURL);
        // if (avatarUrl) setAvatarUrl('');
        if (user)
          updateProfile(user, {
            // displayName: 'Jane Q. User',
            photoURL: null,
          })
            .then(() => {
              //Profile updated!
              console.log('Profile photoURL обновлен!');
              setAvatarUrlFlag(false);
            })
            .catch((error: string) => {
              // An error occurred
              console.log(error);
              setAvatarUrlFlag(false);
            });
      })
      .catch((error: string) => {
        console.log(error, 'error deleteAvatar');
        // console.log(Boolean(error), 'Boolean(error) deleteAvatar');
        setAvatarUrlFlag(false);
      });
  };
  // useEffect(() => {}, [avatarFbRef, avatarUrl]);
  // FlagRender
  useEffect(() => {
    if (isAuth) setFlagRender(isAuth);
    // if (user?.photoURL) setAvatarUrlFlag(true);
    // if (user?.photoURL === null) setAvatarUrlFlag(false);
  }, [isAuth, avatarUrlFlag, avatarSize, user?.photoURL]);

  console.log(user, '------------user-----------');
  console.log(user?.photoURL, '------------user?.photoURL-----------');
  console.log(
    JSON.stringify(user?.photoURL),
    '------------JSON.stringify(user?.photoURL)-----------'
  );

  console.log(avatarUrlFlag, '------------avatarUrlFlag-----------');
  // console.log(photoUrl, '------------photoUrl-----------');
  console.log(avatarSize, '-----------avatarSize-----------');

  return (
    <>
      {isAuth && (
        <section className="login-user-cabinet user-cab">
          <div className="user-cab__block-top">
            <h2>Кабинет id:{id}</h2>
            <button
              className="btn logout-btn"
              onClick={() => {
                dispatch(removeUser());
                navigate('/');
                localStorage.setItem(
                  'remeberMe',
                  JSON.stringify(Boolean(false))
                );
              }}>
              Выйти из кабинета <b>{email}</b>
            </button>
          </div>
          <div className="user-cab__block-avatar avatar-block">
            <div className="avatar-block__image wrap-img">
              {/* {user && user.photoURL && (    )} */}
              <img
                // ref={avatarRef}
                id="avatar"
                src={avatarUrlFlag ? user?.photoURL : fallbackUrlImg}
                alt="изображение автарки пользователя"
                className="img"
              />
            </div>
            <div className="avatar-block__change-avatar">
              <button
                className="change-avata__del"
                onClick={() => deleteAvatar()}>
                Удалить аватар
              </button>
              <input
                className="change-avata__download"
                accept="image/*"
                type="file"
                onChange={(e) => changeHandler(e)}
                placeholder="Загрузить аватар"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginUserCabinet;
