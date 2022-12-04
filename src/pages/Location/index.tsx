import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootState, useAppSelector} from '../../reduxx';
import {windowWidth} from '../../theme';

const Location = ({navigation}: any) => {
  const {location} = useAppSelector((state: RootState) => state.dataLocation);

  return location.latitude ? (
    <View style={styles.pages}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation>
        <Marker
          coordinate={location}
          title="Lokasi Anda"
          description="Lokasi Anda Saat Ini"
        />
      </MapView>
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
