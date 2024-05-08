import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useAuth() {
  // const { itemsUsers } = useSelector((state) => state.itemsUsers);
  const { email, token, id } = useSelector(
    (state: RootState) => state.userSlice
  );

  return {
    isAuth: !!id,
    email,
    token,
    id,
  };
}
