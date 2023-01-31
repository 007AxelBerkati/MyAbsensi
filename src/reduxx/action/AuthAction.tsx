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
  SET_ROLE,
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

export const setRole = (role: any) => ({
  type: SET_ROLE,
  role,
});

export const loginUser =
  (email: any, password: any, navigation: any) => async (dispatch: any) => {
    dispatch(setLoginLoading(true));
    await login(email, password)
      .then((res: any) => {
        databaseRef()
          .ref(`users/${res?.user?.uid}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.val() !== null) {
              dispatch(setLoginSuccess(snapshot.val()));
              dispatch(setRole(snapshot.val().role));
              storeData('user', {
                ...snapshot.val(),
                photo: snapshot.val().photo,
                role: snapshot.val().role,
              });
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
                .once('value', snapshot => {
                  if (snapshot.val() !== null) {
                    dispatch(setLoginSuccess(snapshot.val()));
                    dispatch(setRole(snapshot.val().role));
                    storeData('user', {
                      ...snapshot.val(),
                      photo: snapshot.val().photo,
                      role: snapshot.val().role,
                    });
                    storeDataSecure('userLogin', {
                      email,
                      password,
                      uid: res.user.uid,
                    });
                    showSuccess('Login Berhasil');
                    navigation.replace('Dashboard');
                  } else {
                    dispatch(setLoginError('User Sepertinya Telah Terhapus'));
                    showError('User Sepertinya Telah Terhapus');
                  }
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
      navigation.replace('Login');
    })
    .catch((error: any) => {
      dispatch(setSignOutError(error));
      showError(error.message);
    });
};
