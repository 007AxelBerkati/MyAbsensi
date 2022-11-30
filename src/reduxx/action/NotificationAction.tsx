import moment from 'moment';
import {databaseRef, showError} from '../../plugins';

import {
  SET_GETNOTIF_ERROR,
  SET_GETNOTIF_LOADING,
  SET_GETNOTIF_SUCCESS,
  SET_NOTIFICATION_TOTAL,
  UPDATE_NOTIF_ERROR,
  UPDATE_NOTIF_LOADING,
  UPDATE_NOTIF_SUCCESS,
} from '../types';

export const getNotifLoading = (loading: any) => ({
  type: SET_GETNOTIF_LOADING,
  loading,
});

export const getNotifSuccess = (data: any) => ({
  type: SET_GETNOTIF_SUCCESS,
  data,
});

export const getNotifError = (error: any) => ({
  type: SET_GETNOTIF_ERROR,
  error,
});

export const countNotification = (total: any) => ({
  type: SET_NOTIFICATION_TOTAL,
  total,
});

export const getNotif = (uid: any) => {
  return (dispatch: any) => {
    dispatch(getNotifLoading(true));
    databaseRef()
      .ref(`notifications/${uid}`)
      .orderByChild('updatedAt')
      .on(
        'value',
        (snapshot: any) => {
          if (snapshot.val()) {
            const oldData = snapshot.val();
            const data: any = [];
            Object.keys(oldData).map((key: any) => {
              data.push({
                ...oldData[key],
              });
            });

            let total = 0;
            for (let i = 0; i < data.length; i++) {
              if (data[i].isRead === false) {
                total++;
              }
            }

            dispatch(countNotification(total));
            dispatch(getNotifSuccess(data));
          } else {
            dispatch(getNotifSuccess([]));
            dispatch(getNotifLoading(false));
          }
        },
        (error: any) => {
          dispatch(getNotifError(error));
        }
      );
  };
};

export const updateNotifLoading = (loading: any) => ({
  type: UPDATE_NOTIF_LOADING,
  loading,
});

export const updateNotifSuccess = () => ({
  type: UPDATE_NOTIF_SUCCESS,
});

export const updateNotifError = (error: any) => ({
  type: UPDATE_NOTIF_ERROR,
  error,
});

export const updateNotif = (uid: any, data: any, bodyId: any) => {
  return (dispatch: any) => {
    dispatch(updateNotifLoading(true));
    databaseRef()
      .ref(`notifications/${uid}/${bodyId}`)
      .update(data)
      .then(() => {
        dispatch(updateNotifSuccess());
      })
      .catch((error: any) => {
        dispatch(updateNotifError(error));
        showError(error.message);
      });
  };
};

export const setNotifLoading = (loading: any) => ({
  type: SET_GETNOTIF_LOADING,
  loading,
});

export const setNotifSuccess = () => ({
  type: SET_GETNOTIF_SUCCESS,
});

export const setNotifError = (error: any) => ({
  type: SET_GETNOTIF_ERROR,
  error,
});

export const setNotif = (uid: any, data: any, bodyId: any) => {
  return (dispatch: any) => {
    dispatch(setNotifLoading(true));
    databaseRef()
      .ref(`notifications/${uid}/${bodyId}`)
      .set(data)
      .then(() => {
        dispatch(setNotifSuccess());
      })
      .catch((error: any) => {
        dispatch(setNotifError(error));
      });
  };
};
