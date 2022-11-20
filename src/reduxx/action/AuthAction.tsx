import {
  databaseRef,
  forgetPassword,
  login,
  removeData,
  removeDataSecure,
  showError,
  showSuccess,
  signOut,
  storeData,
  storeDataSecure,
} from '../../plugins';
import {
  SET_FORGETPASS_ERROR,
  SET_FORGETPASS_LOADING,
  SET_FORGETPASS_SUCCESS,
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_LOGIN_SUCCESS,
  SET_SIGNOUT_ERROR,
  SET_SIGNOUT_LOADING,
  SET_SIGNOUT_SUCCESS,
} from '../types';

export const setLoginLoading = (loading: any) => ({
  type: SET_LOGIN_LOADING,
  loading,
});

export const setLoginError = (error: any) => ({
  type: SET_LOGIN_ERROR,
  error,
});

export const setLoginSuccess = (success: any) => ({
  type: SET_LOGIN_SUCCESS,
  success,
});

export const setForgetPassLoading = (loading: any) => ({
  type: SET_FORGETPASS_LOADING,
  loading,
});

export const setForgetPassError = (error: any) => ({
  type: SET_FORGETPASS_ERROR,
  error,
});

export const setForgetPassSuccess = () => ({
  type: SET_FORGETPASS_SUCCESS,
});

export const setSignOutLoadin = (loading: any) => ({
  type: SET_SIGNOUT_LOADING,
  loading,
});

export const setSignOutError = (error: any) => ({
  type: SET_SIGNOUT_ERROR,
  error,
});

export const setSignOutSuccess = () => ({
  type: SET_SIGNOUT_SUCCESS,
});

export const loginUser =
  (email: any, password: any, navigation: any) => async (dispatch: any) => {
    dispatch(setLoginLoading(true));
    await login(email, password)
      .then((res: any) => {
        console.log('res', res.user.uid);

        // databaseRef()
        //   .ref(`users/${res.user.uid}`)
        //   .on('value', snapshot => {
        //     dispatch(setLoginSuccess(snapshot.val()));
        //     storeData('user', snapshot.val());
        //     storeDataSecure('userLogin', {email, password, uid: res.user.uid});
        //     showSuccess('Login Berhasil');

        //     navigation.replace('Dashboard');
        //   });
        databaseRef()
          .ref(`users/${res?.user?.uid}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.val() !== null) {
              dispatch(setLoginSuccess(snapshot.val()));
              storeData('user', snapshot.val());
              storeDataSecure('userLogin', {
                email,
                password,
                uid: res.user.uid,
              });
              showSuccess('Login Berhasil');
              navigation.replace('Dashboard');
            } else {
              databaseRef()
                .ref(`admins/${res?.user?.uid}`)
                .on('value', snapshot => {
                  dispatch(setLoginSuccess(snapshot.val()));
                  storeData('user', snapshot.val());
                  storeDataSecure('userLogin', {
                    email,
                    password,
                    uid: res.user.uid,
                  });
                  showSuccess('Login Berhasil');
                  navigation.replace('Dashboard');
                });
            }
          });
      })
      .catch((error: any) => {
        dispatch(setLoginError(error));
        showError(error.message);
      });
  };

export const forgetPass =
  (email: any, navigation: any) => async (dispatch: any) => {
    dispatch(setForgetPassLoading(true));

    await forgetPassword(email)
      .then(() => {
        dispatch(setForgetPassSuccess());
        showSuccess('Check your email');
        navigation.replace('Login');
      })
      .catch(err => {
        dispatch(setForgetPassError(err));
        showError(err.message);
      });
  };

export const signOutUser = (navigation: any) => async (dispatch: any) => {
  dispatch(setSignOutLoadin(true));

  await signOut()
    .then(() => {
      dispatch(setSignOutSuccess());
      removeData('user');
      removeDataSecure('userLogin').then(() => {
        navigation.replace('Login');
      });
    })
    .catch((error: any) => {
      dispatch(setSignOutError(error));
      showError(error.message);
    });
};
