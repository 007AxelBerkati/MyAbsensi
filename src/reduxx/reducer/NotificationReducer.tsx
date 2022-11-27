import {
  SET_GETNOTIF_ERROR,
  SET_GETNOTIF_LOADING,
  SET_GETNOTIF_SUCCESS,
  SET_SETNOTIF_ERROR,
  SET_SETNOTIF_LOADING,
  SET_SETNOTIF_SUCCESS,
  UPDATE_NOTIF_ERROR,
  UPDATE_NOTIF_LOADING,
  UPDATE_NOTIF_SUCCESS,
} from '../types';

type initialNotifProps = {
  loading: boolean;
  error: any;
  dataNotif: any;
};

const initialNotif: initialNotifProps = {
  loading: false,
  error: null,
  dataNotif: null,
};

export const NotificationReducer = (state = initialNotif, action: any) => {
  switch (action.type) {
    case SET_GETNOTIF_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_GETNOTIF_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_GETNOTIF_SUCCESS:
      return {
        ...state,
        dataNotif: action.data,
        loading: false,
      };

    case UPDATE_NOTIF_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case UPDATE_NOTIF_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_NOTIF_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_SETNOTIF_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case SET_SETNOTIF_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_SETNOTIF_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
