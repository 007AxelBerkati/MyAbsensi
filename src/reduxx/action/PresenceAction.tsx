import moment from 'moment';
import {showSuccess, usersRef} from '../../plugins';
import {
  GET_PRESENCE_ERROR,
  GET_PRESENCE_LOADING,
  GET_PRESENCE_SUCCESS,
  SET_PRESENCE,
  SET_PRESENCE_ERROR,
  SET_PRESENCE_LOADING,
  SET_PRESENCE_SUCCESS,
} from '../types';

export const setPresenceLoading = (loading: any) => ({
  type: SET_PRESENCE_LOADING,
  loading,
});

export const setPresenceError = (error: any) => ({
  type: SET_PRESENCE_ERROR,
  error,
});

export const setPresenceSuccess = (success: any) => ({
  type: SET_PRESENCE_SUCCESS,
  success,
});

export const absen = (uid: any, data: any) => async (dispatch: any) => {
  dispatch(setPresenceLoading(true));
  await usersRef()
    .doc(`${uid}/presence/${moment().format('DD-MM-YYYY')}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        usersRef()
          .doc(`${uid}/presence/${moment().format('DD-MM-YYYY')}`)
          .update({keluar: data})
          .then(() => {
            setPresence('alreadyPresence');
            showSuccess('Berhasil Absen Keluar');
          });
      } else {
        usersRef()
          .doc(`${uid}/presence/${moment().format('DD-MM-YYYY')}`)
          .set({masuk: data})
          .then(() => {
            setPresence('keluar');
            showSuccess('Berhasil Absen Masuk');
          });
      }
    });
  dispatch(setPresenceLoading(false));
  dispatch(setPresenceSuccess(true));
};

export const getPresenceLoading = (loading: any) => ({
  type: GET_PRESENCE_LOADING,
  loading,
});

export const getPresenceError = (error: any) => ({
  type: GET_PRESENCE_ERROR,
  error,
});

export const getPresenceSuccess = (success: any) => ({
  type: GET_PRESENCE_SUCCESS,
  success,
});

export const setPresence = (presence: any) => ({
  type: SET_PRESENCE,
  presence,
});

export const getPresence = (uid: any) => async (dispatch: any) => {
  dispatch(getPresenceLoading(true));
  console.log('uid', uid);

  usersRef()
    .doc(`${uid}/presence/${moment().format('DD-MM-YYYY')}`)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        dispatch(getPresenceSuccess(doc.data()));
        if (doc.data().keluar && doc.data().masuk) {
          dispatch(setPresence('alreadyPresence'));
        } else if (doc.data().masuk) {
          dispatch(setPresence('keluar'));
        }
      } else {
        dispatch(getPresenceSuccess(false));
      }
    });
  dispatch(getPresenceLoading(false));
};
