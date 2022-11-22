import {SET_IS_ONLINE, SET_LOADING} from '../types';

export const setLoading = (loading: any) => ({
  type: SET_LOADING,
  loading,
});

export const setOnline = (isOnline: any) => ({
  type: SET_IS_ONLINE,
  isOnline,
});
