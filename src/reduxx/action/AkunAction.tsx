import {databaseRef, showError, showSuccess} from '../../plugins';
import {
  SET_AKUN_ERROR,
  SET_AKUN_LOADING,
  SET_AKUN_SUCCESS,
  SET_UPDATE_AKUN_ERROR,
  SET_UPDATE_AKUN_LOADING,
  SET_UPDATE_AKUN_SUCCESS,
} from '../types';

export const setAkunLoading = (loading: any) => ({
  type: SET_AKUN_LOADING,
  loading,
});

export const setAkunError = (error: any) => ({
  type: SET_AKUN_ERROR,
  error,
});

export const setAkunSuccess = (success: any) => ({
  type: SET_AKUN_SUCCESS,
  success,
});

export const setUpdateAkunSuccess = (success: any) => ({
  type: SET_UPDATE_AKUN_SUCCESS,
  success,
});

export const setUpdateAkunError = (error: any) => ({
  type: SET_UPDATE_AKUN_ERROR,
  error,
});

export const setUpdateAkunLoading = (loading: any) => ({
  type: SET_UPDATE_AKUN_LOADING,
  loading,
});

export const getAkun = (id: any) => async (dispatch: any) => {
  dispatch(setAkunLoading(true));
  try {
    databaseRef()
      .ref(`users/${id}`)
      .on('value', snapshot => {
        if (snapshot.val() !== null) {
          dispatch(setAkunSuccess(snapshot.val()));
        } else {
          databaseRef()
            .ref(`admins/${id}`)
            .on('value', snapshot => {
              dispatch(setAkunSuccess(snapshot.val()));
            });
        }
      });
  } catch (error: any) {
    dispatch(setAkunError(error));
    showError(error.message);
  }
};

export const updateAkun =
  (id: any, data: any, navigation: any) => async (dispatch: any) => {
    dispatch(setUpdateAkunLoading(true));
    try {
      databaseRef()
        .ref(`users/${id}`)
        .on('value', snapshot => {
          if (snapshot.val() !== null) {
            databaseRef()
              .ref(`users/${id}`)
              .update(data)
              .then(() => {
                dispatch(setUpdateAkunSuccess(true));
                showSuccess('Berhasil update akun');
                navigation.goBack();
              });
          } else {
            databaseRef()
              .ref(`admins/${id}`)
              .update(data)
              .then(() => {
                dispatch(setUpdateAkunSuccess(true));
                showSuccess('Berhasil update akun');
                navigation.goBack();
              });
          }
        });
    } catch (error: any) {
      dispatch(setUpdateAkunError(error));
      showError('gagal');
    }
  };
