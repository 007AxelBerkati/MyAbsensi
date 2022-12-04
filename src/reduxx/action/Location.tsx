import Geolocation from 'react-native-geolocation-service';
import {
  GET_LOCATION_ERROR,
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
} from '../types';

export const getLocationSuccess = (location: any) => ({
  type: GET_LOCATION_SUCCESS,
  location,
});

export const getLocationError = (error: any) => ({
  type: GET_LOCATION_ERROR,
  error,
});

export const getLocationLoading = (loading: any) => ({
  type: GET_LOCATION_LOADING,
  loading,
});

export const getLocation = () => async (dispatch: any) => {
  dispatch(getLocationLoading(true));
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      dispatch(getLocationSuccess({latitude, longitude}));
    },
    error => {
      dispatch(getLocationError(error));
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
  );
};
