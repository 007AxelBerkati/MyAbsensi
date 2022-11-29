import {databaseRef, showError, showSuccess} from '../../plugins';
import {
  DELETE_REQUEST_ERROR,
  DELETE_REQUEST_LOADING,
  DELETE_REQUEST_SUCCESS,
  GET_REQUEST_ERROR,
  GET_REQUEST_LOADING,
  GET_REQUEST_SUCCESS,
  SET_REQUEST_ERROR,
  SET_REQUEST_LOADING,
  SET_REQUEST_SUCCESS,
  UPDATE_REQUEST_ERROR,
  UPDATE_REQUEST_LOADING,
  UPDATE_REQUEST_SUCCESS,
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

export const setRequest = (uid: any, data: any) => async (dispatch: any) => {
  dispatch(setRequestLoading(true));
  try {
    databaseRef().ref(`requests/${uid}`).set(data);
    dispatch(setRequestSuccess());
    showSuccess('Permintaan berhasil dikirim');
  } catch (error: any) {
    dispatch(setRequestError(error));
    showError(error.message);
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

export const getRequest = () => async (dispatch: any) => {
  dispatch(getRequestLoading(true));
  try {
    databaseRef()
      .ref(`requests`)
      .once('value')
      .then((snapshot: any) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data: any = [];
          Object.keys(oldData).map((key: any) => {
            data.push({
              ...oldData[key],
            });
          });
          dispatch(getRequestSuccess(data));
        } else {
          dispatch(getRequestSuccess([]));
          dispatch(getRequestLoading(false));
        }
      });
  } catch (error) {
    dispatch(getRequestError(error));
  }
};

export const updateRequestLoading = (loading: any) => ({
  type: UPDATE_REQUEST_LOADING,
  loading,
});

export const updateRequestError = (error: any) => ({
  type: UPDATE_REQUEST_ERROR,
  error,
});

export const updateRequestSuccess = () => ({
  type: UPDATE_REQUEST_SUCCESS,
});

export const updateRequest = (id: any, data: any) => async (dispatch: any) => {
  dispatch(updateRequestLoading(true));
  try {
    databaseRef().ref(`requests/${id}`).update(data);
    dispatch(updateRequestSuccess());
    showSuccess('Permintaan berhasil diupdate');
  } catch (error: any) {
    dispatch(updateRequestError(error));
    showError(error.message);
  }
};

export const deleteRequestLoading = (loading: any) => ({
  type: DELETE_REQUEST_LOADING,
  loading,
});

export const deleteRequestError = (error: any) => ({
  type: DELETE_REQUEST_ERROR,
  error,
});

export const deleteRequestSuccess = () => ({
  type: DELETE_REQUEST_SUCCESS,
});

export const deleteRequest = (id: any) => async (dispatch: any) => {
  dispatch(deleteRequestLoading(true));
  try {
    databaseRef().ref(`requests/${id}`).remove();
    dispatch(deleteRequestSuccess());
    showSuccess('Permintaan berhasil dihapus');
  } catch (error: any) {
    dispatch(deleteRequestError(error));
    showError(error.message);
  }
};