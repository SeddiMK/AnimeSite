import { useSelector } from 'react-redux';

export function useAuth() {
  const { itemsUsers } = useSelector((state) => state.itemsUsers);

  return {
      isAuth: !!itemsUsers.email,
      itemsUsers.email,
      itemsUsers.id,
  };
}
