import {databaseRef} from '../../plugins';
import {
  SET_REQUEST_ERROR,
  SET_REQUEST_LOADING,
  SET_REQUEST_SUCCESS,
} from '../types';

export const setRequestLoading = (loading: any) => ({
  type: SET_REQUEST_LOADING,
  loading,
});

export const setRequestError = (error: any) => ({
  type: SET_REQUEST_ERROR,
  error,
});

export const setRequestSuccess = (success: any) => ({
  type: SET_REQUEST_SUCCESS,
  success,
});

export const setRequest = (uid: any, data: any) => async (dispatch: any) => {
  dispatch(setRequestLoading(true));
  try {
    const response = await databaseRef().ref(`requests/${uid}`).push(data);
    dispatch(setRequestSuccess(response));
    dispatch(setRequestLoading(false));
  } catch (error) {
    dispatch(setRequestError(error));
    dispatch(setRequestLoading(false));
  }
};
