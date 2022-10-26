import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {requestPermissions} from '../../plugins';
import {windowWidth} from '../../theme';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};
const Geo = () => {
  const [currentPosition, setCurrentPosition] = useState(initialState);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
    requestPermissions();
  }, []);

  return currentPosition.latitude ? (
    <View style={styles.pages}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentPosition}
        showsUserLocation
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  map: {
    width: windowWidth,
    height: '100%',
  },
});
export default Geo;
