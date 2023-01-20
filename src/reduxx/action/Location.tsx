import Geolocation from 'react-native-geolocation-service';
import {dummyData, haversineDistance} from '../../utils';
import {
  GET_LOCATION_ERROR,
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  SET_DISTANCE,
  SET_LOCATION,
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

export const setDistance = (distance: any) => ({
  type: SET_DISTANCE,
  distance,
});

export const getLocation = () => async (dispatch: any) => {
  dispatch(getLocationLoading(true));
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;

      dispatch(getLocationSuccess({latitude, longitude}));
      dispatch(
        setDistance(
          haversineDistance(
            {latitude, longitude},
            {
              latitude: dummyData.locationSchool.latitude,
              longitude: dummyData.locationSchool.longitude,
            },
            true
          )
        )
      );
    },
    error => {
      dispatch(getLocationError(error));
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
  );
};
