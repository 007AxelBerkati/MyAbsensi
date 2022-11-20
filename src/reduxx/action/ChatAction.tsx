import {databaseRef, showError} from '../../plugins';
import {
  SET_GETALLUSER_ERROR,
  SET_GETALLUSER_LOADING,
  SET_GETALLUSER_SUCCESS,
  SET_GETCHAT_ERROR,
  SET_GETCHAT_LOADING,
  SET_GETCHAT_SUCCESS,
} from '../types';

export const getAllUserLoadin = (loading: any) => ({
  type: SET_GETALLUSER_LOADING,
  loading,
});

export const getAllUserError = (error: any) => ({
  type: SET_GETALLUSER_ERROR,
  error,
});

export const getAllUserSuccess = (success: any) => ({
  type: SET_GETALLUSER_SUCCESS,
  success,
});

export const getChatLoading = (loading: any) => ({
  type: SET_GETCHAT_LOADING,
  loading,
});

export const getChatError = (error: any) => ({
  type: SET_GETCHAT_ERROR,
  error,
});

export const getChatSuccess = (success: any) => ({
  type: SET_GETCHAT_SUCCESS,
  success,
});

export const getAllUser = (uid: any, text: any) => async (dispatch: any) => {
  dispatch(getAllUserLoadin(true));
  try {
    databaseRef()
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          databaseRef()
            .ref(`admins`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getAllUserSuccess(lowerFullname));
            });
        } else {
          databaseRef()
            .ref(`users`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getAllUserSuccess(lowerFullname));
            });
        }
      });
  } catch (error: any) {
    dispatch(getAllUserError(error));
    showError(error.message);
  }
};
