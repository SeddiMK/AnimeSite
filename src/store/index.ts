import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import animeSlice from './animeSlice';
import searchSlice from './searchSlice';

import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    animeSlice,
    searchSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
