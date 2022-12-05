import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {StatusBar, Alert, BackHandler, LogBox} from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Loading, NoInternet} from './components';
import Navigation from './navigations';
import {
  Persistore,
  RootState,
  setOnline,
  Store,
  useAppDispatch,
} from './reduxx';
import {COLORS, RADIUS, windowHeight, windowWidth} from './theme';
import {
  isMockingLocation,
  MockLocationDetectorError,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';
import {requestPermissions} from './plugins';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};


const MainApp = () => {
  const {loading, isOnline} = useSelector(
    (state: RootState) => state.dataGlobal
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    const removeNetInfo = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      dispatch(setOnline(!offline));
    });
    return () => {
      removeNetInfo();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      isMockingLocation()
        .then(({isLocationMocked}) => {
          if (isLocationMocked) {
            Alert.alert(
              'Pemalsuan Lokasi Terdeteksi',
              'Tolong matikan fitur pemalsuan lokasi',
              [
                {
                  text: 'OK',
                  onPress: () => BackHandler.exitApp(),
                },
              ],
              {cancelable: false}
            );
          }
        })
        .catch((error: MockLocationDetectorError) => {
          switch (error.code) {
            case MockLocationDetectorErrorCode.GPSNotEnabled: {
              Alert.alert('GPS Not Enabled', 'Please enable GPS');
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.background.tertiary}
        barStyle="default"
      />
      <Navigation />
      <FlashMessage
        position="top"
        style={{
          marginTop: windowHeight * 0.05,
          width: windowWidth * 0.9,
          borderRadius: RADIUS.xLarge,
          alignSelf: 'center',
        }}
      />
      {isOnline ? null : <NoInternet />}

      {loading && <Loading />}
    </>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);

LogBox.ignoreLogs(['Remote debugger']);
