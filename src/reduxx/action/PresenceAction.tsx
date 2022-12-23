import moment from 'moment';
import {showSuccess, usersRef} from '../../plugins';
import {
  GET_ALL_PRESENCE_ERROR,
  GET_ALL_PRESENCE_LOADING,
  GET_ALL_PRESENCE_SUCCESS,
  GET_PRESENCE_ALL_USER_ERROR,
  GET_PRESENCE_ALL_USER_LOADING,
  GET_PRESENCE_ALL_USER_SUCCESS,
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

export const absen =
  (uid: any, data: any, dataAkun: any) => async (dispatch: any) => {
    dispatch(setPresenceLoading(true));
    await usersRef()
      .doc(`${uid}/presence/${moment().format('YYYY')}`)
      .collection(`${moment().format('MM')}`)
      .doc(`${moment().format('DD')}`)
      .get()
      .then(async doc => {
        if (doc.exists) {
          await usersRef()
            .doc(`${uid}/presence/${moment().format('YYYY')}`)
            .collection(`${moment().format('MM')}`)
            .doc(`${moment().format('DD')}`)
            .update({keluar: data})
            .then(() => {
              setPresence('alreadyPresence');
              showSuccess('Berhasil Absen Keluar');
            });
        } else {
          await usersRef()
            .doc(`${uid}`)
            .get()
            .then(async doc => {
              if (doc.exists) {
                await usersRef()
                  .doc(`${uid}/presence/${moment().format('YYYY')}`)
                  .collection(`${moment().format('MM')}`)
                  .doc(`${moment().format('DD')}`)
                  .set({date: data.date, masuk: data})
                  .then(() => {
                    setPresence('keluar');
                    showSuccess('Berhasil Absen Masuk');
                  });
              } else {
                await usersRef()
                  .doc(`${uid}`)
                  .set(dataAkun)
                  .then(async () => {
                    await usersRef()
                      .doc(`${uid}/presence/${moment().format('YYYY')}`)
                      .collection(`${moment().format('MM')}`)
                      .doc(`${moment().format('DD')}`)
                      .set({date: data.date, masuk: data})
                      .then(() => {
                        setPresence('keluar');
                        showSuccess('Berhasil Absen Masuk');
                      });
                  });
              }
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
  await usersRef()
    .doc(`${uid}/presence/${moment().format('YYYY')}`)
    .collection(`${moment().format('MM')}`)
    .doc(`${moment().format('DD')}`)
    .get()
    .then(async (doc: any) => {
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

export const getAllPresenceLoading = (loading: any) => ({
  type: GET_ALL_PRESENCE_LOADING,
  loading,
});

export const getAllPresenceError = (error: any) => ({
  type: GET_ALL_PRESENCE_ERROR,
  error,
});

export const getAllPresenceSuccess = (success: any) => ({
  type: GET_ALL_PRESENCE_SUCCESS,
  success,
});

export const getAllPresence =
  (uid: any, range: any) => async (dispatch: any) => {
    dispatch(getAllPresenceLoading(true));
    if (range) {
      usersRef()
        .doc(uid)
        .collection('presence')
        .doc(`${moment(range.start).format('YYYY')}`)
        .collection(`${moment(range.start).format('MM')}`)
        .where('date', '>=', range.start)
        .where('date', '<=', range.end)
        .get()
        .then(async (querySnapshot: any) => {
          const data: any = [];
          await querySnapshot.forEach((doc: any) => {
            data.push(doc.data());
          });
          dispatch(getAllPresenceSuccess(data));
        })

        .catch((error: any) => {
          dispatch(getAllPresenceError(error));
        });
    } else {
      usersRef()
        .doc(uid)
        .collection('presence')
        .doc(`${moment().format('YYYY')}`)
        .collection(`${moment().format('MM')}`)
        .get()
        .then((querySnapshot: any) => {
          const data: any = [];
          querySnapshot.forEach((doc: any) => {
            data.push(doc.data());
          });
          dispatch(getAllPresenceSuccess(data));
        })
        .catch((error: any) => {
          dispatch(getAllPresenceError(error));
        });
    }
  };

export const getPresenceAllUserLoading = (loading: any) => ({
  type: GET_PRESENCE_ALL_USER_LOADING,
  loading,
});

export const getPresenceAllUserError = (error: any) => ({
  type: GET_PRESENCE_ALL_USER_ERROR,
  error,
});

export const getPresenceAllUserSuccess = (success: any, total: any) => ({
  type: GET_PRESENCE_ALL_USER_SUCCESS,
  success,
  total,
});

export const getPresenceAllUser = () => async (dispatch: any) => {
  dispatch(getPresenceAllUserLoading(true));
  usersRef()
    .get()
    .then(async querySnapshot => {
      const list: any = [];
      const data: any = [];
      var total = 0;

      await querySnapshot.forEach(documentSnapshot => {
        list.push({
          ...documentSnapshot.data(),
          uid: documentSnapshot.id,
        });
      });

      await list.forEach((item: any) => {
        usersRef()
          .doc(item.uid)
          .collection('presence')
          .doc(`${moment().format('YYYY')}`)
          .collection(`${moment().format('MM')}`)
          .doc(`${moment().format('DD')}`)
          .get()
          .then(async (doc: any) => {
            if (doc.exists) {
              total = total + 1;
              data.push({
                ...item,
                ...doc.data(),
              });
            } else {
              data.push({
                ...item,
              });
            }
            dispatch(getPresenceAllUserSuccess(data, total));
          })
          .catch((error: any) => {
            dispatch(getPresenceAllUserError(error));
          });
      });
      dispatch(getPresenceAllUserLoading(false));
    })
    .catch((error: any) => {
      dispatch(getPresenceAllUserError(error));
    });
};
