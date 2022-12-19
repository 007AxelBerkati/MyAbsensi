import {
  GET_PRESENCE_ERROR,
  GET_PRESENCE_LOADING,
  GET_PRESENCE_SUCCESS,
  SET_PRESENCE,
  SET_PRESENCE_ERROR,
  SET_PRESENCE_LOADING,
  SET_PRESENCE_SUCCESS,
  SET_SIGNOUT_SUCCESS,
} from '../types';

type initialPropsPresence = {
  loading: boolean;
  error: any;
  dataPresence: any;
  presence: string;
};

const initialPresence: initialPropsPresence = {
  loading: false,
  error: null,
  dataPresence: null,
  presence: 'masuk',
};

export const PresenceReducer = (state = initialPresence, action: any) => {
  switch (action.type) {
    case GET_PRESENCE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_PRESENCE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_PRESENCE_SUCCESS:
      return {
        ...state,
        dataPresence: action.success,
        loading: false,
      };

    case SET_PRESENCE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_PRESENCE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_PRESENCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_PRESENCE:
      return {
        ...state,
        presence: action.presence,
      };

    case SET_SIGNOUT_SUCCESS:
      return initialPresence;
    default:
      return state;
  }
};