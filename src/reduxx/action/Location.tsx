import Geolocation from 'react-native-geolocation-service';
import {locationPresenceRef, showError} from '../../plugins';
import {dummyData, haversineDistance} from '../../utils';
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
import Haversine from 'haversine';

export const getLocationSuccess = (location: any, mocked: any) => ({
  type: GET_LOCATION_SUCCESS,
  location,
  mocked,
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

export const setCanPresence = (canPresense: any) => ({
  type: SET_CAN_PRESENCE,
  canPresense,
});

export const getLocation = (locationPresence: any) => async (dispatch: any) => {
  dispatch(getLocationLoading(true));
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const {mocked} = position;

      dispatch(getLocationSuccess({latitude, longitude}, mocked));

      const data: any = [];

      if (Array.isArray(locationPresence) && locationPresence.length > 0) {
        for (const item of locationPresence) {
          const distance = Haversine(
            {latitude, longitude},
            {
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }
          );

          data.push({
            ...item,
            distance,
          });
        }
      }

      const sortedData = data.sort((a: any, b: any) => a.distance - b.distance);

      dispatch(setDistance(sortedData.length > 0 ? sortedData[0].distance : 0));
    },
    error => {
      dispatch(getLocationError(error));
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
  );
};

export const getLocationPresenceLoading = (loading: any) => {
  return {
    type: GET_LOCATION_PRESENCE_LOADING,
    loading,
  };
};

export const getLocationPresenceSuccess = (locationPresence: any) => {
  return {
    type: GET_LOCATION_PRESENCE_SUCCESS,
    locationPresence,
  };
};

export const getLocationPresenceError = (error: any) => {
  return {
    type: GET_LOCATION_PRESENCE_ERROR,
    error,
  };
};

export const getLocationPresence = () => async (dispatch: any) => {
  dispatch(getLocationPresenceLoading(true));
  await locationPresenceRef()
    .get()
    .then(async (querySnapshot: any) => {
      const list: any = [];
      const data: any = [];
      if (querySnapshot.empty) return;

      await querySnapshot?.forEach((documentSnapshot: any) => {
        list.push({
          uid: documentSnapshot.id,
        });
      });
      await list?.forEach((item: any) => {
        locationPresenceRef()
          .doc(item.uid)
          .get()
          .then((doc: any) => {
            if (doc.exists) {
              data.push({
                ...doc.data(),
              });
            }

            dispatch(getLocationPresenceSuccess(data));
          })
          .catch(err => {
            dispatch(getLocationPresenceError(err));
            showError(err.message);
          });
      });
    })
    .catch(err => {
      dispatch(getLocationPresenceError(err));
      showError(err.message);
    });
};
