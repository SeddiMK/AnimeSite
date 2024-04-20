import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import fetchAnimeListSlice from './fetchAnimeListSlice';

export const store = configureStore({
  reducer: {
    fetchAnimeListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
