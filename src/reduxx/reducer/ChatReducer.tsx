import {
  CREATE_CHAT_LIST_ERROR,
  CREATE_CHAT_LIST_LOADING,
  CREATE_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_ERROR,
  GET_CHAT_LIST_LOADING,
  GET_CHAT_LIST_SUCCESS,
  SET_GETALLUSER_ERROR,
  SET_GETALLUSER_LOADING,
  SET_GETALLUSER_SUCCESS,
  SET_GETCHAT_ERROR,
  SET_GETCHAT_LOADING,
  SET_GETCHAT_SUCCESS,
  SET_SEARCHUSER_ERROR,
  SET_SEARCHUSER_LOADING,
  SET_SEARCHUSER_SUCCESS,
} from '../types';

type initialChatProps = {
  loading: boolean;
  error: any;
  data: any;
  dataSearch: any;
  dataChatList: any;
};

const initialChat: initialChatProps = {
  loading: false,
  error: null,
  data: null,
  dataSearch: null,
  dataChatList: null,
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

    case SET_SEARCHUSER_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_SEARCHUSER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_SEARCHUSER_SUCCESS:
      return {
        ...state,
        dataSearch: action.success,
        loading: false,
      };

    case CREATE_CHAT_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case CREATE_CHAT_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CREATE_CHAT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_CHAT_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        dataChatList: action.success,
        loading: false,
      };

    case GET_CHAT_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};
