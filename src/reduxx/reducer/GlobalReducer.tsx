import {SET_IS_ONLINE, SET_LOADING, SET_REFRESHING} from '../types';

type initialStateGLobalProps = {
  loading: boolean;
  isOnline: boolean;
  isRefreshing: boolean;
};

const initialStateGLobal: initialStateGLobalProps = {
  loading: false,
  isOnline: true,
  isRefreshing: false,
};

export function GlobalReducer(
  state = initialStateGLobal,
  action: any
): initialStateGLobalProps {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_IS_ONLINE:
      return {
        ...state,
        isOnline: action.isOnline,
      };

    case SET_REFRESHING:
      return {
        ...state,
        isRefreshing: action.refreshing,
      };

    default:
      return state;
  }
}
