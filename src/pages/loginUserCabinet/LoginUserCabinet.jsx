import './LoginUserCabinet.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useAuth } from '../../hooks/useAuth.js';
import { removeUser } from '../../store/userSlice';

const LoginUserCabinet = () => {
  // const { id } = useParams();
  // console.log(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, email } = useAuth();

  return (
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
  );
};

export default LoginUserCabinet;
