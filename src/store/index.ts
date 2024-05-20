import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import animeSlice from './animeSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    animeSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
