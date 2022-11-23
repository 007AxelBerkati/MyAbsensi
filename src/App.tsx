import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
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
import NetInfo from '@react-native-community/netinfo';
import 'react-native-gesture-handler';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const MainApp = () => {
  const {loading, isOnline} = useSelector(
    (state: RootState) => state.dataGlobal
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const removeNetInfo = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      dispatch(setOnline(!offline));
    });
    return () => {
      removeNetInfo();
    };
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.background.secondary}
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
