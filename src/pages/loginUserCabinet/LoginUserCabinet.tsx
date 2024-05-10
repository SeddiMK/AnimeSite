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
  uploadBytesResumable,
} from 'firebase/storage';

//store -----------------------------------------------------------
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';

// type Props = {
//   src?: string | null | undefined;
// };

const LoginUserCabinet: FC = () => {
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

  // const storageFbRef = ref(storageFb);
  // const imagesRef = ref(storageFb, 'images');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState<string | null>(null);
  const [errorSt, setErrorSt] = useState(false);

  const [avatarSize, setAvatarSize] = useState('size image');
  const [avatarUrlFlag, setAvatarUrlFlag] = useState(true);
  // const [updProfile, setUpdProfile] = useState(false);
  const [clickUploadImg, setClickUploadImg] = useState(false);
  // const [avatarLocStor, setAvatarLocStor] = useState(''); ///local store

  // storage fairebase
  const storageFb = getStorage();
  const avatarFbRef = ref(storageFb, `images/avatar/${id}`);
  const [progress, setProgress] = useState(0);

  // загрузить аватар
  const changeHandler = (e: any) => {
    setClickUploadImg(true);

    const file = e.target.files[0];
    setImage(file);
    // -----------------------------------upload Image------------------------------
    const uploadImage = async () => {
      if (file) {
        const uploadTask = uploadBytesResumable(avatarFbRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setProgress(progress);
            console.log('Файл загружен');
            localStorage.setItem('clickUploadImg', 'true');
          },
          (error) => {
            console.log('error in uploadBytes', error);
            setErrorSt(true);
            setAvatarUrlFlag(false);
          },
          async () => {
            const imgUrl = getDownloadURL(avatarFbRef)
              .then((url) => {
                setUrl(url);

                if (user) {
                  updateProfile(user, {
                    // displayName: 'Jane Q. User',
                    photoURL: url,
                  })
                    .then(() => {
                      console.log('avatar обновлен!');
                      setAvatarUrlFlag(true);
                      // setUpdProfile(true);
                      // dispatch(setAvatarUrlUser(url));
                    })
                    .catch((error: string) => {
                      // An error occurred
                      console.log('error updateProfile', error);
                      setErrorSt(true);
                      setAvatarUrlFlag(false);
                    });
                }
              })
              .catch((error) => {
                console.log('error getDownloadURL', error);
                setErrorSt(true);
                setAvatarUrlFlag(false);
              });
            setImage(null);
          }
        );
      }
    };
    uploadImage();
  };

  // delete avatar
  const deleteAvatar = async () => {
    if (user) {
      await deleteObject(avatarFbRef)
        .then(() => {
          console.log('Аватар удален');
          localStorage.setItem('clickUploadImg', 'false');
          setAvatarUrlFlag(false);
          // -----------------------------------update profile------------------------------
          updateProfile(user, {
            // displayName: 'Jane Q. User',
            photoURL: null,
          })
            .then(() => {
              console.log('Profile photoURL обновлен!');
              setUrl('');
              // setAvatarUrlFlag(false);
            })
            .catch((error: string) => {
              // An error occurred
              console.log('updateProfile', error);
              // setAvatarUrlFlag(false);
            });
        })
        .catch((error: string) => {
          console.log(error, 'error deleteAvatar');
          if (error) setUrl('');
          // setAvatarUrlFlag(false);
        });
    }
  };

  // useEffect(() => {
  //   if (user?.photoURL) setUrl(user?.photoURL);
  // }, [user?.photoURL]);

  useEffect(() => {
    if (url === null && user?.photoURL) setUrl(user?.photoURL);
    if (localStorage.getItem('clickUploadImg') === 'false') {
      setAvatarUrlFlag(false);
    }
  }, [url, user?.photoURL]);
  // , url,
  console.log('user-----------', user);
  console.log('user?.photoURL---------', user?.photoURL);
  console.log('url-----------', url);
  console.log('!errorSt-----------', !errorSt);
  // console.log('updProfile-----------', updProfile);
  console.log('clickUploadImg-----------', clickUploadImg);
  // console.log(
  //   'url && user?.photoURL && !errorSt-----------',
  //   url && user?.photoURL && !errorSt
  // );
  console.log('avatarUrlFlag-----------', avatarUrlFlag);
  console.log('image-----------', image);

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
                src={avatarUrlFlag ? url : fallbackUrlImg}
                alt="изображение автарки пользователя"
                className="avatar-img img"
              />
              <progress value={progress} max="100" />
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
