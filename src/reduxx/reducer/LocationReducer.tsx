import {
  GET_LOCATION_ERROR,
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  SET_DISTANCE,
} from '../types';

type initialLocationState = {
  location: object;
  loading: boolean;
  error: any;
  distance: number;
};

const initialLocation: initialLocationState = {
  location: {
    latitude: -2.2349466,
    longitude: 113.9083208,
    latitudeDelta: 0,
    longitudeDelta: 0.05,
  },
  loading: false,
  error: null,
  distance: 0,
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

    case SET_DISTANCE:
      return {
        ...state,
        distance: action.distance,
      };

    default:
      return state;
  }
};
