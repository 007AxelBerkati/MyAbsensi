import {
  SET_GETALLUSER_ERROR,
  SET_GETALLUSER_LOADING,
  SET_GETALLUSER_SUCCESS,
  SET_GETCHAT_ERROR,
  SET_GETCHAT_LOADING,
  SET_GETCHAT_SUCCESS,
} from '../types';

type initialChatProps = {
  loading: boolean;
  error: any;
  data: any;
};

const initialChat: initialChatProps = {
  loading: false,
  error: null,
  data: null,
};

export const ChatReducer = (state = initialChat, action: any) => {
  switch (action.type) {
    case SET_GETALLUSER_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_GETALLUSER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_GETALLUSER_SUCCESS:
      return {
        ...state,
        data: action.success,
        loading: false,
      };
    case SET_GETCHAT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_GETCHAT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_GETCHAT_SUCCESS:
      return {
        ...state,
        data: action.success,
        loading: false,
      };
    default:
      return state;
  }
};
