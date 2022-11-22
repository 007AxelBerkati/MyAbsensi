import {SET_IS_ONLINE, SET_LOADING, SET_REFRESHING} from '../types';

export const setLoading = (loading: any) => ({
  type: SET_LOADING,
  loading,
});

export const setOnline = (isOnline: any) => ({
  type: SET_IS_ONLINE,
  isOnline,
});

export const setRefreshing = (refreshing: any) => ({
  type: SET_REFRESHING,
  refreshing,
});

export const refreshing = (func: any) => {
  return (dispatch: any) => {
    dispatch(setRefreshing(true));
    func;
    dispatch(setRefreshing(false));
  };
};
