import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {loadingSlice} from '../reducer';

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
