import {
  GET_REQUEST_ERROR,
  GET_REQUEST_LOADING,
  GET_REQUEST_SUCCESS,
  SET_REQUEST_ERROR,
  SET_REQUEST_LOADING,
  SET_REQUEST_SUCCESS,
} from '../types';

type initialRequestProps = {
  loading: boolean;
  error: any;
  dataRequest: any;
};

const initialRequest: initialRequestProps = {
  loading: false,
  error: null,
  dataRequest: null,
};

export const RequestReducer = (state = initialRequest, action: any) => {
  switch (action.type) {
    case SET_REQUEST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_REQUEST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_REQUEST_SUCCESS:
      return {
        ...state,
        dataRequest: action.success,
        loading: false,
      };

    default:
      return state;
  }
};
