import { SET_LOADING } from '../types';

const initialState = {
  isLoading: false,
};

export const GlobalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.loading,
      };

    default:
      return state;
  }
};
