import {Platform, PermissionsAndroid} from 'react-native';

export async function requestPermissions() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }
}
