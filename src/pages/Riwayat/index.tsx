import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Headers} from '../../components';
import RNMockLocationDetector from 'react-native-mock-location-detector';

const Riwayat = ({navigation}: any) => {
  const [isMock, setIsMock] = useState(false);
  useEffect(() => {
    const isLocationMocked: boolean =
      RNMockLocationDetector.checkMockLocationProvider();
    if (isLocationMocked) {
      // Location is mocked or spoofed
      Alert.alert(
        'Peringatan',
        'Anda menggunakan aplikasi yang tidak aman, silahkan uninstall aplikasi ini'
      );
    }
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
