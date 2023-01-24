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

type initialStateAuthProps = {
  loading: boolean;
  error: any;
  dataLogin: any;
  isLogin: boolean;
  role: any;
};

const initialStateAuth: initialStateAuthProps = {
  loading: false,
  error: null,
  dataLogin: null,
  isLogin: false,
  role: null,
};

export function AuthReducer(
  state = initialStateAuth,
  action: any
): initialStateAuthProps {
  switch (action.type) {
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        isLogin: false,
      };
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        dataLogin: action.success,
        loading: false,
        isLogin: true,
      };

    case SET_FORGETPASS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_FORGETPASS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_FORGETPASS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_SIGNOUT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_SIGNOUT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case SET_SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: false,
      };

    case SET_ROLE:
      return {
        ...state,
        role: action.role,
      };

    default:
      return state;
  }
}
