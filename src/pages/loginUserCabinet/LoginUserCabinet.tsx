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
import { useSelector } from 'react-redux';

// hooks ----------------------------------------------------------------
import { useAuth } from '../../hooks/useAuth';

import fallbackUrlImg from '../../assets/image/avatar/notAvatar.jpg';

// firebase -------------------------------------------------------------
import { User, getAuth, updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

//store ----------------------------------------------------------------
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, RootState } from '../../store';

import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration';

// type Props = {
//   src?: string | null | undefined;
// };

const LoginUserCabinet: FC = () => {
  // const { id } = useParams();
  // console.log(id);

  const [flagRender, setFlagRender] = useState(false);

  const { isAuth, email, id, displayName } = useAuth();
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
  const [updProfile, setUpdProfile] = useState(false);
  const [clickUploadImg, setClickUploadImg] = useState(false);
  // const [avatarLocStor, setAvatarLocStor] = useState(''); ///local store

  // storage fairebase ------------------------------------------------------------
  const storageFb = getStorage();
  const avatarFbRef = ref(storageFb, `images/avatar/${id}`);
  const [progress, setProgress] = useState(0);

  // change user name -------------------------------------------------------------
  // const [userName, setUserName] = useState<string | null>(null);
  const [changeVal, setChangeVal] = useState('');
  const inputUserNameRef = useRef<HTMLInputElement>(null);

  // загрузить аватар -------------------------------------------------------------
  const uploadAvatar = (e: any) => {
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
            // localStorage.setItem('clickUploadImg', 'true');
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
          // localStorage.setItem('clickUploadImg', 'false');
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
              setErrorSt(true);
              // setAvatarUrlFlag(false);
            });
        })
        .catch((error: string) => {
          console.log('error deleteAvatar', error);
          if (error) {
            setUrl('');
            setErrorSt(true);
          }
          // setAvatarUrlFlag(false);
        });
    }
  };

  // изменить user name -----------------------------------------------------------
  const updateDisplayName = async () => {
    if (user && changeVal) {
      await updateProfile(user, {
        displayName: changeVal,
        // photoURL: null,
      })
        .then(() => {
          console.log('Profile displayName обновлен!');
          setChangeVal('');
        })
        .catch((error: string) => {
          // An error occurred
          console.log('updateProfile', error);
          setErrorSt(true);
        });
    }
  };

  // const onChangeInput = () => {
  //   if (inputUserNameRef.current) {
  //     // console.log(inputUserNameRef.current.value, '-----------onChangeInput');
  //     setChangeVal(inputUserNameRef.current.value);
  //   }
  // };

  // -----------------------------------------------------------(false);-----------------
  // const [isLinkIntact, setIsLinkIntact] = useState

  useEffect(() => {
    const checkLinkIntact = async () => {
      try {
        await getDownloadURL(avatarFbRef)
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

                  // dispatch(setAvatarUrlUser(url));
                })
                .catch((error: string) => {
                  // An error occurred
                  console.log('error updateProfile in checkLinkIntact', error);
                  setErrorSt(true);
                  setAvatarUrlFlag(false);
                });
            }
          })
          .catch((error) => {
            console.log('error getDownloadURL in checkLinkIntact', error);
            setErrorSt(true);
            setAvatarUrlFlag(false);
          });
        setImage(null);
      } catch (error) {
        console.log('error getDownloadURL catch', error);
        setErrorSt(true);
        setAvatarUrlFlag(false);
      }
    };
    checkLinkIntact();
  }, [avatarFbRef, user, user?.photoURL]);

  // localStorage.getItem('clickUploadImg') === 'false' &&
  useEffect(() => {
    if (url === null && user?.photoURL) setUrl(user?.photoURL);
    if (!errorSt) {
      setAvatarUrlFlag(true);
    }
  }, [url, user?.photoURL, errorSt]);

  // useEffect(() => {
  //   if (updProfile) setChangeVal('');
  // }, [updProfile]);

  console.log('user-----------', user);
  // console.log('user?.photoURL---------', user?.photoURL);
  console.log('url-----------', url);

  return (
    <>
      {isAuth && (
        <section className="login-user-cabinet user-cab">
          <div className="user-cab__block-top">
            <h2>
              Кабинет <span>id</span>:{id}
            </h2>
          </div>
          <div className="user-cab__block-right">
            <div className="user-cab__block-avatar avatar-block">
              <div className="avatar-block__image wrap-img">
                <img
                  // ref={avatarRef}
                  id="avatar"
                  src={!avatarUrlFlag ? fallbackUrlImg : url!}
                  alt="изображение автарки пользователя"
                  className="avatar-img img"
                />
                <div className="wrap-img__progress progress">
                  <progress
                    className="progress__elem"
                    value={progress}
                    max="100"
                  />
                  <div className="progress__value"></div>
                  <div className="progress__bg">
                    <div className="progress__bar"></div>
                  </div>
                </div>
              </div>
              <div className="avatar-block__change-avatar">
                <label className="change-avatar__lbl btn">
                  Загрузить аватар
                  <input
                    id="change-avatar"
                    className="change-avatar__upload"
                    accept="image/*"
                    type="file"
                    onChange={(e) => uploadAvatar(e)}
                  />
                </label>
                <button
                  className="change-avatar__del"
                  id="btn-del-avatar"
                  onClick={() => deleteAvatar()}>
                  Удалить аватар
                </button>
              </div>
            </div>
            <div className="user-data">
              <h2 className="name-block__email-text">
                email: <span>{email}</span>
              </h2>
              <div className="user-data__name-block name-block">
                <h2 className="name-block__name-text">
                  name:{' '}
                  <span>
                    {user?.displayName ? user?.displayName : `user: ${id}`}
                  </span>
                </h2>
                <div className="name-block__rename-change">
                  <button
                    className="name-block__rename-btn btn"
                    onClick={() => updateDisplayName()}>
                    Изменить ник
                  </button>
                  <label>
                    <input
                      className="name-block__inp-rename"
                      type="text"
                      ref={inputUserNameRef}
                      value={changeVal}
                      placeholder="Новый никнем"
                      onChange={(e) => setChangeVal(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="user-cab__block-social-out">
            <section className="user-cab__social-links">
              <p className="user-cab__social-links-reg-text">
                Подключиться к сервисам
              </p>
              <LinksSocialRegistration />
            </section>
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
        </section>
      )}
    </>
  );
};

export default LoginUserCabinet;
