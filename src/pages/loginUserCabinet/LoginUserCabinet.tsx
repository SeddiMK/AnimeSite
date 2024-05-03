import './LoginUserCabinet.scss';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../store/userSlice';

const LoginUserCabinet = () => {
  // const { id } = useParams();
  // console.log(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div className="login-user-cabinet">
      <h2>КАБИНЕТ sssssssssssssssssssssssssssss </h2>
      <button
        className="btn"
        onClick={() => {
          dispatch(removeUser());
          navigate('/');
        }}>
        Выйти из кабинета <b>{email}</b>
      </button>
    </div>
  ) : (
    navigate('/')
  );
};

export default LoginUserCabinet;
