import {databaseRef} from '../../plugins';
import {
  GET_REQUEST_ERROR,
  GET_REQUEST_LOADING,
  GET_REQUEST_SUCCESS,
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

export const setRequestSuccess = () => ({
  type: SET_REQUEST_SUCCESS,
});

export const setRequest =
  (uid: any, data: any, bodyId: any) => async (dispatch: any) => {
    dispatch(setRequestLoading(true));
    try {
      databaseRef().ref(`requests/${uid}/${bodyId}`).push(data);
      dispatch(setRequestSuccess());
      dispatch(setRequestLoading(false));
    } catch (error) {
      dispatch(setRequestError(error));
      dispatch(setRequestLoading(false));
    }
  };

export const getRequestLoading = (loading: any) => ({
  type: GET_REQUEST_LOADING,
  loading,
});

export const getRequestError = (error: any) => ({
  type: GET_REQUEST_ERROR,
  error,
});

export const getRequestSuccess = (success: any) => ({
  type: GET_REQUEST_SUCCESS,
  success,
});

export const getRequest = (uid: any) => async (dispatch: any) => {
  dispatch(getRequestLoading(true));
  try {
    databaseRef()
      .ref(`requests/${uid}`)
      .on('value', (snapshot: any) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data: any = [];
          Object.keys(oldData).map((key: any) => {
            data.push({
              id: key,
              ...oldData[key],
            });
          });
          dispatch(getRequestSuccess(data));
        }
        dispatch(getRequestLoading(false));
      });
  } catch (error) {
    dispatch(getRequestError(error));
  }
};
