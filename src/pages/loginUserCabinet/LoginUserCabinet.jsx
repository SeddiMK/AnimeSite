import './LoginUserCabinet.scss';
import { useParams } from 'react-router-dom';

const LoginUserCabinet = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="login-user-cabinet">sssssssssssssssssssssssssssss</div>
  );
};

export default LoginUserCabinet;
