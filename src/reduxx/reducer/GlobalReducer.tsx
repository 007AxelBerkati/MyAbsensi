import {SET_IS_ONLINE, SET_LOADING} from '../types';

type initialStateGLobalProps = {
  loading: boolean;
  isOnline: boolean;
};

const initialStateGLobal: initialStateGLobalProps = {
  loading: false,
  isOnline: true,
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
    default:
      return state;
  }
}
