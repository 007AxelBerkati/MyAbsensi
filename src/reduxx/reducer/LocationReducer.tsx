import {
  GET_LOCATION_ERROR,
  GET_LOCATION_LOADING,
  GET_LOCATION_PRESENCE_ERROR,
  GET_LOCATION_PRESENCE_LOADING,
  GET_LOCATION_PRESENCE_SUCCESS,
  GET_LOCATION_SUCCESS,
  SET_CAN_PRESENCE,
  SET_DISTANCE,
} from '../types';

type initialLocationState = {
  location: object;
  loading: boolean;
  error: any;
  distance: number;
  locationPresence: any;
  isMocked: boolean;
  canPresence: boolean;
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
  locationPresence: null,
  isMocked: false,
  canPresence: false,
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
        isMocked: action.mocked,
        loading: false,
      };

    case GET_LOCATION_PRESENCE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_LOCATION_PRESENCE_SUCCESS:
      return {
        ...state,
        locationPresence: action.locationPresence,
        loading: false,
      };

    case GET_LOCATION_PRESENCE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_DISTANCE:
      return {
        ...state,
        distance: action.distance,
      };

    case SET_CAN_PRESENCE:
      return {
        ...state,
        canPresence: action.canPresense,
      };

    default:
      return state;
  }
};
