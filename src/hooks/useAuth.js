import { useSelector } from 'react-redux';

export function useAuth() {
  // const { itemsUsers } = useSelector((state) => state.itemsUsers);
  const { email, token, id } = useSelector((state) => state.userSlice);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
