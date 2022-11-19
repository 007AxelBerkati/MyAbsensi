import {SET_LOADING} from '../types';

type initialStateGLobalProps = {
  loading: boolean;
};

const initialStateGLobal: initialStateGLobalProps = {
  loading: false,
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
    default:
      return state;
  }
}
