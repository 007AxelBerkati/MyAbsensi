import React, {useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
  MockLocationDetectorError,
} from 'react-native-turbo-mock-location-detector';
import {Headers} from '../../components';

const Riwayat = ({navigation}: any) => {
  useEffect(() => {
    isMockingLocation()
      .then(({isLocationMocked}) => {
        if (isLocationMocked) {
          Alert.alert('Mock Location Detected', 'Please disable mock location');
        }
      })
      .catch((error: MockLocationDetectorError) => {
        switch (error.code) {
          case MockLocationDetectorErrorCode.GPSNotEnabled: {
            Alert.alert('GPS Not Enabled', 'Please enable GPS');
            return;
          }
          case MockLocationDetectorErrorCode.NoLocationPermissionEnabled: {
            Alert.alert(
              'No Location Permission',
              'Please enable location permission'
            );
            return;
          }
          case MockLocationDetectorErrorCode.CantDetermine: {
            Alert.alert(
              'Can not determine if mock location is enabled',
              'Please try again'
            );
          }
        }
      });
  }, []);

  return (
    <View style={styles.pages}>
      <Headers title="Riwayat Absen" />
    </View>
  );
};

export default Riwayat;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    marginHorizontal: 16,
  },
});
