import {
  GET_LOCATION_ERROR,
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
} from '../types';

type initialLocationState = {
  location: object;
  loading: boolean;
  error: any;
};

const initialLocation: initialLocationState = {
  location: {
    latitude: null,
    longitude: null,
    latitudeDelta: 0,
    longitudeDelta: 0.05,
  },
  loading: false,
  error: null,
};

export const LocationReducer = (state = initialLocation, action: any) => {
  switch (action.type) {
    case GET_LOCATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_LOCATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: {...state.location, ...action.location},
        loading: false,
      };
    default:
      return state;
  }
};
