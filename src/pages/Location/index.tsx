import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {requestPermissions} from '../../plugins';
import {
  getLocation,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {windowWidth} from '../../theme';

const Location = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {location} = useAppSelector((state: RootState) => state.dataLocation);

  useEffect(() => {
    dispatch(getLocation());
    requestPermissions();
  }, []);

  return location.latitude ? (
    <View style={styles.pages}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation
      />
    </View>
  ) : null;
};

export default Location;

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
