import {
  SET_AKUN_ERROR,
  SET_AKUN_LOADING,
  SET_AKUN_SUCCESS,
  SET_UPDATE_AKUN_ERROR,
  SET_UPDATE_AKUN_LOADING,
  SET_UPDATE_AKUN_SUCCESS,
} from '../types';

type initialStateProps = {
  loading: boolean;
  error: any;
  data: any;
};

const initialState: initialStateProps = {
  loading: false,
  error: null,
  data: null,
};

export function AkunReducer(
  state = initialState,
  action: any
): initialStateProps {
  switch (action.type) {
    case SET_AKUN_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_AKUN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_AKUN_SUCCESS:
      return {
        ...state,
        data: action.success,
        loading: false,
      };

    case SET_UPDATE_AKUN_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_UPDATE_AKUN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_UPDATE_AKUN_SUCCESS:
      return {
        ...state,
        data: {...state.data, ...action.success},
        loading: false,
      };

    default:
      return state;
  }
}
