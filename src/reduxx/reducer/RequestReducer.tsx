import {
  GET_REQUEST_ERROR,
  GET_REQUEST_LOADING,
  GET_REQUEST_SUCCESS,
  SET_COUNT_REQUESt,
  SET_IS_REQUEST_PENDING,
  SET_REQUEST_ERROR,
  SET_REQUEST_LOADING,
  SET_REQUEST_SUCCESS,
  SET_SIGNOUT_SUCCESS,
} from '../types';

type initialRequestProps = {
  loading: boolean;
  error: any;
  dataRequest: any;
  isRequestPending: boolean;
  totalRequestNotif: number;
};

const initialRequest: initialRequestProps = {
  loading: false,
  error: null,
  dataRequest: null,
  isRequestPending: false,
  totalRequestNotif: 0,
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

    case SET_IS_REQUEST_PENDING:
      return {
        ...state,
        isRequestPending: action.pending,
      };

    case SET_COUNT_REQUESt:
      return {
        ...state,
        totalRequestNotif: action.total,
      };

    case SET_SIGNOUT_SUCCESS:
      return initialRequest;
    default:
      return state;
  }
};
